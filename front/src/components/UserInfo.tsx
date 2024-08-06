import React, { useState, useEffect, useRef } from "react";
import axios from "../services/api-client";
import getImage from "../services/getImage";
import { Box, Avatar, Input, Button, Stack, FormControl, FormLabel, Flex, Wrap, WrapItem, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import { FaCamera } from 'react-icons/fa';

const UserInfo = ({ handleChange, handleSubmit, inputBgColor }) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    interests: '',
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for the file input

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/settings/personalInfo/');
        const data = response.data;
        
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          country: data.country || '',
          interests: data.interests || '',
        });

        setInterests(data.interests ? data.interests.split(" ").filter(Boolean) : []);
        
        if (data.image) {
          setImagePreview(getImage(data.image));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);

      // Create a new FileReader to display the preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    
    const formData = new FormData();
    formData.append('firstName', userData.firstName);
    formData.append('lastName', userData.lastName);
    formData.append('country', userData.country);
    formData.append('interests', interests.join(" "));

    if (imageFile) {
      formData.append('image', imageFile);
    }
  
    try {
      const response = await axios.put('/settings/personalInfo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Function to trigger file input click
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSaveChanges}>
      <Stack spacing={4} align="center">
        <Flex direction="column" align="center" position="relative">
          <Avatar borderRadius='15%' size="xl" src={imagePreview || undefined} mb={4} />
          <Box
            position="absolute"
            bottom={0}
            right={0}
            bg="white"
            borderRadius="full"
            boxShadow="md"
            p={2}
            onClick={handleIconClick}
            cursor="pointer"
          >
            <FaCamera size={15} color="black" />
          </Box>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            display="none" // Hide the input
          />
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
            <FormLabel color="gray.500">Country</FormLabel>
            <Input
              name="country"
              value={userData.country || ''}
              onChange={e => setUserData(prev => ({ ...prev, country: e.target.value }))}
              bg={inputBgColor}
            />
          </FormControl>
        </Box>
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
