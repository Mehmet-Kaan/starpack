import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  VStack,
  HStack,
  Badge,
  Container,
  Icon,
  Card,
  Separator,
  SimpleGrid,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../components/Contexts/CartContext";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/firebase";
import type { ProductType } from "../hooks/types";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaTruck,
  FaLeaf,
  FaStar,
  FaTrashAlt,
} from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { useCartDrawer } from "../components/Contexts/CartDrawerContext";

const MotionBox = motion(Box);

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();
  // const { cart, addToCart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [recommendations, setRecommendations] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity] = useState(1);
  const { openCart } = useCartDrawer();

  const handleAddToCartClick = (product: ProductType) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      qty: 1,
    });
    openCart(); // 👈 Opens the global CartDrawer
  };

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     if (!id) return;

  //     setLoading(true);
  //     try {

  //       const productsCollection = collection(db, "products");
  //       const snapshot = await getDocs(productsCollection);

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

  //       const foundProduct = productsData.find(p => p.id === id);
  //       setProduct(foundProduct || null);

  //       // Get recommendations (similar products from same group, excluding current product)
  //       if (foundProduct) {
  //         const similarProducts = productsData
  //           .filter(p => p.id !== id && p.group === foundProduct.group)
  //           .slice(0, 4); // Limit to 4 recommendations
  //         setRecommendations(similarProducts);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setProduct(null);
      setRecommendations([]);

      try {
        const lastCheckTime = sessionStorage.getItem("lastCheckTime");
        const now = Date.now();
        const TEN_MINUTES = 10 * 60 * 1000;

        const cachedProducts = localStorage.getItem("products");
        const cachedLastUpdated = localStorage.getItem("productsLastUpdated");

        let firestoreLastUpdated: number | null = null;

        const shouldCheckFirestore =
          !lastCheckTime || now - Number(lastCheckTime) > TEN_MINUTES;

        // 🔹 Step 1: Check Firestore lastUpdated if needed
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
          console.log("🧠 Skipping Firestore check, using cached timestamp");
        }

        // 🔹 Step 2: Determine if we should fetch products again
        const shouldFetchProducts =
          !cachedProducts ||
          !cachedLastUpdated ||
          (firestoreLastUpdated &&
            cachedLastUpdated !== String(firestoreLastUpdated));

        let productsData: ProductType[] = [];

        if (shouldFetchProducts) {
          console.log("📡 Fetching products from Firestore...");

          const productsCollection = collection(db, "products");
          const snapshot = await getDocs(productsCollection);

          productsData = snapshot.docs
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
        } else {
          // console.log("💾 Using cached products from localStorage");
          productsData = JSON.parse(cachedProducts);
        }

        // 🔹 Step 3: Find the requested product
        const foundProduct = productsData.find((p) => p.id === id);
        setProduct(foundProduct || null);

        // 🔹 Step 4: Load recommendations from the same data
        if (foundProduct) {
          const similarProducts = productsData
            .filter((p) => p.id !== id && p.group === foundProduct.group)
            .slice(0, 4);
          setRecommendations(similarProducts);
        }
      } catch (error) {
        console.error("🔥 Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      qty: quantity,
    });
  };

  const cartItem = product ? cart.find((item) => item.id === product.id) : null;

  if (loading) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={4}>
          <Text>Loading product...</Text>
        </VStack>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="7xl" py={8}>
        <VStack gap={4}>
          <Heading>Product not found</Heading>
          <Button onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="7xl" py={8}>
      <Button variant="ghost" mb={6} onClick={() => navigate("/products")}>
        <Icon as={FaArrowLeft} mr={2} />
        Back to Products
      </Button>

      <AnimatePresence mode="wait">
        <MotionBox
          key={product.id} // triggers animation on id change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Card.Root>
            <Card.Body>
              <Stack direction={{ base: "column", lg: "row" }} gap={8}>
                {/* Product Image */}
                <Box flex="1">
                  <Image
                    src={product.image ? `./images/${product.image}` : "./images/placeholder.png"}
                    alt={product.name}
                    borderRadius="lg"
                    w="100%"
                    h="400px"
                    objectFit="cover"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.indexOf("placeholder.png") === -1) {
                        target.src = "./images/placeholder.png";
                      }
                    }}
                  />
                </Box>

                {/* Product Details */}
                <Box flex="1">
                  <VStack align="stretch" gap={4}>
                    <Badge colorScheme="blue" alignSelf="flex-start">
                      {product.group}
                    </Badge>

                    <Heading size="xl">{product.name}</Heading>

                    <Text fontSize="lg" color="gray.600">
                      {product.description}
                    </Text>

                    <HStack gap={2}>
                      <Icon as={FaStar} color="yellow.400" />
                      <Text fontSize="sm" color="gray.600">
                        High quality packaging solution
                      </Text>
                    </HStack>

                    <Separator />

                    <VStack align="stretch" gap={3}>
                      <HStack justify="space-between">
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                          {product.price} Dk
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          per unit
                        </Text>
                      </HStack>

                      <HStack gap={4} color="gray.600" fontSize="sm">
                        <HStack gap={2}>
                          <Icon as={FaTruck} />
                          <Text>Fast delivery</Text>
                        </HStack>
                        <HStack gap={2}>
                          <Icon as={FaLeaf} />
                          <Text>Eco-friendly</Text>
                        </HStack>
                      </HStack>
                    </VStack>

                    <Separator />

                    {/* Quantity and Add to Cart */}
                    <VStack align="stretch" gap={4}>
                      {/*   <HStack justify="space-between">
                    <Text fontWeight="semibold">Quantity:</Text>
                    <HStack>
                      <Button
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </Button>
                      <Text minW="40px" textAlign="center" fontWeight="bold">
                        {quantity}
                      </Text>
                      <Button
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </HStack>
                  </HStack> */}

                      {/* {cartItem ? (
                    <VStack gap={2}>
                      <Text color="green.600" fontSize="sm">
                        ✓ Added to cart ({cartItem.qty} items)
                      </Text>
                      <Button
                        colorScheme="blue"
                        onClick={handleAddToCart}
                        w="full"
                      >
                        <Icon as={FaShoppingCart} mr={2} />
                        Add More to Cart
                      </Button>5
                    </VStack>
                  ) : (
                    <Button
                      colorScheme="blue"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <Icon as={FaShoppingCart} mr={2} />
                      Add to Cart
                    </Button>
                  )} */}

                      {/* <Button
                      colorScheme="blue"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                       {cartItem && <Text position={"absolute"} top={0} right={0}>{cartItem.qty}</Text>}
                      <Icon as={FaShoppingCart} mr={2} />
                      Add to Cart
                    </Button> */}

                      {cartItem ? (
                        <VStack gap={2}>
                          <HStack justify="space-between" w="full">
                            <Box position="relative" w="full">
                              <Button
                                colorScheme="blue"
                                onClick={handleAddToCart}
                                w="full"
                              >
                                Add More to Cart
                              </Button>

                              {cartItem.qty > 0 && (
                                <Box
                                  position="absolute"
                                  top="-6px"
                                  right="-6px"
                                  bg="red.500"
                                  color="white"
                                  borderRadius="full"
                                  fontSize="xs"
                                  px={2}
                                  py={1}
                                  minW="18px"
                                  textAlign="center"
                                >
                                  {cartItem.qty}
                                </Box>
                              )}
                            </Box>

                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => removeFromCart(product.id)}
                            >
                              <Icon as={FaTrashAlt} />
                            </Button>
                          </HStack>
                        </VStack>
                      ) : (
                        <Button
                          colorScheme="blue"
                          size="lg"
                          onClick={() => handleAddToCartClick(product)}
                        >
                          <Icon as={FaShoppingCart} mr={2} />
                          Add to Cart
                        </Button>
                      )}
                    </VStack>
                  </VStack>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Recommendations Section */}
          {recommendations.length > 0 && (
            <Box mt={12}>
              <Heading size="lg" mb={6} textAlign="start">
                You might also like
              </Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
                {recommendations.map((recProduct) => {
                  const recCartItem = cart.find(
                    (item) => item.id === recProduct.id
                  );

                  return (
                    <Box
                      key={recProduct.id}
                      boxShadow="md"
                      borderRadius="lg"
                      p={4}
                      bg="white"
                      cursor="pointer"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s"
                      onClick={() => navigate(`/product/${recProduct.id}`)}
                      position={"relative"}
                    >
                      <Stack gap={3}>
                        <Image
                          src={recProduct.image ? `./images/${recProduct.image}` : "./images/placeholder.png"}
                          alt={recProduct.name}
                          borderRadius="md"
                          h="200px"
                          objectFit="cover"
                          loading="lazy"
                        />
                        <Heading size="sm">{recProduct.name}</Heading>
                        <Text fontSize="sm" color="gray.600" lineClamp={2}>
                          {recProduct.description}
                        </Text>
                        <Text fontWeight="bold" color="blue.600">
                          {recProduct.price} Dk
                        </Text>
                        {recCartItem && (
                          <Box
                            position="absolute"
                            top="-6px"
                            right="-6px"
                            bg="red.500"
                            color="white"
                            borderRadius="full"
                            fontSize="xs"
                            px={2}
                            py={1}
                            minW="18px"
                            textAlign="center"
                          >
                            {recCartItem.qty}
                          </Box>
                        )}
                        {/* {recCartItem ? (
                      <HStack justify="center" gap={2}>
                        <Button
                          size="xs"
                          colorScheme="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            decreaseQty(recCartItem.id);
                          }}
                        >
                          -
                        </Button>
                        <Text fontSize="sm" fontWeight="bold">
                          {recCartItem.qty}
                        </Text>
                        <Button
                          size="xs"
                          colorScheme="green"
                          onClick={(e) => {
                            e.stopPropagation();
                            increaseQty(recCartItem.id);
                          }}
                        >
                          +
                        </Button>
                      </HStack>
                    ) : (
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({
                            id: recProduct.id,
                            name: recProduct.name,
                            price: recProduct.price,
                            description: recProduct.description,
                            image: recProduct.image,
                            qty: 1,
                          });
                        }}
                      >
                        Add to Cart
                      </Button>
                    )} */}
                      </Stack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Box>
          )}
        </MotionBox>
      </AnimatePresence>
    </Container>
  );
};

export default ProductView;
