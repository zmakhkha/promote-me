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
  Tag,
  Text,
  IconButton,
  useColorModeValue,
  Textarea,
  HStack,
  Center,
} from "@chakra-ui/react";
import { FaCamera, FaTimes } from "react-icons/fa";
import AsyncSelect from "react-select/async";
interface Country {
  value: string;
  label: string;
  // Add other fields if necessary
}
interface Tag {
  id: string;
  tag: string;
}

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
const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [aboutMeCharsLeft, setAboutMeCharsLeft] = useState(50);
  const [message, setMessage] = useState({ text: "", color: "" });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const inputBgColor = useColorModeValue("gray.100", "gray.700");
  const dropdownBgColor = useColorModeValue("white", "#1A202C");
  const dropdownTextColor = useColorModeValue("black", "white");
  const optionBgColor = useColorModeValue("gray.100", "gray.500");
  const optionHoverBgColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/settings/personalInfo/");
        const data = response.data;

        // Initialize selectedTags from fetched data
        // console.log(data.interests );
        
        setSelectedTags(
          data.interests ? data.interests.split(" ").filter(Boolean) : []
        );

        setUserData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          country: data.country || "",
          interests: data.interests || "",
          aboutMe: data.aboutMe || "",
        });

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
          countriesData.countries.find((c: Country) => c.value === data.country) || null;
        setSelectedCountry(userCountry);

        const tagsResponse = await axios.get("/tags");
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
        setMessage({ text: "You can select up to 5 tags only.", color: "red" });
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

  const handleTagRemove = (tag: string) => {
    const newTags = selectedTags.filter((t) => t !== tag);
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
          <HStack spacing={4}>
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
                    backgroundColor: useColorModeValue("gray.300", "gray.600"),
                  },
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: dropdownBgColor,
                  // backgroundColor: useColorModeValue("gray.300", "gray.600"),
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: dropdownTextColor,
                  backgroundColor: useColorModeValue("gray.300", "gray.600"),
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: dropdownTextColor,
                  backgroundColor: useColorModeValue("gray.300", "gray.600"),
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: useColorModeValue("gray.300", "gray.600"),
                }),
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel color="gray.500">Interests</FormLabel>
            <Flex
              flexWrap="wrap"
              gap={2}
              mb={4}
              p={2}
              borderWidth="1px"
              borderRadius="md"
              bg={inputBgColor}
            >
              {tags.map((tag: Tag) => (
                <Tag
                  key={tag.id}
                  mt={1}
                  mr={2}
                  mb={2}
                  size="md"
                  variant="subtle"
                  colorScheme={
                    selectedTags.includes(tag.tag) ? "green" : "gray"
                  }
                  cursor="pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag.tag}
                </Tag>
              ))}
            </Flex>
          </FormControl>
          <FormControl>
            <Flex display={"Flex"} justifyContent={"space-between"}>
              <FormLabel color="gray.500">About Me</FormLabel>
              <Text
                mb={2}
                color={aboutMeCharsLeft < 0 ? "red.500" : "gray.500"}
                textAlign="right"
              >
                {aboutMeCharsLeft} characters left
              </Text>
            </Flex>
            <Textarea
              value={userData.aboutMe}
              onChange={handleAboutMeChange}
              bg={inputBgColor}
              resize="none"
            />
          </FormControl>
          {message.text && (
            <Box color={message.color} mt={4}>
              {message.text}
            </Box>
          )}
          <Button
            type="submit"
            colorScheme="teal"
            mt={4}
            width="full"
            isDisabled={aboutMeCharsLeft < 0}
          >
            Save Changes
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default UserInfo;
