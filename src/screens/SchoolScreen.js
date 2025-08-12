import React, { useEffect } from "react";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { Card } from "@rn-vui/base";
import { useNavigation } from "@react-navigation/native";

import { supabase } from "../utils/hooks/supabase";

export default function SchoolScreen({ }) {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedTab, setSelectedTab] = useState("Groups");
    const [addedIds, setAddedIds] = useState([]); // array of IDs for added students

    const handleAdd = (id) => {
        setAddedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const fetchData = async () => {
        try {
            //get current user
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) {
                console.error("Error fetching user: ", userError);
            }

            //fetch all students
            const { data, error } = await supabase.from("students").select("*");
            if (error) {
                console.error("Error fetching data:", error);
            }
            const currUser = data.filter(student => student.user_id == user.id);
            setCurrentUser(currUser[0]);

            //filter out curr user
            const filteredStudents = data.filter(student => student.user_id !== user.id);

            setStudents(filteredStudents);

        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <View style={{ flex: 1, position: "relative" }}>
                {/* back button */}

                <View style={styles.backButton}>
                    <Button onPress={() => navigation.goBack()} title="×" />
                </View>

                <View style={{ paddingTop: 50, paddingBottom: 25, alignItems: "center" }}>

                    {/* School Photo */}
                    <Image
                        source={{ uri: "https://avatars.githubusercontent.com/u/85767261?s=200&v=4" }}
                        style={styles.schoolImage}
                    />
                    <Text>Snap Academies</Text>

                    {/* user info */}
                    <Text>{currentUser.name} - {currentUser.pronouns} | Class of {currentUser.graduation_year}</Text>

                </View>

                {/* groups/connect tabs */}
                <View style={styles.tabContainer}>
                    <View style={styles.tabRow}>
                        {["Groups", "Connect"].map((tab) => {
                            return (
                                <TouchableOpacity
                                    key={tab}
                                    onPress={() => setSelectedTab(tab)}
                                    style={styles.tabButton}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            selectedTab === tab && styles.activeTabText,
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                    {selectedTab === tab && <View style={styles.activeTabLine} />}
                                </TouchableOpacity>
                            )
                        }
                        )}
                    </View>
                </View>

                {/* navigation for groups and connect */}
                {selectedTab === "Groups" ? (

                    // groups tab
                    <View style={{ alignItems: "center", paddingTop: 75 }}>
                        <Text>COMING SOON!</Text>

                    </View>
                ) : (

                    //connect tab

                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.grid}>
                            {students.map(student => {
                                const isAdded = addedIds.includes(student.id);
                                return (
                                    <Pressable
                                        key={student.user_id}
                                        onPress={() => navigation.navigate("Connect", {})}
                                        style={styles.card}
                                    >
                                        <Image source={{ uri: student.img_url }} style={styles.studentImage} />
                                        <Text>{student.name}</Text>
                                        <Text>{student.pronouns}</Text>

                                        {/* add and meet buttons */}

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

                                            <Pressable
                                                style={styles.meetButton}
                                            // onPress={}
                                            >
                                                <Text style={styles.meetButtonText}>Meet</Text>
                                            </Pressable>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </ScrollView>

                )}

            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        alignItems: 'center',
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
})