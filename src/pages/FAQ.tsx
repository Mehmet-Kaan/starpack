import {
  Box,
  Container,
  Heading,
  Accordion,
  VStack,
  Text,
} from "@chakra-ui/react";

const FAQ = () => {
  const faqItems = [
    {
      question: "Vilka typer av förpackningar erbjuder ni?",
      answer:
        "Vi erbjuder kartonger, tejp, fyllnadsmaterial, påsar och stretchfilm i olika storlekar och material för att passa alla typer av försändelser.",
    },
    {
      question: "Hur lång tid tar leveransen?",
      answer:
        "Vanligtvis levererar vi inom 1-3 arbetsdagar i hela Sverige, beroende på produkt och lagerstatus.",
    },
    {
      question: "Kan jag beställa som privatperson?",
      answer:
        "Ja, men våra priser och kvantiteter är anpassade för företag. Vi rekommenderar större beställningar för att få bästa pris.",
    },
    {
      question: "Erbjuder ni hållbara förpackningsalternativ?",
      answer:
        "Absolut! Vi har återvinningsbara och miljövänliga alternativ för alla typer av produkter.",
    },
    {
      question: "Hur kan jag få en offert?",
      answer:
        "Du kan kontakta oss direkt via vårt kontaktformulär eller skicka ett mail till info@starpack.se med dina önskemål.",
    },
  ];

  return (
    <Box py={20} bg="gray.50" minH="80vh">
      <Container maxW="3xl">
        <VStack gap={8} align="flex-start">
          <Heading as="h1" size="2xl">
            Vanliga Frågor (FAQ)
          </Heading>

          <Accordion.Root collapsible>
            {faqItems.map((item, index) => (
              <Accordion.Item key={index} value={`item-${index}`}>
                <Accordion.ItemTrigger
                  _expanded={{ bg: "blue.50", color: "blue.800" }}
                  borderRadius="md"
                  px={4}
                  py={3}
                >
                  {item.question}
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Accordion.ItemBody>
                    <Text color="gray.700" pl={4} pt={2}>
                      {item.answer}
                    </Text>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQ;
