import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GrilleEffectif from '@/components/GrilleEffectif'
import RadarJoueur from '@/components/RadarJoueur'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Effectif FC Barcelone — Barça Infos',
  description: 'Effectif complet du FC Barcelone, saison 2025-26.',
}

export default function EffectifPage() {
  return (
    <main style={{ minHeight:'100vh', background:'var(--barca-dark)' }}>
      <Header />
      <div style={{ background:'linear-gradient(135deg,#0a0f1e,#0a1a0f)', borderBottom:'1px solid var(--barca-border)', padding:'48px 24px 40px' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'12px' }}>
            <div style={{ width:'4px', height:'32px', background:'linear-gradient(to bottom,var(--barca-blue),var(--barca-gold))', borderRadius:'2px' }} />
            <h1 style={{ fontFamily:'Playfair Display,serif', fontSize:'clamp(1.8rem,3vw,2.5rem)', fontWeight:900, color:'white' }}>Effectif</h1>
          </div>
          <p style={{ fontSize:'15px', color:'var(--text-secondary)', marginLeft:'16px' }}>Effectif complet · FC Barcelone · Saison 2025-26</p>
        </div>
      </div>

      <div style={{ maxWidth:'1280px', margin:'0 auto', padding:'40px 24px 80px' }}>

        <div style={{ marginBottom:'56px' }}>
          <div style={{ marginBottom:'20px' }}>
            <h2 className="section-title">Grille de l'Effectif</h2>
            <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'6px', marginLeft:'16px', fontFamily:'DM Mono,monospace' }}>
              Effectif complet · Filtres par secteur & catégorie
            </p>
          </div>
          <GrilleEffectif />
        </div>

        <div>
          <div style={{ marginBottom:'20px' }}>
            <h2 className="section-title">Radar de Profil</h2>
            <p style={{ fontSize:'13px', color:'var(--text-muted)', marginTop:'6px', marginLeft:'16px', fontFamily:'DM Mono,monospace' }}>
              Fiche joueur · Profil de jeu adapté au poste · Stats avancées
            </p>
          </div>
          <RadarJoueur />
        </div>

      </div>
      <Footer />
    </main>
  )
}
