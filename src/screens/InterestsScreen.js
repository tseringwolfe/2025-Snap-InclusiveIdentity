import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MultiSelect } from "react-native-element-dropdown";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { supabase } from "../utils/hooks/supabase";
import { useAuthentication } from "../utils/hooks/useAuthentication"; // If you have a user context

const interests = [

  { label: 'Academics', 
    item: ['Mathematics', "Science", "History", "Literature", "Languages", "Philosophy", "Political Science", "Computer Science" ]},
  { label: 'Food', 
    item: ["Italian","French","Spanish","Mexican","Tex-Mex","American (Traditional)","Southern / Soul Food","Cajun / Creole","Caribbean","Brazilian","Middle Eastern","Mediterranean","Greek","Indian","Pakistani","Thai","Vietnamese","Chinese","Japanese","Korean","African (General)","Ethiopian","Moroccan","Fusion","Street Food"] },
  { label: 'Music', 
    item: ["Pop", "Rock", "Alternative Rock", "Punk", "Indie Rock", "Jazz", "Blues", "Classical",  "Opera", "Hip-Hop", "Rap", "R&B",  "Soul",  "Country",  "Bluegrass",  "Reggae",  "Metal",  "EDM",  "House",  "Techno",  "Trance", "Lo-fi",  "Ambient",  "Experimental"] },
  { label: 'Art & Design', 
    item: ["Painting", "Sculpture", "Graphic Design", "Photography", "Fashion Design", "Interior Design", "Ceramics"] },
  { label: 'Gaming', 
    item: ["Action","Adventure","Role-Playing Game (RPG)","Action RPG","Strategy","Real-Time Strategy (RTS)","Turn-Based Strategy","Simulation","Life Simulation","Sports","Racing","Platformer","Puzzle","Fighting","Shooter (FPS)","Shooter (TPS)","Stealth","Survival","Horror","Metroidvania","Roguelike","Sandbox / Open World","MMO (Massively Multiplayer Online)","Battle Royale","Rhythm / Music"] },

];

export default function InterestsScreen({ }) {
  const navigation = useNavigation();
  const { user } = useAuthentication(); // Get current user
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);

  const toggleCategory = (category) => {
    setExpanded((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleContinue = async () => {
    if (!user) return;
    // Save selected interests to Supabase
    const { error } = await supabase
      .from("students")
      .update({ interests: selected })
      .eq("user_id", user.id);

    if (error) {
      console.log("Error saving interests:", error.message);
      // Optionally show an error message
      return;
    }
    navigation.replace("School", {});
  };

  return (
    <ScrollView contentContainerStyle={{ ...styles.container, marginTop: 50 }}>
      {interests.map(({ label, item }) => (
        <View key={label} style={styles.categoryContainer}>
          <TouchableOpacity onPress={() => toggleCategory(label)}>
            <Text style={styles.categoryTitle}>
              {label} {expanded[label] ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>
          {expanded[label] && (
            <View style={styles.pillsContainer}>
              {item.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.pill,
                    selected.includes(interest) && styles.pillSelected,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text
                    style={{
                      color: selected.includes(interest) ? "#fff" : "#333",
                    }}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
      <Pressable style={{ marginTop: 30 }}>
        <Button
          onPress={handleContinue}
          title="Continue"
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    iphone1616: {
        flex: 1,
        backgroundColor: "#fff"
    },
    container: {
        paddingTop: 60,
        alignItems: "center",
        paddingBottom: 40,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000",
    },
    subHeader: {
        fontSize: 18,
        color: "#000",
        marginBottom: 4,
        textAlign: "center",
    },
    subHeaderSmall: {
        fontSize: 14,
        color: "#16191c",
        marginBottom: 20,
        textAlign: "center",
    },
    categoryContainer: {
        marginBottom: 20,
        width: 340,
        borderRadius: 8,
        backgroundColor: "#fff",
        shadowOpacity: 0.14,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "rgba(0, 0, 0, 0.14)",
        elevation: 14,
        padding: 10,
    },
    categoryHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    pillsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    pill: {
        borderRadius: 20,
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
    },
    pillSelected: {
        backgroundColor: "#0fadff",
    },
    buttonContainer: {
        marginTop: 30,
        width: 340,
    },
    skipContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    skip: {
        fontSize: 16,
        color: "#9a9b9d",
        fontWeight: "500",
    },
});