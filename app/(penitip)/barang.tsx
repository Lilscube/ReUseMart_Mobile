import { useDoubleBackExit } from "@/components/DoubleBackExitAlert";
import GradientInput from "@/components/GradientInput";
import ProductCard from "@/components/PenitipProductCard";
import { BASE_URL_MOBILE } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { Barang } from "@/model/Product";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Bell } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function PembeliBarangPage() {
  useDoubleBackExit();

  const [BarangList, setBarangList] = useState<Barang[]>([]);
  const [loading, setLoading] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const itemWidth = screenWidth - 48;

  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

 useEffect(() => {
  const fetchBarang = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.warn("Token tidak ditemukan");
      return;
    }

    console.log("Token ditemukan:", token);

    try {
      const res = await fetch(`${BASE_URL_MOBILE}/barang/by-penitip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBarangList(data.barang || []);
    } catch (err) {
      console.error("Gagal fetch barang penitip:", err);
    }
  };

  fetchBarang();
}, [user]);

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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          ListHeaderComponent={
            <>
              <View style={{ marginHorizontal: -25, marginBottom: 44 }}>
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
                    placeholder="Cari barang titipan"
                    onChangeText={(value) => {}}
                    containerStyle={{
                      position: "relative",
                      top: 10,
                      zIndex: 10,
                    }}
                  />
                </LinearGradient>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <ProductCard item={item} width={itemWidth} />
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
});
