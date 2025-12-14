import LoadUserProfile from "@/components/profile/LoadUserProfile";
import { useUserById } from "@/hooks/useAuth";
import { useFollowUser } from "@/hooks/useFollow";
import { RootState } from "@/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";


const ProfileScreen = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { userId }:any = useLocalSearchParams();

  let isCurrentUser = false
  if(user._id == userId) isCurrentUser = true;
  
  
  // const { logoutUserhook } = useAuth();
  const { mutate: followUser, isPending } = useFollowUser();
 

  const { data, isLoading, isError } = useUserById(userId);
 
  console.log("this user data");
  console.log(data);
  const profile = data?.data;

 
  const handleFollow = () => {
    if (!profile?._id) return;
    console.log("want to follow this user",profile._id);
    followUser(profile._id);
  };
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
      <LoadUserProfile
        profile={profile}
        isCurrentUser={isCurrentUser}
        CurrentUserId={user._id}
        onFollow={handleFollow}
        onUnfollow={handleFollow}
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