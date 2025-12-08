import { useImagePicker } from "@/hooks/useImagePicker";
import { usePost } from "@/hooks/usePosts";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import StoriesStrip from "../stories/StoriesStrip";
import StoryEditor from "../stories/story-editor";
// import StoryEditor from "@/components/stories/editor/StoryEditor";
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

  const { pickImage } = useImagePicker(); // 👈 FIXED

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
          // <StoriesStrip onAddStory={pickImage} /> // 👈 pass handler to stories
        <StoriesStrip
            onAddStory={async () => {
              const result = await pickImage();  // get image
              if (result) {
                setSelectedImage(result);        // open StoryEditor
              }
            }}
          />
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
      {selectedImage && (
        <StoryEditor
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default Feed;
