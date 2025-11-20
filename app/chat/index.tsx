import { Feather } from "@expo/vector-icons";
import {
    FlatList,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CHAT_THREADS = [
  {
    id: "1",
    name: "joshua_l",
    message: "Have a nice day, bro!",
    time: "· now",
    avatar: require("../../assets/appimages/Inner Oval.png"),
  },
  {
    id: "2",
    name: "karennne",
    message: "I heard this is a good movie, s...",
    time: "· now",
    avatar: require("../../assets/appimages/Inner Oval (1).png"),
  },
  {
    id: "3",
    name: "martini_rond",
    message: "See you on the next meeting!",
    time: "· 15m",
    avatar: require("../../assets/appimages/Gallery.png"),
  },
  {
    id: "4",
    name: "andrewww_",
    message: "Sounds good 😂😂",
    time: "· 20m",
    avatar: require("../../assets/appimages/proilfe button.png"),
  },
  {
    id: "5",
    name: "kiero_d",
    message: "The new design looks cool, b...",
    time: "· 1m",
    avatar: require("../../assets/appimages/Inner Oval (1).png"),
  },
  {
    id: "6",
    name: "maxjacobson",
    message: "Thank you, bro!",
    time: "· 2h",
    avatar: require("../../assets/appimages/InstagramLogo.png"),
  },
  {
    id: "7",
    name: "jamie.franco",
    message: "Yep, I'm going to travel in To...",
    time: "· 4h",
    avatar: require("../../assets/appimages/Rectangle.png"),
  },
  {
    id: "8",
    name: "m_humphrey",
    message: "Instagram UI is pretty good",
    time: "· 5h",
    avatar: require("../../assets/appimages/image_explore.png"),
  },
];

const ChatScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-neutral-200 px-5 py-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity activeOpacity={0.7} className="rounded-full p-1">
              <Feather name="chevron-left" size={22} color="#111" />
            </TouchableOpacity>
            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-base font-semibold text-black">jacob_w</Text>
                <Feather name="chevron-down" size={16} color="#111" />
              </View>
              <Text className="text-xs text-neutral-500">Messages</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-5">
            <Feather name="video" size={22} color="#111" />
            <Feather name="plus" size={22} color="#111" />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="px-5 pt-5">
          <View className="rounded-2xl bg-neutral-100 px-4 py-2">
            <TextInput
              placeholder="Search"
              placeholderTextColor="#999"
              className="text-base text-black"
            />
          </View>
        </View>

        <FlatList
          data={CHAT_THREADS}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
          ItemSeparatorComponent={() => <View className="h-5" />}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <Image source={item.avatar} className="h-14 w-14 rounded-full" />
                <View>
                  <Text className="text-base font-semibold text-black">{item.name}</Text>
                  <Text className="text-sm text-neutral-500">
                    {item.message} <Text className="text-xs text-neutral-400">{item.time}</Text>
                  </Text>
                </View>
              </View>
              <Feather name="camera" size={22} color="#c7c7cc" />
            </View>
          )}
        />
      </ScrollView>

      <View className="items-center border-t border-neutral-200 px-4 py-4">
        <TouchableOpacity className="flex-row items-center gap-2 rounded-full border border-sky-500 px-5 py-3">
          <Feather name="camera" size={18} color="#0095F6" />
          <Text className="text-sm font-semibold text-sky-500">Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
