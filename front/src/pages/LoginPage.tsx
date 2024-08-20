import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Input,
  Button,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import "../styles/LoginPage.css";
import Bubbles from "../components/Bubbles";
import NaNavbar from "../components/NaNavbar";
import axios from "../services/api-client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Allow string or null

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const hrefColor = useColorModeValue("black", "white");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, teal.200 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/auth/signIn/",
        { email, password },
        { withCredentials: true }
      );

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (!accessToken || !refreshToken) {
        throw new Error("Failed to receive tokens from server.");
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      window.location.href = "/"; // Replace with actual redirect
    } catch (err: any) {
      console.error("Login error:", err);

      // Check for specific backend error message
      if (err.response?.data?.error === "Too many login attempts. Please try again later.") {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      bgGradient={gradientBgColor}
    >
      <NaNavbar />
      <Flex
        flex="1"
        justifyContent="center"
        alignItems="center"
        p={5}
      >
        <Box display={{ base: "none", lg: "block" }} mr={5}>
          <Bubbles />
        </Box>
        <Card
          bg={useColorModeValue("white", "gray.800")}
          color={cardTextColor}
          p={8}
          borderRadius="lg"
          boxShadow={cardShadowColor}
          maxW="md"
          w="full"
        >
          <CardBody>
            <Heading as="h1" mb={6} textAlign="center">
              Login
            </Heading>
            <form onSubmit={handleLogin}>
              <Stack spacing={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg={inputBgColor}
                  variant="filled"
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={inputBgColor}
                  variant="filled"
                  required
                />
                <Button
                  bg="black"
                  color="white"
                  size="lg"
                  type="submit"
                  _hover={{ bg: "gray.700" }}
                >
                  Login
                </Button>
              </Stack>
            </form>
            {error && (
              <p
                style={{ color: "red", textAlign: "center", marginTop: "1rem" }}
              >
                {error}
              </p>
            )}
            <p
              className="account"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              Don't have an account?{" "}
              <a style={{ color: hrefColor }} href="/register">
                Register
              </a>
            </p>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default LoginPage;
