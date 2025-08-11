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

export default function SchoolScreen({ }) {
    const navigation = useNavigation();
    const [students, setStudents] = useState([]);

    const fetchData = async () => {
        try {
            const { data, error } = await supabase.from("students").select("*");
            if (error) {
                console.error("Error fetching data:", error);
            } else {
                setStudents(data);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    console.log(students);

    const studentNames = students.map(student => student.name);

    return (
        <>
            <View style={styles.container}>
                <Text>School Page</Text>
                <Text>Student names:</Text>
                {studentNames.map((name, index) => (
                    <Text key={index}>
                        {name}
                    </Text>
                ))}
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