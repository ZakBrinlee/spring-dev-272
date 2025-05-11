import "@/global.css";
import { GluestackUIProvider, ModeType } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';
import { RestaurantProvider } from "@/components/ui/restaurant-context-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase";
import { AppState } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type ThemeContextType = {
  colorMode?: ModeType;
  toggleColorMode?: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

const queryClient = new QueryClient();

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh()
//   } else {
//     supabase.auth.stopAutoRefresh()
//   }
// })

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ModeType>("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // handle initial supabase auth
  useEffect(() => {
    const autoSignin = async () => {
      if (isAuthenticated) {
        console.log("User is already authenticated, skipping sign-in.");
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@dev.com',
        password: 'testtest',
      });

      if (error) {
        console.error("Error signing in:", error);
      } else {
        setIsAuthenticated(true);
        console.log("Signed in user:", data);
      }
    };

    autoSignin();
  }, [isAuthenticated]);

  if (!loaded) {
    return null;
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode={colorMode}>
        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
          <RestaurantProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </RestaurantProvider>
        </ThemeContext.Provider>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
