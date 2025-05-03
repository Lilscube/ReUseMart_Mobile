import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70, // Tinggi lebih besar agar semua icon dan label tidak tertutup
          position: 'absolute',
          bottom: 0,
          borderTopWidth: 0,
          elevation: 10, // Tambah bayangan di Android
          shadowColor: '#000', // Tambah shadow untuk iOS
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
        tabBarActiveTintColor: '#26C2FF',
        tabBarInactiveTintColor: '#fff',
        tabBarIcon: ({ color, focused }) => {
          if (route.name === 'home') {
            return (
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            );
          } else if (route.name === 'claim') {
            return (
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={24}
                color={color}
              />
            );
          } else if (route.name === 'profile') {
            return (
              <Ionicons
                name={focused ? 'person' : 'person-outline'}
                size={24}
                color={color}
              />
            );
          }
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="claim" options={{ title: 'Claim' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
