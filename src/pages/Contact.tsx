import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Icon,
  Input,
  Textarea,
  Button,
  Field,
} from "@chakra-ui/react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const isNameError = name.trim().length < 2;
  const isEmailError = !emailRegex.test(email);
  const isMessageError = message.trim().length < 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isNameError || isEmailError || isMessageError) {
      setShowErrors(true);
      return;
    }
    try {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
      setShowErrors(false);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      // noop
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="7xl" px={{ base: 6, md: 12 }} py={{ base: 12, md: 16 }}>
        <VStack align="start" gap={6} mb={10}>
          <Heading size="2xl" color="blue.800">Kontakta oss</Heading>
          <Text fontSize="lg" color="gray.700">
            Har du frågor om produkter, offerter eller leveranser? Hör gärna av dig så hjälper vi dig.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
          <Box bg="white" borderRadius="xl" boxShadow="sm" p={6}>
            <Heading size="md" mb={4}>Företagsinformation</Heading>
            <VStack align="start" gap={4}>
              <HStack gap={3}>
                <Icon as={FaMapMarkerAlt} color="blue.600" />
                <Text>Naverland 21, 2600 Glostrup</Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={FaPhone} color="blue.600" />
                <Text>0 (723) 171-061</Text>
              </HStack>
              <HStack gap={3}>
                <Icon as={FaEnvelope} color="blue.600" />
                <Text>info@starpack.se</Text>
              </HStack>
              <Box borderTopWidth="1px" borderColor="gray.200" w="full" />
              <Text color="gray.600">Öppettider: Mån–Fre 09:00–17:00</Text>
            </VStack>
          </Box>

          <Box as="form" onSubmit={handleSubmit} bg="white" borderRadius="xl" boxShadow="sm" p={6}>
            <Heading size="md" mb={4}>Skicka ett meddelande</Heading>
            <VStack align="stretch" gap={4}>
                <Field.Root invalid={showErrors && isNameError} required>
                  <Field.Label>Namn</Field.Label>
                  <Input
                    placeholder="Ditt namn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {showErrors && isNameError && (
                    <Field.ErrorText>Vänligen ange ditt namn.</Field.ErrorText>
                  )}
                </Field.Root>
                <Field.Root invalid={showErrors && isEmailError} required>
                  <Field.Label>E-post</Field.Label>
                  <Input
                    type="email"
                    placeholder="namn@företag.se"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {showErrors && isEmailError && (
                    <Field.ErrorText>Vänligen ange en giltig e-post.</Field.ErrorText>
                  )}
                </Field.Root>
                <Field.Root invalid={showErrors && isMessageError} required>
                  <Field.Label>Meddelande</Field.Label>
                  <Textarea
                    rows={6}
                    placeholder="Skriv ditt ärende här..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  {showErrors && isMessageError && (
                    <Field.ErrorText>Meddelandet bör vara minst 10 tecken.</Field.ErrorText>
                  )}
                </Field.Root>
                <Button type="submit" colorScheme="blue" loading={submitting} alignSelf="start">
                  Skicka
                </Button>
                {submitted && (
                  <Text color="green.600">Tack! Ditt meddelande har skickats.</Text>
                )}
            </VStack>
          </Box>
        </SimpleGrid>

        <Box mt={12} bg="white" borderRadius="xl" boxShadow="sm" p={6}>
          <Heading size="md" mb={4}>Hitta oss</Heading>
          <iframe
            title="Map - Naverland 21, 2600 Glostrup"
            src="https://www.google.com/maps?q=Naverland%2021,%202600%20Glostrup&output=embed"
            height="300"
            width="100%"
            style={{ border: 0, borderRadius: "12px", background: "#E2E8F0" }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;


