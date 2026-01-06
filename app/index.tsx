import { Redirect } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "@/services/authService";
import { setCredentials } from "@/store/slices/authSlice";

export default function Index() {
  const dispatch = useDispatch();

  const [ready, setReady] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const bootstrapAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("accessToken");

        // ❌ No token → go login
        if (!token) {
          setLoggedIn(false);
          setReady(true);
          return;
        }

        // ✅ Token exists → validate + hydrate user
        const res = await getCurrentUser();

        if (res?.success && res?.data) {
          dispatch(
            setCredentials({
              user: res.data,
              token,
            })
          );
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.log("Auth bootstrap failed:", err);
        setLoggedIn(false);
      } finally {
        setReady(true);
      }
    };

    bootstrapAuth();
  }, []);

  if (!ready) return null;

  return loggedIn
    ? <Redirect href="/(tabs)" />
    : <Redirect href="/(auth)/login" />;
}
