import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { useCart } from "../Contexts/CartContext";
import type { ProductType } from "../../hooks/types";
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthProvider.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ProductProps {
  product: ProductType;
  cartItem?: {
    id: string;
    name: string;
    price: string;
    qty: number;
    image?: string;
  };
  onAdminEdit?: (product: ProductType) => void;
  onAdminDelete?: (product: ProductType) => void;
}

const Product = ({ product, onAdminEdit, onAdminDelete }: ProductProps) => {
  const { isAdmin } = useContext(AuthContext);

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
    <>
      <Box
        boxShadow="md"
        borderRadius="lg"
        p={4}
        bg="white"
        _hover={{ transform: "scale(1.02)", transition: "transform 0.35s" }}
        display="flex"
        justifyContent="center"
        w="fit-content"
      >
        <Stack gap={3} position={"relative"}>
          <Link to={`/product/${product.id}`}>
            <Image
              src={product.image || "./images/placeholder.png"}
              alt={product.name}
              borderRadius="md"
              objectFit="cover"
              loading="lazy"
              cursor="pointer"
              _hover={{
                transform: "scale(1.02)",
                transition: "transform 0.2s",
              }}
            />

            <Heading size="md" cursor="pointer" _hover={{ color: "blue.500" }}>
              {product.name}
            </Heading>

            <Text>{product.description}</Text>
            <Text fontWeight="bold">{product.price} Dk</Text>
          </Link>
          {/* Admin Buttons */}
          {isAdmin && (
            <Stack direction="row" justifyContent={"space-between"} gap={2}>
              <Button
                // p={0}
                // position={"absolute"}
                // right={0}
                // top={0}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                size="xs"
                onClick={() => onAdminEdit && onAdminEdit(product)}
              >
                <Icon as={FaEdit} />
                <Text fontWeight={"bold"} fontSize={"md"}>
                  Edit
                </Text>
              </Button>
              <Button
                size="xs"
                // p={0}
                // position={"absolute"}
                // left={0}
                // top={0}
                variant={"link"}
                onClick={() => onAdminDelete && onAdminDelete(product)}
              >
                <Icon as={FaTrash} />
              </Button>
            </Stack>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default Product;
