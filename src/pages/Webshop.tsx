import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useCart } from "../components/Contexts/CartContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";
import type { ProductType } from "../hooks/types";
import Product from "../components/Products/product";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const { cart } = useCart();

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
            .filter((doc) => doc.id !== "lastUpdated")
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

  // Filter products by name or description
  const filteredProducts = products.filter(
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
      <Container maxW="7xl">
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
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
            {sortedProducts.length > 0 ? (
              sortedProducts.map((p, index) => {
                const cartItem = cart.find((item) => item.id === p.id);

                return <Product key={index} product={p} cartItem={cartItem} />;
              })
            ) : (
              <Text>No products found!</Text>
            )}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
};

export default Products;
