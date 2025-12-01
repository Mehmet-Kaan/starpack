import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../components/firebase.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import { db } from "../components/firebase";
import {
  Box,
  Button,
  Input,
  Heading,
  HStack,
  Text,
  VStack,
  Spinner,
  Icon,
  Flex,
  Image,
  Container,
  Stack,
} from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";

const NAME_REGEX = /^[a-zA-Z]{4,15}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@(hotmail\.com|gmail\.com)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const userRef = useRef(null);
  const errRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    if (currentUser) navigate("/");
  }, [currentUser, navigate]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    const pwdValid = PWD_REGEX.test(pwd);
    setValidPwd(pwdValid);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      const user = userCredential.user;

      // 2️⃣ Update display name
      await updateProfile(user, { displayName: name });

      // 3️⃣ Create parent Firestore doc under "users"
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: name,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      setErrMsg("E-mail already in use!");
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" direction={{ base: "column", lg: "row" }}>
      {/* Left Side - Image (30%) */}
      <Box
        w={{ base: "100%", lg: "30%" }}
        h={{ base: "40vh", lg: "100vh" }}
        position="relative"
        display={{ base: "none", lg: "block" }}
      >
        <Image
          src="/images/packaging-hero.jpg"
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
          bottom={8}
          left={0}
          right={0}
          px={8}
          color="white"
          align="flex-start"
          gap={2}
        >
          <Heading size="lg" color="white">
            Bli medlem idag!
          </Heading>
          <Text fontSize="md" color="whiteAlpha.900">
            Skapa ditt konto och börja handla
          </Text>
        </VStack>
      </Box>

      {/* Right Side - Signup Form (70%) */}
      <Flex
        w={{ base: "100%", lg: "70%" }}
        align="center"
        justify="center"
        bg="gray.50"
        p={{ base: 6, md: 12 }}
        overflowY="auto"
      >
        <Container maxW="md" w="100%">
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="xl"
            p={{ base: 8, md: 12 }}
            w="100%"
          >
            {loading ? (
              <Flex justify="center" py={12}>
                <Spinner size="xl" color="primary.600" />
              </Flex>
            ) : (
              <VStack spacing={6} as="form" w="100%" onSubmit={handleSubmit}>
                <VStack mb={4} gap={2} align="flex-start" w="100%">
                  <Heading size="xl" color="primary.900">
                    Skapa konto
                  </Heading>
                  <Text color="gray.600">
                    Fyll i dina uppgifter för att komma igång
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
                    w="100%"
                    aria-live="assertive"
                  >
                    <Text color="red.600" fontSize="sm" fontWeight="medium">
                      {errMsg}
                    </Text>
                  </Box>
                )}

                {/* Name Field */}
                <Box w="100%">
                  <Text fontWeight="medium" mb={2} color="gray.700">
                    Namn
                  </Text>
                  <HStack>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ditt namn"
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "primary.400" }}
                      _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                      ref={userRef}
                      autoComplete="name"
                      required
                    />
                    {validName ? (
                      <Icon as={FontAwesomeIcon} icon={faCheck} color="green.500" boxSize={5} />
                    ) : name ? (
                      <Icon as={FontAwesomeIcon} icon={faTimes} color="red.500" boxSize={5} />
                    ) : null}
                  </HStack>
                  {!validName && name && (
                    <Text fontSize="sm" color="gray.500" mt={1} display="flex" alignItems="center" gap={1}>
                      <FontAwesomeIcon icon={faInfoCircle} /> 4–15 bokstäver.
                    </Text>
                  )}
                </Box>

                {/* Email Field */}
                <Box w="100%">
                  <Text fontWeight="medium" mb={2} color="gray.700">
                    E-postadress
                  </Text>
                  <HStack>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="din@epost.se"
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "primary.400" }}
                      _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                      autoComplete="email"
                      required
                    />
                    {validEmail ? (
                      <Icon as={FontAwesomeIcon} icon={faCheck} color="green.500" boxSize={5} />
                    ) : email ? (
                      <Icon as={FontAwesomeIcon} icon={faTimes} color="red.500" boxSize={5} />
                    ) : null}
                  </HStack>
                  {!validEmail && email && (
                    <Text fontSize="sm" color="gray.500" mt={1} display="flex" alignItems="center" gap={1}>
                      <FontAwesomeIcon icon={faInfoCircle} /> Måste sluta med @gmail.com eller @hotmail.com
                    </Text>
                  )}
                </Box>

                {/* Password Field */}
                <Box w="100%">
                  <Text fontWeight="medium" mb={2} color="gray.700">
                    Lösenord
                  </Text>
                  <HStack>
                    <Input
                      type="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      placeholder="••••••••"
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "primary.400" }}
                      _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                      autoComplete="new-password"
                      required
                    />
                    {validPwd ? (
                      <Icon as={FontAwesomeIcon} icon={faCheck} color="green.500" boxSize={5} />
                    ) : pwd ? (
                      <Icon as={FontAwesomeIcon} icon={faTimes} color="red.500" boxSize={5} />
                    ) : null}
                  </HStack>
                  {!validPwd && pwd && (
                    <Text fontSize="sm" color="gray.500" mt={1} display="flex" alignItems="center" gap={1}>
                      <FontAwesomeIcon icon={faInfoCircle} /> 8–24 tecken, 1 stor bokstav, 1 liten bokstav, 1 siffra, 1 specialtecken.
                    </Text>
                  )}
                </Box>

                {/* Confirm Password */}
                <Box w="100%">
                  <Text fontWeight="medium" mb={2} color="gray.700">
                    Bekräfta lösenord
                  </Text>
                  <HStack>
                    <Input
                      type="password"
                      value={matchPwd}
                      onChange={(e) => setMatchPwd(e.target.value)}
                      placeholder="••••••••"
                      size="lg"
                      borderRadius="lg"
                      borderColor="gray.300"
                      _hover={{ borderColor: "primary.400" }}
                      _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                      autoComplete="new-password"
                      required
                    />
                    {validMatch && matchPwd ? (
                      <Icon as={FontAwesomeIcon} icon={faCheck} color="green.500" boxSize={5} />
                    ) : matchPwd ? (
                      <Icon as={FontAwesomeIcon} icon={faTimes} color="red.500" boxSize={5} />
                    ) : null}
                  </HStack>
                  {!validMatch && matchPwd && (
                    <Text fontSize="sm" color="gray.500" mt={1} display="flex" alignItems="center" gap={1}>
                      <FontAwesomeIcon icon={faInfoCircle} /> Lösenorden måste matcha.
                    </Text>
                  )}
                </Box>

                {/* Submit */}
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
                  isDisabled={!validName || !validEmail || !validPwd || !validMatch}
                  boxShadow="lg"
                  mt={2}
                >
                  Skapa konto
                </Button>

                <Text mt={4} textAlign="center" color="gray.600">
                  Har du redan ett konto?{" "}
                  <Link to="/signin">
                    <Text as="span" color="primary.600" fontWeight="semibold" _hover={{ textDecoration: "underline" }}>
                      Logga in här
                    </Text>
                  </Link>
                </Text>
              </VStack>
            )}
          </Box>
        </Container>
      </Flex>
    </Flex>
  );
};

export default Signup;