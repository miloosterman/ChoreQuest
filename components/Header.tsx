import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ChoreQuest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 20,
        backgroundColor: '#FFD700',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
    }
    });