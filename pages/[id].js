import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Detail() {
  const router = useRouter()
  const { id } = router.query
  const [ebook, setEbook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        const found = data.find(item => item.id === id)
        setEbook(found || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft">
        <div className="text-2xl text-primary animate-pulse">⏳ Memuat...</div>
      </div>
    )
  }

  if (!ebook) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soft">
        <p className="text-6xl mb-4">😅</p>
        <h1 className="text-2xl font-bold text-gray-600">Ebook tidak ditemukan</h1>
        <Link href="/" className="mt-4 text-primary underline">Kembali ke katalog</Link>
      </div>
    )
  }

  // Cari link bundling? Kita kasih catatan di deskripsi.
  // Atau kita buat tombol "Beli Paket" mengarah ke Mayar bundling.
  // Karena kita simpan di sheet hanya 1 product_id, kita asumsikan untuk bundling user buat produk terpisah di Mayar.
  // Saya sarankan di sheet tambah kolom 'link_bundling' kalau mau. Tapi untuk sederhana, saya kasih tombol beli satuan.

  return (
    <>
      <Head>
        <title>{ebook.judul} • ebooknyadongmas</title>
      </Head>

      <div className="min-h-screen bg-soft py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-block text-primary hover:underline mb-6">← Kembali ke katalog</Link>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-secondary/20">
            <div className="md:flex">
              <div className="md:w-2/5 bg-secondary/10 flex items-center justify-center p-8">
                {ebook.cover_url ? (
                  <img src={ebook.cover_url} alt={ebook.judul} className="rounded-2xl max-h-96 object-contain" />
                ) : (
                  <span className="text-8xl">📖</span>
                )}
              </div>
              <div className="md:w-3/5 p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">{ebook.kategori}</span>
                  <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">{ebook.subkategori}</span>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800">{ebook.judul}</h1>
                <p className="text-gray-500 mt-3 text-lg leading-relaxed">{ebook.deskripsi}</p>
                <div className="mt-6 flex items-center gap-4 flex-wrap">
                  <span className="text-4xl font-bold text-primary">Rp {parseInt(ebook.harga).toLocaleString('id-ID')}</span>
                  <span className="text-sm text-gray-400">/ ebook</span>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://mayar.id/link/${ebook.mayar_product_id}`} // Ganti dengan format link Mayar Anda
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white font-bold py-4 px-8 rounded-full text-center hover:bg-primary/90 transition shadow-md flex items-center justify-center gap-2"
                  >
                    🛒 Beli Sekarang
                  </a>
                  <button
                    onClick={() => alert('💡 Untuk bundling (beli banyak lebih hemat), buat produk bundling di dashboard Mayar lalu tambahkan link-nya di deskripsi atau sheet.')}
                    className="border-2 border-primary text-primary font-semibold py-4 px-8 rounded-full text-center hover:bg-primary/5 transition"
                  >
                    🎁 Mau paket hemat?
                  </button>
                </div>

                <div className="mt-6 bg-soft p-4 rounded-xl text-sm text-gray-500 border border-secondary/10">
                  💡 Setelah bayar, link download akan dikirim ke email Anda dalam beberapa menit.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}