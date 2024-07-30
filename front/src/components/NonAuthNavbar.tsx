import { Box, Flex, HStack, Link, Button, useDisclosure } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NonAuthNavbar = () => {
  return (
    <Flex
      as="nav"
      p={4}
      bg="purple.300"
      color="white"
      align="center"
      justify="space-between"
      boxShadow="md"
    >
      <Box>
        <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
          Home
        </Link>
      </Box>

      <HStack spacing={4}>
        <Link as={RouterLink} to="/about" fontSize="md">
          About
        </Link>
        <Link as={RouterLink} to="/contact" fontSize="md">
          Contact
        </Link>
        <Button as={RouterLink} to="/login" colorScheme="teal">
          Login
        </Button>
        <Button as={RouterLink} to="/register" colorScheme="teal" variant="outline">
          Register
        </Button>
      </HStack>
    </Flex>
  );
};

export default NonAuthNavbar;
