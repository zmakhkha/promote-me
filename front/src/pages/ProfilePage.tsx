import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Avatar,
  HStack,
  VStack,
  Divider,
  Textarea,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa";

import avatar from "../assets/no-image-placeholder.webp";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    profile_image: "",
    email: "",
    firstName: "",
    lastName: "",
    snapUsername: "",
    TiktokUsername: "",
    instaUsername: "",
    gender: "",
    interests: "",
    country: "",
    date_of_birth: "",
    score: 0,
    aboutMe: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // Mock fetching user data with dummy data
    const fetchUserData = () => {
      const dummyData = {
        profile_image: avatar,
        email: "example@example.com",
        firstName: "Taqsi",
        lastName: "Ghadib",
        snapUsername: "TaqsiSnap",
        TiktokUsername: "TaqsiTiktok",
        instaUsername: "TaqsiInsta",
        gender: "Male",
        interests: "Tag1 Tag2 Tag3 Tag4",
        country: "Morocco",
        date_of_birth: "1998-08-07",
        score: 700,
        aboutMe: "This is a brief about me section. It includes some information about the user.",
      };
      setUserData(dummyData);
      setImagePreview(dummyData.profile_image);
    };

    fetchUserData();
  }, []);

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, gray.600 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  const interestsArray = userData.interests.split(" ").filter(Boolean);

  return (
    <Flex direction="column" minH="100vh" bgGradient={gradientBgColor}>
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
            position="absolute"
            top={-16}
            left="50%"
            transform="translateX(-50%)"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              size="2xl"
              src={imagePreview || avatar}
              borderWidth="4px"
              borderColor={useColorModeValue("white", "gray.800")}
              boxShadow="lg"
            />
          </Flex>

          <Box pt="6"  textAlign="center">
            <Text marginTop={5} fontSize="2xl" fontWeight="bold" color={cardTextColor}>
              {userData.firstName} {userData.lastName}, 26
            </Text>
            <HStack justify="center"  spacing={2} mt={2}>
              <FaLocationDot />
              <Text>{userData.country}</Text>
            </HStack>
          </Box>

          <Divider borderColor="gray.400" mb={5} />

          <HStack spacing={8} mb={5}>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                {userData.score}
              </Text>
              <Text>Score</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                700
              </Text>
              <Text>Followers</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold">
                700
              </Text>
              <Text>Views</Text>
            </VStack>
          </HStack>

          <Divider borderColor="gray.400"  />

          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Social Media
          </Text>
          <HStack spacing={1} mb={5}>
            <Button size="sm" leftIcon={<FaSnapchat />}>
              Snapchat
            </Button>
            <Button size="sm" leftIcon={<FaSnapchat />}>
              Tiktok
            </Button>
            <Button size="sm" leftIcon={<FaSnapchat />}>
              Instagram
            </Button>
          </HStack>

          <Divider borderColor="gray.400"  />

          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Interests
          </Text>
          <HStack spacing={2} wrap="wrap">
            {interestsArray.map((interest, index) => (
              <Tag key={index} size="md" variant="subtle" colorScheme="teal">
                <TagLabel>{interest}</TagLabel>
                <TagCloseButton />
              </Tag>
            ))}
          </HStack>

          <Divider borderColor="gray.400" />

          <Text fontSize="lg" fontWeight="bold" >
            About Me
          </Text>
          <Textarea
            value={userData.aboutMe}
            isReadOnly
            rows={4}
            resize="none"
            bg={inputBgColor}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default SettingsPage;
