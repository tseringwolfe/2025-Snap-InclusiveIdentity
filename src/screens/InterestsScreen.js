import React, { useEffect } from "react";
import { useState } from "react";
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

const interests = [
  { label: 'Academics', 
    item: ['Mathematics', "Science", "History", "Literature", "Languages", "Philosophy", "Political Science" ]},
  { label: 'Food', 
    item: ['Boba', 'Matcha', 'Kbbq'] },
  { label: 'Music', 
    item: ['Rina Sawayama', 'Allie X', 'Chappel Roan', 'KATSEYE', ] },
  { label: 'Art & Design', 
    item: ["Painting", "Sculpture", "Graphic Design", "Photography", "Fashion Design", "Interior Design", "Ceramics"] },
  { label: 'Gaming', 
    item: ['Valorant', 'League of Legends', 'Overwatch', 'CSGO', 'Fortnite', 'Minecraft', 'Sonic Adventure 2'] },
];

export default function InterestsScreen({ }) {
  const navigation = useNavigation();
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

  return (
  <ScrollView contentContainerStyle={styles.container}>
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
          onPress={() => navigation.navigate("School", {})}
          title="Continue"
        />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
    paddingBottom: 40,
  },
  categoryContainer: {
    marginBottom: 20,
    width: 250,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
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
    backgroundColor: "#841584",
  },
})