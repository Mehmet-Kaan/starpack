// import '../styles/signin.css';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect} from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../components/firebase.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import axios from 'axios';
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Spinner,
  Flex,
} from "@chakra-ui/react";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@(hotmail\.com|gmail\.com)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signin = () => {
    const {currentUser} = useContext(AuthContext);
    let navigate = useNavigate();

    // let apiURL = "https://logbotai-backend.onrender.com/";

    // // Waking up the render.com server
    // useEffect(() => {
    //     const wakeUpServer = async () => {
    //         console.log("WakeUpServer function has been called!");
    //         try {
    //             const response = await axios.get(`${apiURL}wakeup`);
    //             console.log(response.data);
    //         } catch (err) {
    //             console.error("Error waking up the server:", err);
    //         }
    //     };
    
    //     wakeUpServer(); // Call the function
    // }, []); // Empty dependency array to run once on mount

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
    const [emailFocus, setEmailFocus] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
      
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
            // console.log(userCredential);
            navigate("/");
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
            setErrMsg("Sorry! Email is not registered!");
        })
    }

    return (
      <Flex align="center" justify="center" minH="100vh" bg="gray.50">
      <Box
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        w={{ base: "90%", md: "400px" }}
      >
        {loading ? (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            <Heading mb={6} textAlign="center">
              Sign in!
            </Heading>

            {errMsg && (
              <Text
                ref={errRef}
                color="red.500"
                mb={4}
                aria-live="assertive"
                textAlign="center"
              >
                {errMsg}
              </Text>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Box>
                  <Text mb={1}>E-mail:</Text>
                  <Input
                    type="text"
                    id="email"
                    ref={userRef}
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Box>

                <Box>
                  <Text mb={1}>Password:</Text>
                  <Input
                    type="password"
                    id="password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    required
                  />
                </Box>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isDisabled={!email || !pwd}
                >
                  Sign in
                </Button>
              </Stack>
            </form>

            <Text mt={4} textAlign="center">
              Not a member yet? <Link to="/signup">Sign up!</Link>
            </Text>
          </>
        )}
      </Box>
    </Flex>
    );
};

export default Signin;