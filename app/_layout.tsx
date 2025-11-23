import { getCurrentUser } from "@/services/authService";
import { store } from "@/store";
import { setCredentials } from "@/store/slices/authSlice";
import { Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import "../global.css";


function RootLayoutContent() {

  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadAuthState = async () => {
    try {
     
      const token = await SecureStore.getItemAsync("accessToken");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      
      const res = await getCurrentUser();
      console.log("get user called ");

      if (res.success) {
        dispatch(
          setCredentials({
            user: res.data,
            token: token,
          })
        );

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log("Auto-login failed:", err);
      setIsAuthenticated(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAuthState();
  }, []);

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)/login" />
      )}
    </Stack>
  );
}

// -----------------------------
//  ROOT WITH PROVIDER
// -----------------------------
export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
