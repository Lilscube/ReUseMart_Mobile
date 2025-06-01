import { UserModel } from "@/model/User";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { BASE_URL_MOBILE } from "./config";
import { useAuthRedirect } from "./UserContext";

interface NotificationContextType {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  // !! Debug
  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      async (token) => {
        const UserToken = await AsyncStorage.getItem("token");

        if (!UserToken) throw new Error("User Token not found");

        await fetch(`${BASE_URL_MOBILE}/push-token/penitip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${UserToken}`,
          },
          body: JSON.stringify({
            expo_push_token: expoPushToken,
          }),
        });
      },
      (error) => {
        console.error("❌ Gagal register push token:", error);
        setError(error);
      }
    );
  });
  // !! Debug

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token ?? null),
      (error) => setError(error)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(
          "🔔 Notification received while the app is running: ",
          notification
        );
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "🔔 Notification Response: user interacts with a notification",
          JSON.stringify(response, null, 2),
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (user?.role === "penitip" && expoPushToken) {
      console.log("🚀 Mengirim token ke server:", expoPushToken, user.id);
      fetch(`${BASE_URL_MOBILE}/push-token/penitip`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_penitip: user.id,
          expo_push_token: expoPushToken,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Token terkirim:", data))
        .catch((err) => console.error("❌ Gagal kirim token:", err));
    }
  }, [expoPushToken, user]);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
