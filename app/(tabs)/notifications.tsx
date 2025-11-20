import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationItem = {
  id: string;
  userName: string;
  message: string;
  time: string;
  avatar: any;
  preview?: any;
  action?: "Message" | "Follow";
  highlight?: boolean;
};

const followRequestAvatar = require("../../assets/appimages/Inner Oval.png");

const notificationSections: { title: string; data: NotificationItem[] }[] = [
  {
    title: "New",
    data: [
      {
        id: "new-1",
        userName: "karennne",
        message: "liked your photo.",
        time: "1h",
        avatar: require("../../assets/appimages/Inner Oval (1).png"),
        preview: require("../../assets/appimages/Rectangle (1).png"),
      },
    ],
  },
  {
    title: "Today",
    data: [
      {
        id: "today-1",
        userName: "kiero_d, zackjohn and 26 others",
        message: "liked your photo.",
        time: "3h",
        avatar: require("../../assets/appimages/proilfe button.png"),
        preview: require("../../assets/appimages/Rectangle.png"),
      },
    ],
  },
  {
    title: "This Week",
    data: [
      {
        id: "week-1",
        userName: "craig_love",
        message: "mentioned you in a comment: @jacob_w exactly..",
        time: "2d",
        avatar: require("../../assets/appimages/Gallery.png"),
        highlight: true,
      },
      {
        id: "week-2",
        userName: "martini_rond",
        message: "started following you.",
        time: "3d",
        avatar: require("../../assets/appimages/Inner Oval.png"),
        action: "Message",
      },
      {
        id: "week-3",
        userName: "maxjacobson",
        message: "started following you.",
        time: "3d",
        avatar: require("../../assets/appimages/InstagramLogo.png"),
        action: "Message",
      },
      {
        id: "week-4",
        userName: "mis_potter",
        message: "started following you.",
        time: "3d",
        avatar: require("../../assets/appimages/Inner Oval (1).png"),
        action: "Follow",
      },
    ],
  },
  {
    title: "This Month",
    data: [
      {
        id: "month-1",
        userName: "andrew_k",
        message: "liked your photo.",
        time: "1w",
        avatar: require("../../assets/appimages/Gallery.png"),
        preview: require("../../assets/appimages/Rectangle (1).png"),
      },
    ],
  },
];

const TABS: Array<"Following" | "You"> = ["Following", "You"];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<"Following" | "You">("You");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-semibold text-black">
              Activity
            </Text>
            <View className="flex-row gap-2">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
                <Image
                  source={require("../../assets/icons/notification.png")}
                  className="h-5 w-5"
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View className="mt-5 flex-row rounded-full bg-neutral-100 p-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  className={`flex-1 rounded-full py-2 ${
                    isActive ? "bg-white shadow" : ""
                  }`}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`text-center text-sm font-semibold ${
                      isActive ? "text-black" : "text-neutral-500"
                    }`}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity className="mt-5 flex-row items-center justify-between rounded-3xl bg-neutral-100 px-4 py-4">
            <View className="flex-row items-center gap-4">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-white">
                <Image
                  source={followRequestAvatar}
                  className="h-10 w-10 rounded-full"
                />
              </View>
              <View>
                <Text className="text-base font-semibold text-black">
                  Follow Requests
                </Text>
                <Text className="text-sm text-neutral-500">
                  Approve or ignore requests
                </Text>
              </View>
            </View>

            <View className="rounded-full bg-black px-3 py-1">
              <Text className="text-xs font-semibold text-white">5</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6 px-5">
          {notificationSections.map((section) => (
            <View key={section.title} className="mb-6">
              <Text className="mb-3 text-base font-semibold text-neutral-500">
                {section.title}
              </Text>

              <View className="rounded-3xl bg-white">
                {section.data.map((item, index) => (
                  <View
                    key={item.id}
                    className={`flex-row items-center gap-3 py-3 ${
                      index !== section.data.length - 1
                        ? "border-b border-neutral-100"
                        : ""
                    }`}
                  >
                    <View className="pl-1">
                      <Image
                        source={item.avatar}
                        className="h-12 w-12 rounded-full"
                      />
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm text-black">
                        <Text className="font-semibold">{item.userName}</Text>{" "}
                        {item.message}
                      </Text>
                      <Text className="mt-1 text-xs text-neutral-400">
                        {item.time}
                      </Text>

                      {item.highlight && (
                        <TouchableOpacity className="mt-2">
                          <Text className="text-xs font-semibold text-blue-500">
                            Reply
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>

                    {item.preview && (
                      <Image
                        source={item.preview}
                        className="mr-2 h-14 w-14 rounded-lg"
                      />
                    )}

                    {item.action && (
                      <TouchableOpacity
                        className={`mr-2 rounded-xl px-4 py-2 ${
                          item.action === "Follow"
                            ? "bg-[#3797EF]"
                            : "bg-neutral-100"
                        }`}
                      >
                        <Text
                          className={`text-sm font-semibold ${
                            item.action === "Follow"
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {item.action}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;
