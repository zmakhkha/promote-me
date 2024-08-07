import React, { useState, useEffect, useRef } from "react";
import axios from "../services/api-client";
import getImage from "../services/getImage";
import {
  Box,
  Avatar,
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Flex,
  HStack,
  Textarea,
  useColorModeValue,
  Tag,
  Text,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";
import AsyncSelect from "react-select/async";

const UserInfo = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    interests: "",
    aboutMe: "",
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [aboutMeCharsLeft, setAboutMeCharsLeft] = useState(50);
  const [message, setMessage] = useState({ text: "", color: "" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const dropdownBgColor = useColorModeValue("white", "gray.800");
  const dropdownTextColor = useColorModeValue("black", "white");
  const optionBgColor = useColorModeValue("gray.100", "gray.500");
  const optionHoverBgColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/settings/personalInfo/");
        const data = response.data;

        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          country: data.country || "",
          interests: data.interests || "",
          aboutMe: data.aboutMe || "",
        });

        setSelectedTags(
          data.interests ? data.interests.split(" ").filter(Boolean) : []
        );

        setAboutMeCharsLeft(50 - (data.aboutMe?.length || 0));

        if (data.image) {
          setImagePreview(getImage(data.image));
        }

        const countriesResponse = await fetch(
          "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        );
        const countriesData = await countriesResponse.json();
        setCountries(countriesData.countries);
        const userCountry =
          countriesData.countries.find((c) => c.value === data.country) || null;
        setSelectedCountry(userCountry);

        const tagsResponse = await axios.get("http://localhost:2000/tags");
        setTags(tagsResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagClick = (tag: any) => {
    const newTags = [...selectedTags];
    const tagIndex = newTags.indexOf(tag.tag);

    if (tagIndex === -1) {
      if (newTags.length < 5) {
        newTags.push(tag.tag);
      } else {
        // alert("You can select up to 5 tags only.");
      setMessage({ text: "Changes saved successfully!", color: "green" });

      }
    } else {
      newTags.splice(tagIndex, 1);
    }

    setSelectedTags(newTags);
    setUserData((prevData) => ({
      ...prevData,
      interests: newTags.join(" "),
    }));
  };

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    formData.append("country", selectedCountry ? selectedCountry.value : "");
    formData.append("interests", selectedTags.join(" "));
    formData.append("aboutMe", userData.aboutMe);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put("/settings/personalInfo/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage({ text: "Changes saved successfully!", color: "green" });
    } catch (error) {
      console.error("Error saving changes:", error);
      setMessage({ text: "Failed to save changes.", color: "red" });
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any[]) => void
  ) => {
    const filteredCountries = countries.filter((country: any) =>
      country.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filteredCountries);
  };

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    setUserData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleAboutMeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setUserData((prevData) => ({
        ...prevData,
        aboutMe: value,
      }));
      setAboutMeCharsLeft(50 - value.length);
    }
  };

  return (
    <form onSubmit={handleSaveChanges}>
      <Stack spacing={4} align="center">
        <Flex direction="column" align="center" position="relative">
          <Avatar
            borderRadius="15%"
            size="xl"
            src={imagePreview || undefined}
            mb={4}
          />
          <Box
            position="absolute"
            bottom={0}
            right={0}
            bg="white"
            borderRadius="full"
            boxShadow="md"
            p={2}
            onClick={handleIconClick}
            cursor="pointer"
          >
            <FaCamera size={15} color="black" />
          </Box>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            display="none"
          />
        </Flex>
        <Box width="full">
          <HStack spacing={4} >
            <FormControl>
              <FormLabel color="gray.500">First Name</FormLabel>
              <Input
                name="firstName"
                value={userData.firstName || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                bg={inputBgColor}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500">Last Name</FormLabel>
              <Input
                name="lastName"
                value={userData.lastName || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, lastName: e.target.value }))
                }
                bg={inputBgColor}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel color="gray.500">Country</FormLabel>
            <AsyncSelect
              cacheOptions
              loadOptions={loadOptions}
              value={selectedCountry}
              onChange={handleCountryChange}
              defaultOptions={countries}
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: inputBgColor,
                  borderColor: useColorModeValue("gray.300", "gray.600"),
                  color: dropdownTextColor,
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: useColorModeValue("gray.400", "gray.500"),
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: dropdownBgColor,
                  color: dropdownTextColor,
                }),
                menuList: (provided) => ({
                  ...provided,
                  backgroundColor: dropdownBgColor,
                  color: dropdownTextColor,
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused
                    ? optionHoverBgColor
                    : optionBgColor,
                  color: dropdownTextColor,
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: dropdownTextColor,
                }),
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="gray.500">Interests</FormLabel>
            <Box
              bg={inputBgColor}
              p={2}
              borderRadius="md"
              display="flex"
              flexWrap="wrap"
              mb={2}
              maxHeight="100px"
              overflowY="auto"
              border="1px"
              borderColor="gray.200"
              style={{ resize: "none" }}
            >
              {selectedTags.map((tag, index) => (
                <Tag
                  key={index}
                  size="md"
                  variant="solid"
                  colorScheme="green"
                  m={1}
                >
                  {tag}
                </Tag>
              ))}
            </Box>
            <Flex flexWrap="wrap" mt={2}>
              {tags.map((tag) => (
                <Tag
                  key={tag.id}
                  mt={1}
                  mr={2}
                  mb={2}
                  size="md"
                  variant="subtle"
                  colorScheme={selectedTags.includes(tag.tag) ? "blue" : "gray"}
                  cursor="pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.tag}
                </Tag>
              ))}
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel color="gray.500">About Me</FormLabel>
            <Textarea
              bg={inputBgColor}
              p={2}
              borderRadius="md"
              display="flex"
              flexWrap="wrap"
              // mb={2}
              maxHeight="100px"
              overflowY="auto"
              border="1px"
              borderColor="gray.200"
              style={{ resize: "none" }}
              value={userData.aboutMe}
              onChange={handleAboutMeChange}
            />
            <Box textAlign="right" color="gray.500">
              {aboutMeCharsLeft} characters left
            </Box>
          </FormControl>
        </Box>
        {message.text && (
          <Text color={message.color} fontWeight="bold" mb={4}>
            {message.text}
          </Text>
        )}
        <Button
          type="submit"
          bg="black"
          color="white"
          _hover={{ bg: "gray.700" }}
          w="full"
        >
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};

export default UserInfo;
