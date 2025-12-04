import { useContext, useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Flex,
  Spinner,
  Container,
  Icon,
} from "@chakra-ui/react";
import { useCart } from "../components/Contexts/CartContext";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../components/firebase";
import type { ProductType } from "../hooks/types";
import Product from "../components/Products/product";
import ScrollReveal from "../hooks/ScrollReveal";
import ConfirmationDialog from "../components/Admin/ConfirmationDialog";
import AdminEditProduct from "../components/Admin/AdminEditProduct";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../auth/AuthProvider";
import AddNewProduct from "../components/Admin/AddNewProduct";
// import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const { isAdmin } = useContext(AuthContext);

  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [isUpdating, setIsUpdating] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  const [fields, setFields] = useState({
    name: "",
    description: "",
    price: "",
    group: "",
    image: "",
  });

  const [isAddNewProductDialogOpen, setIsAddNewProductDialogOpen] =
    useState(false);
  const [addProductSure, setAddProductSure] = useState(false);

  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const openEditModal = (product: ProductType) => {
    setSelectedProduct(product);
    setFields({
      name: product.name,
      description: product.description,
      price: product.price,
      group: product.group,
      image: product.image,
    });
    setIsEditing(true);
  };

  const handleDeleteBtn = (product: ProductType) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveUpdate = async () => {
    if (!selectedProduct) return;

    try {
      setIsUpdating(true); // ⭐ Start animation

      await updateDoc(doc(db, "products", selectedProduct.id), {
        ...fields,
        updatedAt: new Date(),
      });

      // ⭐ Update the central lastUpdated document
      await updateDoc(doc(db, "products", "lastUpdated"), {
        time: new Date(),
      });

      // ⭐ Update localStorage immediately
      localStorage.setItem("productsLastUpdated", String(Date.now()));

      // ⭐ Build NEW updated array
      const updatedProducts = products.map((p) =>
        p.id === selectedProduct.id ? { ...p, ...fields } : p
      );

      // ⭐ Update state
      setProducts(updatedProducts);

      // ⭐ Save the NEW version to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      setIsSaveDialogOpen(false);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating product", err);
    } finally {
      setIsUpdating(false); // ⭐ Stop animation
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    try {
      setIsUpdating(true);
      setIsDeleteDialogOpen(false);

      // Delete from Firestore
      await deleteDoc(doc(db, "products", selectedProduct.id));

      // Update the central lastUpdated document
      await updateDoc(doc(db, "products", "lastUpdated"), {
        time: new Date(),
      });

      // Update localStorage immediately
      localStorage.setItem("productsLastUpdated", String(Date.now()));

      // Remove product from state
      const updatedProducts = products.filter((p) => p.id !== selectedProduct.id);

      // Update state
      setProducts(updatedProducts);

      // Save the updated version to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Reset selected product
      setSelectedProduct(null);
    } catch (err) {
      console.error("Error deleting product", err);
      // You might want to show an error message to the user here
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNewProduct = async () => {
    if (!fields.name || !fields.price) {
      console.error("Name and price are required");
      setAddProductSure(false);
      return;
    }

    try {
      setIsUpdating(true);
      setAddProductSure(false);
      setIsAddNewProductDialogOpen(false);

      // Create new product document in Firestore
      const productsCollection = collection(db, "products");
      const newProductRef = await addDoc(productsCollection, {
        name: fields.name,
        description: fields.description || "",
        price: fields.price,
        cost: "", // You might want to add a cost field to the form
        group: fields.group || "",
        image: fields.image || "",
        originalName: fields.name,
        lastUpdated: serverTimestamp(),
      });

      // Update the central lastUpdated document
      await updateDoc(doc(db, "products", "lastUpdated"), {
        time: new Date(),
      });

      // Update localStorage immediately
      localStorage.setItem("productsLastUpdated", String(Date.now()));

      // Create new product object with the generated ID
      const newProduct: ProductType = {
        id: newProductRef.id,
        name: fields.name,
        description: fields.description || "",
        price: fields.price,
        cost: "",
        group: fields.group || "",
        image: fields.image || "",
        originalName: fields.name,
      };

      // Add to state
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Save to localStorage
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Reset fields
      setFields({
        name: "",
        description: "",
        price: "",
        group: "",
        image: "",
      });
    } catch (err) {
      console.error("Error adding product", err);
      // You might want to show an error message to the user here
    } finally {
      setIsUpdating(false);
    }
  };

  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const { cart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    ...new Set(products.map((p) => p.group || "Other")),
  ];

  useEffect(() => {
    // Fetch products from backend if updated
    // const fetchProductsIfUpdated = async () => {
    //   try {
    //     // Get lastUpdated from backend
    //     const lastUpdatedRes = await axios.get(
    //       "http://localhost:5001/lastUpdated"
    //     );
    //     const backendLastUpdated = lastUpdatedRes.data.lastUpdated;

    //     // Get cached lastUpdated from sessionStorage
    //     const cachedLastUpdated = sessionStorage.getItem("productsLastUpdated");

    //     // If no cached products or lastUpdated changed, fetch products
    //     if (!cachedLastUpdated || cachedLastUpdated !== backendLastUpdated) {
    //       const productsRes = await axios.get("http://localhost:5001/products");
    //       const productsData = productsRes.data.products;

    //       sessionStorage.setItem("products", JSON.stringify(productsData));
    //       sessionStorage.setItem("productsLastUpdated", backendLastUpdated);
    //       setProducts(productsData);
    //     } else {
    //       // Use cached products
    //       const cachedProducts = sessionStorage.getItem("products");
    //       if (cachedProducts) {
    //         setProducts(JSON.parse(cachedProducts));
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error fetching products:", error);
    //   }
    // };
    // fetchProductsIfUpdated();

    // Fetch all products from Firestore

    //Fetches data from firestore

    // const fetchProductsFromFirestore = async () => {
    //   setLoading(true);
    //   try {
    //     const lastCheckTime = sessionStorage.getItem("lastCheckTime");
    //     const now = Date.now();
    //     let firestoreLastUpdated: number | null = null;

    //     // 🕒 Check if we should fetch Firestore's lastUpdated again
    //     const TEN_MINUTES = 10 * 60 * 1000;
    //     const shouldCheckFirestore =
    //       !lastCheckTime || now - Number(lastCheckTime) > TEN_MINUTES;

    //     if (shouldCheckFirestore) {
    //       console.log("⏰ Checking Firestore for lastUpdated...");

    //       // 🔹 Get lastUpdated timestamp from Firestore
    //       const lastUpdatedRef = doc(db, "products", "lastUpdated");
    //       const lastUpdatedSnap = await getDoc(lastUpdatedRef);

    //       if (!lastUpdatedSnap.exists()) {
    //         console.warn("⚠️ No lastUpdated document found in Firestore.");
    //         return;
    //       }

    //       firestoreLastUpdated = lastUpdatedSnap.data().time.toMillis();

    //       // 🧠 Remember when we last checked
    //       sessionStorage.setItem("lastCheckTime", String(now));
    //       localStorage.setItem("productsLastUpdated", String(firestoreLastUpdated));
    //     } else {
    //       console.log("🧠 Skipping Firestore check, using cached lastUpdated");
    //       firestoreLastUpdated = Number(localStorage.getItem("productsLastUpdated"));
    //     }

    //     const cachedLastUpdated = localStorage.getItem("productsLastUpdated");

    //     // 🔹 If no cache or data changed → fetch fresh products
    //     if (
    //       !cachedLastUpdated ||
    //       cachedLastUpdated !== String(firestoreLastUpdated)
    //     ) {
    //       console.log("im here ");

    //       const productsCollection = collection(db, "products");
    //       const snapshot = await getDocs(productsCollection);

    //       // Filter out the `lastUpdated` doc (since it’s not a product)
    //       const productsData = snapshot.docs
    //         .filter((doc) => doc.id !== "lastUpdated")
    //         .map((doc) => {
    //           const data = doc.data();
    //           return {
    //             id: data.id ?? "",
    //             name: data.name ?? "",
    //             description: data.description ?? "",
    //             price: data.price ?? "",
    //             cost: data.cost ?? "",
    //             group: data.group ?? "",
    //             originalName: data.originalName ?? "",
    //             image: data.image ?? "",
    //           } as Product;
    //         });

    //       // 🧠 Cache new data
    //       localStorage.setItem("products", JSON.stringify(productsData));
    //       localStorage.setItem(
    //         "productsLastUpdated",
    //         String(firestoreLastUpdated)
    //       );

    //       setProducts(productsData);
    //     } else {
    //       // 🔹 Use cached data
    //       const cachedProducts = localStorage.getItem("products");
    //       if (cachedProducts) {
    //         setProducts(JSON.parse(cachedProducts));
    //         console.log("💾 Loaded products from localStorage");
    //       }
    //     }
    //   } catch (error) {
    //     console.error("🔥 Error fetching products from Firestore:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchProductsFromFirestore = async () => {
      setLoading(true);
      try {
        const lastCheckTime = sessionStorage.getItem("lastCheckTime");
        const now = Date.now();
        const TEN_MINUTES = 10 * 60 * 1000;

        const cachedProducts = localStorage.getItem("products");
        const cachedLastUpdated = localStorage.getItem("productsLastUpdated");

        let firestoreLastUpdated: number | null = null;

        const shouldCheckFirestore =
          !lastCheckTime || now - Number(lastCheckTime) > TEN_MINUTES;

        // 🔹 Step 1: If it's been >10min or first visit, check Firestore
        if (shouldCheckFirestore) {
          console.log("⏰ Checking Firestore for lastUpdated...");
          const lastUpdatedRef = doc(db, "products", "lastUpdated");
          const lastUpdatedSnap = await getDoc(lastUpdatedRef);

          if (!lastUpdatedSnap.exists()) {
            console.warn("⚠️ No lastUpdated document found in Firestore.");
          } else {
            firestoreLastUpdated = lastUpdatedSnap.data().time.toMillis();
            localStorage.setItem(
              "productsLastUpdated",
              String(firestoreLastUpdated)
            );
          }

          sessionStorage.setItem("lastCheckTime", String(now));
        } else {
          firestoreLastUpdated = cachedLastUpdated
            ? Number(cachedLastUpdated)
            : null;
          // console.log("🧠 Skipping Firestore check, using cached timestamp");
        }

        // 🔹 Step 2: If no cached products OR data is outdated → fetch fresh data
        const shouldFetchProducts =
          !cachedProducts ||
          !cachedLastUpdated ||
          (firestoreLastUpdated &&
            cachedLastUpdated !== String(firestoreLastUpdated));

        if (shouldFetchProducts) {
          // console.log("📡 Fetching products from Firestore...");

          const productsCollection = collection(db, "products");
          const snapshot = await getDocs(productsCollection);

          const productsData = snapshot.docs
            .filter(
              (doc) => doc.id !== "lastUpdated" && doc.id !== "Product Groups"
            )
            .map((doc) => {
              const data = doc.data();
              return {
                id: data.id ?? "",
                name: data.name ?? "",
                description: data.description ?? "",
                price: data.price ?? "",
                cost: data.cost ?? "",
                group: data.group ?? "",
                originalName: data.originalName ?? "",
                image: data.image ?? "",
              } as ProductType;
            });

          // 🧠 Cache new data
          localStorage.setItem("products", JSON.stringify(productsData));
          if (firestoreLastUpdated)
            localStorage.setItem(
              "productsLastUpdated",
              String(firestoreLastUpdated)
            );

          setProducts(productsData);
        } else {
          console.log("💾 Loaded products from localStorage");
          setProducts(JSON.parse(cachedProducts));
        }
      } catch (error) {
        console.error("🔥 Error fetching products from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromFirestore();
  }, []);

  const categoryFiltered =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.group === selectedCategory);

  // existing search filter
  const filteredProducts = categoryFiltered.filter(
    (p) =>
      p.name.toLowerCase().includes(filter.toLowerCase()) ||
      (p.description ?? "").toLowerCase().includes(filter.toLowerCase()) ||
      p.price.toLowerCase().includes(filter.toLowerCase())
  );

  // Sort function
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA =
      parseFloat(a.price.replace(/\s/g, "").replace(",", ".")) || 0;
    const priceB =
      parseFloat(b.price.replace(/\s/g, "").replace(",", ".")) || 0;
    return sortAsc ? priceA - priceB : priceB - priceA;
  });

  return (
    <Box py={{ base: 10, md: 16 }} px={{ base: 6, md: 12 }}>
      <AdminEditProduct
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        product={selectedProduct}
        fields={fields}
        setFields={setFields}
        onSave={() => setIsSaveDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />
      <ConfirmationDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onConfirm={handleSaveUpdate}
        title="Save Changes?"
        description={`Do you want to save changes for ${selectedProduct?.name}?`}
        btnText="Save"
      />
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteProduct}
        title="Delete Product?"
        description={`Do you want to delete ${selectedProduct?.name}?`}
        btnText="Delete"
      />

      <AddNewProduct
        isOpen={isAddNewProductDialogOpen}
        onClose={() => setIsAddNewProductDialogOpen(false)}
        fields={fields}
        setFields={setFields}
        onAdd={() => setAddProductSure(true)}
      />
      <ConfirmationDialog
        isOpen={addProductSure}
        onClose={() => setAddProductSure(false)}
        onConfirm={handleAddNewProduct}
        title="Add a new product?"
        description={`Do you want to add "${fields.name}" to products?`}
        btnText="Add"
      />

      <Container maxW="7xl">
        <ScrollReveal>
          <Flex
            mb={6}
            align="center"
            justify="space-between"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            gap={4}
          >
            <Heading>Our Products</Heading>

            <Stack
              direction={{ base: "column", md: "row" }}
              gap={4}
              align="center"
            >
              <Input
                placeholder="Search products..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                width={{ base: "100%", md: "200px" }}
              />
              <Button onClick={() => setSortAsc(!sortAsc)}>
                Sort by Price {sortAsc ? "(Asc)" : "(Desc)"}
              </Button>
            </Stack>
          </Flex>
        </ScrollReveal>
        {/* <Box mb={6} p={4} bg="gray.50" borderRadius="md" boxShadow="sm">
          <Heading size="sm">Cart ({cart.length} items)</Heading>
          {cart.length > 0 ? (
            <Text fontSize="sm">{cart.map((c, i) => c.name).join(", ")}</Text>
          ) : (
            <Text fontSize="sm" color="gray.500">
              Your cart is empty.
            </Text>
          )}
        </Box> */}

        {loading ? (
          <Flex
            justify="center"
            align="center"
            py={20}
            direction="column"
            gap={4}
          >
            <Spinner size="xl" color="secondary.800" />
            <Text fontSize="lg" fontWeight="semibold" color="gray.600">
              Loading your products...
            </Text>
            <Text fontSize="sm" color="gray.500">
              Hang tight, we're fetching the latest goodies for you!
            </Text>
          </Flex>
        ) : (
          <ScrollReveal>
            <Flex gap={10} flexDirection={["column", "row"]}>
              <Box
                minW="200px"
                p={4}
                bg="gray.50"
                borderRadius="md"
                height="fit-content"
                boxShadow="sm"
              >
                <Heading size="sm" mb={3}>
                  Categories
                </Heading>

                <Stack gap={2}>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={cat === selectedCategory ? "solid" : "ghost"}
                      colorScheme="secondary"
                      justifyContent="flex-start"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </Stack>
              </Box>
              <Box maxHeight="calc(100vh - 70px)" overflow={"hidden"}>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3 }}
                  gap={6}
                  maxHeight={"100%"}
                  overflowY={"auto"}
                  p={4}
                >
                  {isAdmin && (
                    <ScrollReveal>
                      <Box
                        boxShadow="md"
                        borderRadius="lg"
                        p={4}
                        bg="white"
                        _hover={{
                          bg: "black",
                          color: "white",
                          transform: "scale(1.02)",
                          transition: "all 0.35s",
                        }}
                        height={"100%"}
                        cursor={"pointer"}
                        display="flex"
                        justifyContent="center"
                        alignItems={"center"}
                        onClick={() => {
                          setFields({
                            name: "",
                            description: "",
                            price: "",
                            group:
                              selectedCategory !== "All"
                                ? selectedCategory
                                : "",
                            image: "",
                          });

                          setIsAddNewProductDialogOpen(true);
                        }}
                      >
                        <Icon as={FaPlus} size={"2xl"} />
                      </Box>
                    </ScrollReveal>
                  )}

                  {sortedProducts.length > 0 ? (
                    sortedProducts.map((p, index) => {
                      const cartItem = cart.find((item) => item.id === p.id);

                      return (
                        <ScrollReveal key={index}>
                          <Product
                            product={p}
                            cartItem={cartItem}
                            onAdminEdit={() => openEditModal(p)}
                            onAdminDelete={() => handleDeleteBtn(p)}
                          />
                        </ScrollReveal>
                      );
                    })
                  ) : (
                    <Text>No products found!</Text>
                  )}
                </SimpleGrid>
              </Box>
            </Flex>
          </ScrollReveal>
        )}
      </Container>
      {isUpdating && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(255,255,255,0.7)"
          backdropFilter="blur(4px)"
          zIndex={9999}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" borderWidth="2px" animationDuration="0.65s" />
          <Box mt={4} fontSize="lg" fontWeight="medium" color="gray.700">
            Saving...
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Products;
