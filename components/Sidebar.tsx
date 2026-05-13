const standings=[{pos:1,team:'FC Barcelone',pts:87},{pos:2,team:'Real Madrid',pts:79},{pos:3,team:'Atlético',pts:71},{pos:4,team:'Athletic Club',pts:63},{pos:5,team:'Real Sociedad',pts:58}]
const fixtures=[{date:'11 mai',home:'Barça',away:'R. Sociedad',comp:'Liga'},{date:'18 mai',home:'Barça',away:'Getafe',comp:'Liga'},{date:'31 mai',home:'Barça',away:'PSG',comp:'UCL Finale'}]
const transfers=[{name:'Dani Olmo',status:'Officiel',type:'Recrue'},{name:'Ronald Araújo',status:'Rumeur',type:'Départ'},{name:'Alphonso Davies',status:'Intérêt',type:'Recrue'}]

export default function Sidebar() {
  return (
    <aside style={{display:'flex',flexDirection:'column',gap:'24px',position:'sticky',top:'80px'}}>

      {/* Classement */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'var(--barca-blue)',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px'}}>
          <span>🏆</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>CLASSEMENT LIGA</span>
        </div>
        <div style={{padding:'0 16px'}}>
          {standings.map(r=>(
            <div key={r.pos} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--barca-border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:r.pos===1?'var(--barca-gold)':'rgba(255,255,255,0.3)',width:'14px',textAlign:'center'}}>{r.pos}</span>
                <span style={{fontSize:'13px',color:r.pos===1?'white':'rgba(255,255,255,0.65)',fontWeight:r.pos===1?700:400}}>{r.team}</span>
              </div>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,color:r.pos===1?'var(--barca-gold)':'rgba(255,255,255,0.45)'}}>{r.pts} pts</span>
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
          <div key={i} style={{padding:'12px 16px',borderBottom:i<fixtures.length-1?'1px solid var(--barca-border)':'none'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.35)',marginBottom:'8px',letterSpacing:'0.06em'}}>{m.date} · {m.comp}</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'13px',color:'white',fontWeight:700}}>{m.home}</span>
              <span style={{fontSize:'10px',background:'rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.4)',padding:'3px 10px',borderRadius:'2px',fontFamily:'DM Mono,monospace',letterSpacing:'0.05em'}}>VS</span>
              <span style={{fontSize:'13px',color:'rgba(255,255,255,0.5)'}}>{m.away}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mercato */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'rgba(237,187,0,0.12)',borderBottom:'1px solid rgba(237,187,0,0.15)',padding:'12px 16px',display:'flex',alignItems:'center',gap:'8px'}}>
          <span>🔄</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'var(--barca-gold)',letterSpacing:'0.08em'}}>MERCATO</span>
        </div>
        {transfers.map((t,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',borderBottom:i<transfers.length-1?'1px solid var(--barca-border)':'none'}}>
            <span style={{fontSize:'13px',color:'rgba(255,255,255,0.8)'}}>{t.name}</span>
            <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
              <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:t.type==='Recrue'?'#4ade80':'#f87171',background:t.type==='Recrue'?'rgba(74,222,128,0.1)':'rgba(248,113,113,0.1)',padding:'2px 8px',borderRadius:'2px',fontWeight:600}}>{t.type}</span>
            </div>
          </div>
        ))}
      </div>

    </aside>
  )
}
