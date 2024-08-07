import { SimpleGrid, Text } from "@chakra-ui/react";
import useGames, { Platform } from "../hooks/useGames";
import UserCard from "./UserCard";
import UserCardSketelon from "./UserCardSketelon";
import UserCardContainer from "./UserCardContainer";
import { Genre } from "../hooks/useGenres";
import { GameQuery } from "../App";

interface Props {
  gameQuery: GameQuery;
}
const UserGrid = ({ gameQuery }: Props) => {
  const { data, error, isLoading } = useGames(gameQuery);
  // console.log("fetched data from usergrid|", data);
  
  const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (error) return <Text>{error}</Text>;
  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        Skeletons.map((skeleton) => (
          <UserCardContainer key={skeleton}>
            <UserCardSketelon />
          </UserCardContainer>
        ))}
      {data.map((game) => (
        <UserCardContainer key={game.id}>
          <UserCard game={game} />
        </UserCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default UserGrid;
