import { API_BASE_URL } from "@/context/config";
import Divider from "@/components/Divider";
import GradientButton from "@/components/GradientButton";
import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_MOBILE } from "@/context/config";
import { logoutUser, useAuthRedirect } from "@/context/UserContext";
import { TransaksiModel } from "@/model/Transaksi";
import { UserModel } from "@/model/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  const [transaksiList, setTransaksiList] = useState<TransaksiModel[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  function handleLogout() {
    setShowLogoutModal(true);
  }

  useEffect(() => {
    async function fetchTransaksi() {
      try {
        const token = await AsyncStorage.getItem("token");

        if (!token) throw new Error("User Token not found");

        const res = await fetch(`${BASE_URL_MOBILE}/by-pembeli/transaksi`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const error = await res.json();
          throw new Error(
            error.message || "Failed to fetch pembeli's transaksi"
          );
        }

        const data = await res.json();
        // console.log("Data Transaksi: ", data);
        setTransaksiList(
          (data.transaksi ?? [])
            .filter((t: any) =>
              ["PAID", "PENDING", "ON_PROGRES"].includes(t.status_transaksi)
            )
            .map((t: any) => ({
              ...t,
              barang: t.barang ?? [],
            })) ?? []
        );
      } catch (err) {
        console.error("Fetch transaksi error:", err);
      }
    }

    fetchTransaksi();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
          <Text style={[styles.title, { marginTop: 16 }]}>Profil</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <Image
              source={{
                uri:
                  user?.src_img_profile ||
                  "https://i.pinimg.com/736x/18/c2/f6/18c2f6cd7a987c800e4ebd035ab91a3c.jpg",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#fff",
                marginBottom: 12,
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  maxWidth: 220,
                }}
              >
                <Text style={{ marginBottom: 4 }}>
                  <UserRound color={"#fff"} size={18} />
                </Text>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {user?.nama || "Nama Pengguna"}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={{ marginBottom: 4 }}>
                  <Sparkles color={"#fff"} size={16} />
                </Text>
                <Text style={styles.subtitle}>
                  {user?.poin_loyalitas || "0"} Reusepoint{" "}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.container}>
          {/* Transaksi Berlangsung */}
          <View style={styles.section}>
            <Text style={[styles.title, { color: "#000" }]}>
              Transaksi Berlangsung
            </Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {transaksiList.map((transaksi, index) => (
                <View key={index} style={styles.card}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.badge}>
                      {transaksi.status_transaksi}
                    </Text>
                    <Text style={styles.nota}>
                      No. Nota: {transaksi.no_nota}
                    </Text>
                  </View>

                  <View style={styles.itemRow}>
                    {/* <Image
                      source={{
                        uri: transaksi.barang?.[0]?.gambar_barang?.[0]?.src_img || "https://via.placeholder.com/80",

                      }}
                      style={styles.imagePlaceholder}
                    /> */}
                    {(() => {
                      const gambarObj = transaksi.barang?.[0]?.gambar_barang?.[0]?.src_img;
                      const isExternal = (url: string) => url?.startsWith("http");

                      const imageUrl = gambarObj || null;

                      const fullImageUrl = imageUrl
                        ? imageUrl.startsWith("http://localhost:3000")
                          ? imageUrl.replace("http://localhost:3000", API_BASE_URL)
                          : isExternal(imageUrl)
                            ? imageUrl
                            : `${API_BASE_URL}${imageUrl}`
                        : "https://via.placeholder.com/80";

                      return (
                        <Image
                          source={{ uri: fullImageUrl }}
                          style={styles.imagePlaceholder}
                          resizeMode="cover"
                          onError={(e) =>
                            console.warn(`Gagal load gambar transaksi ${index}:`, e.nativeEvent)
                          }
                        />
                      );
                    })()}

                    <View>
                      <Text style={styles.itemName}>
                        {transaksi.barang[0]?.nama_barang ||
                          "Barang Tidak Diketahui"}
                      </Text>
                      {transaksi.barang?.length > 1 && (
                        <Text style={styles.itemSub}>
                          + {transaksi.barang.length - 1} barang lainnya
                        </Text>
                      )}
                    </View>
                  </View>

                  <GradientOutlineButton
                    title="Lihat Detail Transaksi"
                    onPress={() => {
                      router.push({
                        pathname: "/detail-transaksi-pembeli/[id_transaksi]" as const,
                        params: { id_transaksi: transaksi.id_transaksi.toString() },
                      });
                    }}
                    size="small"
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          <Divider />

          {/* Data Pribadi */}
          <View style={styles.section}>
            <Text style={[styles.title, { color: "#000" }]}>Data Pribadi</Text>
            {[
              {
                icon: <User size={16} color="#000" />,
                value: user?.nama || "-",
              },
              {
                icon: <Mail size={16} color="#000" />,
                value: user?.email || "-",
              },
              {
                icon: <Phone size={16} color="#000" />,
                value: user?.no_telepon || "-",
              },
            ].map((item, index) => (
              <View style={styles.inputField} key={index}>
                {item.icon}
                <Text style={styles.inputText}> {item.value}</Text>
              </View>
            ))}

            <GradientOutlineButton
              title="Edit Profil"
              onPress={() => {
                console.log("Tombol edit profil ditekan");
              }}
              size="small"
            />
          </View>

          <Divider />

          {/* Aksi Lainnya */}
          <View style={styles.section}>
            <Text style={[styles.title, { color: "#000" }]}>Data Pribadi</Text>
            {[
              {
                icon: <History size={18} />,
                label: "History Transaksi",
                onPress: () => router.push("/history-pembeli"),
              },

              { icon: <Bell size={18} />, label: "Pengaturan Notifikasi" },

              {
                icon: <LogOut size={18} />,
                label: "Logout",
                onPress: async () => {
                  handleLogout();
                },
                text_styles: { color: "red" },
              },
            ].map((item, index) => (
              <View style={styles.shadowWrapper} key={index}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {item.icon}
                      <Text style={[styles.menuText, { marginLeft: 8 }]}>
                        {item.label}
                      </Text>
                    </View>
                    <ChevronRight size={18} color="#000" />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
        <Modal
          transparent
          visible={showLogoutModal}
          animationType="fade"
          onRequestClose={() => setShowLogoutModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.4)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={styles.modal}>
              <Text
                style={{
                  fontFamily: "Poppins-Semibold",
                  fontSize: 16,
                  marginBottom: 12,
                }}
              >
                Yakin ingin logout?
              </Text>
              <View style={{ flexDirection: "row", gap: 16 }}>
                <View style={{ width: "50%" }}>
                  <GradientOutlineButton
                    title="Logout"
                    onPress={async () => {
                      await logoutUser();
                      setShowLogoutModal(false);
                      router.replace("/login");
                    }}
                    size="small"
                    variant="danger"
                  />
                </View>
                <View style={{ width: "50%" }}>
                  <GradientButton
                    title="Batal"
                    onPress={() => setShowLogoutModal(false)}
                    size="small"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 24,
  },

  title: {
    flexShrink: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Semibold",
  },

  subtitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },

  debugger: {
    borderColor: "red",
    borderWidth: 2,
  },

  section: {
    gap: 8,
  },

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },

  card: {
    borderRadius: 24,
    padding: 16,
    backgroundColor: "#F6F7FB",
    gap: 16,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#E0ECFF",
    fontFamily: "Poppins-Semibold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 12,
    color: "#220593",
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

  imagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#ccc",
    marginRight: 12,
  },

  itemName: {
    fontFamily: "Poppins-Semibold",
    fontSize: 14,
  },

  itemSub: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },

  inputField: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },

  inputText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginLeft: 8,
  },

  shadowWrapper: {
    backgroundColor: "#fff",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },

  menuItem: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  menuText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginLeft: 8,
  },

  modal: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
  },
});