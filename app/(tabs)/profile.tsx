import FollowersModal from "@/components/profile/followerslist";
import { useAuth } from "@/hooks/useAuth";
import { getCurrentUser } from "@/services/authService";
import { RootState } from "@/store";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export interface ProfileProps {
  _id: string;
  avatar: string;
  email: string;
  followersCount: number;
  followingCount: number;
  fullName: string;
  bio?: string;
  posts: {
    title: string;
    postUrl: string;
    createdAt: string;
  }[];
  followersList: {
    _id: string;
    username: string;
    avatar?: string;
  }[];
  followingList: {
    _id: string;
    username: string;
    avatar?: string;
  }[];
  postsCount: number;
  username: string;
}

const ProfileScreen = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileProps | null>(null);
  const [modalType, setModalType] = useState<"followers" | "following" | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const { logoutUserhook } = useAuth();

  function logoutCurrentUser() {
    logoutUserhook();
    router.push("/(auth)/login");
  }

  async function loadUserProfile() {
    const res = await getCurrentUser();
    console.log("Loaded profile API response:", res);
    if (res?.data) {
      setProfile(res.data);
    }
  }

  useEffect(() => {
    if (!user) {
      router.replace("/(auth)/login");
    }
    loadUserProfile();
  }, [user]);

  const renderHeader = () => (
    <View style={styles.content}>
      {/* ---------- PROFILE IMAGE + STATS ---------- */}
      <View style={styles.profileRow}>
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarOuterRing}>
            <View style={styles.avatarInnerRing}>
              <Image
                source={{ uri: profile?.avatar }}
                style={styles.avatarImage}
              />
            </View>
          </View>
        </View>

        <View style={styles.statsWrapper}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{profile?.postsCount}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => {
              if (profile?.followersCount! > 0) {
                setModalType("followers");
              }
            }}
          >
            <Text style={styles.statValue}>{profile?.followersCount}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.statItem}
            onPress={() => {
              if (profile?.followingCount! > 0) {
                setModalType("following");
              }
            }}
          >
            <Text style={styles.statValue}>{profile?.followingCount}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ---------- BIO SECTION ---------- */}
      <View style={styles.bioSection}>
        <Text style={styles.name}>{profile?.fullName}</Text>
        <Text style={styles.bioText}>{profile?.bio}</Text>
        <Text style={styles.handle}>@{profile?.username}</Text>
      </View>

      {/* ---------- EDIT BUTTON ---------- */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.segmentControl} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <>
            {/* ---------- HEADER ---------- */}
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
            {renderHeader()}
          </>
        }
        data={profile?.posts || []}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postImage}
            onPress={() => {
              console.log("Clicked post:", item);
            }}
          >
            <Image
              source={{ uri: item.postUrl }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* {modalType !== null && (
        <FollowersModal
          visible={true}
          modalType={modalType}
          followersList={profile?.followersList || []}
          followingList={profile?.followingList || []}
          onClose={() => setModalType(null)}
        />
      )} */}
        {modalType !== null && (
        <FollowersModal
          visible={true}
          title={modalType === "followers" ? "Followers" : "Following"}
          followersList={
            modalType === "followers"
              ? profile?.followersList
              : profile?.followingList
          }
          onClose={() => setModalType(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingBottom: 16,
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
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  avatarWrapper: {
    marginRight: 24,
  },
  avatarOuterRing: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 2,
    borderColor: "#F77737",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInnerRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: "#FD1D1D",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  avatarImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  statsWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#262626",
  },
  statLabel: {
    fontSize: 13,
    color: "#8E8E93",
  },
  bioSection: {
    marginTop: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#262626",
  },
  bioText: {
    marginTop: 4,
    fontSize: 13,
    color: "#262626",
    lineHeight: 18,
  },
  handle: {
    color: "#00376B",
    marginTop: 4,
  },
  editButton: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#262626",
  },
  segmentControl: {
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
    marginTop: 24,
    marginBottom: 2,
  },
  postImage: {
    width: "33.3333%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});