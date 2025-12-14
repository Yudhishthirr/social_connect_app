import LoadUserProfile from "@/components/profile/LoadUserProfile";
import { useAuth, useCurrentUser } from "@/hooks/useAuth";
import { RootState } from "@/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const { logoutUserhook } = useAuth();

 

  const { data, isLoading, isError } = useCurrentUser();
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
      <LoadUserProfile
        profile={profile}
        isCurrentUser={true}
      />
  </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  }
});