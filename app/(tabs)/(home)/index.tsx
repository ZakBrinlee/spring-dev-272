import { StyleSheet, FlatList } from 'react-native';
import Card from '@/components/Card';
import { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Heading } from '@/components/ui/heading';
import { Input, InputField } from '@/components/ui/input';
import { useRestaurantContext } from '@/components/ui/restaurant-context-provider';

export default function HomeScreen() {
  const { restaurants } = useRestaurantContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(restaurants);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = restaurants.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <Box className='flex-1 p-4 dark:bg-zinc-700'>
      <Heading size='xl' className='self-center' >Search Yummy Resturants</Heading>
      <Input variant="outline" size="md" className='bg-white dark:bg-zinc-900 mt-2'>
        <InputField
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Input>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Card
            {...item}
          />
        )}
      />
    </Box>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    marginTop: 10,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});
