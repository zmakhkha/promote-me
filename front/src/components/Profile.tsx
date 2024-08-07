import React, { useState, useEffect } from "react";
import axios from "../services/api-client";
import getImage from "../services/getImage";
import {
  Box,
  Avatar,
  Text,
  Stack,
  Tag,
  Button,
  useColorModeValue
} from "@chakra-ui/react";
import { FaCamera } from 'react-icons/fa';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    profileViews: 0,
    interests: [],
    about: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>('');

  // Define colors for light and dark modes
  const inputBgColor = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/settings/personalInfo/');
        const data = response.data;
        
        setUserData({
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          profileViews: data.profileViews || 0,
          interests: data.interests ? data.interests.split(" ").filter(Boolean) : [],
          about: data.about || '',
          image: data.image || '',
        });

        if (data.image) {
          setImagePreview(getImage(data.image));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Stack spacing={4} align="center">
      <Avatar borderRadius='15%' size="xl" src={imagePreview || undefined} mb={4} />
      <Box width="full" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold">
          {userData.firstName} {userData.lastName}
        </Text>
        <Text fontSize="sm" color="gray.500" mb={4}>
          Profile Views: {userData.profileViews}
        </Text>
        <Stack direction="row" spacing={2} mb={4} justify="center">
          {userData.interests.map((interest, index) => (
            <Tag key={index} size="md" variant="solid" colorScheme="blue">
              {interest}
            </Tag>
          ))}
        </Stack>
        <Text fontSize="md" color="gray.700" textAlign="justify">
          {userData.about}
        </Text>
      </Box>
    </Stack>
  );
};

export default Profile;
