import React from "react";
import { HStack, Image, Button } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Show } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api-client";

interface Props {
  onSearch: (searchText: string) => void;
}

const NavBar = ({ onSearch }: Props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout/"); // Replace with your actual logout endpoint

      // Clear tokens from cookies
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

      // Check local storage before removing
      // console.log(
      //   "Before removal:",
      //   localStorage.getItem("accessToken"),
      //   localStorage.getItem("refreshToken")
      // );

      // Remove from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Check local storage after removing
      // console.log(
      //   "After removal:",
      //   localStorage.getItem("accessToken"),
      //   localStorage.getItem("refreshToken")
      // );

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <HStack padding="10px">
      <Image src={logo} boxSize="60px" />
      <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={() => navigate("/")}
      >
        Explore
      </Button>
      <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={() => navigate("/chat")}
      >
        Chat
      </Button>
      <Show above="sm">
        <SearchInput onSearch={onSearch} />
      </Show>
      <Button
        variant="link"
        textAlign="left"
        whiteSpace="normal"
        fontSize="lg"
        marginX={2}
        onClick={handleLogout}
      >
        LogOut
      </Button>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
