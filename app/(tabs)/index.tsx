import { StyleSheet, ScrollView, FlatList, View, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import Card from '@/components/Card';
import resurantData from '../../data/resturants.json';
import { useState } from 'react';
import { useThemeColor } from '@/hooks/useThemeColor';

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
