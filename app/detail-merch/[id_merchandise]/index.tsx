import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_API, BASE_URL_MOBILE } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { MerchandiseModel } from "@/model/Merchandise";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetailMerchandisePage() {
  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  const { id_merchandise } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [merch, setMerch] = useState<MerchandiseModel | null>(null);

  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const res = await fetch(
          `${BASE_URL_API}/merchandise/${id_merchandise}`
        );
        const data = await res.json();
        setMerch(data.merchandise);
      } catch (err) {
        console.error("❌ Gagal ambil detail merchandise:", err);
      }
    };

    if (id_merchandise) fetchMerchandise();
  }, [id_merchandise]);

  const handleClaim = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        alert("Token tidak ditemukan. Silakan login ulang.");
        return;
      }

      const res = await fetch(
        `${BASE_URL_MOBILE}/by-pembeli/klaim/${id_merchandise}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_merchandise: merch?.id_merchandise,
            jml_merch_diklaim: 1,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || data.error) {
        alert(data.error || "Gagal klaim merchandise");
        return;
      }

      alert("🎉 Merchandise berhasil diklaim!");
      router.push("/(pembeli)/merch");
    } catch (error) {
      console.error("❌ Gagal klaim merchandise:", error);
      alert("Terjadi kesalahan saat klaim.");
    }
  };

  if (!merch) return <Text style={{ padding: 20 }}>Memuat data...</Text>;

  const tidakCukupPoin = merch?.jumlah_poin
    ? (user?.poin_loyalitas ?? 0) < merch.jumlah_poin
    : false;
  const stokHabis = merch?.jumlah_stok < 1;
  const klaimDisabled = tidakCukupPoin || stokHabis;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
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
              gap: 16,
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
            <Text style={[styles.title, { color: "white" }]}>
              Pilih Merchandise
            </Text>
          </View>
        </LinearGradient>
        <Image
          source={{ uri: merch.src_img }}
          style={{
            width: "100%",
            height: 300,
          }}
          resizeMode="cover"
        />
        <View style={styles.container}>
          <Text style={styles.title}>{merch.nama_merch}</Text>
          <Text style={styles.point}>{merch.jumlah_poin} poin</Text>
          <Text style={styles.stock}>
            Stok Tersedia: {merch.jumlah_stok} pcs
          </Text>

          <Text style={styles.title}>Deskripsi</Text>
          <Text style={styles.desc}>{merch.deskripsi_merch}</Text>

          {klaimDisabled && (
            <Text style={{ fontFamily: "Poppins-Regular", color: "red", marginBottom: 8 }}>
              {stokHabis
                ? "Stok merchandise sudah habis." 
                : "Poin Anda tidak mencukupi untuk klaim merchandise ini."}
            </Text>
          )}

          <GradientOutlineButton
            title="Klaim Merchandise"
            onPress={handleClaim}
            size="small"
            disabled={klaimDisabled}
          /> 
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 12,
  },
  title: {
    flexShrink: 1,
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  point: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
    marginTop: 4,
  },
  stock: {
    fontSize: 13,
    fontFamily: "Poppins-Semibold",
    color: "#333",
    marginBottom: 16,
  },
  label: {
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    marginBottom: 32,
  },
  button: {
    borderWidth: 1,
    borderColor: "#220593",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Poppins-Semibold",
    color: "#220593",
  },
});
