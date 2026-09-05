/**
 * Data dokumentasi JURNAL.
 * keywords dipakai untuk search (Part 2C) — isi dengan variasi kata
 * yang mungkin diketik user, termasuk sinonim ringan.
 *
 * category harus salah satu dari: "sekolah" | "organisasi" | "pelatihan"
 * divisi mengacu ke id divisi yang sama seperti di anggota.js
 */

const dokumentasiData = [
  {
    id: "upacara-bendera",
    title: "Upacara Bendera",
    date: "2026-08-12",
    category: "sekolah",
    divisi: "fotografi",
    fotografer: "Nama Anggota Satu",
    thumbnail: "assets/dokumentasi/upacara-bendera.jpg",
    description: "Dokumentasi kegiatan upacara bendera rutin hari Senin di lapangan sekolah.",
    keywords: ["upacara", "bendera", "senin", "lapangan"],
    driveUrl: "https://drive.google.com/drive/folders/GANTI_DENGAN_ID_FOLDER"
  },
  {
    id: "malabar",
    title: "Kegiatan Malabar",
    date: "2026-07-20",
    category: "organisasi",
    divisi: "videografi",
    fotografer: "Nama Anggota Tiga",
    thumbnail: "assets/dokumentasi/malabar.jpg",
    description: "Dokumentasi kegiatan Malabar yang diselenggarakan oleh JURNAL.",
    keywords: ["malabar", "kegiatan organisasi"],
    driveUrl: "https://drive.google.com/drive/folders/GANTI_DENGAN_ID_FOLDER"
  },
  {
    id: "ldk",
    title: "LDK (Latihan Dasar Kepemimpinan)",
    date: "2026-09-01",
    category: "pelatihan",
    divisi: "fotografi",
    fotografer: "Nama Anggota Dua",
    thumbnail: "assets/dokumentasi/ldk.jpg",
    description: "Dokumentasi pelatihan dasar kepemimpinan untuk anggota baru JURNAL.",
    keywords: ["ldk", "latihan dasar kepemimpinan", "pelatihan", "leadership"],
    driveUrl: "https://drive.google.com/drive/folders/GANTI_DENGAN_ID_FOLDER"
  }
];