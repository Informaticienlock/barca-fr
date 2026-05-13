import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ArticlePage() {
  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
      <div style={{maxWidth:'780px',margin:'0 auto',padding:'56px 24px 80px'}}>

        {/* Breadcrumb */}
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'32px',fontSize:'12px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.35)'}}>
          <a href="/" style={{color:'rgba(255,255,255,0.35)',textDecoration:'none'}}>Accueil</a>
          <span>›</span>
          <a href="#" style={{color:'rgba(255,255,255,0.35)',textDecoration:'none'}}>Actualités</a>
          <span>›</span>
          <span style={{color:'rgba(255,255,255,0.6)'}}>Barça en finale</span>
        </div>

        {/* Badge + meta */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
          <span className="badge badge-red">À la une</span>
          <span style={{fontSize:'12px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.4)'}}>10 mai 2026 · 5 min de lecture</span>
        </div>

        {/* Titre */}
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(2rem,4vw,3rem)',fontWeight:900,color:'white',lineHeight:1.1,marginBottom:'24px'}}>
          Barça en finale de la Champions League : la nuit où le Camp Nou a tremblé
        </h1>

        {/* Auteur */}
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'40px',paddingBottom:'32px',borderBottom:'1px solid var(--barca-border)'}}>
          <div style={{width:'44px',height:'44px',background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',borderRadius:'50%',flexShrink:0}}/>
          <div>
            <div style={{fontSize:'14px',color:'white',fontWeight:600}}>Marc Ferrer</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.4)'}}>Rédacteur en chef · Barça Infos</div>
          </div>
        </div>

        {/* Image principale */}
        <img
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80"
          alt="Barça en finale"
          style={{width:'100%',height:'420px',objectFit:'cover',borderRadius:'6px',marginBottom:'12px',display:'block'}}
        />
        <p style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.3)',marginBottom:'40px',textAlign:'center'}}>
          Le Camp Nou lors de la demi-finale retour face à l&apos;Inter Milan · © Unsplash
        </p>

        {/* Contenu article */}
        <div style={{fontSize:'1.05rem',lineHeight:1.85,color:'rgba(255,255,255,0.8)'}}>
          <p style={{marginBottom:'24px'}}>
            Le FC Barcelone a réalisé l&apos;impensable mardi soir au Camp Nou. Menés 2-0 à l&apos;issue du match aller disputé à San Siro, les hommes de Hans-Dieter Flick ont renversé l&apos;Inter Milan dans une atmosphère électrique pour s&apos;qualifier pour la finale de la Ligue des Champions (4-2, 4-4 au cumul, qualification aux buts marqués à l&apos;extérieur).
          </p>

          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'white',marginBottom:'16px',marginTop:'40px'}}>
            Une première mi-temps catastrophique
          </h2>
          <p style={{marginBottom:'24px'}}>
            Le Barça a pourtant failli sombrer dès le début de la rencontre. Dès la 8e minute, Lautaro Martínez, bien servi par Mkhitaryan, trompait Iñaki Peña d&apos;une frappe croisée imparable. Le Camp Nou, sous le choc, retenait son souffle. Il fallait désormais marquer cinq buts pour se qualifier.
          </p>
          <p style={{marginBottom:'24px'}}>
            Mais c&apos;était sans compter sur la résilience légendaire de ce groupe. Pedri, dans un état de grâce absolu, réduisait le score sur une frappe du gauche à l&apos;entrée de la surface (34e). La machine barcelonaise était lancée.
          </p>

          {/* Citation */}
          <blockquote style={{borderLeft:'3px solid var(--barca-red)',paddingLeft:'24px',margin:'32px 0',fontFamily:'Playfair Display,serif',fontSize:'1.2rem',color:'rgba(255,255,255,0.9)',fontStyle:'italic',lineHeight:1.6}}>
            &ldquo;Ce soir, nous avons montré que le Barça ne meurt jamais. Jamais.&rdquo;
            <footer style={{marginTop:'8px',fontSize:'13px',fontFamily:'DM Sans,sans-serif',color:'rgba(255,255,255,0.4)',fontStyle:'normal'}}>
              — Hans-Dieter Flick, après le match
            </footer>
          </blockquote>

          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'white',marginBottom:'16px',marginTop:'40px'}}>
            Lamine Yamal, le génie de 18 ans
          </h2>
          <p style={{marginBottom:'24px'}}>
            La deuxième mi-temps a appartenu à Lamine Yamal. L&apos;ailier barcelonais de 18 ans a livré une performance extraterrestre, inscrivant un doublé (58e, 71e) et délivrant la passe décisive sur l&apos;égalisation de Lewandowski (64e). À chaque fois, sa vivacité, sa technique et son sang-froid ont mis le Camp Nou en transe.
          </p>
          <p style={{marginBottom:'24px'}}>
            À l&apos;issue des 90 minutes, le score était de 4-2 pour le Barça, soit 4-4 au total. La règle du but à l&apos;extérieur, réintroduite cette saison par l&apos;UEFA en phase finale, propulsait le club catalan en finale pour la première fois depuis 2015.
          </p>

          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'white',marginBottom:'16px',marginTop:'40px'}}>
            La finale face au PSG
          </h2>
          <p style={{marginBottom:'24px'}}>
            Le FC Barcelone affrontera le Paris Saint-Germain en finale, le 31 mai prochain à l&apos;Allianz Arena de Munich. Un choc franco-catalan inédit en finale de Ligue des Champions, qui s&apos;annonce comme l&apos;un des plus grands clasicos européens de la décennie.
          </p>
        </div>

        {/* Tags */}
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'48px',paddingTop:'32px',borderTop:'1px solid var(--barca-border)'}}>
          {['Champions League','Lamine Yamal','Pedri','Hans Flick','Inter Milan'].map(tag=>(
            <span key={tag} style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.4)',background:'rgba(255,255,255,0.05)',border:'1px solid var(--barca-border)',padding:'4px 12px',borderRadius:'2px'}}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Retour */}
        <div style={{marginTop:'48px'}}>
          <a href="/" style={{fontSize:'13px',color:'var(--barca-blue)',fontFamily:'DM Mono,monospace',textDecoration:'none',letterSpacing:'0.05em'}}>
            ← Retour à l&apos;accueil
          </a>
        </div>

      </div>
      <Footer />
    </main>
  )
}
