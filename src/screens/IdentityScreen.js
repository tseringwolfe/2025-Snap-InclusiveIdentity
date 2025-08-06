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

const pronouns = [
    'she/her', 'he/him', 'they/them', 'she/they', 'he/they', 'ze/zir', 'xe/xem', 'ask for pronouns'
];

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

    async function addUserDataToTable(tableName, data) {
        const { error } = await supabase
            .from(tableName)
            .insert(data);
        console.log("inserting data");
        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully!');
        }
    }

    const handlePress = () => {
        console.log("in handle press");
        addUserDataToTable('students', {
            name: preferredName,
            pronouns: pronouns[pronounIndex],
            ethnicity: ethnicities[ethnicityIndex],
            graduation_year: gradYear,
            gender_expression: genders[genderIndex],
            sexual_orientation: sexualities[sexualityIndex],
        });

        navigation.navigate("Interests", {});
    };


    return (
        <>
            <View style={styles.container}>
                <Button
                    onPress={handlePress}
                    title="Skip"
                />

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