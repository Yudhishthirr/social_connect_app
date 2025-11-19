import { Link } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = username.trim().length > 0 && password.trim().length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-4 pb-8">
            
            {/* Logo */}
            <View className="items-center mt-40">
              <Image
                source={require("../../assets/appimages/InstagramLogo.png")}
                className="h-14 w-48"
                resizeMode="contain"
              />
            </View>

            {/* Form */}
            <View className="mt-10 space-y-4 gap-4">
              <View className="border border-neutral-200 rounded-lg bg-neutral-50 ">
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="Username"
                  placeholderTextColor="#a1a1aa"
                  className="h-12 px-4 text-[15px] text-black font-medium"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View className="border border-neutral-200 rounded-lg bg-neutral-50">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#a1a1aa"
                  secureTextEntry
                  className="h-12 px-4 text-[15px] text-black"
                />
              </View>

              <TouchableOpacity className="self-end mt-1">
                <Text className="text-xs font-semibold text-[#3797EF]">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                className={`h-12 rounded-lg items-center justify-center ${
                  canSubmit ? "bg-[#3797EF]" : "bg-[#B9DFFC]"
                }`}
              >
                <Text className="text-white text-base font-semibold">
                  Log in
                </Text>
              </TouchableOpacity>

            
            </View>

            {/* Divider */}
            <View className="flex-row items-center my-10 px-4">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text className="mx-3 text-xs font-semibold text-neutral-400">
                OR
              </Text>
              <View className="flex-1 h-px bg-neutral-200" />
            </View>

            {/* Sign up */}
            <View className="items-center" >
            <Link href="/(auth)/register">
              <Text className="text-sm text-neutral-500">
                Don&apos;t have an account?{" "}
                <Text className="text-[#3797EF] font-semibold">Sign up.</Text>
              </Text>
            </Link>
            </View>
          </View>

          {/* Bottom bar */}
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
