import { UserQuery } from "../App";
import useData from "./useData"; // Assuming this hook handles data fetching

export interface Platform {
  id: number;
  name: string;
  slug: string;
  username: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  age: number;
  rating_top: number;
  location: string;
  gender: string;
}

const useUsers = (userQuery: UserQuery, page: number) =>
  useData<User>(
    "/users",
    {
      params: {
        page: page,  // Pass the page parameter here
        // genres: userQuery.genre?.id,  // Filtering by genre ID
        // platforms: userQuery.platform?.id,  // Filtering by platform ID
        ordering: userQuery.sortOrder,  // Sort order
      },
    },
    [userQuery, page]  // Include page and userQuery in the dependency array
  );

export default useUsers;

