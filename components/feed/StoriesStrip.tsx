import { ScrollView, View } from "react-native";
import { colors } from "../../constants/colors";
import StoryBubble from "./StoryBubble";

const storyData = [
  {
    id: "me",
    label: "your story",
    avatar: require("../../assets/appimages/proilfe button.png"),
    isCurrentUser: true,
    isNew: false,
  },
  {
    id: "karennne",
    label: "karennne",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isLive: true,
  },
  {
    id: "zackjohn",
    label: "zackjohn",
    avatar: require("../../assets/appimages/Inner Oval (1).png"),
  },
  {
    id: "kieron_d",
    label: "kieron_d",
    avatar: require("../../assets/appimages/Inner Oval.png"),
  },
  {
    id: "craig_love",
    label: "craig_love",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love1",
    label: "craig_love1",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love2",
    label: "craig_love2",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love3",
    label: "craig_love3",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love4",
    label: "craig_love4",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love5",
    label: "craig_love5",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
  {
    id: "craig_love6",
    label: "craig_love6",
    avatar: require("../../assets/appimages/Inner Oval.png"),
    isNew: false,
  },
];

const StoriesStrip = () => {
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
        {storyData.map((story) => (
          <StoryBubble key={story.id} {...story} />
        ))}
      </ScrollView>
    </View>
  );
};

export default StoriesStrip;


