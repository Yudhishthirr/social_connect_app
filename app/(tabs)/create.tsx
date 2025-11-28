import { Loader } from '@/components/common/Loader';
import { ImagePickerExample } from '@/components/common/PickImage';
import { useCreatePost } from '@/hooks/usePosts';
import { postSchema, PostSchemaType } from '@/validation/postSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Create = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(true);
  const isFocusedRef = useRef(false);

  // React Query mutation
  const { mutateAsync: createPostMutation, isPending } = useCreatePost();

  // React Hook Form
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<PostSchemaType>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      hashtags: '',
      postImage: ''
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (!selectedImage && !isFocusedRef.current) {
        isFocusedRef.current = true;
        setShowPicker(true);
      }

      return () => {
        isFocusedRef.current = false;
      };
    }, [selectedImage])
  );

  const handleImageSelected = (uri: string) => {
    setSelectedImage(uri);
    setShowPicker(false);
    isFocusedRef.current = false;
    setValue('postImage', uri);
  };

  const handleReset = () => {
    setSelectedImage(null);
    reset();
    isFocusedRef.current = false;
    setShowPicker(true);
  };

  const onSubmit = async (data: PostSchemaType) => {
    try {
      const result = await createPostMutation(data);

      if (result?.success) {
        Alert.alert('Success', 'Post created successfully!', [
          { text: 'OK', onPress: handleReset }
        ]);
        router.push('/(tabs)');
      } else {
        Alert.alert('Error', result?.message || 'Failed to create post');
      }
    } catch (error: any) {
      console.error('Post creation error:', error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    }
  };

  return (
    <SafeAreaProvider>
      {isPending && <Loader loadingText="Uploading..." />}
      <SafeAreaView className="flex-1 bg-white" edges={['top']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {showPicker && (
            <ImagePickerExample
              onImageSelected={handleImageSelected}
              onCancel={() => setShowPicker(false)}
              autoOpen={true}
            />
          )}

          {selectedImage ? (
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              {/* Header */}
              <View className="flex-row items-center justify-between px-4 py-3 border-b border-neutral-200">
                <TouchableOpacity onPress={handleReset} className="p-2">
                  <Text className="text-base text-black">Cancel</Text>
                </TouchableOpacity>

                <Text className="text-lg font-semibold text-black">New Post</Text>

                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  disabled={isPending}
                  className="p-2"
                >
                  <Text className={`text-base font-semibold ${isPending ? 'text-neutral-400' : 'text-[#0095f6]'}`}>
                    {isPending ? 'Sharing...' : 'Share'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Image Preview */}
              <View className="w-full aspect-square bg-neutral-100">
                <Image
                  source={{ uri: selectedImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Form */}
              <View className="p-4">

                {/* Title */}
                <View className="mb-6">
                  <Text className="text-base font-semibold text-black mb-2">Title</Text>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <View className="border border-neutral-200 rounded-lg">
                          <TextInput
                            className="px-3 py-3 text-base text-black min-h-[50px]"
                            placeholder="Write a title..."
                            placeholderTextColor="#999"
                            value={value}
                            onChangeText={onChange}
                            multiline
                            textAlignVertical="top"
                          />
                        </View>
                        {errors.title && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.title.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>

                {/* Hashtags */}
                <View className="mb-6">
                  <Text className="text-base font-semibold text-black mb-2">Hashtags</Text>
                  <Controller
                    control={control}
                    name="hashtags"
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <View className="border border-neutral-200 rounded-lg">
                          <TextInput
                            className="px-3 py-3 text-base text-black min-h-[50px]"
                            placeholder="#hashtag1 #hashtag2..."
                            placeholderTextColor="#999"
                            value={value}
                            onChangeText={onChange}
                            multiline
                            textAlignVertical="top"
                          />
                        </View>
                        {errors.hashtags && (
                          <Text className="text-red-500 text-xs mt-1">
                            {errors.hashtags.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>

              </View>
            </ScrollView>
          ) : (
            <View className="flex-1 justify-center items-center">
              <Text className="text-base text-neutral-400">Select an image to create a post</Text>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Create;
