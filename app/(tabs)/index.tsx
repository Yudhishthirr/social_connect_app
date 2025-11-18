import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppHeader } from "../../components/common/AppHeader";
import Feed from "../../components/feed/Feed";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        <AppHeader />
        <Feed />
      </View>
    </SafeAreaProvider>
  );
}