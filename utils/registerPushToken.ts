import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

export const registerForPushNotifications = async (): Promise<string | null> => {
  if (!Device.isDevice) {
    console.log("❌ Push notifications require a physical device");
    return null;
  }

  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("❌ Notification permission not granted");
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("📲 Expo Push Token:", token);

  return token;
};
