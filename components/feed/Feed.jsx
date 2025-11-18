import React from "react";
import { ScrollView, View } from "react-native";
import StoriesStrip from "./StoriesStrip";
import PostCard from "./PostCard";

const posts = [
  {
    id: "post-1",
    username: "joshua_l",
    location: "Tokyo, Japan",
    avatar: require("../../assets/appimages/proilfe button.png"),
    media: require("../../assets/appimages/Rectangle.png"),
    likedBy: "craig_love",
    likes: 44686,
    caption:
      "The game in Japan was amazing and I want to share some photos",
    slidesCount: 3,
    activeSlide: 1,
    verified: true,
    timeAgo: "2 hours ago",
  },
  {
    id: "post-2",
    username: "kieron_d",
    location: "Osaka, Japan",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    media: require("../../assets/appimages/Rectangle.png"),
    likedBy: "you",
    likes: 8921,
    caption: "City lights and calm nights.",
    slidesCount: 1,
    verified: false,
    timeAgo: "4 hours ago",
  },
];

const Feed = () => {
  return (
    <ScrollView
      className="flex-1 bg-[#f8f8f8]"
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      <StoriesStrip />
      <View className="h-[0.5px] bg-neutral-200" />
      <View className="mt-2">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Feed;


