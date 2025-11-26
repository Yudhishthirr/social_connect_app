// components/common/Loader.tsx
import { ActivityIndicator, Text, View } from "react-native";

type LoaderProps = {
  loadingText?: string;
};

export const Loader = ({loadingText}:LoaderProps) => {
  return (
    <View className="absolute inset-0 bg-black/40 justify-center items-center z-50">
      <ActivityIndicator size="large" color="#fff" />
      <Text className="text-white mt-3 text-base">{loadingText}</Text>
    </View>
  );
};
