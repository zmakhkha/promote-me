import React, { useState, useEffect } from "react";
import axios from "../services/api-client";
import {
  Box,
  Avatar,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  Wrap,
  WrapItem,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from "@chakra-ui/react";

const UserInfo = ({
  handleChange,
  handleImageChange,
  handleSubmit,
  imagePreview,
  inputBgColor,
}) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: '',
    interests: '',
    image: null,

  });
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/settings/personalInfo/');
        const data = response.data;
        console.log("++++++|",data);
        
        // Update userData state
        setUserData({
          firstName: data.firstName || '-',
          lastName: data.lastName || '',
          dateOfBirth: data.dateOfBirth || '',
          country: data.country || '',
          interests: data.interests || '',
        });

        // Update interests state
        setInterests(data.interests ? data.interests.split(" ").filter(Boolean) : []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInterestChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      const newInterest = (e.target as HTMLInputElement).value.trim();
      if (newInterest && interests.length < 10) {
        const updatedInterests = [...interests, newInterest];
        setInterests(updatedInterests);
        setUserData(prevData => ({
          ...prevData,
          interests: updatedInterests.join(" ") + " ",
        }));
        (e.target as HTMLInputElement).value = "";
      }
    }
  };

  const removeInterest = (interestToRemove: string) => {
    const updatedInterests = interests.filter(
      (interest) => interest !== interestToRemove
    );
    setInterests(updatedInterests);
    setUserData(prevData => ({
      ...prevData,
      interests: updatedInterests.join(" "),
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put('/settings/personalInfo/', {
        ...userData,
        interests: interests.join(" "),
      });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <form onSubmit={handleSaveChanges}>
      <Stack spacing={4} align="center">
        <Flex direction="column" align="center">
          <Avatar size="xl" src={imagePreview} mb={4} />
          <FormControl>
            <FormLabel color="gray.500">Change Profile Picture</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              bg={inputBgColor}
            />
          </FormControl>
        </Flex>
        <Box width="full">
          <HStack spacing={4} mb={2}>
            <FormControl>
              <FormLabel color="gray.500">First Name</FormLabel>
              <Input
                name="firstName"
                value={userData.firstName || ''}
                onChange={e => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500">Last Name</FormLabel>
              <Input
                name="lastName"
                value={userData.lastName || ''}
                onChange={e => setUserData(prev => ({ ...prev, lastName: e.target.value }))}
                bg={inputBgColor}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel color="gray.500">Date of Birth</FormLabel>
            <Input
              name="dateOfBirth"
              type="date"
              value={userData.dateOfBirth || ''}
              onChange={e => setUserData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              bg={inputBgColor}
            />
          </FormControl>
        </Box>
        <FormControl>
          <FormLabel color="gray.500">Country</FormLabel>
          <Input
            name="country"
            value={userData.country || ''}
            onChange={e => setUserData(prev => ({ ...prev, country: e.target.value }))}
            bg={inputBgColor}
          />
        </FormControl>
        <Wrap mt={2}>
          {interests.map((interest, index) => (
            <WrapItem key={index}>
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="teal"
              >
                <TagLabel>{interest}</TagLabel>
                <TagCloseButton onClick={() => removeInterest(interest)} />
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
        <Button
          type="submit"
          bg="black"
          color="white"
          _hover={{ bg: "gray.700" }}
          mt={4}
          w="full"
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};

export default UserInfo;
