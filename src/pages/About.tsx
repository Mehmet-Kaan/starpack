import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FaLeaf, FaHandshake, FaTruck } from "react-icons/fa";

const About = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero */}
      <Box bgGradient={{ base: "linear(to-b, white, blue.50)", md: "linear(to-r, white, blue.50)" }}>
        <Container maxW="7xl" px={{ base: 6, md: 12 }} py={{ base: 16, md: 24 }}>
          <VStack align="start" gap={6}>
            <Box as="span" bg="blue.100" color="blue.800" borderRadius="full" px={3} py={1} fontSize="sm">
              Om Star Pack
            </Box>
            <Heading size="2xl" color="blue.800">Vi förenklar emballage för företag</Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="gray.700" maxW="3xl">
              Star Pack levererar smarta, hållbara och prisvärda förpackningslösningar för företag i hela Norden.
              Vi fokuserar på kvalitet, service och snabb leverans.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Story + Image */}
      <Container maxW="7xl" px={{ base: 6, md: 12 }} py={{ base: 12, md: 16 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={12} alignItems="center">
          <VStack align="start" gap={5}>
            <Heading size="lg">Vår historia</Heading>
            <Text color="gray.700">
              Vi startade med en enkel idé: att göra det lättare för företag att få rätt emballage, i rätt tid.
              Sedan dess har vi hjälpt hundratals kunder att effektivisera sin packning och sänka sina kostnader.
            </Text>
            <Box as="ul" pl={5} color="gray.700" style={{ listStyleType: "disc" }}>
              <Box as="li" mb={1}>Snabb leverans och pålitlig service</Box>
              <Box as="li" mb={1}>Grossistpriser och brett sortiment</Box>
              <Box as="li">Fokus på hållbarhet och kvalitet</Box>
            </Box>
          </VStack>
          <Image
            src="/images/packaging-hero.jpg"
            alt="Star Pack lager och emballage"
            borderRadius="2xl"
            boxShadow="xl"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.indexOf("placeholder.png") === -1) {
                target.src = "/images/placeholder.png";
              }
            }}
          />
        </SimpleGrid>
      </Container>

      {/* Values */}
      <Box bg="white" py={16}>
        <Container maxW="7xl" px={{ base: 6, md: 12 }}>
          <Heading textAlign="center" mb={10}>Våra värderingar</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
            {[{
              icon: FaHandshake,
              title: "Kundfokus",
              text: "Vi bygger långsiktiga relationer med våra kunder."
            },{
              icon: FaTruck,
              title: "Leveranssäkerhet",
              text: "Snabb och säker leverans är vår prioritet."
            },{
              icon: FaLeaf,
              title: "Hållbarhet",
              text: "Vi väljer material och metoder som minskar påverkan."
            }].map((v, i) => (
              <VStack key={i} gap={3} align="start" bg="gray.50" p={6} borderRadius="xl" boxShadow="sm">
                <Icon as={v.icon} color="blue.700" boxSize={6} />
                <Heading size="md">{v.title}</Heading>
                <Text color="gray.700">{v.text}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Timeline (simple) */}
      <Container maxW="7xl" px={{ base: 6, md: 12 }} py={16}>
        <Heading size="lg" mb={8}>Milstolpar</Heading>
        <VStack align="start" gap={6}>
          {[{
            year: "2022",
            text: "Star Pack grundas och börjar leverera till lokala kunder."
          },{
            year: "2023",
            text: "Utökat sortiment och snabbare distributionskedja."
          },{
            year: "2024",
            text: "Lansering av onlinebeställningar och bredare täckning i Norden."
          }].map((m, i) => (
            <HStack key={i} align="start" gap={4}>
              <Box as="span" bg="blue.100" color="blue.800" borderRadius="full" px={3} py={1}>
                {m.year}
              </Box>
              <Text color="gray.700">{m.text}</Text>
            </HStack>
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default About;


