import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import { sendMessage as sendMessageAPI } from "@/services/messageService";
import { socket } from "@/socket/socket";
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
    const { id: receiverId } = useLocalSearchParams();
    const user = useSelector((state: RootState) => state.auth.user);

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);
    
      

    
    // Send message
    const handleSend = async () => {
        console.log("click post");
        if (!message.trim()) return;

        const data = {
            recipient: receiverId,
            text: message.trim(),
        };
        console.log("message daat",data);
        try {
            // 1) Save message in DB
            await sendMessageAPI(data);

            // 2) Send via socket
            socket.emit("sendMessage", {
                sender: user._id,
                recipient: receiverId,
                text: message.trim(),
            });

            // 3) Local UI update
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now().toString(),
                    text: message.trim(),
                    isSent: true,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    })
                }
            ]);

            setMessage("");
        } catch (err) {
            console.log("Send message error:", err);
        }
    };

   
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
                                {receiverId?.toString().charAt(0).toUpperCase() || "U"}
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

                {/* Messages List */}
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

                {/* Input Field */}
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
                                textAlignVertical="center"
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
