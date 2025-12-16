import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { sendMessage } from "@/services/messageService";
import { socket } from "@/services/socket";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Message {
  id: string;
  text: string;
  isSent: boolean;
  timestamp: string;
}

const ChatDetailsScreen = () => {
  const router = useRouter();
  const { id: receiverId } = useLocalSearchParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);

  /* 🔔 SOCKET LISTENER */
  useEffect(() => {
    const handleReceiveMessage = ({
      conversationId: incomingConversationId,
      message,
    }: any) => {
      // Only show messages for this chat
      if (
        message.sender._id !== user._id &&
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

        // Save conversationId if first message received
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

  /* 📤 SEND MESSAGE */
  const handleSend = async () => {
    if (!message.trim()) return;

    const payload: any = {
      text: message.trim(),
    };

    // First message vs next messages
    if (conversationId) {
      payload.conversationId = conversationId;
    } else {
      payload.otherUserId = receiverId;
    }
    console.log("payload data");
    console.log(payload);
    try {
      const res = await sendMessage(payload);
      console.log("messge resposne")
        console.log(res);
        console.log("messge conversationId")
        console.log(res.data.conversationId);
        console.log("messge message")
        console.log(res.data.message);
      const newConversationId = res.data.conversationId;
      const newMessage = res.data.message;

      // Save conversationId after first message
      if (!conversationId) {
        setConversationId(newConversationId);
      }

      // Optimistic UI update
      setMessages((prev) => [
        ...prev,
        {
          id: newMessage._id,
          text: newMessage.text,
          isSent: true,
          timestamp: new Date(newMessage.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      setMessage("");
    } catch (err) {
      console.log("Send message error:", err);
    }
  };

  /* 🔽 AUTO SCROLL */
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200 bg-white">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <View className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 items-center justify-center mr-2">
              <Text className="text-white font-semibold text-sm">
                {receiverId?.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="text-base font-semibold text-black">
                User {receiverId}
              </Text>
              <Text className="text-xs text-neutral-500">Active now</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Ionicons name="videocam-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="information-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={`mb-4 ${msg.isSent ? "items-end" : "items-start"}`}
            >
              <View
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  msg.isSent
                    ? "bg-[#0095f6] rounded-tr-sm"
                    : "bg-neutral-100 rounded-tl-sm"
                }`}
              >
                <Text
                  className={`text-[15px] ${
                    msg.isSent ? "text-white" : "text-black"
                  }`}
                >
                  {msg.text}
                </Text>
              </View>
              <Text className="text-xs text-neutral-400 mt-1 px-2">
                {msg.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        <View className="border-t border-neutral-200 bg-white px-4 py-3">
          <View className="flex-row items-end gap-2">
            <TouchableOpacity className="pb-2">
              <Ionicons name="happy-outline" size={24} color="#000" />
            </TouchableOpacity>

            <View className="flex-1 flex-row items-center border border-neutral-200 rounded-full px-4 py-2 bg-neutral-50">
              <TextInput
                value={message}
                onChangeText={setMessage}
                placeholder="Message..."
                placeholderTextColor="#999"
                className="flex-1 text-[15px] text-black max-h-20"
                multiline
              />
            </View>

            {message.trim() ? (
              <TouchableOpacity
                onPress={handleSend}
                className="w-8 h-8 rounded-full bg-[#0095f6] items-center justify-center pb-2"
              >
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="pb-2">
                <Ionicons name="camera-outline" size={24} color="#000" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatDetailsScreen;
