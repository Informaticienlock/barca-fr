export default function HeroArticle() {
  return (
    <a href="/article" style={{display:'block',textDecoration:'none',position:'relative',borderRadius:'8px',overflow:'hidden',width:'100%'}}>
      <img
        src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80"
        alt="Barça en finale"
        style={{width:'100%',height:'560px',objectFit:'cover',display:'block'}}
      />
      <div className="hero-gradient" style={{position:'absolute',inset:0}}/>
      <div className="hero-content" style={{position:'absolute',bottom:0,left:0,right:0,padding:'56px 52px 48px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'18px'}}>
          <span className="badge badge-red">À la une</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>
            10 mai 2026 · 5 min de lecture
          </span>
        </div>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.9rem,3.2vw,3rem)',fontWeight:900,color:'white',maxWidth:'740px',lineHeight:1.1,marginBottom:'18px',textShadow:'0 2px 30px rgba(0,0,0,0.6)'}}>
          Barça en finale de la Champions League : la nuit où le Camp Nou a tremblé
        </h1>
        <p style={{fontSize:'1rem',color:'rgba(255,255,255,0.75)',maxWidth:'580px',lineHeight:1.7,marginBottom:'28px'}}>
          Une remontée époustouflante face à l&apos;Inter Milan a propulsé le FC Barcelone en finale de la Ligue des Champions pour la première fois depuis 2015.
        </p>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'38px',height:'38px',background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',borderRadius:'50%',flexShrink:0}}/>
          <div>
            <div style={{fontSize:'13px',color:'white',fontWeight:600}}>Marc Ferrer</div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,0.45)'}}>Rédacteur en chef</div>
          </div>
        </div>
      </div>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:'linear-gradient(to right,var(--barca-blue),var(--barca-red),var(--barca-gold))'}}/>
    </a>
  )
}
