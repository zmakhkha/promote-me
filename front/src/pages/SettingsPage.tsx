import React, { useState, useEffect } from "react";
import { Box, Heading, Flex, useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "../services/api-client"; // Use your configured API client
import UserInfo from "../components/UserInfo";
import SocialMedia from "../components/SocialMedia";
import NewNav from "../components/NewNav";

const SettingsPage = () => {
  const [userData, setUserData] = useState({
    profile_image: "",
    email: "",
    firstName: "",
    lastName: "",
    snapUsername: "",
    kikUsername: "",
    instaUsername: "",
    gender: "",
    interests: "",
    country: "",
    date_of_birth: "",
    score: 0,
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    // Fetch user data from the backend
    axios
      .get("/users/me/") // Adjust endpoint as needed
      .then((response) => {
        setUserData(response.data);
        setImagePreview(response.data.profile_image);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUserData((prevData) => ({ ...prevData, profile_image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    try {
      await axios.put("/auth/user/", formData); // Adjust endpoint as needed
      // Handle successful update
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const cardTextColor = useColorModeValue("gray.800", "gray.100");
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, gray.600 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );
  const cardShadowColor = useColorModeValue("md", "lg");

  return (
    <Flex direction="column" minH="100vh" bgGradient={gradientBgColor}>
      <NewNav />
      <Flex flex="1" justifyContent="center" alignItems="center" p={5}>
        <Box
          bg={useColorModeValue("white", "gray.800")}
          color={cardTextColor}
          p={8}
          borderRadius="lg"
          boxShadow={cardShadowColor}
          maxW="md"
          w="full"
        >
          <Heading as="h1" mb={6} textAlign="center">
            Settings
          </Heading>
          <Tabs variant="enclosed">
            <TabList>
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
        </Box>
      </Flex>
    </Flex>
  );
};

export default SettingsPage;
