import { fireEvent, render, screen } from "@/utils/test-utils";
import HomeScreen from "..";
import mockData from "../../../../data/restaurants.json";
import { useGetRestaurants } from "@/hooks/useGetRestaurants";

// Mock the useGetRestaurants hook
jest.mock("@/hooks/useGetRestaurants", () => ({
  useGetRestaurants: jest.fn(),
}));

describe("HomeScreen", () => {
  // Setup the mock data before each test
  beforeEach(() => {
    (useGetRestaurants as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
  });

  // Clear all mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders heading and search input", () => {
    render(<HomeScreen />);

    expect(
      screen.getByRole("header", { name: /search yummy restaurants/i }),
    ).toBeOnTheScreen();

    expect(
      screen.getByPlaceholderText(/search restaurants.../i),
    ).toBeOnTheScreen();
  });

  test("renders restaurant data and filters by search", () => {
    const mockQuery = "pasta";
    render(<HomeScreen />);

    // Check if the restaurant data is rendered
    mockData.forEach((restaurant) => {
      expect(screen.getByText(restaurant.title)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/search restaurants.../i),
      mockQuery,
    );

    // Check if the data rendered is filtered
    mockData.forEach((restaurant) => {
      if (restaurant.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(restaurant.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(restaurant.title)).not.toBeOnTheScreen();
      }
    });
  });

  test("renders updated data with filtering", async () => {
    const mockQuery = "pa";
    render(<HomeScreen />);

    // Check if the restaurant data is rendered
    mockData.forEach((restaurant) => {
      expect(screen.getByText(restaurant.title)).toBeOnTheScreen();
    });

    // Simulate a search query
    fireEvent.changeText(
      screen.getByPlaceholderText(/search restaurants.../i),
      mockQuery,
    );

    mockData.forEach((restaurant) => {
      // Validate that pasta and sushi are the only items rendered
      if (restaurant.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(restaurant.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(restaurant.title)).not.toBeOnTheScreen();
      }
    });

    // Update the `restaurants` state in the context
    (useGetRestaurants as jest.Mock).mockReturnValue({
      data: mockData.splice(1, 1), // Remove the second item
      isFetching: false,
    });

    // Re-validate the filtered data
    mockData.forEach((restaurant) => {
      // Validate that only pasta are the only items rendered
      if (restaurant.title.toLowerCase().includes(mockQuery)) {
        expect(screen.getByText(restaurant.title)).toBeOnTheScreen();
      } else {
        expect(screen.queryByText(restaurant.title)).not.toBeOnTheScreen();
      }
    });
  });
});
