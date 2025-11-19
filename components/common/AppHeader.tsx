import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from "../../constants/colors";

const AppHeader = () => {
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
            source={require("../../assets/icons/camera.png")}
            className="h-7 w-7"
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Image
          source={require("../../assets/icons/InstagramLogo.png")}
          className="h-7 w-28"
          resizeMode="contain"
        />

        <View className="flex-row items-center">
          {/* <TouchableOpacity className="p-2 mr-1">
            <Image
              source={require("../../assets/icons/IGTV.png")}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity> */}
          <TouchableOpacity className="p-2 -mr-2">
            <Image
              source={require("../../assets/icons/share.png")}
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

