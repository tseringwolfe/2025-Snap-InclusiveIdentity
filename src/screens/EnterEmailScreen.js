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
    TextInput
} from "react-native";

import { supabase } from "../utils/hooks/supabase";

export default function EnterEmailScreen({ }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleNext = () => {
        const eduRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
        if (!eduRegex.test(email)) {
            setError('Please enter a valid .edu email address');
            return;
        }
        setError('');
        navigation.navigate("Identity", {});
    };

    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1, width: 250, marginBottom: 20, paddingHorizontal: 10  }}
                    placeholder="Enter your student email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    marginBottom={20}
                />
                {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
                <Pressable>
                    <Button
                        onPress={handleNext}
                        title="Next"
                    />
                </Pressable>
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
})