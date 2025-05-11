import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { TrashIcon } from '@/components/ui/icon';

export default function DetailsPage() {
  const navigation = useNavigation();
  const { title: id } = useLocalSearchParams<{title: string}>();
  const { restaurants, deleteRestaurant } = useRestaurantContext();
  const restaurant = restaurants.find((item) => item.id === id);
  const {
    location,
    rating,
    title
  } = restaurant || {};

  const handleDelete = () => {
    if (restaurant) {
      deleteRestaurant(restaurant.id);
      // Navigate back to the previous screen
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white dark:bg-zinc-700'>
      <Box className='p-4 m-4 dark:bg-[#151718] bg-white max-h-screen-safe items-center rounded-md'>
        <Stack.Screen
          options={{
            title: title,
          }}
        />
        <Heading size='xl'>Returant Details</Heading>
        <VStack space="md" className='mr-auto mt-4'>
            <Text size='lg'>Location: {location}</Text>
            <Text size='lg'>Rating: {rating}</Text>
        </VStack>
        <Button 
          size='lg'
          action="negative"
          onPress={handleDelete}
        >
          <ButtonIcon as={TrashIcon} />
          <ButtonText>Delete</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}