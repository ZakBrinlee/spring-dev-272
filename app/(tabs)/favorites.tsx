import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import React, { useReducer } from "react";

// Define the initial state
const initialState = { favorites: [] as string[] };

// Define the reducer function
function favoritesReducer(
  state: { favorites: string[] },
  action: { type: "add" | "remove" | "reset"; payload?: string },
) {
  switch (action.type) {
    case "add":
      if (action.payload && !state.favorites.includes(action.payload)) {
        return { favorites: [...state.favorites, action.payload] };
      }
      return state;
    case "remove":
      return {
        favorites: state.favorites.filter((item) => item !== action.payload),
      };
    case "reset":
      return { favorites: [] };
    default:
      throw new Error("Unknown action type");
  }
}

export default function FavoritesScreen() {
  // Use the useReducer hook
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const sampleItems = ["React", "Expo", "NativeWind", "Gluestack"];

  return (
    <Box className="flex-1 justify-center items-center bg-light dark:bg-dark p-4">
      <VStack className="items-center space-y-4">
        <Text className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Manage Favorites
        </Text>
        <Text className="text-lg text-gray-600 dark:text-gray-400">
          Add or remove items from your favorites list.
        </Text>

        {/* Display the list of favorite items */}
        <Box className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <Text className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Your Favorites:
          </Text>
          {state.favorites.length > 0 ? (
            state.favorites.map((item, index) => (
              <HStack
                space="sm"
                key={index}
                className="justify-between items-center bg-white dark:bg-gray-700 p-2 mb-2 rounded"
              >
                <Text className="text-gray-800 dark:text-gray-200">{item}</Text>
                <Button
                  onPress={() => dispatch({ type: "remove", payload: item })}
                  className="bg-red-500 dark:bg-red-700 px-2 py-1 rounded"
                >
                  <Text className="text-white text-sm">Remove</Text>
                </Button>
              </HStack>
            ))
          ) : (
            <Text className="text-gray-600 dark:text-gray-400">
              No favorites added yet.
            </Text>
          )}
        </Box>

        {/* Buttons to add sample items */}
        <VStack space="md">
          {sampleItems.map((item) => (
            <Button
              key={item}
              onPress={() => dispatch({ type: "add", payload: item })}
              className="bg-blue-500 dark:bg-blue-700 px-4 py-2 rounded"
            >
              <Text className="text-white">Add {item}</Text>
            </Button>
          ))}
        </VStack>

        {/* Reset button */}
        <Button
          onPress={() => dispatch({ type: "reset" })}
          className="bg-gray-500 dark:bg-gray-700 px-4 py-2 rounded mt-4"
        >
          <Text className="text-white">Reset Favorites</Text>
        </Button>
      </VStack>
    </Box>
  );
}
