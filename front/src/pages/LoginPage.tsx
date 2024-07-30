import React, { useState } from 'react';
import { Box, Card, CardBody, Heading, Input, Button, Stack, HStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import '../styles/loginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const inputBgColor = useColorModeValue('gray.200', 'gray.600');
  const cardTextColor = useColorModeValue('black', 'white');

  const handleLogin = async (event: Event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', { email, password }, { withCredentials: true });
      
      // Extract access token from response
      const { accessToken } = response.data;
      
      // Store access token in local storage
      localStorage.setItem('accessToken', accessToken);
      
      // Handle successful login (e.g., redirect to a protected route)
      window.location.href = '/dashboard';  // Replace with actual redirect

    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Box
      p={5}
      bgGradient="linear(to-b, purple.300, orange.200 15%, gray.200 75%)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card bg="transparent" color={cardTextColor} p={8} borderRadius="lg" boxShadow="lg" maxW="md" w="full">
        <CardBody>
          <Heading as="h1" mb={6} textAlign="center">Login</Heading>
          <form onSubmit={handleLogin}>
            <Stack spacing={4}>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg={inputBgColor}
                variant="filled"
                _hover={{ bg: inputBgColor }}
                required
              />
              <Button bg="black" color="white" size="lg" type="submit" _hover={{ bg: 'gray.700' }}>
                Login
              </Button>
            </Stack>
          </form>
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          <p className="account" style={{ marginTop: '1rem', textAlign: 'center' }}>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </CardBody>
      </Card>
    </Box>
  );
};

export default LoginPage;
