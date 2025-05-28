import { BASE_URL_AUTH } from "@/context/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getCurrentUser() {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) throw new Error("Token not found");

    const res = await fetch(`${BASE_URL_AUTH}/auth/me`, {
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
    console.log("Dari getCurrentUser: ", data.user);
    return data.user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw new Error("Failed to get current user");
  }
}

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem("token");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
