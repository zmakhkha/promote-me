import React from 'react';
import { Box, Avatar, Input, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';

const UserInfo = ({ userData, handleChange, handleImageChange, handleSubmit, imagePreview, inputBgColor }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <Avatar size="xl" src={imagePreview} mb={4} />
        <FormControl>
          <FormLabel color='gray.500'>Change Profile Picture</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            bg={inputBgColor}
          />
        </FormControl>
        {/* <FormControl isReadOnly>
          <FormLabel color='gray.500'>Username</FormLabel>
          <Input
            name="username"
            value={userData.username}
            readOnly
            bg={inputBgColor}
          />
        </FormControl> */}
        {/* <FormControl isReadOnly>
          <FormLabel color='gray.500'>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={userData.email}
            readOnly
            bg={inputBgColor}
          />
        </FormControl> */}
        {/* <FormControl isReadOnly>
          <FormLabel color='gray.500'>Date of Birth</FormLabel>
          <Input
            name="date_of_birth"
            type="date"
            value={userData.date_of_birth}
            // readOnly
            bg={inputBgColor}
          />
        </FormControl> */}
        {/* <FormControl>
          <FormLabel color='gray.500'>First Name</FormLabel>
          <Input
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color='gray.500'>Last Name</FormLabel>
          <Input
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl> */}
        {/* <FormControl>
          <FormLabel color='gray.500'>Gender</FormLabel>
          <Input
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl> */}
        <FormControl>
          <FormLabel color='gray.500'>Interests</FormLabel>
          <Input
            name="interests"
            value={userData.interests}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        {/* <FormControl>
          <FormLabel color='gray.500'>Country</FormLabel>
          <Input
            name="country"
            value={userData.country}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl> */}
        {/* <FormControl isReadOnly>
          <FormLabel color='gray.500'>Score</FormLabel>
          <Input
            name="score"
            value={userData.score}
            readOnly
            bg={inputBgColor}
          />
        </FormControl> */}
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
  );
};

export default UserInfo;
