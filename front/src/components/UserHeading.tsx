import { Heading } from "@chakra-ui/react";
import { UserQuery } from "../App";

interface Props {
  UserQuery: UserQuery;
}

const UserHeading = ({ UserQuery }: Props) => {
  const heading = `${UserQuery.platform?.name || ""} ${
    UserQuery.genre?.name || ""
  } Users`;
  return (
    <Heading fontSize="5xl" marginY={5} as="h1">
      {heading}
    </Heading>
  );
};

export default UserHeading;
