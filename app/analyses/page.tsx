import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analyses FC Barcelone — Barça Infos',
  description: 'Analyses tactiques et dossiers approfondis sur le FC Barcelone.',
}

const analyses = [
  {id:1,categorie:'Tactique',img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',titre:'Comment Flick a transformé le pressing du Barça en arme fatale',extrait:'Analyse détaillée du système de pression haute qui a dominé la Liga cette saison.',date:'9 mai 2026',slug:'flick-pressing'},
  {id:2,categorie:'Analyse',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',titre:"Yamal à 18 ans : les chiffres qui prouvent qu'il est déjà au niveau mondial",extrait:'Les statistiques avancées de Lamine Yamal comparées aux plus grands de son âge.',date:'8 mai 2026',slug:'yamal-stats'},
  {id:3,categorie:'Tactique',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',titre:'Le milieu Pedri-Gavi-Casadó, meilleur trio d\'Europe',extrait:'Pourquoi ce trio est le plus complémentaire du continent.',date:'7 mai 2026',slug:'milieu-barca'},
  {id:4,categorie:'Dossier',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',titre:'Barça 2025-26 : la meilleure saison de l\'ère post-Messi ?',extrait:'Retour sur une saison historique à tous les niveaux.',date:'6 mai 2026',slug:'saison-barca'},
]

export default function AnalysesPage() {
  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
      <div style={{background:'linear-gradient(135deg,#0a0f1e,#0a1a0f)',borderBottom:'1px solid var(--barca-border)',padding:'48px 24px 40px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <div style={{width:'4px',height:'32px',background:'linear-gradient(to bottom,var(--barca-blue),var(--barca-gold))',borderRadius:'2px'}}/>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'white'}}>Analyses & Tactique</h1>
          </div>
          <p style={{fontSize:'15px',color:'var(--text-secondary)',marginLeft:'16px'}}>Décryptages tactiques et dossiers approfondis</p>
        </div>
      </div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px 80px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px'}}>
          {analyses.map(a=>(
            <a key={a.id} href={`/articles/${a.slug}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
              <div style={{overflow:'hidden'}}><img src={a.img} alt={a.titre} style={{width:'100%',height:'190px',objectFit:'cover',display:'block'}}/></div>
              <div style={{padding:'18px'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                  <span className="badge badge-blue">{a.categorie}</span>
                  <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{a.date}</span>
                </div>
                <h2 style={{fontSize:'1rem',color:'white',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700,marginBottom:'8px'}}>{a.titre}</h2>
                <p style={{fontSize:'13px',color:'var(--text-secondary)',lineHeight:1.6,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{a.extrait}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
