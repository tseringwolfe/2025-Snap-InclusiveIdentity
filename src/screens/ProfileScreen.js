import { Image, Text, View, Button, StyleSheet, Pressable } from "react-native";
import { supabase } from "../utils/hooks/supabase";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

  //ADDED state var for profile picture
  const [profilePicUrl, setProfilePicUrl] = useState("https://postimg.cc/9rDHcRX9");

  useEffect(() => {
    //updated useEffect from Header
    async function fetchProfilePic() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .select("avatar_url, school")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.log("Profile fetch failure");
        console.log("School status: " + inSchool + "school name: " + data.school)
      } else if (data) {
        if (data.avatar_url) setProfilePicUrl(data.avatar_url);
        console.log("School field value:", data.school); // Debug line
        setInSchool(!!data.school); // true if school is set
      }
    }

    async function fetchSchoolData() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .select("user_id");
      const userIDS = data.map((user) => user.user_id);

      if (userIDS.includes(user.id)) {
        setInSchool(true);
      } else {
        setInSchool(false);
      }

      if (error) {
        console.error("Error fetching data: ", data);
      }
    }

    fetchProfilePic();
    fetchSchoolData();

  }, [user]);

  const handleSchoolPress = () => {
    if (inSchool === true) {
      navigation.navigate("School");
    } else {
      navigation.navigate("FindYourSchool");
    }
  }


  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={{ uri: profilePicUrl }}
        style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
      />
      <Text
        style={{
          justifyContents: "center",
          textAlign: "center",
        }}
      >
        {user &&
          user.user_metadata &&
          user.user_metadata.email.slice(
            0,
            user.user_metadata.email.indexOf("@"), // gets part before @ of email address, should use profile username instead
          )}
      </Text>
      <Pressable>
        <Button
          onPress={handleSchoolPress}
          title="School"
        />
      </Pressable>

      <Pressable>
        <Button
          onPress={() => {
            navigation.navigate("Settings", {});
          }}
          title="Settings"
        />
      </Pressable>

      <Button onPress={handleSignOut} title="Log Out" />
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