import { Button, Text, View } from "react-native";
import { useSession } from '../../firebase/SessionProvider';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Log Out" onPress={() => signOut() } />
    </View>
  );
}
