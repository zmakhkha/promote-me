import { Box, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import UserGrid from "../components/UserGrid";
import GenreList from "../components/GenreList";
import { useState } from "react";
import { Genre } from "../hooks/useGenres";
import { Platform } from "../hooks/UseUsers";
import SortSelector from "../components/SortSelector";
import UserHeading from "../components/UserHeading";
import NewNav from "../components/NewNav";
import PlatformeSelector from "../components/PlatformeSelector";

export interface UserQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  FilterSelector: string;
}

const platforms: Platform[] = [
  { id: 1, name: "Snapchat", slug: "snapchat", username: "" },
  { id: 2, name: "Instagram", slug: "instagram", username: "" },
  { id: 3, name: "TikTok", slug: "tiktok", username: "" },
];

const ExplorePage = () => {
  const [userQuery, setUserQuery] = useState<UserQuery>({} as UserQuery);

  const handlePlatformSelection = (slug: string) => {
    const selectedPlatform = platforms.find((platform) => platform.slug === slug) || null;
    setUserQuery({ ...userQuery, platform: selectedPlatform });
  };

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
            selectedGenre={userQuery.genre}
            onSelectGenre={(genre) => setUserQuery({ ...userQuery, genre })}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <UserHeading UserQuery={userQuery} />
          <HStack spacing={5} marginBottom={5}>
            <SortSelector
              sortOrder={userQuery.sortOrder}
              onSelectSortOrder={(sortOrder) =>
                setUserQuery({ ...userQuery, sortOrder })
              }
            />
            <PlatformeSelector 
              FilterSelector={userQuery.platform?.slug || ""}
              onSelectFilterSelector={handlePlatformSelection}
            />
          </HStack>
        </Box>
        <UserGrid UserQuery={userQuery} />
      </GridItem>
    </Grid>
  );
};

export default ExplorePage;
