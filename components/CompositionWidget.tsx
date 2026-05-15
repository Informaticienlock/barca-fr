'use client'
import { useState } from 'react'

const FORMATIONS: Record<string, number[][]> = {
  '4-3-3': [
    [[50, 88]],
    [[18,68],[36,72],[64,72],[82,68]],
    [[25,48],[50,44],[75,48]],
    [[18,22],[38,16],[62,16],[82,22]],
  ],
  '4-2-3-1': [
    [[50, 88]],
    [[18,68],[36,72],[64,72],[82,68]],
    [[35,52],[65,52]],
    [[20,34],[50,30],[80,34]],
    [[50,16]],
  ],
  '3-5-2': [
    [[50, 88]],
    [[25,68],[50,65],[75,68]],
    [[12,46],[30,50],[50,44],[70,50],[88,46]],
    [[30,20],[70,20]],
  ],
  '4-4-2': [
    [[50, 88]],
    [[18,68],[36,72],[64,72],[82,68]],
    [[18,46],[38,48],[62,48],[82,46]],
    [[30,20],[70,20]],
  ],
}

const SQUAD = [
  {id:1, num:1,  name:'Peña',      pos:'GK'},
  {id:2, num:22, name:'Cancelo',   pos:'RB'},
  {id:3, num:23, name:'Koundé',    pos:'CB'},
  {id:4, num:4,  name:'Araújo',    pos:'CB'},
  {id:5, num:3,  name:'Balde',     pos:'LB'},
  {id:6, num:8,  name:'Pedri',     pos:'CM'},
  {id:7, num:5,  name:'Casadó',    pos:'CM'},
  {id:8, num:6,  name:'Gavi',      pos:'CM'},
  {id:9, num:11, name:'Raphinha',  pos:'RW'},
  {id:10,num:9,  name:'Lewandowski',pos:'ST'},
  {id:11,num:19, name:'Yamal',     pos:'LW'},
]

const BENCH = [
  {id:12,num:13,name:'Ter Stegen',pos:'GK'},
  {id:13,num:2, name:'Bellerín',  pos:'RB'},
  {id:14,num:15,name:'Christensen',pos:'CB'},
  {id:15,num:16,name:'Fermín',    pos:'CM'},
  {id:16,num:21,name:'de Jong',   pos:'CM'},
  {id:17,num:17,name:'Dani Olmo', pos:'AM'},
  {id:18,num:7, name:'Ferran',    pos:'LW'},
]

type Player = typeof SQUAD[0]

export default function CompositionWidget({ matchTitle = 'FC Barcelone' }: { matchTitle?: string }) {
  const [formation, setFormation] = useState('4-3-3')
  const [lineup, setLineup] = useState<Player[]>(SQUAD)
  const [editMode, setEditMode] = useState(false)
  const [dragging, setDragging] = useState<number | null>(null)
  const [hovering, setHovering] = useState<number | null>(null)
  const [votes, setVotes] = useState<Record<number,number>>({})
  const [voted, setVoted] = useState(false)

  const positions = FORMATIONS[formation].flat()

  const handleSwap = (idxA: number, idxB: number) => {
    const next = [...lineup]
    ;[next[idxA], next[idxB]] = [next[idxB], next[idxA]]
    setLineup(next)
  }

  const handleVote = (idx: number) => {
    if (voted) return
    setVotes(v => ({...v, [idx]: (v[idx]||0)+1}))
    setVoted(true)
  }

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,var(--barca-blue),#003070)',padding:'16px 20px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'rgba(255,255,255,0.5)',letterSpacing:'0.1em',marginBottom:'4px'}}>COMPOSITION PROBABLE</div>
          <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',fontWeight:700,color:'white'}}>{matchTitle}</div>
        </div>
        <div style={{display:'flex',gap:'8px',alignItems:'center',flexWrap:'wrap'}}>
          {/* Sélecteur formation */}
          <select
            value={formation}
            onChange={e=>setFormation(e.target.value)}
            style={{background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',color:'white',padding:'6px 10px',borderRadius:'4px',fontSize:'13px',fontFamily:'DM Mono,monospace',cursor:'pointer'}}
          >
            {Object.keys(FORMATIONS).map(f=><option key={f} value={f} style={{background:'#0a0f1e'}}>{f}</option>)}
          </select>
          <button
            onClick={()=>setEditMode(!editMode)}
            style={{background:editMode?'var(--barca-red)':'rgba(255,255,255,0.15)',border:'none',color:'white',padding:'6px 14px',borderRadius:'4px',fontSize:'12px',fontWeight:600,cursor:'pointer',fontFamily:'DM Mono,monospace',letterSpacing:'0.05em',transition:'background 0.2s'}}
          >
            {editMode ? '✓ TERMINER' : '✏️ MODIFIER'}
          </button>
        </div>
      </div>

      {editMode && (
        <div style={{background:'rgba(0,77,152,0.15)',padding:'10px 20px',borderBottom:'1px solid var(--barca-border)',fontSize:'12px',color:'rgba(255,255,255,0.6)',fontFamily:'DM Mono,monospace'}}>
          🔄 Glisse-dépose les joueurs pour changer leur position · Vote pour ta compo idéale
        </div>
      )}

      {/* Terrain */}
      <div style={{padding:'16px',background:'#0a0f1e'}}>
        <svg viewBox="0 0 100 100" style={{width:'100%',maxWidth:'480px',display:'block',margin:'0 auto'}} xmlns="http://www.w3.org/2000/svg">

          {/* Fond terrain */}
          <defs>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a4a2e"/>
              <stop offset="50%" stopColor="#1e5434"/>
              <stop offset="100%" stopColor="#1a4a2e"/>
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grass)" rx="2"/>

          {/* Lignes terrain */}
          <rect x="5" y="4" width="90" height="92" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4"/>
          <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4"/>
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.4)"/>

          {/* Surface réparation haute */}
          <rect x="27" y="4" width="46" height="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4"/>
          <rect x="38" y="4" width="24" height="7" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3"/>

          {/* Surface réparation basse */}
          <rect x="27" y="80" width="46" height="16" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4"/>
          <rect x="38" y="89" width="24" height="7" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3"/>

          {/* Points de penalty */}
          <circle cx="50" cy="15" r="0.6" fill="rgba(255,255,255,0.3)"/>
          <circle cx="50" cy="85" r="0.6" fill="rgba(255,255,255,0.3)"/>

          {/* Joueurs */}
          {lineup.slice(0, positions.length).map((player, idx) => {
            const [px, py] = positions[idx]
            const isDragging = dragging === idx
            const isHovering = hovering === idx && editMode && dragging !== null && dragging !== idx

            return (
              <g
                key={player.id}
                style={{cursor: editMode ? 'grab' : 'default'}}
                draggable={editMode}
                onDragStart={()=>setDragging(idx)}
                onDragEnd={()=>{setDragging(null);setHovering(null)}}
                onDragOver={e=>{e.preventDefault();setHovering(idx)}}
                onDrop={()=>{if(dragging!==null&&dragging!==idx){handleSwap(dragging,idx);setDragging(null);setHovering(null)}}}
              >
                {/* Ombre */}
                <ellipse cx={px} cy={py+4.5} rx="3.5" ry="1" fill="rgba(0,0,0,0.3)"/>

                {/* Cercle joueur */}
                <circle
                  cx={px} cy={py}
                  r={isDragging?4.2:isHovering?4:3.8}
                  fill={isDragging?'var(--barca-gold)':isHovering?'rgba(0,77,152,0.9)':'var(--barca-blue)'}
                  stroke={isHovering?'white':'rgba(255,255,255,0.6)'}
                  strokeWidth="0.5"
                  style={{transition:'all 0.15s'}}
                />

                {/* Numéro */}
                <text x={px} y={py+0.8} textAnchor="middle" fontSize="2.8" fill="white" fontWeight="700" fontFamily="DM Mono,monospace">
                  {player.num}
                </text>

                {/* Nom */}
                <text x={px} y={py+7.5} textAnchor="middle" fontSize="2.2" fill="rgba(255,255,255,0.9)" fontFamily="DM Sans,sans-serif" fontWeight="600">
                  {player.name.split(' ').pop()}
                </text>

                {/* Vote */}
                {editMode && !voted && (
                  <g onClick={()=>handleVote(idx)} style={{cursor:'pointer'}}>
                    <rect x={px-5} y={py+9} width="10" height="4" rx="1" fill="rgba(237,187,0,0.2)" stroke="var(--barca-gold)" strokeWidth="0.3"/>
                    <text x={px} y={py+11.8} textAnchor="middle" fontSize="2" fill="var(--barca-gold)" fontFamily="DM Mono,monospace">VOTER</text>
                  </g>
                )}
                {votes[idx] && (
                  <g>
                    <rect x={px-4} y={py+9} width="8" height="4" rx="1" fill="rgba(237,187,0,0.3)"/>
                    <text x={px} y={py+11.8} textAnchor="middle" fontSize="2" fill="var(--barca-gold)" fontFamily="DM Mono,monospace">+{votes[idx]}</text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Label attaque/défense */}
          <text x="50" y="9.5" textAnchor="middle" fontSize="2" fill="rgba(255,255,255,0.2)" fontFamily="DM Mono,monospace" letterSpacing="0.15em">ATTAQUE</text>
          <text x="50" y="97.5" textAnchor="middle" fontSize="2" fill="rgba(255,255,255,0.2)" fontFamily="DM Mono,monospace" letterSpacing="0.15em">DÉFENSE</text>
        </svg>
      </div>

      {/* Banc de touche */}
      <div style={{padding:'16px 20px',borderTop:'1px solid var(--barca-border)'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'12px'}}>REMPLAÇANTS</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
          {BENCH.map(p=>(
            <div key={p.id} style={{display:'flex',alignItems:'center',gap:'6px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--barca-border)',borderRadius:'4px',padding:'5px 10px'}}>
              <div style={{width:'22px',height:'22px',background:'rgba(0,77,152,0.4)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.7)',fontWeight:600}}>
                {p.num}
              </div>
              <div>
                <div style={{fontSize:'12px',color:'rgba(255,255,255,0.8)',fontWeight:500}}>{p.name}</div>
                <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{p.pos}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
