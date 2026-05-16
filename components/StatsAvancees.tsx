'use client'
import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts'

/* ── Données xG ── */
const XG_DATA = [
  {minute:'0',  barca:0,   real:0},
  {minute:'8',  barca:0.12,real:0.08},
  {minute:'15', barca:0.28,real:0.12},
  {minute:'23', barca:0.31,real:0.34},
  {minute:'31', barca:0.45,real:0.38},
  {minute:'38', barca:0.72,real:0.41},  // But Raphinha
  {minute:'45', barca:0.80,real:0.55},
  {minute:'52', barca:0.85,real:0.72},  // But Real
  {minute:'58', barca:1.10,real:0.76},  // But Pedri
  {minute:'65', barca:1.22,real:0.82},
  {minute:'72', barca:1.45,real:0.88},
  {minute:'78', barca:1.68,real:0.91},
  {minute:'84', barca:2.10,real:0.95},  // But Yamal
  {minute:'90', barca:2.24,real:1.02},
]

/* ── Réseau de passes ── */
type PassNode = {id:number, num:number, name:string, x:number, y:number, passes:number}
type PassLink = {from:number, to:number, count:number}

const PASS_NODES: PassNode[] = [
  {id:1,  num:1,  name:'Peña',      x:50,  y:88, passes:28},
  {id:2,  num:22, name:'Cancelo',   x:82,  y:70, passes:54},
  {id:3,  num:23, name:'Koundé',    x:65,  y:75, passes:61},
  {id:4,  num:15, name:'Christen.', x:35,  y:75, passes:58},
  {id:5,  num:3,  name:'Balde',     x:18,  y:70, passes:49},
  {id:6,  num:8,  name:'Pedri',     x:62,  y:52, passes:87},
  {id:7,  num:5,  name:'Casadó',    x:50,  y:56, passes:72},
  {id:8,  num:6,  name:'Gavi',      x:38,  y:52, passes:81},
  {id:9,  num:11, name:'Raphinha',  x:80,  y:32, passes:43},
  {id:10, num:9,  name:'Lewand.',   x:50,  y:24, passes:38},
  {id:11, num:19, name:'Yamal',     x:20,  y:32, passes:46},
]

const PASS_LINKS: PassLink[] = [
  {from:1,  to:3,  count:18}, {from:1,  to:4,  count:16},
  {from:2,  to:3,  count:22}, {from:2,  to:6,  count:19},
  {from:3,  to:6,  count:28}, {from:3,  to:7,  count:24},
  {from:4,  to:7,  count:26}, {from:4,  to:8,  count:23},
  {from:5,  to:4,  count:20}, {from:5,  to:8,  count:18},
  {from:6,  to:7,  count:34}, {from:6,  to:9,  count:22},
  {from:6,  to:10, count:18}, {from:7,  to:8,  count:31},
  {from:7,  to:10, count:16}, {from:8,  to:5,  count:17},
  {from:8,  to:11, count:24}, {from:9,  to:10, count:14},
  {from:10, to:11, count:12}, {from:11, to:8,  count:20},
]

/* ── Stats comparées ── */
const TEAM_STATS = [
  {label:'Possession',    barca:64, real:36,  unit:'%'},
  {label:'Tirs',          barca:18, real:9,   unit:''},
  {label:'Tirs cadrés',   barca:8,  real:3,   unit:''},
  {label:'Corners',       barca:7,  real:3,   unit:''},
  {label:'Duels gagnés',  barca:54, real:46,  unit:'%'},
  {label:'xG total',      barca:2.24,real:1.02,unit:''},
]

/* ── Tooltip personnalisé ── */
function CustomTooltip({active,payload,label}:any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{background:'rgba(10,15,30,0.95)',border:'1px solid var(--barca-border)',borderRadius:'6px',padding:'10px 14px',fontSize:'12px'}}>
      <div style={{fontFamily:'DM Mono,monospace',color:'var(--text-muted)',marginBottom:'6px'}}>
        {label}&apos;
      </div>
      {payload.map((p:any) => (
        <div key={p.name} style={{display:'flex',alignItems:'center',gap:'6px',marginBottom:'3px'}}>
          <div style={{width:'8px',height:'8px',borderRadius:'50%',background:p.color}}/>
          <span style={{color:'white',fontWeight:600}}>{p.name} : </span>
          <span style={{color:p.color,fontFamily:'DM Mono,monospace',fontWeight:700}}>{p.value?.toFixed(2)} xG</span>
        </div>
      ))}
    </div>
  )
}

/* ── Pass Map SVG ── */
function PassMap() {
  const [hovered, setHovered] = useState<number|null>(null)
  const maxCount = Math.max(...PASS_LINKS.map(l=>l.count))

  const visibleLinks = hovered !== null
    ? PASS_LINKS.filter(l=>l.from===hovered||l.to===hovered)
    : PASS_LINKS

  return (
    <div>
      <div style={{fontSize:'12px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginBottom:'12px'}}>
        Survole un joueur pour voir ses connexions · Épaisseur = nombre de passes échangées
      </div>
      <svg viewBox="0 0 100 100" style={{width:'100%',maxWidth:'520px',display:'block',margin:'0 auto',background:'#0d1f0d',borderRadius:'8px',border:'1px solid rgba(255,255,255,0.1)'}} xmlns="http://www.w3.org/2000/svg">

        {/* Terrain */}
        <rect width="100" height="100" fill="#0d1f0d"/>
        <rect x="5" y="4" width="90" height="92" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4"/>
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
        <circle cx="50" cy="50" r="10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
        <rect x="27" y="4"  width="46" height="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>
        <rect x="27" y="80" width="46" height="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3"/>

        {/* Lignes de passes */}
        {visibleLinks.map((link,i) => {
          const from = PASS_NODES.find(n=>n.id===link.from)!
          const to   = PASS_NODES.find(n=>n.id===link.to)!
          const opacity = hovered !== null ? 0.9 : 0.3 + (link.count/maxCount)*0.5
          const width   = 0.3 + (link.count/maxCount)*2.2
          return (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x}   y2={to.y}
              stroke="#004D98"
              strokeWidth={width}
              opacity={opacity}
              strokeLinecap="round"
            />
          )
        })}

        {/* Noeuds joueurs */}
        {PASS_NODES.map(node => {
          const isHovered  = hovered === node.id
          const isConnected = hovered !== null && PASS_LINKS.some(l=>(l.from===hovered&&l.to===node.id)||(l.to===hovered&&l.from===node.id))
          const dim = hovered !== null && !isHovered && !isConnected
          const r = 3.2 + (node.passes/87)*1.8

          return (
            <g key={node.id} onMouseEnter={()=>setHovered(node.id)} onMouseLeave={()=>setHovered(null)} style={{cursor:'pointer'}}>
              <circle cx={node.x} cy={node.y} r={r+1.5} fill="rgba(0,77,152,0.2)" opacity={dim?0.2:1}/>
              <circle
                cx={node.x} cy={node.y} r={r}
                fill={isHovered?'var(--barca-gold)':isConnected?'#60a5fa':'var(--barca-blue)'}
                stroke={isHovered?'white':'rgba(255,255,255,0.5)'}
                strokeWidth={isHovered?'0.8':'0.4'}
                opacity={dim?0.25:1}
              />
              <text x={node.x} y={node.y+0.7} textAnchor="middle" fontSize="2.2" fill="white" fontWeight="700" fontFamily="DM Mono,monospace" opacity={dim?0.25:1}>
                {node.num}
              </text>
              <text x={node.x} y={node.y+6.5} textAnchor="middle" fontSize="2" fill="rgba(255,255,255,0.85)" fontFamily="DM Sans,sans-serif" opacity={dim?0.25:1}>
                {node.name}
              </text>
              {isHovered && (
                <text x={node.x} y={node.y-5} textAnchor="middle" fontSize="2" fill="var(--barca-gold)" fontFamily="DM Mono,monospace" fontWeight="700">
                  {node.passes} passes
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ── Composant principal ── */
export default function StatsAvancees() {
  const [tab, setTab] = useState<'xg'|'passes'|'equipe'>('xg')

  return (
    <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>

      {/* Header */}
      <div style={{background:'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(237,187,0,0.1))',padding:'18px 22px',borderBottom:'1px solid var(--barca-border)'}}>
        <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'4px'}}>STATISTIQUES AVANCÉES · DATA VIZ</div>
        <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',fontWeight:700,color:'white'}}>
          FC Barcelone <span style={{color:'var(--barca-gold)'}}>3-1</span> Real Madrid
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:'flex',borderBottom:'1px solid var(--barca-border)'}}>
        {([['xg','📈 xG TIMELINE'],['passes','🔵 RÉSEAU PASSES'],['equipe','📊 STATS ÉQUIPE']] as const).map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1,padding:'11px 4px',border:'none',cursor:'pointer',
            background:tab===key?'rgba(0,77,152,0.1)':'transparent',
            color:tab===key?'white':'var(--text-muted)',
            fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:600,letterSpacing:'0.06em',
            borderBottom:tab===key?'2px solid var(--barca-blue)':'2px solid transparent',
            transition:'all 0.2s',
          }}>{label}</button>
        ))}
      </div>

      <div style={{padding:'24px'}}>

        {/* xG Timeline */}
        {tab==='xg' && (
          <div>
            <div style={{display:'flex',gap:'16px',marginBottom:'16px',flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'12px',height:'3px',borderRadius:'2px',background:'#004D98'}}/>
                <span style={{fontSize:'12px',color:'var(--text-secondary)',fontFamily:'DM Mono,monospace'}}>FC Barcelone (2.24 xG)</span>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                <div style={{width:'12px',height:'3px',borderRadius:'2px',background:'#A50044'}}/>
                <span style={{fontSize:'12px',color:'var(--text-secondary)',fontFamily:'DM Mono,monospace'}}>Real Madrid (1.02 xG)</span>
              </div>
            </div>

            {/* Buts marqués */}
            <div style={{display:'flex',gap:'8px',marginBottom:'16px',flexWrap:'wrap'}}>
              {[{min:'38\'',desc:'But Raphinha',color:'#004D98'},{min:'52\'',desc:'But Real',color:'#A50044'},{min:'58\'',desc:'But Pedri',color:'#004D98'},{min:'84\'',desc:'But Yamal',color:'#004D98'}].map((g,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'4px',background:'rgba(255,255,255,0.04)',border:'1px solid var(--barca-border)',borderRadius:'4px',padding:'3px 8px'}}>
                  <div style={{width:'6px',height:'6px',borderRadius:'50%',background:g.color,flexShrink:0}}/>
                  <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>{g.min}</span>
                  <span style={{fontSize:'10px',color:'rgba(255,255,255,0.6)'}}>{g.desc}</span>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={XG_DATA} margin={{top:10,right:10,left:-20,bottom:0}}>
                <defs>
                  <linearGradient id="gradBarca" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#004D98" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#004D98" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradReal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#A50044" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A50044" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                <XAxis dataKey="minute" tick={{fontSize:10,fill:'rgba(255,255,255,0.4)',fontFamily:'DM Mono,monospace'}} tickFormatter={(v)=>`${v}'`} stroke="rgba(255,255,255,0.1)"/>
                <YAxis tick={{fontSize:10,fill:'rgba(255,255,255,0.4)',fontFamily:'DM Mono,monospace'}} stroke="rgba(255,255,255,0.1)"/>
                <Tooltip content={<CustomTooltip/>}/>
                <Area type="monotone" dataKey="barca" name="Barça" stroke="#004D98" strokeWidth={2.5} fill="url(#gradBarca)" dot={false} activeDot={{r:4,fill:'#004D98'}}/>
                <Area type="monotone" dataKey="real"  name="Real"  stroke="#A50044" strokeWidth={2}   fill="url(#gradReal)"  dot={false} activeDot={{r:4,fill:'#A50044'}}/>
              </AreaChart>
            </ResponsiveContainer>

            <div style={{marginTop:'12px',padding:'10px 14px',background:'rgba(0,77,152,0.08)',border:'1px solid rgba(0,77,152,0.2)',borderRadius:'4px',fontSize:'12px',color:'var(--text-secondary)'}}>
              💡 <strong style={{color:'white'}}>Analyse :</strong> Le Barça a dominé la production offensive tout au long du match. Le Real a connu un pic de danger entre la 20e et 52e minute, avant que Pedri ne brise la résistance madrilène.
            </div>
          </div>
        )}

        {/* Pass Map */}
        {tab==='passes' && (
          <div>
            <PassMap />
            <div style={{marginTop:'16px',padding:'10px 14px',background:'rgba(0,77,152,0.08)',border:'1px solid rgba(0,77,152,0.2)',borderRadius:'4px',fontSize:'12px',color:'var(--text-secondary)'}}>
              💡 <strong style={{color:'white'}}>Analyse :</strong> Le triangle Pedri-Casadó-Gavi concentre le cœur du jeu barcelonais. Pedri (87 passes) et Gavi (81) dominent le réseau avec une densité exceptionnelle au milieu de terrain.
            </div>
          </div>
        )}

        {/* Stats équipe */}
        {tab==='equipe' && (
          <div>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'20px'}}>
              <span style={{fontSize:'13px',fontFamily:'DM Mono,monospace',color:'#004D98',fontWeight:700}}>FC BARCELONE</span>
              <span style={{fontSize:'13px',fontFamily:'DM Mono,monospace',color:'#A50044',fontWeight:700}}>REAL MADRID</span>
            </div>
            {TEAM_STATS.map((stat,i)=>{
              const total = stat.barca + stat.real || 1
              const pctB  = (stat.barca/total)*100
              return (
                <div key={i} style={{marginBottom:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
                    <span style={{fontSize:'14px',fontWeight:700,fontFamily:'DM Mono,monospace',color:stat.barca>=stat.real?'#4ade80':'rgba(255,255,255,0.5)'}}>{stat.barca}{stat.unit}</span>
                    <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>{stat.label}</span>
                    <span style={{fontSize:'14px',fontWeight:700,fontFamily:'DM Mono,monospace',color:stat.real>stat.barca?'#4ade80':'rgba(255,255,255,0.5)'}}>{stat.real}{stat.unit}</span>
                  </div>
                  <div style={{height:'8px',borderRadius:'4px',background:'rgba(255,255,255,0.06)',overflow:'hidden',display:'flex'}}>
                    <div style={{width:`${pctB}%`,height:'100%',background:'linear-gradient(to right,#003070,#004D98)',borderRadius:'4px 0 0 4px',transition:'width 0.8s ease'}}/>
                    <div style={{width:`${100-pctB}%`,height:'100%',background:'linear-gradient(to left,#6b0028,#A50044)',borderRadius:'0 4px 4px 0',transition:'width 0.8s ease'}}/>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
