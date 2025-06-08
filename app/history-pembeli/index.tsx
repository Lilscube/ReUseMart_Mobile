import { useEffect, useState } from "react";
import { TransaksiModel } from "@/model/Transaksi";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native';

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

export default function HistoryPembeliPage() {
    const router = useRouter();
    const [riwayat, setRiwayat] = useState<TransaksiModel[]>([]);

    useEffect(() => {
        setRiwayat(dataDummyRiwayat.filter((trx) => trx.status_transaksi === "Selesai"));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

            <ScrollView style={styles.container}>
                {/* <Text style={styles.period}>Periode: 01 Jun 2025 - 08 Jun 2025</Text> */}

                {riwayat.map((trx) => (
                    <View key={trx.id_transaksi} style={styles.card}>
                        <View style={styles.statusBadge}><Text style={styles.statusText}>{trx.status_transaksi}</Text></View>
                        <Text style={styles.text}>No. Nota: {trx.no_nota}</Text>
                        <Text style={styles.text}>Dipesan pada tanggal: {trx.tanggal_pesan}</Text>
                        <Text style={styles.text}>Selesai pada tanggal: {formatDate(trx.tanggal_lunas)}</Text>

                        <View style={styles.productRow}>
                            <Image source={{ uri: trx.barang[0].gambar_barang }} style={styles.productImage} />
                            <View>
                                <Text style={styles.productName}>{trx.barang[0].nama_barang}</Text>
                                <Text style={styles.productPrice}>Rp{trx.barang[0].harga_barang.toLocaleString()}</Text>
                            </View>
                        </View>

                        {trx.barang.length > 1 && (
                            <Text style={styles.moreProduct}>+ {trx.barang.length - 1} barang lainnya</Text>
                        )}

                        <View style={styles.bottomRow}>
                            <Text style={styles.totalText}>Total Bayar: Rp {trx.harga_akhir.toLocaleString()}</Text>
                            <TouchableOpacity
                                onPress={() => router.push(`/detail-transaksi-pembeli/${trx.id_transaksi}`)}
                                style={styles.detailButton}
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

const dataDummyRiwayat: TransaksiModel[] = [
    {
        id_transaksi: 1,
        no_nota: "25.06.5",
        harga_awal: 95000,
        ongkos_kirim: 15000,
        diskon: 0,
        harga_akhir: 110000,
        status_transaksi: "Selesai",
        tanggal_pesan: "01 Jun 2025, 12:00",
        tanggal_lunas: "2025-06-01T12:30:00",
        tambahan_poin: 10,
        status_pembayaran: "Lunas",
        img_bukti_transfer: null,
        is_rated: true,
        jenis_pengiriman: "Kurir",
        lokasi: "Jl. Contoh 1",
        barang: [
            {
                id_barang: 1,
                nama_barang: "Kopi 4 Shot",
                harga_barang: 19000,
                stok_barang: 10,
                gambar_barang: "https://via.placeholder.com/60",
            },
            {
                id_barang: 2,
                nama_barang: "Brownies Panggang",
                harga_barang: 76000,
                stok_barang: 5,
                gambar_barang: "https://via.placeholder.com/60",
            },
        ],
    },
    {
        id_transaksi: 2,
        no_nota: "25.06.1",
        harga_awal: 100000,
        ongkos_kirim: 19000,
        diskon: 0,
        harga_akhir: 119000,
        status_transaksi: "Selesai",
        tanggal_pesan: "01 Jun 2025, 06:40",
        tanggal_lunas: "2025-06-01T07:00:00",
        tambahan_poin: 5,
        status_pembayaran: "Lunas",
        img_bukti_transfer: null,
        is_rated: false,
        jenis_pengiriman: "Kurir",
        lokasi: "Jl. Contoh 2",
        barang: [
            {
                id_barang: 3,
                nama_barang: "Novel Laskar Pelangi",
                harga_barang: 100000,
                stok_barang: 3,
                gambar_barang: "https://via.placeholder.com/60",
            },
        ],
    },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    period: {
        fontSize: 14,
        color: "#555",
        marginBottom: 12,
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