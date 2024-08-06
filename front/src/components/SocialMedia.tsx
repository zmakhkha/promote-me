import React from 'react';
import { Input, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';

const SocialMedia = ({ userData, handleChange, handleSubmit, inputBgColor }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel color='gray.500'>Snapchat Username</FormLabel>
          <Input
            name="snapUsername"
            value={userData.snapUsername || ''}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color='gray.500'>Kik Username</FormLabel>
          <Input
            name="kikUsername"
            value={userData.kikUsername || ''}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color='gray.500'>Instagram Username</FormLabel>
          <Input
            name="instaUsername"
            value={userData.instaUsername || ''}
            onChange={handleChange}
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
  );
};

export default SocialMedia;
