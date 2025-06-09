import { Barang } from "@/model/Product";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  item: Barang;
  width: number;
}

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export default function ProductCard({ item, width }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail-barang/${item.id_barang}`)}
      style={[styles.card, { width }]}
    >
      {/* <View style={[styles.card, { width }]}> */}
      {item.gambar_barang?.[0]?.src_img ? (
        <Image
          source={{ uri: item.gambar_barang[0].src_img }}
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
