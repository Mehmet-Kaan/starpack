import {
  Box,
  Button,
  Heading,
  Image,
  VStack,
  HStack,
  Text,
  Drawer,
  Separator,
  Icon,
} from "@chakra-ui/react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, increaseQty, decreaseQty, clearCart } = useCart();
  const navigate = useNavigate();

  const parsePrice = (price: string): number => {
    return parseFloat(price.replace(/\s/g, "").replace(",", ".")) || 0;
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.qty,
    0
  );
  const vatRate = 0.25;
  const vat = subtotal * vatRate;
  const total = subtotal + vat;

  return (
    <Drawer.Root
      open={isOpen}
      onInteractOutside={() => onClose()}
      onEscapeKeyDown={() => onClose()}
      size={"sm"}
    >
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content>
          <Drawer.Header justifyContent={"space-between"}>
            <Heading size="md">Your Cart ({cart.length})</Heading>
            <HStack gap={2}>
              {cart.length > 0 && (
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={clearCart}
                >
                  <Icon as={FaTrash} />
                </Button>
              )}
              {/* Close button */}
              {/* <Button padding={0} variant="ghost" onClick={onClose}>
                <Icon as={AiOutlineClose} />
              </Button> */}
            </HStack>
          </Drawer.Header>
          <Separator />
          <Drawer.Body>
            {cart.length === 0 ? (
              <VStack gap={4} py={8}>
                <Text color="gray.600" textAlign="center">
                  Your cart is empty 🛒
                </Text>
                <Button colorScheme="blue" onClick={onClose}>
                  Continue Shopping
                </Button>
              </VStack>
            ) : (
              <VStack align="stretch" gap={4}>
                {cart.map((item, i) => (
                  <HStack key={i} justify="space-between" align="center">
                    <HStack gap={3}>
                      <Image
                        src={item.image || "/images/placeholder.png"}
                        alt={item.name}
                        boxSize="58px"
                        borderRadius="md"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => {
                          navigate(`/product/${item.id}`);
                          onClose();
                        }}
                      />
                      <Box>
                        <Text fontWeight="semibold" fontSize="sm">
                          {item.name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          {item.price} Dk
                        </Text>
                      </Box>
                    </HStack>
                    <HStack gap={2}>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </Button>
                      <Text fontWeight="bold" minW="20px" textAlign="center">
                        {item.qty}
                      </Text>
                      <Button
                        size="xs"
                        colorScheme="green"
                        onClick={() => increaseQty(item.id)}
                      >
                        +
                      </Button>
                    </HStack>
                  </HStack>
                ))}

                <Separator />
                <VStack align="stretch" gap={1}>
                  <HStack justify="space-between">
                    <Text color="gray.600">Subtotal</Text>
                    <Text>{subtotal.toFixed(2)}</Text>
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
              </VStack>
            )}
          </Drawer.Body>
          <Separator />
          {cart.length > 0 && (
            <Drawer.Footer>
              <HStack justifyContent={"space-evenly"} width="100%">
                <Button variant="ghost" onClick={onClose}>
                  Continue Shopping
                </Button>
                <Button
                  colorScheme="blue"
                  onClick={() => {
                    onClose();
                    navigate("/checkout");
                  }}
                >
                  Go to Checkout
                </Button>
              </HStack>
            </Drawer.Footer>
          )}
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
};

export default CartDrawer;
