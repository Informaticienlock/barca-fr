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
  {id:1, num:2,  name:'Ronald Araújo',  pos:'DC', status:'forfait',   reason:'Rupture ligaments genou droit',  returnDate:'Pré-saison 26-27', matchesMissed:18},
  {id:2, num:5,  name:'Frenkie de Jong',pos:'MC', status:'incertain', reason:'Douleurs cheville',              returnDate:'~28 mai',          matchesMissed:3},
  {id:3, num:14, name:'João Félix',     pos:'AM', status:'incertain', reason:'Gêne musculaire cuisse gauche',  returnDate:'~30 mai',          matchesMissed:1},
  {id:4, num:24, name:'Héctor Fort',    pos:'DD', status:'disponible',reason:"Retour d'une fracture orteil",   returnDate:'Disponible',       matchesMissed:4},
]

const SUSPENSIONS: SuspendedPlayer[] = [
  {id:1, num:6,  name:'Gavi',         pos:'MC', reason:'3ème carton jaune',  matchesBanned:1, matchesLeft:0},
  {id:2, num:22, name:'João Cancelo', pos:'DD', reason:'Carton rouge direct', matchesBanned:2, matchesLeft:1},
]

const STATUS_CONFIG = {
  forfait:    {icon:'✕', label:'Forfait',    bg:'rgba(248,113,113,0.12)', border:'rgba(248,113,113,0.3)', color:'#f87171'},
  incertain:  {icon:'?', label:'Incertain',  bg:'rgba(251,191,36,0.12)',  border:'rgba(251,191,36,0.3)',  color:'#fbbf24'},
  disponible: {icon:'✓', label:'Disponible', bg:'rgba(74,222,128,0.12)',  border:'rgba(74,222,128,0.3)',  color:'#4ade80'},
}

export default function Infirmerie() {
  const [tab, setTab] = useState<'blessures'|'suspensions'>('blessures')
  const forfaits   = INJURIES.filter(p=>p.status==='forfait').length
  const incertains = INJURIES.filter(p=>p.status==='incertain').length

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,rgba(10,15,30,0.9),rgba(20,10,30,0.9))',padding:'16px 20px',borderBottom:'1px solid var(--barca-border)'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'4px'}}>ÉTAT DE L&apos;EFFECTIF</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',fontWeight:700,color:'white',marginBottom:'12px'}}>Infirmerie & Suspensions</div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#f87171',display:'block',flexShrink:0}}/>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'#f87171',fontWeight:600}}>{forfaits} forfait{forfaits>1?'s':''}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(251,191,36,0.1)',border:'1px solid rgba(251,191,36,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{width:'6px',height:'6px',borderRadius:'50%',background:'#fbbf24',display:'block',flexShrink:0}}/>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'#fbbf24',fontWeight:600}}>{incertains} incertain{incertains>1?'s':''}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(165,0,68,0.1)',border:'1px solid rgba(165,0,68,0.2)',borderRadius:'4px',padding:'4px 10px'}}>
            <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--barca-red)',fontWeight:600}}>🟥 {SUSPENSIONS.filter(s=>s.matchesLeft>0).length} suspendu</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',borderBottom:'1px solid var(--barca-border)'}}>
        {([['blessures','🏥 BLESSURES'],['suspensions','🟥 SUSPENSIONS']] as const).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1,padding:'12px',border:'none',cursor:'pointer',
            background:tab===key?'rgba(0,77,152,0.1)':'transparent',
            color:tab===key?'white':'var(--text-muted)',
            fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,letterSpacing:'0.08em',
            borderBottom:tab===key?'2px solid var(--barca-blue)':'2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      {/* Légende */}
      {tab==='blessures' && (
        <div style={{padding:'10px 16px',borderBottom:'1px solid var(--barca-border)',display:'flex',gap:'14px',flexWrap:'wrap'}}>
          {Object.entries(STATUS_CONFIG).map(([key,cfg])=>(
            <div key={key} style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <div style={{width:'18px',height:'18px',borderRadius:'50%',background:cfg.bg,border:`1px solid ${cfg.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'9px',fontWeight:700,color:cfg.color,flexShrink:0}}>{cfg.icon}</div>
              <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{cfg.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Blessures — cards mobile */}
      {tab==='blessures' && (
        <div>
          {INJURIES.map((player,i)=>{
            const cfg = STATUS_CONFIG[player.status]
            return (
              <div key={player.id} style={{
                padding:'14px 16px',
                borderBottom:i<INJURIES.length-1?'1px solid var(--barca-border)':'none',
                display:'flex',alignItems:'flex-start',gap:'12px',
              }}>
                {/* Numéro */}
                <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'rgba(0,77,152,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontFamily:'DM Mono,monospace',fontWeight:700,color:'rgba(255,255,255,0.7)',flexShrink:0}}>{player.num}</div>

                {/* Info */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px',flexWrap:'wrap'}}>
                    <div style={{width:'20px',height:'20px',borderRadius:'50%',background:cfg.bg,border:`1px solid ${cfg.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontWeight:700,color:cfg.color,flexShrink:0}}>{cfg.icon}</div>
                    <span style={{fontSize:'14px',fontWeight:600,color:'white'}}>{player.name}</span>
                    <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',background:'rgba(255,255,255,0.05)',padding:'1px 6px',borderRadius:'2px'}}>{player.pos}</span>
                  </div>
                  <div style={{fontSize:'12px',color:'var(--text-secondary)',marginBottom:'4px'}}>{player.reason}</div>
                  <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                    {player.matchesMissed && (
                      <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{player.matchesMissed} match{player.matchesMissed>1?'s':''} manqué{player.matchesMissed>1?'s':''}</span>
                    )}
                    <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',fontWeight:600,color:player.status==='disponible'?'#4ade80':player.status==='incertain'?'#fbbf24':'#f87171'}}>
                      Retour : {player.returnDate}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Suspensions — cards mobile */}
      {tab==='suspensions' && (
        <div>
          {SUSPENSIONS.map((player,i)=>(
            <div key={player.id} style={{
              padding:'14px 16px',
              borderBottom:i<SUSPENSIONS.length-1?'1px solid var(--barca-border)':'none',
              display:'flex',alignItems:'flex-start',gap:'12px',
            }}>
              <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'rgba(165,0,68,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',fontFamily:'DM Mono,monospace',fontWeight:700,color:'rgba(255,255,255,0.7)',flexShrink:0}}>{player.num}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px',flexWrap:'wrap'}}>
                  <span style={{fontSize:'16px'}}>🟥</span>
                  <span style={{fontSize:'14px',fontWeight:600,color:'white'}}>{player.name}</span>
                  <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',background:'rgba(255,255,255,0.05)',padding:'1px 6px',borderRadius:'2px'}}>{player.pos}</span>
                </div>
                <div style={{fontSize:'12px',color:'var(--text-secondary)',marginBottom:'8px'}}>{player.reason} · {player.matchesBanned} match{player.matchesBanned>1?'s':''} de suspension</div>
                <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  {Array.from({length:player.matchesBanned}).map((_,j)=>(
                    <div key={j} style={{width:'22px',height:'22px',borderRadius:'3px',background:j<player.matchesLeft?'rgba(248,113,113,0.25)':'rgba(74,222,128,0.15)',border:`1px solid ${j<player.matchesLeft?'rgba(248,113,113,0.4)':'rgba(74,222,128,0.3)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px'}}>
                      {j<player.matchesLeft?'✕':'✓'}
                    </div>
                  ))}
                  <span style={{fontSize:'11px',fontFamily:'DM Mono,monospace',fontWeight:600,color:player.matchesLeft>0?'#f87171':'#4ade80',marginLeft:'4px'}}>
                    {player.matchesLeft>0?`${player.matchesLeft} restant`:'Purgé'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
