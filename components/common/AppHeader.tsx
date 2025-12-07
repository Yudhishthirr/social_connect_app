import { icons } from "@/constants/icons";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../constants/colors";
const AppHeader = () => {
  
  const router = useRouter();

  return (
    <SafeAreaView
      edges={['top']}  // Only apply safe area to top
      className="bg-white"
    >
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{ borderBottomWidth: 1, borderBottomColor: colors.borderSubtle }}
      >
        <TouchableOpacity className="p-2 -ml-2">
          <Image
            source={icons.camera}
            className="h-7 w-7"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={icons.InstagramLogo}
          className="h-7 w-28"
          resizeMode="contain"
        />

        <View className="flex-row items-center">
          <TouchableOpacity className="p-2 -mr-2" onPress={() => router.push("/chat")}>
            <Image
              source={icons.share}
              className="h-6 w-6"
              resizeMode="contain"
              
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export { AppHeader };

