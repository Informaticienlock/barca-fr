'use client'

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

const STATUS_COLOR: Record<string,{color:string,bg:string}> = {
  'Officiel': {color:'#4ade80', bg:'rgba(74,222,128,0.12)'},
  'Intérêt':  {color:'#60a5fa', bg:'rgba(96,165,250,0.12)'},
  'Rumeur':   {color:'#fbbf24', bg:'rgba(251,191,36,0.12)'},
}

export default function Sidebar() {
  return (
    <aside style={{display:'flex',flexDirection:'column',gap:'20px',position:'sticky',top:'80px'}}>

      {/* ── Classement ── */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>
        {/* Header */}
        <div style={{padding:'12px 16px',borderBottom:'1px solid var(--barca-border)',background:'rgba(0,77,152,0.15)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'7px'}}>
            <span style={{fontSize:'13px'}}>🏆</span>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:700,color:'white',letterSpacing:'0.1em'}}>CLASSEMENT LIGA</span>
          </div>
          <span style={{fontSize:'9px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',background:'rgba(255,255,255,0.05)',padding:'2px 6px',borderRadius:'3px'}}>2025-26</span>
        </div>

        {/* En-tête colonnes */}
        <div style={{display:'grid',gridTemplateColumns:'20px 1fr 28px 28px',gap:'8px',padding:'7px 14px',background:'rgba(255,255,255,0.02)',borderBottom:'1px solid var(--barca-border)'}}>
          {['#','CLUB','J','PTS'].map((h,i)=>(
            <span key={i} style={{fontSize:'9px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',letterSpacing:'0.06em',textAlign:i>=2?'center':'left'}}>{h}</span>
          ))}
        </div>

        {/* Lignes */}
        {standings.map(r => {
          const isBarça = r.pos === 1
          return (
            <div key={r.pos} style={{
              display:'grid',gridTemplateColumns:'20px 1fr 28px 28px',gap:'8px',
              padding:'9px 14px',alignItems:'center',
              borderBottom:'1px solid var(--barca-border)',
              background: isBarça ? 'rgba(0,77,152,0.08)' : 'transparent',
              borderLeft: isBarça ? '3px solid var(--barca-blue)' : '3px solid transparent',
            }}>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:700,color:isBarça?'var(--barca-gold)':'var(--text-muted)',textAlign:'center'}}>{r.pos}</span>
              <div>
                <div style={{fontSize:'12px',fontWeight:isBarça?700:400,color:isBarça?'white':'var(--text-secondary)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.team}</div>
                <div style={{fontSize:'9px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginTop:'1px'}}>{r.diff}</div>
              </div>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:'var(--text-muted)',textAlign:'center'}}>{r.j}</span>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:900,color:isBarça?'var(--barca-gold)':'var(--text-secondary)',textAlign:'center'}}>{r.pts}</span>
            </div>
          )
        })}
      </div>

      {/* ── Prochains matchs ── */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>
        <div style={{padding:'12px 16px',borderBottom:'1px solid var(--barca-border)',background:'rgba(165,0,68,0.15)',display:'flex',alignItems:'center',gap:'7px'}}>
          <span style={{fontSize:'13px'}}>📅</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:700,color:'white',letterSpacing:'0.1em'}}>PROCHAINS MATCHS</span>
        </div>

        {fixtures.map((m,i) => {
          const isUCL = m.comp.includes('UCL')
          return (
            <div key={i} style={{padding:'12px 14px',borderBottom:i<fixtures.length-1?'1px solid var(--barca-border)':'none'}}>
              {/* Date + compétition */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'8px'}}>
                <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>{m.date}</span>
                <span style={{
                  fontSize:'9px',fontFamily:'DM Mono,monospace',fontWeight:700,
                  color: isUCL ? '#EDBB00' : '#60a5fa',
                  background: isUCL ? 'rgba(237,187,0,0.1)' : 'rgba(96,165,250,0.1)',
                  border: `1px solid ${isUCL ? 'rgba(237,187,0,0.3)' : 'rgba(96,165,250,0.3)'}`,
                  padding:'2px 7px',borderRadius:'3px',
                }}>{m.comp}</span>
              </div>
              {/* Équipes + VS */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'8px'}}>
                <span style={{fontSize:'13px',fontWeight:700,color:'white',flex:1}}>{m.home}</span>
                <div style={{
                  padding:'4px 10px',borderRadius:'4px',
                  background:'rgba(255,255,255,0.05)',border:'1px solid var(--barca-border)',
                  fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',
                  flexShrink:0,
                }}>VS</div>
                <span style={{fontSize:'13px',color:'var(--text-secondary)',flex:1,textAlign:'right'}}>{m.away}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Mercato ── */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>
        <div style={{padding:'12px 16px',borderBottom:'1px solid var(--barca-border)',background:'rgba(237,187,0,0.08)',display:'flex',alignItems:'center',gap:'7px'}}>
          <span style={{fontSize:'13px'}}>🔄</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:700,color:'var(--barca-gold)',letterSpacing:'0.1em'}}>MERCATO</span>
        </div>

        {transfers.map((t,i) => {
          const isRecrue = t.type === 'Recrue'
          const sc = STATUS_COLOR[t.status] ?? {color:'var(--text-muted)',bg:'rgba(255,255,255,0.05)'}
          return (
            <div key={i} style={{
              display:'flex',alignItems:'center',justifyContent:'space-between',
              padding:'10px 14px',
              borderBottom:i<transfers.length-1?'1px solid var(--barca-border)':'none',
              gap:'8px',
            }}>
              {/* Indicateur recrue/départ */}
              <div style={{
                width:'4px',height:'36px',borderRadius:'2px',flexShrink:0,
                background: isRecrue ? '#4ade80' : '#f87171',
              }} />

              {/* Nom + statut */}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:'12px',fontWeight:600,color:'white',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{t.name}</div>
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'3px'}}>
                  <span style={{fontSize:'9px',fontFamily:'DM Mono,monospace',color: isRecrue ? '#4ade80' : '#f87171'}}>{t.type}</span>
                  <span style={{fontSize:'9px',color:'var(--text-muted)'}}>·</span>
                  <span style={{
                    fontSize:'9px',fontFamily:'DM Mono,monospace',fontWeight:700,
                    color:sc.color,background:sc.bg,
                    padding:'1px 5px',borderRadius:'2px',
                  }}>{t.status}</span>
                </div>
              </div>

              {/* Icône */}
              <span style={{fontSize:'16px',flexShrink:0}}>{isRecrue ? '⬆️' : '⬇️'}</span>
            </div>
          )
        })}
      </div>

    </aside>
  )
}
