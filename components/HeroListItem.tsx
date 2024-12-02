import { deleteHero } from "@/firebase/databaseService";
import { Link } from "expo-router";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { useSession } from "@/firebase/SessionProvider";


type HeroListItemProps = {
  id: string;
  name: string;
};

export default function HeroListItem({ id, name }: HeroListItemProps) {
  const { session } = useSession();

  return (
    <View style={styles.itemContainer}>
      <Link
        href={`/view-hero?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`}
        asChild
      >
        <Text style={styles.heroButton}>{name}</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  heroButton: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: "center",
    overflow: "hidden",
  },
});
