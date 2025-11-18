import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";

interface PostCardProps {
  username: string;
  location?: string;
  avatar: ImageSourcePropType;
  media: ImageSourcePropType;
  likedBy: string;
  likes: number;
  caption: string;
  slidesCount?: number;
  activeSlide?: number;
  verified?: boolean;
  timeAgo?: string;
}

const formatLikes = (count: number) =>
  count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const PostCard: React.FC<PostCardProps> = ({
  username,
  location,
  avatar,
  media,
  likedBy,
  likes,
  caption,
  slidesCount = 1,
  activeSlide = 1,
  verified = false,
  timeAgo,
}) => {
  return (
    <View
      className="bg-white mb-5"
      style={{ borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <View className="h-8 w-8 rounded-full overflow-hidden mr-3">
            <Image source={avatar} className="h-8 w-8" />
          </View>
          <View>
            <View className="flex-row items-center">
              <Text className="text-[13px] font-semibold text-black mr-1">
                {username}
              </Text>
              {verified && (
                <Image
                  source={require("../../assets/icons/verify.svg")}
                  className="h-3 w-3"
                />
              )}
            </View>
            {location && (
              <Text className="text-[11px] text-neutral-500">{location}</Text>
            )}
          </View>
        </View>
        <Text className="text-[24px] text-neutral-800 leading-4">⋯</Text>
      </View>

      {/* Image */}
      <View className="w-full aspect-[3/4] bg-neutral-200">
        <Image source={media} className="w-full h-full" resizeMode="cover" />
        {slidesCount > 1 && (
          <View className="absolute right-3 top-3 px-2 py-1 rounded-full bg-black/60">
            <Text className="text-[11px] text-white">
              {activeSlide}/{slidesCount}
            </Text>
          </View>
        )}
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between px-4 pt-3 pb-1">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Image
              source={require("../../assets/icons/notification.png")}
              className="h-6 w-6"
            />
          </TouchableOpacity>
          <TouchableOpacity className="mr-4">
            <Image
              source={require("../../assets/icons/commemts.png")}
              className="h-6 w-6"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/icons/share.png")}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../assets/icons/save.png")}
            className="h-6 w-6"
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <View className="px-4 pb-1">
        <Text className="text-[13px] font-semibold text-black">
          Liked by {likedBy} and {formatLikes(likes)} others
        </Text>
      </View>

      {/* Caption */}
      <View className="px-4 pb-2">
        <Text className="text-[13px] text-black">
          <Text className="font-semibold">{username} </Text>
          {caption}
        </Text>
      </View>

      {timeAgo && (
        <View className="px-4 pb-4">
          <Text className="text-[10px] uppercase text-neutral-500">
            {timeAgo}
          </Text>
        </View>
      )}
    </View>
  );
};

export default PostCard;
