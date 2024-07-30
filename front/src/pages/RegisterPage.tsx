import React from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  Input,
  Button,
  Stack,
  HStack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NonAuthNavbar from "../components/NonAuthNavbar";

const RegisterPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const inputBgColor = useColorModeValue("gray.200", "gray.600");
  const cardTextColor = useColorModeValue("black", "white");

  return (
      <Box
        p={5}
        bgGradient="linear(to-b, purple.300, orange.200 15%, gray.200 75%)"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          bg="transparent"
          color={cardTextColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          maxW="md"
          w="full"
        >
          <CardBody>
            <Heading as="h1" mb={6} textAlign="center">
              Register
            </Heading>
            <Stack spacing={4}>
              <HStack>
                <Input
                  type="text"
                  placeholder="First Name"
                  bg={inputBgColor}
                  variant="filled"
                  _hover={{ bg: inputBgColor }}
                  required
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  bg={inputBgColor}
                  variant="filled"
                  _hover={{ bg: inputBgColor }}
                  required
                />
              </HStack>
              <Input
                type="email"
                placeholder="Email"
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              />
              <Input
                type="date"
                placeholder="Date of Birth"
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              />
              <Select
                placeholder="Select Country"
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              >
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
                {/* Add more options as needed */}
              </Select>
              <Button
                bg="black"
                color="white"
                size="lg"
                type="submit"
                _hover={{ bg: "gray.700" }}
              >
                Register
              </Button>
            </Stack>
            <p
              className="account"
              style={{ marginTop: "1rem", textAlign: "center" }}
            >
              Already have an account?{" "}
              <a href="#" onClick={() => navigate("/login")}>
                Login
              </a>
            </p>
          </CardBody>
        </Card>
      </Box>
  );
};

export default RegisterPage;
