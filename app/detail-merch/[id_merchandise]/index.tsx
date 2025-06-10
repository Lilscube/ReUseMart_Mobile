import { BASE_URL_API } from "@/context/config";
import { MerchandiseModel } from "@/model/Merchandise";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function DetailMerchandisePage() {
  const { id_merchandise } = useLocalSearchParams();
  const router = useRouter();
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

  if (!merch) return <Text style={{ padding: 20 }}>Memuat data...</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ padding: 20 }}>
        <View>
          <Text style={styles.title}>Pilih Merchandise</Text>
        </View>

        <Image
          source={{ uri: merch.src_img }}
          style={{
            width: "100%",
            height: 500,
            borderRadius: 12,
            marginBottom: 16,
          }}
          resizeMode="cover"
        />

        <Text style={styles.title}>{merch.nama_merch}</Text>
        <Text style={styles.point}>{merch.jumlah_poin} poin</Text>
        <Text style={styles.stock}>Stok Tersedia: {merch.jumlah_stok} pcs</Text>

        <Text style={styles.title}>Deskripsi</Text>
        <Text style={styles.desc}>{merch.deskripsi_merch}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Klaim Merchandise</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 12,
  },
  title: {
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
    marginBottom: 20,
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
