import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelime Bulma Oyunu',
  description: 'Bir kelime yaz ve doğru harflerden kelimeyi tahmin etmeye çalış',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='font-secondFont'>
      <body>{children}</body>
    </html>
  )
}
