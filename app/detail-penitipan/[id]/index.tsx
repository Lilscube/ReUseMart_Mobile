import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Image, ActivityIndicator, StyleSheet } from "react-native";
import { API_BASE_URL } from "@/context/config";
import { BarangModel } from "@/model/Barang";

export default function DetailPenitipanPage() {
    const { id } = useLocalSearchParams(); // Ambil dari URL
    const [barang, setBarang] = useState<BarangModel | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBarang = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/barang/${id}`);

                if (!res.ok) {
                    throw new Error(`Status ${res.status}`);
                }

                const data = await res.json();
                setBarang(data.barang || null);
            } catch (err) {
                console.error("Gagal fetch detail barang:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBarang();
    }, [id]);


    if (loading) {
        return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#220593" />;
    }

    if (!barang) {
        return <Text style={{ padding: 20 }}>Barang tidak ditemukan</Text>;
    }

    return (
        <View style={{ flex: 6, backgroundColor: "#fff", paddingTop: 80 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={{
                        uri:
                            barang.gambar_barang?.[0]?.src_img.startsWith("http")
                                ? barang.gambar_barang[0].src_img
                                : `${API_BASE_URL}${barang.gambar_barang?.[0]?.src_img}`,
                    }}
                    style={styles.mainImage}
                />

                {/* Thumbnail scrollable */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.thumbnailScroll}>
                    {barang.gambar_barang?.map((gbr, index) => (
                        <Image
                            key={index}
                            source={{
                                uri: gbr.src_img.startsWith("http")
                                    ? gbr.src_img
                                    : `${API_BASE_URL}${gbr.src_img}`,
                            }}
                            style={[
                                styles.thumbnail,
                                index === 0 && styles.thumbnailSelected, // style tambahan untuk thumbnail aktif
                            ]}
                        />
                    ))}
                </ScrollView>
                <Text style={styles.title}>{barang.nama_barang}</Text>
                <Text>Kode Produk: {barang.kode_produk}</Text>
                <Text>Status: {barang.status_titip}</Text>
                <Text>Harga: Rp{Number(barang.harga_barang).toLocaleString("id-ID")}</Text>
                <Text>Deskripsi: {barang.deskripsi_barang || "-"}</Text>
                {/* Tambahkan info lain sesuai kebutuhan */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    multipleImage: {
        width: 200,
        height: 150,
        marginRight: 12,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
    mainImage: {
        width: "100%",
        height: 250,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "#f0f0f0",
    },

    thumbnailScroll: {
        flexDirection: "row",
        marginBottom: 16,
    },
    thumbnail: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#eee",
    },
    thumbnailSelected: {
        borderColor: "#220593",
        borderWidth: 2,
    },

});
