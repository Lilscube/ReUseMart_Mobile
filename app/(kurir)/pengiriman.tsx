import GradientInput from "@/components/GradientInput";
import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_MOBILE } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { PengirimanModel } from "@/model/Pengiriman";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function KurirPengirimanPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [pengirimanList, setPengirimanList] = useState<PengirimanModel[]>([]);

  const getStatusLabel = (item: any): string => {
    switch (item.status_pengiriman) {
      case "IN_PROGRESS":
        if (item.tanggal_kirim === null) {
          return "MENUNGGU PENJADWALAN";
        }
        return "AMBIL DI GUDANG";
      case "IN_DELIVERY":
        return "SEDANG DIKIRIM";
      case "DONE":
        return "SELESAI";
      case "FAILED":
        return "DIBATALKAN";
      default:
        return item.status_pengiriman;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "AMBIL DI GUDANG":
        return { backgroundColor: "#fef9c3", color: "#854d0e" }; // yellow-100, yellow-800
      case "KIRIM KURIR":
        return { backgroundColor: "#ffedd5", color: "#9a3412" }; // orange-100, orange-800
      case "MENUNGGU PENJADWALAN":
        return { backgroundColor: "#cffafe", color: "#155e75" }; // cyan-100, cyan-800
      case "SEDANG DIKIRIM":
        return { backgroundColor: "#dbeafe", color: "#1e40af" }; // blue-100, blue-800
      case "SELESAI":
        return { backgroundColor: "#dcfce7", color: "#166534" }; // green-100, green-800
      case "GAGAL":
        return { backgroundColor: "#fee2e2", color: "#991b1b" }; // red-100, red-800
      default:
        return { backgroundColor: "#f3f4f6", color: "#1f2937" }; // default gray
    }
  };

  const fetchPengiriman = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) throw new Error("User Token not found");

      const res = await fetch(
        `${BASE_URL_MOBILE}/by-kurir/pengiriman?search=${searchQuery}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch kurir's pengiriman");
      }

      const data = await res.json();
      setPengirimanList(data.pengiriman ?? []);
    } catch (err) {
      console.error("Fetch pengiriman error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPengiriman();
  }, []);

  const filteredList = pengirimanList.filter((item) => {
    const lower = searchQuery.toLowerCase();
    return (
      item.nama_penerima?.toLowerCase().includes(lower) ||
      item.note?.toLowerCase().includes(lower) ||
      item.lokasi?.toLowerCase().includes(lower)
    );
  });

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchPengiriman} />
        }
      >
        <LinearGradient
          colors={["#26C2FF", "#220593"]}
          locations={[0.01, 0.9]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.container, { paddingBottom: 8 }]}
        >
          <View style={{ flex: 1, marginTop: 24 }}>
            <Text style={styles.title}>Daftar Pengiriman</Text>
          </View>
          <GradientInput
            placeholder="Cari nama penerima, lokasi, atau note..."
            onChangeText={(value) => {
              setSearchQuery(value);
            }}
          />
        </LinearGradient>
        <View style={styles.container}>
          {filteredList.map((item, index) => {
            const label = getStatusLabel(item);
            const statusStyle = getStatusStyle(label);

            return (
              <View key={item.id_pengiriman} style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.nota}>
                    Pengiriman #{item.id_pengiriman}
                  </Text>
                  <Text
                    style={[
                      {
                        backgroundColor: statusStyle.backgroundColor,
                        color: statusStyle.color,
                      },
                      styles.labelBadge,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ width: 140 }}>Penerima</Text>
                    <Text
                      style={{ fontWeight: "700", flexShrink: 1, flex: 1 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      : {item.nama_penerima || "-"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ width: 140 }}>Alamat Pengiriman</Text>
                    <Text
                      style={{ fontWeight: "700", flexShrink: 1, flex: 1 }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      : {item.lokasi || "Lokasi belum tersedia"}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ width: 140 }}>Tanggal Pengiriman</Text>
                    <Text style={{ fontWeight: "700" }}>
                      :{" "}
                      {item.tanggal_kirim
                        ? new Intl.DateTimeFormat("id-ID", {
                            weekday: "long",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }).format(new Date(item.tanggal_kirim))
                        : "-"}
                    </Text>
                  </View>
                  {item.tanggal_terima && (
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ width: 140 }}>Tanggal Terima</Text>
                      <Text style={{ fontWeight: "700" }}>
                        :{" "}
                        {item.tanggal_terima
                          ? new Intl.DateTimeFormat("id-ID", {
                              weekday: "long",
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }).format(new Date(item.tanggal_terima))
                          : "-"}
                      </Text>
                    </View>
                  )}
                </View>
                <GradientOutlineButton
                  title="Lihat Detail Pengiriman"
                  onPress={() =>
                    router.push({
                      pathname: "/(kurir-complements)/detailPengiriman/[id]",
                      params: { id: item.id_pengiriman.toString() },
                    })
                  }
                  size="small"
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    flexShrink: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  section: {
    gap: 8,
  },
  labelBadge: {
    fontSize: 12,
    fontFamily: "Poppins-Semibold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "Poppins-Semibold",
  },
  card: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#F6F7FB",
    gap: 16,
  },
  nota: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
