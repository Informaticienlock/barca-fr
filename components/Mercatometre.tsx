'use client'
import { useState } from 'react'

/* ── Types ── */
type Fiabilite = 'fiable' | 'moyenne' | 'faible'
type Statut = 'chaud' | 'tiede' | 'froid' | 'officiel'

type Rumeur = {
  id: number
  joueur: string
  age: number
  nationalite: string
  poste: string
  positionCode: string
  clubActuel: string
  clubLogo: string
  montant: string
  probabilite: number
  fiabilite: Fiabilite
  source: string
  date: string
  statut: Statut
  details: string
}

/* ── Données ── */
const RUMEURS: Rumeur[] = [
  {
    id: 1,
    joueur: 'Alphonso Davies',
    age: 24,
    nationalite: '🇨🇦',
    poste: 'Latéral Gauche',
    positionCode: 'LB',
    clubActuel: 'Bayern Munich',
    clubLogo: 'FCB',
    montant: '0 M€',
    probabilite: 82,
    fiabilite: 'fiable',
    source: 'Fabrizio Romano',
    date: '16 mai 2026',
    statut: 'chaud',
    details: 'Fin de contrat en juin. Accord verbal avec le Barça selon plusieurs sources italiennes et espagnoles.',
  },
  {
    id: 2,
    joueur: 'Jonathan Tah',
    age: 28,
    nationalite: '🇩🇪',
    poste: 'Défenseur Central',
    positionCode: 'CB',
    clubActuel: 'Bayer Leverkusen',
    clubLogo: 'B04',
    montant: '0 M€',
    probabilite: 71,
    fiabilite: 'fiable',
    source: 'Marca / Sport',
    date: '15 mai 2026',
    statut: 'chaud',
    details: 'Libre en juin. Le Barça en pole position devant le Real Madrid pour sa signature.',
  },
  {
    id: 3,
    joueur: 'Nico Williams',
    age: 22,
    nationalite: '🇪🇸',
    poste: 'Ailier Gauche',
    positionCode: 'LW',
    clubActuel: 'Athletic Club',
    clubLogo: 'ATH',
    montant: '58 M€',
    probabilite: 54,
    fiabilite: 'moyenne',
    source: 'El Confidencial',
    date: '14 mai 2026',
    statut: 'tiede',
    details: 'Clause libératoire de 58M€. Intérêt confirmé mais le joueur hésite entre rester et partir.',
  },
  {
    id: 4,
    joueur: 'Marcus Rashford',
    age: 28,
    nationalite: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    poste: 'Ailier Droit',
    positionCode: 'RW',
    clubActuel: 'Man. United',
    clubLogo: 'MU',
    montant: '40 M€',
    probabilite: 31,
    fiabilite: 'moyenne',
    source: 'The Sun',
    date: '13 mai 2026',
    statut: 'tiede',
    details: "Source anglaise peu fiable. Le Barça n'a pas confirmé d'intérêt officiel pour le moment.",
  },
  {
    id: 5,
    joueur: 'Rodrygo Goes',
    age: 24,
    nationalite: '🇧🇷',
    poste: 'Ailier Droit',
    positionCode: 'RW',
    clubActuel: 'Real Madrid',
    clubLogo: 'RMA',
    montant: '90 M€',
    probabilite: 14,
    fiabilite: 'faible',
    source: 'Don Balón',
    date: '12 mai 2026',
    statut: 'froid',
    details: 'Rumeur non confirmée. Source réputée pour les informations fantaisistes. Très peu probable.',
  },
  {
    id: 6,
    joueur: 'Dani Olmo',
    age: 26,
    nationalite: '🇪🇸',
    poste: 'Milieu Offensif',
    positionCode: 'CAM',
    clubActuel: 'RB Leipzig',
    clubLogo: 'RBL',
    montant: '55 M€',
    probabilite: 95,
    fiabilite: 'fiable',
    source: 'Fabrizio Romano',
    date: '17 mai 2026',
    statut: 'officiel',
    details: "Accord total entre les clubs. Signature imminente. Here We Go confirmé par Romano.",
  },
]

/* ── Config fiabilité ── */
const FIABILITE_CONFIG = {
  fiable:  { label: 'Très fiable',   color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.3)'  },
  moyenne: { label: 'Fiabilité moy.', color: '#fb923c', bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.3)'  },
  faible:  { label: 'Peu crédible',  color: '#f87171', bg: 'rgba(248,113,113,0.12)', border: 'rgba(248,113,113,0.3)' },
}

const STATUT_CONFIG = {
  officiel: { label: '✅ OFFICIEL',   color: '#4ade80', bg: 'rgba(74,222,128,0.15)'  },
  chaud:    { label: '🔥 CHAUD',      color: '#fb923c', bg: 'rgba(251,146,60,0.15)'  },
  tiede:    { label: '🌡️ TIÈDE',     color: '#EDBB00', bg: 'rgba(237,187,0,0.12)'   },
  froid:    { label: '❄️ FROID',     color: '#60a5fa', bg: 'rgba(96,165,250,0.12)'  },
}

/* ── Jauge Mercatomètre ── */
function Mercatometre({ probabilite, fiabilite }: { probabilite: number; fiabilite: Fiabilite }) {
  const config = FIABILITE_CONFIG[fiabilite]
  const color = probabilite >= 75 ? '#4ade80' : probabilite >= 45 ? '#EDBB00' : '#f87171'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          MERCATOMÈTRE
        </span>
        <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.1rem', fontWeight: 900, color }}>
          {probabilite}%
        </span>
      </div>

      {/* Barre principale */}
      <div style={{ height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          height: '100%',
          width: `${probabilite}%`,
          borderRadius: '5px',
          background: probabilite >= 75
            ? 'linear-gradient(to right,#16a34a,#4ade80)'
            : probabilite >= 45
            ? 'linear-gradient(to right,#b45309,#EDBB00)'
            : 'linear-gradient(to right,#991b1b,#f87171)',
          transition: 'width 1s ease',
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>

      {/* Graduations */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        {['0', '25', '50', '75', '100'].map(v => (
          <span key={v} style={{ fontSize: '9px', fontFamily: 'DM Mono,monospace', color: 'rgba(255,255,255,0.2)' }}>{v}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Carte rumeur ── */
function RumeurCard({ rumeur }: { rumeur: Rumeur }) {
  const [expanded, setExpanded] = useState(false)
  const fiab   = FIABILITE_CONFIG[rumeur.fiabilite]
  const statut = STATUT_CONFIG[rumeur.statut]

  return (
    <div style={{
      background: 'var(--barca-card)',
      border: '1px solid var(--barca-border)',
      borderRadius: '8px', overflow: 'hidden',
      transition: 'transform 0.15s, border-color 0.15s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,77,152,0.5)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--barca-border)')}
    >
      {/* Top : statut + fiabilité */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--barca-border)', background: 'rgba(255,255,255,0.02)' }}>
        <span style={{
          fontSize: '10px', fontFamily: 'DM Mono,monospace', fontWeight: 700,
          color: statut.color, background: statut.bg,
          padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em',
        }}>{statut.label}</span>

        <span style={{
          fontSize: '10px', fontFamily: 'DM Mono,monospace', fontWeight: 700,
          color: fiab.color, background: fiab.bg,
          border: `1px solid ${fiab.border}`,
          padding: '3px 8px', borderRadius: '4px',
        }}>{fiab.label}</span>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Joueur */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
          {/* Avatar */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '8px', flexShrink: 0,
            background: 'linear-gradient(135deg,#003070,#004D98)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 900, color: 'rgba(255,255,255,0.5)',
            fontFamily: 'DM Mono,monospace', border: '1px solid rgba(0,77,152,0.3)',
          }}>
            {rumeur.joueur.split(' ').map(w => w[0]).join('').slice(0, 2)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
              <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '1rem', fontWeight: 800, color: 'white' }}>
                {rumeur.joueur}
              </span>
              <span style={{ fontSize: '14px' }}>{rumeur.nationalite}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '10px', fontFamily: 'DM Mono,monospace', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '3px' }}>
                {rumeur.positionCode}
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'DM Mono,monospace', color: 'var(--text-muted)' }}>
                {rumeur.age} ans · {rumeur.clubActuel}
              </span>
            </div>
          </div>

          {/* Montant */}
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '1rem', fontWeight: 900, color: 'var(--barca-gold)' }}>
              {rumeur.montant}
            </div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>estimé</div>
          </div>
        </div>

        {/* Mercatomètre */}
        <Mercatometre probabilite={rumeur.probabilite} fiabilite={rumeur.fiabilite} />

        {/* Source + date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: fiab.color, flexShrink: 0 }} />
            <span style={{ fontSize: '11px', fontFamily: 'DM Mono,monospace', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {rumeur.source}
            </span>
          </div>
          <span style={{ fontSize: '10px', fontFamily: 'DM Mono,monospace', color: 'var(--text-muted)' }}>
            {rumeur.date}
          </span>
        </div>

        {/* Détails expandables */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%', marginTop: '12px', padding: '7px',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--barca-border)',
            borderRadius: '4px', cursor: 'pointer', color: 'var(--text-muted)',
            fontFamily: 'DM Mono,monospace', fontSize: '10px', letterSpacing: '0.05em',
            transition: 'all 0.2s',
          }}
        >
          {expanded ? '▲ MASQUER' : '▼ ANALYSE'}
        </button>

        {expanded && (
          <div style={{
            marginTop: '10px', padding: '10px 12px',
            background: 'rgba(0,77,152,0.06)', border: '1px solid rgba(0,77,152,0.15)',
            borderRadius: '4px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.65,
          }}>
            {rumeur.details}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Composant principal ── */
export default function Mercatometre() {
  const [filtre, setFiltre] = useState<'tous' | Fiabilite | Statut>('tous')

  const filtered = filtre === 'tous'
    ? RUMEURS
    : RUMEURS.filter(r => r.fiabilite === filtre || r.statut === filtre)

  const stats = {
    officiel: RUMEURS.filter(r => r.statut === 'officiel').length,
    chaud:    RUMEURS.filter(r => r.statut === 'chaud').length,
    total:    RUMEURS.length,
    avgProba: Math.round(RUMEURS.reduce((s, r) => s + r.probabilite, 0) / RUMEURS.length),
  }

  return (
    <div style={{ background: 'var(--barca-card)', border: '1px solid var(--barca-border)', borderRadius: '8px', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,rgba(165,0,68,0.2),rgba(237,187,0,0.1))', padding: '18px 22px', borderBottom: '1px solid var(--barca-border)' }}>
        <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
          MERCATOMÈTRE · INDICE DE CRÉDIBILITÉ · MERCATO ÉTÉ 2026
        </div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>
          Rumeurs & Transferts — <span style={{ color: 'var(--barca-gold)' }}>Fiabilité en temps réel</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--barca-border)' }}>
        {[
          { label: 'RUMEURS',   value: stats.total,    color: 'white'    },
          { label: 'CHAUDS',    value: stats.chaud,    color: '#fb923c'  },
          { label: 'OFFICIELS', value: stats.officiel, color: '#4ade80'  },
          { label: 'PROBA MOY', value: `${stats.avgProba}%`, color: 'var(--barca-gold)' },
        ].map((k, i) => (
          <div key={i} style={{
            padding: '14px 10px', textAlign: 'center',
            borderRight: i < 3 ? '1px solid var(--barca-border)' : 'none',
          }}>
            <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.3rem', fontWeight: 900, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: '9px', fontFamily: 'DM Mono,monospace', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: '3px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--barca-border)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {[
          ['tous',     'TOUS',          'rgba(255,255,255,0.6)'],
          ['officiel', '✅ OFFICIELS',   '#4ade80'],
          ['chaud',    '🔥 CHAUDS',      '#fb923c'],
          ['fiable',   '● TRÈS FIABLE',  '#4ade80'],
          ['moyenne',  '● MOY. FIABLE',  '#fb923c'],
          ['faible',   '● PEU CRÉDIBLE', '#f87171'],
        ].map(([key, label, color]) => (
          <button key={key} onClick={() => setFiltre(key as any)} style={{
            padding: '6px 12px', borderRadius: '4px', border: '1px solid',
            borderColor: filtre === key ? color : 'var(--barca-border)',
            background: filtre === key ? `${color}18` : 'transparent',
            color: filtre === key ? color : 'var(--text-muted)',
            fontFamily: 'DM Mono,monospace', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Grille de cartes */}
      <div style={{ padding: '20px 22px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace', fontSize: '12px' }}>
            Aucune rumeur pour ce filtre.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '16px' }}>
            {filtered
              .sort((a, b) => b.probabilite - a.probabilite)
              .map(r => <RumeurCard key={r.id} rumeur={r} />)}
          </div>
        )}
      </div>

    </div>
  )
}
