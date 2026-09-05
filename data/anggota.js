/**
 * Data anggota JURNAL.
 * Setiap anggota wajib punya: id, nama, divisi, foto.
 * jabatan & quote opsional (boleh string kosong).
 *
 * divisi harus salah satu dari:
 * "kreatif" | "desain-grafis" | "editing" | "fotografi" | "videografi" | "artikel"
 */

const anggotaData = [
  {
    id: "anggota-001",
    nama: "Nama Anggota Satu",
    divisi: "fotografi",
    jabatan: "Kepala Divisi",
    foto: "assets/anggota/fotografi/nama-anggota-satu.jpg",
    quote: "Setiap momen layak diabadikan."
  },
  {
    id: "anggota-002",
    nama: "Nama Anggota Dua",
    divisi: "fotografi",
    jabatan: "",
    foto: "assets/anggota/fotografi/nama-anggota-dua.jpg",
    quote: "Foto yang baik bercerita tanpa kata."
  },
  {
    id: "anggota-003",
    nama: "Nama Anggota Tiga",
    divisi: "videografi",
    jabatan: "Kepala Divisi",
    foto: "assets/anggota/videografi/nama-anggota-tiga.jpg",
    quote: "Gerak menyampaikan apa yang diam tak bisa."
  },
  {
    id: "anggota-004",
    nama: "Nama Anggota Empat",
    divisi: "desain-grafis",
    jabatan: "Kepala Divisi",
    foto: "assets/anggota/desain-grafis/nama-anggota-empat.jpg",
    quote: "Desain adalah cara berpikir yang terlihat."
  },
  {
    id: "anggota-005",
    nama: "Nama Anggota Lima",
    divisi: "editing",
    jabatan: "",
    foto: "assets/anggota/editing/nama-anggota-lima.jpg",
    quote: "Rapi di potong, kuat di cerita."
  },
  {
    id: "anggota-006",
    nama: "Nama Anggota Enam",
    divisi: "artikel",
    jabatan: "Kepala Divisi",
    foto: "assets/anggota/artikel/nama-anggota-enam.jpg",
    quote: "Kata-kata yang tepat mengabadikan makna."
  },
  {
    id: "anggota-007",
    nama: "Nama Anggota Tujuh",
    divisi: "kreatif",
    jabatan: "Kepala Divisi",
    foto: "assets/anggota/kreatif/nama-anggota-tujuh.jpg",
    quote: "Ide adalah awal dari semua yang kita buat."
  }
];

// Struktur inti (ketua & wakil) dipisah dari anggota divisi
// karena ditampilkan berbeda di anggota.html dan profil.html.
const kepengurusanInti = {
  ketua: {
    nama: "Nama Ketua",
    periode: "JURNAL 2026/2027",
    foto: "assets/anggota/ketua.jpg"
  },
  wakilKetua: {
    nama: "Nama Wakil Ketua",
    foto: "assets/anggota/wakil-ketua.jpg"
  }
};