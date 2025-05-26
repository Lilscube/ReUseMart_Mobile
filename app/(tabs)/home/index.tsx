import ProductCard from "@/components/ProductCard";
import GradientInput from "@/components/gradientInput";
import { BASE_URL } from "@/config/config";
import { Barang } from "@/model/Product";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Baby,
    BookOpenText,
    BriefcaseBusiness,
    CarFront,
    Gem,
    Guitar,
    Headphones,
    Leaf,
    Shirt,
    Sofa,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [BarangList, setBarangList] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;
  const itemGap = 12;
  const horizontalPadding = 16;

  const itemWidth = (screenWidth - horizontalPadding * 2 - itemGap) / 2;

  const categories = [
    { name: "Elektronik" },
    { name: "Fashion" },
    { name: "Otomotif" },
    { name: "Buku" },
    { name: "Furniture" },
  ];

  useEffect(() => {
    fetch(`${BASE_URL}/barang`)
      .then((res) => res.json())
      .then((data) => {
        setBarangList(data.barang || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch barang:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = BarangList.filter((product) =>
    product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#26C2FF"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id_barang.toString()}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 15,
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          ListHeaderComponent={
            <>
              <View style={{ marginHorizontal: -24 }}>
                <LinearGradient
                  colors={["#26C2FF", "#220593"]}
                  locations={[0.01, 0.9]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={{ padding: 24, height: 135 }}
                >
                  <View>
                    <View>
                      <Text
                        style={[
                          styles.normalText,
                          { marginTop: 16, color: "#fff" },
                        ]}
                      >
                        Selamat pagi,
                      </Text>
                      <Text style={[styles.title, { color: "#fff" }]}>
                        Pasha Rakha Paruntung
                      </Text>
                    </View>
                  </View>
                  <GradientInput
                    placeholder="Cari apa hari ini?"
                    onChangeText={(value) => {}}
                    containerStyle={{
                      position: "relative",
                      top: 15,
                    }}
                  />
                </LinearGradient>
              </View>
              <View style={[styles.container, { paddingTop: 44 }]}>
                <View style={styles.section}>
                  <View
                    style={[
                      styles.imagePlaceholder,
                      {
                        height: 120,
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text>Ini Banner Iklan</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={[styles.title, { color: "#000" }]}>
                    Kategori
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 12 }}
                  >
                    {[
                      {
                        name: "Interior & Utensil",
                        icon: Sofa,
                      },
                      {
                        name: "Elektronik & Gadget",
                        icon: Headphones,
                      },
                      {
                        name: "Buku, Alat Tulis, & Peralatan Sekolah",
                        icon: BookOpenText,
                      },
                      {
                        name: "Hobi, Mainan, & Koleksi",
                        icon: Guitar,
                      },
                      {
                        name: "Pakaian & Aksesoris",
                        icon: Shirt,
                      },
                      {
                        name: "Perlengkapan Taman & Outdoor",
                        icon: Leaf,
                      },
                      {
                        name: "Otomotif",
                        icon: CarFront,
                      },
                      {
                        name: "Perlengkapan Bayi & Anak",
                        icon: Baby,
                      },
                      {
                        name: "Peralatan Kantor & Industri",
                        icon: BriefcaseBusiness,
                      },
                      {
                        name: "Kosmetik & Perawatan Diri",
                        icon: Gem,
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <View key={index} style={styles.iconContainer}>
                          <View style={styles.iconCircle}>
                            <Icon size={24} color="#220593" />
                          </View>
                          <Text
                            style={[styles.normalText, styles.iconText]}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {item.name}
                          </Text>
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
                <View style={styles.section}>
                  <Text style={[styles.title, { color: "#000" }]}>
                    Untuk Kamu
                  </Text>
                </View>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <ProductCard item={item} width={itemWidth - 12} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingBottom: 8,
    gap: 24,
  },

  title: {
    flexShrink: 1,
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },

  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },

  normalText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
  },

  section: {
    // borderColor: "red",
    // borderWidth: 1,
    gap: 8,
  },

  imagePlaceholder: {
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },

  iconContainer: {
    alignItems: "center",
    gap: 4,
  },

  iconCircle: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: "#F6F7FB",
  },

  iconText: {
    width: 64,
    fontSize: 12,
    textAlign: "center",
  },
});
