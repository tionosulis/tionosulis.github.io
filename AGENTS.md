## SEO Title Checklist

Saat menulis atau mengedit post:

1. Cek panjang `title` di frontmatter. Kalau > 60 karakter:
   - Tambahkan `seoTitle` — versi ringkas (idealnya 45–55 karakter)
   - Pastikan `seoTitle` tetap punya overlap keyword dengan `title` asli
     (bukan judul baru yang beda topik/framing)
2. `og:title` dan `twitter:title` SELALU pakai `title` asli — jangan pernah
   di-override dengan `seoTitle`.
3. JSON-LD `headline` SELALU pakai `title` asli — harus match H1 yang
   tampil di halaman (Google guideline untuk structured data).
4. `<title>` tag di `<head>` pakai fallback: `{{ seoTitle or title }}`.
5. Kalau `title` ≤ 60 karakter, tidak perlu isi `seoTitle` — biarkan
   fallback otomatis ke `title`.
6. Build akan menampilkan warning (bukan error) kalau `title` > 60 karakter
   dan `seoTitle` kosong — cek output build sebelum push.

**Field mapping:**
| Elemen | Sumber |
|---|---|
| H1 (halaman) | `title` |
| `<title>` tag | `seoTitle or title` |
| `og:title` | `title` |
| `twitter:title` | `title` |
| JSON-LD `headline` | `title` |
