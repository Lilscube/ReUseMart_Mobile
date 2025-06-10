import { SafeAreaView, Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MerchandiseModel } from "@/model/Merchandise";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL_API } from "@/context/config";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import {
  Bell,
  ChevronRight,
  History,
  LogOut,
  Mail,
  Phone,
  Sparkles,
  User,
  UserRound,
} from "lucide-react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Image,
  Modal,
  ScrollView,
  //StyleSheet,
  //Text,
  TouchableOpacity,
  //View,
} from "react-native";

const screenWidth = Dimensions.get("window").width;
const itemSize = (screenWidth - 60) / 2;

export default function ClaimPage() {
  const [user, setUser] = useState<UserModel | null>(null);
  const [rewards, setRewards] = useState<MerchandiseModel[]>([]);
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);


  useEffect(() => {
    const fetchMerchandise = async () => {
      try {
        const res = await fetch(`${BASE_URL_API}/merchandise`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data merchandise");
        }

        const data = await res.json();
        setRewards(data.merchandise || []); // `setRewards` harus sudah dideklarasi via useState
      } catch (error) {
        console.error("Gagal memuat merchandise:", error);
      }
    };

    fetchMerchandise();
  }, []);


  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
        style={styles.container}
      >
        <Text style={[styles.title, { marginTop: 16 }]}>Poin Anda:</Text>

        <Text style={styles.subtitle}>
          <Sparkles color={"#fff"} size={16} /> {user?.poin_loyalitas?.toLocaleString("id-ID") || "0"} Reusepoint
        </Text>
      </LinearGradient>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>Pilih Merchandise</Text>

      {/* Grid Merchandise */}
      <FlatList
        data={rewards}
        numColumns={2}
        keyExtractor={(item) => item.id_merchandise.toString()}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 20 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/detail-merch/[id_merchandise]",
                params: { id_merchandise: item.id_merchandise.toString() },
              });
            }}
            style={styles.card}
          >
            <Image source={{ uri: item.src_img }} style={styles.imageBox} resizeMode="cover" />
            <Text style={styles.itemTitle}>{item.nama_merch}</Text>
            <Text style={styles.itemPoint}>{item.jumlah_poin} poin</Text>
          </TouchableOpacity>
        )}
      />

    </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginVertical: 16,
    fontFamily: "Poppins-Semibold",
  },
  card: {
    width: itemSize,
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#f8f8fc",
    alignItems: "center",
    padding: 10,
  },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f1f1f8",
    borderRadius: 12,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  itemPoint: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Poppins-Semibold",
  },
});
