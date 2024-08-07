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
import { FaLocationDot } from "react-icons/fa6";
import { FaSnapchat, FaTiktok, FaInstagram } from "react-icons/fa";
import avatar from "../assets/no-image-placeholder.webp";
import NewNav from "../components/NewNav";

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
        aboutMe:
          "This is a brief about me section. It includes some information about the user.",
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

  const nameColor = useColorModeValue("black", "white");
  const locationColor = useColorModeValue("gray.600", "gray.300");
  const scoreColor = useColorModeValue("gray.900", "gray.50");
  const dividerColor = useColorModeValue("gray.400", "gray.600");

  const interestsArray = userData.interests.split(" ").filter(Boolean);

  return (
    <>
      <Flex
        direction="column"
        minH="100vh"
        bgGradient={gradientBgColor}
      >
      <NewNav />
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
                {userData.firstName} {userData.lastName}, 26
              </Text>
              <HStack justify="center" spacing={2} mt={2} color={nameColor}>
                <FaLocationDot />
                <Text>{userData.country}</Text>
              </HStack>
            </Box>

            <Divider borderColor={dividerColor}  />

            <HStack justifyContent={'space-around'} width={'100%'} wrap={'wrap'} justify={'center'}>
              <VStack>
                <Text fontSize="lg" fontWeight="bold" color={nameColor}>
                  {userData.score}
                </Text>
                <Text color={nameColor}>Score</Text>
              </VStack>
              <VStack>
                <Text fontSize="lg" fontWeight="bold" color={nameColor}>
                  156
                </Text>
                <Text color={nameColor}>Followers</Text>
              </VStack>
              <VStack>
                <Text fontSize="lg" fontWeight="bold" color={nameColor}>
                  100
                </Text>
                <Text color={nameColor}>Views</Text>
              </VStack>
            </HStack>

            <Divider borderColor={dividerColor} />

            <Text fontSize="lg" fontWeight="bold" color={nameColor}>
              Social Media
            </Text>
            <HStack spacing={1}  gap={5} wrap={'wrap'} justify={'center'}>
            <Box
              as={Button}
              size="sm"
              leftIcon={<FaInstagram />}
              bgGradient="linear(to-r, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" // Instagram gradient
              color="white"
              _hover={{
                  bgGradient: "linear(to-r, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  opacity: 0.8,
                }}
                >
              Instagram
            </Box>
            
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
                >
              Tiktok
            </Box>
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
                >
              Snapchat
            </Box>
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
              {interestsArray.map((interest, index) => (
                <Tag key={index} size="md" variant="subtle" colorScheme="teal">
                  <TagLabel>{interest}</TagLabel>
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
              value={userData.aboutMe}
              isReadOnly
              rows={4}
              resize="none"
              bg={inputBgColor}
              textAlign="center"
            />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default SettingsPage;
