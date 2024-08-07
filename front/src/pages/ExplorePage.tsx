import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import UserGrid from "../components/UserGrid";
import GenreList from "../components/GenreList";
import { useState } from "react";
import { Genre } from "../hooks/useGenres";
import PlatformSelector from "../components/PlatformSelector";
import { Game, Platform } from "../hooks/useGames";
import SortSelector from "../components/SortSelector";
import NavBar from "../components/NavBar";
import UserHeading from "../components/UserHeading";
import NewNav from "../components/NewNav";

export interface UserQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
}

const ExplorePage = () => {
  const [UserQuery, setUserQuery] = useState<UserQuery>({} as UserQuery);

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <NewNav />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={UserQuery.genre}
            onSelectGenre={(genre) => setUserQuery({ ...UserQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <UserHeading UserQuery={UserQuery} />
          <HStack spacing={5} marginBottom={5}>
            <SortSelector
              sortOrder={UserQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setUserQuery({ ...UserQuery, sortOrder })
              }
            />
          </HStack>
        </Box>
        <UserGrid UserQuery={UserQuery} />
      </GridItem>
    </Grid>
  );
};

export default ExplorePage;
