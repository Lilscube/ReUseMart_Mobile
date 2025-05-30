import { BASE_URL_MOBILE } from "@/context/config";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export async function getCurrentUser() {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) throw new Error("Token not found");

    const res = await fetch(`${BASE_URL_MOBILE}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to fetch user data");
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw new Error("Failed to get current user");
  }
}

export function useAuthRedirect(setUser: (user: UserModel | null) => void) {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      AsyncStorage.getItem("token").then((token) => {
        if (!token) {
          setUser(null);
          router.replace("/login");
        } else {
          getCurrentUser()
            .then((user) => {
              if (isActive) {
                setUser(user);
              }
            })
            .catch((err) => {
              console.error("Gagal ambil user:", err.message);
              if (isActive) {
                setUser(null);
                router.replace("/login");
              }
            });
        }
      });

      return () => {
        isActive = false;
      };
    }, [])
  );
}

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem("token");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
