import { Image, Text, TouchableOpacity, View } from "react-native";

interface StoryEditorProps {
  image: string;
  onClose: () => void;
}

export default function StoryEditor({ image, onClose }: StoryEditorProps) {
  return (
    <View className="absolute inset-0 bg-black z-50">
      <Image
        source={{ uri: image }}
        className="w-full h-full"
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={onClose}
        className="absolute top-10 left-5 bg-white/20 p-3 rounded-full"
      >
        <Text className="text-white text-lg">✕</Text>
      </TouchableOpacity>
    </View>
  );
}
