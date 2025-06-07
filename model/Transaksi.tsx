import { BarangModel } from "./Barang";

export interface TransaksiModel {
  id_transaksi: number;
  no_nota: string;
  harga_awal: number;
  ongkos_kirim: number;
  diskon: number;
  harga_akhir: number;
  status_transaksi: string;
  tanggal_pesan: string;
  tanggal_lunas: string | null;
  tambahan_poin: number;
  status_pembayaran: string;
  img_bukti_transfer: string | null;
  is_rated: boolean;
  petugas_name?: string;
  jenis_pengiriman?: string;
  tanggal_kirim?: string | null;
  tanggal_terima?: string | null;
  lokasi?: string;
  barang: BarangModel[];
}
