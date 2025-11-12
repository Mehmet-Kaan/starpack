import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import ScrollReveal from "../hooks/ScrollReveal";

const Privacy = () => {
  return (
    <Box py={20} bg="gray.50" minH="80vh">
      <Container maxW="3xl">
        <VStack gap={8} align="flex-start">
          <Heading as="h1" size="2xl">
            Integritetspolicy
          </Heading>

          <Text>
            På StarPack värnar vi om din integritet och strävar efter att skydda
            dina personuppgifter. Denna integritetspolicy förklarar hur vi
            samlar in, använder och skyddar information när du använder vår
            webbplats och våra tjänster.
          </Text>

          <ScrollReveal>
            <Heading as="h2" size="lg">
              1. Insamling av information
            </Heading>
            <Text>
              Vi samlar in information som du frivilligt lämnar när du t.ex.
              skapar ett konto, skickar en förfrågan eller registrerar dig för
              nyhetsbrev. Vi kan också samla in teknisk information som
              IP-adress, webbläsartyp och besökta sidor via cookies och liknande
              tekniker.
            </Text>
          </ScrollReveal>
          <ScrollReveal>
            <Heading as="h2" size="lg">
              2. Användning av information
            </Heading>
            <Text>Den insamlade informationen används för att:</Text>
            <VStack pl={6} align="flex-start">
              <Text>• Hantera och leverera beställningar</Text>
              <Text>
                • Förbättra webbplatsens funktionalitet och användarupplevelse
              </Text>
              <Text>
                • Kommunicera med dig om tjänster, erbjudanden och uppdateringar
              </Text>
            </VStack>
          </ScrollReveal>
          <ScrollReveal>
            <Heading as="h2" size="lg">
              3. Delning av information
            </Heading>
            <Text>
              Vi delar inte dina personuppgifter med tredje part för
              marknadsföringsändamål utan ditt samtycke. Vi kan dock dela
              information med våra tjänsteleverantörer som hjälper oss med
              betalningar, leveranser eller teknisk drift.
            </Text>
          </ScrollReveal>
          <ScrollReveal>
            <Heading as="h2" size="lg">
              4. Lagring och säkerhet
            </Heading>
            <Text>
              Vi vidtar rimliga åtgärder för att skydda dina uppgifter från
              obehörig åtkomst, förlust eller manipulation. Uppgifter lagras
              endast så länge det är nödvändigt för de ändamål som beskrivs i
              denna policy.
            </Text>
          </ScrollReveal>
          <ScrollReveal>
            <Heading as="h2" size="lg">
              5. Dina rättigheter
            </Heading>
            <Text>
              Du har rätt att begära åtkomst, rättelse eller radering av dina
              personuppgifter. Du kan även när som helst återkalla ditt samtycke
              till marknadsföringskommunikation.
            </Text>
          </ScrollReveal>
          <ScrollReveal>
            <Heading as="h2" size="lg">
              6. Kontakt
            </Heading>
            <Text>
              Om du har frågor om denna integritetspolicy eller hur vi hanterar
              dina uppgifter, vänligen kontakta oss på:
            </Text>
            <Text fontWeight="bold">info@starpack.se</Text>
          </ScrollReveal>
          <ScrollReveal>
            <Text fontSize="sm" color="gray.500">
              Denna integritetspolicy uppdaterades senast: 10 november 2025
            </Text>
          </ScrollReveal>
        </VStack>
      </Container>
    </Box>
  );
};

export default Privacy;
