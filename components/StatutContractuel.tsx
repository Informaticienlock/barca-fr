'use client'
import { useState } from 'react'

/* ── Types ── */
type StatutContrat = 'Sécurisé' | 'À surveiller' | 'En danger' | 'En négociation'

type ContratJoueur = {
  id: number
  nom: string
  prenom: string
  initiales: string
  num: number
  positionCode: string
  nationalite: string
  age: number
  finContrat: string
  anneesFin: number
  clauseLibératoire: string
  salaire: string
  valeurMarchande: number
  valeurMax: number
  statut: StatutContrat
  tendance: 'hausse' | 'stable' | 'baisse'
  details: string
}

/* ── Données ── */
const CONTRATS: ContratJoueur[] = [
  {
    id:1, nom:'Yamal', prenom:'Lamine', initiales:'LY', num:19,
    positionCode:'RW', nationalite:'🇪🇸', age:17,
    finContrat:'Juin 2031', anneesFin:5,
    clauseLibératoire:'1 000 M€',
    salaire:'36 M€/an',
    valeurMarchande:180, valeurMax:250,
    statut:'Sécurisé', tendance:'hausse',
    details:'Contrat blindé jusqu\'en 2031. Clause libératoire record. Patrimoine du club pour les 10 prochaines années.',
  },
  {
    id:2, nom:'Pedri', prenom:'Pedro González', initiales:'PE', num:8,
    positionCode:'CM', nationalite:'🇪🇸', age:23,
    finContrat:'Juin 2029', anneesFin:3,
    clauseLibératoire:'1 000 M€',
    salaire:'48 M€/an',
    valeurMarchande:120, valeurMax:180,
    statut:'Sécurisé', tendance:'hausse',
    details:'Prolongé en 2024 après ses blessures. Clause au maximum autorisé par la Liga. Intouchable.',
  },
  {
    id:3, nom:'Gavi', prenom:'Pablo Páez', initiales:'GA', num:6,
    positionCode:'CM', nationalite:'🇪🇸', age:20,
    finContrat:'Juin 2030', anneesFin:4,
    clauseLibératoire:'1 000 M€',
    salaire:'40 M€/an',
    valeurMarchande:90, valeurMax:150,
    statut:'Sécurisé', tendance:'hausse',
    details:'Revenu de longue blessure en grande forme. Contrat renouvelé. Pilier du projet Barça.',
  },
  {
    id:4, nom:'Raphinha', prenom:'Raphael Belloli', initiales:'RA', num:11,
    positionCode:'RW', nationalite:'🇧🇷', age:28,
    finContrat:'Juin 2027', anneesFin:1,
    clauseLibératoire:'180 M€',
    salaire:'44 M€/an',
    valeurMarchande:80, valeurMax:100,
    statut:'En négociation', tendance:'stable',
    details:'Contrat qui expire dans 1 an. Discussions en cours pour une prolongation. Capitaine en vue.',
  },
  {
    id:5, nom:'De Jong', prenom:'Frenkie', initiales:'FJ', num:14,
    positionCode:'CM', nationalite:'🇳🇱', age:27,
    finContrat:'Juin 2026', anneesFin:0,
    clauseLibératoire:'300 M€',
    salaire:'26 M€/an',
    valeurMarchande:65, valeurMax:90,
    statut:'En danger', tendance:'baisse',
    details:'Contrat expirant en juin 2026. Aucun accord de prolongation à ce jour. Départ possible cet été.',
  },
  {
    id:6, nom:'Lewandowski', prenom:'Robert', initiales:'RL', num:9,
    positionCode:'ST', nationalite:'🇵🇱', age:36,
    finContrat:'Juin 2026', anneesFin:0,
    clauseLibératoire:'—',
    salaire:'52 M€/an',
    valeurMarchande:15, valeurMax:30,
    statut:'À surveiller', tendance:'baisse',
    details:'Dernière année de contrat. Aucune clause libératoire. Décision attendue en fin de saison.',
  },
  {
    id:7, nom:'Casadó', prenom:'Marc', initiales:'MC', num:5,
    positionCode:'CDM', nationalite:'🇪🇸', age:21,
    finContrat:'Juin 2030', anneesFin:4,
    clauseLibératoire:'500 M€',
    salaire:'18 M€/an',
    valeurMarchande:45, valeurMax:80,
    statut:'Sécurisé', tendance:'hausse',
    details:'Prolongé après sa révélation. Clause très élevée pour protéger l\'investissement sur le long terme.',
  },
  {
    id:8, nom:'Koundé', prenom:'Jules', initiales:'JK', num:23,
    positionCode:'RB', nationalite:'🇫🇷', age:25,
    finContrat:'Juin 2027', anneesFin:1,
    clauseLibératoire:'150 M€',
    salaire:'28 M€/an',
    valeurMarchande:65, valeurMax:90,
    statut:'À surveiller', tendance:'stable',
    details:'Discussions de prolongation en cours. Club souhaite l\'étendre jusqu\'en 2029.',
  },
]

/* ── Config statuts ── */
const STATUT_CONFIG: Record<StatutContrat, { color: string; bg: string; border: string; icon: string }> = {
  'Sécurisé':       { color:'#4ade80', bg:'rgba(74,222,128,0.1)',  border:'rgba(74,222,128,0.3)',  icon:'🔒' },
  'En négociation': { color:'#EDBB00', bg:'rgba(237,187,0,0.1)',   border:'rgba(237,187,0,0.3)',   icon:'🤝' },
  'À surveiller':   { color:'#fb923c', bg:'rgba(251,146,60,0.1)',  border:'rgba(251,146,60,0.3)',  icon:'⚠️' },
  'En danger':      { color:'#f87171', bg:'rgba(248,113,113,0.1)', border:'rgba(248,113,113,0.3)', icon:'🚨' },
}

const TENDANCE_CONFIG = {
  hausse: { icon:'↑', color:'#4ade80', label:'En hausse'  },
  stable: { icon:'→', color:'#EDBB00', label:'Stable'     },
  baisse: { icon:'↓', color:'#f87171', label:'En baisse'  },
}

/* ── Barre valeur marchande ── */
function BarreValeur({ valeur, max, color }: { valeur: number; max: number; color: string }) {
  const pct = Math.min((valeur / max) * 100, 100)
  return (
    <div style={{ height:'8px', borderRadius:'4px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
      <div style={{
        height:'100%', width:`${pct}%`, borderRadius:'4px',
        background:`linear-gradient(to right, ${color}88, ${color})`,
        transition:'width 1s ease',
        boxShadow:`0 0 8px ${color}44`,
      }} />
    </div>
  )
}

/* ── Barre durée contrat ── */
function BarreDuree({ annees }: { annees: number }) {
  const max   = 5
  const pct   = Math.min((annees / max) * 100, 100)
  const color = annees === 0 ? '#f87171' : annees === 1 ? '#fb923c' : annees <= 2 ? '#EDBB00' : '#4ade80'
  return (
    <div style={{ height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
      <div style={{
        height:'100%', width:`${pct}%`, borderRadius:'3px',
        background:color, transition:'width 1s ease',
      }} />
    </div>
  )
}

/* ── Carte contrat ── */
function CarteContrat({ c }: { c: ContratJoueur }) {
  const [expanded, setExpanded] = useState(false)
  const statut   = STATUT_CONFIG[c.statut]
  const tendance = TENDANCE_CONFIG[c.tendance]

  return (
    <div style={{
      background:'var(--barca-card)', border:'1px solid var(--barca-border)',
      borderRadius:'8px', overflow:'hidden', transition:'border-color 0.2s',
    }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = statut.border)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--barca-border)')}
    >
      {/* Top */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 13px', borderBottom:'1px solid var(--barca-border)', background:'rgba(255,255,255,0.02)' }}>
        <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:statut.color, background:statut.bg, border:`1px solid ${statut.border}`, padding:'2px 8px', borderRadius:'4px' }}>
          {statut.icon} {c.statut.toUpperCase()}
        </span>
        <span style={{ fontSize:'11px', fontFamily:'DM Mono,monospace', fontWeight:700, color:tendance.color }}>
          {tendance.icon} {tendance.label}
        </span>
      </div>

      <div style={{ padding:'14px' }}>

        {/* Joueur */}
        <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'14px' }}>
          <div style={{
            width:'42px', height:'42px', borderRadius:'8px', flexShrink:0,
            background:'linear-gradient(135deg,#003070,#004D98)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'11px', fontWeight:900, color:'rgba(255,255,255,0.7)',
            fontFamily:'DM Mono,monospace', border:'1px solid rgba(0,77,152,0.4)',
          }}>{c.initiales}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'2px' }}>
              <span style={{ fontFamily:'Playfair Display,serif', fontSize:'13px', fontWeight:800, color:'white' }}>{c.prenom} {c.nom}</span>
              <span>{c.nationalite}</span>
            </div>
            <div style={{ display:'flex', gap:'5px' }}>
              <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', background:'rgba(255,255,255,0.05)', padding:'1px 5px', borderRadius:'3px' }}>{c.positionCode}</span>
              <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>#{c.num} · {c.age} ans</span>
            </div>
          </div>
        </div>

        {/* Fin de contrat */}
        <div style={{ marginBottom:'12px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px' }}>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em' }}>FIN DE CONTRAT</span>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'12px', fontWeight:900, color: c.anneesFin === 0 ? '#f87171' : c.anneesFin === 1 ? '#fb923c' : '#4ade80' }}>
              {c.finContrat}
            </span>
          </div>
          <BarreDuree annees={c.anneesFin} />
          <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', marginTop:'3px' }}>
            {c.anneesFin === 0 ? 'Expire cette saison' : `${c.anneesFin} an${c.anneesFin > 1 ? 's' : ''} restant${c.anneesFin > 1 ? 's' : ''}`}
          </div>
        </div>

        {/* Valeur marchande */}
        <div style={{ marginBottom:'12px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'5px' }}>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em' }}>VALEUR MARCHANDE</span>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'13px', fontWeight:900, color:'var(--barca-gold)' }}>
              {c.valeurMarchande} M€
            </span>
          </div>
          <BarreValeur valeur={c.valeurMarchande} max={c.valeurMax} color="#EDBB00" />
          <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', marginTop:'3px' }}>
            Potentiel estimé : {c.valeurMax} M€
          </div>
        </div>

        {/* Infos financières */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginBottom:'12px' }}>
          <div style={{ padding:'9px 10px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'5px' }}>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.05em', marginBottom:'4px' }}>SALAIRE</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:900, color:'white' }}>{c.salaire}</div>
          </div>
          <div style={{ padding:'9px 10px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'5px' }}>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.05em', marginBottom:'4px' }}>CLAUSE LIBÉRATOIRE</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:900, color: c.clauseLibératoire.includes('1 000') ? '#f87171' : c.clauseLibératoire === '—' ? 'var(--text-muted)' : '#fb923c' }}>
              {c.clauseLibératoire}
            </div>
          </div>
        </div>

        {/* Détails expandables */}
        <button onClick={() => setExpanded(!expanded)} style={{
          width:'100%', padding:'6px', background:'rgba(255,255,255,0.02)',
          border:'1px solid var(--barca-border)', borderRadius:'4px',
          cursor:'pointer', color:'var(--text-muted)',
          fontFamily:'DM Mono,monospace', fontSize:'10px', letterSpacing:'0.04em',
          transition:'all 0.2s',
        }}>
          {expanded ? '▲ MASQUER' : '▼ ANALYSE'}
        </button>

        {expanded && (
          <div style={{ marginTop:'8px', padding:'10px 12px', background:'rgba(0,77,152,0.06)', borderLeft:'3px solid rgba(0,77,152,0.4)', borderRadius:'0 4px 4px 0', fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.65, fontStyle:'italic' }}>
            {c.details}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Composant principal ── */
export default function StatutContractuel() {
  const [filtre, setFiltre] = useState<'tous' | StatutContrat>('tous')

  const filtered = filtre === 'tous'
    ? CONTRATS
    : CONTRATS.filter(c => c.statut === filtre)

  const stats = {
    securises:    CONTRATS.filter(c => c.statut === 'Sécurisé').length,
    danger:       CONTRATS.filter(c => c.statut === 'En danger' || c.anneesFin === 0).length,
    negociation:  CONTRATS.filter(c => c.statut === 'En négociation').length,
    masseSalariale: CONTRATS.reduce((s, c) => s + parseFloat(c.salaire), 0).toFixed(0),
  }

  return (
    <div style={{ background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'8px', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,rgba(0,77,152,0.15),rgba(237,187,0,0.08))', padding:'18px 22px', borderBottom:'1px solid var(--barca-border)' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'4px' }}>
          STATUT CONTRACTUEL · DONNÉES FINANCIÈRES · SAISON 2025-26
        </div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
          Contrats & Clauses — <span style={{ color:'var(--barca-gold)' }}>FC Barcelone</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', borderBottom:'1px solid var(--barca-border)' }}>
        {[
          { label:'SÉCURISÉS',  value:stats.securises,     color:'#4ade80'           },
          { label:'NÉGOCIATION',value:stats.negociation,   color:'#EDBB00'           },
          { label:'EN DANGER',  value:stats.danger,        color:'#f87171'           },
          { label:'MASSE SAL.', value:`${stats.masseSalariale}M`, color:'var(--barca-gold)' },
        ].map((k,i) => (
          <div key={i} style={{ padding:'12px 8px', textAlign:'center', borderRight: i<3?'1px solid var(--barca-border)':'none' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.15rem', fontWeight:900, color:k.color }}>{k.value}</div>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em', marginTop:'2px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres */}
      <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--barca-border)', display:'flex', gap:'7px', flexWrap:'wrap' }}>
        {([
          ['tous',           'TOUS',           'rgba(255,255,255,0.5)'],
          ['Sécurisé',       '🔒 SÉCURISÉ',    '#4ade80'             ],
          ['En négociation', '🤝 NÉGOCIATION',  '#EDBB00'             ],
          ['À surveiller',   '⚠️ SURVEILLER',  '#fb923c'             ],
          ['En danger',      '🚨 EN DANGER',    '#f87171'             ],
        ] as const).map(([key, label, color]) => (
          <button key={key} onClick={() => setFiltre(key as any)} style={{
            padding:'5px 11px', borderRadius:'4px', border:'1px solid',
            borderColor: filtre === key ? color : 'var(--barca-border)',
            background:  filtre === key ? `${color}18` : 'rgba(255,255,255,0.02)',
            color:        filtre === key ? color : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
            letterSpacing:'0.04em', cursor:'pointer', transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Grille cartes */}
      <div style={{ padding:'20px 22px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'16px' }}>
          {filtered
            .sort((a,b) => a.anneesFin - b.anneesFin)
            .map(c => <CarteContrat key={c.id} c={c} />)}
        </div>
      </div>

    </div>
  )
}
