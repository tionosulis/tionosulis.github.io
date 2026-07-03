# Post Authoring Guidelines

## 0. Draft Workflow

Setiap post baru WAJIB `draft: true` di frontmatter. Tidak boleh langsung publish.

**Flow:**
1. Tulis post → `draft: true` → commit & push
2. User review & baca ulang
3. User perintahkan publish → set `draft: false` → commit & push ke main

Jangan publish tanpa persetujuan eksplisit.

---

## 1. SEO Title

Cek panjang `title` di frontmatter. Kalau > 60 karakter:
- Tambahkan `seoTitle` — versi ringkas (idealnya 45–55 karakter)
- Harus tetap overlap keyword dengan `title` asli (bukan judul baru beda topik)

Kalau `title` ≤ 60 karakter, skip `seoTitle` — fallback otomatis berlaku.

**Field mapping:**
| Elemen | Sumber |
|---|---|
| H1 (halaman) | `title` |
| `<title>` tag | `seoTitle or title` |
| `og:title` | `title` |
| `twitter:title` | `title` |
| JSON-LD `headline` | `title` |

Build akan warning kalau `title` > 60 karakter dan `seoTitle` kosong — cek log build sebelum push.

---

## 2. Alt Text

Setiap `<img>` konten (bukan dekoratif) WAJIB punya `alt`. Gambar dekoratif murni pakai `alt=""` (bukan dihilangkan sama sekali — atribut tetap ada, isinya kosong).

**Panjang**: 80–125 karakter. Screen reader umumnya cut off setelah ~125 karakter, jadi informasi penting harus ada di awal.

**Prinsip nulis**:
- Jawab: "apa yang orang lewatkan kalau nggak bisa lihat gambar ini, dalam konteks post ini?" — bukan deskripsi generik yang berdiri sendiri.
- Jangan mulai dengan "gambar dari" / "foto" / "image of" — screen reader udah otomatis announce elemen sebagai gambar.
- Untuk hero image / diagram teknis: sebutkan elemen visual yang relevan ke argumen post — pertahankan level detail yang udah ada.
- Kalau ada 1–2 gambar per post yang paling representatif ke topik, boleh selipkan keyword utama post secara natural — jangan dipaksa di semua gambar (keyword stuffing di alt text kena flag sebagai spam signal).
- Untuk screenshot code/terminal: sebutkan bahasa/tool dan apa yang didemonstrasikan, bukan cuma "code screenshot".

**og:image:alt / twitter:image:alt**: boleh sedikit lebih deskriptif dari alt text di body (karena ini representasi gambar di luar konteks artikel — orang yang lihat card share belum tentu baca teks sekitarnya).

---

## 3. Caption

Caption (teks di bawah gambar, format `*italic*` setelah image di markdown) dipakai untuk:
- Konteks tambahan yang nggak muat di alt text
- Atribusi/sumber kalau gambar bukan buatan sendiri
- Catatan teknis singkat (contoh: nama tool, versi, tanggal screenshot diambil)

**Bukan pengganti alt text** — dua-duanya harus tetap diisi, isinya boleh saling melengkapi tapi jangan identik copy-paste.

**Panjang**: 1 kalimat pendek, maksimal ~15 kata. Kalau butuh penjelasan panjang, itu tandanya harusnya masuk body text, bukan caption.

---

## 4. Meta Description

- 100–160 karakter (aman dari truncation Google).
- Bukan ringkasan generik — highlight hook atau kesimpulan spesifik post. Contoh: *"Five font pairings, three redesigns, one conclusion: ..."* — angka konkret + payoff, bukan "artikel ini membahas tentang...".
- Satu kalimat aktif, hindari mulai dengan "Post ini..." atau "Artikel tentang...".

---

## 5. Image Technical Checklist

- Format: `.webp` untuk semua gambar konten (sudah standar di blog ini).
- `width`/`height` eksplisit di setiap `<img>` — wajib untuk cegah CLS.
- Hero image (LCP candidate): jangan `loading="lazy"`, pertimbangkan `loading="eager"` atau preload kalau above-the-fold.
- Gambar non-hero di bawah fold: `loading="lazy"` default.
- Nama file deskriptif dengan hyphen (`hero-color-system-light-dark.webp`), bukan `IMG_4832.webp` atau hash acak — confirmed ranking signal untuk Google Images.
- Hero SVG image + `image_alt` di frontmatter: by request, tidak wajib.

---

## 7. SVG Color Scheme Reference

**Background gradient** (OG images / hero SVGs):
- Start: `#1E2A38` (top-left)
- End: `#1A2430` (bottom-right)
- Fallback flat: `#1A2430`

**Texture**: dot pattern `#2A4055` at 0.3–0.5 opacity, 24–28px grid

**Palette**:

| Role | Color | Usage |
|---|---|---|
| Panel fill | `#1A2634` | Card backgrounds, code panes |
| Bottom strip | `#16202E` | Config/status bar |
| Accent blue | `#3B82F6` | Primary interactive, arrows |
| Blue light | `#60A8F0` | Highlighted elements |
| Code amber | `#C08040` | Code/config labels |
| Status red | `#E05050` | Errors, warnings |
| Status green | `#10D9A8` | Success, validation pass |
| Text bright | `#7A9AB0` | Labels, headings |
| Text muted | `#6A8AAA` | Secondary text / borders |
| Border | `#3A5068` | Frames, dividers |
| Frame corner | `#3A5068` | Outer border corner, 0.8 opacity |

**Kapan pakai**: Semua OG image / hero SVG baru.
**Skip** kalau konten spesifik butuh `#161616` sebagai bagian dari cerita (dark mode comparison, terminal aesthetic).

---

## 6. Pre-Publish Checklist (ringkas)

- [ ] `title` dicek panjangnya, `seoTitle` diisi kalau perlu
- [ ] `description` (meta) 100–160 karakter
- [ ] Semua `<img>` konten punya `alt` deskriptif (bukan generik)
- [ ] Caption (kalau ada) melengkapi alt text, bukan duplikat
- [ ] `og:image` + `og:image:alt` + `twitter:image:alt` terisi (kalau ada hero image)
- [ ] `width`/`height` di semua `<img>`
- [ ] JSON-LD `headline` match `title`/H1
- [ ] Tags di frontmatter relevan & konsisten sama post lain bertopik sama
