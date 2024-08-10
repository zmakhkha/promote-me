import NewNav from "../components/NewNav";
import Chat from "../components/Chat";
import { Flex } from "@chakra-ui/react";

const ChatPage = () => {
  return (
    <Flex direction="column" minH="100vh">
      <NewNav />
      <Flex flex="1" justifyContent="center" alignItems="center" p={5}>
        <Chat />
      </Flex>
    </Flex>
  );
};

export default ChatPage;
