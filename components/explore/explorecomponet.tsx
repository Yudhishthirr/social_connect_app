import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../constants/colors";
const { width } = Dimensions.get("window");
const imageSize = (width - 4) / 3; // 3 columns with 2px gaps

// Sample data for the grid - using the provided images
const exploreImages = [
  { id: 1, image: require("../../assets/appimages/Rectangle (1).png") },
  { id: 2, image: require("../../assets/appimages/Gallery.png") },
  { id: 3, image: require("../../assets/appimages/image_explore.png") },
  { id: 4, image: require("../../assets/appimages/Rectangle (1).png") },
  { id: 5, image: require("../../assets/appimages/Gallery.png") },
  { id: 6, image: require("../../assets/appimages/image_explore.png") },
  { id: 7, image: require("../../assets/appimages/Rectangle (1).png") },
  { id: 8, image: require("../../assets/appimages/Gallery.png") },
  { id: 9, image: require("../../assets/appimages/image_explore.png") },
  { id: 10, image: require("../../assets/appimages/Rectangle (1).png") },
  { id: 11, image: require("../../assets/appimages/Gallery.png") },
  { id: 13, image: require("../../assets/appimages/image_explore.png") },
  { id: 14, image: require("../../assets/appimages/image_explore.png") },
  { id: 15, image: require("../../assets/appimages/image_explore.png") },
  { id: 16, image: require("../../assets/appimages/image_explore.png") },
  { id: 17, image: require("../../assets/appimages/image_explore.png") },
  { id: 18, image: require("../../assets/appimages/image_explore.png") },
];

const categories = [
  { id: "igtv", label: "IGTV", icon: "📺" },
  { id: "shop", label: "Shop", icon: "🛍️" },
  { id: "style", label: "Style", icon: "👗" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "auto", label: "Auto", icon: "🚗" },
  { id: "travel", label: "Travel", icon: "✈️" },
  { id: "food", label: "Food", icon: "🍕" },
];

const ExploreComponent = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("igtv");
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    // <View className="flex-1 bg-white">
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="px-4 py-3 bg-white">
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
          />
          <TouchableOpacity className="ml-2">
            <View className="w-6 h-6 bg-neutral-200 rounded items-center justify-center">
              <Text className="text-[12px]">📷</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-neutral-200"
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`mr-3 px-4 py-2 rounded-full h-10 ${
              selectedCategory === category.id
                ? "bg-black"
                : "bg-neutral-100"
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-[14px] mr-1">{category.icon}</Text>
              <Text
                className={`text-[13px] font-medium ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "text-black"
                }`}
              >
                {category.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Image Grid */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* <View className="flex-row flex-wrap"> */}
        <View className="flex-row flex-wrap">
          {exploreImages.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              style={{
                width: imageSize,
                height: imageSize,
                marginRight: index % 3 === 2 ? 0 : 2,
                marginBottom: 2,
              }}
            >
              <Image
                source={item.image}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreComponent;

