import { useCurrentUser } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
  | "username"
  | "firstName"
  | "lastName"
  | "email"
  | "dateOfBirth";

const profileImageFallback = require("../../assets/appimages/Inner Oval.png");

const EditProfile = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useCurrentUser();
  const user = data?.data;

  const [form, setForm] = useState<Record<EditableField, string>>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
  });

  // 🔹 Prefill form when API data arrives
  useEffect(() => {
    if (user) {
      const [firstName = "", lastName = ""] =
        user.fullName?.split(" ") ?? [];

      setForm({
        username: user.username ?? "",
        firstName,
        lastName,
        email: user.email ?? "",
        dateOfBirth: "",
      });
    }
  }, [user]);

  const handleChange = (field: EditableField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const fields: {
    label: string;
    key: EditableField;
    showCalendarIcon?: boolean;
  }[] = [
    { label: "Username", key: "username" },
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Date of Birth", key: "dateOfBirth", showCalendarIcon: true },
  ];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || !user) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="border-b border-neutral-200 px-4 py-3">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>

          <Text className="text-base font-semibold text-black">
            Edit Profile
          </Text>

          <View className="w-6" />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View className="items-center px-4 pt-6 pb-8">
          <View className="relative">
            <View className="h-28 w-28 overflow-hidden rounded-full">
              <Image
                source={
                  user.avatar
                    ? { uri: user.avatar }
                    : profileImageFallback
                }
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            <View className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full bg-black">
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </View>
        </View>

        {/* Inputs */}
        <View className="px-4">
          {fields.map((field) => (
            <View key={field.key} className="mb-6">
              <Text className="mb-2 text-sm font-medium text-neutral-700">
                {field.label}
              </Text>

              <View className="relative">
                <TextInput
                  className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-base text-black"
                  value={form[field.key]}
                  onChangeText={(value) =>
                    handleChange(field.key, value)
                  }
                  placeholder={field.label}
                  placeholderTextColor="#C7C7CC"
                  keyboardType={
                    field.key === "email" ? "email-address" : "default"
                  }
                />

                {field.showCalendarIcon && (
                  <View className="absolute right-4 top-0 bottom-0 justify-center">
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#8E8E93"
                    />
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Update Button */}
        <View className="mt-4 px-4">
          <TouchableOpacity
            className="rounded-lg bg-neutral-800 py-4"
            onPress={() => {
              // 🔥 later: call updateProfile mutation
              console.log("Updated values:", form);
              router.back();
            }}
          >
            <Text className="text-center text-base font-semibold uppercase text-white">
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
