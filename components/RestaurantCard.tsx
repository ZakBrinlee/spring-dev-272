import React from "react";
import { Link, LinkText } from "./ui/link";
import { useRouter } from "expo-router";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import {
  Restaurant,
  useRestaurantContext,
} from "./ui/restaurant-context-provider";
import FavoriteButton from "./FavoriteButton";

const RestaurantCard: React.FC<Restaurant> = ({
  title,
  location,
  rating,
  id,
  isFavorite,
}: Restaurant) => {
  const { toggleFavorite } = useRestaurantContext();
  const router = useRouter();

  const handleLinkPress = () => {
    router.push({
      pathname: "/(tabs)/(home)/[title]",
      params: { title: id },
    });
  };

  return (
    <>
      <Card variant="filled" className="mt-4">
        <Heading>{title}</Heading>
        <FavoriteButton
          isFavorite={isFavorite}
          handleFavoriteToggle={() => toggleFavorite(id)}
        />
        <Text className="text-md my-1 dark:text-white">{location}</Text>
        <Text className="text-md my-1 dark:text-white">Rating: {rating}</Text>
        <Link
          onPress={handleLinkPress}
          className="flex-row items-center justify-center"
        >
          <LinkText className=" text-blue-500 text-lg no-underline">
            See Details
          </LinkText>
        </Link>
      </Card>
    </>
  );
};

export default RestaurantCard;
