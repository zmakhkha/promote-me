import { useState } from "react";
import { Button, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import useUsers from "../hooks/useUsers";
import UserCard from "./UserCard";
import UserCardSketelon from "./UserCardSketelon";
import UserCardContainer from "./UserCardContainer";
import { UserQuery } from "../App";

interface Props {
    UserQuery: UserQuery;
}

const UserGrid = ({ UserQuery }: Props) => {
    const [page, setPage] = useState(1);
    const { data, error, isLoading } = useUsers(UserQuery, page);
    console.log(data);
    
    const Skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

    const handleNextPage = () => {
        if (Array.isArray(data) && data.length === 8) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    if (error) return <Text>{error}</Text>;

    return (
        <>
            <SimpleGrid
                columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                padding="10px"
                spacing={6}
            >
                {isLoading && Skeletons.map((skeleton) => (
                    <UserCardContainer key={skeleton}>
                        <UserCardSketelon />
                    </UserCardContainer>
                ))}
                {Array.isArray(data) && data.map((user) => (
                    <UserCardContainer key={user.id}>
                        <UserCard user={user} />
                    </UserCardContainer>
                ))}
            </SimpleGrid>
            <HStack justify="center" marginTop={4}>
                <Button onClick={handlePreviousPage} isDisabled={page === 1}>
                    Previous
                </Button>
                <Button onClick={handleNextPage} isDisabled={!Array.isArray(data) || data.length < 8}>
                    Next
                </Button>
            </HStack>
        </>
    );
};

export default UserGrid;
