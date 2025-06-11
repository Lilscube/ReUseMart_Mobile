import { useDoubleBackExit } from "@/components/DoubleBackExitAlert";
import GradientInput from "@/components/GradientInput";
import ProductCard from "@/components/PembeliProductCard";
import { BASE_URL_API } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { BarangModel } from "@/model/Barang";
import { UserModel } from "@/model/User";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import TopSellerCard from "@/components/TopSellerCard";

import {
  Baby,
  Bell,
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
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PembeliHomePage() {
  useDoubleBackExit();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [BarangList, setBarangList] = useState<BarangModel[]>([]);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;
  const itemGap = 12;
  const horizontalPadding = 16;

  const itemWidth = (screenWidth - horizontalPadding * 2 - itemGap) / 2;

  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  useEffect(() => {
    fetch(`${BASE_URL_API}/barang`)
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

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat pagi";
    if (hour >= 11 && hour < 15) return "Selamat siang";
    if (hour >= 15 && hour < 18) return "Selamat sore";
    return "Selamat malam";
  }

  return (

    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#26C2FF"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={BarangList}
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
              <View style={{ marginHorizontal: -25 }}>
                <LinearGradient
                  colors={["#26C2FF", "#220593"]}
                  locations={[0.01, 0.9]}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 0 }}
                  style={{
                    paddingVertical: 32,
                    paddingHorizontal: 24,
                    height: 135,
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
                  <GradientInput
                    placeholder="Cari apa hari ini?"
                    onChangeText={(value) => { }}
                    containerStyle={{
                      position: "relative",
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                </LinearGradient>
              </View>
              <View style={[styles.container, { paddingTop: 44, zIndex: -1 }]}>
                <View style={styles.section}>
                  {/* <View
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
                  </View> */}
                  <View style={styles.section}>
                    <Image
                      source={{ uri: "https://i.pinimg.com/736x/43/f0/6e/43f06e11637ffbf70849bab1073a74ff.jpg" }} // GANTI dengan URL gambar kamu
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                  </View>

                </View>
                <View style={styles.section}>

                  <TopSellerCard />

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
            // <TouchableOpacity
            //   onPress={() => router.push(`/detail-barang/${item.id_barang}`)}
            //   style={{
            //     width: itemWidth,
            //     backgroundColor: "#f8f8f8",
            //     padding: 10,
            //     borderRadius: 10,
            //   }}
            // >
            //   <Image
            //     // source={{ uri: item.gambarbarang?.[0]?.url || "https://via.placeholder.com/150" }}
            //     style={{ width: "100%", height: 100, borderRadius: 8 }}
            //     resizeMode="cover"
            //   />
            //   <Text style={{ fontWeight: "bold", fontSize: 14, marginTop: 8 }}>
            //     {item.nama_barang}
            //   </Text>
            //   <Text style={{ color: "#220593", fontSize: 13 }}>
            //     Rp{item.harga_barang.toLocaleString("id-ID")}
            //   </Text>
            // </TouchableOpacity>
          )}
        />
      )}
    </View>
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

  bannerImage: {
  width: "100%",
  height: 190,
  borderRadius: 10,
  backgroundColor: "#eee",
}

});
