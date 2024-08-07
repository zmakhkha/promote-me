import React, { useEffect, useRef } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Typed from "typed.js";
import NewNav from "../components/NewNav";

const ChatPage = () => {
  const typedElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typedElement.current) {
      new Typed(typedElement.current, {
        strings: ["We are working on it!", "Coming soon!"],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 400,
        loop: true,
        showCursor: true,
      });
    }
  }, []);

  return (
    <>
      <NewNav />
      <Box
        p={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Heading mb={4}>Want to chat with new friends?</Heading>
        <Box
          ref={typedElement}
          fontSize="xl"
          textAlign="center"
          color="gray.700"
          mb={4}
        />
      </Box>
    </>
  );
};

export default ChatPage;
