import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Image,
  Flex,
  HStack,
  Badge,
  Container,
  Icon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLeaf,
  FaTruckFast,
  FaMoneyBillWave,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaBoxOpen,
} from "react-icons/fa6";

import "../styles/home.css";
import ScrollReveal from "../hooks/ScrollReveal";

const Home = () => {
  return (
    <Box minH="100vh">
      <Box
        position="relative"
        bgImage="url('./images/packaging-hero.jpg')"
        bgSize="cover"
        bgPos="center"
        bgRepeat="no-repeat"
        _before={{
          content: '""',
          position: "absolute",
          inset: 0,
          bgGradient: {
            base: "linear(to-b, rgba(0,0,0,0.6), rgba(0,0,0,0.35))",
            md: "linear(to-b, rgba(255,255,255,0.78), rgba(255,255,255,0.45))",
          } as any,
          pointerEvents: "none",
        }}
      >
        <Container
          maxW="7xl"
          px={{ base: 0, md: 12 }}
          py={{ base: 16, md: 24 }}
        >
          <Box px={{ base: 4, md: 0 }}>
            <div className="aurora">
              <div></div>
              <div></div>
              <div></div>
            </div>

            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              justify="space-between"
              gap={6}
            >
              <Box
                position="relative"
                bgGradient="linear(to-b, rgba(255,255,255,0.30), rgba(255,255,255,0.10))"
                backdropFilter="saturate(180%) blur(22px)"
                border="1px solid rgba(255, 255, 255, 0.38)"
                boxShadow="0 20px 40px rgba(0, 0, 0, 0.18)"
                borderRadius="2xl"
                p={{ base: 6, md: 10 }}
                maxW={{ base: "full", md: "xl" }}
                _before={{
                  content: '""',
                  position: "absolute",
                  insetInline: 6,
                  top: 2,
                  height: "1px",
                  bgGradient:
                    "linear(to-r, rgba(255,255,255,0.8), rgba(255,255,255,0.3), rgba(255,255,255,0.8))",
                  borderRadius: "full",
                  pointerEvents: "none",
                }}
              >
                <VStack
                  align="flex-start"
                  gap={6}
                  maxW={{ base: "full", md: "lg" }}
                >
                  <Badge
                    colorScheme="primary"
                    borderRadius="full"
                    px={3}
                    py={1}
                    fontSize="sm"
                  >
                    Grossist inom emballage
                  </Badge>

                  <Heading size="2xl" color="primary.800" lineHeight="1.1">
                    Smartare förpackningar för effektiva leveranser
                  </Heading>
                  <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700">
                    Högkvalitativa kartonger, tejp och fyllnadsmaterial till
                    konkurrenskraftiga priser—med snabb leverans över hela
                    Sverige.
                  </Text>
                  <HStack gap={4} wrap="wrap">
                    <Link to="/webshop">
                      <Button 
                        size="lg" 
                        rounded="full"
                        fontWeight="semibold"
                        bg="black"
                        color="white"
                        _hover={{ bg: "gray.800", transform: "translateY(-2px)" }}
                        transition="all 0.2s"
                        boxShadow="lg"
                      >
                        Utforska Produkter
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button 
                        variant="outline" 
                        size="lg"
                        rounded="full"
                        fontWeight="semibold"
                        borderWidth="2px"
                        _hover={{ bg: "whiteAlpha.200", transform: "translateY(-2px)" }}
                        transition="all 0.2s"
                      >
                        Kontakta oss
                      </Button>
                    </Link>
                  </HStack>
                  <HStack gap={6} pt={2} color="gray.600" fontSize="sm">
                    <HStack gap={2}>
                      <Icon as={FaTruckFast} />
                      <Text>Snabb leverans</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Icon as={FaMoneyBillWave} />
                      <Text>Grossistpriser</Text>
                    </HStack>
                    <HStack gap={2}>
                      <Icon as={FaLeaf} />
                      <Text>Hållbara val</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Box>

              {/* <Image
              src="/images/packaging-hero2.jpg"
              alt="Emballage och förpackningsmaterial"
              borderRadius="2xl"
              mt={{ base: 10, md: 0 }}
              boxShadow="xl"
              maxW={{ base: "100%", md: "45%" }}
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.indexOf("placeholder.png") === -1) {
                  target.src = "/images/placeholder.png";
                }
              }}
            /> */}
            </Flex>
          </Box>
        </Container>
      </Box>
      {/* Stats Strip */}
      <Box bg="white" borderTopWidth="1px" borderBottomWidth="1px" borderColor="primary.100">
        <Container maxW="7xl" px={{ base: 6, md: 12 }} py={12}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 6, md: 10 }}>
            {[
              { value: "10k+", label: "Ordrar levererade", icon: FaTruckFast },
              { value: "1–2 dgr", label: "Normal leveranstid", icon: FaTruckFast },
              { value: "500+", label: "Produkter i lager", icon: FaBoxOpen },
              { value: "4.9/5", label: "Kundbetyg", icon: FaStar },
            ].map((s, i) => (
              <VStack key={i} gap={3} textAlign="center">
                <Box
                  w="12"
                  h="12"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  bg="primary.50"
                  color="primary.700"
                >
                  <Icon as={s.icon} boxSize={5} />
                </Box>
                <Heading size="xl" color="primary.800" fontWeight="bold">
                  {s.value}
                </Heading>
                <Text color="gray.600" fontSize="sm" fontWeight="medium">
                  {s.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Product Categories */}
      <ScrollReveal>
        <Container maxW="7xl" py={24} px={{ base: 6, md: 12 }}>
          <VStack mb={12} gap={2}>
            <Badge
              colorScheme="primary"
              borderRadius="full"
              px={4}
              py={1}
              fontSize="sm"
              fontWeight="semibold"
            >
              Produktkategorier
            </Badge>
            <Heading textAlign="center" size="2xl" color="primary.900">
              Våra Produktkategorier
            </Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {[
              {
                title: "Kartonger",
                image: "/starpack/images/boxes.jpg",
                text: "Stabila kartonger i olika storlekar för alla behov.",
              },
              {
                title: "Tejp & Fyllnad",
                image: "/starpack/images/tape.jpg",
                text: "Säkra paket med tejp, bubbelplast och fyllnadsmaterial.",
              },
              {
                title: "Plast & Påsar",
                image: "/starpack/images/plastic.jpg",
                text: "Praktiska påsar och stretchfilm för enkel packning.",
              },
            ].map((item, i) => (
              <Box
                key={i}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                overflow="hidden"
                transition="all 0.3s"
                borderWidth="1px"
                borderColor="transparent"
                _hover={{ boxShadow: "xl", transform: "translateY(-6px)", borderColor: "primary.200" }}
              >
                <Box position="relative" overflow="hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    h="240px"
                    w="100%"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.indexOf("placeholder.png") === -1) {
                        target.src = "./images/placeholder.png";
                      }
                    }}
                  />
                </Box>
                <Box p={8}>
                  <Heading size="lg" mb={3} color="primary.900">
                    {item.title}
                  </Heading>
                  <Text color="gray.600" fontSize="md" lineHeight="tall">
                    {item.text}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </ScrollReveal>

      {/* Featured Products */}
      <ScrollReveal>
        <Container maxW="7xl" py={12} px={{ base: 6, md: 12 }}>
          <Flex justify="space-between" align="center" mb={8}>
            <VStack align="flex-start" gap={1}>
              <Heading size="xl" color="primary.900">Utvalda produkter</Heading>
              <Text color="gray.600" fontSize="sm">Populära produkter från vårt sortiment</Text>
            </VStack>
            <Link to="/webshop">
              <Button 
                variant="ghost" 
                rounded="full"
                fontWeight="semibold"
                _hover={{ bg: "primary.50" }}
              >
                Se alla →
              </Button>
            </Link>
          </Flex>
          {/* Mobile: horizontal scroll, Desktop: grid */}
          <Box display={{ base: "block", md: "none" }}>
            <HStack gap={4} overflowX="auto" py={2} px={1}>
              {[
                {
                  title: "Flyttlåda L",
                  price: "89 kr",
                  image: "/starpack/images/boxes.jpg",
                },
                {
                  title: "Packtejp 48mm",
                  price: "29 kr",
                  image: "/starpack/images/tape.jpg",
                },
                {
                  title: "Bubbelplast rulle",
                  price: "149 kr",
                  image: "/starpack/images/plastic.jpg",
                },
                {
                  title: "E-handelspåse",
                  price: "99 kr",
                  image: "/starpack/images/plastic.jpg",
                },
              ].map((p, i) => (
                <Box
                  key={i}
                  minW="280px"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="md"
                  overflow="hidden"
                  transition="all 0.3s"
                  borderWidth="1px"
                  borderColor="transparent"
                  _hover={{ boxShadow: "xl", transform: "translateY(-4px)", borderColor: "primary.200" }}
                >
                  <Box position="relative" overflow="hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      h="180px"
                      w="100%"
                      objectFit="cover"
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.05)" }}
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.src.indexOf("placeholder.png") === -1) {
                          target.src = "/starpack/images/placeholder.png";
                        }
                      }}
                    />
                  </Box>
                  <Box p={5}>
                    <Heading size="md" mb={2} color="primary.900">
                      {p.title}
                    </Heading>
                    <Text color="primary.700" fontWeight="bold" fontSize="lg">
                      {p.price}
                    </Text>
                  </Box>
                </Box>
              ))}
            </HStack>
          </Box>
          <SimpleGrid
            columns={{ base: 1, md: 4 }}
            gap={6}
            display={{ base: "none", md: "grid" }}
          >
            {[
              {
                title: "Flyttlåda L",
                price: "89 kr",
                image: "/starpack/images/boxes.jpg",
              },
              {
                title: "Packtejp 48mm",
                price: "29 kr",
                image: "/starpack/images/tape.jpg",
              },
              {
                title: "Bubbelplast rulle",
                price: "149 kr",
                image: "/starpack/images/plastic.jpg",
              },
              {
                title: "E-handelspåse",
                price: "99 kr",
                image: "/starpack/images/plastic.jpg",
              },
            ].map((p, i) => (
              <Box
                key={i}
                bg="white"
                borderRadius="xl"
                boxShadow="md"
                overflow="hidden"
                transition="all 0.3s"
                borderWidth="1px"
                borderColor="transparent"
                cursor="pointer"
                _hover={{ boxShadow: "xl", transform: "translateY(-6px)", borderColor: "primary.200" }}
              >
                <Box position="relative" overflow="hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    h="200px"
                    w="100%"
                    objectFit="cover"
                    transition="transform 0.3s"
                    _hover={{ transform: "scale(1.05)" }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (target.src.indexOf("placeholder.png") === -1) {
                        target.src = "/starpack/images/placeholder.png";
                      }
                    }}
                  />
                </Box>
                <Box p={5}>
                  <Heading size="md" mb={2} color="primary.900">
                    {p.title}
                  </Heading>
                  <Text color="primary.700" fontWeight="bold" fontSize="lg">
                    {p.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </ScrollReveal>

      {/* Trusted By Section */}
      <ScrollReveal>
        <Box bg="primary.50" py={20}>
          <Container maxW="6xl" textAlign="center">
            <VStack gap={4} mb={10}>
              <Badge
                colorScheme="primary"
                borderRadius="full"
                px={4}
                py={1}
                fontSize="sm"
                fontWeight="semibold"
              >
                Förtroende
              </Badge>
              <Heading size="xl" color="primary.900">
                Pålitlig partner till företag i hela Sverige
              </Heading>
            </VStack>
            <Flex
              justify="center"
              align="center"
              wrap="wrap"
              gap={8}
            >
              {["PostNord", "Schenker", "IKEA", "Bring", "Apotea"].map(
                (name) => (
                  <Box
                    key={name}
                    px={8}
                    py={4}
                    borderRadius="xl"
                    bg="white"
                    boxShadow="sm"
                    transition="all 0.2s"
                    _hover={{ 
                      boxShadow: "md", 
                      transform: "translateY(-2px)",
                    }}
                    borderWidth="1px"
                    borderColor="primary.100"
                  >
                    <Text fontWeight="semibold" color="gray.700" fontSize="md">
                      {name}
                    </Text>
                  </Box>
                )
              )}
            </Flex>
          </Container>
        </Box>
      </ScrollReveal>

      {/* Benefits Section */}
      <ScrollReveal>
        <Box 
          bgGradient="linear(to-b, primary.800, primary.900)" 
          color="white" 
          py={24}
        >
          <Container maxW="7xl" px={{ base: 6, md: 12 }}>
            <VStack mb={16} gap={3}>
              <Badge
                bg="whiteAlpha.200"
                color="white"
                borderRadius="full"
                px={4}
                py={1}
                fontSize="sm"
                fontWeight="semibold"
              >
                Varför oss?
              </Badge>
              <Heading textAlign="center" size="2xl" mb={4}>
                Varför välja oss?
              </Heading>
              <Text textAlign="center" color="primary.100" fontSize="lg" maxW="2xl">
                Vi erbjuder kvalitet, snabbhet och hållbarhet i varje leverans
              </Text>
            </VStack>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
              {[
                {
                  icon: FaTruckFast,
                  title: "Snabb Leverans",
                  text: "Snabb och pålitlig leverans över hela Sverige.",
                },
                {
                  icon: FaMoneyBillWave,
                  title: "Grossistpriser",
                  text: "Konkurrenskraftiga priser för företag.",
                },
                {
                  icon: FaLeaf,
                  title: "Hållbara Material",
                  text: "Återvinningsbara och miljövänliga förpackningar.",
                },
              ].map((item, i) => (
                <VStack key={i} gap={5} p={6} borderRadius="xl" _hover={{ bg: "whiteAlpha.100" }} transition="all 0.3s">
                  <Box
                    w="16"
                    h="16"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="full"
                    bg="whiteAlpha.200"
                    borderWidth="2px"
                    borderColor="whiteAlpha.300"
                  >
                    <Icon as={item.icon} boxSize={7} />
                  </Box>
                  <Heading size="lg">{item.title}</Heading>
                  <Text textAlign="center" color="primary.100" fontSize="md" lineHeight="tall">
                    {item.text}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      </ScrollReveal>

      {/* Testimonials Slider */}
      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <Box bgGradient="linear(to-b, white, primary.50)" py={24}>
          <Container maxW="4xl" textAlign="center" px={6}>
            <VStack gap={6} mb={10}>
              <Heading size="2xl" color="primary.900" mb={2}>
                Redo att beställa?
              </Heading>
              <Text fontSize="xl" color="gray.700" maxW="2xl">
                Utforska våra produkter och börja handla direkt online.
              </Text>
            </VStack>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="/webshop">
                <Button 
                  size="lg" 
                  rounded="full"
                  fontWeight="semibold"
                  bg="black"
                  color="white"
                  px={8}
                  _hover={{ bg: "gray.800", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  boxShadow="lg"
                >
                  Till Produkterna
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  rounded="full"
                  fontWeight="semibold"
                  borderWidth="2px"
                  px={8}
                  _hover={{ bg: "white", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  Få offert
                </Button>
              </Link>
            </HStack>
          </Container>
        </Box>
      </ScrollReveal>
    </Box>
  );
};

export default Home;

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Snabb leverans och bra priser. Star Pack har blivit vår förstahandsleverantör för allt emballage.",
      name: "Sara L.",
      company: "E-handlare i Stockholm",
      rating: 5,
    },
    {
      quote:
        "Kvaliteten på kartonger och tejp är toppklass. Rekommenderas varmt!",
      name: "Jonas P.",
      company: "Lagerchef, Malmö",
      rating: 5,
    },
    {
      quote:
        "Smidigt att beställa och allt kom i tid. Dessutom hållbara material!",
      name: "Emelie K.",
      company: "Butiksägare, Uppsala",
      rating: 4,
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const t = testimonials[index];

  return (
    <Box bg="primary.50" py={24}>
      <Container maxW="5xl" px={{ base: 6, md: 12 }}>
        <VStack mb={12} gap={3}>
          <Badge
            colorScheme="primary"
            borderRadius="full"
            px={4}
            py={1}
            fontSize="sm"
            fontWeight="semibold"
          >
            Kundomdömen
          </Badge>
          <Heading textAlign="center" size="2xl" color="primary.900">
            Vad våra kunder säger
          </Heading>
        </VStack>
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="xl"
          p={{ base: 8, md: 12 }}
          position="relative"
          borderWidth="1px"
          borderColor="primary.100"
        >
          <Flex justify="space-between" align="center" gap={6} direction={{ base: "column", md: "row" }}>
            <Button
              aria-label="Föregående omdöme"
              variant="ghost"
              rounded="full"
              size="lg"
              onClick={() =>
                setIndex(
                  (index - 1 + testimonials.length) % testimonials.length
                )
              }
              _hover={{ bg: "primary.50" }}
            >
              <Icon as={FaChevronLeft} boxSize={5} />
            </Button>

            <VStack flex="1" gap={5} textAlign="center" px={{ base: 0, md: 8 }}>
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" fontStyle="italic" lineHeight="tall">
                "{t.quote}"
              </Text>
              <HStack justify="center" gap={1}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    as={FaStar}
                    color={i < t.rating ? "yellow.400" : "gray.300"}
                    boxSize={5}
                  />
                ))}
              </HStack>
              <VStack gap={0}>
                <Text fontWeight="bold" fontSize="lg" color="primary.900">{t.name}</Text>
                <Text color="gray.500" fontSize="sm">
                  {t.company}
                </Text>
              </VStack>
            </VStack>

            <Button
              aria-label="Nästa omdöme"
              variant="ghost"
              rounded="full"
              size="lg"
              onClick={() => setIndex((index + 1) % testimonials.length)}
              _hover={{ bg: "primary.50" }}
            >
              <Icon as={FaChevronRight} boxSize={5} />
            </Button>
          </Flex>

          <HStack justify="center" gap={2} mt={8}>
            {testimonials.map((_, i) => (
              <Box
                key={i}
                w={i === index ? 8 : 2}
                h={2}
                borderRadius="full"
                bg={i === index ? "primary.600" : "primary.200"}
                transition="all 0.2s"
                cursor="pointer"
                onClick={() => setIndex(i)}
                _hover={{ bg: i === index ? "primary.600" : "primary.300" }}
              />
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};
