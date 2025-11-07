"use client";
import {
  Button,
  CloseButton,
  Drawer,
  Input,
  VStack,
  Text,
  Select,
  HStack,
  Portal,
  Heading,
  Box,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
// import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../components/firebase.tsx";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { countryCollection } from "../pages/Checkout.js";
// import { useContext } from "react";
// import { AuthContext } from "../auth/AuthProvider";

const NAME_REGEX = /^[a-zA-Z]{4,15}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@(hotmail\.com|gmail\.com)$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface AuthDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthDrawer({ open, onOpenChange }: AuthDrawerProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    postalCode: "",
    country: "",
    notes: "",
  });

  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  const errRef = useRef<HTMLParagraphElement>(null);

  let navigate = useNavigate();

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);
  useEffect(() => {
    const valid = PWD_REGEX.test(pwd);
    setValidPwd(valid);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      if (mode === "signin") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          pwd
        );
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          sessionStorage.setItem("userData", JSON.stringify(userData));
        }

        navigate("/profile");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          pwd
        );
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });

        let userData = {
          uid: user.uid,
          displayName: name,
          surname: surname,
          email: user.email,
          phone: phone,
          address: {
            line1: address.line1,
            line2: address.line2 || "",
            city: address.city || "",
            postalCode: address.postalCode || "",
            Country: address.country || "",
          },
          createdAt: new Date().toISOString(),
        };

        await setDoc(doc(db, "users", user.uid), userData);

        sessionStorage.setItem("userData", JSON.stringify(userData));
      }
    } catch (error: any) {
      console.error(error);
      setErrMsg(
        mode === "signin" ? "Invalid credentials." : "Email already in use!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer.Root
      open={open}
      //   onOpenChange={onOpenChange}
      onInteractOutside={() => onOpenChange(false)}
      onEscapeKeyDown={() => onOpenChange(false)}
    >
      <Portal>
        <Drawer.Backdrop style={{ zIndex: 9999, position: "fixed" }} />
        <Drawer.Positioner
          padding="4"
          style={{ zIndex: 10000, position: "fixed" }}
        >
          <Drawer.Content
            rounded="md"
            p={2}
            style={{ zIndex: 10001, position: "relative" }}
          >
            <Drawer.Header
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Drawer.Title>
                <Heading as="span" size="md">
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </Heading>
              </Drawer.Title>
              {/* <Button variant="ghost" onClick={() => onOpenChange(false)}>
                <Icon as={AiOutlineClose} />
              </Button> */}
            </Drawer.Header>

            <Drawer.Body>
              {loading ? (
                <VStack justify="center" align="center" h="60vh">
                  <Spinner size="xl" />
                </VStack>
              ) : (
                <VStack
                  as="form"
                  onSubmit={handleSubmit}
                  align="stretch"
                  gap={4}
                >
                  {errMsg && (
                    <Text ref={errRef} color="red.500" textAlign="center">
                      {errMsg}
                    </Text>
                  )}

                  {mode === "signup" && (
                    <Box gap={3} display="flex" flexDirection="column">
                      <Text>Name</Text>
                      <HStack>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        {validName ? (
                          <Icon as={FontAwesomeIcon} color="green.400" />
                        ) : name ? (
                          <Icon as={FontAwesomeIcon} color="red.400" />
                        ) : null}
                      </HStack>
                      <Text>Surname</Text>
                      <HStack>
                        <Input
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                          required
                        />
                        {validName ? (
                          <Icon as={FontAwesomeIcon} color="green.400" />
                        ) : name ? (
                          <Icon as={FontAwesomeIcon} color="red.400" />
                        ) : null}
                      </HStack>

                      <Text>Phone Number</Text>
                      <Input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9+]*"
                        value={phone}
                        accept="number"
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(
                            /[^0-9+]/g,
                            ""
                          );
                          setPhone(cleaned);
                        }}
                        placeholder="e.g. +46 70 123 45 67"
                      />

                      <Text>Address</Text>
                      <Input
                        type="text"
                        value={address.line1}
                        onChange={(e) =>
                          setAddress({ ...address, line1: e.target.value })
                        }
                        placeholder="Street"
                        required
                      />
                      <Input
                        type="text"
                        value={address.line2}
                        onChange={(e) =>
                          setAddress({ ...address, line2: e.target.value })
                        }
                        placeholder="Complement (optional)"
                      />
                      <Input
                        type="text"
                        value={address.postalCode}
                        onChange={(e) =>
                          setAddress({ ...address, postalCode: e.target.value })
                        }
                        placeholder="Postal Code"
                      />
                      <Input
                        type="text"
                        value={address.city}
                        onChange={(e) =>
                          setAddress({ ...address, city: e.target.value })
                        }
                        placeholder="City"
                        required
                      />
                      <Select.Root
                        size="md"
                        collection={countryCollection}
                        value={address.country ? [address.country] : []} // ✅ must always be an array
                        onValueChange={(details) => {
                          if (details.value && details.value.length > 0) {
                            setAddress({
                              ...address,
                              country: details.value[0],
                            });
                          }
                        }}
                        required
                      >
                        <Select.Label></Select.Label>
                        <Select.Control>
                          <Select.Trigger>
                            <Select.ValueText placeholder="Country" />
                          </Select.Trigger>
                        </Select.Control>
                        <Select.Positioner>
                          <Select.Content>
                            <Select.Item item="Denmark">Denmark</Select.Item>
                            <Select.Item item="Sweden">Sweden</Select.Item>
                          </Select.Content>
                        </Select.Positioner>
                      </Select.Root>
                    </Box>
                  )}

                  <Box>
                    <Text mb={1}>Email</Text>
                    <HStack>
                      <Input
                        type="email"
                        // autoComplete={mode === "signup" ? "off" : undefined}
                        // autoCorrect={mode === "signup" ? "off" : undefined}
                        // autoCapitalize={mode === "signup" ? "none" : undefined}
                        // spellCheck={mode === "signup" ? "false" : undefined}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      {validEmail ? (
                        <Icon as={FontAwesomeIcon} color="green.400" />
                      ) : email ? (
                        <Icon as={FontAwesomeIcon} color="red.400" />
                      ) : null}
                    </HStack>
                  </Box>

                  <Box>
                    <Text mb={1}>Password</Text>
                    <HStack>
                      <Input
                        type="password"
                        // autoComplete={mode === "signup" ? "off" : undefined}
                        // autoCorrect={mode === "signup" ? "off" : undefined}
                        // autoCapitalize={mode === "signup" ? "none" : undefined}
                        // spellCheck={mode === "signup" ? "false" : undefined}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                      />
                      {validPwd ? (
                        <Icon as={FontAwesomeIcon} color="green.400" />
                      ) : pwd ? (
                        <Icon as={FontAwesomeIcon} color="red.400" />
                      ) : null}
                    </HStack>
                  </Box>

                  {mode === "signup" && (
                    <Box>
                      <Text mb={1}>Confirm Password</Text>
                      <HStack>
                        <Input
                          type="password"
                          value={matchPwd}
                          onChange={(e) => setMatchPwd(e.target.value)}
                          required
                        />
                        {validMatch && matchPwd ? (
                          <Icon as={FontAwesomeIcon} color="green.400" />
                        ) : matchPwd ? (
                          <Icon as={FontAwesomeIcon} color="red.400" />
                        ) : null}
                      </HStack>
                    </Box>
                  )}

                  <Button
                    type="submit"
                    colorScheme="blue"
                    w="full"
                    disabled={
                      mode === "signin"
                        ? !email || !pwd
                        : !validName || !validEmail || !validPwd || !validMatch
                    }
                  >
                    {mode === "signin" ? "Sign In" : "Sign Up"}
                  </Button>

                  <Text textAlign="center">
                    {mode === "signin" ? (
                      <>
                        No account?{" "}
                        <Button
                          variant="link"
                          colorScheme="blue"
                          onClick={() => setMode("signup")}
                        >
                          Sign up
                        </Button>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <Button
                          variant="link"
                          colorScheme="blue"
                          onClick={() => setMode("signin")}
                        >
                          Sign in
                        </Button>
                      </>
                    )}
                  </Text>
                </VStack>
              )}
            </Drawer.Body>

            {/* <Drawer.Footer justifyContent="flex-end">
              <Button variant="ghost" onClick={() => onOpenChange(false)}>
                <Icon as={AiOutlineClose} />
              </Button>
            </Drawer.Footer> */}

            <CloseButton
              size="sm"
              position="absolute"
              top={3}
              right={3}
              onClick={() => onOpenChange(false)}
            />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
