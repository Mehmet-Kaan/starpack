import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Button,
  Flex,
  VStack,
  HStack,
  Badge,
  Icon,
} from "@chakra-ui/react";
import { FaFilePdf, FaSearch, FaDownload } from "react-icons/fa";
import ScrollReveal from "../hooks/ScrollReveal";

// List of available datablad files
const DATABLAD_FILES = [
  "Alu-form-rund.pdf",
  "Aluminium Folie 30cm.pdf",
  "Aluminium Folie 45cm.pdf",
  "Aluminiumbakke 850 ml.pdf",
  "Låg til Aluminiumbakke.pdf",
  "Burger-lommer.pdf",
  "Burger-papir.pdf",
  "Burgerbox.pdf",
  "Donerbox.pdf",
  "Dressingbæger 50ml.pdf",
  "Dressingbæger 80ml.pdf",
  "Låg til Dressingbæger 50_80ml.pdf",
  "Film 60cm - Datablad.pdf",
  "Film-Perforeret 45cm.pdf",
  "Franskbrødpose.pdf",
  "Grillpose/Varmpose.pdf",
  "Håndklarærulle 6stk.pdf",
  "JustOne.pdf",
  "Køkkenrulle.pdf",
  "Papirpose - Datablad.pdf",
  "Pergament.pdf",
  "Pølseeske 00 - Datablad.pdf",
  "Pølseeske 01 - Datablad.pdf",
  "Pølseeske Big - Datablad.pdf",
  "Pølseeske Medium - Datablad.pdf",
  "Pølseeske Small - Datablad.pdf",
  "Pommes-Frites-Bakke 0.pdf",
  "Pommes-Frites-Bakke 1.pdf",
  "Pommes-frites-bakke-2.pdf",
  "Salatbæger-375ml.pdf",
  "Salatbaeger-500ml.pdf",
  "Salatbager 250ml.pdf",
  "Salatbeger 750ml.pdf",
  "Serviet 33x33.pdf",
  "Serviet 40x40.pdf",
  "Termobakker 1-rum.pdf",
  "Termobakker 3-rum.pdf",
];

interface DatabladFile {
  fileName: string;
  displayName: string;
  url: string;
}

const Datablad = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsToShow, setItemsToShow] = useState(6); // Show 6 items initially

  // Create datablad file objects
  const databladFiles: DatabladFile[] = DATABLAD_FILES.map((file) => ({
    fileName: file,
    displayName: file.replace(/\.pdf$/i, "").replace(/\s*-\s*Datablad/gi, ""),
    url: `/starpack/datablads/${file}`,
  }));

  // Filter datablads by search term
  const filteredDatablads = useMemo(() => {
    if (!searchTerm) return databladFiles;

    const searchLower = searchTerm.toLowerCase();
    return databladFiles.filter(
      (file) =>
        file.displayName.toLowerCase().includes(searchLower) ||
        file.fileName.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  // Reset items to show when search changes
  useEffect(() => {
    setItemsToShow(6);
  }, [searchTerm]);

  // Get visible datablads based on itemsToShow
  const visibleDatablads = filteredDatablads.slice(0, itemsToShow);
  const hasMore = filteredDatablads.length > itemsToShow;

  const handleDownload = (file: DatabladFile) => {
    window.open(file.url, "_blank");
  };

  const handleShowMore = () => {
    setItemsToShow((prev) => Math.min(prev + 6, filteredDatablads.length));
  };

  return (
    <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 12 }}>
      <Container maxW="7xl">
        <ScrollReveal>
          <VStack mb={10} gap={4} align="flex-start">
            <Badge
              colorScheme="primary"
              borderRadius="full"
              px={4}
              py={1}
              fontSize="sm"
              fontWeight="semibold"
            >
              Produktinformation
            </Badge>
            <Heading size="2xl" color="primary.900">
              Produktdatablad
            </Heading>
            <Text color="gray.600" fontSize="lg" maxW="2xl">
              Hitta och ladda ner datablad för alla våra produkter. Alla
              dokument är tillgängliga i PDF-format.
            </Text>
            <Text color="primary.600" fontSize="sm" fontWeight="medium">
              {DATABLAD_FILES.length} tillgängliga datablad
            </Text>
          </VStack>
        </ScrollReveal>

        {/* Search and Filter Section */}
        <ScrollReveal>
          <Box
            bg="white"
            borderRadius="xl"
            p={6}
            boxShadow="md"
            mb={8}
            borderWidth="1px"
            borderColor="primary.100"
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={4}
              align={{ base: "stretch", md: "center" }}
            >
              <Box flex="1" position="relative">
                <Icon
                  as={FaSearch}
                  position="absolute"
                  left={4}
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.400"
                  zIndex={1}
                />
                <Input
                  placeholder="Sök efter datablad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  pl={12}
                  size="lg"
                  borderRadius="lg"
                  borderColor="gray.300"
                  _hover={{ borderColor: "primary.400" }}
                  _focus={{
                    borderColor: "primary.500",
                    boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)",
                  }}
                />
              </Box>
              {/* <HStack gap={2} flexWrap="wrap">
                {categories.slice(0, 6).map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "solid" : "outline"}
                    colorScheme="primary"
                    borderRadius="full"
                    onClick={() => setSelectedCategory(cat)}
                    _hover={{ transform: "translateY(-2px)" }}
                    transition="all 0.2s"
                  >
                    {cat}
                  </Button>
                ))}
                {categories.length > 6 && (
                  <Badge colorScheme="gray" px={3} py={1} borderRadius="full">
                    +{categories.length - 6} fler
                  </Badge>
                )}
              </HStack> */}
            </Flex>
          </Box>
        </ScrollReveal>

        {/* Datablad Grid */}
        {filteredDatablads.length === 0 ? (
          <Box
            bg="white"
            borderRadius="xl"
            p={12}
            textAlign="center"
            boxShadow="md"
          >
            <Icon as={FaFilePdf} boxSize={16} color="gray.300" mb={4} />
            <Heading size="md" mb={2} color="gray.600">
              Inga datablad hittades
            </Heading>
            <Text color="gray.500">Försök med en annan sökterm.</Text>
          </Box>
        ) : (
          <>
            <ScrollReveal>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                {visibleDatablads.map((file, index) => (
                  <Box
                    key={index}
                    bg="white"
                    borderRadius="xl"
                    p={6}
                    boxShadow="md"
                    borderWidth="1px"
                    borderColor="transparent"
                    transition="all 0.3s"
                    _hover={{
                      boxShadow: "xl",
                      transform: "translateY(-4px)",
                      borderColor: "primary.200",
                    }}
                  >
                    <VStack align="flex-start" gap={4}>
                      <Badge
                        colorScheme="primary"
                        borderRadius="full"
                        px={3}
                        py={1}
                        fontSize="xs"
                      >
                        PDF
                      </Badge>
                      <VStack align="flex-start" gap={2} flex="1" w="100%">
                        <Heading size="md" color="primary.900">
                          {file.displayName}
                        </Heading>
                        <Text fontSize="xs" color="gray.500" fontStyle="italic">
                          {file.fileName}
                        </Text>
                      </VStack>
                      <Button
                        colorScheme="primary"
                        size="md"
                        w="100%"
                        borderRadius="full"
                        fontWeight="semibold"
                        onClick={() => handleDownload(file)}
                        _hover={{ transform: "translateY(-2px)" }}
                        transition="all 0.2s"
                      >
                        <Icon as={FaDownload} mr={2} />
                        Ladda ner datablad
                      </Button>
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </ScrollReveal>

            {/* Show More Button */}
            {hasMore && (
              <Flex justify="center" mt={8}>
                <Button
                  size="lg"
                  variant="outline"
                  colorScheme="primary"
                  borderRadius="full"
                  fontWeight="semibold"
                  onClick={handleShowMore}
                  _hover={{ bg: "primary.50", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  Visa fler ({filteredDatablads.length - itemsToShow} kvar)
                </Button>
              </Flex>
            )}
          </>
        )}

        {/* Info Section */}
        {filteredDatablads.length > 0 && (
          <ScrollReveal>
            <Box
              bg="primary.50"
              borderRadius="xl"
              p={8}
              mt={12}
              borderWidth="1px"
              borderColor="primary.100"
            >
              <HStack gap={4} flexWrap="wrap">
                <Icon as={FaFilePdf} boxSize={8} color="primary.600" />
                <VStack align="flex-start" gap={1} flex="1">
                  <Heading size="md" color="primary.900">
                    Om produktdatablad
                  </Heading>
                  <Text color="gray.700" fontSize="sm">
                    Alla våra produktdatablad innehåller detaljerad information
                    om specifikationer, dimensioner och användningsområden.
                    Dokumenten är i PDF-format och kan öppnas i alla moderna
                    webbläsare.
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </ScrollReveal>
        )}
      </Container>
    </Box>
  );
};

export default Datablad;
