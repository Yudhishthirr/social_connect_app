import { useStory } from "@/hooks/useStories";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { colors } from "../../constants/colors";
import StoryBubble from "./StoryBubble";

const StoriesStrip = ({ onAddStory }: { onAddStory: () => void }) => {
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);
  const { data, isLoading } = useStory();

  if (isLoading) return <ActivityIndicator size="small" />;

  // API data is inside data.pages[0].data
  // const storiesList = data?.pages?.[0]?.data || [];

  // // Map API response to UI format
  // const mappedStories = storiesList.map((item: any) => {
  //   const author = item.author;
  //   const hasNewStories = author.stories.length > 0;

  //   return {
  //     id: author._id,
  //     label: author.username,
  //     avatar: { uri: author.avatar },
  //     isNew: hasNewStories,
  //     isCurrentUser: false,
  //   };
  // });

  const rawStories = data?.pages?.[0]?.data;

// Convert to array safely
  const storiesList = Array.isArray(rawStories)
  ? rawStories
  : rawStories
    ? [rawStories]
    : [];

// Map API response to UI format
  const mappedStories = storiesList.map((item: any) => {
  const author = item.author;
  const hasNewStories = author.stories?.length > 0;

  return {
      id: author._id,
      label: author.username,
      avatar: { uri: author.avatar },
      isNew: hasNewStories,
      isCurrentUser: false,
    };
  });


  // console.log("stories List ");
  // console.log(storiesList);
  // console.log(storiesList[1]);

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
        {mappedStories.map((story: any) => (
          <StoryBubble
            key={story.id}
            {...story}
            onPress={(storyId) => setOpenStoryId(storyId)}
            onAddStory={onAddStory} // 👈 passes click up to Feed
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesStrip;
