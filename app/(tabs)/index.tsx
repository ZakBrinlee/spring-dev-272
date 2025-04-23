import { StyleSheet, ScrollView, FlatList, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Card from '@/components/Card';
import resurantData from '../../data/resturants.json';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * TODO: Update to utilize the new Gluestack UI.
 * TODO: Add JSDoc comments to component
 * 
 * Refinements:
 * - Create a new page for the restaurant details.
 * - Add a link to the new restaurant details page.
 * - Utilize `route.params` to pass data to the new page.
 * - Utilize `navigation.navigate` to navigate to the new page.
 * - Update the details page with back buttonr
 */
export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(resurantData);
  const backgroundColor = useThemeColor({}, 'background');
  const color = useThemeColor({}, 'text');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = resurantData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="subtitle">Travel Yummy Resturants</ThemedText>
      <TextInput
        style={[{ backgroundColor, color }, styles.searchInput]}
        placeholder="Search restaurants..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Card
            {...item}
          />
        )}
      />
    </ScrollView>
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
