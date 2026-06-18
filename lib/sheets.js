import { google } from 'googleapis'

export async function getEbooksFromSheet() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SPREADSHEET_ID,
    range: 'Sheet1!A2:I', // mulai dari A2 (skip header)
  })

  const rows = response.data.values || []
  return rows.map(row => ({
    id: row[0] || '',
    judul: row[1] || 'Tanpa Judul',
    kategori: row[2] || 'Umum',
    subkategori: row[3] || '-',
    deskripsi: row[4] || '',
    harga: row[5] || '0',
    cover_url: row[6] || '/default-cover.jpg',
    mayar_product_id: row[7] || '', // ID produk di Mayar
    link_file: row[8] || '',
  }))
}