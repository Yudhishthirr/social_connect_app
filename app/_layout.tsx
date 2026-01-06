// // import { useNotificationTap } from "@/hooks/useNotificationTap";
// // import { usePushNotifications } from "@/hooks/usePushNotifications";
// import { getCurrentUser } from "@/services/authService";
// import { store } from "@/store";
// import { setCredentials } from "@/store/slices/authSlice";
// import { queryClient } from "@/utils/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Stack } from "expo-router";
// import * as SecureStore from "expo-secure-store";
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from "react";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider, useDispatch } from "react-redux";
// import "../global.css";





// function RootLayoutContent() {

//   const dispatch = useDispatch();

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // usePushNotifications(isAuthenticated);
//   // useNotificationTap();
  
//   const loadAuthState = async () => {
//     try {
     
//       const token = await SecureStore.getItemAsync("accessToken");
//       console.log("token form the root page");
//       console.log(token);
      
//       if (!token) {
//         setIsAuthenticated(false);
//         setLoading(false);
//         return;
//       }

      
//       const res = await getCurrentUser();

//       console.log("get user called from the root page",res);

//       if (res.success) {
//         dispatch(
//           setCredentials({
//             user: res.data,
//             token: token,
//           })
//         );

//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }
//     } catch (err) {
//       console.log("Auto-login failed:", err);
//       setIsAuthenticated(false);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     loadAuthState();
//   }, []);

//   if (loading) return null;

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
       
//       {isAuthenticated ? (
//       <>
//         <Stack.Screen name="(tabs)" />
//         <Stack.Screen name="chat" />
//       </>
       
//       ) : (
//         <Stack.Screen name="(auth)/login" />
//       )}
//     </Stack>
//   );
// }

// // -----------------------------
// //  ROOT WITH PROVIDER
// // -----------------------------
// export default function RootLayout() {
//   return (
//     // <Provider store={store}>
//     //    <QueryClientProvider client={queryClient}>
//     //       <StatusBar style="dark" />
//     //       {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
//     //           <RootLayoutContent />
//     //       {/* </GestureHandlerRootView> */}
//     //   </QueryClientProvider>
//     // </Provider>
//      <SafeAreaProvider>
//       <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <StatusBar style="dark" />
//           <Stack screenOptions={{ headerShown: false }} />
//         </QueryClientProvider>
//       </Provider>
//     </SafeAreaProvider>
//   );
// }

// app/_layout.tsx

import { store } from "@/store";
import { queryClient } from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }} />
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
