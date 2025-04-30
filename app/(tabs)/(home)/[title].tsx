import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Stack, useLocalSearchParams } from 'expo-router';
import resturantData from '../../../data/resturants.json';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function DetailsPage() {
  const { title: id } = useLocalSearchParams<{title: string}>();
  const restaurant = resturantData.find((item) => item.id === id);
  const {
    location,
    rating,
    title
  } = restaurant || {};

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
      </Box>
    </SafeAreaView>
  );
}