'use client'
import { useState } from 'react'

/* ── Données ── */
const PLAFOND_LIGA   = 800  // M€ — limite autorisée Liga
const MASSE_ACTUELLE = 487  // M€ — masse salariale actuelle

type Joueur = { id: number; nom: string; salaire: number; poste: string }

const JOUEURS_ACTUELS: Joueur[] = [
  { id:1,  nom:'Lewandowski',   salaire:52, poste:'BU'  },
  { id:2,  nom:'Pedri',         salaire:48, poste:'MC'  },
  { id:3,  nom:'Raphinha',      salaire:44, poste:'AD'  },
  { id:4,  nom:'Gavi',          salaire:40, poste:'MC'  },
  { id:5,  nom:'Lamine Yamal',  salaire:36, poste:'AG'  },
  { id:6,  nom:'Ter Stegen',    salaire:32, poste:'GK'  },
  { id:7,  nom:'Koundé',        salaire:28, poste:'DC'  },
  { id:8,  nom:'De Jong',       salaire:26, poste:'MC'  },
  { id:9,  nom:'Cancelo',       salaire:24, poste:'DD'  },
  { id:10, nom:'Balde',         salaire:22, poste:'DG'  },
  { id:11, nom:'Christensen',   salaire:20, poste:'DC'  },
  { id:12, nom:'Casadó',        salaire:18, poste:'MC'  },
  { id:13, nom:'Iñaki Peña',    salaire:16, poste:'GK'  },
  { id:14, nom:'Ferran Torres', salaire:14, poste:'AD'  },
  { id:15, nom:'Ansu Fati',     salaire:27, poste:'AG'  },
]

const CIBLES_MERCATO = [
  { nom:'Alphonso Davies', salaire:18, poste:'LB' },
  { nom:'Jonathan Tah',    salaire:14, poste:'CB' },
  { nom:'Nico Williams',   salaire:32, poste:'LW' },
  { nom:'Dani Olmo',       salaire:28, poste:'CAM'},
  { nom:'Joueur custom',   salaire:0,  poste:'—'  },
]

/* ── Barre de progression ── */
function BarreProgression({ pct, color, height = 16 }: { pct: number; color: string; height?: number }) {
  const capped = Math.min(pct, 100)
  return (
    <div style={{ height, borderRadius: height/2, background: 'rgba(255,255,255,0.06)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        height: '100%', width: `${capped}%`, borderRadius: height/2,
        background: color, transition: 'width 0.8s ease',
        boxShadow: `0 0 10px ${color.includes('4ade') ? 'rgba(74,222,128,0.4)' : color.includes('f87') ? 'rgba(248,113,113,0.4)' : color.includes('EDBB') || color.includes('fbbf') ? 'rgba(237,187,0,0.4)' : 'rgba(248,113,113,0.4)'}`,
      }} />
      {/* Marqueur 100% */}
      {pct > 85 && (
        <div style={{ position:'absolute', right:0, top:0, width:'2px', height:'100%', background:'rgba(255,255,255,0.3)' }} />
      )}
    </div>
  )
}

/* ── Couleur selon % ── */
function getColor(pct: number) {
  if (pct <= 70) return 'linear-gradient(to right,#16a34a,#4ade80)'
  if (pct <= 88) return 'linear-gradient(to right,#b45309,#fbbf24)'
  return 'linear-gradient(to right,#991b1b,#f87171)'
}
function getColorSolid(pct: number) {
  if (pct <= 70) return '#4ade80'
  if (pct <= 88) return '#fbbf24'
  return '#f87171'
}
function getLabel(pct: number) {
  if (pct <= 70) return { text: '✅ ZONE VERTE — Enregistrement possible', color: '#4ade80' }
  if (pct <= 88) return { text: '⚠️ ZONE ORANGE — Marge réduite', color: '#fbbf24' }
  if (pct <= 100) return { text: '🔴 ZONE ROUGE — Limite critique', color: '#f87171' }
  return { text: '❌ DÉPASSEMENT — Enregistrement impossible', color: '#f87171' }
}

/* ── Composant principal ── */
export default function PlafondSalarial() {
  const [cibleIndex, setCibleIndex] = useState(0)
  const [salaireCustom, setSalaireCustom] = useState(20)
  const [departsSelectionnes, setDepartsSelectionnes] = useState<number[]>([])

  const cible = CIBLES_MERCATO[cibleIndex]
  const salaireSimule = cibleIndex === CIBLES_MERCATO.length - 1 ? salaireCustom : cible.salaire

  const economieDeparts = JOUEURS_ACTUELS
    .filter(j => departsSelectionnes.includes(j.id))
    .reduce((s, j) => s + j.salaire, 0)

  const masseSimulee  = MASSE_ACTUELLE - economieDeparts + salaireSimule
  const pctActuel     = Math.round((MASSE_ACTUELLE / PLAFOND_LIGA) * 100)
  const pctSimule     = Math.round((masseSimulee   / PLAFOND_LIGA) * 100)
  const marge         = PLAFOND_LIGA - MASSE_ACTUELLE
  const margeSimulee  = PLAFOND_LIGA - masseSimulee
  const statutSimule  = getLabel(pctSimule)

  const toggleDepart = (id: number) => {
    setDepartsSelectionnes(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'8px', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(237,187,0,0.08))', padding:'18px 22px', borderBottom:'1px solid var(--barca-border)' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'4px' }}>
          PLAFOND SALARIAL · FAIR-PLAY FINANCIER · LIGA 2025-26
        </div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
          Masse Salariale — <span style={{ color:'var(--barca-gold)' }}>Simulateur d'enregistrement</span>
        </div>
      </div>

      <div style={{ padding:'24px' }}>

        {/* ── Section 1 : Situation actuelle ── */}
        <div style={{ marginBottom:'28px' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:'16px' }}>
            SITUATION ACTUELLE
          </div>

          {/* KPIs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'20px' }}>
            {[
              { label:'MASSE SALARIALE', value:`${MASSE_ACTUELLE} M€`, color:getColorSolid(pctActuel), sub:'annuelle' },
              { label:'PLAFOND LIGA',    value:`${PLAFOND_LIGA} M€`,   color:'rgba(255,255,255,0.6)', sub:'limite autorisée' },
              { label:'MARGE RESTANTE',  value:`${marge} M€`,          color: marge > 150 ? '#4ade80' : marge > 50 ? '#fbbf24' : '#f87171', sub:'disponible' },
            ].map((k,i) => (
              <div key={i} style={{ padding:'14px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'6px', textAlign:'center' }}>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.06em', marginBottom:'6px' }}>{k.label}</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.2rem', fontWeight:900, color:k.color, lineHeight:1 }}>{k.value}</div>
                <div style={{ fontSize:'10px', color:'var(--text-muted)', marginTop:'4px' }}>{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Barre actuelle */}
          <div style={{ marginBottom:'8px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'var(--text-muted)' }}>Utilisation du plafond</span>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'1rem', fontWeight:900, color:getColorSolid(pctActuel) }}>{pctActuel}%</span>
          </div>
          <BarreProgression pct={pctActuel} color={getColor(pctActuel)} height={14} />

          {/* Graduations */}
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:'6px' }}>
            {['0%','25%','50%','75%','100%'].map(v => (
              <span key={v} style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'rgba(255,255,255,0.2)' }}>{v}</span>
            ))}
          </div>

          {/* Répartition par joueur */}
          <div style={{ marginTop:'20px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.06em', marginBottom:'10px' }}>
              RÉPARTITION MASSE SALARIALE
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
              {JOUEURS_ACTUELS.sort((a,b) => b.salaire - a.salaire).map(j => {
                const pct = (j.salaire / MASSE_ACTUELLE) * 100
                const isDepart = departsSelectionnes.includes(j.id)
                return (
                  <div key={j.id} style={{ display:'flex', alignItems:'center', gap:'10px', opacity: isDepart ? 0.35 : 1, transition:'opacity 0.2s' }}>
                    <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', width:'8px', flexShrink:0 }}>{j.poste.slice(0,2)}</span>
                    <span style={{ fontSize:'11px', color: isDepart ? 'var(--text-muted)' : 'var(--text-secondary)', width:'110px', flexShrink:0, textDecoration: isDepart ? 'line-through' : 'none' }}>{j.nom}</span>
                    <div style={{ flex:1, height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.05)', overflow:'hidden' }}>
                      <div style={{ height:'100%', width:`${pct}%`, borderRadius:'3px', background: isDepart ? 'rgba(248,113,113,0.3)' : 'linear-gradient(to right,rgba(0,77,152,0.6),#004D98)', transition:'all 0.3s' }} />
                    </div>
                    <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color: isDepart ? '#f87171' : 'rgba(255,255,255,0.5)', width:'42px', textAlign:'right', flexShrink:0 }}>{j.salaire}M</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div style={{ height:'1px', background:'var(--barca-border)', margin:'0 0 28px' }} />

        {/* ── Section 2 : Simulateur ── */}
        <div>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:'16px' }}>
            SIMULATEUR D'ENREGISTREMENT
          </div>

          {/* Sélecteur cible */}
          <div style={{ marginBottom:'16px' }}>
            <div style={{ fontSize:'11px', color:'var(--text-secondary)', fontFamily:'DM Mono,monospace', marginBottom:'8px' }}>
              1. Choisir une cible mercato
            </div>
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
              {CIBLES_MERCATO.map((c, i) => (
                <button key={i} onClick={() => setCibleIndex(i)} style={{
                  padding:'7px 12px', borderRadius:'5px', border:'1px solid',
                  borderColor: cibleIndex === i ? 'var(--barca-blue)' : 'var(--barca-border)',
                  background: cibleIndex === i ? 'rgba(0,77,152,0.2)' : 'rgba(255,255,255,0.02)',
                  color: cibleIndex === i ? 'white' : 'var(--text-muted)',
                  fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
                  cursor:'pointer', transition:'all 0.2s',
                }}>
                  {c.nom === 'Joueur custom' ? '✏️ Custom' : c.nom}
                  {c.nom !== 'Joueur custom' && <span style={{ color:'var(--barca-gold)', marginLeft:'5px' }}>{c.salaire}M</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Salaire custom */}
          {cibleIndex === CIBLES_MERCATO.length - 1 && (
            <div style={{ marginBottom:'16px', padding:'14px', background:'rgba(0,77,152,0.06)', border:'1px solid rgba(0,77,152,0.2)', borderRadius:'6px' }}>
              <div style={{ fontSize:'11px', color:'var(--text-secondary)', fontFamily:'DM Mono,monospace', marginBottom:'10px' }}>
                Salaire annuel estimé : <span style={{ color:'var(--barca-gold)', fontWeight:900 }}>{salaireCustom} M€</span>
              </div>
              <input
                type="range" min="1" max="80" step="1"
                value={salaireCustom}
                onChange={e => setSalaireCustom(parseInt(e.target.value))}
                style={{ width:'100%', height:'4px', appearance:'none', WebkitAppearance:'none', background:`linear-gradient(to right,#004D98 ${(salaireCustom/80)*100}%,rgba(255,255,255,0.1) ${(salaireCustom/80)*100}%)`, borderRadius:'4px', outline:'none', cursor:'pointer' }}
              />
              <div style={{ display:'flex', justifyContent:'space-between', marginTop:'4px' }}>
                <span style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>1 M€</span>
                <span style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>80 M€</span>
              </div>
            </div>
          )}

          {/* Départs simulés */}
          <div style={{ marginBottom:'20px' }}>
            <div style={{ fontSize:'11px', color:'var(--text-secondary)', fontFamily:'DM Mono,monospace', marginBottom:'8px' }}>
              2. Simuler des départs (optionnel) — économie : <span style={{ color:'#4ade80', fontWeight:700 }}>{economieDeparts} M€</span>
            </div>
            <div style={{ display:'flex', gap:'6px', flexWrap:'wrap' }}>
              {JOUEURS_ACTUELS.map(j => {
                const sel = departsSelectionnes.includes(j.id)
                return (
                  <button key={j.id} onClick={() => toggleDepart(j.id)} style={{
                    padding:'5px 10px', borderRadius:'4px', border:'1px solid',
                    borderColor: sel ? 'rgba(248,113,113,0.5)' : 'var(--barca-border)',
                    background: sel ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.02)',
                    color: sel ? '#f87171' : 'var(--text-muted)',
                    fontFamily:'DM Mono,monospace', fontSize:'10px', cursor:'pointer',
                    transition:'all 0.2s',
                    textDecoration: sel ? 'line-through' : 'none',
                  }}>
                    {j.nom} <span style={{ opacity:0.6 }}>{j.salaire}M</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Résultat simulation */}
          <div style={{
            padding:'18px', borderRadius:'8px',
            background: pctSimule <= 100 ? 'rgba(0,77,152,0.06)' : 'rgba(248,113,113,0.06)',
            border: `1px solid ${pctSimule <= 100 ? 'rgba(0,77,152,0.2)' : 'rgba(248,113,113,0.3)'}`,
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'14px', flexWrap:'wrap', gap:'8px' }}>
              <div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px' }}>MASSE SALARIALE SIMULÉE</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:'8px' }}>
                  <span style={{ fontFamily:'DM Mono,monospace', fontSize:'1.5rem', fontWeight:900, color:getColorSolid(pctSimule) }}>{masseSimulee} M€</span>
                  <span style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>/ {PLAFOND_LIGA} M€</span>
                </div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', marginBottom:'4px' }}>MARGE RESTANTE</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.2rem', fontWeight:900, color: margeSimulee >= 0 ? '#4ade80' : '#f87171' }}>
                  {margeSimulee >= 0 ? '+' : ''}{margeSimulee} M€
                </div>
              </div>
            </div>

            {/* Barre simulée */}
            <div style={{ marginBottom:'8px', display:'flex', justifyContent:'space-between' }}>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)' }}>Utilisation simulée</span>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:900, color:getColorSolid(pctSimule) }}>{pctSimule}%</span>
            </div>

            {/* Double barre : actuelle + simulée */}
            <div style={{ position:'relative', marginBottom:'6px' }}>
              <div style={{ height:'10px', borderRadius:'5px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${Math.min(pctActuel,100)}%`, borderRadius:'5px', background:'rgba(0,77,152,0.4)', transition:'width 0.8s ease' }} />
              </div>
              <div style={{ height:'10px', borderRadius:'5px', background:'transparent', overflow:'hidden', position:'absolute', top:0, left:0, width:'100%' }}>
                <div style={{ height:'100%', width:`${Math.min(pctSimule,100)}%`, borderRadius:'5px', background:getColor(pctSimule), transition:'width 0.8s ease', opacity:0.85 }} />
              </div>
            </div>

            <div style={{ display:'flex', gap:'12px', marginBottom:'14px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'2px', background:'rgba(0,77,152,0.6)' }} />
                <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>Actuelle ({pctActuel}%)</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'2px', background:getColorSolid(pctSimule) }} />
                <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>Simulée ({pctSimule}%)</span>
              </div>
            </div>

            {/* Verdict */}
            <div style={{
              padding:'10px 14px', borderRadius:'5px',
              background: pctSimule <= 100 ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
              border: `1px solid ${pctSimule <= 100 ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
            }}>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:statutSimule.color, letterSpacing:'0.04em' }}>
                {statutSimule.text}
              </span>
              {pctSimule > 100 && (
                <div style={{ fontSize:'11px', color:'var(--text-muted)', marginTop:'4px', fontFamily:'DM Mono,monospace' }}>
                  Dépassement de {Math.abs(margeSimulee)} M€ — des départs supplémentaires sont nécessaires.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
