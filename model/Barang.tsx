// export interface BarangModel {
//   id_barang: number;
//   nama_barang: string;
//   gambar_barang?: string;
//   harga_barang: number;
//   stok_barang: number;
//   deskripsi_barang?: string;
//   kategori_barang?: string;
//   created_at?: string;
//   updated_at?: string;
// }

export interface BarangModel {
  id_barang: number;
  nama_barang: string;
  kode_produk: string;
  harga_barang: number | string; // kadang string dari backend
  stok_barang?: number;

  status_titip: string;
  tanggal_masuk: string;
  tanggal_keluar?: string | null;
  tanggal_garansi?: string | null;

  deskripsi_barang?: string;
  penitip_name?: string;

  kategori_barang?: string[]; // atau string jika hanya 1
  gambar_barang: {
    id_gambar: number;
    src_img: string;
  }[];
  gambar_preview?: string;

  created_at?: string;
  updated_at?: string;
}
