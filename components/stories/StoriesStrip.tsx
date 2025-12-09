import { useStory } from "@/hooks/useStories";
import { RootState } from "@/store";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import StoryBubble from "./StoryBubble";

const StoriesStrip = ({ onAddStory }: { onAddStory: () => void }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);
  const { data, isLoading } = useStory();

  // User can be null after logout; guard after hooks to preserve hook order.
  if (!user) return null;

  if (isLoading) return <ActivityIndicator size="small" />;
  // console.log("user",user);
  const currentUserStory = {
    author: {
      _id: user._id,
      username: user.username,
      avatar: user.avatar,
      stories: user.stories || []
    }
  };


  const rawStories = data?.pages?.[0]?.data;

  const allStories = [
    currentUserStory,
    ...(rawStories || []).filter((story: any) => story.author._id !== user._id)
  ];

  console.log("rawStories",rawStories);
  return (
    <View
      className="bg-white border-b border-neutral-200"
      style={{ borderColor: colors.borderSubtle }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        className="py-3"
      >
        {allStories.map((story: any) => (
          <StoryBubble
            key={story.author._id}
            id={story.author._id}
            label={story.author.username}
            avatar={story.author.avatar}
            stories={story.author.stories}
            onPress={(storyId) => setOpenStoryId(storyId)}
            onAddStory={onAddStory}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesStrip;
