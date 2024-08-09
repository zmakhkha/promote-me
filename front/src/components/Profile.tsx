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
} from "@chakra-ui/react";
import { FaSnapchat, FaTiktok, FaInstagram } from "react-icons/fa";
import avatar from "../assets/no-image-placeholder.webp";
import axios from "../services/api-client";
import getImage from "../services/getImage";
import countriesService from "../services/countriesService";
import getInstaProfile from "../services/getInstaProfile";
import getSnapProfile from "../services/getSnapProfile";
import getTiktokProfile from "../services/getTiktokProfile";
const Profile = () => {
  const handleSnapClick = async (nbr: number) => {
    try {
      let url: string;

      if (nbr === 1) {
        url = await getSnapProfile(userData.snapchat);
      } else if (nbr === 2) {
        url = await getInstaProfile(userData.instagram);
      } else if (nbr === 3) {
        url = await getTiktokProfile(userData.tiktok);
      } else {
        console.error("Invalid number for profile type");
        return;
      }

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching profile URL:", error);
    }
  };
  const [userData, setUserData] = useState({
    profile_image: avatar,
    email: "",
    firstName: "",
    lastName: "",
    snapchat: "",
    tiktok: "",
    instagram: "",
    gender: "",
    country: "",
    date_of_birth: "",
    score: 0,
    aboutMe: "",
    follower_count: 0,
    view_count: 0,
    tags: [],
  });

  const [imagePreview, setImagePreview] = useState(avatar);
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [countryLabel, setCountryLabel] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryLabel = async () => {
      if (userData.country) {
        try {
          const label = await countriesService(userData.country);
          setCountryLabel(label);
        } catch (error) {
          console.error("Error fetching country label:", error);
          setCountryLabel(null); // Handle error state as needed
        }
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get("/users/profileInfo");
        setUserData(response.data);
        setImagePreview(getImage(response.data.image) || avatar);
        setTagsArray(response.data.tags.map((tag) => tag.tag));
        fetchCountryLabel(); // Fetch country label after setting user data
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchUserData();
  }, [userData.country]); // Dependency on userData.country to fetch country label

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, gray.600 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");
  const nameColor = useColorModeValue("black", "white");
  const dividerColor = useColorModeValue("gray.400", "gray.600");

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

        <Box pt="6" textAlign="center">
          <Text
            marginTop={5}
            fontSize="2xl"
            fontWeight="bold"
            color={nameColor}
          >
            {userData.firstName} {userData.lastName}, {userData.age}
          </Text>
          <HStack justify="center" mt={2} color={nameColor}>
            <Text color={nameColor} fontFamily={"arial"} fontWeight={"700"}>
              {countryLabel}
            </Text>
          </HStack>
        </Box>

        <Divider borderColor={dividerColor} />

        <HStack
          justifyContent={"space-around"}
          width={"100%"}
          wrap={"wrap"}
          justify={"center"}
        >
          <VStack>
            <Text fontSize="lg" fontWeight="bold" color={nameColor}>
              {userData.score}
            </Text>
            <Text color={nameColor}>Score</Text>
          </VStack>
          <VStack>
            <Text fontSize="lg" fontWeight="bold" color={nameColor}>
              {userData.follower_count}
            </Text>
            <Text color={nameColor}>Followers</Text>
          </VStack>
          <VStack>
            <Text fontSize="lg" fontWeight="bold" color={nameColor}>
              {userData.view_count}
            </Text>
            <Text color={nameColor}>Views</Text>
          </VStack>
        </HStack>

        <Divider borderColor={dividerColor} />

        <Text fontSize="lg" fontWeight="bold" color={nameColor}>
          Social Media
        </Text>
        <HStack spacing={1} gap={5} wrap={"wrap"} justify={"center"}>
          {userData.instagram && (
            <Box
              as={Button}
              size="sm"
              leftIcon={<FaInstagram />}
              bgGradient="linear(to-r, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" // Instagram gradient
              color="white"
              _hover={{
                bgGradient:
                  "linear(to-r, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                opacity: 0.8,
              }}
              onClick={() => handleSnapClick(2)}
            >
              Instagram
            </Box>
          )}
          {userData.tiktok && (
            <Box
              as={Button}
              size="sm"
              leftIcon={<FaTiktok />}
              bgGradient="linear(to-r, #69C9D0, #EE1D52, #69C9D0)" // TikTok gradient
              color="white"
              _hover={{
                bgGradient: "linear(to-r, #69C9D0, #EE1D52, #69C9D0)",
                opacity: 0.8,
              }}
              onClick={() => handleSnapClick(3)}
            >
              Tiktok
            </Box>
          )}
          {userData.snapchat && (
            <Box
              as={Button}
              size="sm"
              leftIcon={<FaSnapchat />}
              bgGradient="linear(to-r, #FFFC00, #FFFC00)" // Snapchat gradient
              color="black"
              _hover={{
                bgGradient: "linear(to-r, #FFFC00, #FFFC00)",
                opacity: 0.8,
              }}
              onClick={() => handleSnapClick(1)}
            >
              Snapchat
            </Box>
          )}
        </HStack>

        <Divider borderColor={dividerColor} />

        <Text
          fontSize="lg"
          fontWeight="bold"
          mb={2}
          textAlign="center"
          color={nameColor}
        >
          Interests
        </Text>
        <HStack spacing={2} wrap="wrap" justify="center">
          {tagsArray.map((tag, index) => (
            <Tag key={index} size="md" variant="subtle" colorScheme="teal">
              <TagLabel>{tag}</TagLabel>
            </Tag>
          ))}
        </HStack>

        <Divider borderColor={dividerColor} />

        <Text
          fontSize="lg"
          fontWeight="bold"
          textAlign="center"
          color={nameColor}
        >
          About Me
        </Text>
        <Textarea
          value={userData.aboutMe || ""}
          isReadOnly
          rows={4}
          resize="none"
          bg={inputBgColor}
          textAlign="center"
        />
      </Box>
    </Flex>
  );
};

export default Profile;