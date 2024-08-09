import { UserQuery } from "../App";
import useData from "./useData"; // Assuming this hook handles data fetching

export interface Platform {
  id: number;
  name: string;
  slug: string;
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
        // Include any query parameters you need for fetching users
        // For example, you might filter by location, gender, etc.
        // genres: userQuery.genre?.id,
        // platforms: userQuery.platform?.id,
        // ordering: userQuery.sortOrder,
      },
    },
    [userQuery, page]  // Include page in the dependency array
  );

export default useUsers;
