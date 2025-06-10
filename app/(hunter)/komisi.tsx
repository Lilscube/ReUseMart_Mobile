import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_MOBILE } from "@/context/config";
import { useAuthRedirect } from "@/context/UserContext";
import { KomisiModel } from "@/model/Komisi";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function HunterKomisiPage() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  const [komisiList, setKomisiList] = useState<KomisiModel[]>([]);

  const fetchKomisi = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) throw new Error("User Token not found");

      const res = await fetch(`${BASE_URL_MOBILE}/by-hunter/komisi`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch komisi data");
      }

      const data = await res.json();
      setKomisiList(data.komisi ?? []);
    } catch (err) {
      console.error("Fetch komisi error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKomisi();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchKomisi} />
        }
      >
        <LinearGradient
          colors={["#26C2FF", "#220593"]}
          locations={[0.01, 0.9]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.container, { paddingBottom: 8 }]}
        >
          <View style={{ flex: 1, marginTop: 24 }}>
            <Text style={styles.title}>Daftar Komisi</Text>
          </View>
        </LinearGradient>
        <View style={styles.container}>
          {komisiList.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                color: "#999",
                marginTop: 16,
                paddingHorizontal: 32,
              }}
            >
              Belum ada komisi yang terdaftar untuk kamu saat ini.
            </Text>
          ) : (
            komisiList.map((item) => (
              <View key={item.id_komisi} style={styles.card}>
                <Text style={styles.nota}>Nota #{item.no_nota}</Text>
                <View style={{ gap: 8 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rowTitle}>Nama Penitip</Text>
                    <Text style={styles.rowValue}>
                      : {item.nama_penitip || "-"}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rowTitle}>Komisi ReUseMart</Text>
                    <Text style={styles.rowValue}>
                      : Rp
                      {Math.round(item.komisi_reusemart).toLocaleString(
                        "id-ID"
                      )}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rowTitle}>Komisi Penitip</Text>
                    <Text style={styles.rowValue}>
                      : Rp
                      {Math.round(item.komisi_penitip).toLocaleString("id-ID")}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.rowTitle}>Komisi Anda</Text>
                    <Text style={styles.rowValue}>
                      : Rp
                      {Math.round(item.komisi_hunter).toLocaleString("id-ID")}
                    </Text>
                  </View>
                </View>
                <GradientOutlineButton
                  title="Lihat Detail Komisi"
                  onPress={() =>
                    router.push({
                      pathname: "/(kurir-complements)/detailKomisi/[id]",
                      params: { id: item.id_komisi.toString() },
                    })
                  }
                  size="small"
                />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 16,
  },
  title: {
    flexShrink: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },
  card: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#F6F7FB",
    gap: 12,
  },
  nota: {
    fontSize: 12,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowTitle: {
    width: 140,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  rowValue: {
    fontFamily: "Poppins-Semibold",
    flexShrink: 1,
    flex: 1,
  },
});
