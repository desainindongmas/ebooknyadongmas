import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  const [ebooks, setEbooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/ebooks')
      .then(res => res.json())
      .then(data => {
        setEbooks(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  // Group by kategori -> subkategori
  const grouped = {}
  ebooks.forEach(item => {
    const kat = item.kategori || 'Umum'
    const sub = item.subkategori || 'Lainnya'
    if (!grouped[kat]) grouped[kat] = {}
    if (!grouped[kat][sub]) grouped[kat][sub] = []
    grouped[kat][sub].push(item)
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft">
        <div className="text-2xl text-primary font-semibold animate-pulse">📖 Memuat ebook...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>ebooknyadongmas • Katalog Ebook</title>
        <meta name="description" content="Kumpulan ebook seru dan bermanfaat" />
      </Head>

      <div className="min-h-screen bg-soft">
        {/* Header */}
        <header className="bg-white border-b border-secondary/20 py-6 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-4xl">📚</span>
              <h1 className="text-2xl font-extrabold text-primary tracking-tight">ebooknyadongmas</h1>
            </div>
            <div className="text-sm text-gray-400 bg-secondary/20 px-4 py-2 rounded-full">
              🛒 Beli & Download Langsung
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-center text-gray-500 text-lg mb-10">
            Pilih ebook favoritmu, bayar via Mayar, dapatkan link download di email! ✨
          </p>

          {Object.keys(grouped).map(kategori => (
            <div key={kategori} className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <span>{kategori === 'Panduan' ? '📘' : '🎨'}</span> {kategori}
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>

              {Object.keys(grouped[kategori]).map(subkategori => (
                <div key={subkategori} className="mb-10">
                  <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <span>📂</span> {subkategori}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {grouped[kategori][subkategori].map(ebook => (
                      <Link href={`/${ebook.id}`} key={ebook.id}>
                        <div className="card-shadow bg-white rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col border border-secondary/10">
                          <div className="h-48 overflow-hidden bg-secondary/10 flex items-center justify-center">
                            {ebook.cover_url ? (
                              <img src={ebook.cover_url} alt={ebook.judul} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-6xl">📄</span>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col">
                            <h4 className="font-bold text-gray-800 text-lg line-clamp-1">{ebook.judul}</h4>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-1">{ebook.deskripsi}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-primary font-bold text-lg">Rp {parseInt(ebook.harga).toLocaleString('id-ID')}</span>
                              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">Beli →</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {ebooks.length === 0 && (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-gray-400 text-xl">Belum ada ebook. Yuk tambahin di Google Sheets!</p>
            </div>
          )}
        </main>

        <footer className="bg-white border-t border-secondary/20 py-6 text-center text-gray-400 text-sm">
          © 2026 ebooknyadongmas • Dibuat dengan ❤️ dan kopi
        </footer>
      </div>
    </>
  )
}