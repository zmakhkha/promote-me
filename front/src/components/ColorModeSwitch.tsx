import { Button, HStack, Text, useColorMode, Icon } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  
  return (
    <HStack>
      <Button 
        onClick={toggleColorMode} 
        variant="outline" 
        colorScheme={colorMode === "dark" ? "yellow" : "gray"}
        leftIcon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      >
        {/* <Text whiteSpace="nowrap">
          {colorMode === "dark" ? "Light Mode" : "Dark Mode"}
        </Text> */}
      </Button>
    </HStack>
  );
};

export default ColorModeSwitch;
