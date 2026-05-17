'use client'
import { useState } from 'react'

/* ── Types ── */
type Secteur   = 'Gardiens' | 'Défenseurs' | 'Milieux' | 'Attaquants'
type Filtre    = 'tous' | 'masia' | 'internationaux' | 'premiere'

type Joueur = {
  id: number
  num: number
  nom: string
  prenom: string
  age: number
  nationalite: string
  poste: string
  positionCode: string
  secteur: Secteur
  masia: boolean
  selectionne: boolean
  initiales: string
  couleurAvatar: string
}

/* ── Données effectif ── */
const EFFECTIF: Joueur[] = [
  /* ── Gardiens ── */
  { id:1,  num:1,  nom:'Peña',       prenom:'Iñaki',     age:25, nationalite:'🇪🇸', poste:'Gardien',          positionCode:'GK', secteur:'Gardiens',   masia:true,  selectionne:true,  initiales:'IP', couleurAvatar:'#1a3a5c' },
  { id:2,  num:13, nom:'ter Stegen', prenom:'Marc-André',age:32, nationalite:'🇩🇪', poste:'Gardien',          positionCode:'GK', secteur:'Gardiens',   masia:false, selectionne:true,  initiales:'MT', couleurAvatar:'#1a3a5c' },
  { id:3,  num:26, nom:'Astralaga',  prenom:'Diego',     age:19, nationalite:'🇪🇸', poste:'Gardien',          positionCode:'GK', secteur:'Gardiens',   masia:true,  selectionne:false, initiales:'DA', couleurAvatar:'#1a3a5c' },

  /* ── Défenseurs ── */
  { id:4,  num:2,  nom:'Koundé',     prenom:'Jules',     age:25, nationalite:'🇫🇷', poste:'Défenseur Droit',  positionCode:'RB', secteur:'Défenseurs', masia:false, selectionne:true,  initiales:'JK', couleurAvatar:'#1a2a5c' },
  { id:5,  num:3,  nom:'Balde',      prenom:'Alejandro', age:21, nationalite:'🇪🇸', poste:'Défenseur Gauche', positionCode:'LB', secteur:'Défenseurs', masia:true,  selectionne:true,  initiales:'AB', couleurAvatar:'#1a2a5c' },
  { id:6,  num:15, nom:'Christensen',prenom:'Andreas',   age:28, nationalite:'🇩🇰', poste:'Défenseur Central',positionCode:'CB', secteur:'Défenseurs', masia:false, selectionne:true,  initiales:'AC', couleurAvatar:'#1a2a5c' },
  { id:7,  num:22, nom:'Cancelo',    prenom:'João',      age:30, nationalite:'🇵🇹', poste:'Défenseur Droit',  positionCode:'RB', secteur:'Défenseurs', masia:false, selectionne:true,  initiales:'JC', couleurAvatar:'#1a2a5c' },
  { id:8,  num:24, nom:'Martínez',   prenom:'Eric',      age:23, nationalite:'🇪🇸', poste:'Défenseur Central',positionCode:'CB', secteur:'Défenseurs', masia:true,  selectionne:true,  initiales:'EM', couleurAvatar:'#1a2a5c' },
  { id:9,  num:23, nom:'Koundé',     prenom:'Jules',     age:25, nationalite:'🇫🇷', poste:'Défenseur Central',positionCode:'CB', secteur:'Défenseurs', masia:false, selectionne:true,  initiales:'JK', couleurAvatar:'#1a2a5c' },
  { id:10, num:35, nom:'Cubarsi',    prenom:'Pau',       age:17, nationalite:'🇪🇸', poste:'Défenseur Central',positionCode:'CB', secteur:'Défenseurs', masia:true,  selectionne:true,  initiales:'PC', couleurAvatar:'#1a2a5c' },

  /* ── Milieux ── */
  { id:11, num:5,  nom:'Casadó',     prenom:'Marc',      age:21, nationalite:'🇪🇸', poste:'Milieu Défensif',  positionCode:'CDM',secteur:'Milieux',    masia:true,  selectionne:false, initiales:'MC', couleurAvatar:'#1a1a4c' },
  { id:12, num:6,  nom:'Gavi',       prenom:'Pablo',     age:20, nationalite:'🇪🇸', poste:'Milieu Central',   positionCode:'CM', secteur:'Milieux',    masia:true,  selectionne:true,  initiales:'GA', couleurAvatar:'#1a1a4c' },
  { id:13, num:8,  nom:'Pedri',      prenom:'Pedro',     age:23, nationalite:'🇪🇸', poste:'Milieu Central',   positionCode:'CM', secteur:'Milieux',    masia:false, selectionne:true,  initiales:'PE', couleurAvatar:'#1a1a4c' },
  { id:14, num:14, nom:'De Jong',    prenom:'Frenkie',   age:27, nationalite:'🇳🇱', poste:'Milieu Central',   positionCode:'CM', secteur:'Milieux',    masia:false, selectionne:true,  initiales:'FJ', couleurAvatar:'#1a1a4c' },
  { id:15, num:16, nom:'Fermín',     prenom:'López',     age:22, nationalite:'🇪🇸', poste:'Milieu Offensif',  positionCode:'CAM',secteur:'Milieux',    masia:true,  selectionne:true,  initiales:'FL', couleurAvatar:'#1a1a4c' },
  { id:16, num:21, nom:'Torre',      prenom:'Pablo',     age:21, nationalite:'🇪🇸', poste:'Milieu Offensif',  positionCode:'CAM',secteur:'Milieux',    masia:false, selectionne:false, initiales:'PT', couleurAvatar:'#1a1a4c' },

  /* ── Attaquants ── */
  { id:17, num:7,  nom:'Torres',     prenom:'Ferran',    age:25, nationalite:'🇪🇸', poste:'Ailier',           positionCode:'RW', secteur:'Attaquants', masia:false, selectionne:true,  initiales:'FT', couleurAvatar:'#3a1a1a' },
  { id:18, num:9,  nom:'Lewandowski',prenom:'Robert',    age:36, nationalite:'🇵🇱', poste:'Avant-Centre',     positionCode:'ST', secteur:'Attaquants', masia:false, selectionne:true,  initiales:'RL', couleurAvatar:'#3a1a1a' },
  { id:19, num:10, nom:'Dani Olmo',  prenom:'',          age:26, nationalite:'🇪🇸', poste:'Milieu Offensif',  positionCode:'CAM',secteur:'Attaquants', masia:false, selectionne:true,  initiales:'DO', couleurAvatar:'#3a1a1a' },
  { id:20, num:11, nom:'Raphinha',   prenom:'',          age:28, nationalite:'🇧🇷', poste:'Ailier Droit',     positionCode:'RW', secteur:'Attaquants', masia:false, selectionne:true,  initiales:'RA', couleurAvatar:'#3a1a1a' },
  { id:21, num:17, nom:'Fati',       prenom:'Ansu',      age:22, nationalite:'🇪🇸', poste:'Ailier Gauche',    positionCode:'LW', secteur:'Attaquants', masia:true,  selectionne:true,  initiales:'AF', couleurAvatar:'#3a1a1a' },
  { id:22, num:19, nom:'Yamal',      prenom:'Lamine',    age:17, nationalite:'🇪🇸', poste:'Ailier Droit',     positionCode:'RW', secteur:'Attaquants', masia:true,  selectionne:true,  initiales:'LY', couleurAvatar:'#3a1a1a' },
]

/* ── Config secteurs ── */
const SECTEURS: { key: Secteur; label: string; color: string; bg: string }[] = [
  { key:'Gardiens',   label:'Gardiens',   color:'#60a5fa', bg:'rgba(96,165,250,0.1)'  },
  { key:'Défenseurs', label:'Défenseurs', color:'#4ade80', bg:'rgba(74,222,128,0.1)'  },
  { key:'Milieux',    label:'Milieux',    color:'#EDBB00', bg:'rgba(237,187,0,0.1)'   },
  { key:'Attaquants', label:'Attaquants', color:'#f87171', bg:'rgba(248,113,113,0.1)' },
]

/* ── Carte joueur ── */
function CarteJoueur({ j }: { j: Joueur }) {
  return (
    <div style={{
      background:'var(--barca-card)', border:'1px solid var(--barca-border)',
      borderRadius:'8px', overflow:'hidden', transition:'all 0.2s', cursor:'default',
      position:'relative',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(0,77,152,0.5)'
        e.currentTarget.style.transform   = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--barca-border)'
        e.currentTarget.style.transform   = 'translateY(0)'
      }}
    >
      {/* Numéro de maillot — coin haut gauche */}
      <div style={{
        position:'absolute', top:'8px', left:'8px',
        fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:900,
        color:'rgba(255,255,255,0.25)', lineHeight:1,
      }}>#{j.num}</div>

      {/* Badge Masia */}
      {j.masia && (
        <div style={{
          position:'absolute', top:'8px', right:'8px',
          fontSize:'9px', fontFamily:'DM Mono,monospace', fontWeight:700,
          color:'#EDBB00', background:'rgba(237,187,0,0.12)',
          border:'1px solid rgba(237,187,0,0.3)',
          padding:'2px 5px', borderRadius:'3px',
        }}>MASIA</div>
      )}

      {/* Avatar */}
      <div style={{
        height:'90px',
        background:`linear-gradient(145deg,${j.couleurAvatar},rgba(0,77,152,0.3))`,
        display:'flex', alignItems:'center', justifyContent:'center',
        borderBottom:'1px solid var(--barca-border)',
      }}>
        <div style={{
          width:'56px', height:'56px', borderRadius:'50%',
          background:'linear-gradient(135deg,rgba(0,77,152,0.6),rgba(237,187,0,0.2))',
          border:'2px solid rgba(255,255,255,0.15)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'16px', fontWeight:900, color:'rgba(255,255,255,0.8)',
          fontFamily:'DM Mono,monospace',
        }}>{j.initiales}</div>
      </div>

      {/* Infos */}
      <div style={{ padding:'10px 12px' }}>
        {/* Prénom */}
        {j.prenom && (
          <div style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', marginBottom:'1px' }}>
            {j.prenom}
          </div>
        )}
        {/* Nom */}
        <div style={{
          fontSize:'13px', fontWeight:800, color:'white',
          fontFamily:'Playfair Display,serif', marginBottom:'6px',
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
        }}>{j.nom}</div>

        {/* Nationalité + âge */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'6px' }}>
          <span style={{ fontSize:'14px' }}>{j.nationalite}</span>
          <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>{j.age} ans</span>
        </div>

        {/* Badge poste */}
        <div style={{
          fontSize:'9px', fontFamily:'DM Mono,monospace', fontWeight:700,
          color:'rgba(255,255,255,0.5)', background:'rgba(255,255,255,0.05)',
          border:'1px solid rgba(255,255,255,0.08)',
          padding:'3px 7px', borderRadius:'3px', textAlign:'center',
          letterSpacing:'0.05em',
        }}>{j.positionCode} · {j.poste}</div>

        {/* Sélectionné */}
        {j.selectionne && (
          <div style={{
            marginTop:'6px', fontSize:'9px', fontFamily:'DM Mono,monospace',
            color:'#60a5fa', textAlign:'center', letterSpacing:'0.04em',
          }}>🌍 International</div>
        )}
      </div>
    </div>
  )
}

/* ── Section par secteur ── */
function SectionSecteur({ secteur, joueurs }: { secteur: typeof SECTEURS[0]; joueurs: Joueur[] }) {
  if (joueurs.length === 0) return null
  return (
    <div style={{ marginBottom:'40px' }}>
      {/* Titre secteur */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'16px' }}>
        <div style={{ width:'3px', height:'22px', background:secteur.color, borderRadius:'2px' }} />
        <span style={{
          fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700,
          color:secteur.color, letterSpacing:'0.1em',
        }}>{secteur.label.toUpperCase()}</span>
        <span style={{
          fontSize:'10px', fontFamily:'DM Mono,monospace',
          color:secteur.color, background:secteur.bg,
          padding:'2px 8px', borderRadius:'10px',
        }}>{joueurs.length}</span>
        <div style={{ flex:1, height:'1px', background:'var(--barca-border)' }} />
      </div>

      {/* Grille */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:'12px' }}>
        {joueurs.map(j => <CarteJoueur key={j.id} j={j} />)}
      </div>
    </div>
  )
}

/* ── Composant principal ── */
export default function GrilleEffectif() {
  const [filtre, setFiltre] = useState<Filtre>('tous')
  const [secteurActif, setSecteurActif] = useState<Secteur | 'tous'>('tous')

  const filtreJoueurs = (j: Joueur) => {
    if (filtre === 'masia')          return j.masia
    if (filtre === 'internationaux') return j.selectionne
    if (filtre === 'premiere')       return !j.masia
    return true
  }

  const joueursFiltres = EFFECTIF.filter(filtreJoueurs).filter(j =>
    secteurActif === 'tous' ? true : j.secteur === secteurActif
  )

  const stats = {
    total:    EFFECTIF.length,
    masia:    EFFECTIF.filter(j => j.masia).length,
    intl:     EFFECTIF.filter(j => j.selectionne).length,
    moyenne:  Math.round(EFFECTIF.reduce((s,j) => s+j.age, 0) / EFFECTIF.length),
  }

  return (
    <div>
      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'28px' }}>
        {[
          { label:'JOUEURS',     value:stats.total,   color:'white'             },
          { label:'MASIA',       value:stats.masia,   color:'#EDBB00'           },
          { label:'INTL.',       value:stats.intl,    color:'#60a5fa'           },
          { label:'ÂGE MOY.',    value:stats.moyenne, color:'var(--barca-gold)' },
        ].map((k,i) => (
          <div key={i} style={{ padding:'14px', background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'6px', textAlign:'center' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.3rem', fontWeight:900, color:k.color }}>{k.value}</div>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em', marginTop:'3px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Filtres rapides */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'16px', flexWrap:'wrap' }}>
        {([
          ['tous',          'TOUS',           'rgba(255,255,255,0.5)'],
          ['masia',         '⭐ MASIA',        '#EDBB00'             ],
          ['internationaux','🌍 INTL.',        '#60a5fa'             ],
          ['premiere',      '🔵 ÉQUIPE 1ère',  '#a78bfa'             ],
        ] as const).map(([key, label, color]) => (
          <button key={key} onClick={() => setFiltre(key)} style={{
            padding:'7px 14px', borderRadius:'5px', border:'1px solid',
            borderColor: filtre === key ? color : 'var(--barca-border)',
            background:  filtre === key ? `${color}18` : 'rgba(255,255,255,0.02)',
            color:        filtre === key ? color : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
            letterSpacing:'0.05em', cursor:'pointer', transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Filtre par secteur */}
      <div style={{ display:'flex', gap:'8px', marginBottom:'28px', flexWrap:'wrap' }}>
        <button onClick={() => setSecteurActif('tous')} style={{
          padding:'6px 12px', borderRadius:'4px', border:'1px solid',
          borderColor: secteurActif === 'tous' ? 'rgba(255,255,255,0.4)' : 'var(--barca-border)',
          background:  secteurActif === 'tous' ? 'rgba(255,255,255,0.06)' : 'transparent',
          color:        secteurActif === 'tous' ? 'white' : 'var(--text-muted)',
          fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
          cursor:'pointer', transition:'all 0.2s',
        }}>TOUS POSTES</button>
        {SECTEURS.map(s => (
          <button key={s.key} onClick={() => setSecteurActif(s.key)} style={{
            padding:'6px 12px', borderRadius:'4px', border:'1px solid',
            borderColor: secteurActif === s.key ? s.color : 'var(--barca-border)',
            background:  secteurActif === s.key ? s.bg : 'transparent',
            color:        secteurActif === s.key ? s.color : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
            cursor:'pointer', transition:'all 0.2s',
          }}>{s.label.toUpperCase()}</button>
        ))}
      </div>

      {/* Résultat */}
      <div style={{ fontSize:'11px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', marginBottom:'20px' }}>
        {joueursFiltres.length} joueur{joueursFiltres.length > 1 ? 's' : ''} affiché{joueursFiltres.length > 1 ? 's' : ''}
      </div>

      {/* Grilles par secteur */}
      {SECTEURS.map(s => (
        <SectionSecteur
          key={s.key}
          secteur={s}
          joueurs={joueursFiltres.filter(j => j.secteur === s.key)}
        />
      ))}

      {joueursFiltres.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', fontSize:'12px' }}>
          Aucun joueur pour ce filtre.
        </div>
      )}
    </div>
  )
}
