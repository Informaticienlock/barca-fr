'use client'
import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'

/* ── Types ── */
type FicheJoueur = {
  id: number; num: number; nom: string; prenom: string; age: number
  nationalite: string; poste: string; positionCode: string
  initiales: string; pied: string; taille: string; valeur: string; note: number
  radar: { subject: string; value: number; fullMark: number }[]
  stats: { label: string; value: string | number; unit?: string; color: string }[]
  description: string
}

const JOUEURS: FicheJoueur[] = [
  {
    id:1, num:8, nom:'Pedri', prenom:'Pedro González', age:23,
    nationalite:'🇪🇸', poste:'Milieu Central', positionCode:'CM',
    initiales:'PE', pied:'Droit', taille:'174 cm', valeur:'120 M€', note:9.0,
    radar:[
      {subject:'Passes',   value:94,fullMark:100},
      {subject:'Vision',   value:92,fullMark:100},
      {subject:'Dribbles', value:85,fullMark:100},
      {subject:'Récup.',   value:74,fullMark:100},
      {subject:'Pressing', value:80,fullMark:100},
      {subject:'Tirs',     value:72,fullMark:100},
    ],
    stats:[
      {label:'Passes réussies / match',   value:74,    color:'#004D98'},
      {label:'Passes progressives',       value:8.2,   unit:'/90', color:'#60a5fa'},
      {label:'Dribbles réussis',          value:'62%', color:'#EDBB00'},
      {label:'Ballons récupérés',         value:5.4,   unit:'/90', color:'#4ade80'},
      {label:'Distance progressive',      value:312,   unit:'m',   color:'#a78bfa'},
      {label:'xA (passes décisives xG)',  value:0.18,  unit:'/90', color:'#fb923c'},
    ],
    description:'Cerveau du jeu barcelonais. Pedri combine une vision de jeu exceptionnelle avec une capacité technique rare.',
  },
  {
    id:2, num:19, nom:'Yamal', prenom:'Lamine Yamal', age:17,
    nationalite:'🇪🇸', poste:'Ailier Droit', positionCode:'RW',
    initiales:'LY', pied:'Gauche', taille:'180 cm', valeur:'180 M€', note:9.3,
    radar:[
      {subject:'Dribbles',  value:97,fullMark:100},
      {subject:'Vitesse',   value:95,fullMark:100},
      {subject:'Buts',      value:82,fullMark:100},
      {subject:'Passes clés',value:88,fullMark:100},
      {subject:'xG',        value:80,fullMark:100},
      {subject:'Défense',   value:55,fullMark:100},
    ],
    stats:[
      {label:'Buts saison',              value:18,    color:'#004D98'},
      {label:'Passes décisives',         value:14,    color:'#60a5fa'},
      {label:'Dribbles réussis / match', value:4.8,   color:'#EDBB00'},
      {label:'xG par match',             value:0.42,  color:'#4ade80'},
      {label:'Tirs cadrés / match',      value:2.1,   color:'#a78bfa'},
      {label:'Duels offensifs gagnés',   value:'58%', color:'#fb923c'},
    ],
    description:'Phénomène générationnel. À 17 ans, Yamal est déjà l\'un des meilleurs joueurs du monde.',
  },
  {
    id:3, num:11, nom:'Raphinha', prenom:'Raphael Belloli', age:28,
    nationalite:'🇧🇷', poste:'Ailier Droit', positionCode:'RW',
    initiales:'RA', pied:'Gauche', taille:'176 cm', valeur:'80 M€', note:8.7,
    radar:[
      {subject:'Dribbles',  value:88,fullMark:100},
      {subject:'Vitesse',   value:90,fullMark:100},
      {subject:'Buts',      value:86,fullMark:100},
      {subject:'Passes clés',value:80,fullMark:100},
      {subject:'xG',        value:84,fullMark:100},
      {subject:'Défense',   value:68,fullMark:100},
    ],
    stats:[
      {label:'Buts saison',              value:22,    color:'#004D98'},
      {label:'Passes décisives',         value:11,    color:'#60a5fa'},
      {label:'Dribbles réussis / match', value:3.6,   color:'#EDBB00'},
      {label:'xG par match',             value:0.51,  color:'#4ade80'},
      {label:'Tirs cadrés / match',      value:2.4,   color:'#a78bfa'},
      {label:'Duels offensifs gagnés',   value:'54%', color:'#fb923c'},
    ],
    description:'Capitaine et leader technique. Raphinha a explosé cette saison avec plus de 30 contributions.',
  },
  {
    id:4, num:9, nom:'Lewandowski', prenom:'Robert', age:36,
    nationalite:'🇵🇱', poste:'Avant-Centre', positionCode:'ST',
    initiales:'RL', pied:'Droit', taille:'185 cm', valeur:'15 M€', note:8.1,
    radar:[
      {subject:'Finition',  value:95,fullMark:100},
      {subject:'Tirs',      value:90,fullMark:100},
      {subject:'xG',        value:88,fullMark:100},
      {subject:'Jeu de tête',value:85,fullMark:100},
      {subject:'Pressing',  value:72,fullMark:100},
      {subject:'Passes clés',value:65,fullMark:100},
    ],
    stats:[
      {label:'Buts saison',          value:24,    color:'#004D98'},
      {label:'xG total',             value:21.4,  color:'#60a5fa'},
      {label:'Tirs / match',         value:3.8,   color:'#EDBB00'},
      {label:'Tirs cadrés',          value:'54%', color:'#4ade80'},
      {label:'Buts / 90 min',        value:0.74,  color:'#a78bfa'},
      {label:'Duels aériens gagnés', value:'62%', color:'#fb923c'},
    ],
    description:'Malgré ses 36 ans, Lewandowski reste un prédateur de surface redoutable.',
  },
  {
    id:5, num:5, nom:'Casadó', prenom:'Marc', age:21,
    nationalite:'🇪🇸', poste:'Milieu Défensif', positionCode:'CDM',
    initiales:'MC', pied:'Droit', taille:'183 cm', valeur:'45 M€', note:8.4,
    radar:[
      {subject:'Récup.',   value:92,fullMark:100},
      {subject:'Duels',    value:90,fullMark:100},
      {subject:'Pressing', value:94,fullMark:100},
      {subject:'Passes',   value:84,fullMark:100},
      {subject:'Vision',   value:78,fullMark:100},
      {subject:'Tirs',     value:45,fullMark:100},
    ],
    stats:[
      {label:'Ballons récupérés / 90', value:9.2,   color:'#004D98'},
      {label:'Interceptions / match',  value:3.8,   color:'#60a5fa'},
      {label:'Duels gagnés',           value:'68%', color:'#EDBB00'},
      {label:'Passes réussies',        value:'88%', color:'#4ade80'},
      {label:'Km parcourus / match',   value:11.4,  unit:'km', color:'#a78bfa'},
      {label:'Fautes subies / match',  value:2.1,   color:'#fb923c'},
    ],
    description:'Métronome défensif révélation de la saison. Casadó impressionne par sa maturité et son intelligence.',
  },
  {
    id:6, num:23, nom:'Koundé', prenom:'Jules', age:25,
    nationalite:'🇫🇷', poste:'Défenseur Droit', positionCode:'RB',
    initiales:'JK', pied:'Droit', taille:'181 cm', valeur:'65 M€', note:7.8,
    radar:[
      {subject:'Duels',        value:88,fullMark:100},
      {subject:'Anticipation', value:86,fullMark:100},
      {subject:'Vitesse',      value:90,fullMark:100},
      {subject:'Passes',       value:78,fullMark:100},
      {subject:'Centres',      value:70,fullMark:100},
      {subject:'Jeu aérien',   value:72,fullMark:100},
    ],
    stats:[
      {label:'Duels défensifs gagnés', value:'72%', color:'#004D98'},
      {label:'Interceptions / match',  value:2.6,   color:'#60a5fa'},
      {label:'Passes réussies',        value:'84%', color:'#EDBB00'},
      {label:'Dégagements / match',    value:3.1,   color:'#4ade80'},
      {label:'Km parcourus / match',   value:10.8,  unit:'km', color:'#a78bfa'},
      {label:'Centres réussis',        value:'45%', color:'#fb923c'},
    ],
    description:'Défenseur complet et moderne. Koundé excelle dans les duels et apporte vitesse et qualité balle au pied.',
  },
]

function getNoteColor(n: number) {
  if (n >= 9)  return '#EDBB00'
  if (n >= 8)  return '#4ade80'
  if (n >= 7)  return '#60a5fa'
  return '#f87171'
}

function RadarTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'rgba(10,15,30,0.97)', border:'1px solid var(--barca-border)', borderRadius:'6px', padding:'8px 12px' }}>
      <span style={{ fontFamily:'DM Mono,monospace', fontSize:'12px', fontWeight:700, color:'#EDBB00' }}>
        {payload[0].payload.subject} : {payload[0].value}
      </span>
    </div>
  )
}

export default function RadarJoueur() {
  const [selected, setSelected] = useState(0)
  const j = JOUEURS[selected]

  return (
    <div style={{ background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'8px', overflow:'hidden' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(237,187,0,0.08))', padding:'18px 22px', borderBottom:'1px solid var(--barca-border)' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'4px' }}>
          RADAR DE PROFIL · FICHE JOUEUR · DATA-VIZ
        </div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
          Profil de Jeu — <span style={{ color:'var(--barca-gold)' }}>Analyse Individuelle</span>
        </div>
      </div>

      {/* Sélecteur — grille 3 colonnes sur mobile */}
      <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--barca-border)', display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'8px' }}>
        {JOUEURS.map((jj, i) => (
          <button key={jj.id} onClick={() => setSelected(i)} style={{
            display:'flex', alignItems:'center', gap:'8px',
            padding:'8px 10px', borderRadius:'6px', border:'1px solid',
            borderColor: selected === i ? 'var(--barca-blue)' : 'var(--barca-border)',
            background:  selected === i ? 'rgba(0,77,152,0.15)' : 'rgba(255,255,255,0.02)',
            cursor:'pointer', transition:'all 0.2s',
          }}>
            <div style={{
              width:'26px', height:'26px', borderRadius:'50%', flexShrink:0,
              background: selected === i ? 'linear-gradient(135deg,#004D98,#EDBB00)' : 'rgba(0,77,152,0.3)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'8px', fontWeight:900, color:'white', fontFamily:'DM Mono,monospace',
            }}>{jj.initiales}</div>
            <div style={{ textAlign:'left', minWidth:0 }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700, color: selected === i ? 'white' : 'var(--text-muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{jj.nom}</div>
              <div style={{ fontSize:'9px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>#{jj.num} · {jj.positionCode}</div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding:'20px 16px' }}>

        {/* ── Identité joueur ── */}
        <div style={{ display:'flex', gap:'14px', alignItems:'flex-start', marginBottom:'20px' }}>
          <div style={{
            width:'64px', height:'64px', borderRadius:'10px', flexShrink:0,
            background:'linear-gradient(145deg,#003070,#004D98)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'18px', fontWeight:900, color:'rgba(255,255,255,0.7)',
            fontFamily:'DM Mono,monospace', border:'2px solid rgba(237,187,0,0.3)',
          }}>{j.initiales}</div>

          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.1rem', fontWeight:900, color:'white', marginBottom:'6px' }}>
              {j.prenom} {j.nom} <span>{j.nationalite}</span>
            </div>
            <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', marginBottom:'8px' }}>
              {[j.poste, `${j.age} ans`, j.pied, j.taille].map((v,i) => (
                <span key={i} style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'rgba(255,255,255,0.6)', padding:'2px 7px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'3px' }}>{v}</span>
              ))}
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontFamily:'DM Mono,monospace', fontSize:'1.6rem', fontWeight:900, color:getNoteColor(j.note), lineHeight:1 }}>{j.note}</span>
              <div>
                <div style={{ fontSize:'9px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>NOTE SAISON</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'var(--barca-gold)' }}>{j.valeur}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Radar ── */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:'10px' }}>
            PROFIL RADAR — {j.positionCode}
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={j.radar} margin={{ top:10, right:20, bottom:10, left:20 }}>
              <PolarGrid stroke="rgba(255,255,255,0.07)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize:11, fill:'rgba(255,255,255,0.55)', fontFamily:'DM Mono,monospace' }} />
              <Tooltip content={<RadarTooltip />} />
              <Radar name={j.nom} dataKey="value" stroke="#004D98" fill="#004D98" fillOpacity={0.22} strokeWidth={2} dot={{ fill:'#EDBB00', r:4, strokeWidth:0 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Stats clés ── */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:'12px' }}>
            STATISTIQUES CLÉS — SAISON 2025-26
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
            {j.stats.map((s, i) => {
              const numVal = typeof s.value === 'number' ? s.value : parseFloat(s.value)
              const isPct  = typeof s.value === 'string' && s.value.includes('%')
              const barPct = isPct ? numVal : Math.min((numVal / 100) * 100, 100)
              return (
                <div key={i} style={{ padding:'10px 12px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'6px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'6px' }}>
                    <span style={{ fontSize:'11px', color:'var(--text-secondary)', fontFamily:'DM Mono,monospace' }}>{s.label}</span>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'13px', fontWeight:900, color:s.color, flexShrink:0, marginLeft:'8px' }}>{s.value}{s.unit}</span>
                  </div>
                  <div style={{ height:'3px', borderRadius:'2px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${barPct}%`, borderRadius:'2px', background:s.color, transition:'width 0.8s ease', opacity:0.8 }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Scores radar ── */}
        <div style={{ marginBottom:'20px' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.08em', marginBottom:'10px' }}>SCORES RADAR</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'6px' }}>
            {j.radar.map(r => (
              <div key={r.subject} style={{ display:'flex', alignItems:'center', gap:'8px', padding:'7px 10px', background:'rgba(255,255,255,0.02)', border:'1px solid var(--barca-border)', borderRadius:'4px' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'9px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', marginBottom:'3px' }}>{r.subject}</div>
                  <div style={{ height:'3px', borderRadius:'2px', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                    <div style={{ height:'100%', width:`${r.value}%`, borderRadius:'2px', background: r.value >= 90 ? '#EDBB00' : r.value >= 75 ? '#004D98' : '#60a5fa', transition:'width 0.8s ease' }} />
                  </div>
                </div>
                <span style={{ fontFamily:'DM Mono,monospace', fontSize:'12px', fontWeight:800, color: r.value >= 90 ? '#EDBB00' : 'white', flexShrink:0 }}>{r.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Description ── */}
        <div style={{ padding:'12px 14px', background:'rgba(237,187,0,0.05)', borderLeft:'3px solid var(--barca-gold)', borderRadius:'0 4px 4px 0', fontSize:'12px', color:'var(--text-secondary)', lineHeight:1.7, fontStyle:'italic' }}>
          {j.description}
        </div>

      </div>
    </div>
  )
}
