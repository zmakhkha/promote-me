import { Platform } from "../hooks/UseUsers";
import { HStack, Icon } from "@chakra-ui/react";
import {
  FaSnapchatGhost,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
  FaWhatsapp
} from "react-icons/fa";
import { IconType } from "react-icons";
import getSnapProfile from "../services/getSnapProfile";
import getInstaProfile from "../services/getInstaProfile";
import getTiktokProfile from "../services/getTiktokProfile";

interface Props {
  platforms: Platform[];
}







const iconMap: { [key: string]: IconType } = {
  snapchat: FaSnapchatGhost,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  telegram: FaTelegramPlane,
  whatsapp: FaWhatsapp
};

const urlHandlerMap: { [key: string]: (username: string) => string } = {
  snapchat: getSnapProfile,
  instagram: getInstaProfile,
  tiktok: getTiktokProfile,
  telegram: () => '', // Add similar handlers if needed
  whatsapp: () => ''  // Add similar handlers if needed
};

const PlateformIconList = ({ platforms }: Props) => {
  const handleClick = (platform: Platform) => {
    const username = platform.username;
    
    const handler = urlHandlerMap[platform.slug];
    if (handler && username) {
      const url = handler(username);
      window.open(url, '_blank'); 
    }
  };

  return (
    <HStack marginY={1}>
      {platforms.map((platform) => (
        <Icon
          key={platform.id}
          as={iconMap[platform.slug]}
          color='gray.500'
          cursor="pointer"
          onClick={() => handleClick(platform)}
        />
      ))}
    </HStack>
  );
};

export default PlateformIconList;
