import GradientButton from "@/components/GradientButton";
import GradientInput from "@/components/GradientInput";
import GradientOutlineButton from "@/components/GradientOutlineButton";
import { BASE_URL_AUTH } from "@/context/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL_AUTH}/login/by-pegawai`, {
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

        router.replace("/home");
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
        <Text style={styles.title}>Selamat datang kembali, prajurit</Text>
        <Text style={styles.subtitle}>
          Yuk, login dulu biar bisa lanjut bantu jaga barang tetap bermanfaat.
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
          <GradientButton
            title="Masuk"
            onPress={() => {
              onBtnMasukPressed();
            }}
            style={{ marginVertical: 16 }}
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

        <TouchableOpacity
          onPress={() => router.push("/login")}
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
            Bukan mitra?{" "}
            <Text style={{ fontFamily: "Poppins-Semibold" }}>
              Masuk seperti biasa
            </Text>
          </Text>
        </TouchableOpacity>
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
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    marginHorizontal: 24,
  },

  title: {
    fontSize: 56,
    color: "#fff",
    textTransform: "uppercase",
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
    height: "62%",
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
