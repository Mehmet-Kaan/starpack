import { Box, Heading, Text, Stack, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { useCart } from "../Contexts/CartContext";
import type { ProductType } from "../../hooks/types";

interface ProductProps {
  product: ProductType;
  cartItem?: {
    id: string;
    name: string;
    price: string;
    qty: number;
    image?: string;
  };
}

const Product = ({ product }: ProductProps) => {
  // const { addToCart, increaseQty, decreaseQty } = useCart();

  // const handleAdd = () => {
  //   addToCart({
  //     id: product.id,
  //     name: product.name,
  //     price: product.price,
  //     description: product.description,
  //     image: product.image,
  //     qty: 1,
  //   });
  // };

  return (
    <Box
      boxShadow="md"
      borderRadius="lg"
      p={4}
      bg="white"
      _hover={{ transform: "scale(1.02)", transition: "transform 0.35s" }}
    >
      <Stack gap={3}>
        <Link to={`/product/${product.id}`}>
          {/* <Link to={`/product/${product.id}`}> */}
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            borderRadius="md"
            objectFit="cover"
            loading="lazy"
            cursor="pointer"
            _hover={{ transform: "scale(1.02)", transition: "transform 0.2s" }}
          />
          {/* </Link> */}
          <Heading size="md" cursor="pointer" _hover={{ color: "blue.500" }}>
            {product.name}
          </Heading>
          <Text>{product.description}</Text>
          <Text fontWeight="bold">{product.price} Dk</Text>
        </Link>

        {/* Adding to cart, increasing or decreasing quantity */}
        {/* {cartItem ? (
          <Stack direction="row" align="center" gap={3}>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => decreaseQty(cartItem.id)}
            >
              -
            </Button>
            <Text fontWeight="bold">{cartItem.qty}</Text>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => increaseQty(cartItem.id)}
            >
              +
            </Button>
          </Stack>
        ) : (
          <Button colorScheme="blue" onClick={handleAdd}>
            Add to Cart
          </Button>
        )} */}
      </Stack>
    </Box>
  );
};

export default Product;
