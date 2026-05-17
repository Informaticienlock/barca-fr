'use client'
import { useState } from 'react'

/* ── Types ── */
type TypePret = 'Prêt sec' | 'Option d\'achat' | 'Option d\'achat obligatoire'
type Statut   = 'En forme' | 'Titulaire' | 'Peu utilisé' | 'Blessé'

type JoueurPret = {
  id: number
  nom: string
  age: number
  nationalite: string
  poste: string
  positionCode: string
  clubAccueil: string
  pays: string
  typePret: TypePret
  montantOption: string | null
  finPret: string
  statut: Statut
  stats: {
    matchs: number
    titulaire: number
    buts: number
    passes: number
    minutesJouees: number
    note: number
  }
  description: string
}

/* ── Données ── */
const JOUEURS_PRETES: JoueurPret[] = [
  {
    id: 1,
    nom: 'Vitor Roque',
    age: 19, nationalite: '🇧🇷',
    poste: 'Avant-Centre', positionCode: 'ST',
    clubAccueil: 'Real Betis', pays: '🇪🇸',
    typePret: 'Option d\'achat',
    montantOption: '35 M€',
    finPret: 'Juin 2026',
    statut: 'En forme',
    stats: { matchs: 28, titulaire: 21, buts: 12, passes: 4, minutesJouees: 1842, note: 7.4 },
    description: 'Impressionnant à Séville. Le Betis devrait lever l\'option. Avenir au Barça peu probable.',
  },
  {
    id: 2,
    nom: 'Ansu Fati',
    age: 22, nationalite: '🇪🇸',
    poste: 'Ailier Gauche', positionCode: 'LW',
    clubAccueil: 'Brighton', pays: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    typePret: 'Prêt sec',
    montantOption: null,
    finPret: 'Juin 2026',
    statut: 'Peu utilisé',
    stats: { matchs: 18, titulaire: 9, buts: 3, passes: 2, minutesJouees: 834, note: 6.1 },
    description: 'Saison décevante en Premier League. Blessures récurrentes. Avenir incertain au Barça.',
  },
  {
    id: 3,
    nom: 'Ez Abde',
    age: 23, nationalite: '🇲🇦',
    poste: 'Ailier Droit', positionCode: 'RW',
    clubAccueil: 'Real Betis', pays: '🇪🇸',
    typePret: 'Option d\'achat',
    montantOption: '20 M€',
    finPret: 'Juin 2026',
    statut: 'Titulaire',
    stats: { matchs: 32, titulaire: 28, buts: 7, passes: 9, minutesJouees: 2310, note: 7.1 },
    description: 'Régulier et apprécié à Séville. Option d\'achat probable. Belle saison en Liga.',
  },
  {
    id: 4,
    nom: 'Pablo Torre',
    age: 21, nationalite: '🇪🇸',
    poste: 'Milieu Offensif', positionCode: 'CAM',
    clubAccueil: 'Girona FC', pays: '🇪🇸',
    typePret: 'Prêt sec',
    montantOption: null,
    finPret: 'Juin 2026',
    statut: 'En forme',
    stats: { matchs: 30, titulaire: 24, buts: 6, passes: 11, minutesJouees: 2050, note: 7.6 },
    description: 'Excellente saison à Girona. Créatif et décisif. Retour au Barça envisageable.',
  },
  {
    id: 5,
    nom: 'Clément Lenglet',
    age: 29, nationalite: '🇫🇷',
    poste: 'Défenseur Central', positionCode: 'CB',
    clubAccueil: 'Aston Villa', pays: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    typePret: 'Prêt sec',
    montantOption: null,
    finPret: 'Juin 2026',
    statut: 'Titulaire',
    stats: { matchs: 26, titulaire: 24, buts: 1, passes: 2, minutesJouees: 2140, note: 6.8 },
    description: 'Solide en Premier League. Contrat Barça expirant, départ définitif attendu.',
  },
  {
    id: 6,
    nom: 'Álex Valle',
    age: 21, nationalite: '🇪🇸',
    poste: 'Latéral Gauche', positionCode: 'LB',
    clubAccueil: 'Celtic FC', pays: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    typePret: 'Option d\'achat',
    montantOption: '12 M€',
    finPret: 'Juin 2026',
    statut: 'En forme',
    stats: { matchs: 34, titulaire: 31, buts: 2, passes: 7, minutesJouees: 2720, note: 7.3 },
    description: 'Révélation en Écosse. Titulaire indiscutable au Celtic. Retour au Barça ou transfert.',
  },
]

/* ── Config ── */
const STATUT_CONFIG: Record<Statut, { color: string; bg: string; dot: string }> = {
  'En forme':    { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  dot: '#4ade80' },
  'Titulaire':   { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  dot: '#60a5fa' },
  'Peu utilisé': { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)',  dot: '#fbbf24' },
  'Blessé':      { color: '#f87171', bg: 'rgba(248,113,113,0.12)', dot: '#f87171' },
}

const TYPE_CONFIG: Record<TypePret, { color: string; bg: string; border: string }> = {
  'Prêt sec':                   { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)',  border: 'rgba(148,163,184,0.25)' },
  'Option d\'achat':            { color: '#fb923c', bg: 'rgba(251,146,60,0.1)',   border: 'rgba(251,146,60,0.3)'   },
  'Option d\'achat obligatoire':{ color: '#f87171', bg: 'rgba(248,113,113,0.1)',  border: 'rgba(248,113,113,0.3)'  },
}

function getNoteColor(n: number) {
  if (n >= 7.5) return '#4ade80'
  if (n >= 6.5) return '#fbbf24'
  return '#f87171'
}

/* ── Carte joueur prêté ── */
function CartePret({ j }: { j: JoueurPret }) {
  const [expanded, setExpanded] = useState(false)
  const statut = STATUT_CONFIG[j.statut]
  const type   = TYPE_CONFIG[j.typePret]
  const initiales = j.nom.split(' ').map(w => w[0]).join('').slice(0, 2)
  const txTitulaire = Math.round((j.stats.titulaire / j.stats.matchs) * 100)

  return (
    <div style={{
      background: 'var(--barca-card)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,77,152,0.4)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--barca-border)')}
    >
      {/* Top : statut + type prêt */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 12px', borderBottom:'1px solid var(--barca-border)', background:'rgba(255,255,255,0.02)' }}>
        <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:statut.color, background:statut.bg, padding:'2px 8px', borderRadius:'4px' }}>
          ● {j.statut.toUpperCase()}
        </span>
        <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:type.color, background:type.bg, border:`1px solid ${type.border}`, padding:'2px 8px', borderRadius:'4px' }}>
          {j.typePret}
        </span>
      </div>

      <div style={{ padding:'14px' }}>
        {/* Joueur + club */}
        <div style={{ display:'flex', gap:'10px', alignItems:'flex-start', marginBottom:'12px' }}>
          <div style={{
            width:'44px', height:'44px', borderRadius:'8px', flexShrink:0,
            background:'linear-gradient(135deg,#003070,#004D98)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'12px', fontWeight:900, color:'rgba(255,255,255,0.7)',
            fontFamily:'DM Mono,monospace', border:'1px solid rgba(0,77,152,0.4)',
          }}>{initiales}</div>

          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'3px' }}>
              <span style={{ fontSize:'13px', fontWeight:800, color:'white', fontFamily:'Playfair Display,serif' }}>{j.nom}</span>
              <span>{j.nationalite}</span>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', flexWrap:'wrap' }}>
              <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', background:'rgba(255,255,255,0.05)', padding:'1px 5px', borderRadius:'3px' }}>{j.positionCode}</span>
              <span style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>{j.age} ans</span>
            </div>
          </div>

          {/* Note */}
          <div style={{ textAlign:'right', flexShrink:0 }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.2rem', fontWeight:900, color:getNoteColor(j.stats.note), lineHeight:1 }}>{j.stats.note}</div>
            <div style={{ fontSize:'9px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', marginTop:'2px' }}>NOTE MOY.</div>
          </div>
        </div>

        {/* Club d'accueil */}
        <div style={{ display:'flex', alignItems:'center', gap:'8px', padding:'8px 10px', background:'rgba(255,255,255,0.03)', border:'1px solid var(--barca-border)', borderRadius:'5px', marginBottom:'12px' }}>
          <span style={{ fontSize:'14px' }}>{j.pays}</span>
          <div>
            <div style={{ fontSize:'12px', fontWeight:700, color:'white' }}>{j.clubAccueil}</div>
            <div style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>Fin prêt : {j.finPret}</div>
          </div>
          {j.montantOption && (
            <div style={{ marginLeft:'auto', textAlign:'right' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:900, color:'var(--barca-gold)' }}>{j.montantOption}</div>
              <div style={{ fontSize:'9px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>option</div>
            </div>
          )}
        </div>

        {/* Stats 4 chiffres */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'8px', marginBottom:'12px' }}>
          {[
            { label:'MATCHS',  value: j.stats.matchs       },
            { label:'BUTS',    value: j.stats.buts          },
            { label:'PASSES',  value: j.stats.passes        },
            { label:'% TITL.', value: `${txTitulaire}%`    },
          ].map((s, i) => (
            <div key={i} style={{ textAlign:'center', padding:'8px 4px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'5px' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1rem', fontWeight:900, color:'white', lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:'8px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', marginTop:'3px', letterSpacing:'0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Barre minutes jouées */}
        <div style={{ marginBottom:'12px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>Minutes jouées</span>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'rgba(255,255,255,0.6)', fontWeight:700 }}>{j.stats.minutesJouees.toLocaleString()}'</span>
          </div>
          <div style={{ height:'5px', borderRadius:'3px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
            <div style={{
              height:'100%',
              width:`${Math.min((j.stats.minutesJouees / 3060) * 100, 100)}%`,
              borderRadius:'3px',
              background: j.stats.minutesJouees > 2000
                ? 'linear-gradient(to right,#16a34a,#4ade80)'
                : j.stats.minutesJouees > 1000
                ? 'linear-gradient(to right,#b45309,#fbbf24)'
                : 'linear-gradient(to right,#991b1b,#f87171)',
              transition:'width 0.8s ease',
            }} />
          </div>
        </div>

        {/* Analyse expandable */}
        <button onClick={() => setExpanded(!expanded)} style={{
          width:'100%', padding:'6px', background:'rgba(255,255,255,0.02)',
          border:'1px solid var(--barca-border)', borderRadius:'4px',
          cursor:'pointer', color:'var(--text-muted)',
          fontFamily:'DM Mono,monospace', fontSize:'10px',
          letterSpacing:'0.04em', transition:'all 0.2s',
        }}>
          {expanded ? '▲ MASQUER' : '▼ ANALYSE'}
        </button>

        {expanded && (
          <div style={{ marginTop:'8px', padding:'10px 12px', background:'rgba(0,77,152,0.06)', borderLeft:'3px solid rgba(0,77,152,0.4)', borderRadius:'0 4px 4px 0', fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.65, fontStyle:'italic' }}>
            {j.description}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Composant principal ── */
export default function SuiviPrets() {
  const [filtre, setFiltre] = useState<'tous' | TypePret | Statut>('tous')

  const filtered = filtre === 'tous'
    ? JOUEURS_PRETES
    : JOUEURS_PRETES.filter(j => j.typePret === filtre || j.statut === filtre)

  const stats = {
    total:    JOUEURS_PRETES.length,
    enForme:  JOUEURS_PRETES.filter(j => j.statut === 'En forme').length,
    avecOpt:  JOUEURS_PRETES.filter(j => j.typePret !== 'Prêt sec').length,
    butsTotal:JOUEURS_PRETES.reduce((s, j) => s + j.stats.buts, 0),
  }

  return (
    <div style={{ background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'8px', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(74,222,128,0.06))', padding:'18px 22px', borderBottom:'1px solid var(--barca-border)' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'4px' }}>
          SUIVI DES PRÊTS · SAISON 2025-26
        </div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
          Joueurs Prêtés — <span style={{ color:'var(--barca-gold)' }}>Barça en Europe</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid var(--barca-border)' }}>
        {[
          { label:'EN PRÊT',    value:stats.total,     color:'white'    },
          { label:'EN FORME',   value:stats.enForme,   color:'#4ade80'  },
          { label:'AVEC OPT.',  value:stats.avecOpt,   color:'#fb923c'  },
          { label:'BUTS CUMUL', value:stats.butsTotal, color:'var(--barca-gold)' },
        ].map((k,i) => (
          <div key={i} style={{ padding:'12px 8px', textAlign:'center', borderRight: i<3?'1px solid var(--barca-border)':'none' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.2rem', fontWeight:900, color:k.color }}>{k.value}</div>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em', marginTop:'2px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--barca-border)', display:'flex', gap:'7px', flexWrap:'wrap' }}>
        {[
          ['tous',                    'TOUS',           'rgba(255,255,255,0.5)'],
          ['En forme',                '🟢 EN FORME',    '#4ade80'             ],
          ['Titulaire',               '🔵 TITULAIRE',   '#60a5fa'             ],
          ['Peu utilisé',             '🟡 PEU UTILISÉ', '#fbbf24'             ],
          ["Option d'achat",          '🟠 OPTION ACH.', '#fb923c'             ],
          ['Prêt sec',                '⚪ PRÊT SEC',    '#94a3b8'             ],
        ].map(([key, label, color]) => (
          <button key={key} onClick={() => setFiltre(key as any)} style={{
            padding:'5px 11px', borderRadius:'4px', border:'1px solid',
            borderColor: filtre === key ? color : 'var(--barca-border)',
            background: filtre === key ? `${color}18` : 'rgba(255,255,255,0.02)',
            color: filtre === key ? color : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
            letterSpacing:'0.04em', cursor:'pointer', transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Grille cartes */}
      <div style={{ padding:'20px 22px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', fontSize:'12px' }}>
            Aucun joueur pour ce filtre.
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px' }}>
            {filtered.map(j => <CartePret key={j.id} j={j} />)}
          </div>
        )}
      </div>

    </div>
  )
}
