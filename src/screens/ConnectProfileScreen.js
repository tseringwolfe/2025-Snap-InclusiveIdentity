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

export default function ConnectProfileScreen({ }) {
    const navigation = useNavigation();


    return (
        <>
            <View style={styles.container}>
                <Text>TEMP CONNECT PROF SCREEN</Text>
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