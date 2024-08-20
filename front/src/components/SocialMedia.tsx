import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "../services/api-client";
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Box,
  Flex,
} from "@chakra-ui/react";

interface SocialMediaProp {
  inputBgColor: string;
}

const SocialMedia = ({ inputBgColor }: SocialMediaProp) => {
  const [userData, setUserData] = useState({
    snapchat: "",
    tiktok: "",
    instagram: "",
  });

  const [message, setMessage] = useState<{ text: string; color: string }>({
    text: "",
    color: "green",
  });

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/settings/sociallInfo/");
        setUserData({
          snapchat: response.data.snapchat || "",
          tiktok: response.data.tiktok || "",
          instagram: response.data.instagram || "",
        });
      } catch (error) {
        console.error("Error fetching social media data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.put("/settings/sociallInfo/", userData);
      setMessage({ text: "Changes saved successfully!", color: "green" });
    } catch (error) {
      setMessage({ text: "Error saving social media data.", color: "red" });
      console.error("Error saving social media data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel color="gray.500">Snapchat Username</FormLabel>
          <Input
            name="snapchat"
            value={userData.snapchat}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.500">TikTok Username</FormLabel>
          <Input
            name="tiktok"
            value={userData.tiktok}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel color="gray.500">Instagram Username</FormLabel>
          <Input
            name="instagram"
            value={userData.instagram}
            onChange={handleChange}
            bg={inputBgColor}
          />
        </FormControl>

        <Flex justifyContent="center">
          {message.text && (
            <Box color={message.color} mt={4}>
              {message.text}
            </Box>
          )}
        </Flex>

        <Button
            type="submit"
            colorScheme="teal"
            mt={4}
            width="full"
            // isDisabled={aboutMeCharsLeft < 0}
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};

export default SocialMedia;
