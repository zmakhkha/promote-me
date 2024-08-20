import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false, // This will ensure that the theme does not switch based on the system's color mode
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: '#f0f0f0',
      100: '#dcdcdc',
      200: '#c8c8c8',
      300: '#b4b4b4',
      400: '#a0a0a0',
      500: '#8c8c8c',
      600: '#787878',
      700: '#646464',
      800: '#505050',
      900: '#3c3c3c',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.600' : 'gray.800',
      },
    }),
  },
});

export default theme;
