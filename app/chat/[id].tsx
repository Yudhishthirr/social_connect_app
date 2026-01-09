import { getChatHistory, sendAiMessage, sendMessage } from "@/services/messageService";
import { socket } from "@/services/socket";
import { RootState } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

interface Message {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: string;
  isPending?: boolean; // Track optimistic messages
}

const ChatDetailsScreen = () => {
  const router = useRouter();
  const { id: receiverId, isAi, username, avatar } = useLocalSearchParams<{
    id: string;
    isAi: string;
    username: string;
    avatar: string;
  }>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState(null);
  const scrollViewRef = useRef(null);

  /* 📥 LOAD CHAT HISTORY */
  const loadChatHistory = async () => {
    try {
      console.log("receiverId");
      console.log(receiverId);
      const res = await getChatHistory(receiverId);
      console.log(res);
      const { conversationId } = res;
      let chathistory = res.data.messages;
      console.log(chathistory);

      const formattedMessages = chathistory.map((msg: any) => ({
        id: msg._id,
        text: msg.text,
        isSent: msg.sender?._id === user._id,
        timestamp: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.log("Failed to load chat history:", error);
    }
  };

  useEffect(() => {
    loadChatHistory();
  }, [receiverId]);

  /* 🔔 SOCKET LISTENER */
  useEffect(() => {
    const handleReceiveMessage = ({
      conversationId: incomingConversationId,
      message,
    }: any) => {
      if (
        message.sender?._id !== user._id &&
        (conversationId === incomingConversationId || !conversationId)
      ) {
        setMessages((prev) => [
          ...prev,
          {
            id: message._id,
            text: message.text,
            isSent: false,
            timestamp: new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        if (!conversationId) {
          setConversationId(incomingConversationId);
        }
      }
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [conversationId, user._id]);

  /* 📤 SEND MESSAGE WITH OPTIMISTIC UI */
  const handleSend = async () => {
    if (!message.trim()) return;

    const messageText = message.trim();
    
    // Generate temporary ID for optimistic message
    const tempId = `temp-${Date.now()}`;
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Optimistically add message to UI immediately
    const optimisticMessage: Message = {
      id: tempId,
      text: messageText,
      isSent: true,
      timestamp: currentTime,
      isPending: false,
    };

    setMessages((prev) => [...prev, optimisticMessage]);
    setMessage(""); // Clear input immediately

    const payload: any = {
      text: messageText,
    };

    if (conversationId) {
      payload.conversationId = conversationId;
    } else {
      payload.otherUserId = receiverId;
    }

    try {
      let res;
      if (isAi === "true") {
        res = await sendAiMessage(payload);
      } else {
        res = await sendMessage(payload);
      }

      const newConversationId = res.data.conversationId;
      const newMessage = res.data.message;

      console.log("New Message");
      console.log(newMessage);
      if (!conversationId) {
        setConversationId(newConversationId);
      }

      // Replace optimistic message with real message from server

      const uidate = {
        id: newMessage._id,
        text: newMessage.text,
        isSent: false,
        timestamp: currentTime,
        isPending: false,
      };
      // setMessages((prev) => [...prev, uidate]);
      setMessages((prev) => [...prev, newMessage]);
   
    } catch (err) {
      console.log("Send message error:", err);
      
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
      
      // Optionally restore the message text to the input
      setMessage(messageText);
      
      // You can also show an error toast/alert here
      alert("Failed to send message. Please try again.");
    }
  };

  /* 🔽 AUTO SCROLL */
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View className="flex-row items-center p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: avatar }}
            className="w-10 h-10 rounded-full mr-3"
          />
          <View className="flex-1">
            <Text className="font-semibold text-base">{username}</Text>
            <Text className="text-xs text-gray-500">Active now</Text>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={`mb-3 ${msg.isSent ? "items-end" : "items-start"}`}
            >
              <View
                className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                  msg.isSent ? "bg-blue-500" : "bg-gray-200"
                }`}
                style={{ opacity: msg.isPending ? 0.7 : 1 }}
              >
                <Text className={msg.isSent ? "text-white" : "text-black"}>
                  {msg.text}
                </Text>
              </View>
              <Text className="text-xs text-gray-500 mt-1">
                {msg.timestamp}
                {msg.isPending && " • Sending..."}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View className="flex-row items-center px-4 py-3 border-t border-gray-200">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            onPress={handleSend}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              message.trim() ? "bg-blue-500" : "bg-gray-300"
            }`}
            disabled={!message.trim()}
          >
            {message.trim() ? (
              <Ionicons name="send" size={20} color="white" />
            ) : (
              <Ionicons name="send-outline" size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailsScreen;