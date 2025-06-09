
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { BASE_URL_API } from "@/context/config";
import { TransaksiModel } from "@/model/Transaksi";
import { UserModel } from "@/model/User";
import { SafeAreaView } from 'react-native';

import {
    ScrollView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from "react-native";

export default function DetailTransaksiPage() {
    const { id_transaksi } = useLocalSearchParams();
    const [transaksi, setTransaksi] = useState<TransaksiModel | null>(null);

    useEffect(() => {
        if (!id_transaksi) return;

        const fetchTransaksi = async () => {
            try {
                const res = await fetch(`${BASE_URL_API}/transaksi/${id_transaksi}`);
                if (!res.ok) {
                    throw new Error("Gagal mengambil detail transaksi");
                }

                const data = await res.json();

                // Normalisasi agar gambar_barang jadi string (bukan objek)
                const barangWithImage = (data.barang || []).map((item: any) => ({
                    ...item,
                    gambar_barang: item.src_img, // konversi alias
                }));

                setTransaksi({
                    ...data.transaksi,
                    barang: barangWithImage,
                });
            } catch (error) {
                console.error("Fetch transaksi error:", error);
            }
        };

        fetchTransaksi();
    }, [id_transaksi]);



    // useEffect(() => {
    //     setTransaksi(dummyTransaksi);
    // }, []);

    if (!transaksi) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Detail Transaksi</Text>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{transaksi.status_transaksi || "Status Tidak Dikenal"}</Text>
                </View>

                <Text style={styles.label}>No. Nota: <Text style={styles.value}>{transaksi.no_nota}</Text></Text>
                <Text style={styles.label}>Tanggal Pesan: <Text style={styles.value}>{transaksi.tanggal_pesan}</Text></Text>

                <Text style={styles.sectionTitle}>Detail Produk:</Text>
                {transaksi.barang?.map((item, idx) => (
                    <View key={idx} style={styles.productCard}>
                        <Image
                            source={{ uri: item.gambar_barang || "https://via.placeholder.com/60" }}
                            style={styles.productImage}
                        />

                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>{item.nama_barang}</Text>
                            <Text style={styles.productPrice}>Rp{item.harga_barang.toLocaleString()}</Text>
                        </View>
                        {/* <TouchableOpacity style={styles.detailButton}>
                            <Text style={styles.detailButtonText}>Lihat Detail</Text>
                        </TouchableOpacity> */}
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
                <Text style={styles.label}>Opsi Pengiriman: <Text style={styles.value}>{transaksi.jenis_pengiriman || "-"}</Text></Text>
                <Text style={styles.label}>Alamat Pengiriman:</Text>
                <Text style={styles.value}>{transaksi.lokasi}</Text>

                <View style={[styles.actionButtons, { marginTop: 160 }]}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Lihat Bukti Pembayaran</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.actionText}>Bantuan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => Linking.openURL("https://wa.me/6281234567890")}
                    >
                        <Text style={styles.actionText}>Hubungi Customer Service</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#fff",
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    statusBadge: {
        backgroundColor: "#eee",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: "flex-start",
        marginBottom: 12,
    },
    statusText: {
        fontSize: 12,
        color: "#333",
    },
    label: {
        fontWeight: "600",
        fontSize: 14,
        marginVertical: 4,
    },
    value: {
        fontWeight: "400",
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 24,
        marginBottom: 8,
    },
    productCard: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#220593",
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
    },
    productName: {
        fontWeight: "600",
        fontSize: 14,
    },
    productPrice: {
        fontSize: 12,
        color: "#555",
    },
    detailButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#220593",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    detailButtonText: {
        color: "#220593",
        fontSize: 12,
    },
    actionButtons: {
        marginTop: 32,
        gap: 12,
    },
    actionButton: {
        borderWidth: 1,
        borderColor: "#220593",
        borderRadius: 24,
        paddingVertical: 10,
        alignItems: "center",
    },
    actionText: {
        color: "#220593",
        fontWeight: "600",
    },
});