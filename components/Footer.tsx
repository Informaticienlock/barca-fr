export default function Footer() {
  const rubriques = [
    { label:'Actualités',  href:'/actualites'   },
    { label:'Avant-matchs',href:'/avant-matchs' },
    { label:'Analyses',    href:'/analyses'     },
    { label:'Transferts',  href:'/transferts'   },
    { label:'Effectif',    href:'/effectif'     },
  ]

  return (
    <footer style={{borderTop:'1px solid var(--barca-border)',background:'var(--barca-surface)',marginTop:'40px'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'48px 24px 32px'}}>
        <div style={{display:'grid',gridTemplateColumns:'2fr 1fr 1fr',gap:'48px',marginBottom:'48px'}}>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:'1.3rem',color:'white',marginBottom:'12px'}}>Barça <span style={{color:'var(--barca-gold)'}}>Infos</span></div>
            <p style={{fontSize:'13px',color:'rgba(255,255,255,0.4)',lineHeight:1.7}}>Le média français de référence sur le FC Barcelone. Actualités, analyses, transferts — toujours en premier.</p>
          </div>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',marginBottom:'16px',textTransform:'uppercase'}}>Rubriques</div>
            {rubriques.map(l=>(
              <a key={l.label} href={l.href} style={{display:'block',fontSize:'13px',color:'rgba(255,255,255,0.5)',textDecoration:'none',marginBottom:'10px',transition:'color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.color='white')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')}
              >{l.label}</a>
            ))}
          </div>
          <div>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',letterSpacing:'0.1em',color:'rgba(255,255,255,0.3)',marginBottom:'16px',textTransform:'uppercase'}}>À propos</div>
            {['Notre équipe','Contact','Mentions légales'].map(l=>(
              <a key={l} href="#" style={{display:'block',fontSize:'13px',color:'rgba(255,255,255,0.5)',textDecoration:'none',marginBottom:'10px',transition:'color 0.2s'}}
                onMouseEnter={e=>(e.currentTarget.style.color='white')}
                onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,0.5)')}
              >{l}</a>
            ))}
          </div>
        </div>
        <div style={{borderTop:'1px solid var(--barca-border)',paddingTop:'24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:'12px',color:'rgba(255,255,255,0.25)',fontFamily:'DM Mono,monospace'}}>© 2026 Barça Infos · Site non officiel</span>
          <div style={{display:'flex',gap:'6px'}}>
            <div style={{width:'20px',height:'4px',background:'var(--barca-blue)',borderRadius:'2px'}}/>
            <div style={{width:'20px',height:'4px',background:'var(--barca-red)',borderRadius:'2px'}}/>
            <div style={{width:'20px',height:'4px',background:'var(--barca-gold)',borderRadius:'2px'}}/>
          </div>
        </div>
      </div>
    </footer>
  )
}
