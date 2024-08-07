import { User } from "../hooks/UseUsers";
import { useEffect, useState } from "react";
import { Card, CardBody, Heading, HStack, Image } from "@chakra-ui/react";
import PlateformIconList from "./PlateformIconList";
import Emoji from "./Emoji";
import countriesService from "../services/countriesService";
import getCroppedImageUrl from "../services/getCoppedImages";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const [countryLabel, setCountryLabel] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryLabel = async () => {
      try {
        const label = await countriesService(user.location);
        setCountryLabel(label);
      } catch (error) {
        console.error("Error fetching country label:", error);
        setCountryLabel(null);
      }
    };

    fetchCountryLabel();
    console.log(user);
    
  }, [user.location]);
  const navigate = useNavigate();
  const handleImageClick = () => {
    navigate(`/friend?username=${user.username}`);
  };

  return (
    <Card>
      <Image onClick={handleImageClick} src={getCroppedImageUrl(user.background_image)} />
      <CardBody>
        <HStack justify="space-between" marginBottom={2}>
          <Heading fontSize="2xl">
            {user.name}, {user.age} <Emoji rating={user.rating_top} />
          </Heading>
          <HStack justify="center" marginBottom={2} fontSize={"20px"}>
            <PlateformIconList
              platforms={user.parent_platforms.map((p) => p.platform)}
            />
          </HStack>
        </HStack>
        <HStack>
          <Heading as="h5" size="sm">
            {countryLabel !== null ? countryLabel : "Loading..."}{" "}
            {/* Render a loading state */}
          </Heading>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default UserCard;
