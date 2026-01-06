// import * as Notifications from "expo-notifications";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";

// export const useNotificationTap = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
//         const data = response.notification.request.content.data;
//         console.log("data from notification tap",data);
//         if (data?.type === "FOLLOW_REQUEST") {
//           router.push("/(tabs)/profile");
//         }
//       }
//     );

//     return () => subscription.remove();
//   }, []);
// };



// import * as Notifications from "expo-notifications";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";

// export const useNotificationTap = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const subscription =
//       Notifications.addNotificationResponseReceivedListener(
//         (response) => {
//           const data = response.notification.request.content.data;
//           console.log("data from notification tap",data);
//           if (!data?.type) return;

//           switch (data.type) {
//             case "FOLLOW_REQUEST":
//               if (data.senderId) {
//                 // router.push(`/profile/${data.senderId}`);
//                 router.push("/(tabs)/notifications");
//               }
//               break;

//             default:
//               console.log("Unknown notification type", data);
//           }
//         }
//       );

//     return () => subscription.remove();
//   }, []);
// };


import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useNotificationTap = () => {
  const router = useRouter();

  useEffect(() => {
    // 1️⃣ Handle COLD START (app was killed)
    const handleColdStart = async () => {
      const response =
        await Notifications.getLastNotificationResponseAsync();

      if (!response) return;

      const data = response.notification.request.content.data;
      console.log("📦 Cold start notification data:", data);

      handleNavigation(data);
    };

    handleColdStart();

    // 2️⃣ Handle normal taps (background / foreground)
    const subscription =
      Notifications.addNotificationResponseReceivedListener(
        (response) => {
          const data = response.notification.request.content.data;
          console.log("📦 Notification tap data:", data);

          handleNavigation(data);
        }
      );

    return () => subscription.remove();
  }, []);

  const handleNavigation = (data: any) => {
    if (!data?.type) return;
    
    switch (data.type) {
      case "FOLLOW_REQUEST":
        router.push("/(tabs)/notifications");
        break;

      default:
        console.log("Unknown notification type", data);
    }
  };
};
