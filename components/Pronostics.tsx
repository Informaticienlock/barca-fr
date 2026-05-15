'use client'
import { useState } from 'react'

const PLAYERS_MVP = [
  { id: 1, num: 19, name: 'Lamine Yamal',    pos: 'AD',  votes: 342 },
  { id: 2, num: 9,  name: 'Lewandowski',     pos: 'BU',  votes: 287 },
  { id: 3, num: 11, name: 'Raphinha',        pos: 'AG',  votes: 198 },
  { id: 4, num: 8,  name: 'Pedri',           pos: 'MC',  votes: 176 },
  { id: 5, num: 6,  name: 'Gavi',            pos: 'MC',  votes: 134 },
  { id: 6, num: 23, name: 'Koundé',          pos: 'DD',  votes: 89  },
]

const SCORE_OPTIONS = [
  '1-0','2-0','2-1','3-0','3-1','3-2',
  '0-0','1-1','2-2',
  '0-1','0-2','1-2','0-3','1-3','2-3',
]

const INITIAL_SCORE_VOTES: Record<string, number> = {
  '2-1': 445, '3-1': 312, '2-0': 287, '1-0': 198,
  '3-0': 167, '1-1': 134, '3-2': 98, '0-1': 76,
  '2-2': 54, '1-2': 43, '0-2': 32, '0-0': 28,
}

function getScoreColor(score: string) {
  const [h, a] = score.split('-').map(Number)
  if (h > a) return 'var(--barca-blue)'
  if (h < a) return 'var(--barca-red)'
  return 'rgba(255,255,255,0.3)'
}

function getScoreLabel(score: string) {
  const [h, a] = score.split('-').map(Number)
  if (h > a) return 'Barça gagne'
  if (h < a) return 'PSG gagne'
  return 'Match nul'
}

export default function Pronostics() {
  const [phase, setPhase] = useState<'vote'|'results'>('vote')
  const [selectedScore, setSelectedScore] = useState<string|null>(null)
  const [selectedMvp, setSelectedMvp] = useState<number|null>(null)
  const [scoreVotes, setScoreVotes] = useState(INITIAL_SCORE_VOTES)
  const [mvpVotes, setMvpVotes] = useState<Record<number,number>>(
    Object.fromEntries(PLAYERS_MVP.map(p=>[p.id, p.votes]))
  )
  const [error, setError] = useState('')

  const totalScoreVotes = Object.values(scoreVotes).reduce((a,b)=>a+b,0)
  const totalMvpVotes = Object.values(mvpVotes).reduce((a,b)=>a+b,0)

  const handleSubmit = () => {
    if (!selectedScore) { setError('Choisis un score pour continuer'); return }
    if (!selectedMvp) { setError('Choisis un MVP pour continuer'); return }
    setError('')
    setScoreVotes(v=>({...v, [selectedScore]:(v[selectedScore]||0)+1}))
    setMvpVotes(v=>({...v, [selectedMvp]:(v[selectedMvp]||0)+1}))
    setPhase('results')
  }

  const sortedScores = SCORE_OPTIONS
    .filter(s => (scoreVotes[s]||0) > 0)
    .sort((a,b)=>(scoreVotes[b]||0)-(scoreVotes[a]||0))
    .slice(0, 8)

  const sortedMvp = [...PLAYERS_MVP].sort((a,b)=>(mvpVotes[b.id]||0)-(mvpVotes[a.id]||0))
  const topMvpVotes = mvpVotes[sortedMvp[0].id] || 1

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,rgba(165,0,68,0.3),rgba(0,77,152,0.3))',padding:'20px 24px',borderBottom:'1px solid var(--barca-border)',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'4px'}}>PRONOSTICS COMMUNAUTÉ</div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'white'}}>Barça — PSG · Finale UCL</div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
          <div style={{width:'8px',height:'8px',background:'#4ade80',borderRadius:'50%',animation:'pulse 1.5s infinite'}}/>
          <span style={{fontSize:'12px',color:'#4ade80',fontFamily:'DM Mono,monospace',fontWeight:600}}>
            {(totalScoreVotes).toLocaleString()} VOTES
          </span>
        </div>
      </div>

      <div style={{padding:'24px'}}>

        {phase === 'vote' ? (
          <>
            {/* Score exact */}
            <div style={{marginBottom:'32px'}}>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'white',marginBottom:'6px'}}>
                Quel sera le score final ?
              </h3>
              <p style={{fontSize:'13px',color:'var(--text-muted)',marginBottom:'16px'}}>Barça — PSG (après 90 min)</p>

              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'8px',marginBottom:'12px'}}>
                {SCORE_OPTIONS.map(score=>(
                  <button
                    key={score}
                    onClick={()=>setSelectedScore(score)}
                    style={{
                      padding:'10px 6px',borderRadius:'6px',border:'none',cursor:'pointer',
                      background: selectedScore===score
                        ? getScoreColor(score)
                        : 'rgba(255,255,255,0.04)',
                      color: selectedScore===score ? 'white' : 'var(--text-secondary)',
                      fontFamily:'DM Mono,monospace',fontSize:'14px',fontWeight:700,
                      outline: selectedScore===score ? `2px solid ${getScoreColor(score)}` : '1px solid var(--barca-border)',
                      transition:'all 0.15s',
                      transform: selectedScore===score ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    {score}
                  </button>
                ))}
              </div>

              {selectedScore && (
                <div style={{padding:'8px 14px',background:'rgba(0,77,152,0.15)',border:'1px solid rgba(0,77,152,0.3)',borderRadius:'4px',fontSize:'12px',color:'rgba(255,255,255,0.7)',fontFamily:'DM Mono,monospace'}}>
                  ✓ Tu pronostics : <strong style={{color:'white'}}>{selectedScore}</strong> — {getScoreLabel(selectedScore)}
                </div>
              )}
            </div>

            {/* MVP */}
            <div style={{marginBottom:'24px'}}>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'white',marginBottom:'6px'}}>
                Qui sera l&apos;homme du match ?
              </h3>
              <p style={{fontSize:'13px',color:'var(--text-muted)',marginBottom:'16px'}}>Vote pour le MVP côté Barça</p>

              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {PLAYERS_MVP.map(player=>(
                  <button
                    key={player.id}
                    onClick={()=>setSelectedMvp(player.id)}
                    style={{
                      display:'flex',alignItems:'center',gap:'12px',
                      padding:'12px 16px',borderRadius:'6px',border:'none',cursor:'pointer',
                      background: selectedMvp===player.id
                        ? 'rgba(0,77,152,0.25)'
                        : 'rgba(255,255,255,0.03)',
                      outline: selectedMvp===player.id
                        ? '2px solid var(--barca-blue)'
                        : '1px solid var(--barca-border)',
                      transition:'all 0.15s',
                      textAlign:'left',
                    }}
                  >
                    <div style={{
                      width:'36px',height:'36px',borderRadius:'50%',flexShrink:0,
                      background: selectedMvp===player.id
                        ? 'linear-gradient(135deg,var(--barca-blue),var(--barca-red))'
                        : 'rgba(255,255,255,0.08)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,
                      color: selectedMvp===player.id ? 'white' : 'var(--text-secondary)',
                    }}>{player.num}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:'14px',fontWeight:600,color: selectedMvp===player.id ? 'white' : 'var(--text-secondary)'}}>{player.name}</div>
                      <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{player.pos}</div>
                    </div>
                    {selectedMvp===player.id && (
                      <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'var(--barca-blue)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'white',flexShrink:0}}>✓</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div style={{padding:'10px 14px',background:'rgba(248,113,113,0.1)',border:'1px solid rgba(248,113,113,0.3)',borderRadius:'4px',fontSize:'13px',color:'#f87171',marginBottom:'16px',fontFamily:'DM Mono,monospace'}}>
                ⚠ {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              style={{
                width:'100%',padding:'14px',borderRadius:'6px',border:'none',cursor:'pointer',
                background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',
                color:'white',fontSize:'14px',fontWeight:700,fontFamily:'DM Mono,monospace',
                letterSpacing:'0.08em',transition:'opacity 0.2s',
              }}
              onMouseOver={e=>(e.currentTarget.style.opacity='0.85')}
              onMouseOut={e=>(e.currentTarget.style.opacity='1')}
            >
              VALIDER MON PRONOSTIC →
            </button>
          </>
        ) : (
          <>
            {/* Résultats */}
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'24px',padding:'12px 16px',background:'rgba(74,222,128,0.1)',border:'1px solid rgba(74,222,128,0.3)',borderRadius:'6px'}}>
              <span style={{fontSize:'18px'}}>🎉</span>
              <div>
                <div style={{fontSize:'13px',fontWeight:600,color:'#4ade80'}}>Pronostic enregistré !</div>
                <div style={{fontSize:'12px',color:'var(--text-muted)'}}>Tu as voté <strong style={{color:'white'}}>{selectedScore}</strong> avec <strong style={{color:'white'}}>{PLAYERS_MVP.find(p=>p.id===selectedMvp)?.name}</strong> MVP</div>
              </div>
            </div>

            {/* Résultats score */}
            <div style={{marginBottom:'32px'}}>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'white',marginBottom:'16px'}}>
                📊 Scores les plus votés
              </h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {sortedScores.map((score, i) => {
                  const votes = scoreVotes[score] || 0
                  const pct = Math.round((votes/totalScoreVotes)*100)
                  return (
                    <div key={score} style={{display:'flex',alignItems:'center',gap:'12px'}}>
                      <div style={{
                        width:'44px',fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,
                        color: selectedScore===score ? 'white' : 'var(--text-secondary)',
                        textAlign:'center',flexShrink:0,
                      }}>{score}</div>
                      <div style={{flex:1,height:'24px',background:'rgba(255,255,255,0.05)',borderRadius:'3px',overflow:'hidden',position:'relative'}}>
                        <div style={{
                          height:'100%',borderRadius:'3px',
                          width:`${pct}%`,
                          background: selectedScore===score
                            ? `linear-gradient(to right,${getScoreColor(score)},${getScoreColor(score)}99)`
                            : 'rgba(255,255,255,0.1)',
                          transition:'width 0.8s ease',
                        }}/>
                        <span style={{
                          position:'absolute',left:'8px',top:'50%',transform:'translateY(-50%)',
                          fontSize:'11px',color:'rgba(255,255,255,0.6)',fontFamily:'DM Mono,monospace',
                        }}>{getScoreLabel(score)}</span>
                      </div>
                      <span style={{
                        fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,
                        color: selectedScore===score ? '#4ade80' : 'var(--text-muted)',
                        width:'40px',textAlign:'right',flexShrink:0,
                      }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Résultats MVP */}
            <div>
              <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'white',marginBottom:'16px'}}>
                ⭐ MVP le plus voté
              </h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                {sortedMvp.map((player, i) => {
                  const votes = mvpVotes[player.id] || 0
                  const pct = Math.round((votes/totalMvpVotes)*100)
                  const barWidth = Math.round((votes/topMvpVotes)*100)
                  return (
                    <div key={player.id} style={{display:'flex',alignItems:'center',gap:'10px'}}>
                      <div style={{
                        width:'28px',height:'28px',borderRadius:'50%',flexShrink:0,
                        background: i===0 ? 'linear-gradient(135deg,var(--barca-gold),#f5a623)' : 'rgba(255,255,255,0.07)',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        fontSize:'11px',fontWeight:700,fontFamily:'DM Mono,monospace',
                        color: i===0 ? '#0a0f1e' : 'var(--text-muted)',
                      }}>{player.num}</div>
                      <span style={{fontSize:'13px',color: selectedMvp===player.id ? 'white' : 'var(--text-secondary)',fontWeight: selectedMvp===player.id ? 600 : 400,width:'110px',flexShrink:0}}>{player.name}</span>
                      <div style={{flex:1,height:'20px',background:'rgba(255,255,255,0.05)',borderRadius:'3px',overflow:'hidden'}}>
                        <div style={{
                          height:'100%',borderRadius:'3px',
                          width:`${barWidth}%`,
                          background: i===0
                            ? 'linear-gradient(to right,var(--barca-gold),#f5a623)'
                            : selectedMvp===player.id
                              ? 'linear-gradient(to right,var(--barca-blue),#0066cc)'
                              : 'rgba(255,255,255,0.1)',
                          transition:'width 0.8s ease',
                        }}/>
                      </div>
                      <span style={{
                        fontFamily:'DM Mono,monospace',fontSize:'12px',fontWeight:600,
                        color: i===0 ? 'var(--barca-gold)' : 'var(--text-muted)',
                        width:'36px',textAlign:'right',flexShrink:0,
                      }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <button
              onClick={()=>{setPhase('vote');setSelectedScore(null);setSelectedMvp(null)}}
              style={{marginTop:'24px',padding:'10px 20px',borderRadius:'4px',border:'1px solid var(--barca-border)',background:'transparent',color:'var(--text-muted)',cursor:'pointer',fontSize:'12px',fontFamily:'DM Mono,monospace'}}
            >
              ← Modifier mon pronostic
            </button>
          </>
        )}
      </div>
    </div>
  )
}
