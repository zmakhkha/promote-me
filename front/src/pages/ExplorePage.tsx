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

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

const ExplorePage = () => {
  const [gameQuery, setgameQuery] = useState<GameQuery>({} as GameQuery);

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
        <NavBar
          onSearch={(searchText) => setgameQuery({ ...gameQuery, searchText })}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <GenreList
            selectedGenre={gameQuery.genre}
            onSelectGenre={(genre) => setgameQuery({ ...gameQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <UserHeading gameQuery={gameQuery} />
          <HStack spacing={5} marginBottom={5}>
            <SortSelector
              sortOrder={gameQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setgameQuery({ ...gameQuery, sortOrder })
              }
            />
          </HStack>
        </Box>
        <UserGrid gameQuery={gameQuery} />
      </GridItem>
    </Grid>
  );
};

export default ExplorePage;
