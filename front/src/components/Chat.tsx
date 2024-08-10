import { Box, Heading } from "@chakra-ui/react";

const Chat = () => {
  return (
    <Box
      p={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="50%"
      maxWidth="600px" // Optional: Prevents excessive stretching
    >
      <Heading mb={4}>Coming soon</Heading>
    </Box>
  );
};

export default Chat;
