import Divider from "@/components/Divider";
import GradientButton from "@/components/GradientButton";
import { BASE_URL_MOBILE } from "@/context/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Modal,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetailPengirimanPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [pengiriman, setPengiriman] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL_MOBILE}/by-kurir/pengiriman/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!data.success) throw new Error("Gagal ambil detail");

      setPengiriman(data.result[0]);
    } catch (err) {
      console.error("Detail error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL_MOBILE}/by-kurir/pengiriman/${id}/done`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert("Gagal menyelesaikan pengiriman");
        return;
      }

      fetchDetail();
    } catch (err) {
      console.error("Gagal menyelesaikan pengiriman:", err);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading || !pengiriman) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#220593" />
      </View>
    );
  }

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

  const formatTanggal = (tgl: string | null) => {
    if (!tgl) return "-";
    const date = new Date(tgl);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const label = getStatusLabel(pengiriman);
  const statusStyle = getStatusStyle(label);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchDetail} />
        }
      >
        <LinearGradient
          colors={["#26C2FF", "#220593"]}
          locations={[0.01, 0.9]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[
            styles.container,
            {
              flexDirection: "row",
              alignItems: "center",
              paddingTop: 48,
              paddingBottom: 16,
              justifyContent: "center",
            },
          ]}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          >
            <Text style={styles.title}>
              Detail Pengiriman #{pengiriman.id_pengiriman}
            </Text>
          </View>
        </LinearGradient>
        <View style={[styles.container, { height: "100%" }]}>
          <View style={{ gap: 16 }}>
            <View style={styles.row}>
              <Text style={[styles.label, { width: 120 }]}>ID Transaksi</Text>
              <Text style={styles.value}>: {pengiriman.id_transaksi}</Text>
              <Text
                style={[
                  {
                    backgroundColor: statusStyle.backgroundColor,
                    color: statusStyle.color,
                    flexShrink: 1,
                  },
                  styles.labelBadge,
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {label}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, { width: 120 }]}>Nama Penerima</Text>
              <Text style={styles.value}>
                : {pengiriman.nama_penerima || "-"}
              </Text>
            </View>
            <Divider />

            <View style={{ flexWrap: "wrap", gap: 8 }}>
              <Text style={[styles.label, { width: 140 }]}>
                Lokasi Pengiriman:
              </Text>
              <Text
                style={[styles.value, { flexShrink: 1, flex: 1 }]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {pengiriman.lokasi || "-"}
              </Text>
            </View>
            <View style={{ flexWrap: "wrap", gap: 8 }}>
              <Text style={[styles.label, { width: 140 }]}>
                Catatan Alamat:
              </Text>
              <Text
                style={[styles.value, { flexShrink: 1, flex: 1 }]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {pengiriman.note || "-"}
              </Text>
            </View>
            <Divider />

            <View style={styles.row}>
              <Text style={[styles.label, { width: 120 }]}>Tanggal Kirim</Text>
              <Text style={styles.value}>
                : {formatTanggal(pengiriman.tanggal_kirim)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={[styles.label, { width: 120 }]}>Tanggal Terima</Text>
              <Text style={styles.value}>
                : {formatTanggal(pengiriman.tanggal_terima)}
              </Text>
            </View>
          </View>
          <GradientButton
            title="Selesaikan Pengiriman"
            onPress={() => setModalVisible(true)}
            style={{ marginTop: 100 }}
          />

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>
                  Anda yakin ingin menyelesaikan pengiriman ini?
                </Text>
                <Text style={styles.modalText}>
                  Aksi ini tidak dapat dibatalkan. Pastikan barang sudah
                  diterima oleh pembeli dengan baik.
                </Text>
                <View style={styles.modalButtonRow}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: "#000" }}>Tidak</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: "#220593" }]}
                    onPress={() => {
                      handleFinish();
                      setModalVisible(false);
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Ya</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flexShrink: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#220593",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  labelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 12,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: "row",
    gap: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
});
