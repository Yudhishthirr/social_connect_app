import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useImagePicker } from "@/hooks/useImagePicker";
import { registerUser } from "@/services/authService";
import { step1Schema, step2Schema, step3Schema } from "@/validation/authSchema";
// ----------------------------------
// ZOD SCHEMAS
// ----------------------------------
const Step1Schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  username: z.string().min(3, "Username required"),
  email: z.string().email("Invalid email"),
});

const Step2Schema = z.object({
  password: z.string().min(6, "Min 6 characters"),
});

const Step3Schema = z.object({
  gender: z.string().min(1, "Select gender"),
});

// ----------------------------------
// MAIN COMPONENT
// ----------------------------------
export default function RegisterScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const [step, setStep] = useState(1);

  // stores all onboarding data
  const [onboardData, setOnboardData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    AvtarImage: "",
  });

  const step1Form = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: onboardData.fullName || "",
      username: onboardData.username || "",
      email: onboardData.email || "",
    },
  });

  // Step 2 form
  const step2Form = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      password: onboardData.password || "",
    },
  });

  const step3Form = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      gender: onboardData.gender || "",
    },
  });

  const { pickImage } = useImagePicker();
 

  // FINAL SUBMIT
  const submitFinal = async () => {
    console.log("onboardData data");
    console.log(onboardData);
  
    try {
      setIsLoading(true);   // 🔥 Start loading
  
      const result = await registerUser(onboardData);
  
      if (result.success) {
        Alert.alert("Success", "Your account has been created!");
        router.replace("/(auth)/login");
      } else {
        Alert.alert("Error", result.message || "Something went wrong");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setIsLoading(false);  // 🔥 End loading
    }
  };
  
  // ----------------------------------
  // UI STARTS
  // ----------------------------------
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingTop: 20,
          paddingBottom: 40,
        }}
      >
        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={require("../../assets/appimages/InstagramLogo.png")}
            className="h-12 w-40"
            resizeMode="contain"
          />
        </View>

        {/* Progress Indicator */}
        <View className="flex-row justify-center mb-8 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= step ? "bg-[#3797EF]" : "bg-neutral-200"
              }`}
            />
          ))}
        </View>

        {/* TITLE */}
        <Text className="text-2xl font-bold mb-2 text-neutral-900">
          {step === 1 && "Create your account"}
          {step === 2 && "Create a password"}
          {step === 3 && "Select your gender"}
          {step === 4 && "Add a profile photo"}
        </Text>

        {/* Subtitle */}
        <Text className="text-sm text-neutral-500 mb-8">
          {step === 1 && "Let's get started with your basic information"}
          {step === 2 && "Choose a secure password for your account"}
          {step === 3 && "This helps us personalize your experience"}
          {step === 4 && "Choose a photo that represents you"}
        </Text>

        {/* =============================================================
            STEP 1 — BASIC INFO
        ============================================================= */}
        {step === 1 && (
          <View className="gap-4">
            <Controller
              control={step1Form.control}
              name="fullName"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </Text>
                  <TextInput
                    placeholder="Enter your full name"
                    className="border border-neutral-300 bg-white rounded-xl h-14 px-4 text-base"
                    value={value}
                    onChangeText={onChange}
                  />
                  {step1Form.formState.errors.fullName && (
                    <Text className="text-red-500 text-xs mt-1">
                      {step1Form.formState.errors.fullName.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={step1Form.control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="text-sm font-medium text-neutral-700 mb-2">
                    Username
                  </Text>
                  <TextInput
                    placeholder="Choose a username"
                    className="border border-neutral-300 bg-white rounded-xl h-14 px-4 text-base"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="none"
                  />
                  {step1Form.formState.errors.username && (
                    <Text className="text-red-500 text-xs mt-1">
                      {step1Form.formState.errors.username.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={step1Form.control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="text-sm font-medium text-neutral-700 mb-2">
                    Email
                  </Text>
                  <TextInput
                    placeholder="Enter your email"
                    className="border border-neutral-300 bg-white rounded-xl h-14 px-4 text-base"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {step1Form.formState.errors.email && (
                    <Text className="text-red-500 text-xs mt-1">
                      {step1Form.formState.errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              className="bg-[#3797EF] h-14 rounded-xl justify-center items-center mt-6 shadow-sm"
              onPress={step1Form.handleSubmit((data) => {
                setOnboardData((prev) => ({ ...prev, ...data }));
                setStep(2);
              })}
            >
              <Text className="text-white font-semibold text-base">Next</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =============================================================
            STEP 2 — PASSWORD
        ============================================================= */}
        {step === 2 && (
          <View className="gap-4">
            <Controller
              control={step2Form.control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text className="text-sm font-medium text-neutral-700 mb-2">
                    Password
                  </Text>
                  <TextInput
                    placeholder="Create a password"
                    secureTextEntry
                    className="border border-neutral-300 bg-white rounded-xl h-14 px-4 text-base"
                    value={value}
                    onChangeText={onChange}
                  />
                  <Text className="text-xs text-neutral-500 mt-1">
                    Must be at least 6 characters
                  </Text>
                  {step2Form.formState.errors.password && (
                    <Text className="text-red-500 text-xs mt-1">
                      {step2Form.formState.errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <View className="flex-row justify-between mt-6 gap-3">
              <TouchableOpacity
                className="flex-1 h-14 border-2 border-neutral-300 rounded-xl items-center justify-center"
                onPress={() => setStep(1)}
              >
                <Text className="font-semibold text-neutral-700">Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-[#3797EF] h-14 rounded-xl items-center justify-center shadow-sm"
                onPress={step2Form.handleSubmit((data) => {
                  setOnboardData((prev) => ({ ...prev, ...data }));
                  setStep(3);
                })}
              >
                <Text className="text-white font-semibold text-base">Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* =============================================================
            STEP 3 — GENDER
        ============================================================= */}
        {step === 3 && (
          <View>
            {["male", "female"].map((g) => (
              <TouchableOpacity
                key={g}
                onPress={() => {
                  setOnboardData((prev) => ({ ...prev, gender: g }));
                  setStep(4);
                }}
                className={`h-14 border-2 rounded-xl justify-center px-4 mb-3 ${
                  onboardData.gender === g
                    ? "bg-[#3797EF] border-[#3797EF]"
                    : "bg-white border-neutral-300"
                }`}
              >
                <Text
                  className={`font-medium ${
                    onboardData.gender === g
                      ? "text-white"
                      : "text-neutral-700"
                  }`}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="mt-6 h-14 border-2 border-neutral-300 rounded-xl items-center justify-center"
              onPress={() => setStep(2)}
            >
              <Text className="font-semibold text-neutral-700">Previous</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =============================================================
            STEP 4 — PROFILE PICTURE
        ============================================================= */}
        {step === 4 && (
          <View className="items-center">
            <TouchableOpacity 
             onPress={async () => {
              const uri = await pickImage();
              if (uri) {
                setOnboardData((prev) => ({ ...prev, AvtarImage: uri }));
              }
            }}
            
            className="mb-4">
              {onboardData.AvtarImage ? (
                <Image
                  source={{ uri: onboardData.AvtarImage }}
                  className="h-32 w-32 rounded-full border-4 border-[#3797EF]"
                />
              ) : (
                <View className="h-32 w-32 rounded-full bg-neutral-100 border-2 border-dashed border-neutral-300 justify-center items-center">
                  <Text className="text-neutral-400 font-medium">
                    Tap to select
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            <Text className="text-sm text-neutral-500 text-center mb-8">
              This is optional. You can skip or add it later.
            </Text>

            <View className="flex-row justify-between w-full gap-3">

              <TouchableOpacity
                className={`flex-1 h-14 border-2 rounded-xl items-center justify-center
                  ${isLoading ? "border-neutral-200 bg-neutral-100" : "border-neutral-300"}`}
                onPress={() => !isLoading && setStep(3)}
                disabled={isLoading}
              >
                <Text
                  className={`font-semibold ${
                    isLoading ? "text-neutral-400" : "text-neutral-700"
                  }`}
                >
                  Previous
                </Text>
              </TouchableOpacity>


             
              <TouchableOpacity
                className="flex-1 h-14 bg-[#3797EF] rounded-xl items-center justify-center shadow-sm"
                onPress={submitFinal}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-semibold text-base">Finish</Text>
                )}
              </TouchableOpacity>

            </View>
          </View>
        )}

        {/* Spacer to push footer down */}
        <View className="flex-1" />

        {/* Footer - Only show on step 1 */}
        {step === 1 && (
          <>
            {/* Divider */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-px bg-neutral-200" />
              <Text className="mx-3 text-xs font-semibold text-neutral-400">
                OR
              </Text>
              <View className="flex-1 h-px bg-neutral-200" />
            </View>

            {/* Login Link */}
            <View className="items-center">
              <Link href="/(auth)/login">
                <Text className="text-sm text-neutral-600">
                  Have an account?{" "}
                  <Text className="text-[#3797EF] font-semibold">Log in.</Text>
                </Text>
              </Link>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}