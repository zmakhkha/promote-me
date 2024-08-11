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
  HStack,
  Select,
} from "@chakra-ui/react";
import axios from "../services/api-client";
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
  const [currentError, setCurrentError] = useState("");
  const [errorField, setErrorField] = useState("");

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, teal.200 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    // Clear the error when the user starts typing
    if (name === errorField) {
      setCurrentError("");
      setErrorField("");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("/auth/signUp/", formData);
      window.location.href = "/login"; // Redirect to login page after successful registration
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        // Iterate over the error fields and display the first one
        const fields = [
          "firstName",
          "lastName",
          "username",
          "email",
          "password",
          "password2",
          "gender",
          "dateOfBirth",
        ];

        for (let field of fields) {
          if (errorData[field]) {
            setCurrentError(errorData[field][0]);
            setErrorField(field);
            break;
          }
        }
      } else {
        // Generic error message
        setCurrentError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <Flex direction="column" minH="100vh" bgGradient={gradientBgColor}>
      <NaNavBar />
      <Flex flex="1" justifyContent="center" alignItems="center" p={5}>
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
                    isInvalid={errorField === "firstName"}
                    errorBorderColor="red.300"
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    bg={inputBgColor}
                    variant="filled"
                    isInvalid={errorField === "lastName"}
                    errorBorderColor="red.300"
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
                  isInvalid={errorField === "username"}
                  errorBorderColor="red.300"
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
                  isInvalid={errorField === "email"}
                  errorBorderColor="red.300"
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
                  isInvalid={errorField === "gender"}
                  errorBorderColor="red.300"
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
                  isInvalid={errorField === "dateOfBirth"}
                  errorBorderColor="red.300"
                  required
                />
                {currentError && (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      marginTop: "1rem",
                    }}
                  >
                    {currentError}
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
              Already have an account? <a  href="/login">Log In</a>
            </p>
          </CardBody>
        </Card>
      </Flex>
    </Flex>
  );
};

export default SignUpPage;
