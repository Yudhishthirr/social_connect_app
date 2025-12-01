import { colors } from "@/constants/colors";
import { icons } from "@/constants/icons";
import { useAddComment, useComments, useLikeComment } from "@/hooks/useComments";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Comment {
  _id: string;
  content: string;
  post: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  ownerData: {
    username: string;
    avatar: string;
  };
}

interface CommentsProps {
  visible: boolean;
  postId: string;
  onClose: () => void;
}

interface CommentFormData {
  content: string;
}

const Comments = ({ visible, postId, onClose }: CommentsProps) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>({
    defaultValues: {
      content: ""
    }
  });

  // Fetch comments by post ID
  const { data, isLoading, refetch } = useComments(postId);
 
  const addCommentMutation = useAddComment();
  const likeCommentMutation = useLikeComment();

  // SAFELY extract comments
  const comments: Comment[] = data?.data || [];
  console.log("comments:", comments);

  // Add new comment
  const onSubmit = async (formData: CommentFormData) => {
    if (!formData.content.trim()) return;

    try {
      await addCommentMutation.mutateAsync({
        postId,
        content: formData.content.trim(),
      });

      reset(); // Clear form after successful submission
      refetch(); // refresh after posting
    } catch (error) {
      console.error("❌ Failed to add comment:", error);
    }
  };

  // Like/unlike a comment
  const handleLikeComment = (commentId: string) => {
    likeCommentMutation.mutate(commentId, {
      onSuccess: () => refetch(),
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white"
      >
        {/* Header */}
        <View
          className="flex-row items-center justify-between px-4 py-3 border-b"
          style={{ borderBottomColor: colors.borderSubtle }}
        >
          <Text className="text-base font-semibold text-black">Comments</Text>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-base text-black">Done</Text>
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
          </View> 
        ) : comments.length === 0 ? (
          <View className="flex-1 justify-center items-center px-4">
            <Text className="text-neutral-500 text-center">
              No comments yet. Be the first to comment!
            </Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingVertical: 12 }}
            renderItem={({ item }) => (
              <View className="flex-row px-4 py-3">
                {/* Avatar */}
                <View className="h-8 w-8 rounded-full overflow-hidden mr-3">
                  <Image
                    source={{
                      uri: item.ownerData.avatar || "https://via.placeholder.com/32",
                    }}
                    className="h-8 w-8"
                    resizeMode="cover"
                  />
                </View>

                {/* Comment Content */}
                <View className="flex-1">
                  <View className="flex-row items-start mb-1">
                    <Text className="text-[13px] font-semibold text-black mr-2">
                      {item.ownerData.username}
                    </Text>
                    <Text className="text-[13px] text-black flex-1">{item.content}</Text>
                  </View>

                  {/* Actions */}
                  <View className="flex-row items-center mt-2">
                    <Text className="text-[12px] text-neutral-500 mr-4">
                      {new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>

                    {item.likeCount > 0 && (
                      <Text className="text-[12px] text-neutral-500 mr-4">
                        {item.likeCount} {item.likeCount === 1 ? "like" : "likes"}
                      </Text>
                    )}

                    <TouchableOpacity
                      onPress={() => handleLikeComment(item._id)}
                      disabled={likeCommentMutation.isPending}
                    >
                      <Text className="text-[12px] font-semibold text-neutral-500">
                        {item.isLiked ? "Unlike" : "Like"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Like Button */}
                <TouchableOpacity
                  className="ml-3 justify-start pt-1"
                  onPress={() => handleLikeComment(item._id)}
                  disabled={likeCommentMutation.isPending}
                >
                  <Image
                    source={item.isLiked ? icons.heartfull : icons.heart}
                    className="h-4 w-4"
                  />
                </TouchableOpacity>
              </View>
            )}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        )}

        {/* Input Section */}
        <View
          className="border-t px-4 py-3"
          style={{ borderTopColor: colors.borderSubtle }}
        >
          <View className="flex-row items-center">
            <View
              className="flex-1 border rounded-full px-4 py-2 mr-2"
              style={{ borderColor: colors.borderSubtle }}
            >
              <Controller
                control={control}
                name="content"
                rules={{
                  required: "Comment cannot be empty",
                  maxLength: {
                    value: 2200,
                    message: "Comment is too long"
                  },
                  validate: (value) => value.trim().length > 0 || "Comment cannot be empty"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Add a comment..."
                    placeholderTextColor={colors.textMuted}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleSubmit(onSubmit)}
                    className="text-[14px] text-black"
                    multiline
                    maxLength={2200}
                  />
                )}
              />
            </View>

            <Controller
              control={control}
              name="content"
              render={({ field: { value } }) => (
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={!value.trim() || addCommentMutation.isPending}
                  className="px-2"
                >
                  <Text
                    className={`text-[14px] font-semibold ${
                      value.trim() && !addCommentMutation.isPending
                        ? "text-[#0095f6]"
                        : "text-neutral-400"
                    }`}
                  >
                    {addCommentMutation.isPending ? "Posting..." : "Post"}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
          
          {/* Error Message */}
          {errors.content && (
            <Text className="text-red-500 text-[12px] mt-2 px-4">
              {errors.content.message}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default Comments;