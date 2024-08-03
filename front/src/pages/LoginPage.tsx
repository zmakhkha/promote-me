import React, { useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Input,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import Cookies from "js-cookie"; // Import js-cookie library
import "../styles/loginPage.css";
import Bubbles from "../components/Bubbles";
import NaNavbar from "../components/NaNavbar";
import axios from "../services/api-client";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, teal.200 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "/auth/signIn/",
        { email, password },
        { withCredentials: true }
      );

      // Extract access token and refresh token from response
      const { accessToken, refreshToken } = response.data;

      // Store tokens in cookies
      Cookies.set("accessToken", accessToken, { expires: 1 }); // expires in 7 days
      Cookies.set("refreshToken", refreshToken, { expires: 1 }); // expires in 7 days

      // Handle successful login (e.g., redirect to a protected route)
      window.location.href = "/"; // Replace with actual redirect
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <NaNavbar />
      <Box
        p={5}
        bgGradient={gradientBgColor}
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Bubbles />

        <Card
          bg={useColorModeValue("white", "gray.800")}
          color={cardTextColor}
          p={8}
          borderRadius="lg"
          boxShadow={cardShadowColor}
          maxW="md"
          w={[300, 400, 500]}
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
              Don't have an account? <a href="/register">Register</a>
            </p>
          </CardBody>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;