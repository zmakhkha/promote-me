import { SimpleGrid, Text } from "@chakra-ui/react";
import useUsers from "../hooks/useUsers";
import UserCard from "./UserCard";
import UserCardSketelon from "./UserCardSketelon";
import UserCardContainer from "./UserCardContainer";
import { UserQuery } from "../App";

interface Props {
  UserQuery: UserQuery;
}
const UserGrid = ({ UserQuery }: Props) => {
  const { data, error, isLoading } = useUsers(UserQuery);
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
      {data.map((user) => (
        <UserCardContainer key={user.id}>
          <UserCard user={user} />
        </UserCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default UserGrid;
