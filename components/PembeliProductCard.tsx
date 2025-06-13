import { API_BASE_URL } from "@/context/config";
import { BarangModel } from "@/model/Barang";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  item: BarangModel;
  width: number;
}

function formatRupiah(angka: number | string): string {
  const nilai = typeof angka === "string" ? parseFloat(angka) : angka;
  return nilai.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}

export default function ProductCard({ item, width }: Props) {
  const router = useRouter();

  const isExternal = (url: string) => url.startsWith("http");
  const imageUrl =
    item.gambar_barang && Array.isArray(item.gambar_barang) && item.gambar_barang.length > 0
      ? item.gambar_barang[0].src_img
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


  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail-barang/${item.id_barang}`)}
      style={[styles.card, { width }]}
    >
      {/* <View style={[styles.card, { width }]}> */}
      {fullImageUrl ?(
        <Image
          source={{ uri: fullImageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View>
        <Text style={styles.title}>{item.nama_barang}</Text>
        <Text style={styles.price}>Rp {formatRupiah(item.harga_barang)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // borderColor: "green",
    // borderWidth: 1,
    gap: 8,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 12,
  },

  imagePlaceholder: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 12,
    backgroundColor: "#ddd",
  },

  title: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },

  price: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
  },
});
