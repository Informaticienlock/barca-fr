import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ActualitesGrid from '@/components/ActualitesGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités FC Barcelone — Barça Infos',
  description: 'Toutes les dernières actualités du FC Barcelone en français.',
}

const fallback = [
  {_id:'1',categorie:'Actualités',      img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',    titre:"Pedri de retour à l'entraînement, Flick rassurant",             extrait:"L'international espagnol a repris la course.",              datePublication:'2026-05-09',slug:{current:'pedri'}},
  {_id:'2',categorie:'Transferts',      img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',    titre:"Le Barça proche d'un accord pour recruter Olmo définitivement", extrait:"Le club s'apprête à lever l'option d'achat.",               datePublication:'2026-05-10',slug:{current:'olmo'}},
  {_id:'3',categorie:'Champions League',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80', titre:'Finale UCL : tout savoir sur Barça - PSG le 31 mai',            extrait:'Date, lieu, historique — le guide complet.',                datePublication:'2026-05-08',slug:{current:'finale-ucl'}},
  {_id:'4',categorie:'Avant-match',     img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80', titre:'Barça - Real Sociedad : compositions probables',               extrait:'Flick devrait aligner un onze remanié.',                    datePublication:'2026-05-10',slug:{current:'real-sociedad'}},
  {_id:'5',categorie:'Actualités',      img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80', titre:"Raphinha dans la course au Ballon d'Or",                       extrait:'28 buts et 18 passes décisives cette saison.',             datePublication:'2026-05-08',slug:{current:'raphinha'}},
  {_id:'6',categorie:'Transferts',      img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80', titre:'Barça : Szczesny prolonge une saison de plus',                 extrait:"Le portier poursuit l'aventure barcelonaise.",             datePublication:'2026-05-09',slug:{current:'szczesny'}},
  {_id:'7',categorie:'Actualités',      img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80', titre:'Barça en finale de LDC 2027',                                  extrait:'Lamine Yamal envoie le Barça en finale de LDC 2027.',      datePublication:'2026-05-10',slug:{current:'ldc-2027'}},
  {_id:'8',categorie:'Analyses',        img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80', titre:"Yamal à 18 ans : les chiffres qui prouvent qu'il est mondial", extrait:'Les statistiques avancées de Lamine Yamal comparées.',      datePublication:'2026-05-08',slug:{current:'yamal-stats'}},
]

export default async function ActualitesPage() {
  let articles: any[] = []
  try {
    articles = await client.fetch(groq`*[_type == "article"] | order(datePublication desc) {_id,titre,slug,categorie,extrait,image,datePublication}`) || []
  } catch {}
  if (articles.length < 6) articles = fallback

  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
      <div style={{background:'linear-gradient(135deg,#0a0f1e,#0d1a3a)',borderBottom:'1px solid var(--barca-border)',padding:'48px 24px 40px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <div style={{width:'4px',height:'32px',background:'linear-gradient(to bottom,var(--barca-blue),var(--barca-red))',borderRadius:'2px'}}/>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'white'}}>Actualités</h1>
          </div>
          <p style={{fontSize:'15px',color:'var(--text-secondary)',marginLeft:'16px'}}>Toute l&apos;actualité du FC Barcelone en temps réel</p>
        </div>
      </div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px 80px'}}>
        <ActualitesGrid articles={articles} />
      </div>
      <Footer />
    </main>
  )
}
