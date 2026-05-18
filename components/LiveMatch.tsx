'use client'
import { useState, useEffect } from 'react'

/* ── Données match ── */
const MATCH = {
  homeTeam: 'FC Barcelone',
  awayTeam: 'Real Madrid',
  homeLogo: 'FCB',
  awayLogo: 'RMA',
  homeScore: 3,
  awayScore: 1,
  minute: 87,
  statut: 'EN DIRECT' as const,
  competition: 'Liga · J32',
  stade: 'Spotify Camp Nou',
}

const EVENEMENTS = [
  { id:1, minute:84, type:'but',        equipe:'home', joueur:'Lamine Yamal',  detail:'Pied gauche · Surface' },
  { id:2, minute:72, type:'carton',     equipe:'away', joueur:'Tchouaméni',    detail:'Carton jaune' },
  { id:3, minute:65, type:'remplace',   equipe:'home', joueur:'Fermín López',  detail:'Remplace Gavi' },
  { id:4, minute:58, type:'but',        equipe:'home', joueur:'Pedri',         detail:'Pied droit · 20m' },
  { id:5, minute:52, type:'but',        equipe:'away', joueur:'Mbappé',        detail:'Pied droit · Surface' },
  { id:6, minute:38, type:'but',        equipe:'home', joueur:'Raphinha',      detail:'Pied gauche · Corner' },
  { id:7, minute:23, type:'carton',     equipe:'home', joueur:'Casadó',        detail:'Carton jaune' },
  { id:8, minute:12, type:'remplace',   equipe:'away', joueur:'Bellingham',    detail:'Remplace Camavinga' },
]

const STATS = [
  { label:'Possession',    home:64, away:36, unit:'%'  },
  { label:'Tirs',          home:18, away:9,  unit:''   },
  { label:'Tirs cadrés',   home:8,  away:3,  unit:''   },
  { label:'Corners',       home:7,  away:3,  unit:''   },
]

/* ── Icône événement ── */
function getIcon(type: string) {
  if (type === 'but')      return { icon:'⚽', color:'#4ade80' }
  if (type === 'carton')   return { icon:'🟨', color:'#EDBB00' }
  if (type === 'remplace') return { icon:'🔄', color:'#60a5fa' }
  return { icon:'•', color:'white' }
}

/* ── Composant principal ── */
export default function LiveMatch({ onClose }: { onClose: () => void }) {
  const [minute, setMinute] = useState(MATCH.minute)
  const [onglet, setOnglet] = useState<'events'|'stats'>('events')

  /* Chrono qui tourne */
  useEffect(() => {
    const t = setInterval(() => setMinute(m => m < 90 ? m + 1 : 90), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:1000,
      background:'rgba(0,0,0,0.85)', backdropFilter:'blur(4px)',
      display:'flex', alignItems:'flex-start', justifyContent:'center',
      padding:'20px 16px', overflowY:'auto',
    }} onClick={onClose}>
      <div
        style={{
          width:'100%', maxWidth:'480px',
          background:'var(--barca-dark)', border:'1px solid var(--barca-border)',
          borderRadius:'10px', overflow:'hidden',
          marginTop:'60px',
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* Header */}
        <div style={{ background:'linear-gradient(135deg,rgba(165,0,68,0.3),rgba(0,77,152,0.3))', padding:'14px 16px', borderBottom:'1px solid var(--barca-border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#f87171', animation:'pulse 1s infinite' }} />
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'#f87171', letterSpacing:'0.08em' }}>EN DIRECT</span>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)' }}>{MATCH.competition}</span>
          </div>
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:'var(--text-muted)', cursor:'pointer', fontSize:'18px', lineHeight:1 }}>✕</button>
        </div>

        {/* Score */}
        <div style={{ padding:'24px 20px', textAlign:'center', borderBottom:'1px solid var(--barca-border)' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'20px', marginBottom:'12px' }}>

            {/* Équipe home */}
            <div style={{ flex:1, textAlign:'right' }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'8px', background:'linear-gradient(135deg,#003070,#004D98)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:'white', fontFamily:'DM Mono,monospace', marginLeft:'auto', marginBottom:'6px' }}>FCB</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'white' }}>{MATCH.homeTeam}</div>
            </div>

            {/* Score central */}
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'2.8rem', fontWeight:900, color:'white', lineHeight:1, marginBottom:'6px' }}>
                <span style={{ color:'#4ade80' }}>{MATCH.homeScore}</span>
                <span style={{ color:'var(--text-muted)', margin:'0 8px' }}>-</span>
                <span>{MATCH.awayScore}</span>
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:'5px', background:'rgba(248,113,113,0.15)', border:'1px solid rgba(248,113,113,0.3)', borderRadius:'4px', padding:'3px 10px' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#f87171' }} />
                <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'#f87171' }}>{minute}'</span>
              </div>
            </div>

            {/* Équipe away */}
            <div style={{ flex:1, textAlign:'left' }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'8px', background:'linear-gradient(135deg,#6b0028,#A50044)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:'white', fontFamily:'DM Mono,monospace', marginRight:'auto', marginBottom:'6px' }}>RMA</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'white' }}>{MATCH.awayTeam}</div>
            </div>
          </div>

          <div style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>
            {MATCH.stade}
          </div>
        </div>

        {/* Onglets */}
        <div style={{ display:'flex', borderBottom:'1px solid var(--barca-border)' }}>
          {([['events','⚡ ÉVÉNEMENTS'],['stats','📊 STATS']] as const).map(([key,label]) => (
            <button key={key} onClick={() => setOnglet(key)} style={{
              flex:1, padding:'11px', border:'none', cursor:'pointer',
              background: onglet === key ? 'rgba(0,77,152,0.1)' : 'transparent',
              color: onglet === key ? 'white' : 'var(--text-muted)',
              fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:700,
              letterSpacing:'0.06em',
              borderBottom: onglet === key ? '2px solid var(--barca-blue)' : '2px solid transparent',
              transition:'all 0.2s',
            }}>{label}</button>
          ))}
        </div>

        {/* Événements */}
        {onglet === 'events' && (
          <div style={{ padding:'12px 16px', maxHeight:'320px', overflowY:'auto' }}>
            {EVENEMENTS.map(ev => {
              const { icon, color } = getIcon(ev.type)
              const isHome = ev.equipe === 'home'
              return (
                <div key={ev.id} style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding:'10px 0', borderBottom:'1px solid rgba(255,255,255,0.04)',
                  flexDirection: isHome ? 'row' : 'row-reverse',
                }}>
                  <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, color:'var(--text-muted)', width:'28px', textAlign:'center', flexShrink:0 }}>{ev.minute}'</span>
                  <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:`${color}18`, border:`1px solid ${color}44`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'13px', flexShrink:0 }}>{icon}</div>
                  <div style={{ flex:1, textAlign: isHome ? 'left' : 'right' }}>
                    <div style={{ fontSize:'12px', fontWeight:700, color:'white' }}>{ev.joueur}</div>
                    <div style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>{ev.detail}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Stats */}
        {onglet === 'stats' && (
          <div style={{ padding:'16px 20px' }}>
            {STATS.map((s, i) => {
              const total = s.home + s.away || 1
              const pctH  = (s.home / total) * 100
              return (
                <div key={i} style={{ marginBottom:'18px' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'13px', fontWeight:700, color:'#4ade80' }}>{s.home}{s.unit}</span>
                    <span style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>{s.label}</span>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.5)' }}>{s.away}{s.unit}</span>
                  </div>
                  <div style={{ height:'6px', borderRadius:'3px', background:'rgba(255,255,255,0.06)', overflow:'hidden', display:'flex' }}>
                    <div style={{ width:`${pctH}%`, height:'100%', background:'linear-gradient(to right,#003070,#004D98)', borderRadius:'3px 0 0 3px', transition:'width 0.8s ease' }} />
                    <div style={{ width:`${100-pctH}%`, height:'100%', background:'linear-gradient(to left,#6b0028,#A50044)', borderRadius:'0 3px 3px 0', transition:'width 0.8s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </div>
    </div>
  )
}
