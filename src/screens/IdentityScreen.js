import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView
} from "react-native";

import { supabase } from "../utils/hooks/supabase";
import { ButtonGroup } from "@rn-vui/base";
import { useAuthentication } from "../utils/hooks/useAuthentication";

const pronouns = ['she/her', 'he/him', 'they/them', 'she/they', 'he/they', 'ze/zir', 'xe/xem', 'ask for pronouns'];

const ethnicities = ['black/african diaspora', 'latinx/hispanic', 'east asian', 'south east asian', 'south asian', 'pacific islander', 'middle eastern', 'white/european descent', 'indigenous', 'two or more races', 'other'];

const sexualities = ['straight', 'gay', 'lesbian', 'bisexual', 'pansexual', 'queer', 'asexual', 'questioning/other'];
const genders = ['cisgender', 'transgender', 'non-binary', 'agender', 'questioning/other'];

export default function IdentityScreen() {
    const navigation = useNavigation();
    const [pronounIndex, setPronounIndex] = useState(0);
    const [ethnicityIndex, setEthnicityIndex] = useState(0);
    const [sexualityIndex, setSexualityIndex] = useState(0);
    const [genderIndex, setGenderIndex] = useState(0);
    const [preferredName, setPreferredName] = useState('');
    const [gradYear, setGradYear] = useState('');
    const { user } = useAuthentication();
    const [profilePicUrl, setProfilePicUrl] = useState("https://postimg.cc/9rDHcRX9");


    async function fetchProfilePic() {
        if (user === null) {
            return;
        }

        const { data, error } = await supabase
            .from("profiles")
            .select("avatar_url")
            .eq("id", user.id)
            .single();

        if (error) {
            console.log("Profile pic fetch failure");
        } else if (data.avatar_url) {
            setProfilePicUrl(data.avatar_url);
        }
    }

    useEffect(() => {
        fetchProfilePic();
    }, [user]);

    const handlePress = async () => {
        if (user === null) {
            return;
        }

        // Prepare data
        const data = {
            user_id: user.id, // Unique user ID from auth
            name: preferredName,
            pronouns: pronouns[pronounIndex],
            ethnicity: ethnicities[ethnicityIndex],
            graduation_year: gradYear,
            gender_expression: genders[genderIndex],
            sexual_orientation: sexualities[sexualityIndex],
            img_url: profilePicUrl,
        };

        // Upsert into students table
        const { error } = await supabase
            .from('students')
            .upsert(data, { onConflict: 'user_id' });
        // onConflict tells Supabase which unique column to check

        if (error) {
            console.error("Error saving data:", error.message);
        } else {
            console.log("Data saved successfully!");
            navigation.replace("Interests");
        }


    };


    return (
        <>
        <ScrollView style={{marginBottom: 100}}>
            <View style={styles.container}>
                <Pressable
                    onPress={handlePress}
                    style={styles.ovalButton1}
                >
                    <Text style={styles.ovalButtonText1}>Skip</Text>
                </Pressable>

                <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: "Avenir", paddingTop: 20 }}>Enter Preferred Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPreferredName}
                    value={preferredName}
                    placeholder="Preferred Name"
                    keyboardType="default"
                />

                <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: "Avenir", paddingTop: 10 }}>Enter Graduation Year: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setGradYear}
                    value={gradYear}
                    placeholder="Graduation Year"
                    keyboardType="numeric"
                />


                <Text style={{fontFamily: "Avenir", fontWeight: "bold", paddingTop: 30}}>Pronouns</Text>
                <View style={styles.pillGroup}>
                {pronouns.map((item, idx) => (
                    <Pressable
                    key={item}
                    onPress={() => setPronounIndex(idx)}
                    style={[
                        styles.pill,
                        pronounIndex === idx && styles.pillSelected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.pillText,
                        pronounIndex === idx && styles.pillTextSelected,
                        ]}
                    >
                        {item}
                    </Text>
                    </Pressable>
                ))}
                </View>

                <Text style={{fontFamily: "Avenir", fontWeight: "bold"}}>Ethnicity</Text>
                <View style={styles.pillGroup}>
                {ethnicities.map((item, idx) => (
                    <Pressable
                    key={item}
                    onPress={() => setEthnicityIndex(idx)}
                    style={[
                        styles.pill,
                        ethnicityIndex === idx && styles.pillSelected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.pillText,
                        ethnicityIndex === idx && styles.pillTextSelected,
                        ]}
                    >
                        {item}
                    </Text>
                    </Pressable>
                ))}
                </View>

                <Text style={{fontFamily: "Avenir", fontWeight: "bold"}}>Sexual Orientation</Text>
                <View style={styles.pillGroup}>
                {sexualities.map((item, idx) => (
                    <Pressable
                    key={item}
                    onPress={() => setSexualityIndex(idx)}
                    style={[
                        styles.pill,
                        sexualityIndex === idx && styles.pillSelected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.pillText,
                        sexualityIndex === idx && styles.pillTextSelected,
                        ]}
                    >
                        {item}
                    </Text>
                    </Pressable>
                ))}
                </View>

                <Text style={{fontFamily: "Avenir", fontWeight: "bold"}}>Gender Expression</Text>
                <View style={styles.pillGroup}>
                {genders.map((item, idx) => (
                    <Pressable
                    key={item}
                    onPress={() => setGenderExpressionIndex(idx)}
                    style={[
                        styles.pill,
                        genderIndex === idx && styles.pillSelected,
                    ]}
                    >
                    <Text
                        style={[
                        styles.pillText,
                        genderIndex === idx && styles.pillTextSelected,
                        ]}
                    >
                        {item}
                    </Text>
                    </Pressable>
                ))}
                </View>

                <Pressable
                    style={styles.ovalButton}
                    onPress={handlePress}
                >
                    <Text style={styles.ovalButtonText}>Continue</Text>
                </Pressable>
            </View>
        </ScrollView>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
        paddingBottom: 10,
    },
    pillGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    pill: {
        borderRadius: 20,
        backgroundColor: "#eee",
        margin: 4,
        paddingHorizontal: 16,
        paddingVertical: 8,
        minWidth: 0,
        flexShrink: 1,
    },
    pillSelected: {
        backgroundColor: "#FFD600",
    },
    pillText: {
        color: "#333",
        fontSize: 14,
        fontFamily: "Avenir",
    },
    pillTextSelected: {
        color: "#000",
        fontWeight: "bold",
    },
    ovalButton: {
        backgroundColor: '#007AFF',
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
        width: 275,
    },
    ovalButton1: {
        backgroundColor: '#f5ba5aff',
        borderRadius: 60,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
        width: 100,
    },
    ovalButtonText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: "Avenir",
    },
    ovalButtonText1: {
        color: '#fff',
        fontSize: 15,
        fontFamily: "Avenir",
    },
})