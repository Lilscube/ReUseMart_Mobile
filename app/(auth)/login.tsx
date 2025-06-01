import GradientButton from "@/components/GradientButton";
import GradientInput from "@/components/GradientInput";
import GradientOutlineButton from "@/components/GradientOutlineButton";
import { API_BASE_URL, BASE_URL_MOBILE } from "@/context/config";
import { sendPushNotification } from "@/utils/sendPushNotification";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const routeHomepage = (role: string) => {
    switch (role) {
      case "pembeli":
        router.replace("/(pembeli)/home");
        break;
      case "penitip":
        router.replace("/(penitip)/barang");
        break;
      case "kurir":
        router.replace("/(kurir)/dashboard");
        break;
      case "hunter":
        router.replace("/(hunter)/dashboard");
        break;
      default:
        alert("Role tidak dikenal, tidak bisa diarahkan.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL_MOBILE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log("Login berhasil:", data);

        await AsyncStorage.setItem("token", data.token);

        routeHomepage(data.role);

        const userToken = await AsyncStorage.getItem("token");
        
        await fetch(`${BASE_URL_MOBILE}/push-token/penitip`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (expoPushToken) {
          await sendPushNotification(
            expoPushToken,
            "Welcome back, king 👑!",
            "Selamat datang kembali di ReUseMart, " + data.nama
          );
        } else {
          console.warn("❌ Token push belum tersedia");
        }
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login");
    }
  };

  const onBtnMasukPressed = () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi!");
      return;
    }
    handleLogin();
  };

  const registerPushToken = async () => {
    if (!Device.isDevice) {
      alert("Notifikasi hanya dapat digunakan di perangkat fisik");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Gagal mendapatkan izin notifikasi!");
      return;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId, // opsional, tergantung setup
      })
    ).data;

    setExpoPushToken(token);
    console.log("📱 Push Token didapat:", token);
  };

  React.useEffect(() => {
    registerPushToken();
  }, []);

  return (
    <LinearGradient
      colors={["#26C2FF", "#220593"]}
      locations={[0.01, 0.9]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.topContainer}>
        <Text style={styles.title}>MASUK AJA DULU</Text>
        <Text style={styles.subtitle}>
          Login sekarang lalu lanjut eksplor barang-barang kece di ReUseMart.
        </Text>
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.inputText}>Email</Text>
          <GradientInput
            placeholder="johndoe@mail.com"
            icon={Mail}
            keyboardType="email-address"
            onChangeText={(value) => {
              setEmail(value);
            }}
          />
        </View>
        <View>
          <Text style={styles.inputText}>Kata Sandi</Text>
          <GradientInput
            placeholder="********"
            icon={LockKeyhole}
            secureTextEntry={true}
            onChangeText={(value) => {
              setPassword(value);
            }}
          />
        </View>
        <View>
          <Text
            style={{
              textAlign: "right",
              fontFamily: "Poppins-Semibold",
              fontSize: 14,
              color: "#220593",
              marginBottom: 16,
            }}
          >
            Lupa Password?
          </Text>
          <GradientButton
            title="Masuk"
            onPress={() => {
              onBtnMasukPressed();
            }}
            style={{ marginBottom: 16 }}
            size="default"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
            <Text
              style={{
                marginHorizontal: 20,
                color: "#000",
                fontFamily: "Poppins-Regular",
              }}
            >
              Atau
            </Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
          </View>
          <GradientOutlineButton
            title="Masuk dengan Google"
            onPress={() => {
              console.log("Tombol masuk dengan Google ditekan");
            }}
            size="default"
            style={{ marginBottom: 16 }}
          />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => Linking.openURL(`${API_BASE_URL}/register)`)}
            style={{ marginBottom: 12 }}
          >
            <Text
              style={{
                color: "#220593",
                fontSize: 14,
                textAlign: "center",
                fontFamily: "Poppins-Regular",
              }}
            >
              Belum punya akun?{" "}
              <Text style={{ fontFamily: "Poppins-Semibold" }}>Daftar</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },

  topContainer: {
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    marginHorizontal: 24,
  },

  title: {
    fontSize: 60,
    color: "#fff",
    fontFamily: "Montage",
    textAlign: "left",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
  },

  bottomContainer: {
    height: "67%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 24,
  },

  inputText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    marginBottom: 2,
  },

  debug: {
    borderColor: "red",
    borderWidth: 1,
  },
});
