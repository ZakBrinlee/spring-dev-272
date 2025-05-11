import { Restaurant } from "@/components/ui/restaurant-context-provider";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const useAddRestaurant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newRestaurant: Restaurant) => {
            const { data, error } = await supabase
                .from('restaurants')
                .insert(newRestaurant)
                .select();
            if (error) {
                throw new Error(error.message)
            }
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['restaurants'] })
        },
    })
}