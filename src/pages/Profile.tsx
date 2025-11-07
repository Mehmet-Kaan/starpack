import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider.tsx";
// import type { AuthContextType } from "../hooks/types.jsx";
// import { collection, getDocs, doc, or } from "firebase/firestore";
// import { db } from "../components/firebase.js";
import { getUserOrders } from "../components/utils.js";
import OrdersList from "../components/Orders/OrdersList.js";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userUid] = useState("");
  // const [usersData, setUsersData] = useState(null);
  // const [authorizationToken, setAuthorizationToken] = useState("");
  const [orders, setOrders] = useState<any[]>([]);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      // 1️⃣ Try to load orders from sessionStorage first
      const cachedOrders = sessionStorage.getItem("orders");
      if (cachedOrders) {
        try {
          const parsed = JSON.parse(cachedOrders);
          setOrders(parsed);
          console.log("📦 Loaded orders from sessionStorage");
        } catch (error) {
          console.error("❌ Failed to parse cached orders:", error);
        }
      }

      if (!cachedOrders) {
        // 2️⃣ Fetch latest orders from Firestore
        try {
          const freshOrders = await getUserOrders(currentUser);

          // Compare fresh data with cached (stringified comparison)
          const cachedHash = cachedOrders
            ? JSON.stringify(JSON.parse(cachedOrders))
            : null;
          const freshHash = JSON.stringify(freshOrders);

          if (cachedHash !== freshHash) {
            sessionStorage.setItem("orders", freshHash);
            setOrders(freshOrders);
            console.log(
              "✅ Orders updated from Firestore and saved to sessionStorage"
            );
          } else {
            console.log("⏩ Orders unchanged — using sessionStorage version");
          }
        } catch (err) {
          console.error("🔥 Error fetching orders from Firestore:", err);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  //   useEffect(() => {
  //   const storedUser = localStorage.getItem("userData");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const displayName = currentUser?.displayName || "User";
  const email = (currentUser as any)?.email || "";
  const initials = (displayName || email || "U")
    .split(" ")
    .map((p: string) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box minH="100vh" py={{ base: 10, md: 16 }} px={{ base: 6, md: 12 }}>
      <Box maxW="7xl" mx="auto">
        {/* Header */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "flex-start", md: "center" }}
          justify="space-between"
          gap={6}
          bg="white"
          borderRadius="xl"
          boxShadow="sm"
          p={{ base: 6, md: 8 }}
        >
          <HStack gap={5} align="center">
            <Box
              bg="blue.600"
              color="white"
              borderRadius="full"
              w="72px"
              h="72px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              fontSize="xl"
            >
              {initials}
            </Box>
            <VStack align="start" gap={1}>
              <Heading size="lg" color="blue.800">
                {displayName}
              </Heading>
              {email && <Text color="gray.600">{email}</Text>}
              <Text color="gray.600">UID: {userUid}</Text>
            </VStack>
          </HStack>
          <HStack gap={3}>
            <Link to={"/profile"}>
              <Button variant="outline" colorScheme="blue">
                Edit profile
              </Button>
            </Link>
            <Link to={"/signout"}>
              <Button colorScheme="blue">Log out</Button>
            </Link>
          </HStack>
        </Flex>

        {/* Orders */}
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Your orders
          </Heading>
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            p={{ base: 4, md: 6 }}
          >
            {orders.length === 0 ? (
              <Text color="gray.500">No orders found.</Text>
            ) : (
              <OrdersList orders={orders} />
            )}
          </Box>
        </Box>

        {/* Account actions */}
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Account
          </Heading>
          <Box
            bg="white"
            borderRadius="xl"
            boxShadow="sm"
            p={{ base: 4, md: 6 }}
          >
            <VStack align="start" gap={3}>
              <Text color="gray.700">
                Manage your personal information, security and preferences.
              </Text>
              <HStack gap={3}>
                <Button variant="outline" colorScheme="blue">
                  Change password
                </Button>
                <Button variant="outline" colorScheme="blue">
                  Manage addresses
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
