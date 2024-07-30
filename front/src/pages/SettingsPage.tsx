import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Avatar,
  Input,
  Button,
  Stack,
  Select,
  FormControl,
  FormLabel,
  useColorModeValue
} from '@chakra-ui/react';
import axios from '../services/api-client'; // Use your configured API client

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

  const inputBgColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={5}
      bgGradient="linear(to-b, purple.300, orange.200 15%, gray.200 75%)"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" maxW="md" w="full">
        <Heading as="h1" mb={6} textAlign="center">Settings</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Avatar size="xl" src={imagePreview} mb={4} />
            <FormControl>
              <FormLabel>Change Profile Picture</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                value={userData.username}
                readOnly
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={userData.email}
                readOnly
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                name="date_of_birth"
                type="date"
                value={userData.date_of_birth}
                readOnly
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Snapchat Username</FormLabel>
              <Input
                name="snapUsername"
                value={userData.snapUsername}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Kik Username</FormLabel>
              <Input
                name="kikUsername"
                value={userData.kikUsername}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Instagram Username</FormLabel>
              <Input
                name="instaUsername"
                value={userData.instaUsername}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                bg={inputBgColor}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Interests</FormLabel>
              <Input
                name="interests"
                value={userData.interests}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                name="country"
                value={userData.country}
                onChange={handleChange}
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Score</FormLabel>
              <Input
                name="score"
                value={userData.score}
                readOnly
                bg={inputBgColor}
              />
            </FormControl>
            <Button
              type="submit"
              bg="black"
              color="white"
              _hover={{ bg: 'gray.700' }}
              mt={4}
              w="full"
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SettingsPage;
