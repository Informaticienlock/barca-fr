const standings = [
  {pos:1, team:'FC Barcelone', pts:85, j:36, diff:'+51'},
  {pos:2, team:'Real Madrid',  pts:78, j:36, diff:'+38'},
  {pos:3, team:'Atlético',     pts:68, j:36, diff:'+22'},
  {pos:4, team:'Athletic Club',pts:60, j:36, diff:'+18'},
  {pos:5, team:'Villarreal',   pts:55, j:36, diff:'+8'},
]

const fixtures = [
  {date:'11 mai', home:'Barça', away:'Español',  comp:'Liga'},
  {date:'25 mai', home:'Barça', away:'Valence',  comp:'Liga'},
  {date:'31 mai', home:'Barça', away:'PSG',      comp:'UCL Finale'},
]

const transfers = [
  {name:'Dani Olmo',       type:'Recrue',  status:'Officiel'},
  {name:'Ronald Araújo',   type:'Départ',  status:'Rumeur'},
  {name:'Alphonso Davies', type:'Recrue',  status:'Intérêt'},
  {name:'Marcus Rashford', type:'Recrue',  status:'Rumeur'},
]

export default function Sidebar() {
  return (
    <aside style={{display:'flex',flexDirection:'column',gap:'24px',position:'sticky',top:'80px'}}>

      {/* Classement */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'var(--barca-blue)',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <span>🏆</span>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>CLASSEMENT LIGA</span>
          </div>
          <span style={{fontSize:'9px',color:'rgba(255,255,255,0.5)',fontFamily:'DM Mono,monospace'}}>2024-25</span>
        </div>
        <div style={{padding:'0 16px'}}>
          {standings.map(r=>(
            <div key={r.pos} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--barca-border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:r.pos===1?'var(--barca-gold)':'var(--text-muted)',width:'14px',textAlign:'center',fontWeight:700}}>{r.pos}</span>
                <div>
                  <div style={{fontSize:'13px',color:r.pos===1?'white':'var(--text-secondary)',fontWeight:r.pos===1?700:400}}>{r.team}</div>
                  <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{r.j} matchs · {r.diff}</div>
                </div>
              </div>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'14px',fontWeight:700,color:r.pos===1?'var(--barca-gold)':'var(--text-muted)'}}>{r.pts}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prochains matchs */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'var(--barca-red)',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px'}}>
          <span>📅</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>PROCHAINS MATCHS</span>
        </div>
        {fixtures.map((m,i)=>(
          <div key={i} style={{padding:'13px 16px',borderBottom:i<fixtures.length-1?'1px solid var(--barca-border)':'none'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',marginBottom:'8px',letterSpacing:'0.05em'}}>{m.date} · {m.comp}</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'13px',color:'white',fontWeight:700}}>{m.home}</span>
              <span style={{fontSize:'10px',background:'rgba(255,255,255,0.06)',color:'var(--text-muted)',padding:'3px 10px',borderRadius:'2px',fontFamily:'DM Mono,monospace'}}>VS</span>
              <span style={{fontSize:'13px',color:'var(--text-secondary)'}}>{m.away}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mercato */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'rgba(237,187,0,0.1)',borderBottom:'1px solid rgba(237,187,0,0.15)',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px'}}>
          <span>🔄</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'var(--barca-gold)',letterSpacing:'0.08em'}}>MERCATO</span>
        </div>
        {transfers.map((t,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',borderBottom:i<transfers.length-1?'1px solid var(--barca-border)':'none'}}>
            <div>
              <div style={{fontSize:'13px',color:'var(--text-secondary)'}}>{t.name}</div>
              <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginTop:'2px'}}>{t.status}</div>
            </div>
            <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:t.type==='Recrue'?'#4ade80':'#f87171',background:t.type==='Recrue'?'rgba(74,222,128,0.1)':'rgba(248,113,113,0.1)',padding:'3px 9px',borderRadius:'2px',fontWeight:600}}>{t.type}</span>
          </div>
        ))}
      </div>

    </aside>
  )
}
