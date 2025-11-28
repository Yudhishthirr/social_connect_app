import { getAllPosts } from "@/services/postService";
import { useEffect, useState } from "react";
import { ImageSourcePropType, ScrollView, View } from "react-native";
import PostCard from "./PostCard";
import StoriesStrip from "./StoriesStrip";

export interface PostCardProps {
  id: string;
  username: string;
  avatar: ImageSourcePropType;
  media: ImageSourcePropType;
  caption: string;
  likes: number;
  comments: number;
  likedBy: string;
  timeAgo: string;
}

const Feed = () => {
  const [Allposts, setAllposts] = useState<PostCardProps[]>([]);

  const loadposts = async () => {
    try {
        const res = await getAllPosts();
        if (res?.data) {
          const formatted = res.data.map((post: any) => ({
            id: post._id,
            username: post.user.username,
            avatar: { uri: post.user.avatar },
            media: { uri: post.postUrl },
            caption: post.title,
            likes: post.likeCount,
            comments: post.commentCount,
            likedBy: post.user.fullName,
            timeAgo: formatTimeAgo(post.createdAt),
          }));
          setAllposts(formatted);
        }
    } catch (error: any) {
      // Handle all API errors here
      console.log("post fetch error:", error.message);
     
    }
  };

  useEffect(() => {
   loadposts();
  }, []);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <ScrollView
      className="flex-1 bg-[#f8f8f8]"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <StoriesStrip />
      <View className="h-[0.5px] bg-neutral-200" />
      <View className="mt-2">
        {Allposts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Feed;
