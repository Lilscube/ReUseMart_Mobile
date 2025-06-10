import { useEffect, useState } from "react";
import { TransaksiModel } from "@/model/Transaksi";
import { BarangModel } from "@/model/Barang";
import { BASE_URL_MOBILE } from "@/context/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";

function formatDate(dateString: string | null) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatRupiah(value: number | string): string {
    const angka = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(angka)) return "Rp0";

    return angka.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}


export default function HistoryPenitipPage() {
    const router = useRouter();
    const [riwayat, setRiwayat] = useState<BarangModel[]>([]);


    useEffect(() => {
        const fetchRiwayat = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const res = await fetch(`${BASE_URL_MOBILE}/barang/by-penitip`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                console.log("Data fetched:", data); // untuk debugging

                if (res.ok && data.barang) {
                    // Gunakan data.barang, bukan data.transaksi
                    setRiwayat(data.barang);
                }
            } catch (err) {
                console.error("Gagal ambil riwayat penitip:", err);
            }
        };

        fetchRiwayat();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={styles.container}>
                {riwayat.map((barang) => (
                    <View key={barang.id_barang} style={styles.card}>
                        {/* <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{barang.status_transaksi}</Text>
                        </View> */}
                        <Text style={styles.text}>
                            Dititipkan pada: {formatDate(barang.tanggal_masuk)}
                        </Text>
                        {/* <Text style={styles.text}>
                            Tanggal Terjual: {formatDate(barang.tanggal_keluar)}
                        </Text> */}

                        <View style={styles.productRow}>
                            <Image
                                source={{
                                    uri:
                                        barang.gambar_barang?.[0]?.src_img ||
                                        "https://via.placeholder.com/60",
                                }}
                                style={styles.productImage}
                            />
                            <View>
                                <Text style={styles.productName}>{barang.nama_barang}</Text>
                                <Text style={styles.productPrice}>
                                    {formatRupiah(barang.harga_barang)}
                                </Text>
                                <Text style={styles.text}>Status: {barang.status_titip}</Text>
                            </View>
                        </View>

                        <View style={styles.bottomRow}>
                            <TouchableOpacity
                                // onPress={() => router.push(`/detail-barang/${barang.id_barang}`)}
                                style={styles.detailButton}
                            >
                                <Text style={styles.detailButtonText}>Lihat Detail Barang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statusBadge: {
        backgroundColor: "#D1FADF",
        alignSelf: "flex-start",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8,
    },
    statusText: {
        color: "#027A48",
        fontWeight: "600",
        fontSize: 12,
    },
    text: {
        fontSize: 13,
        marginBottom: 4,
    },
    productRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 8,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        backgroundColor: "#eee",
    },
    productName: {
        fontWeight: "600",
    },
    productPrice: {
        color: "#666",
        fontSize: 12,
    },
    moreProduct: {
        color: "#777",
        fontSize: 12,
        marginTop: 4,
    },
    bottomRow: {
        marginTop: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    totalText: {
        fontWeight: "700",
    },
    detailButton: {
        borderColor: "#220593",
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 6,
    },
    detailButtonText: {
        fontWeight: "600",
        color: "#220593",
        fontSize: 12,
    },
});
