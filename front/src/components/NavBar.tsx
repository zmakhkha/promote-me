import React, { useEffect, useRef } from 'react';
import { Box, Center, Button, Text, useColorMode, Show,HStack, Image, Hide } from '@chakra-ui/react';
import Typed from 'typed.js';
import logo from '../assets/logo.webp';
import ColorModeSwitch from './ColorModeSwitch';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api-client';



const NaNavBar = ({ onSearch }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout/"); // Replace with your actual logout endpoint

      // Clear tokens from cookies
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

      // Remove from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const { colorMode } = useColorMode();
  const color = colorMode === 'dark' ? 'white' : 'black';
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Find your soulmate online", "Connect with people worldwide", "Find your social media soulmate"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    };

    typedRef.current = new Typed(".typed-element", options);

    return () => {
      if (typedRef.current) {
        typedRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box bg="transparent" width="100%" py={4}>
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Image src={logo} boxSize="60px" />
        <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={() => navigate("/")}
      >
        Explore
      </Button>
      <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={() => navigate("/chat")}
      >
        Chat
      </Button>
        <Center flex="1">
        <Hide below="md"> 
          <Text color={color} fontSize="xl" fontWeight="bold">
            Promote-me |{' '}
            <Box as="span" className="typed-element" />
          </Text>
          </Hide>
        </Center>
        <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={handleLogout}
      >
        LogOut
      </Button>
        <ColorModeSwitch />
      </HStack>
    </Box>
  );
};

export default NaNavBar;
