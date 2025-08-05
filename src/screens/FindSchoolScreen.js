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

export default function FindSchoolScreen({ }) {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Text>Find Your School</Text>
                <Pressable>
                    <Button
                        onPress={() => {
                            navigation.navigate("EnterYourEmail", {});
                        }}
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