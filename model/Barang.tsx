export interface BarangModel {
  id_barang: number;
  nama_barang: string;
  gambar_barang?: string;
  harga_barang: number;
  stok_barang: number;
  deskripsi_barang?: string;
  kategori_barang?: string;
  created_at?: string;
  updated_at?: string;
}