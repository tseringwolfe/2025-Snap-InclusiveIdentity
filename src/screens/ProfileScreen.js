import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { findAstrologySign } from "../utils/hooks/findAstrologySign";
import { useAuthentication } from "../utils/hooks/useAuthentication";


const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      // Handle successful sign out (e.g., redirect to login screen)
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuthentication();
  const [astrology, setAstrology] = useState("Pisces");
  const userSign = findAstrologySign();
  const [profilePicUrl, setProfilePicUrl] = useState("https://postimg.cc/9rDHcRX9");
  const [inSchool, setInSchool] = useState(false);

  useEffect(() => {
    async function fetchProfilePic() {
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, school")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Profile pic fetch failure");
      } else if (data) {
        if (data.avatar_url) setProfilePicUrl(data.avatar_url);
        console.log("School field value:", data.school); // Debug line
        setInSchool(!!data.school); // true if school is set
      }
    }

    fetchProfilePic();
    setAstrology(userSign.sign);
  }, [user]);

  const handleSchoolButton = async () => {
    if (inSchool) {
      navigation.navigate("School");
    } else {
      if (!user) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (data && data.id) {
        navigation.navigate("School");
      } else {
        navigation.navigate("FindYourSchool", {});
      }
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: profilePicUrl }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Text style={{ justifyContents: "center", textAlign: "center" }}>
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@"),
          )}
      </Text>
      
      <Button
        onPress={() => {
          navigation.navigate("Astrology");
        }}
        title={astrology}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Pressable>
        <Button
          onPress={handleSchoolButton}
          title={inSchool ? "School Page" : "Join School+"}
        />
      </Pressable>

      <Button onPress={handleSignOut} title="Log Out" />

      <Pressable>
        <Button
          onPress={() => {
            navigation.navigate("Settings", {});
          }}
          title="Settings"
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    alignItems: "center",
  },
});
