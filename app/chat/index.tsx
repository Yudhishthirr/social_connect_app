import { MessageList } from "@/components/message/messagelist";
import { useCurrentUser } from "@/hooks/useAuth";
import { Text, View } from "react-native";


const ChatScreen = () => {
  
  const { data, isLoading, isError } = useCurrentUser();
  console.log(`messg list dara `);
  console.log(data);
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
  console.log("followinng list");
  console.log(followingList)
  
  return <MessageList threads={followingList} />;
  // return <Text>Hello chats</Text>
};

export default ChatScreen;
