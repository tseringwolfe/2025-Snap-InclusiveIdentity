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

  //ADDED state var for profile picture
  const [profilePicUrl, setProfilePicUrl] = useState(
<<<<<<< HEAD
    "https://media.discordapp.net/attachments/979916344868872245/1401990490106101852/image.png?ex=689248e4&is=6890f764&hm=4002507880973412d011687c0057f983857e9cd1e565ab928cca7c687e2056ae&=&format=webp&quality=lossless&width=1408&height=1408",
=======
    "file:///Users/twolfe/Desktop/danny%20bitmojis/dannyCoffee.png",
>>>>>>> a68ecc4 (added button groups and state vars to identity screen)
  );

  useEffect(() => {
    //updated useEffect from Header
    async function fetchProfilePic() {
      if (user === null) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log("Profile pic fetch failure");
      } else if (data.avatar_url) {
        setProfilePicUrl(data.avatar_url);
      }
    }

    fetchProfilePic();

    setAstrology(userSign.sign);
  }, [user]);

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
          onPress={() => {
            navigation.navigate("FindYourSchool", {});
          }}
          title="Join School+"
        />
      </Pressable>
<<<<<<< HEAD
      <Button onPress={handleSignOut} title="Log Out" />
=======
>>>>>>> a68ecc4 (added button groups and state vars to identity screen)
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
