import { Box, Stack, Heading, Text, Image, SimpleGrid } from "@chakra-ui/react";

interface ProductProps {
  name: string;
  description?: string;
  price?: string;
  cost?: string;
  group?: string;
  originalName?: string;
  image?: string;
  qty?: number;
}

export interface OrderProps {
  id: string;
  orderID: string;
  name: string;
  date: string;
  timestamp?: any;
  uid?: string;
  content?: ProductProps[]; // <-- make optional to prevent crashes
}

const Order = ({ id, name, date, orderID, content }: OrderProps) => {
  const safeContent = Array.isArray(content) ? content : []; // ✅ ensures it's always an array

  const totalPrice = safeContent.reduce((sum, p) => {
    const price = parseFloat(p.price || "0");
    const qty = p.qty || 1;
    return sum + price * qty;
  }, 0);

  return (
    <Box
      key={id}
      boxShadow="md"
      borderRadius="lg"
      p={5}
      bg="white"
      _hover={{ boxShadow: "lg" }}
      transition="0.2s"
    >
      <Stack gap={3}>
        <Heading size="md">{name}</Heading>

        <Text fontSize="sm" color="gray.500">
          {date} • Order ID: {orderID}
        </Text>

        <SimpleGrid columns={[1, 2, 3]} gap={4}>
          {safeContent.length > 0 &&
            safeContent.map((product, i) => (
              <Box
                key={i}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                p={2}
                textAlign="center"
              >
                <Image
                  src={product.image || "/images/placeholder.png"}
                  alt={product.name || "Unnamed product"}
                  borderRadius="md"
                  boxSize="100px"
                  objectFit="cover"
                  mx="auto"
                  loading="lazy"
                />
                <Box fontWeight="bold" mt={2}>
                  {product.name || "No name"}
                </Box>
                <Box fontSize="sm" color="gray.500">
                  {product.price
                    ? `${product.price} DKK × ${product.qty || 1}`
                    : "No price"}
                </Box>
              </Box>
            ))}
        </SimpleGrid>

        <Box fontWeight="bold" fontSize="lg" textAlign="right">
          Total: {totalPrice.toFixed(2)} DKK
        </Box>
      </Stack>
    </Box>
  );
};

export default Order;
