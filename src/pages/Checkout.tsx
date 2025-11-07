import { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  Select,
  Textarea,
  Text,
  Button,
  Separator,
  Card,
  createListCollection,
} from "@chakra-ui/react";
import { useCart } from "../components/Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../components/firebase";
import { getNewID } from "../components/utils";

export const countryCollection = createListCollection({
  items: [
    { label: "Sweden", value: "sweden" },
    { label: "Denmark", value: "denmark" },
  ],
});

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [saving, setSaving] = useState(false);
  const [transportationOption, setTransportationOption] = useState<
    "delivery" | "pickup"
  >("delivery");
  const { currentUser } = useContext(AuthContext) as any;
  const [userData, setUserData] = useState<any>(null);

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("userData");

  //   if (storedUser) {
  //     const parsed = JSON.parse(storedUser);
  //     setUserData(parsed);

  //     // If the user has saved address data, populate it
  //     if (parsed.address) {
  //       setAddress({
  //         line1: parsed.address.line1 || "",
  //         line2: parsed.address.line2 || "",
  //         city: parsed.address.city || "",
  //         postalCode: parsed.address.postalCode || "",
  //         country: parsed.address.country || "",
  //         notes: parsed.address.notes || "",
  //       });
  //     }
  //   }
  // }, []);

  useEffect(() => {
    async function loadUserData() {
      try {
        const stored = sessionStorage.getItem("userData");
        if (!stored || !currentUser) return;

        let parsed;
        try {
          parsed = JSON.parse(stored);
        } catch (e) {
          console.error("Invalid JSON in session storage", e);
          sessionStorage.removeItem("userData");
          return;
        }

        setUserData(parsed);

        if (parsed.address) {
          setAddress({
            line1: parsed.address.line1 || "",
            line2: parsed.address.line2 || "",
            city: parsed.address.city || "",
            postalCode: parsed.address.postalCode || "",
            country: parsed.address.country || "",
            notes: parsed.address.notes || "",
          });
        }
      } catch (error) {
        console.error("Loading failed or no valid session data found:", error);
      }
    }

    loadUserData();
  }, [currentUser]);

  const paymentCollection = createListCollection({
    items: [
      { label: "Credit/Debit Card", value: "card" },
      { label: "Invoice", value: "invoice" },
      { label: "Swish", value: "swish" },
    ],
  });

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/\s/g, "").replace(",", ".")) || 0;
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0
  );
  const shipping = transportationOption === "delivery" ? 59 : 0;
  const vatRate = 0.25;
  const vat = subtotal * vatRate;
  const total = subtotal + vat + shipping;

  const getDate = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()} - ${now.getDate()}/${
      now.getMonth() + 1
    }/${now.getFullYear()}`;
  };

  const saveOrderToFirestore = async () => {
    if (!currentUser) return;
    setSaving(true);

    try {
      const userDocRef = doc(db, "users", currentUser.uid); // 👈 One doc per user
      const userDocSnap = await getDoc(userDocRef);

      // 🔹 Create the user document if it doesn't exist
      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: currentUser.uid,
          createdAt: serverTimestamp(),
        });
        console.log("🆕 Created new user order document:", currentUser.uid);
      }

      // 🔹 Create a subcollection for this user's orders
      const userOrdersCollection = collection(userDocRef, "orders");

      // 🔹 Get all existing orders to determine the count
      const snapshot = await getDocs(userOrdersCollection);
      const orderCount = snapshot.size;

      function removeUndefined(obj: any): any {
        if (Array.isArray(obj)) {
          return obj.map(removeUndefined);
        } else if (obj && typeof obj === "object") {
          return Object.fromEntries(
            Object.entries(obj)
              .filter(([_, v]) => v !== undefined)
              .map(([k, v]) => [k, removeUndefined(v)])
          );
        }
        return obj;
      }

      const sanitizedCart = removeUndefined(cart);

      const newOrder = {
        orderID: getNewID(orderCount.toString()),
        timestamp: serverTimestamp(),
        date: getDate(),
        uid: currentUser.uid,
        name: `Order #${orderCount + 1}`,
        content: sanitizedCart,
        address: address,
        transportationOption: transportationOption,
        totals: {
          subtotal: subtotal,
          shipping: shipping,
          vat: vat,
          total: total,
        },
      };

      // 🔹 Add new order to subcollection
      const orderDocRef = await addDoc(userOrdersCollection, newOrder);

      console.log("✅ Order saved with ID:", orderDocRef.id);
      clearCart();
    } catch (err) {
      console.error("🔥 Error saving order:", err);
    } finally {
      setSaving(false);
    }
  };

  const handlePlaceOrder = async () => {
    setSaving(true);
    try {
      // Placeholder: integrate payment or order save here
      await saveOrderToFirestore();
      sessionStorage.removeItem("orders");
      navigate("/profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box p={{ base: 6, md: 8 }} maxW={"7xl"} margin={"auto"}>
      <Heading mb={6}>Checkout</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} alignItems="start">
        <VStack align="stretch" gap={4}>
          <Card.Root>
            <Card.Header>
              <Heading size="md">Customer Information</Heading>
            </Card.Header>
            <Card.Body>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                <Input
                  placeholder="First name"
                  value={userData?.displayName || ""}
                  onChange={(e) =>
                    setUserData((prev: any) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Last name"
                  value={userData?.surname || ""}
                  onChange={(e) =>
                    setUserData((prev: any) => ({
                      ...prev,
                      surname: e.target.value,
                    }))
                  }
                />
              </SimpleGrid>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={4}>
                <Input
                  placeholder="Email"
                  type="email"
                  value={userData?.email || ""}
                  onChange={(e) =>
                    setUserData((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <Input
                  placeholder="Phone"
                  type="tel"
                  value={userData?.phone || ""}
                  onChange={(e) =>
                    setUserData((prev: any) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
              </SimpleGrid>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="md">Shipping Address</Heading>
            </Card.Header>
            <Card.Body>
              <VStack gap={4} align="stretch">
                <Input
                  placeholder="Address line 1"
                  value={address.line1}
                  onChange={(e) =>
                    setAddress({ ...address, line1: e.target.value })
                  }
                />
                <Input
                  placeholder="Address line 2 (optional)"
                  value={address.line2}
                  onChange={(e) =>
                    setAddress({ ...address, line2: e.target.value })
                  }
                />
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                  <Input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Postal code"
                    value={address.postalCode}
                    onChange={(e) =>
                      setAddress({ ...address, postalCode: e.target.value })
                    }
                  />
                  <Select.Root
                    size="md"
                    collection={countryCollection}
                    value={address.country ? [address.country] : []} // always an array
                    onValueChange={(details) => {
                      if (details.value && details.value.length > 0) {
                        setAddress({
                          ...address,
                          country: details.value[0],
                        });
                      }
                    }}
                  >
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Select country" />
                      </Select.Trigger>
                    </Select.Control>
                    <Select.Positioner>
                      <Select.Content>
                        <Select.Item item="sweden">Sweden</Select.Item>
                        <Select.Item item="denmark">Denmark</Select.Item>
                      </Select.Content>
                    </Select.Positioner>
                  </Select.Root>
                </SimpleGrid>
                <Textarea
                  placeholder="Order notes (optional)"
                  value={userData?.notes}
                />
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="md">Payment</Heading>
            </Card.Header>
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <Select.Root size="md" collection={paymentCollection}>
                  <Select.Label>Payment method</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select payment method" />
                    </Select.Trigger>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content>
                      <Select.Item item="card">Credit/Debit Card</Select.Item>
                      <Select.Item item="invoice">Invoice</Select.Item>
                      <Select.Item item="swish">Swish</Select.Item>
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
                <Input placeholder="Card number" />
                <SimpleGrid columns={2} gap={3}>
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVC" />
                </SimpleGrid>
              </VStack>
            </Card.Body>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Heading size="md">Transportation Options</Heading>
            </Card.Header>
            <Card.Body>
              <VStack align="stretch" gap={3}>
                <Box
                  p={4}
                  border="2px solid"
                  borderColor={
                    transportationOption === "delivery"
                      ? "blue.500"
                      : "gray.200"
                  }
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setTransportationOption("delivery")}
                  bg={transportationOption === "delivery" ? "blue.50" : "white"}
                  transition="all 0.2s"
                >
                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="semibold">Leverans</Text>
                      <Text fontSize="sm" color="gray.600">
                        Home delivery within 2-3 business days
                      </Text>
                    </VStack>
                    <Text fontWeight="bold" color="blue.600">
                      59 kr
                    </Text>
                  </HStack>
                </Box>

                <Box
                  p={4}
                  border="2px solid"
                  borderColor={
                    transportationOption === "pickup" ? "blue.500" : "gray.200"
                  }
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => setTransportationOption("pickup")}
                  bg={transportationOption === "pickup" ? "blue.50" : "white"}
                  transition="all 0.2s"
                >
                  <HStack justify="space-between" align="center">
                    <VStack align="start" gap={1}>
                      <Text fontWeight="semibold">Click & Collect</Text>
                      <Text fontSize="sm" color="gray.600">
                        Pick up from our warehouse - Free!
                      </Text>
                    </VStack>
                    <Text fontWeight="bold" color="green.600">
                      0 kr
                    </Text>
                  </HStack>
                </Box>

                {transportationOption === "pickup" && (
                  <Box
                    p={3}
                    bg="green.50"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="green.200"
                  >
                    <Text fontSize="sm" color="green.700">
                      📍 Pickup location: Star Pack Warehouse, Stockholm
                    </Text>
                    <Text fontSize="xs" color="green.600" mt={1}>
                      Available Mon-Fri 9:00-17:00, Sat 10:00-14:00
                    </Text>
                  </Box>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>

        <Card.Root position="sticky" top="88px">
          <Card.Header>
            <Heading size="md">Order Summary</Heading>
          </Card.Header>
          <Card.Body>
            <VStack align="stretch" gap={4}>
              {cart.length === 0 ? (
                <Text color="gray.600">Your cart is empty.</Text>
              ) : (
                cart.map((item, i) => (
                  <HStack key={i} justify="space-between">
                    <Text>
                      {item.name} × {item.qty}
                    </Text>
                    <Text fontWeight="semibold">
                      {(parsePrice(item.price) * item.qty).toFixed(2)}
                    </Text>
                  </HStack>
                ))
              )}
              <Separator />
              <HStack justify="space-between">
                <Text color="gray.600">Subtotal</Text>
                <Text>{subtotal.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">
                  {transportationOption === "delivery"
                    ? "Leverans"
                    : "Click & Collect"}
                </Text>
                <Text
                  color={
                    transportationOption === "pickup" ? "green.600" : "gray.900"
                  }
                >
                  {shipping.toFixed(2)} kr
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text color="gray.600">VAT (25%)</Text>
                <Text>{vat.toFixed(2)}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="bold">Total</Text>
                <Text fontWeight="bold">{total.toFixed(2)}</Text>
              </HStack>
            </VStack>
          </Card.Body>
          <Card.Footer>
            <Button
              colorScheme="blue"
              w="full"
              onClick={handlePlaceOrder}
              loading={saving}
              disabled={cart.length === 0}
            >
              Place Order
            </Button>
          </Card.Footer>
        </Card.Root>
      </SimpleGrid>
    </Box>
  );
};

export default Checkout;
