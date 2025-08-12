import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { Container } from "@rn-vui/base";

export default function EnterEmailScreen({ }) {
    const navigation = useNavigation();
    const route = useRoute();
    const school = route.params?.school || ""; // <-- Add this line
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuthentication(); 

    const handleNext = () => {
        const eduRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
        if (!eduRegex.test(email)) {
            setError('Please enter a valid .edu email address');
            return;
        }
        setError('');
        navigation.replace("Identity", {});
    };


    return (
        <>
        <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, textAlign: 'center', fontFamily: "Avenir" }}>
                Join the {school} Community
            </Text>
        </View>
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderColor: "gray", borderWidth: 1, width: 250, marginBottom: 20, paddingHorizontal: 10 }}
                    placeholder="Enter your student email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    marginBottom={20}
                />
                {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
                <Pressable onPress={handleNext} style={styles.ovalButton}>
                    <Text style={styles.ovalButtonText}>Verify</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Identity")} style={styles.ovalButton1}>
                    <Text style={styles.ovalButtonText}>Verify Later</Text>
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
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
        marginTop: 20,
        width: 275,
    },
    ovalButtonText: {
        color: '#fff',
        fontSize: 25,
        fontFamily: "Avenir",
    },
})