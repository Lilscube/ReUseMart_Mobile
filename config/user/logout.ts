import AsyncStorage from "@react-native-async-storage/async-storage";

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem("token");
    console.log("User logged out successfully");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
