import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Text,
  Avatar,
  HStack,
  VStack,
  Divider,
  Textarea,
  Button,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { FaSnapchat, FaTiktok, FaInstagram } from "react-icons/fa";
import avatar from "../assets/no-image-placeholder.webp";
import NewNav from "../components/NewNav";
import axios from "../services/api-client";
import getImage from "../services/getImage";
import countriesService from "../services/countriesService";
import getInstaProfile from "../services/getInstaProfile";
import getSnapProfile from "../services/getSnapProfile";
import getTiktokProfile from "../services/getTiktokProfile";
import Profile from "../components/Profile";

const SettingsPage = () => {
  const gradientBgColor = useColorModeValue(
    "linear(to-b, white, gray.200 15%, gray.600 75%)",
    "linear(to-b, gray.800, gray.600 15%, gray.200 75%)"
  );

  return (
    <>
      <Flex direction="column" minH="100vh" bgGradient={gradientBgColor}>
        <NewNav />
        <Profile />
      </Flex>
    </>
  );
};

export default SettingsPage;
