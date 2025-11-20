import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type EditableField =
  | "name"
  | "username"
  | "website"
  | "bio"
  | "email"
  | "phone"
  | "gender";

const profileImage = require("../../assets/appimages/Inner Oval.png");

const EditProfile = () => {
  const router = useRouter();
  const [form, setForm] = useState<Record<EditableField, string>>({
    name: "Jacob West",
    username: "jacob_w",
    website: "",
    bio: "Digital goodies designer @pixsellz\nEverything is designed.",
    email: "jacob.west@gmail.com",
    phone: "+1 202 555 0147",
    gender: "Male",
  });

  const handleChange = (field: EditableField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const primaryFields: { label: string; key: EditableField; multiline?: boolean }[] = [
    { label: "Name", key: "name" },
    { label: "Username", key: "username" },
    { label: "Website", key: "website" },
    { label: "Bio", key: "bio", multiline: true },
  ];

  const privateFields: { label: string; key: EditableField }[] = [
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Gender", key: "gender" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="border-b border-neutral-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Text className="text-base font-semibold text-neutral-500">Cancel</Text>
          </TouchableOpacity>

          <Text className="text-base font-semibold text-black">Edit Profile</Text>

          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Text className="text-base font-semibold text-sky-500">Done</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center border-b border-neutral-100 px-4 py-6">
          <View className="h-28 w-28 overflow-hidden rounded-full">
            <Image source={profileImage} className="h-full w-full" resizeMode="cover" />
          </View>

          <TouchableOpacity className="mt-4" activeOpacity={0.7}>
            <Text className="text-sm font-semibold text-sky-500">Change Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View className="px-4">
          {primaryFields.map((field) => (
            <View key={field.key} className="flex-row border-b border-neutral-100 py-4">
              <Text className="w-28 text-base font-medium text-neutral-500">
                {field.label}
              </Text>
              <TextInput
                className={`flex-1 text-base text-black ${field.multiline ? "leading-6" : ""}`}
                multiline={field.multiline}
                value={form[field.key]}
                onChangeText={(value) => handleChange(field.key, value)}
                placeholder={field.label}
                placeholderTextColor="#C7C7CC"
              />
            </View>
          ))}
        </View>

        <TouchableOpacity className="px-4 py-5" activeOpacity={0.7}>
          <Text className="text-sm font-semibold text-sky-500">
            Switch to Professional Account
          </Text>
        </TouchableOpacity>

        <View className="px-4">
          <Text className="text-xs font-semibold uppercase tracking-[1px] text-neutral-500">
            Private Information
          </Text>
        </View>

        <View className="mt-3 px-4">
          {privateFields.map((field, index) => (
            <View
              key={field.key}
              className={`flex-row items-center py-4 ${
                index !== privateFields.length - 1 ? "border-b border-neutral-100" : ""
              }`}
            >
              <Text className="w-28 text-base font-medium text-neutral-500">
                {field.label}
              </Text>
              <TextInput
                className="flex-1 text-base text-black"
                value={form[field.key]}
                onChangeText={(value) => handleChange(field.key, value)}
                placeholder={field.label}
                placeholderTextColor="#C7C7CC"
                keyboardType={field.key === "phone" ? "phone-pad" : "default"}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

