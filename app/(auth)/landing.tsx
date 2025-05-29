import WhiteButton from "@/components/whiteButton";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function Landing() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#26C2FF", "#220593"]}
      locations={[0.01, 0.9]} 
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topContainer}>
        <Image
          source={require("@/assets/images/cakep1.png")}
          style={styles.image}
        />
      </View>

      <View style={[styles.bottomContainer]}>
        <Text style={styles.title}>CARI APAPUN{"\n"}DI REUSEMART</Text>
        <Text style={styles.subtitle}>
          Semua kategori, satu tempat, cari barang bekas berkualitas yang mau
          kamu bawa pulang
        </Text>

        <WhiteButton title="Mulai" onPress={() => router.push("/login")} />
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
    position: "absolute",
    top: -300,
    left: -50,
    width: "180%",
    aspectRatio: "1/1",
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: "50%",
    overflow: "hidden",
  },

  pattern: {
    position: "absolute",
    top: 0,
    width: width,
    height: "100%",
    zIndex: 0,
  },

  image: {
    width: "45%",
    resizeMode: "contain",
    transform: [{ scaleX: -1 }, { rotate: "18deg" }],
    position: "relative",
    top: 120,
    left: -90,
  },

  bottomContainer: {
    height: "60%",
    padding: 24,
    justifyContent: "center",
    overflow: "hidden",
  },

  title: {
    fontSize: 60,
    color: "#fff",
    fontFamily: "Montage",
    textAlign: "left",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Poppins-Regular",
    marginBottom: 41,
  },
});
