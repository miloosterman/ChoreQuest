import { Slot } from "expo-router";
import { SessionProvider } from "./ctx";
import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
