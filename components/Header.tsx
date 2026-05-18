'use client'
import { useState } from 'react'
import LiveMatch from './LiveMatch'

const navLinks = [
  { label: 'Actualités',  href: '/actualites'   },
  { label: 'Avant-matchs',href: '/avant-matchs' },
  { label: 'Analyses',    href: '/analyses'     },
  { label: 'Transferts',  href: '/transferts'   },
  { label: 'Effectif',    href: '/effectif'     },
]

export default function Header() {
  const [open, setOpen]     = useState(false)
  const [live, setLive]     = useState(false)

  return (
    <>
      <header style={{background:'rgba(8,13,26,0.92)',backdropFilter:'blur(16px)',WebkitBackdropFilter:'blur(16px)',borderBottom:'1px solid var(--barca-border)',position:'sticky',top:0,zIndex:100}}>
        <div style={{height:'3px',background:'linear-gradient(to right,var(--barca-blue),var(--barca-red),var(--barca-gold))'}}/>
        <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>

          <a href="/" style={{textDecoration:'none',display:'flex',alignItems:'center',gap:'11px'}}>
            <div style={{width:'34px',height:'34px',background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'11px',color:'white',fontFamily:'Playfair Display,serif',flexShrink:0,boxShadow:'0 2px 12px rgba(165,0,68,0.35)'}}>FCB</div>
            <div>
              <div style={{fontFamily:'Playfair Display,serif',fontWeight:900,fontSize:'1.05rem',lineHeight:1}}>
                <span className="logo-text">Barça </span>
                <span className="logo-accent">Infos</span>
              </div>
              <div style={{fontSize:'9px',color:'var(--text-muted)',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'2px'}}>L&apos;actualité du FC Barcelone</div>
            </div>
          </a>

          <nav className="desktop-nav" style={{display:'flex',gap:'28px',alignItems:'center'}}>
            {navLinks.map(l=><a key={l.label} href={l.href} className="nav-link">{l.label}</a>)}
          </nav>

          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            {/* Bouton EN DIRECT — cliquable */}
            <button
              onClick={() => setLive(true)}
              style={{
                background:'var(--barca-red)', color:'white',
                fontSize:'10px', fontWeight:700, letterSpacing:'0.1em',
                padding:'5px 11px', borderRadius:'2px',
                display:'flex', alignItems:'center', gap:'6px',
                border:'none', cursor:'pointer',
                transition:'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#c0003a')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--barca-red)')}
            >
              <span className="live-dot"/>EN DIRECT
            </button>

            <button className="mobile-menu-btn" onClick={()=>setOpen(!open)} style={{display:'none',background:'none',border:'none',cursor:'pointer',flexDirection:'column',gap:'5px',padding:'4px'}}>
              {[0,1,2].map(i=>(
                <span key={i} style={{display:'block',width:'22px',height:'2px',background:'white',borderRadius:'1px',transition:'all 0.25s',
                  transform:open?(i===0?'rotate(45deg) translate(5px,5px)':i===2?'rotate(-45deg) translate(5px,-5px)':'scaleX(0)'):'none'}}/>
              ))}
            </button>
          </div>

        </div>
      </header>

      {/* Menu mobile */}
      {open && (
        <div style={{position:'fixed',top:'63px',left:0,right:0,zIndex:99,background:'rgba(8,13,26,0.98)',backdropFilter:'blur(16px)',borderBottom:'1px solid var(--barca-border)',padding:'16px 24px 24px'}}>
          {navLinks.map(l=>(
            <a key={l.label} href={l.href} style={{display:'block',padding:'14px 0',borderBottom:'1px solid var(--barca-border)',fontSize:'15px',fontWeight:500,color:'var(--text-secondary)',textDecoration:'none'}}>
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* Modal Live */}
      {live && <LiveMatch onClose={() => setLive(false)} />}
    </>
  )
}
