import NewQuestModal from "@/components/NewQuestModal";
import { Link, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getQuests } from "@/firebase/databaseService";
import { useSession } from "@/firebase/SessionProvider";

type HeroParams = {
    name: string;
    id: string;
};

type Quest = {
    id: string;
    name: string;
    timeReward: number;
    goldReward: number;
};

export default function ViewHero() {
    const { name, id } = useLocalSearchParams() as HeroParams;
    const [quests, setQuests] = useState<Quest[]>([]);
    const { session } = useSession();

    useEffect(() => {
        const fetchQuestNames = async () => {
            try {
                if (!session) {
                    console.log('User is not signed in');
                    return
                }
                const questSnapshot = await getQuests(id, session);
                const questList: Quest[] = [];
                questSnapshot.forEach((quest) => {
                    questList.push({ id: quest.key, ...quest.val() })
                });
                setQuests(questList);
                console.log(questList);
            } catch (error) {
                console.error("Error fetching quests:", error);
            }
        };
        fetchQuestNames();
    }, []);

    if (!name || !id) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Invalid Hero Details</Text>
                <Link href={"/"}>
                    <Text style={styles.backLink}>Go Back</Text>
                </Link>
            </View>
        );
    }

    const renderQuest = ({ item }: { item: Quest }) => (
        <View style={styles.questItem}>
            <Text style={styles.questText}>Quest: {item.name}</Text>
            <Text style={styles.questText}>Gold Reward: {item.goldReward}</Text>
            <Text style={styles.questText}>Time Reward: {item.timeReward}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heroText}>
                Hero Name: {name} | Id: {id}
            </Text>
            <FlatList
                data={quests}
                renderItem={renderQuest}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noQuests}>No quests available.</Text>}
            />
            <NewQuestModal heroId={id} />
            <Link href={"/"}>
                <Text style={styles.backLink}>Go Back</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heroText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    questItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        width: "90%",
    },
    questText: {
        fontSize: 16,
    },
    noQuests: {
        fontSize: 16,
        color: "gray",
    },
    errorText: {
        fontSize: 16,
        color: "red",
    },
    backLink: {
        marginTop: 10,
        color: "blue",
    },
});
