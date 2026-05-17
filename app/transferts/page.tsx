import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Mercatometre from '@/components/Mercatometre'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transferts FC Barcelone — Barça Infos',
  description: 'Rumeurs, officiels et analyses du mercato barcelonais.',
}

export default function TransfertsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--barca-dark)' }}>
      <Header />

      <div style={{ background: 'linear-gradient(135deg,#0a0f1e,#1a0a12)', borderBottom: '1px solid var(--barca-border)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '4px', height: '32px', background: 'linear-gradient(to bottom,var(--barca-red),var(--barca-gold))', borderRadius: '2px' }} />
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, color: 'white' }}>Transferts</h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginLeft: '16px' }}>Rumeurs, officiels et analyses du mercato barcelonais</p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 className="section-title">Mercatomètre</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginLeft: '16px', fontFamily: 'DM Mono,monospace' }}>
            Indice de crédibilité des rumeurs · Mercato été 2026
          </p>
        </div>
        <Mercatometre />
      </div>

      <Footer />
    </main>
  )
}
