import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { IconSet, sections } from "@/constants/settingOptoins";



const iconColor = "#111827";
const metaColor = "#6B7280";
const chevronColor = "#9CA3AF";

const SettingsScreen = () => {
  const { settingId } = useLocalSearchParams();
  const activeId = useMemo(
    () => (typeof settingId === "string" ? settingId : undefined),
    [settingId]
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <View className="px-5 pt-2 pb-4">
          <Text className="text-2xl font-bold text-black">Settings and activity</Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} className="mb-3">
            <Text className="px-5 pb-2 text-base font-semibold text-neutral-500">
              {section.title}
            </Text>

            <View className="bg-white">
              {section.items.map((item, index) => {
                const isLast = index === section.items.length - 1;
                const isActive = activeId === item.id;
                return (
                  <Pressable
                    key={item.id}
                    android_ripple={{ color: "#E5E7EB" }}
                    className={`flex-row items-center justify-between px-5 py-4 ${!isLast ? "border-b border-neutral-200" : ""} ${isActive ? "bg-neutral-50" : ""}`}
                  >
                    <View className="flex-row items-center">
                      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white">
                        <SettingIcon set={item.icon.set} name={item.icon.name} />
                      </View>
                      <Text className="text-[16px] font-medium text-black">{item.label}</Text>
                    </View>

                    <View className="flex-row items-center">
                      {item.meta ? (
                        <Text className="mr-2 text-base font-medium" style={{ color: metaColor }}>
                          {item.meta}
                        </Text>
                      ) : null}
                      <Feather name="chevron-right" size={22} color={chevronColor} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
       <TouchableOpacity
        className="w-full py-4 border-t border-neutral-300"
        >
        <Text className="text-red-500 text-center text-base font-semibold">
            Log Out
        </Text>
        </TouchableOpacity>


      </ScrollView>
    </SafeAreaView>
  );
};

type SettingIconProps = {
  set: IconSet;
  name: string;
};

const SettingIcon = ({ set, name }: SettingIconProps) => {
  if (set === "MaterialIcons") {
    return <MaterialIcons name={name as any} size={22} color={iconColor} />;
  }
  return <Feather name={name as any} size={22} color={iconColor} />;
};

export default SettingsScreen;