import Divider from "@/components/Divider";
import GradientButton from "@/components/GradientButton";
import GradientOutlineButton from "@/components/GradientOutlineButton";
import { logoutUser, useAuthRedirect } from "@/context/UserContext";
import { UserModel } from "@/model/User";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    Bell,
    ChevronRight,
    LogOut,
    Mail,
    Phone,
    Sparkles,
    User,
    UserRound,
} from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function KurirProfilePage() {
  const router = useRouter();

  const scrollRef = useRef<ScrollView>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [user, setUser] = useState<UserModel | null>(null);
  useAuthRedirect(setUser);

  useFocusEffect(
    React.useCallback(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, [])
  );

  function handleLogout() {
    setShowLogoutModal(true);
  }

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
          </View>

          <Divider />

          {/* Aksi Lainnya */}
          <View style={styles.section}>
            <Text style={[styles.title, { color: "#000" }]}>Aksi Lainnya</Text>
            {[
              {
                icon: <Bell size={18} />,
                label: "Pengaturan Notifikasi",
              },
              {
                icon: <LogOut size={18} />,
                label: "Logout",
                onPress: async () => {
                  handleLogout();
                },
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
