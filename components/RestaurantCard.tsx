import React from 'react';
import { Link, LinkText } from './ui/link';
import { useRouter } from 'expo-router';
import { Card } from './ui/card';
import { Heading } from './ui/heading';
import { Pressable } from './ui/pressable';
import { Text } from './ui/text';
import { FavouriteIcon, Icon } from './ui/icon';
import { Restaurant, useRestaurantContext } from './ui/restaurant-context-provider';

const RestaurantCard: React.FC<Restaurant> = ({ title, location, rating, id, isFavorite }: Restaurant) => {
    const { toggleFavorite } = useRestaurantContext();
      const router = useRouter();

      const handleLinkPress = () => {
        router.push({
            pathname: '/(tabs)/(home)/[title]',
            params: { title: id },
        })
      }

    return (
        <>
            <Card variant="filled" className="mt-4">
                <Heading>{title}</Heading>
                <Pressable
                    onPress={() => toggleFavorite(id)}
                >
                    <Icon 
                        as={FavouriteIcon}
                        size='xl'
                        className={`${isFavorite ? 'text-red-500' : 'text-gray-500'} absolute right-4 top-4`}
                    />
                </Pressable>
                <Text className='text-md my-1 dark:text-white'>{location}</Text>
                <Text className='text-md my-1 dark:text-white'>Rating: {rating}</Text>
                <Link
                    onPress={handleLinkPress}
                    className='flex-row items-center justify-center'
                    >
                    <LinkText className=' text-blue-500 text-lg no-underline'>
                        See Details
                    </LinkText>
                </Link>
            </Card>
        </>
    );
};

export default RestaurantCard;