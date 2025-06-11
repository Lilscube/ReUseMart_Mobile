import { getCurrentUser } from "@/context/UserContext";
import { UserModel } from "@/model/User";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import TopSellerCard from "@/components/TopSellerCard";

export default function PegawaiDashboardPage() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Gagal ambil user:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Memuat data pengguna...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Pengguna tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Halaman Dashboard Hunter</Text>
      <Text>Nama: {user.nama}</Text>
      <Text>Role: {user.role}</Text>
      <TopSellerCard/>
    </View>
    
    
  );
}