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
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: '40px' }}>
          <HeroArticle />
        </section>
        <div style={{ marginTop: '56px', marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="section-title"><span className="stripe" />Dernières actualités</h2>
          <a href="#" style={{ fontSize: '13px', color: 'var(--barca-blue)', fontWeight: 500 }}>Tout voir →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>
          <ArticleGrid />
          <Sidebar />
        </div>
      </div>
      <Footer />
    </main>
  )
}
