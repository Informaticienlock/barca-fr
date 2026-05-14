import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transferts FC Barcelone — Barça Infos',
  description: 'Toutes les rumeurs et officiels des transferts du FC Barcelone.',
}

const builder = imageUrlBuilder(client)

const fallback = [
  {_id:'1',categorie:'Transferts',img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',titre:"Le Barça proche d'un accord pour recruter Olmo définitivement",extrait:"Le club s'apprête à lever l'option d'achat.",datePublication:'2026-05-10',slug:{current:'olmo'}},
  {_id:'2',categorie:'Transferts',img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',titre:'Barça : Szczesny prolonge une saison de plus',extrait:"Le portier poursuit l'aventure barcelonaise.",datePublication:'2026-05-09',slug:{current:'szczesny'}},
  {_id:'3',categorie:'Transferts',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',titre:'Alphonso Davies dans le viseur du Barça',extrait:'Le latéral canadien serait une priorité pour cet été.',datePublication:'2026-05-07',slug:{current:'davies'}},
  {_id:'4',categorie:'Transferts',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',titre:'Marcus Rashford : le Barça toujours intéressé',extrait:"L'attaquant anglais est en fin de contrat à Manchester United.",datePublication:'2026-05-06',slug:{current:'rashford'}},
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
}

export default async function TransfertsPage() {
  let articles: any[] = []
  try {
    articles = await client.fetch(groq`*[_type == "article" && categorie == "Transferts"] | order(datePublication desc){_id,titre,slug,categorie,extrait,image,datePublication}`) || []
  } catch {}
  if (articles.length === 0) articles = fallback

  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
      <div style={{background:'linear-gradient(135deg,#0a0f1e,#1a0a12)',borderBottom:'1px solid var(--barca-border)',padding:'48px 24px 40px'}}>
        <div style={{maxWidth:'1280px',margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
            <div style={{width:'4px',height:'32px',background:'linear-gradient(to bottom,var(--barca-red),var(--barca-gold))',borderRadius:'2px'}}/>
            <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:900,color:'white'}}>Transferts</h1>
          </div>
          <p style={{fontSize:'15px',color:'var(--text-secondary)',marginLeft:'16px'}}>Rumeurs, officiels et analyses du mercato barcelonais</p>
        </div>
      </div>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'40px 24px 80px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px'}}>
          {articles.map((a:any)=>{
            const img = a.image ? builder.image(a.image).width(600).height(320).url() : (a.img||'')
            return (
              <a key={a._id} href={`/articles/${a.slug?.current}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
                <div style={{overflow:'hidden'}}><img src={img} alt={a.titre} style={{width:'100%',height:'190px',objectFit:'cover',display:'block'}}/></div>
                <div style={{padding:'18px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span className="badge badge-red">Transferts</span>
                    <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>{a.datePublication?formatDate(a.datePublication):''}</span>
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
