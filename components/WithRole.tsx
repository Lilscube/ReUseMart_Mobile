import { getCurrentUser } from "@/context/UserContext";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Text } from "react-native";

interface WithRoleProps {
  allowed: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export default function WithRole({
  allowed,
  children,
  fallback,
}: WithRoleProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [allowedAccess, setAllowedAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) {
          router.replace("/login");
          return;
        }

        const u = await getCurrentUser();
        setUser(u);
        setAllowedAccess(allowed.includes(u.role));
      } catch (err: any) {
        console.error("Gagal ambil user:", err.message);
        setAllowedAccess(false);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAccess();
  }, []);

  if (loading) return <Text>Memuat hak akses...</Text>;

  if (!allowedAccess)
    return (
      fallback || (
        <Text className="text-red-500">Anda tidak memiliki akses.</Text>
      )
    );

  return <>{children}</>;
}
