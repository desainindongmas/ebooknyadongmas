import { getEbooksFromSheet } from '../../lib/sheets'
import { sendDownloadEmail } from '../../lib/email'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verifikasi secret (optional tapi recommended)
  const secret = req.headers['x-webhook-secret']
  if (secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const payload = req.body
    console.log('Webhook received:', payload)

    // --- SESUAIKAN DENGAN FORMAT DATA DARI MAYAR ---
    // Contoh format umum Mayar:
    // { status: "PAID", order_id: "...", product_id: "...", customer: { email: "..." } }
    // Silakan cek dokumentasi Mayar, sesuaikan path di bawah ini.

    const status = payload.status || payload.transaction_status
    if (status !== 'PAID' && status !== 'settlement') {
      return res.status(200).json({ message: 'Not paid yet' })
    }

    const productId = payload.product_id || payload.item_id
    const customerEmail = payload.customer?.email || payload.email

    if (!productId || !customerEmail) {
      return res.status(400).json({ error: 'Missing product_id or email' })
    }

    // Ambil semua ebook
    const ebooks = await getEbooksFromSheet()
    const ebook = ebooks.find(item => item.mayar_product_id === productId)

    if (!ebook) {
      console.error(`Ebook dengan product_id ${productId} tidak ditemukan`)
      return res.status(404).json({ error: 'Ebook not found' })
    }

    // Kirim email
    await sendDownloadEmail(customerEmail, ebook.judul, ebook.link_file)

    res.status(200).json({ success: true, message: 'Email sent' })
  } catch (error) {
    console.error('Webhook error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}