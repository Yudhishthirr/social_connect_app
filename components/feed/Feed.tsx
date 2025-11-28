import { usePost } from "@/hooks/usePosts";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import PostCard from "./PostCard";
import StoriesStrip from "./StoriesStrip";

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
  const posts =data?.pages.flatMap((page) => page.posts) ?? [];
// const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={<StoriesStrip />}
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
  );
};

export default Feed;
