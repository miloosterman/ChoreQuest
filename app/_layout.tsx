import { Slot } from "expo-router";
import { SessionProvider } from "../firebase/SessionProvider";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
