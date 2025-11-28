import { AppHeader } from "@/components/common/AppHeader";
import Feed from "@/components/feed/Feed";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {/* <Text>Hello World</Text> */}
        <AppHeader />
        <Feed />
      </View>
    </SafeAreaProvider>
  );
}