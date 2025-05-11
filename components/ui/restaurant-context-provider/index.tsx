import { SupabaseNewRestaurant, useAddRestaurant } from "@/hooks/useAddRestaurant";
import { useDeleteRestaurant } from "@/hooks/useDeleteRestaurant";
import { useGetRestaurants } from "@/hooks/useGetRestaurants";
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
    updateRestaurant: (id: string, updatedRestaurant: Partial<Restaurant>) => void;
    toggleFavorite: (id: string) => void;
    deleteRestaurant: (id: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetRestaurants();
    const addRestaurantMutation = useAddRestaurant();
    const deleteRestaurantMutation = useDeleteRestaurant();
    
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    const addRestaurant = async (restaurant: SupabaseNewRestaurant) => {
        addRestaurantMutation.mutate(restaurant);
    };

    // Update restaurant by id
    const deleteRestaurant = async (restaurantId: Restaurant['id']) => {
        deleteRestaurantMutation.mutate(restaurantId);
    };

    const updateRestaurant = (id: string, updatedRestaurant: Partial<Restaurant>) => {
        setRestaurants((prev) =>
            prev.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, ...updatedRestaurant } : restaurant
            )
        );
    };

    const toggleFavorite = (id: string) => {
        setRestaurants((prev) =>
            prev.map((restaurant) =>
                restaurant.id === id ? { ...restaurant, isFavorite: !restaurant.isFavorite } : restaurant
            )
        );
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
                isLoading: isFetching || addRestaurantMutation.isPending || deleteRestaurantMutation.isPending,
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
