import { colors } from "@/constants/colors";
import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import {  } from "@/hooks/useDebounce";
import { useDebounce, useUserSearch } from "@/hooks/useUserSearch";
import { router } from "expo-router";

const ExploreComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data, isFetching } = useUserSearch(debouncedQuery);

  const users = data?.users ?? [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 🔍 Search Input */}
      <View className="px-4 py-3">
        <View
          className="flex-row items-center bg-neutral-100 rounded-lg px-3 py-2"
          style={{ borderWidth: 1, borderColor: colors.borderSubtle }}
        >
          <Text className="text-neutral-400 mr-2">🔍</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-[14px] text-black"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* 🧑 USER SEARCH RESULTS */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          isFetching ? (
            <Text className="px-4 py-2 text-gray-400">Searching…</Text>
          ) : null
        }
        ListEmptyComponent={
          debouncedQuery.length >= 2 && !isFetching ? (
            <Text className="px-4 py-4 text-gray-400">
              No users found
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/profile/[userId]",
              params: { userId: item._id },
            });
            // onClose();
          }}
            activeOpacity={0.7}
            className="flex-row items-center px-4 py-3"
          >
            {/* Avatar */}
            <Image
              source={{ uri: item.avatar }}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                marginRight: 12,
                backgroundColor: "#e5e7eb",
              }}
            />

            {/* User Info */}
            <View style={{ flex: 1 }}>
              <Text className="font-semibold text-black">
                {item.username}
              </Text>
              <Text className="text-gray-500 text-[13px]">
                {item.fullName}
              </Text>
            </View>

            {/* Private Icon */}
            {item.accountType === "private" && (
              <Text className="text-gray-400 text-[14px]">🔒</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default ExploreComponent;
