import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Barça Infos — Toute l\'actualité du FC Barcelone en français',
  description: 'Actualités, transferts, analyses et avant-matchs du FC Barcelone en français.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
