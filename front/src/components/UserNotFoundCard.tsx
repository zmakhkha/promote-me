import {
    Avatar,
    Box,
    Flex,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  import React from "react";
  import { useNavigate } from "react-router-dom";
  import avatar from "../assets/no-image-placeholder.webp";
  
  const UserNotFoundCard = () => {
    const navigate = useNavigate();
    const cardShadowColor = useColorModeValue("md", "lg");
    const cardTextColor = useColorModeValue("gray.800", "gray.100");
    const nameColor = useColorModeValue("black", "white");
  
    return (
      <Flex flex="1" justifyContent="center" alignItems="center" p={5}>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={5}
          position="relative"
          bg={useColorModeValue("white", "gray.800")}
          color={cardTextColor}
          p={8}
          borderRadius="lg"
          boxShadow={cardShadowColor}
          maxW="md"
          w="full"
        >
          <Flex
            direction={'column'}
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              size="2xl"
              src={avatar}
              borderWidth="4px"
              borderColor={useColorModeValue("white", "gray.800")}
              boxShadow="lg"
            />
            <Box pt="6" textAlign="center">
              <Text
                marginTop={5}
                fontSize="2xl"
                fontWeight="bold"
                color={nameColor}
              >
                User not found
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    );
  };
  
  export default UserNotFoundCard;
  