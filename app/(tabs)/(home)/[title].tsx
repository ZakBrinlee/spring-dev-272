import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function TitlePage() {
  const router = useRouter();
  const { title } = useLocalSearchParams<{title: string}>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dynamic Page: {title}</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});