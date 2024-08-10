import React, { useEffect, useRef } from "react";
import {
  Box,
  Center,
  Text,
  useColorMode,
  HStack,
  Image,
  Button,
} from "@chakra-ui/react";
import Typed from "typed.js";
import logo from "../assets/logo.webp";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import ColorModeSwitch from "./ColorModeSwitch";



const NaNavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  const color = colorMode === "dark" ? "white" : "black";
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: [
        "Find your soulmate online",
        "Connect with people worldwide",
        "Find your social media soulmate",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: "|",
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
        <Center flex="1">
          <Text color={color} fontSize="xl" fontWeight="bold">
            Promote-me | <Box as="span" className="typed-element" />
          </Text>
        </Center>
        <Button ml={4} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
      </HStack>
    </Box>
  );
};

export default NaNavBar;
