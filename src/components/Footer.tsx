import { Box, Flex, Text, IconButton, Icon, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaStar, FaFilePdf } from "react-icons/fa";

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
            to="/about"
            color="white"
            // _hover={{ textDecoration: "underline" }}
          >
            About
          </Link>
          <Link
            to="/contact"
            color="white"
            // _hover={{ textDecoration: "underline" }}
          >
            Contact
          </Link>
          <Link
            to="/privacy"
            color="white"
            // _hover={{ textDecoration: "underline" }}
          >
            Privacy
          </Link>
          <Link
            to="/faq"
            color="white"
            // _hover={{ textDecoration: "underline" }}
          >
            FAQ
          </Link>
          <Link 
            to="/datablad"
            color="white"
          >
            <Icon as={FaFilePdf} /> Datablad
          </Link>
        </Flex>

        {/* Social Icons */}
        <Flex gap={2}>
          <Link to="https://github.com/" target="_blank" aria-label="Github">
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            >
              <Icon as={FaGithub} />
            </IconButton>
          </Link>

          <Link to="https://twitter.com/" target="_blank" aria-label="Twitter">
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            >
              <Icon as={FaTwitter} />
            </IconButton>
          </Link>

          <Link
            to="https://linkedin.com/"
            target="_blank"
            aria-label="Linkedin"
          >
            <IconButton
              variant="ghost"
              color="white"
              _hover={{ bg: "primary.800" }}
            >
              <Icon as={FaLinkedin} />
            </IconButton>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
