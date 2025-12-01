import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export interface PostItem {
  title: string;
  postUrl: string;
  createdAt: string;
}

interface ProfilePostsGridProps {
  posts: PostItem[];
  onPressPost?: (post: PostItem, index: number) => void;
}

const numColumns = 3;
const screenWidth = Dimensions.get("window").width;
const itemSize = screenWidth / numColumns;

const ProfilePostsGrid = ({ posts, onPressPost }: ProfilePostsGridProps) => {
  return (
    <FlatList
      data={posts}
      numColumns={numColumns}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressPost && onPressPost(item, index)}
        >
          <Image
            source={{ uri: item.postUrl }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  postImage: {
    width: itemSize,
    height: itemSize,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});

export default ProfilePostsGrid;
