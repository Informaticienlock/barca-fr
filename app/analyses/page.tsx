import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlayerRating from '@/components/PlayerRating'
import StatsAvancees from '@/components/StatsAvancees'
import FocusJoueur from '@/components/FocusJoueur'
import EvolutionTactique from '@/components/EvolutionTactique'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analyses FC Barcelone — Barça Infos',
  description: 'Analyses tactiques, notes des joueurs et statistiques avancées du FC Barcelone.',
}

export default function AnalysesPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--barca-dark)' }}>
      <Header />
      <div style={{ background: 'linear-gradient(135deg,#0a0f1e,#0a1a0f)', borderBottom: '1px solid var(--barca-border)', padding: '48px 24px 40px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '4px', height: '32px', background: 'linear-gradient(to bottom,var(--barca-blue),var(--barca-gold))', borderRadius: '2px' }} />
            <h1 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 900, color: 'white' }}>Analyses & Tactique</h1>
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginLeft: '16px' }}>Notes des joueurs, xG et statistiques avancées</p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>

        <div style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="section-title">Notes des joueurs</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginLeft: '16px', fontFamily: 'DM Mono,monospace' }}>
              FC Barcelone 3-1 Real Madrid · Liga J32 · 20 avril 2026
            </p>
          </div>
          <PlayerRating />
        </div>

        <div style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="section-title">Statistiques Avancées</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginLeft: '16px', fontFamily: 'DM Mono,monospace' }}>
              FC Barcelone 3-1 Real Madrid · xG, passes progressives, réseau de passes
            </p>
          </div>
          <StatsAvancees />
        </div>

        <div style={{ marginBottom: '56px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="section-title">Focus Joueur</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginLeft: '16px', fontFamily: 'DM Mono,monospace' }}>
              FC Barcelone 3-1 Real Madrid · Duels de match, performance individuelle
            </p>
          </div>
          <FocusJoueur />
        </div>

        <div>
          <div style={{ marginBottom: '20px' }}>
            <h2 className="section-title">Évolution Tactique</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px', marginLeft: '16px', fontFamily: 'DM Mono,monospace' }}>
              Tendances sur les 10 derniers matchs · Liga & Champions League
            </p>
          </div>
          <EvolutionTactique />
        </div>

      </div>
      <Footer />
    </main>
  )
}
