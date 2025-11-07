import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin, FaStar } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="primary.900" color="white" py={6} mt={10}>
      <Flex
        maxW="6xl"
        mx="auto"
        px={4}
        justify="space-between"
        align="center"
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        {/* Left Side */}
        <HStack gap={2}>
          <Icon as={FaStar} color="primary.400" />
          <Text fontSize="sm">
            © {new Date().getFullYear()} Star Pack. All rights reserved.
          </Text>
        </HStack>

        {/* Right Side */}
        <Flex gap={4}>
          <Link
            href="/about"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            color="white"
            _hover={{ textDecoration: "underline" }}
          >
            Privacy
          </Link>
        </Flex>

        {/* Social Icons */}
        <Flex gap={2}>
          <Link href="https://github.com/" target="_blank" aria-label="Github">
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            />
            <Icon as={FaGithub} />
          </Link>

          <Link
            href="https://twitter.com/"
            target="_blank"
            aria-label="Twitter"
          >
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            />
            <Icon as={FaTwitter} />
          </Link>

          <Link
            href="https://linkedin.com/"
            target="_blank"
            aria-label="Linkedin"
          >
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            />
            <Icon as={FaLinkedin} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
