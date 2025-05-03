import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Montage': require('../assets/fonts/Montage-Demo.ttf'),
    'Poppins': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
