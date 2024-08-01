import React, { useState, useEffect } from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import axios from '../services/api-client'; // Use your configured API client
import SwitchSettings from '../components/SwitchSettings';

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    profile_image: '',
    email: '',
    firstName: '',
    lastName: '',
    snapUsername: '',
    kikUsername: '',
    instaUsername: '',
    gender: '',
    interests: '',
    country: '',
    date_of_birth: '',
    score: 0,
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    // Fetch user data from the backend
    axios.get('/auth/user/') // Adjust endpoint as needed
      .then(response => {
        setUserData(response.data);
        setImagePreview(response.data.profile_image);
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData(prevData => ({ ...prevData, profile_image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      await axios.put('/auth/user/', formData); // Adjust endpoint as needed
      // Handle successful update
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const inputBgColor = useColorModeValue('gray.100', 'gray.700');
  const cardTextColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <Box
      p={5}
      bgGradient="linear(to-b, teal.300, blue.200 15%, gray.200 75%)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg={useColorModeValue('white', 'gray.800')} p={8} borderRadius="lg" boxShadow="lg" maxW="md" w={[300, 400, 500]} color={cardTextColor}>
        <Heading as="h1" mb={6} textAlign="center">Settings</Heading>
        <SwitchSettings
          userData={userData}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          imagePreview={imagePreview}
          inputBgColor={inputBgColor}
        />
      </Box>
    </Box>
  );
};

export default SettingsPage;
