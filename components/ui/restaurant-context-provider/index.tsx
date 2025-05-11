import { SupabaseNewRestaurant, useAddRestaurant } from "@/hooks/useAddRestaurant";
import { useDeleteRestaurant } from "@/hooks/useDeleteRestaurant";
import { useGetRestaurants } from "@/hooks/useGetRestaurants";
import { useUpdateRestaurant } from "@/hooks/useUpdateRestaurant";
import { createContext, useContext, useEffect, useState } from "react";

export type Restaurant = {
    title: string;
    location: string;
    rating: number;
    id: string;
    isFavorite?: boolean;
}

type RestaurantContextType = {
    isLoading: boolean;
    restaurants: Restaurant[];
    addRestaurant: (restaurant: SupabaseNewRestaurant) => void;
    updateRestaurant: (updatedRestaurant: Partial<Restaurant>) => void;
    toggleFavorite: (id: string) => void;
    deleteRestaurant: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetRestaurants();
    const addRestaurantMutation = useAddRestaurant();
    const deleteRestaurantMutation = useDeleteRestaurant();
    const updateRestaurantMutation = useUpdateRestaurant();
    
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const addRestaurant = async (restaurant: SupabaseNewRestaurant) => {
        addRestaurantMutation.mutate(restaurant);
    };

    // Update restaurant by id
    const deleteRestaurant = async (restaurantId: Restaurant['id']) => {
        deleteRestaurantMutation.mutate(restaurantId);
    };

    const updateRestaurant = (updatedRestaurant: Partial<Restaurant>) => {
        // Update the restaurant in supabase
        updateRestaurantMutation.mutate(updatedRestaurant);
    };

    const toggleFavorite = (id: string) => {
        const restaurantToToggle = restaurants.find((restaurant) => restaurant.id === id);
        if (!restaurantToToggle) return;
        // Toggle the isFavorite property using updateRestaurant
        updateRestaurant({ ...restaurantToToggle, isFavorite: !restaurantToToggle.isFavorite });
    };

    useEffect(() => {
        if (data && !isFetching) {
            console.log("Fetched data: ", data);
            setRestaurants(data as Restaurant[]);
        }
        if (isFetching) {
            console.log("Fetching data...");
        }

    }, [data, isFetching])

    return (
        <RestaurantContext.Provider
            value={{ 
                isLoading: isFetching || addRestaurantMutation.isPending || deleteRestaurantMutation.isPending || updateRestaurantMutation.isPending,
                restaurants,
                addRestaurant,
                updateRestaurant,
                toggleFavorite,
                deleteRestaurant
            }}>
            {children}
        </RestaurantContext.Provider>
    );
}

export const useRestaurantContext = () => {
    const context = useContext(RestaurantContext);
    if (!context) {
        throw new Error("useRestaurantContext must be used within a RestaurantProvider");
    }
    return context;
};
