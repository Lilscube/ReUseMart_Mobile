import Divider from "@/components/Divider";
import { BASE_URL_MOBILE } from "@/context/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetailKomisiPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [komisi, setKomisi] = useState<any>(null);
  const [barang, setBarang] = useState<any>(null);

  const fetchDetailKomisi = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await fetch(`${BASE_URL_MOBILE}/by-hunter/komisi/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      console.log("DATA", data);
      console.log("BARANG", data.barang);
      console.log("KOMISI", data.komisi);

      setKomisi(data.komisi);
      const barangWithGambar = data.barang.map((b: any) => ({
        ...b,
        gambar: data.gambarBarang.filter(
          (g: any) => g.id_barang === b.id_barang
        ),
      }));
      setBarang(barangWithGambar);
    } catch (err) {
      console.error("Fetch detail komisi failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailKomisi();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!komisi) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 16 }}>Data komisi tidak ditemukan.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchDetailKomisi} />
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
            <Text style={styles.title}>Detail Komisi #{komisi.id_komisi}</Text>
          </View>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={{ fontFamily: "Poppins-Semibold", fontSize: 18 }}>
              Komisi
            </Text>
            <Text style={styles.label}>Nota: #{komisi.no_nota}</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Nama Penitip</Text>
              <Text style={styles.value}>: {komisi.nama_penitip}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Komisi Anda (Hunter)</Text>
              <Text style={styles.value}>
                : Rp{parseInt(komisi.komisi_hunter).toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Komisi ReUseMart</Text>
              <Text style={styles.value}>
                : Rp{parseInt(komisi.komisi_reusemart).toLocaleString("id-ID")}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Komisi Penitip</Text>
              <Text style={styles.value}>
                : Rp{parseInt(komisi.komisi_penitip).toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </View>
        <Divider />

        <View style={styles.container}>
          {barang.map((item: any) => (
            <View key={item.id_barang} style={styles.card}>
              <Text style={{ fontFamily: "Poppins-Semibold", fontSize: 18 }}>
                Barang dalam Transaksi
              </Text>
              <View style={styles.row}>
                <Text style={styles.label}>Nama Barang</Text>
                <Text
                  style={styles.value}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  : {item.nama_barang}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Kode Produk</Text>
                <Text
                  style={styles.value}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  : {item.kode_produk}
                </Text>
              </View>
              <View style={styles.row}>
                <Text
                  style={styles.label}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  Harga Barang
                </Text>
                <Text
                  style={styles.value}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  : Rp{parseInt(item.harga_barang).toLocaleString("id-ID")}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tanggal Masuk</Text>
                <Text style={styles.value}>
                  : {formatTanggal(item.tanggal_masuk)}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Tanggal Keluar</Text>
                <Text style={styles.value}>
                  : {formatTanggal(item.tanggal_keluar)}
                </Text>
              </View>
              {item.gambar?.length > 0 && (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {item.gambar.map((g: any) => (
                    <View
                      key={g.id_gambar}
                      style={{ marginTop: 8, marginRight: 16 }}
                    >
                      <Image
                        source={{ uri: g.src_img }}
                        style={{ width: 100, height: 100, borderRadius: 8 }}
                      />
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
    backgroundColor: "#fff",
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
  card: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    width: 130,
    fontFamily: "Poppins-Regular",
  },
  value: {
    color: "#000",
    flex: 1,
    flexShrink: 1,
    fontFamily: "Poppins-Semibold",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    color: "#220593",
  },
});
