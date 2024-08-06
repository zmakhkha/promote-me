import { Game } from "../hooks/useGames";
import {
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Textarea,
} from "@chakra-ui/react";
import PlateformIconList from "./PlateformIconList";
import CriticScore from "./CriticScore";
import getCroppedImageUrl from "../services/getCoppedImages";
import Emoji from "./Emoji";
import { MdLocationPin } from "react-icons/md";

interface Props {
  game: Game;
}

const UserCard = ({ game }: Props) => {
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
          <MdLocationPin />
          <Heading as="h5" size="sm">
            {game.location}
          </Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
