import { RestaurantProvider } from "@/components/ui/restaurant-context-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

const queryClient = new QueryClient();

const customRender = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <RestaurantProvider>{ui}</RestaurantProvider>
    </QueryClientProvider>,
  );
};

// Re-export everything
export * from "@testing-library/react-native";

// Override render method
export { customRender as render };
