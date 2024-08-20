import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Image,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useDisclosure,
  Stack,
  Show,
  Hide,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "../services/api-client";
import getImage from "../services/getImage";


const NavLink = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-white hover:bg-gray-700"
  >
    {children}
  </Link>
);

const NewNav = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const [userImage, setUserImage] = useState<string>("");

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get("/users/navInfo");
        setUserImage(getImage(response.data.image));
      } catch (error) {
        console.error("Failed to fetch user image:", error);
      }
    };

    fetchUserImage();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Box borderRadius='15' margin={1.5} bg={colorMode === "light" ? "gray.100" : "gray.900"} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Show above='769px'>
            <Image src={logo} boxSize="50px" />
          </Show>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            <Button
              variant="link"
              textAlign="left"
              whiteSpace="normal"
              fontSize="lg"
              marginX={2}
              onClick={() => navigate("/")}
            >
              <NavLink to="/">Explore</NavLink>
            </Button>
            <Button
              variant="link"
              textAlign="left"
              whiteSpace="normal"
              fontSize="lg"
              marginX={2}
              onClick={() => navigate("/chat")}
            >
              <NavLink to="/chat">Chat</NavLink>
            </Button>
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}
            >
              <Avatar  size="sm" src={userImage || String({userImage})} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => navigate("/settings")}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Button ml={4} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            <NavLink to="/">Explore</NavLink>
            <NavLink to="/chat">Chat</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default NewNav;
