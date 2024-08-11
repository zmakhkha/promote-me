import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "../services/api-client";
import { Input, Button, Stack, FormControl, FormLabel } from "@chakra-ui/react";

interface SocialMediaProp {
  inputBgColor: string;
}

const SocialMedia = ({ inputBgColor }: SocialMediaProp) => {
  const [userData, setUserData] = useState({
    snapchat: "",
    tiktok: "",
    instagram: "",
  });

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/settings/sociallInfo/");
        console.log("Fetched user data:", response.data); // Log the fetched data
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
      alert("Changes saved successfully!");
    } catch (error) {
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
        <Button
          type="submit"
          bg="black"
          color="white"
          _hover={{ bg: "gray.700" }}
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
