'use client'
import { useState } from 'react'

const CATEGORIES = ['Tous','Actualités','Transferts','Avant-match','Champions League','Analyses']

function getBadge(cat: string) {
  if (cat === 'Transferts')       return 'badge-red'
  if (cat === 'Champions League') return 'badge-gold'
  return 'badge-blue'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
}

export default function ActualitesGrid({ articles }: { articles: any[] }) {
  const [filtre, setFiltre] = useState('Tous')

  const filtered = filtre === 'Tous'
    ? articles
    : articles.filter(a => a.categorie === filtre)

  return (
    <>
      {/* Filtres */}
      <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'32px'}}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFiltre(cat)} style={{
            fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:600,
            letterSpacing:'0.08em', textTransform:'uppercase',
            padding:'6px 14px', borderRadius:'2px', cursor:'pointer',
            background: filtre === cat ? 'var(--barca-blue)' : 'rgba(255,255,255,0.05)',
            color:       filtre === cat ? 'white' : 'var(--text-muted)',
            border:      filtre === cat ? 'none'  : '1px solid var(--barca-border)',
            transition:'all 0.2s',
          }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Compteur */}
      <div style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',marginBottom:'20px'}}>
        {filtered.length} article{filtered.length > 1 ? 's' : ''}
        {filtre !== 'Tous' && ` · ${filtre}`}
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <div style={{textAlign:'center',padding:'60px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',fontSize:'12px'}}>
          Aucun article dans cette catégorie.
        </div>
      ) : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'24px'}}>
          {filtered.map((a: any) => {
            const img = a.img || 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80'
            return (
              <a key={a._id} href={`/articles/${a.slug?.current}`} className="article-card" style={{display:'block',textDecoration:'none'}}>
                <div style={{overflow:'hidden'}}>
                  <img src={img} alt={a.titre} style={{width:'100%',height:'190px',objectFit:'cover',display:'block'}}/>
                </div>
                <div style={{padding:'18px'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
                    <span className={`badge ${getBadge(a.categorie)}`}>{a.categorie}</span>
                    <span style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
                      {a.datePublication ? formatDate(a.datePublication) : ''}
                    </span>
                  </div>
                  <h2 style={{fontSize:'1rem',color:'white',lineHeight:1.4,fontFamily:'Playfair Display,serif',fontWeight:700,marginBottom:'8px'}}>{a.titre}</h2>
                  <p style={{fontSize:'13px',color:'var(--text-secondary)',lineHeight:1.6,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{a.extrait}</p>
                </div>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}
