import { HStack, Image, Button, Box } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Show, Hide } from "@chakra-ui/react";
import { NavLink, Navigate } from "react-router-dom";

interface Props {
  onSearch: (searchText: string) => void;
}

const NaNavBar = ({ onSearch }: Props) => {
  return (
    <>
      <HStack padding="10px">
        <Image src={logo} boxSize="60px" />
        <NavLink to="/">
          <Button
            variant="link"
            textAlign="left"
            whiteSpace="normal"
            fontSize="lg"
            marginX={2}
          >
            Explore
          </Button>
        </NavLink>
        <NavLink to="/chat">
          <Button
            variant="link"
            textAlign="left"
            whiteSpace="normal"
            fontSize="lg"
            marginX={2}
          >
            Chat
          </Button>
        </NavLink>
        <Show above="sm">
          <SearchInput onSearch={onSearch} />
        </Show>
        <NavLink to="/login">
          <Button
            variant="link"
            textAlign="left"
            whiteSpace="normal"
            fontSize="lg"
            marginX={2}
          >
            LogIn
          </Button>
        </NavLink>
        <ColorModeSwitch />
      </HStack>
    </>
  );
};

export default NaNavBar;
