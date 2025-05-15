import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Utilitze the Omit utility type to create a new type that excludes the 'id' property
// https://www.geeksforgeeks.org/typescript-omittype-keys-utility-type/
// Supabase Restaurant TypeMatch
export type SupabaseNewRestaurant = Omit<Restaurant, "id">;

export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRestaurant: SupabaseNewRestaurant) => {
      const { data, error } = await supabase
        .from("restaurants")
        .insert(newRestaurant);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
    },
  });
};
