import { Barang } from "@/app/model/Product";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Baby, BookOpenText, BriefcaseBusiness, CarFront, Gem, Guitar, Headphones, Leaf, Shirt, Sofa } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
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
  const itemWidth = (screenWidth - 48) / 2;

  const categories = [
    { name: "Elektronik" },
    { name: "Fashion" },
    { name: "Otomotif" },
    { name: "Buku" },
    { name: "Furniture" },
  ];

  useEffect(() => {
    fetch("http://192.168.100.28:3000/api/barang")
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
        <ScrollView
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={["#26C2FF", "#220593"]}
            locations={[0.01, 0.9]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={styles.container}
          >
            <View>
              <Text
                style={[styles.normalText, { marginTop: 16, color: "#fff" }]}
              >
                Selamat pagi,
              </Text>
              <Text style={[styles.title, { color: "#fff" }]}>
                Pasha Rakha Paruntung
              </Text>
            </View>
          </LinearGradient>
          <View style={styles.container}>
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
              <Text style={[styles.title, { color: "#000" }]}>Kategori</Text>
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
              <Text style={[styles.title, { color: "#000" }]}>Untuk Kamu</Text>
                
            </View>
          </View>
        </ScrollView>
        // <FlatList
        //   data={filteredProducts}
        //   keyExtractor={(item) => item.id_barang.toString()}
        //   numColumns={2}
        //   columnWrapperStyle={{
        //     justifyContent: "space-between",
        //     marginBottom: 15,
        //   }}
        //   showsVerticalScrollIndicator={false}
        //   ListHeaderComponent={
        //     <>
        //       <LinearGradient
        //         colors={["#26C2FF", "#220593"]}
        //         start={{ x: 2, y: 0 }}
        //         end={{ x: 0, y: 0 }}
        //         style={{
        //           paddingTop: 100,
        //           paddingBottom: 30,
        //           paddingHorizontal: 20,
        //           borderBottomLeftRadius: 30,
        //           borderBottomRightRadius: 30,
        //         }}
        //       >
        //         <Text
        //           style={{
        //             color: "#f2f2f2",
        //             fontSize: 14,
        //             marginBottom: 5,
        //             fontFamily: "Poppins",
        //           }}
        //         >
        //           Selamat Pagi,
        //         </Text>
        //         <Text
        //           style={{
        //             color: "#fff",
        //             fontSize: 30,
        //             fontWeight: "bold",
        //             marginBottom: 10,
        //             fontFamily: "Montage",
        //           }}
        //         >
        //           Pasha Rakha Paruntung
        //         </Text>
        //       </LinearGradient>

        //       {/* Search Bar */}
        //       <View style={{ paddingHorizontal: 10, marginTop: 16 }}>
        //         <View style={{ borderRadius: 25, overflow: "hidden" }}>
        //           <LinearGradient
        //             colors={["#220593", "#26C2FF"]}
        //             start={{ x: 0, y: 0 }}
        //             end={{ x: 1, y: 0 }}
        //             style={{ padding: 1.5, borderRadius: 25 }}
        //           >
        //             <View
        //               style={{
        //                 backgroundColor: "#fff",
        //                 borderRadius: 25,
        //                 flexDirection: "row",
        //                 alignItems: "center",
        //                 paddingHorizontal: 16,
        //                 paddingVertical: 8,
        //               }}
        //             >
        //               <TextInput
        //                 placeholder="Cari apa hari ini?"
        //                 placeholderTextColor="#888"
        //                 value={searchQuery}
        //                 onChangeText={setSearchQuery}
        //                 style={{ flex: 1, color: "#000", fontSize: 14 }}
        //               />
        //               <Ionicons
        //                 name="search-outline"
        //                 size={18}
        //                 color="#26C2FF"
        //               />
        //             </View>
        //           </LinearGradient>
        //         </View>
        //       </View>

        //       {/* Keunggulan Fitur */}
        //       <View
        //         style={{
        //           flexDirection: "row",
        //           justifyContent: "space-between",
        //           marginTop: 24,
        //           paddingHorizontal: 10,
        //         }}
        //       >
        //         {[
        //           {
        //             title: "HARGA YANG RASIONAL",
        //             desc: "Barang berkualitas, harga bersahabat.",
        //             icon: "pricetag-outline",
        //           },
        //           {
        //             title: "BARANG NGGAK ASAL",
        //             desc: "Asli, bebas cacat, dan layak pakai.",
        //             icon: "checkmark-done-outline",
        //           },
        //           {
        //             title: "KEUNTUNGAN MAKSIMAL",
        //             desc: "Tukar poin jadi diskon atau hadiah.",
        //             icon: "gift-outline",
        //           },
        //         ].map((item, index) => (
        //           <LinearGradient
        //             key={index}
        //             colors={["#220593", "#26C2FF"]}
        //             start={{ x: 0, y: 0 }}
        //             end={{ x: 1, y: 0 }}
        //             style={{
        //               flex: 1,
        //               marginRight: index < 2 ? 8 : 0,
        //               borderRadius: 20,
        //               padding: 12,
        //             }}
        //           >
        //             <View style={{ alignItems: "flex-start" }}>
        //               <Ionicons
        //                 name={item.icon as any}
        //                 size={24}
        //                 color="#fff"
        //               />
        //               <Text
        //                 style={{
        //                   color: "#fff",
        //                   fontSize: 16,
        //                   fontWeight: "bold",
        //                   marginBottom: 4,
        //                   fontFamily: "Montage",
        //                 }}
        //               >
        //                 {item.title}
        //               </Text>
        //               <Text
        //                 style={{
        //                   color: "#fff",
        //                   fontSize: 9,
        //                   fontFamily: "Poppins",
        //                 }}
        //               >
        //                 {item.desc}
        //               </Text>
        //             </View>
        //           </LinearGradient>
        //         ))}
        //       </View>

        //       {/* Kategori */}
        //       <View style={{ paddingVertical: 20 }}>
        //         <Text
        //           style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
        //         >
        //           Jelajahi Kategori
        //         </Text>
        //         <FlatList
        //           data={categories}
        //           keyExtractor={(item) => item.name}
        //           horizontal
        //           showsHorizontalScrollIndicator={false}
        //           renderItem={({ item }) => (
        //             <View
        //               style={{
        //                 width: 80,
        //                 height: 100,
        //                 backgroundColor: "#f2f2f2",
        //                 marginRight: 10,
        //                 borderRadius: 15,
        //                 alignItems: "center",
        //                 justifyContent: "center",
        //               }}
        //             >
        //               <View
        //                 style={{
        //                   width: 40,
        //                   height: 40,
        //                   borderRadius: 10,
        //                   backgroundColor: "#ddd",
        //                 }}
        //               />
        //               <Text style={{ marginTop: 5, fontSize: 12 }}>
        //                 {item.name}
        //               </Text>
        //             </View>
        //           )}
        //         />
        //       </View>

        //       <Text
        //         style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
        //       >
        //         Barang Baru Nih!
        //       </Text>
        //     </>
        //   }
        //   renderItem={({ item }) => (
        //     <View
        //       style={{
        //         width: itemWidth,
        //         backgroundColor: "#f7f7f7",
        //         borderRadius: 15,
        //         padding: 10,
        //         position: "relative",
        //       }}
        //     >
        //       {item.gambar_barang?.[0]?.src_img ? (
        //         <Image
        //           source={{ uri: item.gambar_barang[0].src_img }}
        //           style={{
        //             width: "100%",
        //             height: 150,
        //             borderRadius: 10,
        //             marginBottom: 10,
        //           }}
        //           resizeMode="cover"
        //         />
        //       ) : (
        //         <View
        //           style={{
        //             width: "100%",
        //             height: 150,
        //             borderRadius: 10,
        //             backgroundColor: "#ddd",
        //             marginBottom: 10,
        //           }}
        //         />
        //       )}
        //       <Text
        //         style={{ fontSize: 12, fontWeight: "600", marginBottom: 4 }}
        //       >
        //         {item.nama_barang}
        //       </Text>
        //       <View
        //         style={{
        //           flexDirection: "row",
        //           justifyContent: "space-between",
        //           alignItems: "center",
        //         }}
        //       >
        //         <Text style={{ fontSize: 12, color: "#888" }}>
        //           Rp{item.harga_barang}
        //         </Text>
        //         <TouchableOpacity
        //           style={{
        //             backgroundColor: "#26C2FF",
        //             borderRadius: 20,
        //             padding: 6,
        //           }}
        //         >
        //           <Ionicons name="cart" size={16} color="#fff" />
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //   )}
        // />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 1,
    padding: 24,
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
    // borderColor: "green",
    // borderWidth: 1,
    gap: 8,
  },

  imagePlaceholder: {
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginRight: 12,
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
    width: 72,
    fontSize: 12,
    textAlign: "center",
  },
});
