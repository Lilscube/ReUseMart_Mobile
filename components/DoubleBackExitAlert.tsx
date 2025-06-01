import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { Alert, BackHandler, Platform, ToastAndroid } from "react-native";

export function useDoubleBackExit() {
  const backPressedOnce = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (Platform.OS === "ios") {
          Alert.alert("Keluar Aplikasi", "Apakah kamu yakin ingin keluar?", [
            { text: "Batal", style: "cancel" },
            { text: "Keluar", onPress: () => BackHandler.exitApp() },
          ]);
          return true;
        }

        if (backPressedOnce.current) {
          BackHandler.exitApp();
        } else {
          backPressedOnce.current = true;
          ToastAndroid.show("Tekan sekali lagi untuk keluar", ToastAndroid.SHORT);

          timeoutRef.current = setTimeout(() => {
            backPressedOnce.current = false;
          }, 2000);
        }

        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        subscription.remove();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [])
  );
}