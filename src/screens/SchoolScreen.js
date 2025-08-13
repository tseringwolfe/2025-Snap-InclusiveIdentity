import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Pressable,
    TouchableOpacity,
    Modal,
} from "react-native";
import { Card } from "@rn-vui/base";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../utils/hooks/supabase";

let scores = [];

export default function SchoolScreen({ }) {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedTab, setSelectedTab] = useState("Groups");
    const [addedIds, setAddedIds] = useState([]);
    const [trayVisible, setTrayVisible] = useState(false);

    // Fetch data and set students/currentUser
    const fetchData = async () => {
        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error("Error fetching user: ", userError);
            }
            const { data, error } = await supabase.from("students").select("*");
            if (error) {
                console.error("Error fetching data:", error);
            }
            const currUser = data.filter(student => student.user_id == user.id);
            setCurrentUser(currUser[0]);
            const filteredStudents = data.filter(student => student.user_id !== user.id);
            setStudents(filteredStudents);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    // Calculate interest scores and sort students
    const getSortedStudentsWithScores = () => {
        if (!currentUser.interests || students.length === 0) return [];
        return students
            .map(student => {
                const commonInterests = (student.interests || []).filter(interest =>
                    currentUser.interests.includes(interest)
                );
                return {
                    ...student,
                    interestScore: commonInterests.length,
                    commonInterests,
                };
            })
            .sort((a, b) => b.interestScore - a.interestScore);
    };

    // Helper to get 4 random common interests
    const getRandomCommonInterests = (commonInterests) => {
        if (!commonInterests || commonInterests.length === 0) return [];
        const shuffled = [...commonInterests].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 4);
    };

    const handleAdd = (id) => {
        setAddedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sortedStudents = getSortedStudentsWithScores();
    console.log("Sorted Students:", sortedStudents);
    return (
        <View style={{ flex: 1, position: "relative" }}>
            {/* back button */}

            <View style={styles.backButton}>
                <Button style={{ position: "absolute", top: 10, left: 10 }} onPress={() => navigation.goBack()} title="×" />
            </View>
            <View style={styles.trayButton}>
                <Pressable onPress={() => setTrayVisible(true)} >
                    <Text style={styles.trayButtonText}>...</Text>
                </Pressable>
            </View>

            <View style={{ paddingTop: 50, paddingBottom: 25, alignItems: "center" }}>
                {/* School Photo */}
                <Image
                    source={{ uri: "https://avatars.githubusercontent.com/u/85767261?s=200&v=4" }}
                    style={styles.schoolImage}/>
                <Text>Snap Academies</Text>
                {/* user info */}
                <Text>{currentUser.name} - {currentUser.pronouns} | Class of {currentUser.graduation_year}</Text>
            </View>

            {/* groups/connect tabs */}
            <View style={styles.tabContainer}>
                <View style={styles.tabRow}>
                    {["Groups", "Connect"].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setSelectedTab(tab)}
                            style={styles.tabButton}>
                            <Text
                                style={[
                                    styles.tabText,
                                    selectedTab === tab && styles.activeTabText,
                                ]} > {tab}
                            </Text>
                            {selectedTab === tab && <View style={styles.activeTabLine} />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* navigation for groups and connect */}
            {selectedTab === "Groups" ? (

                // groups tab
                <View style={{ alignItems: "center", paddingTop: 75 }}>
                    <Image source={{ uri: "https://i.postimg.cc/FKCMdj4k/coming-soon.png" }} style={{ width: 350, height: 250 }} />
                </View>
            ) : (

                //connect tab

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.grid}>
                        {sortedStudents.map(student => {
                            const isAdded = addedIds.includes(student.id);
                            const randomCommon = getRandomCommonInterests(student.commonInterests);
                            return (
                                <Pressable
                                    key={student.user_id}
                                    onPress={() => navigation.navigate("Connect", {})}
                                    style={styles.card}
                                >
                                    <Image source={{ uri: student.img_url }} style={styles.studentImage} />
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{student.name}</Text>
                                    <Text style={{ justifyContent: "center", textAlign: "center", fontSize: 11 }}>{student.pronouns}</Text>
                                    {/* Show 4 random common interests */}
                                    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 6 }}>
                                        {randomCommon.map((interest, idx) => (
                                            <View key={idx} style={{ backgroundColor: "#FFD600", borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, margin: 2 }}>
                                                <Text style={{ fontSize: 10, fontFamily: "Avenir" }}>{interest}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <View style={styles.buttonRow}>
                                        <Pressable
                                            style={[
                                                styles.addButton,
                                                isAdded && styles.addedButton
                                            ]}
                                            onPress={() => handleAdd(student.id)}
                                        >
                                            <Text style={[
                                                styles.addButtonText,
                                                isAdded && styles.addedButtonText
                                            ]}>
                                                {isAdded ? "Added✓" : "Add+"}
                                            </Text>
                                        </Pressable>
                                        <Pressable style={styles.meetButton}>
                                            <Text style={styles.meetButtonText}>Meet</Text>
                                        </Pressable>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>

            )}

            <Modal
                visible={trayVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setTrayVisible(false)}
            >
                <View style={styles.trayOverlay}>
                    <View style={styles.trayContent}>
                        <Pressable onPress={() => setTrayVisible(false)}>
                            <Text style={{ fontSize: 18, color: "#888", textAlign: "right" }}>Close</Text>
                        </Pressable>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>Tray Options</Text>
                        <Pressable onPress={() => { navigation.navigate('Identity') }}>
                            <Text style={{ fontSize: 16, marginBottom: 12 }}>Edit Identity</Text>
                        </Pressable>
                        <Pressable onPress={() => { navigation.navigate('Interests') }}>
                            <Text style={{ fontSize: 16, marginBottom: 12 }}>Edit Interests</Text>
                        </Pressable>
                        {/* Add more options as needed */}
                    </View>
                </View>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingBottom: 350, 
        backgroundColor: 'rgba(237, 238, 239, 1)', // matches .background-*
    },
    studentImage: {
        width: 80,
        height: 80,
        borderRadius: 40, // makes it a circle
        marginBottom: 8,
        backgroundColor: '#ccc', // placeholder bg while loading
    },
    schoolImage: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    },
    tabContainer: {
        backgroundColor: "#fff",
        paddingTop: 16,
    },
    tabRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 12,
    },
    tabText: {
        fontSize: 16,
        color: "#999",
        fontWeight: "500",
    },
    activeTabText: {
        color: "#000",
        fontWeight: "600",
    },
    activeTabLine: {
        position: "absolute",
        bottom: 0,
        height: 2,
        width: 40,
        backgroundColor: "#000",
        borderRadius: 1,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start", // keeps first card in each row left-aligned
        width: "100%",
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 6,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 3,
        paddingVertical: 20,
        paddingHorizontal: 10,
        margin: 5,
        width: "30%", // about 3 cards per row
        aspectRatio: 0.75, // keeps them proportional
        alignItems: "center",
    },
    nameText: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 12,
        color: 'rgba(44, 49, 55, 1)', // matches .text-49 / .text-70
    },
    pronounsText: {
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        fontSize: 9,
        color: 'rgba(100, 101, 103, 1)', // matches .text-16 / .text-67
    },
    button: {
        backgroundColor: 'rgba(255, 252, 0, 1)', // .view-profile-button
        borderRadius: 15,
        paddingVertical: 7,
        paddingHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 4.7,
        elevation: 3,
    },
    buttonText: {
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 7,
        letterSpacing: 0.34,
        color: '#000',
        textTransform: 'uppercase',
    },
    backButton: {
        position: "absolute",
        top: 40,     // Adjust for safe area / status bar
        left: 16,
        zIndex: 10,  // Keep it on top of other elements
    },
    buttonRow: {
        flexDirection: "row",
        marginTop: 8,
        gap: 6,
    },
    addButton: {
        flex: 1,
        backgroundColor: "rgba(255, 252, 0, 1)", // yellow
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#DBDBDB",
        alignItems: "center",
    },
    addButtonText: {
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 10,
        color: '#000',
        textTransform: 'uppercase',
    },
    addedButton: {
        backgroundColor: "#ccc", // gray when added
    },
    addedButtonText: {
        color: "#555",
    },
    meetButton: {
        flex: 1,
        backgroundColor: "rgba(90, 80, 255, 1)", // bluish-purple
        paddingVertical: 6,
        borderRadius: 15,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DBDBDB",
    },
    meetButtonText: {
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 10,
        color: '#fff',
        textTransform: 'uppercase',
    },
    trayButton: {
        top:40,
        right: 16,
        width: 30,
        zIndex: 10,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        position: "absolute",
    },
    trayButtonText: {
        fontFamily: 'Avenir Next',
        fontWeight: '700',
        fontSize: 10,
        color: '#000',
        textTransform: 'uppercase',
    },
    trayOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    trayContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
    },
})