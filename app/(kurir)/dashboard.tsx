import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_MOBILE } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { PengirimanModel } from "@/model/Pengiriman";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function KurirDashboardPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("AMBIL DI GUDANG");

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
        `${BASE_URL_MOBILE}/by-kurir/pengiriman?today=true`,
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

  const filteredList = pengirimanList.filter(
    (item) => getStatusLabel(item) === activeTab
  );

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat pagi";
    if (hour >= 11 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 32 }}
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
          style={{
            paddingTop: 32,
            paddingBottom: 16,
            paddingHorizontal: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <View>
              <Text style={[styles.normalText, { color: "#fff" }]}>
                {getGreeting()},
              </Text>
              <Text style={[styles.title, { color: "#fff" }]}>
                {user?.nama || "Guest"}
              </Text>
            </View>
            <Bell color={"#fff"} size={24} />
          </View>
        </LinearGradient>
        <View style={[styles.container]}>
          <Text style={styles.sectionTitle}>Pengiriman Hari Ini</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {["SEDANG DIKIRIM", "AMBIL DI GUDANG", "SELESAI"].map((tab) => (
              <View
                key={tab}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  onPress={() => setActiveTab(tab)}
                  style={{
                    fontSize: 14,
                    textAlign: "center",
                    fontFamily:
                      activeTab === tab
                        ? "Poppins-Semibold"
                        : "Poppins-Regular",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderBottomWidth: activeTab === tab ? 2 : 0,
                    borderColor: "#220593",
                    color: activeTab === tab ? "#220593" : "#666",
                  }}
                >
                  {tab}
                </Text>
              </View>
            ))}
          </View>
          {filteredList.length > 0 ? (
            filteredList.map((item) => {
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
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        backgroundColor: statusStyle.backgroundColor,
                        color: statusStyle.color,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                        alignSelf: "flex-start",
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    <Text style={{ fontWeight: "700", fontSize: 18 }}>
                      {item.lokasi || "Lokasi belum tersedia"}
                    </Text>
                    <Text style={{ fontStyle: "italic" }}>"{item.note}"</Text>
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
                      <Text style={{ width: 140 }}>Tanggal Pengiriman</Text>
                      <Text style={{ fontWeight: "700" }}>
                        :{" "}
                        {item.tanggal_kirim
                          ? new Date(item.tanggal_kirim)
                              .toISOString()
                              .split("T")[0]
                          : "-"}
                      </Text>
                    </View>
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
            })
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderText}>
                {activeTab === "AMBIL DI GUDANG"
                  ? "Tidak ada pengiriman yang perlu diambil di gudang"
                  : activeTab === "SEDANG DIKIRIM"
                    ? "Tidak ada pengiriman yang sedang diantar"
                    : "Tidak ada pengiriman yang sudah selesai"}
              </Text>
            </View>
          )}
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

  subtitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  normalText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Poppins-Semibold",
  },

  card: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#F6F7FB",
    gap: 16,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E0ECFF",
    fontFamily: "Poppins-Semibold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    color: "#220593",
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

  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginRight: 12,
  },

  itemName: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
  },

  itemSub: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },

  inputField: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },

  inputText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginLeft: 8,
  },

  shadowWrapper: {
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },

  menuItem: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  menuText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginLeft: 8,
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },

  placeholderBox: {
    padding: 24,
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#555",
    textAlign: "center",
  },
});
