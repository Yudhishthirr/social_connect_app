import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

interface StoryBubbleProps {
  label?: string;
  avatar: ImageSourcePropType;
  isLive?: boolean;
  isNew?: boolean;
  isCurrentUser?: boolean;
}

const StoryBubble: React.FC<StoryBubbleProps> = ({
  label = "",
  avatar,
  isLive = false,
  isNew = true,
  isCurrentUser = false,
}) => {
  const ringClass = isCurrentUser
    ? "border border-neutral-300"
    : isNew
    ? "border-2 border-[#F56040]"
    : "border-2 border-neutral-200";

  return (
    <View className="items-center mr-4">
      <View
        className={`relative h-16 w-16 rounded-full items-center justify-center ${ringClass}`}
      >
        <Image source={avatar} className="h-14 w-14 rounded-full" />

        {isCurrentUser && (
          <View className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-blue-500 border-2 border-white items-center justify-center">
            <Text className="text-white text-xs leading-none">+</Text>
          </View>
        )}

        {isLive && !isCurrentUser && (
          <View className="absolute -bottom-2 self-center px-2 py-[1px] rounded-full bg-red-500">
            <Text className="text-[9px] font-semibold text-white uppercase tracking-wide">
              Live
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
  );
};

export default StoryBubble;
