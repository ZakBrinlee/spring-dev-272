import "@/global.css";
import { GluestackUIProvider, ModeType } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { createContext, useEffect, useState } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
/**
 * TODO: Refactor Context to support the new Gluestack UI theme
 * TODO: Update the Theme Light/Dark mode to use the new Gluestack UI with provider
 */

type ThemeContextType = {
  colorMode?: ModeType;
  toggleColorMode?: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  colorMode: "light",
  toggleColorMode: () => {},
});

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<ModeType>("light");
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const toggleColorMode = async () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <GluestackUIProvider mode={colorMode}>
       <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeContext.Provider>
      </GluestackUIProvider>
  );
}
