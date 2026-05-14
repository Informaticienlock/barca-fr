import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Avant-matchs FC Barcelone — Barça Infos',
  description: 'Compositions probables, enjeux et analyses des prochains matchs du FC Barcelone.',
}

const avantMatchs = [
  {id:1,img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',home:'FC Barcelone',away:'PSG',comp:'UCL Finale',date:'31 mai 2026',titre:'Barça - PSG : le guide complet de la finale de Champions League',extrait:'Tout ce qu\'il faut savoir avant la finale historique de Munich.',slug:'barca-psg-finale'},
  {id:2,img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',home:'FC Barcelone',away:'Español',comp:'Liga J37',date:'11 mai 2026',titre:'Barça - Español : compositions probables et enjeux du derby',extrait:'Flick devrait faire tourner avant la finale européenne.',slug:'barca-espanyol'},
  {id:3,img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',home:'FC Barcelone',away:'Valence',comp:'Liga J38',date:'25 mai 2026',titre:'Barça - Valence : le Barça veut finir en beauté',extrait:'Dernier match de Liga avant la grande finale.',slug:'barca-valence'},
]

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
        <div style={{display:'flex',flexDirection:'column',gap:'24px'}}>
          {avantMatchs.map(a=>(
            <a key={a.id} href={`/articles/${a.slug}`} className="article-card" style={{display:'grid',gridTemplateColumns:'280px 1fr',textDecoration:'none',minHeight:'180px'}}>
              <div style={{overflow:'hidden',borderRadius:'6px 0 0 6px'}}>
                <img src={a.img} alt={a.titre} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              </div>
              <div style={{padding:'24px 28px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
                  <span className="badge badge-blue">{a.comp}</span>
                  <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{a.date}</span>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:'16px',marginBottom:'14px'}}>
                  <span style={{fontSize:'16px',fontWeight:700,color:'white'}}>{a.home}</span>
                  <span style={{fontSize:'12px',background:'rgba(255,255,255,0.07)',color:'var(--text-muted)',padding:'4px 12px',borderRadius:'2px',fontFamily:'DM Mono,monospace'}}>VS</span>
                  <span style={{fontSize:'16px',fontWeight:700,color:'var(--text-secondary)'}}>{a.away}</span>
                </div>
                <h2 style={{fontSize:'1.05rem',color:'white',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700,marginBottom:'8px'}}>{a.titre}</h2>
                <p style={{fontSize:'13px',color:'var(--text-secondary)',lineHeight:1.6}}>{a.extrait}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
