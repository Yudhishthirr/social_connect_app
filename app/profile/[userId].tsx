import LoadUserProfile from "@/components/profile/LoadUserProfile";
import { useAuth, useUserById } from "@/hooks/useAuth";
import { RootState } from "@/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { userId }:any = useLocalSearchParams();

  let isCurrentUser = false
  if(user._id == userId) isCurrentUser = true;
 
  
  const { logoutUserhook } = useAuth();

 

  const { data, isLoading, isError } = useUserById(userId);
 
  console.log("this user data");
  console.log(data);
  const profile = data?.data;

  function logoutCurrentUser() {
    logoutUserhook();
    router.push("/(auth)/login");
  }

  useEffect(() => {
    if (!user) router.replace("/(auth)/login");
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.usernameWrapper}>
          <Text style={styles.username}>{profile?.username}</Text>
          <Ionicons name="chevron-down" size={16} color="#262626" />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Feather name="plus-square" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity onPress={logoutCurrentUser}>
            <Feather
              name="menu"
              size={24}
              color="#262626"
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <LoadUserProfile
        profile={profile}
        isCurrentUser={isCurrentUser}
        CurrentUserId={user._id}
        onEditProfile={() => {
          // Navigate to edit profile screen
          console.log("Edit profile");
        }}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  usernameWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  username: {
    fontSize: 18,
    fontWeight: "600",
    color: "#262626",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIcon: {
    marginLeft: 4,
  },
});