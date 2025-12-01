import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

interface Follower {
  _id: string;
  username: string;
  avatar?: string;
}

interface FollowersModalProps {
  visible: boolean;
  followersList?: Follower[];   // optional now
  isLoading?: boolean;
  title: string;
  onClose: () => void;
}


const FollowersModal = ({
  visible,
  followersList,
  isLoading = false,
  title,
  onClose,
}: FollowersModalProps) => {
  const router = useRouter();


  const listToRender = followersList;

  const renderFollowerItem = ({ item }: { item: Follower }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row items-center px-4 py-3 border-b border-neutral-200"
    >
      {/* Profile Picture */}
      <View className="h-14 w-14 rounded-full overflow-hidden mr-3 border border-neutral-200">
        {item.avatar ? (
          <Image
            source={{ uri: item.avatar }}
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full bg-neutral-200 items-center justify-center">
            <Ionicons name="person" size={24} color="#999" />
          </View>
        )}
      </View>

      {/* Username */}
      <View className="flex-1">
        <Text className="text-[14px] font-semibold text-black">
          {item.username}
        </Text>
      </View>

      {/* Follow Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        className="px-4 py-1.5 rounded-lg bg-[#0095f6]"
      >
        <Text className="text-[13px] font-semibold text-white">Follow</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      {/* Background overlay */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40" />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <View className="bg-white rounded-t-3xl max-h-[75%] w-full absolute bottom-0">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200">
          <TouchableOpacity
            onPress={onClose}
            activeOpacity={0.7}
            className="p-2 -ml-2"
          >
            <Ionicons name="close" size={26} color="#000" />
          </TouchableOpacity>

          <Text className="text-[16px] font-semibold text-black">{title}</Text>

          <View className="w-10" />
        </View>

        {/* Loading */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center py-10">
            <ActivityIndicator size="large" color="#0095f6" />
          </View>
        ) : (
          <FlatList
            data={listToRender}
            keyExtractor={(item) => item._id}
            renderItem={renderFollowerItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </View>
    </Modal>
  );
};

export default FollowersModal;
