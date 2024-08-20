import { UserQuery } from "../App";
import useData from "./useData";

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
        page: page,
        genres: userQuery.genre?.id, // Filtering by genre ID
        platform: userQuery.platform?.slug, // Filtering by platform slug
        ordering: userQuery.sortOrder, // Sort order
      },
    },
    [userQuery, page]
  );

export default useUsers;

