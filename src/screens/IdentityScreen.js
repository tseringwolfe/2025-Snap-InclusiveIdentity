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
<<<<<<< HEAD
} from "react-native";

import { supabase } from "../utils/hooks/supabase";

export default function IdentityScreen({ }) {
    const navigation = useNavigation();
=======
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





>>>>>>> a68ecc4 (added button groups and state vars to identity screen)

    return (
        <>
            <View style={styles.container}>
<<<<<<< HEAD
                <Text>Pronouns, Ethnicity, Sexual Orientation, Gender Expression</Text>
=======
                <Button
                    onPress={() => {
                        navigation.navigate("Interests", {});
                    }}
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

>>>>>>> a68ecc4 (added button groups and state vars to identity screen)
                <Pressable>
                    <Button
                        onPress={() => {
                            navigation.navigate("Interests", {});
                        }}
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
<<<<<<< HEAD
        paddingTop: 100,
        alignItems: 'center',
    },
=======
        paddingTop: 50,
        alignItems: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
>>>>>>> a68ecc4 (added button groups and state vars to identity screen)
})