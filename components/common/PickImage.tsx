import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef } from 'react';
import { Alert } from 'react-native';

interface ImagePickerExampleProps {
  onImageSelected: (uri: string) => void;
  onCancel?: () => void;
  autoOpen?: boolean;
}

function ImagePickerExample({ onImageSelected, onCancel, autoOpen = false }: ImagePickerExampleProps) {
  const hasOpenedRef = useRef(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      if (onCancel) onCancel();
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onImageSelected(result.assets[0].uri);
    } else {
      if (onCancel) onCancel();
    }
  };

  useEffect(() => {
    if (autoOpen && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      pickImage();
    }
  }, [autoOpen]);

  return null;
}

export { ImagePickerExample };

