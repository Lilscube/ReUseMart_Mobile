export type PengirimanModel = {
  id_pengiriman: number;
  id_transaksi: number;
  tanggal_kirim?: number;
  tanggal_terima?: number;
  status_pengiriman: string;
  id_alamat?: number;
  lokasi?: string;
  note?: string;
  nama_penerima?: string;
};  