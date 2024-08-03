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
  HStack,
  Select,
} from "@chakra-ui/react";
import axios from "../services/api-client"; // Update import to use your configured API client
import Bubbles from "../components/Bubbles";
import NaNavBar from "../components/NaNavbar";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    password2: "",
    gender: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState(null);

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, teal.200 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.password2 ||
      !formData.dateOfBirth
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await axios.post("/auth/signUp/", formData);
      window.location.href = "/login"; // Redirect to settings page for profile completion
    } catch (err) {
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <>
    <NaNavBar/>
    <Box
      p={5}
      bgGradient={gradientBgColor}
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // position="relative"
    >
      <Bubbles />
      <Card
        bg={useColorModeValue("white", "gray.800")}
        p={8}
        borderRadius="lg"
        boxShadow={cardShadowColor}
        maxW="md"
        w={[300, 400, 500]}
      >
        <CardBody>
          <Heading as="h1" mb={6} textAlign="center">
            Sign Up
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  bg={inputBgColor}
                  variant="filled"
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  bg={inputBgColor}
                  variant="filled"
                  required
                />
              </HStack>
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              />
              <Input
                name="password2"
                type="password"
                placeholder="Confirm Password"
                value={formData.password2}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              />
              <Select
                name="gender"
                placeholder="Select Gender"
                value={formData.gender}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
              <Input
                name="dateOfBirth"
                type="date"
                placeholder="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                bg={inputBgColor}
                variant="filled"
                required
              />
              {error && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginTop: "1rem",
                  }}
                >
                  {error}
                </p>
              )}
              <Button
                type="submit"
                bg="black"
                color="white"
                _hover={{ bg: "gray.700" }}
                mt={4}
                w="full"
              >
                Register
              </Button>
            </Stack>
          </form>
          <p
            className="account"
            style={{ marginTop: "1rem", textAlign: "center" }}
          >
            Already have an account? <a href="/login">Log In</a>
          </p>
        </CardBody>
      </Card>
    </Box>
    </>
  );
};

export default SignUpPage;
