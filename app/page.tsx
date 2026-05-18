import Header from '@/components/Header'
import Ticker from '@/components/Ticker'
import HeroArticle from '@/components/HeroArticle'
import ArticleGrid from '@/components/ArticleGrid'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--barca-dark)' }}>
      <Header />
      <Ticker />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        <section style={{ marginTop: '32px' }}>
          <HeroArticle />
        </section>

        <div style={{ marginTop: '48px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="section-title">Dernières actualités</h2>
          <a href="/actualites" style={{ fontSize: '13px', color: 'var(--barca-blue)', fontWeight: 500 }}>Tout voir →</a>
        </div>

        {/* Desktop : articles + sidebar côte à côte */}
        <div className="desktop-layout">
          <ArticleGrid />
          <Sidebar />
        </div>

        {/* Mobile : articles puis sidebar en dessous */}
        <div className="mobile-layout">
          <ArticleGrid />
          <Sidebar />
        </div>

      </div>
      <Footer />
    </main>
  )
}
