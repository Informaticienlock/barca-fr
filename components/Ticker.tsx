export default function Ticker() {
  const news = ['🔴 OFFICIEL : Le Barça qualifié pour la finale de la Champions League','🔵 Pedri prolonge son contrat jusqu\'en 2029','🔴 Lamine Yamal élu meilleur jeune joueur de Liga','🔵 Flick confirme : "L\'effectif est au complet pour la finale"','🔴 Barça - PSG · Finale Champions League · 31 mai 2026']
  return (
    <div className="ticker-wrapper" style={{padding:'7px 0',display:'flex',alignItems:'center'}}>
      <div style={{background:'#fff',color:'var(--barca-red)',fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:600,letterSpacing:'0.1em',padding:'3px 14px',flexShrink:0}}>FLASH</div>
      <div style={{overflow:'hidden',flex:1}}>
        <div className="ticker-content" style={{fontFamily:'DM Sans,sans-serif',fontSize:'12px',fontWeight:500,color:'white',padding:'0 40px'}}>{news.join('   ·   ')}</div>
      </div>
    </div>
  )
}
