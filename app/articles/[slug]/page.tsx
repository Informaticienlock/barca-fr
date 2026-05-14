import { client } from '@/sanity/lib/client'
import { articleQuery } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import imageUrlBuilder from '@sanity/image-url'
import { notFound } from 'next/navigation'

const builder = imageUrlBuilder(client)

function getBadge(cat: string) {
  if (cat === 'Transferts') return 'badge-red'
  if (cat === 'Champions League') return 'badge-gold'
  return 'badge-blue'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', {day:'numeric',month:'long',year:'numeric'})
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await client.fetch(articleQuery, { slug })

  if (!article) notFound()

  const img = article.image
    ? builder.image(article.image).width(1200).height(630).url()
    : 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80'

  return (
    <main style={{minHeight:'100vh',background:'var(--barca-dark)'}}>
      <Header />
      <div style={{maxWidth:'780px',margin:'0 auto',padding:'48px 24px 80px'}}>

        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'28px',fontSize:'12px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>
          <a href="/" style={{color:'var(--text-muted)',textDecoration:'none'}}>Accueil</a>
          <span>›</span>
          <span style={{color:'var(--text-secondary)'}}>{article.categorie}</span>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
          <span className={`badge ${getBadge(article.categorie)}`}>{article.categorie}</span>
          {article.datePublication && (
            <span style={{fontSize:'12px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)'}}>
              {formatDate(article.datePublication)}
            </span>
          )}
        </div>

        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(1.9rem,4vw,2.8rem)',fontWeight:900,color:'white',lineHeight:1.1,marginBottom:'24px'}}>
          {article.titre}
        </h1>

        {article.extrait && (
          <p style={{fontSize:'1.1rem',color:'var(--text-secondary)',lineHeight:1.7,marginBottom:'28px',borderLeft:'3px solid var(--barca-blue)',paddingLeft:'16px'}}>
            {article.extrait}
          </p>
        )}

        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'36px',paddingBottom:'28px',borderBottom:'1px solid var(--barca-border)'}}>
          <div style={{width:'42px',height:'42px',background:'linear-gradient(135deg,var(--barca-blue),var(--barca-red))',borderRadius:'50%',flexShrink:0}}/>
          <div>
            <div style={{fontSize:'14px',color:'white',fontWeight:600}}>{article.auteur || 'Rédaction Barça Infos'}</div>
            <div style={{fontSize:'12px',color:'var(--text-muted)'}}>Barça Infos</div>
          </div>
        </div>

        <img src={img} alt={article.titre} style={{width:'100%',height:'420px',objectFit:'cover',borderRadius:'6px',marginBottom:'40px',display:'block'}}/>

        {article.contenu && (
          <div style={{fontSize:'1.05rem',lineHeight:1.85,color:'var(--text-secondary)'}}>
            <PortableText
              value={article.contenu}
              components={{
                block: {
                  normal: ({children}) => <p style={{marginBottom:'24px'}}>{children}</p>,
                  h2: ({children}) => <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'1.5rem',fontWeight:700,color:'white',marginBottom:'16px',marginTop:'40px'}}>{children}</h2>,
                  h3: ({children}) => <h3 style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'white',marginBottom:'12px',marginTop:'32px'}}>{children}</h3>,
                  blockquote: ({children}) => (
                    <blockquote style={{borderLeft:'3px solid var(--barca-red)',paddingLeft:'24px',margin:'32px 0',fontStyle:'italic',fontSize:'1.15rem',color:'rgba(255,255,255,0.88)'}}>
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({children}) => <strong style={{color:'white',fontWeight:700}}>{children}</strong>,
                  em: ({children}) => <em>{children}</em>,
                  link: ({value, children}) => <a href={value?.href} style={{color:'var(--barca-blue)',textDecoration:'underline'}}>{children}</a>,
                },
              }}
            />
          </div>
        )}

        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginTop:'48px',paddingTop:'28px',borderTop:'1px solid var(--barca-border)'}}>
          {['Barça', article.categorie].filter(Boolean).map((tag: string) => (
            <span key={tag} style={{fontSize:'11px',fontFamily:'DM Mono,monospace',color:'var(--text-muted)',background:'rgba(255,255,255,0.04)',border:'1px solid var(--barca-border)',padding:'4px 12px',borderRadius:'2px'}}>
              #{tag}
            </span>
          ))}
        </div>

        <div style={{marginTop:'40px'}}>
          <a href="/" style={{fontSize:'13px',color:'var(--barca-blue)',fontFamily:'DM Mono,monospace',textDecoration:'none'}}>
            ← Retour à l&apos;accueil
          </a>
        </div>

      </div>
      <Footer />
    </main>
  )
}
