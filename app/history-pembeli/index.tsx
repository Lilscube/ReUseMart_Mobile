import { BASE_URL_MOBILE } from "@/context/config";
import { TransaksiModel } from "@/model/Transaksi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

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
        minimumFractionDigits: 0, // tidak menampilkan .00
        maximumFractionDigits: 0, // pastikan tidak ada angka desimal
    });
}



export default function HistoryPembeliPage() {
    const router = useRouter();
    const [riwayat, setRiwayat] = useState<TransaksiModel[]>([]);

    useEffect(() => {
        const fetchRiwayat = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                const res = await fetch(`${BASE_URL_MOBILE}/by-pembeli/transaksi`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.ok && data.transaksi) {
                    setRiwayat(data.transaksi);
                }
            } catch (err) {
                console.error("Gagal ambil riwayat:", err);
            }
        };

        fetchRiwayat();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={styles.container}>
                {riwayat.map((trx) => (
                    <View key={trx.id_transaksi} style={styles.card}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{trx.status_transaksi}</Text>
                        </View>
                        <Text style={styles.text}>No. Nota: {trx.no_nota}</Text>
                        <Text style={styles.text}>Dipesan pada: {trx.tanggal_pesan}</Text>
                        <Text style={styles.text}>
                            Selesai pada: {formatDate(trx.tanggal_lunas)}
                        </Text>

                        {trx.barang?.length > 0 && (
                            <View style={styles.productRow}>
                                <Image
                                    source={{
                                        uri:
                                            trx.barang[0].gambar_barang?.[0]?.src_img ||
                                            "https://via.placeholder.com/60",
                                    }}
                                    style={styles.productImage}
                                />
                                <View>
                                    <Text style={styles.productName}>
                                        {trx.barang[0].nama_barang}
                                    </Text>
                                    <Text style={styles.productPrice}>
                                        {formatRupiah(trx.barang[0].harga_barang)}
                                    </Text>
                                </View>
                            </View>
                        )}

                        {trx.barang.length > 1 && (
                            <Text style={styles.moreProduct}>
                                + {trx.barang.length - 1} barang lainnya
                            </Text>
                        )}

                        <View style={styles.bottomRow}>
                            <Text style={styles.totalText}>
                                {formatRupiah(trx.harga_akhir)}
                            </Text>

                            <TouchableOpacity
                                onPress={() => router.push(`/detail-transaksi-pembeli/${trx.id_transaksi}`)}
                                style={[styles.detailButton, { marginTop: 8 }]}
                            >
                                <Text style={styles.detailButtonText}>Lihat Detail Transaksi</Text>
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
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
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
