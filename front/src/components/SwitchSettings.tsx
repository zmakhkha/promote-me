import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import UserInfo from './UserInfo';
import SocialMedia from './SocialMedia';

const SwitchSettings = ({ userData, handleChange, handleImageChange, handleSubmit, imagePreview, inputBgColor }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList mb={4}>
        <Tab>User Info</Tab>
        <Tab>Social Media</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UserInfo
            userData={userData}
            handleChange={handleChange}
            handleImageChange={handleImageChange}
            handleSubmit={handleSubmit}
            imagePreview={imagePreview}
            inputBgColor={inputBgColor}
          />
        </TabPanel>
        <TabPanel>
          <SocialMedia
            userData={userData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            inputBgColor={inputBgColor}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SwitchSettings;
