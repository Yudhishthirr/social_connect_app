import { api } from "@/utils/api";
import { registerForPushNotifications } from "@/utils/registerPushToken";
import { useEffect } from "react";

export const usePushNotifications = (isAuthenticated: boolean) => {
  useEffect(() => {
    if (!isAuthenticated) return;

    const registerPush = async () => {
      try {
        const token = await registerForPushNotifications();
        if (token) {
          await api.post("/users/push-token", { token });
        }
      } catch (err) {
        console.log("Push token registration failed", err);
      }
    };

    registerPush();
  }, [isAuthenticated]);
};
