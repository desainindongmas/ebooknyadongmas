import { getEbooksFromSheet } from '../../lib/sheets'

export default async function handler(req, res) {
  try {
    const data = await getEbooksFromSheet()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Gagal ambil data ebook' })
  }
}