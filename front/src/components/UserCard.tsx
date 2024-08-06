import { Game } from "../hooks/useGames";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
} from "@chakra-ui/react";
import PlateformIconList from "./PlateformIconList";
import Emoji from "./Emoji";
import { MdLocationPin } from "react-icons/md";
import countriesService from "../services/countriesService";
import getCroppedImageUrl from "../services/getCoppedImages";

interface Props {
  game: Game; // Corrected the prop name to match the interface
}

const UserCard = ({ game }: Props) => {
  const [countryLabel, setCountryLabel] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryLabel = async () => {
      try {
        const label = await countriesService(game.location);
        setCountryLabel(label);
      } catch (error) {
        console.error("Error fetching country label:", error);
        setCountryLabel(null); // Handle error state as needed
      }
    };

    fetchCountryLabel();
  }, [game.location]); // Re-fetch label when game.location changes

  return (
    <Card>
      <Image src={getCroppedImageUrl(game.background_image)} />
      <CardBody>
        <HStack justify="space-between" marginBottom={2}>
          <Heading fontSize="2xl">
            {game.name}, {game.age} <Emoji rating={game.rating_top} />
          </Heading>
          <HStack justify="center" marginBottom={2} fontSize={"20px"}>
            <PlateformIconList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
          </HStack>
        </HStack>
        <HStack>
          <Heading as="h5" size="sm">
            {countryLabel !== null ? countryLabel : "Loading..."} {/* Render a loading state */}
          </Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
