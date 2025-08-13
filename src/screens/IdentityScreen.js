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
    const [profilePicUrl, setProfilePicUrl] = useState("https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-snapchat-2019-square2-512.png");


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
            <View style={styles.container}>
                {/* <Button
                    onPress={handlePress}
                    title="Skip"
                /> */}

                <Text>Enter Preferred Name: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPreferredName}
                    value={preferredName}
                    placeholder="Preferred Name"
                    keyboardType="numeric"
                />

                <Text>Enter Graduation Year: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setGradYear}
                    value={gradYear}
                    placeholder="Graduation Year"
                    keyboardType="numeric"
                />


                <Text>Pronouns</Text>
                <ButtonGroup
                    buttons={pronouns}
                    selectedIndex={pronounIndex}
                    onPress={(value) => {
                        setPronounIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />

                <Text>Ethnicity</Text>
                <ButtonGroup
                    buttons={ethnicities}
                    selectedIndex={ethnicityIndex}
                    onPress={(value) => {
                        setEthnicityIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />

                <Text>Sexual Orientation</Text>
                <ButtonGroup
                    buttons={sexualities}
                    selectedIndex={sexualityIndex}
                    onPress={(value) => {
                        setSexualityIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />

                <Text>Gender Expression</Text>
                <ButtonGroup
                    buttons={genders}
                    selectedIndex={genderIndex}
                    onPress={(value) => {
                        setGenderIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />

                <Pressable>
                    <Button
                        onPress={handlePress}
                        title="Continue"
                    />
                </Pressable>
            </View>
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
    },
})