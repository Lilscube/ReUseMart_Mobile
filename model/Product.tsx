export type Barang = {
  id_barang: number;
  nama_barang: string;
  harga_barang: number;
  gambar_barang: { src_img: string }[];
  kategori_barang: string[];
};