import { client } from '@/sanity/lib/client'
import { articlesQuery } from '@/sanity/lib/queries'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

const fallback = [
  {_id:'1',categorie:'Transferts',img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',titre:"Le Barça proche d'un accord pour recruter Olmo définitivement",extrait:"Après une saison de prêt convaincante, le club s'apprête à lever l'option d'achat.",datePublication:'2026-05-10',slug:{current:'olmo'}},
  {_id:'2',categorie:'Avant-match',img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',titre:'Barça - Real Sociedad : compositions probables et enjeux',extrait:'Flick devrait aligner un onze remanié avant la finale européenne.',datePublication:'2026-05-10',slug:{current:'real-sociedad'}},
  {_id:'3',categorie:'Actualités',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',titre:"Pedri de retour à l'entraînement, Flick rassurant",extrait:"L'international espagnol a repris la course.",datePublication:'2026-05-09',slug:{current:'pedri'}},
  {_id:'4',categorie:'Transferts',img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',titre:'Barça : Szczesny prolonge une saison de plus',extrait:"Le portier polonais poursuit l'aventure barcelonaise.",datePublication:'2026-05-09',slug:{current:'szczesny'}},
  {_id:'5',categorie:'Champions League',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',titre:'Finale UCL : tout savoir sur Barça - PSG le 31 mai',extrait:'Date, lieu, historique — le guide complet.',datePublication:'2026-05-08',slug:{current:'finale-ucl'}},
  {_id:'6',categorie:'Actualités',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',titre:"Raphinha dans la course au Ballon d'Or",extrait:'28 buts et 18 passes décisives cette saison.',datePublication:'2026-05-08',slug:{current:'raphinha'}},
]

function getBadge(cat: string) {
  if (cat === 'Transferts') return 'badge-red'
  if (cat === 'Champions League') return 'badge-gold'
  return 'badge-blue'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'short',year:'numeric'})
}

export default async function ArticleGrid() {
  let sanityArticles: any[] = []
  try {
    sanityArticles = await client.fetch(articlesQuery) || []
  } catch {}

  const combined = [...sanityArticles]
  for (const f of fallback) {
    if (combined.length >= 6) break
    if (!combined.find((a: any) => a.titre === f.titre)) combined.push(f)
  }

  return (
    <>
      <style>{`
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (max-width: 480px) {
          .articles-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          .articles-grid .article-card img {
            height: 110px !important;
          }
          .articles-grid .article-card h3 {
            font-size: 0.8rem !important;
          }
          .articles-grid .card-body {
            padding: 10px !important;
          }
        }
      `}</style>
      <div className="articles-grid">
        {combined.slice(0,6).map((a: any) => {
          const img = a.image
            ? builder.image(a.image).width(600).height(320).url()
            : (a.img || 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80')
          return (
            <a key={a._id} href={`/articles/${a.slug?.current}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
              <div style={{overflow:'hidden'}}>
                <img src={img} alt={a.titre} style={{width:'100%',height:'150px',objectFit:'cover',display:'block'}}/>
              </div>
              <div className="card-body" style={{padding:'14px 16px 16px'}}>
                <span className={`badge ${getBadge(a.categorie)}`}>{a.categorie}</span>
                <h3 style={{marginTop:'8px',fontSize:'0.88rem',color:'#fff',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700}}>{a.titre}</h3>
                <p style={{marginTop:'6px',fontSize:'12px',color:'var(--text-secondary)',lineHeight:1.5,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{a.extrait}</p>
                <div style={{marginTop:'10px',fontSize:'10px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
                  {a.datePublication ? formatDate(a.datePublication) : ''}
                </div>
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
