import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <LinearGradient
      colors={["#26C2FF", "#220593"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1, padding: 30, justifyContent: "center" }}
    >
      <TouchableOpacity
        style={{ position: "absolute", top: 40, left: 20, zIndex: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: 60,
          color: "#fff",
          textAlign: "center",
          marginBottom: 10,
          fontFamily: "Montage",
        }}
      >
        TEST AJA DULU
      </Text>
      <Text
        style={{
          color: "#eee",
          fontFamily: "Poppins",
          fontSize: 14,
          marginBottom: 90,
          textAlign: "center",
        }}
      >
        Login sekarang lalu lanjut eksplor barang-barang kece di ReUseMart.
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          paddingVertical: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "#000", fontWeight: "bold", fontSize: 14 }}>
          Masuk dengan Google
        </Text>
      </TouchableOpacity>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
        <Text style={{ marginHorizontal: 10, color: "#eee" }}>Atau</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#ccc" }} />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 13,
            marginBottom: 5,
            fontWeight: "600",
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder=""
          placeholderTextColor="#999"
          style={{
            backgroundColor: "#fff",
            borderRadius: 40,
            height: 50,
            paddingHorizontal: 20,
            fontSize: 14,
            color: "#333",
          }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 13,
            marginBottom: 5,
            fontWeight: "600",
          }}
        >
          Kata Sandi
        </Text>
        <TextInput
          placeholder=""
          placeholderTextColor="#999"
          secureTextEntry
          style={{
            backgroundColor: "#fff",
            borderRadius: 40,
            height: 50,
            paddingHorizontal: 20,
            fontSize: 14,
            color: "#333",
          }}
        />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 30 }}
      >
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            borderWidth: 2,
            borderColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {rememberMe && (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: "#fff",
              }}
            />
          )}
        </TouchableOpacity>
        <Text style={{ color: "#fff", marginLeft: 10, fontSize: 13 }}>
          Ingat Saya
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => router.push("/tabs/home")}
        style={{
          borderRadius: 40,
          overflow: "hidden",
          width: "100%",
          backgroundColor: "#1b005f",
          marginBottom: 10,
        }}
      >
        <LinearGradient
          colors={["#220593", "#26C2FF"]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 1.3, y: 0 }}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 50,
            borderRadius: 25,
            borderWidth: 1.5,
            borderColor: "#5de6ff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            Masuk
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={{ color: "#fff", fontSize: 13, textAlign: "center" }}>
          Belum punya akun? <Text style={{ fontWeight: "bold" }}>Daftar</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 60,
    color: "#fff",
    fontFamily: "Montage",
    textAlign: "left",
    marginBottom: 16,
  },
});
