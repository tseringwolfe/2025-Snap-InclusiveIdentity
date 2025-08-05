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
} from "react-native";

import { supabase } from "../utils/hooks/supabase";

export default function InterestsScreen({ }) {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Text>Academics, Food, Music, Art & Design, Gaming</Text>
                <Pressable>
                    <Button
                        onPress={() => {
                            navigation.navigate("School", {});
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
        paddingTop: 100,
        alignItems: 'center',
    },
})