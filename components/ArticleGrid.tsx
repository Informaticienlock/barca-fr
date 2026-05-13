const articles = [
  {category:'Transferts',badge:'badge-red',img:'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80',title:"Le Barça proche d'un accord pour recruter Olmo définitivement",excerpt:"Après une saison de prêt convaincante, le club s'apprête à lever l'option d'achat.",date:'10 mai 2026',readTime:'3 min'},
  {category:'Avant-match',badge:'badge-blue',img:'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',title:'Barça - Real Sociedad : compositions probables et enjeux',excerpt:'Flick devrait aligner un onze remanié avant la finale européenne.',date:'10 mai 2026',readTime:'4 min'},
  {category:'Actualités',badge:'badge-blue',img:'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=600&q=80',title:"Pedri de retour à l'entraînement, Flick rassurant",excerpt:"L'international espagnol a repris la course et pourrait être disponible pour la finale.",date:'9 mai 2026',readTime:'2 min'},
  {category:'Transferts',badge:'badge-red',img:'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80',title:'Barça : Szczesny prolonge une saison de plus',excerpt:"Le portier polonais a décidé de poursuivre l'aventure barcelonaise jusqu'en 2027.",date:'9 mai 2026',readTime:'3 min'},
  {category:'Champions League',badge:'badge-gold',img:'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80',title:'Finale UCL : tout savoir sur Barça - PSG le 31 mai',excerpt:'Date, lieu, historique des confrontations — le guide complet.',date:'8 mai 2026',readTime:'5 min'},
  {category:'Actualités',badge:'badge-blue',img:'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',title:"Raphinha dans la course au Ballon d'Or selon les médias espagnols",excerpt:'Avec 28 buts et 18 passes décisives, le Brésilien est parmi les favoris.',date:'8 mai 2026',readTime:'4 min'},
]
export default function ArticleGrid() {
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'24px'}}>
      {articles.map((a,i)=>(
        <a key={i} href="#" className="article-card" style={{display:'block',textDecoration:'none'}}>
          <img src={a.img} alt={a.title} style={{width:'100%',height:'160px',objectFit:'cover',display:'block'}}/>
          <div style={{padding:'18px'}}>
            <span className={`badge ${a.badge}`}>{a.category}</span>
            <h3 style={{marginTop:'10px',fontSize:'0.95rem',color:'#fff',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700}}>{a.title}</h3>
            <p style={{marginTop:'8px',fontSize:'13px',color:'rgba(255,255,255,0.45)',lineHeight:1.6}}>{a.excerpt}</p>
            <div style={{marginTop:'12px',fontSize:'11px',color:'rgba(255,255,255,0.28)',fontFamily:'DM Mono,monospace'}}>{a.date} · {a.readTime} de lecture</div>
          </div>
        </a>
      ))}
    </div>
  )
}
