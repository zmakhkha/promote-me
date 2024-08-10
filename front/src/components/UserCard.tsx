import { User } from "../hooks/UseUsers";
import { useEffect, useState } from "react";
import { Card, CardBody, Heading, HStack, Image, Box, useColorModeValue } from "@chakra-ui/react";
import PlateformIconList from "./PlateformIconList";
import Emoji from "./Emoji";
import countriesService from "../services/countriesService";
import getCroppedImageUrl from "../services/getCoppedImages";
import { useNavigate } from "react-router-dom";


interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const [countryLabel, setCountryLabel] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryLabel = async () => {
      try {
        const label = await countriesService(user.location);
        setCountryLabel(label);
      } catch (error) {
        console.error("Error fetching country label:", error);
        setCountryLabel(null);
      }
    };

    fetchCountryLabel();
  }, [user.location]);

  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate(`/friend?username=${user.username}`);
  };

  // Use useColorModeValue to set the background color of the card
  const cardBg = useColorModeValue("gray.100", "gray.900");

  return (
    <Card height="400px" bg={cardBg}> {/* Set a fixed height for the card and a dynamic background color */}
      <Box height="85%" overflow="hidden">
        {/* Image container with fixed height */}
        <Image
          borderColor={cardBg}
          onClick={handleImageClick}
          src={getCroppedImageUrl(user.background_image)}
          objectFit="cover" // Ensure the image covers the container
          width="100%"
          height="100%" // Make the image fill the container
        />
      </Box>
      <CardBody>
        <HStack justify="space-between" marginBottom={2}>
          <Heading fontSize="2xl">
            {user.name}, {user.age} <Emoji rating={user.rating_top} />
          </Heading>
          <HStack justify="center" marginBottom={2} fontSize={"20px"}>
            <PlateformIconList
              platforms={user.parent_platforms.map((p) => p.platform)}
            />
          </HStack>
        </HStack>
        <HStack>
          <Heading as="h5" size="sm">
            {countryLabel !== null ? countryLabel : "Loading..."}{" "}
            {/* Render a loading state */}
          </Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
