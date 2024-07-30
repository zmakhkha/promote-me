import { GameQuery } from "../App";
import useData from "./useData";
import { Genre } from "./useGenres";
import users from "../data/users";


export interface Platform {
  id: number;
  name: string;
  slug: string;
  username: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  age: number;
  rating_top: number;
  location: string
  gender: String;
}

// const useGames = (gameQuery: GameQuery) =>
//   useData<Game>(
//     "/games",
//     {
//       params: {
//         genres: gameQuery.genre?.id,
//         platforms: gameQuery.platform?.id,
//         ordering: gameQuery.sortOrder,
//         search: gameQuery.searchText
//       },
//     },
//     [gameQuery]
//   );

const useGames = () => ({data: users, isLoading: false, error: null})

export default useGames;
