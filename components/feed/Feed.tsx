import { usePost } from "@/hooks/usePosts";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import StoriesStrip from "../stories/StoriesStrip";
import PostCard from "./PostCard";

const Feed = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = usePost();

  const [selectedImage, setSelectedImage] = useState<string | null>(null); // 👈 controls editor

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 👈 open editor
    }
  };

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );

  if (isError)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Error loading posts</Text>
      </View>
    );

  // Flatten paginated posts
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <StoriesStrip onAddStory={pickImage} /> // 👈 pass handler to stories
        }
        renderItem={({ item }) => <PostCard {...item} />}
        // Infinite scroll
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.2}
        // Loader at bottom
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator size="small" />
            </View>
          ) : null
        }
        // Pull to refresh
        refreshing={isFetching}
        onRefresh={refetch}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />

      {/* 👇 Full-screen editor overlay */}
      {/* {selectedImage && (
        <StoryEditor
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )} */}
    </>
  );
};

export default Feed;
