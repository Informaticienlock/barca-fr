'use client'
import { useState } from 'react'

type TeamData = {
  name: string
  shortName: string
  color: string
  logo: string
  rank: number
  points: number
  form: ('V' | 'N' | 'D')[]
  stats: {
    possession: number
    butsMarques: number
    butsEncaisses: number
    tirsParMatch: number
    passesReussies: number
  }
  historique: {
    date: string
    domicile: string
    exterieur: string
    score: string
    comp: string
  }[]
}

const BARCA: TeamData = {
  name: 'FC Barcelone',
  shortName: 'FCB',
  color: '#004D98',
  logo: '🔵🔴',
  rank: 1,
  points: 85,
  form: ['V', 'V', 'V', 'N', 'V'],
  stats: {
    possession: 63,
    butsMarques: 2.8,
    butsEncaisses: 0.7,
    tirsParMatch: 18,
    passesReussies: 88,
  },
  historique: [
    {date:'27 avr', domicile:'Barça', exterieur:'Valencia', score:'3-1', comp:'Liga'},
    {date:'20 avr', domicile:'Real Madrid', exterieur:'Barça', score:'1-3', comp:'Liga'},
    {date:'13 avr', domicile:'Barça', exterieur:'Inter', score:'4-2', comp:'UCL'},
    {date:'6 avr',  domicile:'Getafe', exterieur:'Barça', score:'0-2', comp:'Liga'},
    {date:'30 mar', domicile:'Barça', exterieur:'Atlético', score:'2-2', comp:'Liga'},
  ],
}

const PSG: TeamData = {
  name: 'Paris Saint-Germain',
  shortName: 'PSG',
  color: '#003F8C',
  logo: '🔵🔴',
  rank: 1,
  points: 82,
  form: ['V', 'V', 'D', 'V', 'V'],
  stats: {
    possession: 58,
    butsMarques: 2.4,
    butsEncaisses: 0.9,
    tirsParMatch: 16,
    passesReussies: 85,
  },
  historique: [
    {date:'28 avr', domicile:'PSG', exterieur:'Lyon', score:'4-0', comp:'L1'},
    {date:'22 avr', domicile:'Arsenal', exterieur:'PSG', score:'1-2', comp:'UCL'},
    {date:'15 avr', domicile:'PSG', exterieur:'Monaco', score:'0-2', comp:'L1'},
    {date:'8 avr',  domicile:'Dortmund', exterieur:'PSG', score:'0-3', comp:'UCL'},
    {date:'2 avr',  domicile:'PSG', exterieur:'Marseille', score:'2-0', comp:'L1'},
  ],
}

const H2H_HISTORY = [
  {date:'Mar 2021', domicile:'Barça', exterieur:'PSG', score:'1-4', comp:'UCL', winner:'PSG'},
  {date:'Avr 2021', domicile:'PSG', exterieur:'Barça', score:'1-1', comp:'UCL', winner:'PSG'},
  {date:'Sep 2017', domicile:'PSG', exterieur:'Barça', score:'3-0', comp:'UCL', winner:'PSG'},
  {date:'Mar 2017', domicile:'Barça', exterieur:'PSG', score:'6-1', comp:'UCL', winner:'FCB'},
  {date:'Avr 2015', domicile:'Barça', exterieur:'PSG', score:'2-0', comp:'UCL', winner:'FCB'},
  {date:'Avr 2015', domicile:'PSG', exterieur:'Barça', score:'1-3', comp:'UCL', winner:'FCB'},
]

function FormBadge({ result }: { result: 'V'|'N'|'D' }) {
  const colors = {
    V: {bg:'rgba(74,222,128,0.15)', border:'rgba(74,222,128,0.4)', text:'#4ade80'},
    N: {bg:'rgba(255,255,255,0.08)', border:'rgba(255,255,255,0.2)', text:'rgba(255,255,255,0.5)'},
    D: {bg:'rgba(248,113,113,0.15)', border:'rgba(248,113,113,0.4)', text:'#f87171'},
  }
  const c = colors[result]
  return (
    <div style={{
      width:'30px', height:'30px', borderRadius:'6px',
      background:c.bg, border:`1px solid ${c.border}`,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontSize:'12px', fontWeight:700, color:c.text,
      fontFamily:'DM Mono,monospace',
    }}>{result}</div>
  )
}

function StatBar({ label, valA, valB, unit='', higherIsBetter=true }: {
  label: string, valA: number, valB: number, unit?: string, higherIsBetter?: boolean
}) {
  const total = valA + valB || 1
  const pctA = (valA / total) * 100
  const pctB = (valB / total) * 100
  const aWins = higherIsBetter ? valA >= valB : valA <= valB

  return (
    <div style={{marginBottom:'20px'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px',alignItems:'center'}}>
        <span style={{
          fontSize:'14px', fontWeight:700, fontFamily:'DM Mono,monospace',
          color: aWins ? '#4ade80' : 'rgba(255,255,255,0.5)',
        }}>{valA}{unit}</span>
        <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',letterSpacing:'0.06em',textTransform:'uppercase'}}>{label}</span>
        <span style={{
          fontSize:'14px', fontWeight:700, fontFamily:'DM Mono,monospace',
          color: !aWins ? '#4ade80' : 'rgba(255,255,255,0.5)',
        }}>{valB}{unit}</span>
      </div>
      <div style={{height:'8px',borderRadius:'4px',background:'rgba(255,255,255,0.06)',overflow:'hidden',display:'flex'}}>
        <div style={{
          width:`${pctA}%`, height:'100%',
          background: aWins
            ? 'linear-gradient(to right, var(--barca-blue), #0066cc)'
            : 'rgba(255,255,255,0.15)',
          borderRadius:'4px 0 0 4px',
          transition:'width 0.8s ease',
        }}/>
        <div style={{
          width:`${pctB}%`, height:'100%',
          background: !aWins
            ? 'linear-gradient(to left, #8B0000, var(--barca-red))'
            : 'rgba(255,255,255,0.15)',
          borderRadius:'0 4px 4px 0',
          transition:'width 0.8s ease',
        }}/>
      </div>
    </div>
  )
}

export default function HeadToHead() {
  const [tab, setTab] = useState<'stats'|'h2h'|'forme'>('stats')

  const h2hStats = {
    fcb: H2H_HISTORY.filter(m=>m.winner==='FCB').length,
    nul: H2H_HISTORY.filter(m=>m.winner==='NUL').length,
    psg: H2H_HISTORY.filter(m=>m.winner==='PSG').length,
  }

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#0a0f1e,#0f0a1a)',padding:'20px 24px',borderBottom:'1px solid var(--barca-border)'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'16px'}}>HEAD-TO-HEAD · FACE-À-FACE</div>

        {/* Teams */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px'}}>

          {/* Barça */}
          <div style={{textAlign:'center',flex:1}}>
            <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'linear-gradient(135deg,var(--barca-blue),#003070)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:'22px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',fontWeight:700,color:'white'}}>{BARCA.name}</div>
            <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginTop:'2px'}}>#{BARCA.rank} Liga · {BARCA.points} pts</div>
          </div>

          {/* Score H2H */}
          <div style={{textAlign:'center',flexShrink:0}}>
            <div style={{display:'flex',alignItems:'center',gap:'4px',justifyContent:'center',marginBottom:'6px'}}>
              <span style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:'var(--barca-blue)'}}>{h2hStats.fcb}</span>
              <span style={{fontSize:'1rem',color:'var(--text-muted)',padding:'0 6px'}}>-</span>
              <span style={{fontSize:'1.1rem',fontWeight:700,fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>{h2hStats.nul}</span>
              <span style={{fontSize:'1rem',color:'var(--text-muted)',padding:'0 6px'}}>-</span>
              <span style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:'#8B0000'}}>{h2hStats.psg}</span>
            </div>
            <div style={{fontSize:'9px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',letterSpacing:'0.1em'}}>FCB · NUL · PSG</div>
            <div style={{marginTop:'8px',padding:'4px 12px',background:'rgba(237,187,0,0.1)',border:'1px solid rgba(237,187,0,0.2)',borderRadius:'2px',fontSize:'10px',color:'var(--barca-gold)',fontFamily:'DM Mono,monospace'}}>
              6 CONFRONTATIONS
            </div>
          </div>

          {/* PSG */}
          <div style={{textAlign:'center',flex:1}}>
            <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'linear-gradient(135deg,#003F8C,#001f5c)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:'22px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',fontWeight:700,color:'white'}}>{PSG.name}</div>
            <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginTop:'2px'}}>#{PSG.rank} Ligue 1 · {PSG.points} pts</div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',borderBottom:'1px solid var(--barca-border)'}}>
        {([['stats','📊 STATS'],['forme','📈 FORME'],['h2h','🏆 HISTORIQUE']] as const).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1, padding:'12px', border:'none', cursor:'pointer',
            background: tab===key ? 'rgba(0,77,152,0.15)' : 'transparent',
            color: tab===key ? 'white' : 'var(--text-muted)',
            fontFamily:'DM Mono,monospace', fontSize:'10px', fontWeight:600,
            letterSpacing:'0.08em',
            borderBottom: tab===key ? '2px solid var(--barca-blue)' : '2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div style={{padding:'24px'}}>

        {/* Stats Tab */}
        {tab === 'stats' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px'}}>
              <span style={{fontSize:'12px',fontFamily:'DM Mono,monospace',color:'var(--barca-blue)',fontWeight:600}}>FCB</span>
              <span style={{fontSize:'12px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>SAISON 2024-25</span>
              <span style={{fontSize:'12px',fontFamily:'DM Mono,monospace',color:'#8B0000',fontWeight:600}}>PSG</span>
            </div>
            <StatBar label="Possession moy." valA={BARCA.stats.possession} valB={PSG.stats.possession} unit="%" />
            <StatBar label="Buts / match" valA={BARCA.stats.butsMarques} valB={PSG.stats.butsMarques} />
            <StatBar label="Encaissés / match" valA={BARCA.stats.butsEncaisses} valB={PSG.stats.butsEncaisses} higherIsBetter={false} />
            <StatBar label="Tirs / match" valA={BARCA.stats.tirsParMatch} valB={PSG.stats.tirsParMatch} />
            <StatBar label="Passes réussies %" valA={BARCA.stats.passesReussies} valB={PSG.stats.passesReussies} unit="%" />
          </div>
        )}

        {/* Forme Tab */}
        {tab === 'forme' && (
          <div>
            {[{team: BARCA, results: BARCA.form, history: BARCA.historique},
              {team: PSG,   results: PSG.form,   history: PSG.historique}].map(({team, results, history})=>(
              <div key={team.shortName} style={{marginBottom:'28px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'12px'}}>
                  <span style={{fontSize:'14px',fontWeight:700,color:'white'}}>{team.name}</span>
                  <div style={{display:'flex',gap:'6px'}}>
                    {results.map((r,i)=><FormBadge key={i} result={r}/>)}
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                  {history.map((m,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 12px',background:'rgba(255,255,255,0.03)',borderRadius:'4px',border:'1px solid var(--barca-border)'}}>
                      <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',width:'50px'}}>{m.date}</span>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',flex:1,justifyContent:'center'}}>
                        <span style={{fontSize:'13px',color:m.domicile.includes('Barça')||m.domicile.includes('PSG')?'white':'var(--text-muted)',fontWeight:m.domicile.includes('Barça')||m.domicile.includes('PSG')?600:400,textAlign:'right',minWidth:'80px'}}>{m.domicile}</span>
                        <span style={{fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,color:'white',background:'rgba(255,255,255,0.08)',padding:'2px 8px',borderRadius:'3px'}}>{m.score}</span>
                        <span style={{fontSize:'13px',color:m.exterieur.includes('Barça')||m.exterieur.includes('PSG')?'white':'var(--text-muted)',fontWeight:m.exterieur.includes('Barça')||m.exterieur.includes('PSG')?600:400,minWidth:'80px'}}>{m.exterieur}</span>
                      </div>
                      <span style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',width:'35px',textAlign:'right'}}>{m.comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* H2H Tab */}
        {tab === 'h2h' && (
          <div>
            <div style={{display:'flex',gap:'12px',marginBottom:'24px',justifyContent:'center'}}>
              {[{label:'Victoires Barça',val:h2hStats.fcb,color:'var(--barca-blue)'},
                {label:'Nuls',val:h2hStats.nul,color:'var(--text-muted)'},
                {label:'Victoires PSG',val:h2hStats.psg,color:'#8B0000'}].map(s=>(
                <div key={s.label} style={{textAlign:'center',flex:1,background:'rgba(255,255,255,0.03)',border:'1px solid var(--barca-border)',borderRadius:'6px',padding:'14px 8px'}}>
                  <div style={{fontSize:'1.8rem',fontWeight:900,fontFamily:'DM Mono,monospace',color:s.color}}>{s.val}</div>
                  <div style={{fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginTop:'4px'}}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
              {H2H_HISTORY.map((m,i)=>(
                <div key={i} style={{
                  display:'flex',alignItems:'center',justifyContent:'space-between',
                  padding:'10px 14px',borderRadius:'4px',
                  background: m.winner==='FCB'?'rgba(0,77,152,0.1)':m.winner==='PSG'?'rgba(139,0,0,0.1)':'rgba(255,255,255,0.03)',
                  border:`1px solid ${m.winner==='FCB'?'rgba(0,77,152,0.3)':m.winner==='PSG'?'rgba(139,0,0,0.3)':'var(--barca-border)'}`,
                }}>
                  <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',width:'60px'}}>{m.date}</span>
                  <div style={{display:'flex',alignItems:'center',gap:'10px',flex:1,justifyContent:'center'}}>
                    <span style={{fontSize:'13px',color:m.domicile==='Barça'?'white':'var(--text-secondary)',fontWeight:600,textAlign:'right',minWidth:'80px'}}>{m.domicile}</span>
                    <span style={{fontFamily:'DM Mono,monospace',fontSize:'14px',fontWeight:700,color:'white',background:'rgba(255,255,255,0.08)',padding:'3px 10px',borderRadius:'3px'}}>{m.score}</span>
                    <span style={{fontSize:'13px',color:m.exterieur==='Barça'?'white':'var(--text-secondary)',fontWeight:600,minWidth:'80px'}}>{m.exterieur}</span>
                  </div>
                  <span style={{
                    fontSize:'10px',fontFamily:'DM Mono,monospace',fontWeight:600,
                    color:m.winner==='FCB'?'var(--barca-blue)':m.winner==='PSG'?'#f87171':'var(--text-muted)',
                    width:'35px',textAlign:'right',
                  }}>{m.comp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
