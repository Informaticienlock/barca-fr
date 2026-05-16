import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CompositionWidget from '@/components/CompositionWidget'
import HeadToHead from '@/components/HeadToHead'
import Pronostics from '@/components/Pronostics'
import MatchDayBanner from '@/components/MatchDayBanner'
import Infirmerie from '@/components/Infirmerie'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avant-matchs FC Barcelone — Barça Infos',
  description: 'Compositions probables, enjeux et analyses des prochains matchs du FC Barcelone.',
}

export default function AvantMatchsPage() {
  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
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
        <MatchDayBanner />

        {/* Composition + Infos — responsive */}
        <style>{`
          .avant-match-grid {
            display: grid;
            grid-template-columns: 1fr 340px;
            gap: 32px;
            align-items: start;
            margin-bottom: 40px;
          }
          @media (max-width: 900px) {
            .avant-match-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="avant-match-grid">
          <CompositionWidget matchTitle="FC Barcelone — Composition probable" />
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
        </div>

        <div style={{marginBottom:'40px'}}>
          <div style={{marginBottom:'20px'}}><h2 className="section-title">Infirmerie & Suspensions</h2></div>
          <Infirmerie />
        </div>

        <div style={{marginBottom:'40px'}}>
          <div style={{marginBottom:'20px'}}><h2 className="section-title">Face-à-Face</h2></div>
          <HeadToHead />
        </div>

        <div>
          <div style={{marginBottom:'20px'}}><h2 className="section-title">Pronostics</h2></div>
          <div style={{maxWidth:'680px'}}>
            <Pronostics />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
