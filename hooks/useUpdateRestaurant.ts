import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedRestuarant: Partial<Restaurant>) => {
      const { data, error } = await supabase
        .from("restaurants")
        .update(updatedRestuarant)
        .eq("id", updatedRestuarant.id);
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
