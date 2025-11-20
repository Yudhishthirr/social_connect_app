import { Feather } from "@expo/vector-icons";
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STORY_PROGRESS = [1, 0.4, 0];
const storyImage = require("../../assets/appimages/Rectangle (1).png");
const storyAvatar = require("../../assets/appimages/Inner Oval.png");

const StoryView = () => {
  return (
    <View className="flex-1 bg-black">
      <ImageBackground source={storyImage} className="flex-1" resizeMode="cover">
        <View className="flex-1">
          <View
            pointerEvents="none"
            className="bg-black/40"
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
          />

          <SafeAreaView className="flex-1 justify-between px-4 py-3">
            <View>
              <View className="flex-row gap-1">
                {STORY_PROGRESS.map((value, index) => (
                  <View
                    key={`progress-${index}`}
                    className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
                  >
                    <View
                      className="h-full bg-white"
                      style={{ width: `${Math.min(value, 1) * 100}%` }}
                    />
                  </View>
                ))}
              </View>

              <View className="mt-4 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <Image
                    source={storyAvatar}
                    className="h-10 w-10 rounded-full border-2 border-white/70"
                  />
                  <View>
                    <Text className="text-base font-semibold text-white">craig_love</Text>
                    <Text className="text-xs text-white/70">6h</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-5">
                  <Feather name="more-horizontal" size={26} color="#FFFFFF" />
                  <Feather name="x" size={26} color="#FFFFFF" />
                </View>
              </View>
            </View>

            <View className="mb-1 flex-row items-center gap-3">
              <TouchableOpacity
                className="rounded-full bg-white/15 p-3"
                activeOpacity={0.8}
              >
                <Feather name="heart" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 flex-row items-center justify-between rounded-full border border-white/30 bg-black/40 px-5 py-3"
                activeOpacity={0.85}
              >
                <Text className="text-sm text-white/80">Send Message</Text>
                <Feather name="smile" size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded-full bg-white/15 p-3"
                activeOpacity={0.8}
              >
                <Feather name="send" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StoryView;
