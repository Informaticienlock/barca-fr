'use client'
export default function Header() {
  return (
    <header style={{background:'rgba(10,15,30,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid var(--barca-border)',position:'sticky',top:0,zIndex:100}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',height:'64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'36px',height:'36px',background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'12px',color:'white'}}>FCB</div>
          <div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:'1.1rem',color:'white'}}>Barça <span style={{color:'var(--barca-gold)'}}>Infos</span></div>
            <div style={{fontSize:'10px',color:'rgba(255,255,255,0.4)',letterSpacing:'0.1em',textTransform:'uppercase'}}>L&apos;actualité du FC Barcelone</div>
          </div>
        </a>
        <nav style={{display:'flex',gap:'32px'}}>
          {['Actualités','Avant-matchs','Analyses','Transferts','Effectif'].map(l=>(
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </nav>
        <div style={{background:'var(--barca-red)',color:'white',fontSize:'11px',fontWeight:600,letterSpacing:'0.08em',padding:'5px 12px',borderRadius:'2px',display:'flex',alignItems:'center',gap:'6px'}}>
          <span style={{width:'6px',height:'6px',background:'white',borderRadius:'50%'}}/>EN DIRECT
        </div>
      </div>
    </header>
  )
}
