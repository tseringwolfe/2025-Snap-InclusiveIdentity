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

                    <ScrollView>
                        <View style={styles.container}>
                            {students.map((student) => (
                                <Pressable style={{ color: "black" }} key={student.user_id} onPress={() => {
                                    navigation.navigate("", {});
                                }}>
                                    <Card>
                                        <Card.Title>{student.name}</Card.Title>
                                        <Card.Divider />
                                        {/* <Image
                                            source={{ uri: school.schoolLogo }}
                                            style={styles.schoolLogo}
                                        /> */}

                                        <Text>{student.pronouns}</Text>
                                    </Card>
                                </Pressable>

                            ))}
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
        paddingTop: 100,
        alignItems: 'center',
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
})