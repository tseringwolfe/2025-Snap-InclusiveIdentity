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

export default function IdentityScreen({ }) {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Text>Pronouns, Ethnicity, Sexual Orientation, Gender Expression</Text>
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
        paddingTop: 100,
        alignItems: 'center',
    },
})