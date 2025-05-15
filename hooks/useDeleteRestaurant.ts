import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (restaurantId: Restaurant["id"]) => {
      const { data, error } = await supabase
        .from("restaurants")
        .delete()
        .eq("id", restaurantId);
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
