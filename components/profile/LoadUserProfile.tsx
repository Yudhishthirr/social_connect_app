import FollowersModal from "@/components/profile/followerslist";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  accountType: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  followersList: any[];
  followingList: any[];
  posts: any[];
}

interface LoadUserProfileProps {
  profile: UserProfile;
  isCurrentUser: boolean;
  CurrentUserId?:string
  onFollow?: () => void;
  onUnfollow?: () => void;
  onMessage?: () => void;
  onEditProfile?: () => void;
  // isFollowing?: boolean;
}

const LoadUserProfile = ({
  profile,
  isCurrentUser,
  CurrentUserId,
  onFollow,
  onUnfollow,
  onMessage,
  onEditProfile,
  // isFollowing = false,
}: LoadUserProfileProps) => {
  const [modalType, setModalType] = useState<"followers" | "following" | null>(
    null
  );


  const UserfollowingList = profile?.followersList || [];
  
  const isFollowing = UserfollowingList.some(
    (user) => user._id === CurrentUserId
  );
  const renderHeader = () => (

    <>
      <View style={styles.header}>
        <View style={styles.usernameWrapper}>
          <Text style={styles.username}>{profile?.username}</Text>
          <Ionicons name="chevron-down" size={16} color="#262626" />
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Feather name="plus-square" size={24} color="#262626" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>
              router.push({
                pathname: "/settings/[settingId]",
                params: { settingId: profile._id },
              })
            }>
            <Feather
              name="menu"
              size={24}
              color="#262626"
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
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
          {profile?.bio && <Text style={styles.bioText}>{profile?.bio}</Text>}
          <Text style={styles.handle}>@{profile?.username}</Text>
        </View>

        {/* ---------- ACTION BUTTONS ---------- */}
        {isCurrentUser ? (
          // Edit Profile Button for current user
          <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          // Follow/Unfollow + Message buttons for other users
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={isFollowing ? onUnfollow : onFollow}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.messageButton}onPress={() => router.push(`/chat/${profile._id}`)}>
              <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.segmentControl} />
      </View>
      </>
  );

 

  return (
    <>
      <FlatList
        ListHeaderComponent={renderHeader()}
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
    </>
  );
};

export default LoadUserProfile;

const styles = StyleSheet.create({
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuIcon: {
    marginLeft: 4,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    paddingBottom: 16,
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
  actionButtonsRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },
  followButton: {
    flex: 1,
    backgroundColor: "#0095F6",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  followingButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DBDBDB",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  followingButtonText: {
    color: "#262626",
  },
  messageButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DBDBDB",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  messageButtonText: {
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