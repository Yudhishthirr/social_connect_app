import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MessageList = ({ threads }: any) => {
    const router = useRouter();
    return (
      <SafeAreaView className="flex-1 bg-white">
        {/* HEADER */}
        {/* <View className="border-b border-neutral-200 px-5 py-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
              <TouchableOpacity activeOpacity={0.7} className="rounded-full p-1">
                <Feather name="chevron-left" size={22} color="#111" />
              </TouchableOpacity>
  
              <View>
                <View className="flex-row items-center gap-1">
                  <Text className="text-base font-semibold text-black">
                    Messages
                  </Text>
                </View>
                <Text className="text-xs text-neutral-500">Following Users</Text>
              </View>
            </View>
  
            <View className="flex-row items-center gap-5">
              <Feather name="video" size={22} color="#111" />
              <Feather name="plus" size={22} color="#111" />
            </View>
          </View>
        </View> */}
  
        {/* SEARCH */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* <View className="px-5 pt-5">
            <View className="rounded-2xl bg-neutral-100 px-4 py-2">
              <TextInput
                placeholder="Search"
                placeholderTextColor="#999"
                className="text-base text-black"
              />
            </View>
          </View> */}
  
          {/* USER LIST */}
          <FlatList
            data={threads}
            scrollEnabled={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
            ItemSeparatorComponent={() => <View className="h-5" />}
            renderItem={({ item }) => (
                <TouchableOpacity  onPress={() => router.push(`/chat/${item._id}`)}>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-4">
                        <Image
                            source={{ uri: item.avatar }}
                            className="h-14 w-14 rounded-full"
                        />
        
                        <View>
                            <Text className="text-base font-semibold text-black">
                            {item.username}
                            </Text>
        
                            <Text className="text-sm text-neutral-500">
                            Tap to message
                            </Text>
                        </View>
                        </View>
        
                        <Feather name="camera" size={22} color="#c7c7cc" />
                    </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
  
        {/* FOOTER */}
        <View className="items-center border-t border-neutral-200 px-4 py-4">
          <TouchableOpacity className="flex-row items-center gap-2 rounded-full border border-sky-500 px-5 py-3">
            <Feather name="camera" size={18} color="#0095F6" />
            <Text className="text-sm font-semibold text-sky-500">
              Camera
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};
  