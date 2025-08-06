import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Pressable
} from "react-native";

import { supabase } from "../utils/hooks/supabase";

export default function EnterEmailScreen({ }) {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.container}>
                <Text>Use student email</Text>
                <Pressable>
                    <Button
                        onPress={() => {
<<<<<<< HEAD
                            navigation.navigate("NameAndGrad", {});
=======
                            navigation.navigate("Identity", {});
>>>>>>> a68ecc4 (added button groups and state vars to identity screen)
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