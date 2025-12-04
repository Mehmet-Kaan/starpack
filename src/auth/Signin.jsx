import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../components/firebase.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Spinner,
  Flex,
  Image,
  VStack,
  Container,
} from "@chakra-ui/react";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@(hotmail\.com|gmail\.com)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signin = () => {
    const {currentUser} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const userRef = useRef();
    const errRef = useRef();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
      
    useEffect(()=>{
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    },[email])

    useEffect(()=>{
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    },[pwd])

    useEffect(()=>{
        setErrMsg('');
    }, [email,pwd]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        signInWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrMsg("Sorry! Email is not registered!");
        })
    }

    return (
      <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>
        {/* Left Side - Image (30%) */}
        <Box
          w={{ base: "100%", lg: "40%" }}
          h={{ base: "40vh", lg: "100vh" }}
          position="relative"
          display={{ base: "none", lg: "block" }}
        >
          <Image
            src="./images/packaging-hero.jpg"
            alt="Packaging"
            w="100%"
            h="100%"
            objectFit="cover"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.indexOf("placeholder.png") === -1) {
                target.src = "/images/placeholder.png";
              }
            }}
          />
          <Box
            position="absolute"
            inset={0}
            bgGradient="linear(to-b, rgba(0,0,0,0.3), rgba(0,0,0,0.5))"
          />
          <VStack
            position="absolute"
            top={48}
            left={0}
            right={0}
            px={8}
            color="white"
            align="flex-start"
            gap={2}
          >
            <Heading size="lg" color="white">
              Välkommen tillbaka!
            </Heading>
            <Text fontSize="md" color="whiteAlpha.900">
              Logga in för att fortsätta handla
            </Text>
          </VStack>
        </Box>

        {/* Right Side - Login Form (70%) */}
        <Flex
          w={{ base: "100%", lg: "70%" }}
          align="center"
          justify="center"
          bg="gray.50"
          p={{ base: 6, md: 12 }}
        >
          <Container maxW="md" w="100%">
            <Box
              // bg="white"
              // borderRadius="2xl"
              // boxShadow="xl"
              // p={{ base: 8, md: 12 }}
              // w="100%"
            >
              {loading ? (
                <Flex justify="center" py={12}>
                  <Spinner size="xl" color="primary.600" />
                </Flex>
              ) : (
                <>
                  <VStack mb={8} gap={2} align="flex-start">
                    <Heading size="xl" color="primary.900">
                      Logga in
                    </Heading>
                    <Text color="gray.600">
                      Ange dina uppgifter för att fortsätta
                    </Text>
                  </VStack>

                  {errMsg && (
                    <Box
                      ref={errRef}
                      bg="red.50"
                      borderColor="red.200"
                      borderWidth="1px"
                      borderRadius="md"
                      p={4}
                      mb={6}
                      aria-live="assertive"
                    >
                      <Text color="red.600" fontSize="sm" fontWeight="medium">
                        {errMsg}
                      </Text>
                    </Box>
                  )}

                  <form onSubmit={handleSubmit}>
                    <Stack spacing={6}>
                      <Box>
                        <Text mb={2} fontWeight="medium" color="gray.700">
                          E-postadress
                        </Text>
                        <Input
                          type="email"
                          id="email"
                          ref={userRef}
                          value={email}
                          autoComplete="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="din@epost.se"
                          size="lg"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ borderColor: "primary.400" }}
                          _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                          required
                        />
                      </Box>

                      <Box>
                        <Text mb={2} fontWeight="medium" color="gray.700">
                          Lösenord
                        </Text>
                        <Input
                          type="password"
                          id="password"
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          placeholder="••••••••"
                          size="lg"
                          borderRadius="lg"
                          borderColor="gray.300"
                          _hover={{ borderColor: "primary.400" }}
                          _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                          required
                        />
                      </Box>

                      <Button
                        type="submit"
                        size="lg"
                        w="100%"
                        bg="black"
                        color="white"
                        borderRadius="full"
                        fontWeight="semibold"
                        _hover={{ bg: "gray.800", transform: "translateY(-2px)" }}
                        _active={{ transform: "translateY(0)" }}
                        transition="all 0.2s"
                        isDisabled={!email || !pwd}
                        boxShadow="lg"
                      >
                        Logga in
                      </Button>
                    </Stack>
                  </form>

                  <Text mt={8} textAlign="center" color="gray.600">
                    Har du inget konto?{' '}
                    <Link to="/signup">
                      <Text as="span" color="primary.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                        Registrera dig här
                      </Text>
                    </Link>
                  </Text>
                </>
              )}
            </Box>
          </Container>
        </Flex>
      </Flex>
    );
};

export default Signin;