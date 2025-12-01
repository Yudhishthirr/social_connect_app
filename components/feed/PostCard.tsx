import { icons } from "@/constants/icons";
import { useLikePost } from "@/hooks/usePosts";
import { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import Comments from "./Comments";

interface PostCardProps {
  _id: string;
  title: string;
  postUrl: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;

  user: {
    _id: string;
    username: string;
    fullName: string;
    avatar?: string;
  };

  isLiked?: boolean; // optional from optimistic update
}

const PostCard = ({
  _id,
  title,
  postUrl,
  createdAt,
  likeCount,
  commentCount,
  user,
  isLiked = false,
}:PostCardProps) => {
  const likeMutation = useLikePost();
  const [showComments, setShowComments] = useState(false);
 
  return (
    <View
      className="bg-white mb-5"
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.borderSubtle,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center">
          <View className="h-8 w-8 rounded-full overflow-hidden mr-3">
            <Image
              source={{ uri: user.avatar }}
              className="h-8 w-8"
              resizeMode="cover"
            />
          </View>

          <Text className="text-[13px] font-semibold text-black">
            {user.username}
          </Text>
        </View>

        <Text className="text-[22px] text-neutral-800 leading-3">⋯</Text>
      </View>

      {/* Post Image */}
      <View className="w-full aspect-[3/4] bg-neutral-200">
        <Image
          source={{ uri: postUrl }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Actions */}
      <View className="flex-row items-center justify-between px-4 pt-3 pb-1">
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mr-4"
            onPress={() => likeMutation.mutate(_id)}
            
          >
            <Image
              source={
                isLiked
                  ? icons.heartfull
                  : icons.heart
              }
              className="h-6 w-6"
            />
          </TouchableOpacity>

          <TouchableOpacity 
            className="mr-4"
            onPress={() => setShowComments(true)}
          >
            <Image
              source={icons.comments}
              className="h-6 w-6"
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={icons.share}
              className="h-6 w-6"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Image
            source={icons.save}
            className="h-6 w-6"
          />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <View className="px-4 pb-1">
        <Text className="text-[13px] font-semibold text-black">
          {likeCount} likes
        </Text>
      </View>

      {/* Caption */}
      <View className="px-4 pb-2">
        <Text className="text-[13px] text-black">
          <Text className="font-semibold">{user.username} </Text>
          {title}
        </Text>
      </View>

      {/* Time */}
      <View className="px-4 pb-4">
        <Text className="text-[10px] uppercase text-neutral-500">
          {new Date(createdAt).toDateString()}
        </Text>
      </View>

      {/* Comments Modal */}
      <Comments
        visible={showComments}
        onClose={() => setShowComments(false)}
        onload={() => loadComments(_id)}
      />
    </View>
  );
};

export default PostCard;
