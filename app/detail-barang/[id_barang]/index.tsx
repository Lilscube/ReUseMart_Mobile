import { BASE_URL_API } from "@/context/config";
import { API_BASE_URL } from "@/context/config";
import { BarangModel } from "@/model/Barang";
//import { Barang } from "@/model/Product";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}




export default function DetailBarang() {
  const { id_barang } = useLocalSearchParams();
  const [barang, setBarang] = useState<BarangModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id_barang) return;

    fetch(`${BASE_URL_API}/barang/${id_barang}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Barang Detail:", data.barang); // Debug log
        setBarang(data.barang);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch detail barang:", err);
        setLoading(false);
      });
  }, [id_barang]);

  const isExternal = (url: string) => url.startsWith("http");
  const imageUrl =
    barang?.gambar_barang && barang.gambar_barang.length > 0
      ? barang.gambar_barang[0].src_img
      : null;

  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http://localhost:3000")
      ? imageUrl.replace("http://localhost:3000", API_BASE_URL)
      : isExternal(imageUrl)
        ? imageUrl
        : `${API_BASE_URL}${imageUrl}`
    : null;

  console.log("imageUrl:", imageUrl);
  console.log("fullImageUrl:", fullImageUrl);

  if (loading) {
    return (
      <ActivityIndicator
        style={{ marginTop: 50 }}
        size="large"
        color="#220593"
      />
    );
  }

  if (!barang) {
    return <Text style={styles.errorText}>Barang tidak ditemukan.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {fullImageUrl ? (
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      <View style={styles.content}>
        <Text style={styles.name}>{barang.nama_barang}</Text>
        <Text style={styles.price}>
          Rp{Number(barang.harga_barang).toLocaleString("id-ID")}
        </Text>

        <Text style={styles.label}>
          Kode Produk: <Text style={styles.text}>{barang.kode_produk}</Text>
        </Text>

        <Text style={styles.label}>
          Status Titip:{" "}
          <Text style={styles.text}>{barang.status_titip}</Text>
        </Text>

        <Text style={styles.label}>
          Garansi:{" "}
          <Text
            style={
              barang.tanggal_garansi
                ? styles.garansiAda
                : styles.garansiKosong
            }
          >
            {barang.tanggal_garansi
              ? formatDate(barang.tanggal_garansi)
              : "Tidak Ada"}
          </Text>
        </Text>

        <Text style={styles.label}>
          Tanggal Masuk:{" "}
          <Text style={styles.text}>{formatDate(barang.tanggal_masuk)}</Text>
        </Text>

        <Text style={styles.label}>
          Tanggal Keluar:{" "}
          <Text style={styles.text}>{formatDate(barang.tanggal_keluar)}</Text>
        </Text>

        <Text style={styles.label}>
          Penitip: <Text style={styles.text}>{barang.penitip_name || "-"}</Text>
        </Text>

        <Text style={styles.label}>Deskripsi:</Text>
        <Text style={styles.description}>
          {barang.deskripsi_barang || "-"}
        </Text>

        {barang.gambar_barang?.length > 1 && (
          <ScrollView horizontal style={styles.thumbnailContainer}>
            {barang.gambar_barang.map((gbr, index) => {
              const thumbUrl = gbr.src_img.startsWith("http")
                ? gbr.src_img
                : `${API_BASE_URL}${gbr.src_img}`;
              return (
                <Image
                  key={index}
                  source={{ uri: thumbUrl }}
                  style={styles.thumbnail}
                  onError={(e) =>
                    console.warn(`Gagal load thumbnail ${index}:`, e.nativeEvent)
                  }
                />
              );
            })}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff" },
  image: {
    width: "100%",
    height: 250,
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: 16,
    gap: 8,
  },
  imagePlaceholder: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 12,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#220593",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
  },
  text: {
    fontWeight: "normal",
  },
  description: {
    marginTop: 4,
    marginBottom: 12,
  },
  errorText: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
  },
  thumbnailContainer: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#22059333",
  },

  garansiAda: {
    color: "green",
    fontWeight: "bold",
  },
  garansiKosong: {
    color: "red",
    fontWeight: "bold",
  },

});
