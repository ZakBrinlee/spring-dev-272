import { supabase } from "@/utils/supabase"
import { useQuery } from "@tanstack/react-query"

export const useGetRestaurants = () => {
    return useQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('restaurants')
                .select('*')
            if (error) {
                throw new Error(error.message)
            }
            return data
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}