import { UserQuery } from "../App";
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
  location: string;
  gender: String;
}

const useGames = (UserQuery: UserQuery) =>
  useData<Game>(
    "/users",
    {
      params: {
        // genres: UserQuery.genre?.id,
        // platforms: UserQuery.platform?.id,
        // ordering: UserQuery.sortOrder,
      },
    },
    [UserQuery]
  );

// const useGames = () => ({data: users, isLoading: false, error: null})

export default useGames;
