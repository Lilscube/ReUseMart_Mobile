
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

    useState<TransaksiModel | null>(null);

    // useEffect(() => {
    //     fetch(`${BASE_URL_API}/barang`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setBarangList(data.barang || []);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error("Gagal fetch barang:", err);
    //             setLoading(false);
    //         });
    // }, []);

    // useEffect(() => {
    //     async function fetchTransaksi() {
    //         try {
    //             const res = await fetch(
    //                 `${BASE_URL_API}/transaksi`)
    //             const data = await res.json();
    //             setTransaksi(data);
    //         } catch (error) {
    //             console.error("Failed to fetch transaksi", error);
    //         }
    //     }

    //     if (id_transaksi) fetchTransaksi();
    // }, [id_transaksi]);


    useEffect(() => {
        setTransaksi(dummyTransaksi);
    }, []);

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
                        <Image source={{ uri: item.gambar_barang }} style={styles.productImage} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productName}>{item.nama_barang}</Text>
                            <Text style={styles.productPrice}>Rp{item.harga_barang.toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.detailButton}>
                            <Text style={styles.detailButtonText}>Lihat Detail</Text>
                        </TouchableOpacity>
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

const dummyTransaksi: TransaksiModel = {
    id_transaksi: 1,
    no_nota: "2025.06.001",
    harga_awal: 180000,
    ongkos_kirim: 15000,
    diskon: 10000,
    harga_akhir: 185000,
    status_transaksi: "Dikirim",
    tanggal_pesan: "2025-06-08",
    tanggal_lunas: "2025-06-08T10:00:00",
    tambahan_poin: 5,
    status_pembayaran: "Lunas",
    img_bukti_transfer: "https://via.placeholder.com/150",
    is_rated: false,
    petugas_name: "Andi CS",
    jenis_pengiriman: "Kurir",
    tanggal_kirim: "2025-06-09",
    tanggal_terima: null,
    lokasi: "Jl. Mawar No. 123, Sleman, Yogyakarta",
    barang: [
        {
            id_barang: 101,
            nama_barang: "Kipas Angin Bekas",
            harga_barang: 80000,
            stok_barang: 2,
            gambar_barang: "https://via.placeholder.com/60",
            deskripsi_barang: "Kondisi masih bagus, hanya sedikit berdebu.",
            kategori_barang: "Elektronik",
            created_at: "2025-05-30T09:00:00",
            updated_at: "2025-06-01T15:00:00",
        },
        {
            id_barang: 102,
            nama_barang: "Setrika Philips",
            harga_barang: 100000,
            stok_barang: 1,
            gambar_barang: "https://via.placeholder.com/60",
            deskripsi_barang: "Setrika listrik dengan fitur anti lengket.",
            kategori_barang: "Peralatan Rumah",
            created_at: "2025-06-02T10:30:00",
            updated_at: "2025-06-05T13:20:00",
        },
    ],
};

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