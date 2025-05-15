import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { useRestaurantContext } from "@/components/ui/restaurant-context-provider";
import RestaurantCard from "@/components/RestaurantCard";

export default function HomeScreen() {
  const { restaurants } = useRestaurantContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(restaurants);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = restaurants.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };

  // Listen for changes in resturant data
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredData(restaurants);
    } else {
      const filtered = restaurants.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredData(filtered);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurants]);

  return (
    <Box className="flex-1 p-4 dark:bg-zinc-700">
      <Heading size="xl" className="self-center">
        Search Yummy Restaurants
      </Heading>
      <Input
        variant="outline"
        size="md"
        className="bg-white dark:bg-zinc-900 mt-2"
      >
        <InputField
          placeholder="Search restaurants..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </Input>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RestaurantCard {...item} />}
      />
    </Box>
  );
}
