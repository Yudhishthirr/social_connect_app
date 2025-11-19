import { Tabs } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import { icons } from "../../constants/icons";

function TabIcon({ focused, icon }: { focused: boolean; icon: any }) {
  return (
    <View style={styles.tabIconContainer}>
      {focused && <View style={styles.indicator} />}
      <Image 
        source={icon} 
        // tintColor="#FFFFFF" 
        style={styles.tabIcon}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 0,
        },
        tabBarStyle: {
          // backgroundColor: "#000000",
          height: 60,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home2} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search2} />
          ),
        }}
      />

      <Tabs.Screen
        name="reels"
        options={{
          title: "reel",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.notification} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} />
          ),
        }}
      />

      
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  indicator: {
    position: "absolute",
    top: 0,
    width: 30,
    height: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});