import { Link, useRouter } from "expo-router";
import {
  Alert,
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

import { loginSchema, LoginSchemaType } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useAuth } from "@/hooks/useAuth";
import { socket } from "@/socket/socket";
const LoginScreen = () => {


  const router = useRouter();
 
  const { login } = useAuth();
  
  // React Hook Form Setup
  const {control,handleSubmit,formState: { errors, isSubmitting },} = useForm<LoginSchemaType>({resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit =   async (data: LoginSchemaType) => {
    try {
      const res = await login(data);
      
      console.log("user is",res.data.user._id)
      if (res.success) {
        socket.connect();
        socket.emit("join", res.data.user._id);  // VERY IMPORTANT
        router.replace("/(tabs)"); // Go to home screen
      } else {
        Alert.alert("Error", res.message || "Invalid credentials");
      }
    } catch (err: any) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("Network/Unknown Error ➜", err.message);
      }
    }
  };

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
            <View className="mt-10 gap-4">

              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <View className="border border-neutral-200 rounded-lg bg-neutral-50">
                      <TextInput
                        placeholder="Email"
                        placeholderTextColor="#a1a1aa"
                        className="h-12 px-4 text-[15px] text-black font-medium"
                        autoCapitalize="none"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
                    {errors.email && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Password */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View>
                    <View className="border border-neutral-200 rounded-lg bg-neutral-50">
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#a1a1aa"
                        secureTextEntry
                        className="h-12 px-4 text-[15px] text-black"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
                    {errors.password && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors.password.message}
                      </Text>
                    )}
                  </View>
                )}
              />

              {/* Forgot password */}
              <TouchableOpacity 
                className="self-end mt-1" 
               
              >
                <Text className="text-xs font-semibold text-[#3797EF]">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className={`h-12 rounded-lg items-center justify-center ${
                  isSubmitting ? "bg-[#B9DFFC]" : "bg-[#3797EF]"
                }`}
              >
                <Text className="text-white text-base font-semibold">
                  {isSubmitting ? "Logging in..." : "Log in"}
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

            {/* Sign up link */}
            <View className="items-center">
              <Link href="/(auth)/register">
                <Text className="text-sm text-neutral-500">
                  Don&apos;t have an account?{" "}
                  <Text className="text-[#3797EF] font-semibold">Sign up.</Text>
                </Text>
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
