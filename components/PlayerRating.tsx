'use client'
import { useState } from 'react'

type Player = {
  id: number
  num: number
  name: string
  pos: string
  communityAvg: number
  communityVotes: number
}

const MATCH_PLAYERS: Player[] = [
  {id:1,  num:1,  name:'Iñaki Peña',     pos:'GK', communityAvg:6.8, communityVotes:1243},
  {id:2,  num:22, name:'João Cancelo',   pos:'DD', communityAvg:7.2, communityVotes:1198},
  {id:3,  num:23, name:'Jules Koundé',   pos:'DC', communityAvg:7.5, communityVotes:1201},
  {id:4,  num:15, name:'Christensen',    pos:'DC', communityAvg:6.9, communityVotes:1187},
  {id:5,  num:3,  name:'Alejandro Balde',pos:'DG', communityAvg:7.8, communityVotes:1254},
  {id:6,  num:8,  name:'Pedri',          pos:'MC', communityAvg:8.4, communityVotes:1312},
  {id:7,  num:5,  name:'Casadó',         pos:'MC', communityAvg:7.1, communityVotes:1189},
  {id:8,  num:6,  name:'Gavi',           pos:'MC', communityAvg:7.6, communityVotes:1234},
  {id:9,  num:11, name:'Raphinha',       pos:'AD', communityAvg:8.7, communityVotes:1356},
  {id:10, num:9,  name:'Lewandowski',    pos:'BU', communityAvg:8.1, communityVotes:1298},
  {id:11, num:19, name:'Lamine Yamal',   pos:'AG', communityAvg:9.2, communityVotes:1401},
]

const MATCH_INFO = {
  home: 'FC Barcelone', away: 'Real Madrid',
  score: '3-1', date: '20 avril 2026', comp: 'Liga J32',
}

function getRatingColor(rating: number): string {
  if (rating >= 8.5) return '#4ade80'
  if (rating >= 7.5) return '#86efac'
  if (rating >= 6.5) return '#fbbf24'
  if (rating >= 5.5) return '#fb923c'
  return '#f87171'
}

function getRatingLabel(rating: number): string {
  if (rating >= 9)  return 'Légendaire'
  if (rating >= 8)  return 'Excellent'
  if (rating >= 7)  return 'Bon'
  if (rating >= 6)  return 'Correct'
  if (rating >= 5)  return 'Moyen'
  return 'Mauvais'
}

function RatingGauge({userRating, communityAvg, communityVotes}: {userRating:number, communityAvg:number, communityVotes:number}) {
  const newAvg = ((communityAvg * communityVotes) + userRating) / (communityVotes + 1)
  return (
    <div style={{marginTop:'10px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px',fontSize:'11px',fontFamily:'DM Mono,monospace'}}>
        <span style={{color:'var(--text-muted)'}}>Ta note</span>
        <span style={{color:'var(--text-muted)'}}>Communauté ({(communityVotes+1).toLocaleString()} votes)</span>
      </div>
      <div style={{marginBottom:'6px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'13px',fontWeight:700,fontFamily:'DM Mono,monospace',color:getRatingColor(userRating),width:'28px'}}>{userRating.toFixed(1)}</span>
          <div style={{flex:1,height:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${(userRating/10)*100}%`,background:`linear-gradient(to right,${getRatingColor(userRating)}88,${getRatingColor(userRating)})`,borderRadius:'4px',transition:'width 0.5s ease'}}/>
          </div>
        </div>
      </div>
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <span style={{fontSize:'13px',fontWeight:700,fontFamily:'DM Mono,monospace',color:getRatingColor(newAvg),width:'28px'}}>{newAvg.toFixed(1)}</span>
          <div style={{flex:1,height:'8px',background:'rgba(255,255,255,0.06)',borderRadius:'4px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${(newAvg/10)*100}%`,background:`linear-gradient(to right,${getRatingColor(newAvg)}88,${getRatingColor(newAvg)})`,borderRadius:'4px',transition:'width 0.8s ease'}}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PlayerRating() {
  const [ratings, setRatings] = useState<Record<number,number>>(
    Object.fromEntries(MATCH_PLAYERS.map(p=>[p.id, 7]))
  )
  const [submitted, setSubmitted] = useState(false)
  const [activeSlider, setActiveSlider] = useState<number|null>(null)

  const handleRate = (playerId: number, value: number) => {
    setRatings(r => ({...r, [playerId]: value}))
  }

  const topPlayer  = submitted ? MATCH_PLAYERS.reduce((a,b) => ratings[a.id]>ratings[b.id]?a:b) : null
  const flopPlayer = submitted ? MATCH_PLAYERS.reduce((a,b) => ratings[a.id]<ratings[b.id]?a:b) : null
  const userAvg    = submitted ? Object.values(ratings).reduce((a,b)=>a+b,0)/MATCH_PLAYERS.length : 0

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,rgba(0,77,152,0.3),rgba(165,0,68,0.3))',padding:'18px 22px',borderBottom:'1px solid var(--barca-border)'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'8px'}}>NOTES DES JOUEURS · PLAYER RATINGS</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'white'}}>
              {MATCH_INFO.home} <span style={{color:'var(--barca-gold)'}}>{MATCH_INFO.score}</span> {MATCH_INFO.away}
            </div>
            <div style={{fontSize:'12px',color:'var(--text-muted)',marginTop:'2px',fontFamily:'DM Mono,monospace'}}>
              {MATCH_INFO.comp} · {MATCH_INFO.date}
            </div>
          </div>
          {!submitted && (
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontFamily:'DM Mono,monospace'}}>
              Note chaque joueur de 1 à 10
            </div>
          )}
        </div>
      </div>

      {/* Top/Flop */}
      {submitted && topPlayer && flopPlayer && (
        <div style={{padding:'16px 20px',borderBottom:'1px solid var(--barca-border)',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}}>
          <div style={{background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:'6px',padding:'12px',textAlign:'center'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'#4ade80',letterSpacing:'0.1em',marginBottom:'6px'}}>⭐ MVP</div>
            <div style={{fontSize:'14px',fontWeight:700,color:'white',marginBottom:'2px'}}>{topPlayer.name}</div>
            <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginBottom:'6px'}}>{topPlayer.pos}</div>
            <div style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:'#4ade80',lineHeight:1}}>{ratings[topPlayer.id].toFixed(1)}</div>
          </div>
          <div style={{background:'rgba(0,77,152,0.1)',border:'1px solid rgba(0,77,152,0.2)',borderRadius:'6px',padding:'12px',textAlign:'center'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--barca-blue)',letterSpacing:'0.1em',marginBottom:'6px'}}>TA MOYENNE</div>
            <div style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:'white',lineHeight:1,marginBottom:'4px'}}>{userAvg.toFixed(1)}</div>
            <div style={{fontSize:'11px',color:getRatingColor(userAvg),fontFamily:'DM Mono,monospace'}}>{getRatingLabel(userAvg)}</div>
          </div>
          <div style={{background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:'6px',padding:'12px',textAlign:'center'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'#f87171',letterSpacing:'0.1em',marginBottom:'6px'}}>👎 FLOP</div>
            <div style={{fontSize:'14px',fontWeight:700,color:'white',marginBottom:'2px'}}>{flopPlayer.name}</div>
            <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginBottom:'6px'}}>{flopPlayer.pos}</div>
            <div style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:'#f87171',lineHeight:1}}>{ratings[flopPlayer.id].toFixed(1)}</div>
          </div>
        </div>
      )}

      {/* Liste joueurs */}
      <div style={{padding:'8px 0'}}>
        {MATCH_PLAYERS.map((player, i) => {
          const rating   = ratings[player.id]
          const color    = getRatingColor(rating)
          const isActive = activeSlider === player.id

          return (
            <div key={player.id} style={{
              padding:'12px 16px',
              borderBottom: i < MATCH_PLAYERS.length-1 ? '1px solid var(--barca-border)' : 'none',
              background: isActive ? 'rgba(0,77,152,0.05)' : 'transparent',
              transition:'background 0.15s',
            }}>
              {/* Ligne principale : numéro + nom/poste + note */}
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom: submitted ? '0' : '10px'}}>

                {/* Numéro */}
                <div style={{
                  width:'32px',height:'32px',borderRadius:'50%',flexShrink:0,
                  background:'rgba(0,77,152,0.25)',display:'flex',alignItems:'center',
                  justifyContent:'center',fontSize:'12px',fontFamily:'DM Mono,monospace',
                  fontWeight:700,color:'rgba(255,255,255,0.7)',
                }}>{player.num}</div>

                {/* Nom + poste */}
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:'13px',fontWeight:600,color:'white',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                    {player.name}
                  </div>
                  <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>{player.pos}</div>
                </div>

                {/* Badge note — toujours visible à droite */}
                <div style={{
                  width:'48px',height:'40px',borderRadius:'6px',flexShrink:0,
                  background:`rgba(${rating>=7?'74,222,128':rating>=5?'251,191,36':'248,113,113'},0.15)`,
                  border:`1px solid ${color}44`,
                  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                }}>
                  <div style={{fontSize:'15px',fontWeight:900,fontFamily:'DM Mono,monospace',color,lineHeight:1}}>{rating.toFixed(1)}</div>
                  <div style={{fontSize:'8px',color:'var(--text-muted)',marginTop:'2px',fontFamily:'DM Mono,monospace'}}>{getRatingLabel(rating).slice(0,4)}</div>
                </div>
              </div>

              {/* Slider — sur sa propre ligne en dessous */}
              {!submitted && (
                <div style={{paddingLeft:'42px',paddingRight:'58px'}}>
                  <input
                    type="range"
                    min="1" max="10" step="0.5"
                    value={rating}
                    onChange={e => handleRate(player.id, parseFloat(e.target.value))}
                    onFocus={() => setActiveSlider(player.id)}
                    onBlur={() => setActiveSlider(null)}
                    style={{
                      width:'100%',height:'4px',
                      appearance:'none',WebkitAppearance:'none',
                      background:`linear-gradient(to right, ${color} ${((rating-1)/9)*100}%, rgba(255,255,255,0.1) ${((rating-1)/9)*100}%)`,
                      borderRadius:'4px',outline:'none',cursor:'pointer',display:'block',
                    }}
                  />
                </div>
              )}

              {/* Gauge communauté après vote */}
              {submitted && (
                <div style={{paddingLeft:'42px'}}>
                  <RatingGauge
                    userRating={rating}
                    communityAvg={player.communityAvg}
                    communityVotes={player.communityVotes}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{padding:'16px 20px',borderTop:'1px solid var(--barca-border)',background:'rgba(255,255,255,0.01)'}}>
        {!submitted ? (
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px',flexWrap:'wrap'}}>
            <div style={{fontSize:'12px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
              {MATCH_PLAYERS.length} joueurs · Moy. : <span style={{color:'white',fontWeight:600}}>{(Object.values(ratings).reduce((a,b)=>a+b,0)/MATCH_PLAYERS.length).toFixed(1)}</span>
            </div>
            <button onClick={() => setSubmitted(true)} style={{
              background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',
              border:'none',color:'white',padding:'10px 24px',borderRadius:'6px',
              fontSize:'13px',fontWeight:700,fontFamily:'DM Mono,monospace',
              letterSpacing:'0.06em',cursor:'pointer',
            }}>
              VALIDER MES NOTES →
            </button>
          </div>
        ) : (
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px',flexWrap:'wrap'}}>
            <div style={{fontSize:'12px',color:'#4ade80',fontFamily:'DM Mono,monospace'}}>
              ✓ Notes enregistrées · Merci !
            </div>
            <button onClick={() => setSubmitted(false)} style={{
              background:'transparent',border:'1px solid var(--barca-border)',
              color:'var(--text-muted)',padding:'8px 16px',borderRadius:'4px',
              fontSize:'12px',fontFamily:'DM Mono,monospace',cursor:'pointer',
            }}>
              ← Modifier
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
