import { useNotification } from "@/context/NotificationContext";
import { Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { expoPushToken, notification, error } = useNotification();

  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <Redirect href={"/landing"}></Redirect>
    </View>
  );
}
