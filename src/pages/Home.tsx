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
} from "react-icons/fa6";

import "../styles/home.css";

const Home = () => {
  return (
    <Box minH="100vh">
      <Box
        position="relative"
        bgImage="url('/images/packaging-hero.jpg')"
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
                      <Button size="lg">Utforska Produkter</Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" size="lg">
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
      <Box bg="white" borderTopWidth="1px" borderBottomWidth="1px">
        <Container maxW="7xl" px={{ base: 6, md: 12 }} py={8}>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 6, md: 10 }}>
            {[
              { value: "10k+", label: "Ordrar levererade" },
              { value: "1–2 dgr", label: "Normal leveranstid" },
              { value: "500+", label: "Produkter i lager" },
              { value: "4.9/5", label: "Kundbetyg" },
            ].map((s, i) => (
              <VStack key={i} gap={0} textAlign="center">
                <Heading size="lg" color="primary.800">
                  {s.value}
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  {s.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Product Categories */}
      <Container maxW="7xl" py={20} px={{ base: 6, md: 12 }}>
        <Heading textAlign="center" mb={12}>
          Våra Produktkategorier
        </Heading>
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
              boxShadow="sm"
              overflow="hidden"
              transition="0.3s"
              _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                h="220px"
                w="100%"
                objectFit="cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src.indexOf("placeholder.png") === -1) {
                    target.src = "./images/placeholder.png";
                  }
                }}
              />
              <Box p={6}>
                <Heading size="md" mb={2}>
                  {item.title}
                </Heading>
                <Text color="gray.600">{item.text}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Featured Products */}
      <Container maxW="7xl" py={6} px={{ base: 6, md: 12 }}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="lg">Utvalda produkter</Heading>
          <Link to="/webshop">
            <Button variant="ghost">Se alla</Button>
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
                minW="260px"
                bg="white"
                borderRadius="xl"
                boxShadow="sm"
                overflow="hidden"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  h="160px"
                  w="100%"
                  objectFit="cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    if (target.src.indexOf("placeholder.png") === -1) {
                      target.src = "/starpack/images/placeholder.png";
                    }
                  }}
                />
                <Box p={4}>
                  <Heading size="sm" mb={1}>
                    {p.title}
                  </Heading>
                  <Text color="primary.700" fontWeight="semibold">
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
              boxShadow="sm"
              overflow="hidden"
              transition="0.2s"
              _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
            >
              <Image
                src={p.image}
                alt={p.title}
                h="160px"
                w="100%"
                objectFit="cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  if (target.src.indexOf("placeholder.png") === -1) {
                    target.src = "/starpack/images/placeholder.png";
                  }
                }}
              />
              <Box p={4}>
                <Heading size="sm" mb={1}>
                  {p.title}
                </Heading>
                <Text color="primary.700" fontWeight="semibold">
                  {p.price}
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Container>

      {/* Trusted By Section */}
      <Box bg="primary.50" py={16}>
        <Container maxW="6xl" textAlign="center">
          <Text
            color="primary.700"
            textTransform="uppercase"
            fontWeight="semibold"
            letterSpacing="wide"
            mb={6}
          >
            Pålitlig partner till företag i hela Sverige
          </Text>
          <Flex
            justify="center"
            align="center"
            wrap="wrap"
            gap={10}
            opacity={0.9}
          >
            {["PostNord", "Schenker", "IKEA", "Bring", "Apotea"].map((name) => (
              <Box
                key={name}
                px={6}
                py={3}
                borderRadius="md"
                bg="white"
                boxShadow="sm"
              >
                <Text fontWeight="bold" color="gray.700" fontSize="md">
                  {name}
                </Text>
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box bg="primary.800" color="white" py={20}>
        <Container maxW="7xl" px={{ base: 6, md: 12 }}>
          <Heading textAlign="center" mb={12}>
            Varför välja oss?
          </Heading>
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
              <VStack key={i} gap={4}>
                <Box
                  w="14"
                  h="14"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  bg="whiteAlpha.200"
                >
                  <Icon as={item.icon} boxSize={6} />
                </Box>
                <Heading size="md">{item.title}</Heading>
                <Text textAlign="center" color="primary.100">
                  {item.text}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Slider */}
      <TestimonialsSection />

      {/* CTA Section */}
      <Container maxW="4xl" textAlign="center" py={24} px={6}>
        <Heading mb={4}>Redo att beställa?</Heading>
        <Text fontSize="lg" color="gray.700" mb={8}>
          Utforska våra produkter och börja handla direkt online.
        </Text>
        <HStack justify="center" gap={4}>
          <Link to="/webshop">
            <Button size="lg">Till Produkterna</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Få offert
            </Button>
          </Link>
        </HStack>
      </Container>
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
    <Box bg="primary.50" py={20}>
      <Container maxW="4xl" px={{ base: 6, md: 12 }}>
        <Heading textAlign="center" mb={10} color="primary.900">
          Vad våra kunder säger
        </Heading>
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          p={{ base: 6, md: 10 }}
          position="relative"
        >
          <Flex justify="space-between" align="center" gap={6}>
            <Button
              aria-label="Föregående omdöme"
              variant="ghost"
              onClick={() =>
                setIndex(
                  (index - 1 + testimonials.length) % testimonials.length
                )
              }
            >
              <Icon as={FaChevronLeft} />
            </Button>

            <VStack flex="1" gap={4} textAlign="center">
              <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700">
                “{t.quote}”
              </Text>
              <HStack justify="center" gap={1}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    as={FaStar}
                    color={i < t.rating ? "yellow.400" : "gray.300"}
                  />
                ))}
              </HStack>
              <Text fontWeight="semibold">{t.name}</Text>
              <Text color="gray.500" fontSize="sm">
                {t.company}
              </Text>
            </VStack>

            <Button
              aria-label="Nästa omdöme"
              variant="ghost"
              onClick={() => setIndex((index + 1) % testimonials.length)}
            >
              <Icon as={FaChevronRight} />
            </Button>
          </Flex>

          <HStack justify="center" gap={2} mt={6}>
            {testimonials.map((_, i) => (
              <Box
                key={i}
                w={i === index ? 6 : 2}
                h={2}
                borderRadius="full"
                bg={i === index ? "primary.600" : "primary.200"}
                transition="width 0.2s"
                cursor="pointer"
                onClick={() => setIndex(i)}
              />
            ))}
          </HStack>
        </Box>
      </Container>
    </Box>
  );
};
