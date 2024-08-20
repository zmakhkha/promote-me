import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
import UserCardContainer from "./UserCardContainer";

const UserCardSketelon = () => {
  return (
    <UserCardContainer>
      <Card>
        <Skeleton height="200px" />
        <CardBody>
          <SkeletonText />
        </CardBody>
      </Card>
    </UserCardContainer>
  );
};

export default UserCardSketelon;
