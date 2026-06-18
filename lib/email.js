import nodemailer from 'nodemailer'

export async function sendDownloadEmail(toEmail, judul, linkFile) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const htmlContent = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #fff5f7; border-radius: 20px; border: 2px solid #ffb3c6;">
      <div style="text-align: center;">
        <h1 style="color: #ff6b8a; font-size: 28px;">📖 ebooknyadongmas</h1>
        <p style="color: #555; font-size: 18px;">Terima kasih sudah membeli!</p>
      </div>
      <div style="background: white; padding: 25px; border-radius: 16px; margin: 20px 0;">
        <h2 style="color: #333; font-size: 20px;">✨ ${judul}</h2>
        <p style="color: #666;">Klik tombol di bawah untuk mengunduh ebook Anda:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${linkFile}" target="_blank" style="background: #ff6b8a; color: white; padding: 14px 40px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 18px; display: inline-block;">⬇️ Download Ebook</a>
        </div>
        <p style="color: #999; font-size: 14px; text-align: center;">Link ini hanya untuk Anda. Jangan bagikan ke orang lain ya!</p>
      </div>
      <p style="text-align: center; color: #aaa; font-size: 12px;">© ebooknyadongmas • Selamat membaca!</p>
    </div>
  `

  await transporter.sendMail({
    from: `"ebooknyadongmas" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: `📚 Download Ebook: ${judul}`,
    html: htmlContent,
  })
}