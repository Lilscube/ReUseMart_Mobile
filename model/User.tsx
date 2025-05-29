export interface UserModel {
  id: string;
  nama: string;
  email: string;
  no_telepon: string;
  role: "penitip" | "pembeli" | "pegawai" | "organisasi";
  src_img_profile?: string;
  poin_loyalitas?: number;
}
