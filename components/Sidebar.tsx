import { unstable_noStore as noStore } from 'next/cache'

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || ''
const LIGA_ID = 140
const BARCA_ID = 529
const SEASON = 2024

async function getStandings() {
  try {
    const res = await fetch(
      `https://free-api-live-football-data.p.rapidapi.com/football-get-standing?leagueid=${LIGA_ID}&season=${SEASON}`,
      {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        next: { revalidate: 3600 }
      }
    )
    const data = await res.json()
    return data?.response?.[0]?.[0]?.league?.standings?.[0]?.slice(0, 5) || null
  } catch { return null }
}

async function getFixtures() {
  try {
    const res = await fetch(
      `https://free-api-live-football-data.p.rapidapi.com/football-get-all-fixtures-by-team-by-season?teamid=${BARCA_ID}&season=${SEASON}`,
      {
        headers: {
          'x-rapidapi-host': 'free-api-live-football-data.p.rapidapi.com',
          'x-rapidapi-key': RAPIDAPI_KEY,
        },
        next: { revalidate: 3600 }
      }
    )
    const data = await res.json()
    const now = Date.now()
    const upcoming = data?.response?.filter((f: any) => new Date(f.fixture.date).getTime() > now)
    return upcoming?.slice(0, 3) || null
  } catch { return null }
}

const fallbackStandings = [
  {pos:1,team:'FC Barcelone',pts:87},
  {pos:2,team:'Real Madrid',pts:79},
  {pos:3,team:'Atlético',pts:71},
  {pos:4,team:'Athletic Club',pts:63},
  {pos:5,team:'Real Sociedad',pts:58},
]

const fallbackFixtures = [
  {date:'11 mai',home:'Barça',away:'R. Sociedad',comp:'Liga'},
  {date:'18 mai',home:'Barça',away:'Getafe',comp:'Liga'},
  {date:'31 mai',home:'Barça',away:'PSG',comp:'UCL Finale'},
]

const transfers = [
  {name:'Dani Olmo',type:'Recrue'},
  {name:'Ronald Araújo',type:'Départ'},
  {name:'Alphonso Davies',type:'Recrue'},
]

export default async function Sidebar() {
  noStore()
  const [apiStandings, apiFixtures] = await Promise.all([getStandings(), getFixtures()])

  const standings = apiStandings
    ? apiStandings.map((t: any, i: number) => ({
        pos: i + 1,
        team: t.team?.name || '',
        pts: t.points,
      }))
    : fallbackStandings

  const fixtures = apiFixtures
    ? apiFixtures.map((f: any) => ({
        date: new Date(f.fixture.date).toLocaleDateString('fr-FR', {day:'numeric',month:'short'}),
        home: f.teams.home.name === 'Barcelona' ? 'Barça' : f.teams.home.name,
        away: f.teams.away.name === 'Barcelona' ? 'Barça' : f.teams.away.name,
        comp: f.league.name,
      }))
    : fallbackFixtures

  return (
    <aside style={{display:'flex',flexDirection:'column',gap:'24px',position:'sticky',top:'80px'}}>

      {/* Classement */}
      <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'6px',overflow:'hidden'}}>
        <div style={{background:'var(--barca-blue)',padding:'12px 16px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <span>🏆</span>
            <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>CLASSEMENT LIGA</span>
          </div>
          {apiStandings && <span style={{fontSize:'9px',color:'rgba(255,255,255,0.5)',fontFamily:'DM Mono,monospace'}}>LIVE</span>}
        </div>
        <div style={{padding:'0 16px'}}>
          {standings.map((r: any) => (
            <div key={r.pos} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--barca-border)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:r.pos===1?'var(--barca-gold)':'var(--text-muted)',width:'14px',textAlign:'center'}}>{r.pos}</span>
                <span style={{fontSize:'13px',color:r.pos===1?'white':'var(--text-secondary)',fontWeight:r.pos===1?700:400}}>{r.team}</span>
              </div>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'13px',fontWeight:700,color:r.pos===1?'var(--barca-gold)':'var(--text-muted)'}}>{r.pts} pts</span>
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
        {fixtures.map((m: any, i: number) => (
          <div key={i} style={{padding:'12px 16px',borderBottom:i<fixtures.length-1?'1px solid var(--barca-border)':'none'}}>
            <div style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',marginBottom:'8px'}}>{m.date} · {m.comp}</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span style={{fontSize:'13px',color:'white',fontWeight:700}}>{m.home}</span>
              <span style={{fontSize:'10px',background:'rgba(255,255,255,0.07)',color:'var(--text-muted)',padding:'3px 10px',borderRadius:'2px',fontFamily:'DM Mono,monospace'}}>VS</span>
              <span style={{fontSize:'13px',color:'var(--text-secondary)'}}>{m.away}</span>
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
        {transfers.map((t,i) => (
          <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 16px',borderBottom:i<transfers.length-1?'1px solid var(--barca-border)':'none'}}>
            <span style={{fontSize:'13px',color:'var(--text-secondary)'}}>{t.name}</span>
            <span style={{fontSize:'10px',fontFamily:'DM Mono,monospace',color:t.type==='Recrue'?'#4ade80':'#f87171',background:t.type==='Recrue'?'rgba(74,222,128,0.1)':'rgba(248,113,113,0.1)',padding:'2px 8px',borderRadius:'2px',fontWeight:600}}>{t.type}</span>
          </div>
        ))}
      </div>

    </aside>
  )
}
