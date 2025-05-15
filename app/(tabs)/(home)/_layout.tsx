import { ThemeContext } from "@/app/_layout";
import { ChevronLeftIcon, Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Stack, useRouter } from "expo-router";
import { useContext } from "react";

export default function HomeLayout() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => (
          <Pressable className="p-1" onPress={toggleColorMode}>
            <Icon as={colorMode === "light" ? MoonIcon : SunIcon} size="xl" />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: colorMode === "light" ? "#fff" : "#27272a",
        },
        headerTitleStyle: {
          color: colorMode === "light" ? "#000" : "#fff",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="[title]"
        options={{
          title: "Details",
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Icon size="xl" as={ChevronLeftIcon} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
