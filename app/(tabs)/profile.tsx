import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROFILE_STATS = [
  { id: "posts", value: "54", label: "Posts" },
  { id: "followers", value: "834", label: "Followers" },
  { id: "following", value: "162", label: "Following" },
];

const STORY_HIGHLIGHTS = [
  { id: "new", label: "New", isNew: true },
  {
    id: "friends",
    label: "Friends",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  },
  {
    id: "sport",
    label: "Sport",
    image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
  },
  {
    id: "design",
    label: "Design",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

const GRID_POSTS = [
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  "https://images.unsplash.com/photo-1500534623283-312aade485b7",
  "https://images.unsplash.com/photo-1500534314218-258312053fbf",
  "https://images.unsplash.com/photo-1470246973918-29a93221c455",
  "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a",
  "https://images.unsplash.com/photo-1416339442236-8ceb164046f8",
];

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.usernameWrapper}>
            <Ionicons name="lock-closed" size={14} color="#262626" />
            <Text style={styles.username}>jacob_w</Text>
            <Ionicons name="chevron-down" size={16} color="#262626" />
          </View>

          <View style={styles.headerActions}>
            <Feather name="plus-square" size={24} color="#262626" />
            <Feather name="menu" size={26} color="#262626" style={styles.menuIcon} />
          </View>
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarOuterRing}>
              <View style={styles.avatarInnerRing}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
                  }}
                  style={styles.avatarImage}
                />
              </View>
            </View>
          </View>

          <View style={styles.statsWrapper}>
            {PROFILE_STATS.map((stat) => (
              <View key={stat.id} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.name}>Jacob West</Text>
          <Text style={styles.bioText}>
            Digital goodies designer{" "}
            <Text style={styles.handle}>@pixsellz</Text>
          </Text>
          <Text style={styles.bioSubtext}>Everything is designed.</Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.push("/profile/edit")}
          activeOpacity={0.8} 
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <View style={styles.highlightsRow}>
          {STORY_HIGHLIGHTS.map((highlight) => (
            <View key={highlight.id} style={styles.highlightItem}>
              <View style={styles.highlightOuterRing}>
                {highlight.isNew ? (
                  <View style={styles.newHighlight}>
                    <Feather name="plus" size={20} color="#262626" />
                  </View>
                ) : (
                  <View style={styles.highlightImageWrapper}>
                    <Image
                      source={{ uri: highlight.image }}
                      style={styles.highlightImage}
                    />
                  </View>
                )}
              </View>
              <Text style={styles.highlightLabel}>{highlight.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.segmentControl}>
          <Feather name="grid" size={20} color="#262626" />
          <Feather name="user" size={20} color="#C7C7CC" />
        </View>

        <View style={styles.postsGrid}>
          {GRID_POSTS.map((uri) => (
            <Image
              key={uri}
              source={{ uri }}
              style={styles.postImage}
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: 2,
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
  },
  bioSubtext: {
    marginTop: 2,
    fontSize: 13,
    color: "#262626",
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
  highlightsRow: {
    flexDirection: "row",
    marginTop: 18,
    gap: 18,
  },
  highlightItem: {
    alignItems: "center",
    width: 70,
  },
  highlightOuterRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
  },
  newHighlight: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1,
    borderColor: "#DBDBDB",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  highlightImageWrapper: {
    width: 58,
    height: 58,
    borderRadius: 29,
    overflow: "hidden",
  },
  highlightImage: {
    width: "100%",
    height: "100%",
  },
  highlightLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#262626",
  },
  segmentControl: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
    marginTop: 24,
  },
  postsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -1,
    marginTop: 2,
  },
  postImage: {
    width: "33.3333%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});