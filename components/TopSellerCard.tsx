import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { BASE_URL_API } from "@/context/config";

export default function TopSellerCard() {
  const [nama, setNama] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSeller = async () => {
      try {
        const res = await fetch(`${BASE_URL_API}/top-seller/nama`);
        const data = await res.json();
        if (res.ok) {
          setNama(data.nama);
        } else {
          setNama(null);
        }
      } catch (error) {
        console.error("Error fetching top seller:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSeller();
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#000" />;
  }

  if (!nama) {
    return <Text style={styles.text}>Belum ada Top Seller</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>🏆 Top Seller Bulan Ini:</Text>
      <Text style={styles.name}>{nama}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    fontSize: 28,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginTop: 4,
  },
  text: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
});
