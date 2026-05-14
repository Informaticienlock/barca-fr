import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Barça Infos — Toute l\'actualité du FC Barcelone en français',
    template: '%s — Barça Infos',
  },
  description: 'Le média français de référence sur le FC Barcelone. Actualités, transferts, analyses et avant-matchs — toujours en premier.',
  keywords: ['FC Barcelone', 'Barça', 'actualité Barça', 'Liga', 'Champions League', 'transferts Barça'],
  verification: {
    google: 'Xdn9vCP3gZxGX31ckxS0vyKDfrXXEtoLW20G2DmjLN8',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://barca-fr.vercel.app',
    siteName: 'Barça Infos',
    title: 'Barça Infos — Toute l\'actualité du FC Barcelone en français',
    description: 'Le média français de référence sur le FC Barcelone.',
    images: [{
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80',
      width: 1200, height: 630, alt: 'Barça Infos',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barça Infos',
    description: 'Le média français de référence sur le FC Barcelone.',
    images: ['https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
