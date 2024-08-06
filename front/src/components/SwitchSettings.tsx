import React from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import SocialMedia from './SocialMedia';
import UserInfo from './UserInfo';

const SwitchSettings = ({ userData, handleChange, handleImageChange, handleSubmit, imagePreview, inputBgColor }) => {
  return (
    <Box>
      <UserInfo
        userData={userData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        imagePreview={imagePreview}
        inputBgColor={inputBgColor}
      />
      <SocialMedia
        userData={userData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        inputBgColor={inputBgColor}
      />
    </Box>
  );
};

export default SwitchSettings;
