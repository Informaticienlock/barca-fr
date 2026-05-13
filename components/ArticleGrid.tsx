import { client } from '@/sanity/lib/client'
import { articlesQuery } from '@/sanity/lib/queries'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

const fallbackArticles = [
  {_id:'1',categorie:'Transferts',badge:'badge-red',img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',titre:"Le Barça proche d'un accord pour recruter Olmo définitivement",extrait:"Après une saison de prêt convaincante, le club s'apprête à lever l'option d'achat.",datePublication:'2026-05-10',slug:{current:'olmo'}},
  {_id:'2',categorie:'Avant-match',badge:'badge-blue',img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',titre:'Barça - Real Sociedad : compositions probables et enjeux',extrait:'Flick devrait aligner un onze remanié avant la finale européenne.',datePublication:'2026-05-10',slug:{current:'real-sociedad'}},
  {_id:'3',categorie:'Actualités',badge:'badge-blue',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',titre:"Pedri de retour à l'entraînement, Flick rassurant",extrait:"L'international espagnol a repris la course et pourrait être disponible pour la finale.",datePublication:'2026-05-09',slug:{current:'pedri'}},
  {_id:'4',categorie:'Transferts',badge:'badge-red',img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',titre:'Barça : Szczesny prolonge une saison de plus',extrait:"Le portier polonais a décidé de poursuivre l'aventure barcelonaise jusqu'en 2027.",datePublication:'2026-05-09',slug:{current:'szczesny'}},
  {_id:'5',categorie:'Champions League',badge:'badge-gold',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',titre:'Finale UCL : tout savoir sur Barça - PSG le 31 mai',extrait:'Date, lieu, historique des confrontations — le guide complet.',datePublication:'2026-05-08',slug:{current:'finale-ucl'}},
  {_id:'6',categorie:'Actualités',badge:'badge-blue',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',titre:"Raphinha dans la course au Ballon d'Or selon les médias espagnols",extrait:'Avec 28 buts et 18 passes décisives, le Brésilien est parmi les favoris.',datePublication:'2026-05-08',slug:{current:'raphinha'}},
]

function getBadge(cat: string) {
  if (cat === 'Transferts') return 'badge-red'
  if (cat === 'Champions League') return 'badge-gold'
  return 'badge-blue'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
}

export default async function ArticleGrid() {
  let articles: any[] = []
  try {
    const data = await client.fetch(articlesQuery)
    articles = data && data.length > 0 ? data : fallbackArticles
  } catch {
    articles = fallbackArticles
  }

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px'}}>
      {articles.slice(0,6).map((a: any) => {
        const img = a.image
          ? builder.image(a.image).width(600).height(320).url()
          : (a.img || 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80')
        return (
          <a key={a._id} href={`/articles/${a.slug?.current}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
            <img src={img} alt={a.titre} style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
            <div style={{padding:'18px'}}>
              <span className={`badge ${getBadge(a.categorie)}`}>{a.categorie}</span>
              <h3 style={{marginTop:'10px',fontSize:'0.95rem',color:'#fff',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700}}>{a.titre}</h3>
              <p style={{marginTop:'8px',fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:1.6}}>{a.extrait}</p>
              <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.28)',fontFamily:'DM Mono,monospace'}}>
                {a.datePublication ? formatDate(a.datePublication) : ''}
              </div>
            </div>
          </a>
        )
      })}
    </div>
  )
}
