'use client'
import { useState, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

/* ── Types ── */
type Competition = 'liga' | 'ucl' | 'toutes'
type MatchData = {
  match: string
  date: string
  adversaire: string
  resultat: string
  possession: number
  tirsConcedesCadres: number
  tauxConversion: number
  competition: 'liga' | 'ucl'
}

/* ── Données statiques (fallback) ── */
const MATCH_DATA: MatchData[] = [
  { match: 'J23', date: '18 jan', adversaire: 'Getafe',    resultat: '3-0', possession: 68, tirsConcedesCadres: 1, tauxConversion: 42, competition: 'liga' },
  { match: 'J24', date: '25 jan', adversaire: 'Atlético',  resultat: '1-1', possession: 54, tirsConcedesCadres: 4, tauxConversion: 28, competition: 'liga' },
  { match: 'UCL', date: '4 fév',  adversaire: 'Benfica',   resultat: '2-0', possession: 61, tirsConcedesCadres: 2, tauxConversion: 35, competition: 'ucl'  },
  { match: 'J25', date: '8 fév',  adversaire: 'Séville',   resultat: '4-1', possession: 70, tirsConcedesCadres: 1, tauxConversion: 50, competition: 'liga' },
  { match: 'UCL', date: '19 fév', adversaire: 'Benfica',   resultat: '1-0', possession: 58, tirsConcedesCadres: 3, tauxConversion: 31, competition: 'ucl'  },
  { match: 'J26', date: '22 fév', adversaire: 'Villarreal',resultat: '2-0', possession: 65, tirsConcedesCadres: 2, tauxConversion: 38, competition: 'liga' },
  { match: 'UCL', date: '5 mar',  adversaire: 'Dortmund',  resultat: '3-1', possession: 63, tirsConcedesCadres: 3, tauxConversion: 44, competition: 'ucl'  },
  { match: 'J27', date: '9 mar',  adversaire: 'Betis',     resultat: '1-0', possession: 62, tirsConcedesCadres: 3, tauxConversion: 22, competition: 'liga' },
  { match: 'J28', date: '16 mar', adversaire: 'Valence',   resultat: '5-1', possession: 72, tirsConcedesCadres: 1, tauxConversion: 56, competition: 'liga' },
  { match: 'UCL', date: '9 avr',  adversaire: 'Inter',     resultat: '2-2', possession: 55, tirsConcedesCadres: 5, tauxConversion: 29, competition: 'ucl'  },
  { match: 'J29', date: '13 avr', adversaire: 'Rayo',      resultat: '3-0', possession: 69, tirsConcedesCadres: 1, tauxConversion: 46, competition: 'liga' },
  { match: 'J32', date: '20 avr', adversaire: 'Real Mad.', resultat: '3-1', possession: 64, tirsConcedesCadres: 3, tauxConversion: 40, competition: 'liga' },
]

/* ── Tooltip personnalisé ── */
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const match = MATCH_DATA.find(m => m.match === label)
  return (
    <div style={{
      background: 'rgba(10,15,30,0.97)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', padding: '12px 16px', fontSize: '12px', minWidth: '180px',
    }}>
      <div style={{ fontFamily: 'DM Mono,monospace', color: 'var(--barca-gold)', fontWeight: 700, marginBottom: '6px' }}>
        {label} · {match?.adversaire}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'DM Mono,monospace' }}>
        {match?.date} · <span style={{ color: '#4ade80' }}>{match?.resultat}</span>
      </div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>{p.name} : </span>
          <span style={{ color: p.color, fontFamily: 'DM Mono,monospace', fontWeight: 700 }}>
            {p.value}{p.name.includes('Possession') || p.name.includes('Conversion') ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Composant graphique ── */
function TrendChart({
  data, dataKey, name, color, unit, yDomain, label
}: {
  data: MatchData[], dataKey: keyof MatchData,
  name: string, color: string, unit: string,
  yDomain: [number, number], label: string
}) {
  const avg = (data.reduce((s, m) => s + (m[dataKey] as number), 0) / data.length).toFixed(1)
  const last3avg = (data.slice(-3).reduce((s, m) => s + (m[dataKey] as number), 0) / 3).toFixed(1)
  const trend = parseFloat(last3avg) > parseFloat(avg) ? 'up' : parseFloat(last3avg) < parseFloat(avg) ? 'down' : 'stable'
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'
  const trendColor = dataKey === 'tirsConcedesCadres'
    ? (trend === 'up' ? '#f87171' : trend === 'down' ? '#4ade80' : 'var(--text-muted)')
    : (trend === 'up' ? '#4ade80' : trend === 'down' ? '#f87171' : 'var(--text-muted)')

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', padding: '18px', marginBottom: '16px',
    }}>
      {/* Header chart */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '4px' }}>
            {label}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.6rem', fontWeight: 900, color }}>
              {avg}{unit}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>moy. saison</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>TENDANCE (3 derniers)</div>
          <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.1rem', fontWeight: 800, color: trendColor }}>
            {trendIcon} {last3avg}{unit}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="match"
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.35)', fontFamily: 'DM Mono,monospace' }}
            stroke="rgba(255,255,255,0.08)"
          />
          <YAxis
            domain={yDomain}
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.35)', fontFamily: 'DM Mono,monospace' }}
            stroke="rgba(255,255,255,0.08)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone" dataKey={dataKey as string} name={name}
            stroke={color} strokeWidth={2.5} dot={{ fill: color, r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, stroke: 'white', strokeWidth: 1.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

/* ── Composant principal ── */
export default function EvolutionTactique() {
  const [competition, setCompetition] = useState<Competition>('toutes')
  const [aiAnalysis, setAiAnalysis] = useState<string>('')
  const [loadingAI, setLoadingAI] = useState(false)
  const [aiLoaded, setAiLoaded] = useState(false)

  const filtered = competition === 'toutes'
    ? MATCH_DATA
    : MATCH_DATA.filter(m => m.competition === competition)

  /* ── Appel API Anthropic ── */
  async function analyserAvecIA() {
    setLoadingAI(true)
    setAiAnalysis('')
    setAiLoaded(false)

    const statsResume = filtered.map(m =>
      `${m.match} vs ${m.adversaire} (${m.resultat}) : Possession ${m.possession}%, Tirs cadrés concédés ${m.tirsConcedesCadres}, Conversion ${m.tauxConversion}%`
    ).join('\n')

    const competitionLabel = competition === 'liga' ? 'Liga' : competition === 'ucl' ? 'Champions League' : 'toutes compétitions'

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Tu es un analyste tactique expert du FC Barcelone. Tu analyses les données de match et fournis une analyse macro concise, perspicace et structurée. Réponds en français. Utilise des emojis sparingly. Sois direct et analytique, comme un vrai scout ou data analyst. Maximum 200 mots.`,
          messages: [{
            role: 'user',
            content: `Voici les données des ${filtered.length} derniers matchs du Barça en ${competitionLabel} :\n\n${statsResume}\n\nDonne une analyse macro des tendances tactiques : évolution de la possession, solidité défensive (tirs concédés), efficacité offensive (taux de conversion). Identifie les points forts, les signaux d'alerte et une recommandation tactique.`,
          }],
        }),
      })

      const data = await response.json()
      const text = data.content?.find((b: any) => b.type === 'text')?.text || ''
      setAiAnalysis(text)
      setAiLoaded(true)
    } catch (err) {
      setAiAnalysis('Erreur lors de l\'analyse. Vérifiez la connexion.')
      setAiLoaded(true)
    } finally {
      setLoadingAI(false)
    }
  }

  return (
    <div style={{
      background: 'var(--barca-card)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(0,77,152,0.2),rgba(165,0,68,0.1))',
        padding: '18px 22px', borderBottom: '1px solid var(--barca-border)',
      }}>
        <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
          ÉVOLUTION TACTIQUE · ANALYSE MACRO · SAISON 2025-26
        </div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>
          Tendances sur les <span style={{ color: 'var(--barca-gold)' }}>{filtered.length} derniers matchs</span>
        </div>
      </div>

      {/* Filtres + bouton IA */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 22px', borderBottom: '1px solid var(--barca-border)', flexWrap: 'wrap', gap: '10px',
      }}>
        {/* Filtre compétition */}
        <div style={{ display: 'flex', gap: '0', border: '1px solid var(--barca-border)', borderRadius: '6px', overflow: 'hidden' }}>
          {([['toutes', 'TOUTES'], ['liga', '🇪🇸 LIGA'], ['ucl', '⭐ UCL']] as const).map(([key, label]) => (
            <button key={key} onClick={() => { setCompetition(key); setAiLoaded(false); setAiAnalysis('') }} style={{
              padding: '8px 14px', border: 'none', cursor: 'pointer',
              background: competition === key ? 'rgba(0,77,152,0.2)' : 'transparent',
              color: competition === key ? 'white' : 'var(--text-muted)',
              fontFamily: 'DM Mono,monospace', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.06em', transition: 'all 0.2s',
              borderRight: key !== 'ucl' ? '1px solid var(--barca-border)' : 'none',
            }}>{label}</button>
          ))}
        </div>

        {/* Bouton analyse IA */}
        <button onClick={analyserAvecIA} disabled={loadingAI} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '9px 18px', borderRadius: '6px', border: '1px solid rgba(237,187,0,0.4)',
          background: loadingAI ? 'rgba(237,187,0,0.05)' : 'rgba(237,187,0,0.1)',
          color: loadingAI ? 'var(--text-muted)' : 'var(--barca-gold)',
          fontFamily: 'DM Mono,monospace', fontSize: '11px', fontWeight: 700,
          cursor: loadingAI ? 'not-allowed' : 'pointer', transition: 'all 0.2s',
          letterSpacing: '0.06em',
        }}>
          <span style={{ fontSize: '14px' }}>{loadingAI ? '⏳' : '🤖'}</span>
          {loadingAI ? 'ANALYSE EN COURS...' : 'ANALYSE IA'}
        </button>
      </div>

      <div style={{ padding: '24px' }}>

        {/* Graphiques */}
        <TrendChart
          data={filtered} dataKey="possession" name="Possession"
          color="#004D98" unit="%" yDomain={[40, 80]}
          label="POSSESSION MOYENNE (%)"
        />
        <TrendChart
          data={filtered} dataKey="tirsConcedesCadres" name="Tirs concédés cadrés"
          color="#f87171" unit="" yDomain={[0, 8]}
          label="TIRS CADRÉS CONCÉDÉS"
        />
        <TrendChart
          data={filtered} dataKey="tauxConversion" name="Taux de conversion"
          color="#EDBB00" unit="%" yDomain={[0, 70]}
          label="TAUX DE CONVERSION DES OCCASIONS (%)"
        />

        {/* Légende compétitions */}
        <div style={{
          display: 'flex', gap: '16px', marginBottom: aiLoaded || loadingAI ? '20px' : '0',
          flexWrap: 'wrap',
        }}>
          {filtered.map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                background: m.competition === 'liga' ? '#004D98' : '#EDBB00',
              }} />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>
                {m.match}
              </span>
            </div>
          ))}
        </div>

        {/* Analyse IA */}
        {loadingAI && (
          <div style={{
            padding: '20px', background: 'rgba(237,187,0,0.05)',
            border: '1px solid rgba(237,187,0,0.2)', borderRadius: '6px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              border: '2px solid rgba(237,187,0,0.3)', borderTopColor: 'var(--barca-gold)',
              animation: 'spin 0.8s linear infinite', flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
              Analyse tactique en cours...
            </span>
            <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          </div>
        )}

        {aiLoaded && aiAnalysis && (
          <div style={{
            padding: '20px 22px',
            background: 'linear-gradient(135deg,rgba(237,187,0,0.06),rgba(0,77,152,0.08))',
            border: '1px solid rgba(237,187,0,0.25)', borderRadius: '8px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px',
            }}>
              <span style={{ fontSize: '16px' }}>🤖</span>
              <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '11px', fontWeight: 700, color: 'var(--barca-gold)', letterSpacing: '0.08em' }}>
                ANALYSE IA — CLAUDE SONNET
              </span>
            </div>
            <div style={{
              fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.75,
              whiteSpace: 'pre-wrap', fontFamily: 'DM Sans,sans-serif',
            }}>
              {aiAnalysis}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
