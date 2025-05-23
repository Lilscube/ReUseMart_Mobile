import { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';

type Barang = {
    id_barang: Int32;
    kode_produk: string;
    nama_barang: string;
    deskripsi_barang: string;
    harga_barang: Float;
    status_titip: boolean;
}
