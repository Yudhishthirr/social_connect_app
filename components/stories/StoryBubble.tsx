import { RootState } from "@/store";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface StoryBubbleProps {
  id: string;
  label?: string;
  avatar: string; // 👈 Change to string instead of ImageSourcePropType
  stories?: any[];
  onAddStory?: () => void;
  onPress?: (id: string) => void;
}

const StoryBubble = ({
  id,
  label = "",
  avatar,
  stories = [],
  onAddStory,
  onPress,
}: StoryBubbleProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const isCurrentUser = user._id === id;
  const isViewed = false;
  const hasStories = stories.length > 0;

  console.log("isCurrentUser:", isCurrentUser, "user._id:", user._id, "story id:", id);
  
  const RingClass = "border-2 border-[#F56040]";
  const NonRingClass = "border border-neutral-300";

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress?.(id)}>
      <View className="items-center mr-4">
        <View
          className={`relative h-16 w-16 rounded-full items-center justify-center ${
            isViewed || isCurrentUser || !hasStories ? NonRingClass : RingClass
          }`}
        >
          {/* 👇 Use source={{ uri: avatar }} */}
          <Image source={{ uri: avatar }} className="h-14 w-14 rounded-full" />

          {isCurrentUser && (
            <TouchableOpacity
              onPress={onAddStory}
              className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-blue-500 border-2 border-white items-center justify-center"
            >
              <Text className="text-white text-xs leading-none">+</Text>
            </TouchableOpacity>
          )}

          {!isCurrentUser && (
            <View className="absolute -bottom-2 self-center px-2 py-[1px] rounded-full">
              <Text className="text-[9px] font-semibold text-white uppercase tracking-wide">
                {/* Live */}
              </Text>
            </View>
          )}
        </View>
        <Text
          numberOfLines={1}
          className="mt-2 text-[11px] text-neutral-800 max-w-[64px] capitalize"
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryBubble;