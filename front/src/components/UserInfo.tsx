import React, { useState } from 'react';
import { Box, Avatar, Input, Button, Stack, FormControl, FormLabel, Flex, Wrap, WrapItem, Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

const UserInfo = ({ userData, handleChange, handleImageChange, handleSubmit, imagePreview, inputBgColor }) => {
  const [interests, setInterests] = useState(userData.interests.split(' ').filter(Boolean));

  const handleInterestChange = (e) => {
    if (e.key === ' ') {
      const newInterest = e.target.value.trim();
      if (newInterest && interests.length < 5) {
        const updatedInterests = [...interests, newInterest];
        setInterests(updatedInterests);
        handleChange({ target: { name: 'interests', value: updatedInterests.join(' ') + ' ' } });
        e.target.value = '';
      }
    }
  };

  const removeInterest = (interestToRemove) => {
    const updatedInterests = interests.filter(interest => interest !== interestToRemove);
    setInterests(updatedInterests);
    handleChange({ target: { name: 'interests', value: updatedInterests.join(' ') } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4} align="center">
        <Flex direction="column" align="center">
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
        </Flex>
        <FormControl>
          <FormLabel color='gray.500'>Interests</FormLabel>
          <Input
            name="interests"
            onKeyDown={handleInterestChange}
            bg={inputBgColor}
            placeholder="Type an interest and press space"
          />
          <Wrap mt={2}>
            {interests.map((interest, index) => (
              <WrapItem key={index}>
                <Tag
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="blue"
                >
                  <TagLabel>{interest}</TagLabel>
                  <TagCloseButton onClick={() => removeInterest(interest)} />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          {interests.length >= 10 && (
            <Box color="red.500" mt={2}>
              You can add a maximum of 10 interests.
            </Box>
          )}
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
  );
};

export default UserInfo;
