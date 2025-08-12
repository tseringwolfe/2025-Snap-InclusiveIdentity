import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card } from "@rn-vui/base";
import {
    View,
    Text,
    Image,
    Button,
    StyleSheet,
    Pressable,
    TextInput,
    ScrollView
} from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication";

// This is a mock list of schools. In a real application, data would be fetched from a database or API.
let SchoolList = [
    {
        schoolname: "Snap Academies",
        alternativeName: "Snap U",
        schoolID: "1",
        schoolAddress: "2850 Ocean Park Blvd, Santa Monica, CA 90405",
        schoolLogo: "https://media.npr.org/assets/img/2016/03/16/snapchat-school_custom-87ba860693901f4f6f8f3d3ebd7b3cd91308e1c1.jpg?s=1100&c=50&f=jpeg",
    },
    {
        schoolname: "Santa Monica College",
        alternativeName: "SMC",
        schoolID: "2",
        schoolAddress: "1900 Pico Blvd, Santa Monica, CA 90405",
        schoolLogo: "https://admin.smc.edu/administration/marketing/images/SMClogoRxblue10.png",

    },
    {
        schoolname: "El Camino College",
        alternativeName: "ECC",
        schoolID: "3",
        schoolAddress: "16007 Crenshaw Blvd, Torrance, CA 90506",
        schoolLogo: "https://static.wixstatic.com/media/b8c0dc_cc91c6c304df44d88961a008f909f456~mv2.png/v1/fill/w_560,h_318,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Image-empty-state.png",
    },
    {
        schoolname: "Citrus College",
        alternativeName: "CC",
        schoolID: "4",
        schoolAddress: "1000 W Foothill Blvd, Glendora, CA 91741",
        schoolLogo: "https://californiarevealed.org/sites/default/files/styles/partner_logo/public/cazc.png?itok=g4nBDvo_",
    },
    {
        schoolname: "Pasadena City College",
        alternativeName: "PCC",
        schoolID: "5",
        schoolAddress: "1570 E Colorado Blvd, Pasadena, CA 91106",
        schoolLogo: "https://pasadena.edu/strategic-communications-and-marketing/guides-and-reference/brand/visual-style-guide/images/pcclogo.png",
    }

];

export default function FindSchoolScreen({ }) {
    const navigation = useNavigation();
    const { user } = useAuthentication(); 

    const handleSchoolSelect = async (school) => {
        if (!user) return;


        const { error } = await supabase
            .from("students") 
            .update({ school: school.schoolname })
            .eq("user_id", user.id); 

        if (error) {
            console.log("Error saving school:", error.message);
            return;
        }
        navigation.replace("EnterYourEmail", { school: school.schoolname });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={{ id: "outlined" }}
                placeholder="Search for your school"
                marginBottom={20}
            />
            <Text style={{ fontSize: 15, fontFamily: "Avenir" }}>
                Plase select the college you attend
            </Text>
            <ScrollView>
                <View style={styles.container}>
                    {SchoolList.map((school) => (
                        <Pressable key={school.schoolID} onPress={() => handleSchoolSelect(school)}>
                            <Card containerStyle={styles.Card}>
                                <View style={{ alignItems: "center" }}>

                                    <Card.Title>{school.schoolname}</Card.Title>
                                    <Card.Divider />
                                    <Image
                                        source={{ uri: school.schoolLogo }}
                                        style={styles.schoolLogo}
                                    />
                                    <Text style={{ textAlign: "center", fontFamily: "Avenir" }}>{school.schoolAddress}</Text>
                                </View>
                            </Card>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
            <Pressable>
                <Button
                    onPress={() => {
                        navigation.navigate("EnterYourEmail", { school:schoolname});
                    }}
                    title="Next"
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        alignItems: 'center',
    },
    schoolLogo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    mapIcon: {
        width: 24,
        height: 24,

    },
    Card: {
        width: 350,
        height: 220,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
    }
});