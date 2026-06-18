import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Success() {
  const router = useRouter()
  const { order_id } = router.query

  useEffect(() => {
    // Bisa kirim event tracking atau log
    console.log('Order sukses:', order_id)
  }, [order_id])

  return (
    <div className="min-h-screen bg-soft flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center border border-secondary/20">
        <div className="text-7xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-gray-800">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 mt-3 text-lg">
          Ebook akan segera dikirim ke <span className="font-semibold text-primary">email</span> Anda.
        </p>
        <div className="bg-soft p-4 rounded-xl my-6 text-sm text-gray-500 border border-secondary/10">
          ⏳ Cek inbox atau folder spam. Biasanya sampai dalam 2-5 menit.
        </div>
        <Link href="/" className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition">
          📚 Kembali ke Katalog
        </Link>
      </div>
    </div>
  )
}