import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import imageUrlBuilder from '@sanity/image-url'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités FC Barcelone — Barça Infos',
  description: 'Toutes les dernières actualités du FC Barcelone en français. Suivez l\'actualité du Barça en temps réel.',
}

const builder = imageUrlBuilder(client)

const allArticlesQuery = groq`
  *[_type == "article"] | order(datePublication desc) {
    _id, titre, slug, categorie, extrait, image, auteur, datePublication
  }
`

const fallback = [
  {_id:'1',categorie:'Actualités',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',titre:"Pedri de retour à l'entraînement, Flick rassurant",extrait:"L'international espagnol a repris la course.",datePublication:'2026-05-09',slug:{current:'pedri'}},
  {_id:'2',categorie:'Transferts',img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',titre:"Le Barça proche d'un accord pour recruter Olmo définitivement",extrait:"Le club s'apprête à lever l'option d'achat.",datePublication:'2026-05-10',slug:{current:'olmo'}},
  {_id:'3',categorie:'Champions League',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',titre:'Finale UCL : tout savoir sur Barça - PSG le 31 mai',extrait:'Date, lieu, historique — le guide complet.',datePublication:'2026-05-08',slug:{current:'finale-ucl'}},
  {_id:'4',categorie:'Avant-match',img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',titre:'Barça - Real Sociedad : compositions probables',extrait:'Flick devrait aligner un onze remanié.',datePublication:'2026-05-10',slug:{current:'real-sociedad'}},
  {_id:'5',categorie:'Actualités',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',titre:"Raphinha dans la course au Ballon d'Or",extrait:'28 buts et 18 passes décisives cette saison.',datePublication:'2026-05-08',slug:{current:'raphinha'}},
  {_id:'6',categorie:'Transferts',img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',titre:'Barça : Szczesny prolonge une saison de plus',extrait:"Le portier poursuit l'aventure barcelonaise.",datePublication:'2026-05-09',slug:{current:'szczesny'}},
]

function getBadge(cat: string) {
  if (cat === 'Transferts') return 'badge-red'
  if (cat === 'Champions League') return 'badge-gold'
  return 'badge-blue'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
}

export default async function ActualitesPage() {
  let articles: any[] = []
  try {
    articles = await client.fetch(allArticlesQuery) || []
  } catch {}
  if (articles.length < 6) {
    for (const f of fallback) {
      if (articles.length >= 12) break
      if (!articles.find((a: any) => a.titre === f.titre)) articles.push(f)
    }
  }

  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />

      {/* Hero rubrique */}
      <div style={{background:'linear-gradient(135deg, #0a0f1e 0%, #0d1a3a 100%)',borderBottom:'1px solid var(--barca-border)',padding:'48px 24px 40px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <div style={{width:'4px',height:'32px',background:'linear-gradient(to bottom,var(--barca-blue),var(--barca-red))',borderRadius:'2px'}}/>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'white'}}>
              Actualités
            </h1>
          </div>
          <p style={{fontSize:'15px',color:'var(--text-secondary)',marginLeft:'16px'}}>
            Toute l&apos;actualité du FC Barcelone en temps réel
          </p>
        </div>
      </div>

      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px 80px'}}>

        {/* Filtres catégories */}
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'32px'}}>
          {['Tous','Actualités','Transferts','Avant-match','Champions League','Analyses'].map(cat=>(
            <button key={cat} style={{
              fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:600,
              letterSpacing:'0.08em',textTransform:'uppercase',
              padding:'6px 14px',borderRadius:'2px',cursor:'pointer',
              background: cat==='Tous' ? 'var(--barca-blue)' : 'rgba(255,255,255,0.05)',
              color: cat==='Tous' ? 'white' : 'var(--text-muted)',
              border: cat==='Tous' ? 'none' : '1px solid var(--barca-border)',
            }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grille articles */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px'}}>
          {articles.map((a: any) => {
            const img = a.image
              ? builder.image(a.image).width(600).height(320).url()
              : (a.img || 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80')
            return (
              <a key={a._id} href={`/articles/${a.slug?.current}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
                <div style={{overflow:'hidden'}}>
                  <img src={img} alt={a.titre} style={{width:'100%',height:'190px',objectFit:'cover',display:'block'}}/>
                </div>
                <div style={{padding:'18px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span className={`badge ${getBadge(a.categorie)}`}>{a.categorie}</span>
                    <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
                      {a.datePublication ? formatDate(a.datePublication) : ''}
                    </span>
                  </div>
                  <h2 style={{fontSize:'1rem',color:'white',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700,marginBottom:'8px'}}>{a.titre}</h2>
                  <p style={{fontSize:'13px',color:'var(--text-secondary)',lineHeight:1.6,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{a.extrait}</p>
                </div>
              </a>
            )
          })}
        </div>

      </div>
      <Footer />
    </main>
  )
}
