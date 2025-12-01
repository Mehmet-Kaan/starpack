import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Icon,
  Badge,
  Drawer,
  useDisclosure,
  Link as ChakraLink,
  Image,
  Portal,
  Text,
} from "@chakra-ui/react";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaPhone,
  FaStar,
} from "react-icons/fa";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useCart } from "./Contexts/CartContext.js";
import ProfileButton from "./Profile/ProfileButton.js";
import { useCartDrawer } from "./Contexts/CartDrawerContext";
import ScrollReveal from "../hooks/ScrollReveal.js";

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const { open, onToggle } = useDisclosure();
  const { openCart } = useCartDrawer();
  const location = useLocation();

  return (
    <Box
      background={"primary.50"}
      top="env(safe-area-inset-top, 0px)"
      backdropFilter="saturate(180%) blur(20px)"
      bgGradient="linear(to-b, rgba(255,255,255,0.7), rgba(255,255,255,0.4))"
      borderBottomWidth="1px"
      borderColor="primary.200"
      boxShadow="0 10px 30px rgba(0, 0, 0, 0.18)"
    >
      <ScrollReveal>
        <Flex
          as="nav"
          position="sticky"
          maxW="7xl"
          color="black"
          p={5}
          display={"flex"}
          justify="space-between"
          align="center"
          margin={"auto"}
          zIndex={1000}
          _before={{
            content: '""',
            position: "absolute",
            insetInline: 0,
            top: 0,
            height: "1px",
            bgGradient:
              "linear(to-r, rgba(255,255,255,0.6), rgba(255,255,255,0.2), rgba(255,255,255,0.6))",
            pointerEvents: "none",
          }}
        >
          <Link to="/">
            <Flex align="center" justifyContent={"center"} gap={2}>
              <Image
                src="./images/star-pack-mark.svg"
                alt="Star Pack"
                height="28px"
              />
              {""}
              <Text fontWeight={"bold"} pt={3}>
                Star Pack
              </Text>
            </Flex>
          </Link>

          {/* Desktop Menu */}
          <Flex gap={4} display={{ base: "none", md: "flex" }} align="center">
            <Link to="/">
              <Button
                // size="sm"
                // rounded="full"
                // fontWeight="semibold"
                variant={location.pathname === "/" ? "subtle" : "ghost"}
                color="black"
                _hover={{ bg: "primary.100" }}
              >
                <Icon as={FaHome} mr={2} />
                Home
              </Button>
            </Link>
            <Link to="/products">
              <Button
                // size="sm"
                // rounded="full"
                // fontWeight="semibold"
                variant={
                  location.pathname.startsWith("/products") ? "subtle" : "ghost"
                }
                color="black"
                _hover={{ bg: "primary.100" }}
              >
                <Icon as={FaBoxOpen} mr={2} />
                Webshop
              </Button>
            </Link>
            <Button
              position="relative"
              color="black"
              variant="ghost"
              // size="sm"
              // rounded="full"
              // fontWeight="semibold"
              _hover={{ bg: "primary.100" }}
              onClick={openCart}
            >
              <Icon as={FaShoppingCart} mr={2} />
              Cart
              {totalItems > 0 && (
                <Badge
                  position="absolute"
                  top="0"
                  left="7"
                  fontSize="0.7em"
                  colorScheme="red"
                  borderRadius="full"
                  px={2}
                >
                  {totalItems}
                </Badge>
              )}
            </Button>

            <ProfileButton />

            <Link to="/contact">
              <Button
                size="sm"
                rounded="full"
                fontWeight="semibold"
                variant="solid"
                bg="black"
                color="white"
                _hover={{ bg: "gray.800" }}
              >
                <Icon as={FaStar} mr={2} />
                Get a Quote
              </Button>
            </Link>

            <ChakraLink
              href="tel:0723171061"
              color="black"
              display="inline-flex"
              alignItems="center"
              gap={2}
              px={4}
              py={2}
              borderRadius="full"
              bg="whiteAlpha.700"
              _hover={{ bg: "whiteAlpha.900", textDecoration: "none" }}
            >
              <Icon as={FaPhone} /> 0 (723) 171-061
            </ChakraLink>
          </Flex>

          {/* Mobile navbar */}
          <Icon
            as={open ? AiOutlineClose : AiOutlineMenu}
            boxSize={6}
            display={{ base: "block", md: "none" }}
            cursor="pointer"
            onClick={onToggle}
          />
        </Flex>

        {/* Mobile Drawer */}
        <Drawer.Root open={open}>
          <Portal>
            <Drawer.Backdrop style={{ zIndex: 9999, position: "fixed" }} />
            <Drawer.Positioner style={{ zIndex: 10000, position: "fixed" }}>
              <Drawer.Content style={{ zIndex: 10001, position: "relative" }}>
                <Drawer.Header justifyContent={"space-between"}>
                  {/* <Image src="/images/star-pack-logo.svg" alt="Star Pack" height="28px" /> */}
                  <Button
                    position={"absolute"}
                    right={"0"}
                    top={"1"}
                    padding={0}
                    variant="ghost"
                    onClick={onToggle}
                  >
                    <Icon as={AiOutlineClose} mr={2} />
                  </Button>
                </Drawer.Header>
                <Drawer.Body>
                  <Flex direction="column" gap={4}>
                    <Link to="/" onClick={onToggle}>
                      <Button
                        variant={location.pathname === "/" ? "subtle" : "ghost"}
                        rounded="full"
                        justifyContent="flex-start"
                      >
                        <Icon as={FaHome} mr={2} /> Home
                      </Button>
                    </Link>
                    <Link to="/products" onClick={onToggle}>
                      <Button
                        variant={
                          location.pathname.startsWith("/products")
                            ? "subtle"
                            : "ghost"
                        }
                        rounded="full"
                        justifyContent="flex-start"
                      >
                        <Icon as={FaBoxOpen} mr={2} /> Webshop
                      </Button>
                    </Link>
                    <Box>
                      <Button
                        variant="ghost"
                        position="relative"
                        onClick={() => {
                          openCart();
                          onToggle();
                        }}
                        rounded="full"
                      >
                        <Icon as={FaShoppingCart} mr={2} /> Cart
                        {totalItems > 0 && (
                          <Badge
                            position="absolute"
                            top="-1"
                            left="6"
                            fontSize="0.7em"
                            colorScheme="red"
                            borderRadius="full"
                            px={2}
                          >
                            {totalItems}
                          </Badge>
                        )}
                      </Button>
                    </Box>

                    <ProfileButton onClick={onToggle} />

                    <ChakraLink
                      href="tel:0723171061"
                      color="black"
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      px={4}
                      py={2}
                      borderRadius="full"
                      bg="whiteAlpha.200"
                      _hover={{ textDecoration: "none", bg: "whiteAlpha.300" }}
                    >
                      <Icon as={FaPhone} /> 0 (723) 171-061
                    </ChakraLink>
                  </Flex>
                </Drawer.Body>
                <Drawer.Footer></Drawer.Footer>
              </Drawer.Content>
            </Drawer.Positioner>
          </Portal>
        </Drawer.Root>
      </ScrollReveal>
    </Box>
  );
};

export default Navbar;
