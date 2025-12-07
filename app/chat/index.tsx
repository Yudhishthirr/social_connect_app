import { MessageList } from "@/components/message/messagelist";
import { useCurrentUser } from "@/hooks/useAuth";
import { Text, View } from "react-native";


const ChatScreen = () => {
  
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Failed to load chats</Text>
      </View>
    );
  }

  const followingList = data?.data?.followingList || [];
  return <MessageList threads={followingList} />;
  // return <Text>Hello chats</Text>
};

export default ChatScreen;
