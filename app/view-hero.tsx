import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet, FlatList, Alert, Button, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { deleteHero, getQuests, completeQuest, listenToQuests, getHeroDetails } from "@/firebase/databaseService";
import { useSession } from "@/firebase/SessionProvider";
import NewQuestModal from "@/components/NewQuestModal";

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

type HeroDetails = {
    name: string;
    level: number;
    completedQuests: number;
    gold: number;
    screentime: number;
    remainingQuests: number;
};

export default function ViewHero() {
    const { name, id } = useLocalSearchParams() as HeroParams;
    const [quests, setQuests] = useState<Quest[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [heroDetails, setHeroDetails] = useState<HeroDetails | null>(null);
    const { session } = useSession();

    const handleDelete = async () => {
        if (!session) {
            Alert.alert("Error", "User is not signed in.");
            return;
        }

        try {
            await deleteHero(id, session);
            Alert.alert("Success", "Hero successfully deleted.");
            router.replace("/");
        } catch (error) {
            console.error("Error deleting hero:", error);
            Alert.alert("Error", "Failed to delete the hero.");
        }
    };

    const fetchHeroDetails = async () => {
        if (!session) {
            Alert.alert("Error", "User is not signed in.");
            return;
        }

        try {
            const details = await getHeroDetails(id, session);
            setHeroDetails(details);
            setModalVisible(true);
        } catch (error) {
            console.error("Error fetching hero details:", error);
            Alert.alert("Error", "Failed to fetch hero details.");
        }
    };

    useEffect(() => {
        if (!session) {
            console.log("User is not signed in");
            return;
        }
        const unsubscribe = listenToQuests(id, session, (q) => {
            console.log("Quests fetched:", q);
            setQuests(q);
        });

        return () => unsubscribe;
    }, [session]);

    const renderQuest = ({ item }: { item: Quest }) => {
        const handleCompleteQuest = async () => {
            if (!session) {
                Alert.alert("Error", "User is not signed in.");
                return;
            }

            try {
                await completeQuest(id, item.id, session);
                Alert.alert("Success", `Quest "${item.name}" completed.`);
            } catch (error) {
                Alert.alert("Error", "Failed to complete the quest.");
            }
        };

        return (
            <View style={styles.questItem}>
                <View>
                    <Text style={styles.questName}>{item.name}</Text>
                    <View style={styles.rewardContainer}>
                        <Text style={styles.goldReward}>
                            <Ionicons name="server-outline" size={14} color="#FFD700" />
                            {item.goldReward} gp
                        </Text>
                        <Text style={styles.timeReward}>
                            <Ionicons name="time" size={14} />
                            {item.timeReward} mins
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.completeButton} onPress={handleCompleteQuest}>
                    <Text style={styles.completeButtonText}>✔️</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} activeOpacity={0.6} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Hero</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={fetchHeroDetails} style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>{name}</Text>
            </TouchableOpacity>
            <FlatList
                data={quests}
                renderItem={renderQuest}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.noQuests}>No quests available.</Text>}
            />
            <NewQuestModal heroId={id} />

            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {heroDetails ? (
                            <>
                                <Text style={styles.modalTitle}>Hero Details</Text>
                                <Text>Name: {heroDetails.name}</Text>
                                <Text>Level: {heroDetails.level}</Text>
                                <Text>Gold: {heroDetails.gold}</Text>
                                <Text>Minutes of Screentime: {heroDetails.screentime}</Text>
                                <Text>Completed Quests: {heroDetails.completedQuests}</Text>
                                <Text>Remaining Quests: {heroDetails.remainingQuests}</Text>
                                <Button title="Close" onPress={() => setModalVisible(false)} />
                            </>
                        ) : (
                            <Text>Loading...</Text>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    heroText: {
        textAlign: "center",
        fontSize: 32,
        fontWeight: "bold",
        margin: 20,
    },
    questItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "#fff",
        marginBottom: 10,
        borderRadius: 5,
    },
    questName: {
        fontSize: 24,
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
    },
    rewardContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    goldReward: {
        fontSize: 14,
        color: "#FFD700",
        fontWeight: "400",
    },
    timeReward: {
        fontSize: 14,
        color: "#888",
        fontWeight: "400",
    },
    noQuests: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    checkbox: {
        margin: 15,
    },
    deleteButtonText: {
        color: "#FF3333"
    },
    deleteButton: {
        alignSelf: "center",
    },
    completeButton: {
        backgroundColor: "#28a745",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    completeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    detailsButton: {
        backgroundColor: "lightgrey",
        padding: 10,
        borderRadius: 5,
        alignSelf: "center",
        marginVertical: 10,
    },
    detailsButtonText: {
        fontWeight: "bold",
        fontSize: 32,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
        width: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
});

