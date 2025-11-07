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
    <Box
      display="flex"
      flexDir="column"
      justifyContent={"center"}
      alignItems="center"
      w={{ base: "90%", md: "400px" }}
      p={8}
      m="2rem auto"
      bg="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(10px)"
      borderRadius="10px"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.25)"
      color="black"
    >
      {loading ? (
        <Spinner size="xl" color="blue.400" thickness="4px" speed="0.7s" />
      ) : (
        <VStack spacing={4} as="form" w="100%" onSubmit={handleSubmit}>
          <Heading>Sign Up!</Heading>

          {errMsg && (
            <Text ref={errRef} color="red.400" bg="rgba(255,0,0,0.1)" p={2} borderRadius="md">
              {errMsg}
            </Text>
          )}

          {/* Name Field */}
          <Box w="100%">
            <Text fontWeight="medium" mb={1}>Name:</Text>
            <HStack>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                bg="rgba(255,255,255,0.15)"
                _focus={{ bg: "rgba(255,255,255,0.25)" }}
                ref={userRef}
                autoComplete="off"
                required
              />
              {validName ? (
                <Icon as={FontAwesomeIcon} icon={faCheck} color="green.400" />
              ) : name ? (
                <Icon as={FontAwesomeIcon} icon={faTimes} color="red.400" />
              ) : null}
            </HStack>
            {!validName && name && (
              <Text fontSize="sm" color="gray.300" mt={1}>
                <FontAwesomeIcon icon={faInfoCircle} /> 4–15 letters.
              </Text>
            )}
          </Box>

          {/* Email Field */}
          <Box w="100%">
            <Text fontWeight="medium" mb={1}>Email:</Text>
            <HStack>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(255,255,255,0.15)"
                _focus={{ bg: "rgba(255,255,255,0.25)" }}
                required
              />
              {validEmail ? (
                <Icon as={FontAwesomeIcon} icon={faCheck} color="green.400" />
              ) : email ? (
                <Icon as={FontAwesomeIcon} icon={faTimes} color="red.400" />
              ) : null}
            </HStack>
            {!validEmail && email && (
              <Text fontSize="sm" color="gray.300" mt={1}>
                <FontAwesomeIcon icon={faInfoCircle} /> Must end with @gmail.com or @hotmail.com
              </Text>
            )}
          </Box>

          {/* Password Field */}
          <Box w="100%">
            <Text fontWeight="medium" mb={1}>Password:</Text>
            <HStack>
              <Input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                bg="rgba(255,255,255,0.15)"
                _focus={{ bg: "rgba(255,255,255,0.25)" }}
                required
              />
              {validPwd ? (
                <Icon as={FontAwesomeIcon} icon={faCheck} color="green.400" />
              ) : pwd ? (
                <Icon as={FontAwesomeIcon} icon={faTimes} color="red.400" />
              ) : null}
            </HStack>
            {!validPwd && pwd && (
              <Text fontSize="sm" color="gray.300" mt={1}>
                <FontAwesomeIcon icon={faInfoCircle} /> 8–24 chars, 1 upper, 1 lower, 1 number, 1 special.
              </Text>
            )}
          </Box>

          {/* Confirm Password */}
          <Box w="100%">
            <Text fontWeight="medium" mb={1}>Confirm Password:</Text>
            <HStack>
              <Input
                type="password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                bg="rgba(255,255,255,0.15)"
                _focus={{ bg: "rgba(255,255,255,0.25)" }}
                required
              />
              {validMatch && matchPwd ? (
                <Icon as={FontAwesomeIcon} icon={faCheck} color="green.400" />
              ) : matchPwd ? (
                <Icon as={FontAwesomeIcon} icon={faTimes} color="red.400" />
              ) : null}
            </HStack>
            {!validMatch && matchPwd && (
              <Text fontSize="sm" color="gray.300" mt={1}>
                <FontAwesomeIcon icon={faInfoCircle} /> Passwords must match.
              </Text>
            )}
          </Box>

          {/* Submit */}
          <Button
            type="submit"
            colorScheme="blue"
            w="100%"
            mt={4}
            isDisabled={!validName || !validEmail || !validPwd || !validMatch}
          >
            Sign Up
          </Button>

          <Text>
            Already a member?{" "}
            <Link to="/signin" style={{ color: "#63b3ed" }}>
              Sign in!
            </Link>
          </Text>
        </VStack>
      )}
    </Box>
  );
};

export default Signup;