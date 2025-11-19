import { Stack } from "expo-router";
import { useState } from "react";
import "../global.css";

export default function RootLayout() {

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true);

  

 
  return (

    <Stack screenOptions={{ headerShown: false }}>
      {isAuthenticated ? 
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Home",
            headerTitleAlign: "center", 
            headerShown:false
        }}
      />: 
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      }
      

   
    </Stack>
  );
}
