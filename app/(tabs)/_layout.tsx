import { Tabs } from 'expo-router';
import React from 'react';
import { Alert, Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button, ButtonText } from '@/components/ui/button';

/**
 * TODO: Update the Theme Light/Dark mode to use the new Gluestack UI.
 * TODO: Add dynamic screen under the home tab.
 * TODO: Add shared page between tabs.
 * TODO: Add JSDoc comments to component
 * 
 * Refinements:
 * - Extract the tab bar button into a separate component for better readability.
 */
export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerRight: () => (
            <Button
              onPress={() => Alert.alert('Button Pressed', 'You pressed the header button!')}
            >
              <ButtonText>Light</ButtonText>
            </Button>
          ) 
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.fill" color={color} />,
          headerRight: () => (
            <Button
              onPress={() => Alert.alert('Button Pressed', 'You pressed the header button!')}
            >
              <ButtonText>Dark</ButtonText>
            </Button>
          ) 
        }}
      />
    </Tabs>
  );
}
