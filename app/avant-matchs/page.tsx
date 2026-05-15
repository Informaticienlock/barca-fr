import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompositionWidget from '@/components/CompositionWidget'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avant-matchs FC Barcelone — Barça Infos',
  description: 'Compositions probables, enjeux et analyses des prochains matchs du FC Barcelone.',
}

const prochainMatch = {
  home: 'FC Barcelone',
  away: 'PSG',
  comp: 'UCL Finale',
  date: '31 mai 2026',
  heure: '21h00',
  lieu: 'Allianz Arena, Munich',
}

export default function AvantMatchsPage() {
  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#0a0f1e,#0f0a1a)',borderBottom:'1px solid var(--barca-border)',padding:'48px 24px 40px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <div style={{width:'4px',height:'32px',background:'linear-gradient(to bottom,var(--barca-red),var(--barca-blue))',borderRadius:'2px'}}/>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'white'}}>Avant-matchs</h1>
          </div>
          <p style={{fontSize:'15px',color:'var(--text-secondary)',marginLeft:'16px'}}>Compositions, enjeux et analyses des prochains matchs</p>
        </div>
      </div>

      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px 80px'}}>

        {/* Prochain match banner */}
        <div style={{background:'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(165,0,68,0.2))',border:'1px solid var(--barca-border)',borderRadius:'8px',padding:'24px 28px',marginBottom:'40px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'20px'}}>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',marginBottom:'8px'}}>{prochainMatch.comp} · {prochainMatch.date}</div>
            <div style={{display:'flex',alignItems:'center',gap:'20px'}}>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:900,color:'white'}}>{prochainMatch.home}</span>
              <span style={{fontFamily:'DM Mono,monospace',fontSize:'1rem',color:'var(--text-muted)',background:'rgba(255,255,255,0.07)',padding:'6px 16px',borderRadius:'4px'}}>VS</span>
              <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.4rem',fontWeight:900,color:'var(--text-secondary)'}}>{prochainMatch.away}</span>
            </div>
            <div style={{marginTop:'8px',fontSize:'13px',color:'var(--text-muted)'}}>
              📍 {prochainMatch.lieu} · ⏰ {prochainMatch.heure}
            </div>
          </div>
          <div style={{background:'var(--barca-red)',color:'white',padding:'10px 20px',borderRadius:'4px',fontFamily:'DM Mono,monospace',fontSize:'12px',fontWeight:600,letterSpacing:'0.08em'}}>
            FINALE
          </div>
        </div>

        {/* Layout : composition + sidebar infos */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:'32px',alignItems:'start'}}>

          {/* Widget composition */}
          <CompositionWidget matchTitle="FC Barcelone — Composition probable" />

          {/* Infos match */}
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

            {/* Infos clés */}
            <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>
              <div style={{background:'var(--barca-blue)',padding:'12px 16px'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>📋 INFOS MATCH</span>
              </div>
              <div style={{padding:'16px'}}>
                {[
                  {label:'Compétition',value:'UCL Finale'},
                  {label:'Date',value:'31 mai 2026'},
                  {label:'Heure',value:'21h00 CET'},
                  {label:'Stade',value:'Allianz Arena'},
                  {label:'Ville',value:'Munich, Allemagne'},
                  {label:'Arbitre',value:'Szymon Marciniak'},
                ].map(item=>(
                  <div key={item.label} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--barca-border)',fontSize:'13px'}}>
                    <span style={{color:'var(--text-muted)',fontFamily:'DM Mono,monospace',fontSize:'11px'}}>{item.label}</span>
                    <span style={{color:'white',fontWeight:500}}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Forme récente */}
            <div style={{background:'var(--barca-card)',border:'1px solid var(--barca-border)',borderRadius:'8px',overflow:'hidden'}}>
              <div style={{background:'var(--barca-red)',padding:'12px 16px'}}>
                <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,color:'white',letterSpacing:'0.08em'}}>📈 FORME RÉCENTE</span>
              </div>
              <div style={{padding:'16px'}}>
                {[
                  {team:'Barça',results:['V','V','V','N','V']},
                  {team:'PSG',results:['V','V','D','V','V']},
                ].map(row=>(
                  <div key={row.team} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid var(--barca-border)'}}>
                    <span style={{fontSize:'13px',color:'white',fontWeight:600,width:'60px'}}>{row.team}</span>
                    <div style={{display:'flex',gap:'4px'}}>
                      {row.results.map((r,i)=>(
                        <span key={i} style={{
                          width:'24px',height:'24px',borderRadius:'4px',
                          display:'flex',alignItems:'center',justifyContent:'center',
                          fontSize:'11px',fontWeight:700,fontFamily:'DM Mono,monospace',
                          background:r==='V'?'rgba(74,222,128,0.2)':r==='D'?'rgba(248,113,113,0.2)':'rgba(255,255,255,0.1)',
                          color:r==='V'?'#4ade80':r==='D'?'#f87171':'rgba(255,255,255,0.5)',
                        }}>{r}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </main>
  )
}
