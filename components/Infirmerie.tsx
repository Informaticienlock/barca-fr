'use client'
import { useState } from 'react'

type PlayerStatus = {
  id: number
  num: number
  name: string
  pos: string
  status: 'forfait' | 'incertain' | 'disponible'
  reason: string
  returnDate: string
  matchesMissed?: number
}

type SuspendedPlayer = {
  id: number
  num: number
  name: string
  pos: string
  reason: string
  matchesBanned: number
  matchesLeft: number
}

const INJURIES: PlayerStatus[] = [
  {id:1, num:2,  name:'Ronald Araújo',  pos:'DC',  status:'forfait',   reason:'Rupture ligaments genou droit', returnDate:'Pré-saison 2026-27', matchesMissed:18},
  {id:2, num:5,  name:'Frenkie de Jong',pos:'MC',  status:'incertain', reason:'Douleurs cheville',              returnDate:'~28 mai',            matchesMissed:3},
  {id:3, num:14, name:'João Félix',     pos:'AM',  status:'incertain', reason:'Gêne musculaire cuisse gauche',  returnDate:'~30 mai',            matchesMissed:1},
  {id:4, num:24, name:'Héctor Fort',    pos:'DD',  status:'disponible',reason:'Retour d\'une fracture orteil',  returnDate:'Disponible',         matchesMissed:4},
]

const SUSPENSIONS: SuspendedPlayer[] = [
  {id:1, num:6,  name:'Gavi',           pos:'MC', reason:'3ème carton jaune', matchesBanned:1, matchesLeft:0},
  {id:2, num:22, name:'João Cancelo',   pos:'DD', reason:'Carton rouge direct',matchesBanned:2, matchesLeft:1},
]

const STATUS_CONFIG = {
  forfait:    {icon:'✕', label:'Forfait',   bg:'rgba(248,113,113,0.12)', border:'rgba(248,113,113,0.3)', color:'#f87171', dot:'#f87171'},
  incertain:  {icon:'?', label:'Incertain', bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.3)',  color:'#fbbf24', dot:'#fbbf24'},
  disponible: {icon:'✓', label:'Disponible',bg:'rgba(74,222,128,0.12)',  border:'rgba(74,222,128,0.3)',  color:'#4ade80', dot:'#4ade80'},
}

export default function Infirmerie() {
  const [tab, setTab] = useState<'blessures'|'suspensions'>('blessures')

  const forfaits   = INJURIES.filter(p => p.status === 'forfait').length
  const incertains = INJURIES.filter(p => p.status === 'incertain').length

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,rgba(10,15,30,0.9),rgba(20,10,30,0.9))',padding:'18px 22px',borderBottom:'1px solid var(--barca-border)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'4px'}}>ÉTAT DE L&apos;EFFECTIF</div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',fontWeight:700,color:'white'}}>Infirmerie & Suspensions</div>
        </div>
        <div style={{display:'flex',gap:'8px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#f87171',flexShrink:0,display:'block'}}/>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'#f87171',fontWeight:600}}>{forfaits} forfait{forfaits>1?'s':''}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(251,191,36,0.1)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#fbbf24',flexShrink:0,display:'block'}}/>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'#fbbf24',fontWeight:600}}>{incertains} incertain{incertains>1?'s':''}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(165,0,68,0.1)',border:'1px solid rgba(165,0,68,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--barca-red)',fontWeight:600}}>🟥 {SUSPENSIONS.filter(s=>s.matchesLeft>0).length} suspendu{SUSPENSIONS.filter(s=>s.matchesLeft>0).length>1?'s':''}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',borderBottom:'1px solid var(--barca-border)'}}>
        {([['blessures','🏥 BLESSURES'],['suspensions','🟥 SUSPENSIONS']] as const).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1, padding:'12px', border:'none', cursor:'pointer',
            background: tab===key ? 'rgba(0,77,152,0.1)' : 'transparent',
            color: tab===key ? 'white' : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:600,
            letterSpacing:'0.08em',
            borderBottom: tab===key ? '2px solid var(--barca-blue)' : '2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div style={{padding:'0'}}>

        {/* Blessures */}
        {tab === 'blessures' && (
          <div>
            {/* Légende */}
            <div style={{padding:'12px 20px',borderBottom:'1px solid var(--barca-border)',display:'flex',gap:'16px',flexWrap:'wrap'}}>
              {Object.entries(STATUS_CONFIG).map(([key,cfg])=>(
                <div key={key} style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  <div style={{
                    width:'20px',height:'20px',borderRadius:'50%',
                    background:cfg.bg, border:`1px solid ${cfg.border}`,
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:'10px',fontWeight:700,color:cfg.color,
                  }}>{cfg.icon}</div>
                  <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{cfg.label}</span>
                </div>
              ))}
            </div>

            {/* Header tableau */}
            <div style={{
              display:'grid',
              gridTemplateColumns:'40px 1fr 80px 120px 80px',
              gap:'0',
              padding:'8px 20px',
              borderBottom:'1px solid var(--barca-border)',
              background:'rgba(255,255,255,0.02)',
            }}>
              {['N°','Joueur','Poste','Blessure','Retour'].map(h=>(
                <div key={h} style={{fontSize:'9px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{h}</div>
              ))}
            </div>

            {/* Rows */}
            {INJURIES.map((player, i) => {
              const cfg = STATUS_CONFIG[player.status]
              return (
                <div key={player.id} style={{
                  display:'grid',
                  gridTemplateColumns:'40px 1fr 80px 120px 80px',
                  gap:'0',
                  padding:'14px 20px',
                  borderBottom: i < INJURIES.length-1 ? '1px solid var(--barca-border)' : 'none',
                  background: i%2===0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                  alignItems:'center',
                  transition:'background 0.15s',
                }}>
                  {/* Numéro */}
                  <div style={{
                    width:'28px',height:'28px',borderRadius:'50%',
                    background:'rgba(0,77,152,0.3)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontSize:'11px',fontFamily:'DM Mono,monospace',fontWeight:700,color:'rgba(255,255,255,0.7)',
                  }}>{player.num}</div>

                  {/* Nom + statut */}
                  <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <div style={{
                      width:'24px',height:'24px',borderRadius:'50%',flexShrink:0,
                      background:cfg.bg, border:`1px solid ${cfg.border}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:'11px',fontWeight:700,color:cfg.color,
                    }}>{cfg.icon}</div>
                    <div>
                      <div style={{fontSize:'13px',fontWeight:600,color:'white'}}>{player.name}</div>
                      {player.matchesMissed && (
                        <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{player.matchesMissed} match{player.matchesMissed>1?'s':''} manqué{player.matchesMissed>1?'s':''}</div>
                      )}
                    </div>
                  </div>

                  {/* Poste */}
                  <div style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',background:'rgba(255,255,255,0.05)',padding:'2px 8px',borderRadius:'2px',display:'inline-block',width:'fit-content'}}>{player.pos}</div>

                  {/* Raison */}
                  <div style={{fontSize:'12px',color:'var(--text-secondary)',lineHeight:1.4,paddingRight:'12px'}}>{player.reason}</div>

                  {/* Retour */}
                  <div style={{
                    fontSize:'11px',fontFamily:'DM Mono,monospace',fontWeight:600,
                    color: player.status==='disponible' ? '#4ade80' : player.status==='incertain' ? '#fbbf24' : '#f87171',
                  }}>{player.returnDate}</div>
                </div>
              )
            })}
          </div>
        )}

        {/* Suspensions */}
        {tab === 'suspensions' && (
          <div>
            <div style={{
              display:'grid',
              gridTemplateColumns:'40px 1fr 80px 1fr 100px',
              gap:'0',
              padding:'8px 20px',
              borderBottom:'1px solid var(--barca-border)',
              background:'rgba(255,255,255,0.02)',
            }}>
              {['N°','Joueur','Poste','Raison','Matchs restants'].map(h=>(
                <div key={h} style={{fontSize:'9px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',letterSpacing:'0.1em',textTransform:'uppercase'}}>{h}</div>
              ))}
            </div>

            {SUSPENSIONS.map((player, i) => (
              <div key={player.id} style={{
                display:'grid',
                gridTemplateColumns:'40px 1fr 80px 1fr 100px',
                gap:'0',
                padding:'14px 20px',
                borderBottom: i < SUSPENSIONS.length-1 ? '1px solid var(--barca-border)' : 'none',
                alignItems:'center',
              }}>
                <div style={{width:'28px',height:'28px',borderRadius:'50%',background:'rgba(165,0,68,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontFamily:'DM Mono,monospace',fontWeight:700,color:'rgba(255,255,255,0.7)'}}>{player.num}</div>

                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                  <div style={{fontSize:'16px'}}>🟥</div>
                  <div>
                    <div style={{fontSize:'13px',fontWeight:600,color:'white'}}>{player.name}</div>
                    <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{player.matchesBanned} match{player.matchesBanned>1?'s':''} de suspension</div>
                  </div>
                </div>

                <div style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',background:'rgba(255,255,255,0.05)',padding:'2px 8px',borderRadius:'2px',display:'inline-block',width:'fit-content'}}>{player.pos}</div>

                <div style={{fontSize:'12px',color:'var(--text-secondary)',paddingRight:'12px'}}>{player.reason}</div>

                <div style={{display:'flex',gap:'4px'}}>
                  {Array.from({length:player.matchesBanned}).map((_,j)=>(
                    <div key={j} style={{
                      width:'20px',height:'20px',borderRadius:'2px',
                      background: j < player.matchesLeft ? 'rgba(248,113,113,0.3)' : 'rgba(74,222,128,0.2)',
                      border: `1px solid ${j < player.matchesLeft ? 'rgba(248,113,113,0.5)' : 'rgba(74,222,128,0.3)'}`,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:'10px',
                    }}>
                      {j < player.matchesLeft ? '✕' : '✓'}
                    </div>
                  ))}
                  <span style={{fontSize:'11px',color: player.matchesLeft > 0 ? '#f87171' : '#4ade80',fontFamily:'DM Mono,monospace',marginLeft:'6px',alignSelf:'center'}}>
                    {player.matchesLeft > 0 ? `${player.matchesLeft} restant` : 'Purgé'}
                  </span>
                </div>
              </div>
            ))}

            {SUSPENSIONS.length === 0 && (
              <div style={{padding:'40px',textAlign:'center',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',fontSize:'13px'}}>
                ✓ Aucune suspension en cours
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
