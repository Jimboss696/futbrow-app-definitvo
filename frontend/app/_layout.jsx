import { Stack } from "expo-router";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
    </Stack>
  );
}