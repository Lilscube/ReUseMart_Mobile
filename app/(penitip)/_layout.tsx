import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Home, PackageOpen, User } from "lucide-react-native";
import { StyleSheet, Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "transparent",
          elevation: 10,
          height: 100,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Regular",
          fontSize: 12,
          marginBottom: 8,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff",
        tabBarIcon: ({ color }) => {
          switch (route.name) {
            case "home":
              return <Home color={color} size={24} />;
            case "barang":
              return <PackageOpen color={color} size={24} />;
            case "profile":
              return <User color={color} size={24} />;
            default:
              return null;
          }
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              fontFamily: focused ? "Poppins-Semibold" : "Poppins-Regular",
              fontSize: 12,
              marginBottom: 8,
              color: "#fff",
            }}
          >
            {getTabLabel(route.name)}
          </Text>
        ),

        headerShown: false,
        tabBarBackground: () => (
          <LinearGradient
            colors={["#26C2FF", "#220593"]}
            locations={[0.01, 0.9]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Beranda" }} />
      <Tabs.Screen name="barang" options={{ title: "Merchandise" }} />
      <Tabs.Screen name="profile" options={{ title: "Profil" }} />
    </Tabs>
  );
}

const getTabLabel = (routeName: string) => {
  switch (routeName) {
    case "home":
      return "Beranda";
    case "barang":
      return "Barang Titipan";
    case "profile":
      return "Profil";
    default:
      return "";
  }
};
