import { GameQuery } from "../App";
import useData from "./useData"; // Assuming this hook handles data fetching

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  age: number;
  rating_top: number;
  location: string;
  gender: string;
}

const useUsers = (userQuery: GameQuery) =>
  useData<User>(
    "/users", // Updated endpoint
    {
      params: {
        // Include any query parameters you need for fetching users
        // For example, you might filter by location, gender, etc.
        // genres: userQuery.genre?.id,
        // platforms: userQuery.platform?.id,
        // ordering: userQuery.sortOrder,
        // search: userQuery.searchText
      },
    },
    [userQuery]
  );

export default useUsers;
