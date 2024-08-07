import { Flex, useColorModeValue } from "@chakra-ui/react";
import NewNav from "../components/NewNav";
import FreindProfile from "../components/FreindProfile";

const FriendProfilePage = () => {
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, gray.600 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );

  return (
      <Flex direction="column" minH="100vh" bgGradient={gradientBgColor}>
        <NewNav />
        <FreindProfile />
      </Flex>
  );
};

export default FriendProfilePage;
