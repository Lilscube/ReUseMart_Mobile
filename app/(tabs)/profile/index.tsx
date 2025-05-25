import Divider from "@/components/divider";
import { useFocusEffect } from "@react-navigation/native";

import GradientOutlineButton from "@/components/gradientOutlineButton";
import { LinearGradient } from "expo-linear-gradient";
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
import React, { useRef } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const scrollRef = useRef<ScrollView>(null);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
              source={require("@/assets/images/pasha.jpg")}
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
                  Pasha Rakha Paruntungasdf
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Text style={{ marginBottom: 4 }}>
                  <Sparkles color={"#fff"} size={16} />
                </Text>
                <Text style={styles.subtitle}>3.210 Reusepoint</Text>
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
              {[1, 2, 3].map((_, index) => (
                <View key={index} style={styles.card}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.badge}>Dalam Pengiriman</Text>
                    <Text style={styles.nota}>
                      No. Nota : 2025.04.{98 + index}
                    </Text>
                  </View>
                  <View style={styles.itemRow}>
                    <View style={styles.imagePlaceholder} />
                    <View>
                      <Text style={styles.itemName}>Nama Item {index + 1}</Text>
                      <Text style={styles.itemSub}>+ 2 barang lainnya</Text>
                    </View>
                  </View>
                  <GradientOutlineButton
                    title="Lihat Detail Transaksi"
                    onPress={() => console.log("Klik Transaksi " + index)}
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
            <View style={styles.inputField}>
              <User size={16} color="#000" />
              <Text style={styles.inputText}> I Putu Anjes Vernanda</Text>
            </View>
            <View style={styles.inputField}>
              <Mail size={16} color="#000" />
              <Text style={styles.inputText}> anjesganteng@gmail.com</Text>
            </View>
            <View style={styles.inputField}>
              <Phone size={16} color="#000" />
              <Text style={styles.inputText}> 081234567890</Text>
            </View>
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
              { icon: <History size={18} />, label: "History Transaksi" },
              { icon: <Bell size={18} />, label: "Pengaturan Notifikasi" },
              { icon: <LogOut size={18} />, label: "Logout (Switch Account)" },
            ].map((item, index) => (
              <View style={styles.shadowWrapper} key={index}>
                <TouchableOpacity style={styles.menuItem}>
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
      </ScrollView>
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
    // borderColor: "green",
    // borderWidth: 1,
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
    padding: 14,
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
    padding: 14,
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
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden", // penting agar isi mengikuti radius
  },

  menuText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#000",
    marginLeft: 8,
  },
});
