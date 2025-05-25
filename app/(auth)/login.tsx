import GradientButton from "@/components/gradientButton";
import GradientInput from "@/components/gradientInput";
import GradientOutlineButton from "@/components/gradientOutlineButton";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LockKeyhole, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string|undefined>();
  const [password, setPassword] = useState<string|undefined>();

  const onBtnMasukPressed = () => {
    console.log("Tombol Masuk Ditekan");
    console.log("Email :", email, " ; Password : ", password);
    router.push('/home');
  }

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
                setEmail(value)
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
                setPassword(value)
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
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
            <Text style={{ marginHorizontal: 20, color: "#000", fontFamily: "Poppins-Regular" }}>Atau</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: "#000" }} />
          </View>
          <GradientOutlineButton
            title="Masuk dengan Google"
            onPress={() => {console.log("Tombol masuk dengan Google ditekan");
            }}
            size="default"
            style={{marginBottom: 16}}
          />
        </View>

        <View>
          <TouchableOpacity>
            <Text style={{ color: "#220593", fontSize: 14, textAlign: "center", fontFamily: "Poppins-Regular" }}>
              Belum punya akun?{" "}
              <Text style={{ fontFamily: "Poppins-Semibold" }}>Daftar</Text>
              {/* Nanti kita tembak web */}
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
    marginBottom: 70,
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
    height: "65%",
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
