'use client'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

/* ── Types ── */
type Competition = 'toutes' | 'liga' | 'ucl'
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

/* ── Données ── */
const MATCH_DATA: MatchData[] = [
  { match: 'J23', date: '18 jan', adversaire: 'Getafe',     resultat: '3-0', possession: 68, tirsConcedesCadres: 1, tauxConversion: 42, competition: 'liga' },
  { match: 'J24', date: '25 jan', adversaire: 'Atlético',   resultat: '1-1', possession: 54, tirsConcedesCadres: 4, tauxConversion: 28, competition: 'liga' },
  { match: 'UCL1',date: '4 fév',  adversaire: 'Benfica',    resultat: '2-0', possession: 61, tirsConcedesCadres: 2, tauxConversion: 35, competition: 'ucl'  },
  { match: 'J25', date: '8 fév',  adversaire: 'Séville',    resultat: '4-1', possession: 70, tirsConcedesCadres: 1, tauxConversion: 50, competition: 'liga' },
  { match: 'UCL2',date: '19 fév', adversaire: 'Benfica R',  resultat: '1-0', possession: 58, tirsConcedesCadres: 3, tauxConversion: 31, competition: 'ucl'  },
  { match: 'J26', date: '22 fév', adversaire: 'Villarreal', resultat: '2-0', possession: 65, tirsConcedesCadres: 2, tauxConversion: 38, competition: 'liga' },
  { match: 'UCL3',date: '5 mar',  adversaire: 'Dortmund',   resultat: '3-1', possession: 63, tirsConcedesCadres: 3, tauxConversion: 44, competition: 'ucl'  },
  { match: 'J27', date: '9 mar',  adversaire: 'Betis',      resultat: '1-0', possession: 62, tirsConcedesCadres: 3, tauxConversion: 22, competition: 'liga' },
  { match: 'J28', date: '16 mar', adversaire: 'Valence',    resultat: '5-1', possession: 72, tirsConcedesCadres: 1, tauxConversion: 56, competition: 'liga' },
  { match: 'UCL4',date: '9 avr',  adversaire: 'Inter',      resultat: '2-2', possession: 55, tirsConcedesCadres: 5, tauxConversion: 29, competition: 'ucl'  },
  { match: 'J29', date: '13 avr', adversaire: 'Rayo',       resultat: '3-0', possession: 69, tirsConcedesCadres: 1, tauxConversion: 46, competition: 'liga' },
  { match: 'J32', date: '20 avr', adversaire: 'Real Mad.',  resultat: '3-1', possession: 64, tirsConcedesCadres: 3, tauxConversion: 40, competition: 'liga' },
]

/* ── Tooltip ── */
function CustomTooltip({ active, payload, label, allData }: any) {
  if (!active || !payload?.length) return null
  const match = allData.find((m: MatchData) => m.match === label)
  return (
    <div style={{
      background: 'rgba(10,15,30,0.97)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', padding: '12px 16px', fontSize: '12px', minWidth: '180px',
    }}>
      <div style={{ fontFamily: 'DM Mono,monospace', color: 'var(--barca-gold)', fontWeight: 700, marginBottom: '4px' }}>
        {label} · {match?.adversaire}
      </div>
      <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'DM Mono,monospace' }}>
        {match?.date} ·{' '}
        <span style={{ color: match?.resultat.startsWith('1-1') || match?.resultat.startsWith('2-2') ? '#EDBB00' : '#4ade80' }}>
          {match?.resultat}
        </span>
        {' '}·{' '}
        <span style={{ color: match?.competition === 'liga' ? '#60a5fa' : '#a78bfa', textTransform: 'uppercase' }}>
          {match?.competition}
        </span>
      </div>
      {payload.map((p: any) => (
        <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color, flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '11px' }}>{p.name} :</span>
          <span style={{ color: p.color, fontFamily: 'DM Mono,monospace', fontWeight: 700 }}>
            {p.value}{p.name.includes('Possession') || p.name.includes('Conversion') ? '%' : ''}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ── Graphique individuel ── */
function TrendChart({
  data, dataKey, name, color, unit, yDomain, label, allData
}: {
  data: MatchData[], dataKey: keyof MatchData, name: string,
  color: string, unit: string, yDomain: [number, number],
  label: string, allData: MatchData[]
}) {
  const avg = (data.reduce((s, m) => s + (m[dataKey] as number), 0) / data.length).toFixed(1)
  const last3 = data.slice(-3)
  const last3avg = (last3.reduce((s, m) => s + (m[dataKey] as number), 0) / last3.length).toFixed(1)
  const diff = parseFloat(last3avg) - parseFloat(avg)
  const isPositiveMetric = dataKey !== 'tirsConcedesCadres'
  const trendUp = diff > 0
  const trendColor = (isPositiveMetric ? trendUp : !trendUp) ? '#4ade80' : diff === 0 ? 'var(--text-muted)' : '#f87171'
  const trendIcon = diff > 0.2 ? '↑' : diff < -0.2 ? '↓' : '→'

  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', padding: '18px 20px', marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '6px' }}>
            {label}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.7rem', fontWeight: 900, color, lineHeight: 1 }}>
              {avg}{unit}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>moy.</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>
            TENDANCE 3 DERNIERS
          </div>
          <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.1rem', fontWeight: 800, color: trendColor }}>
            {trendIcon} {last3avg}{unit}
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={150}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="match"
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono,monospace' }}
            stroke="rgba(255,255,255,0.07)"
          />
          <YAxis
            domain={yDomain}
            tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono,monospace' }}
            stroke="rgba(255,255,255,0.07)"
          />
          <Tooltip content={<CustomTooltip allData={allData} />} />
          <Line
            type="monotone" dataKey={dataKey as string} name={name}
            stroke={color} strokeWidth={2.5}
            dot={{ fill: color, r: 3, strokeWidth: 0 }}
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

  const filtered = competition === 'toutes'
    ? MATCH_DATA
    : MATCH_DATA.filter(m => m.competition === competition)

  /* ── Insights automatiques ── */
  const avgPossession = (filtered.reduce((s, m) => s + m.possession, 0) / filtered.length).toFixed(0)
  const avgTirs = (filtered.reduce((s, m) => s + m.tirsConcedesCadres, 0) / filtered.length).toFixed(1)
  const avgConversion = (filtered.reduce((s, m) => s + m.tauxConversion, 0) / filtered.length).toFixed(0)
  const last3Possession = (filtered.slice(-3).reduce((s, m) => s + m.possession, 0) / 3).toFixed(0)
  const last3Tirs = (filtered.slice(-3).reduce((s, m) => s + m.tirsConcedesCadres, 0) / 3).toFixed(1)

  const insights = [
    {
      icon: '⚽',
      color: '#004D98',
      text: parseFloat(last3Possession) > parseFloat(avgPossession)
        ? `La possession progresse sur les 3 derniers matchs (${last3Possession}% vs ${avgPossession}% de moyenne).`
        : `Légère baisse de possession récente (${last3Possession}% vs ${avgPossession}% de moy.).`,
    },
    {
      icon: '🛡️',
      color: parseFloat(last3Tirs) <= parseFloat(avgTirs) ? '#4ade80' : '#f87171',
      text: parseFloat(last3Tirs) <= parseFloat(avgTirs)
        ? `Solidité défensive : seulement ${last3Tirs} tirs cadrés concédés en moy. sur les 3 derniers matchs.`
        : `Signal d'alerte : ${last3Tirs} tirs cadrés concédés en moy. récemment (${avgTirs} sur la période).`,
    },
    {
      icon: '🎯',
      color: '#EDBB00',
      text: `Efficacité offensive à ${avgConversion}% en moyenne — ${parseFloat(avgConversion) >= 40 ? 'niveau élite maintenu.' : 'marge de progression identifiée.'}`,
    },
  ]

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

      {/* Filtre compétition */}
      <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--barca-border)' }}>
        <div style={{ display: 'flex', gap: '0', border: '1px solid var(--barca-border)', borderRadius: '6px', overflow: 'hidden', width: 'fit-content' }}>
          {([['toutes', 'TOUTES'], ['liga', '🇪🇸 LIGA'], ['ucl', '⭐ UCL']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setCompetition(key)} style={{
              padding: '8px 16px', border: 'none', cursor: 'pointer',
              background: competition === key ? 'rgba(0,77,152,0.2)' : 'transparent',
              color: competition === key ? 'white' : 'var(--text-muted)',
              fontFamily: 'DM Mono,monospace', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.06em', transition: 'all 0.2s',
              borderRight: key !== 'ucl' ? '1px solid var(--barca-border)' : 'none',
            }}>{label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px' }}>

        {/* KPIs rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'POSSESSION MOY.', value: `${avgPossession}%`, color: '#004D98' },
            { label: 'TIRS CONCÉDÉS MOY.', value: avgTirs, color: '#f87171' },
            { label: 'CONVERSION MOY.', value: `${avgConversion}%`, color: '#EDBB00' },
          ].map((kpi, i) => (
            <div key={i} style={{
              padding: '14px', background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--barca-border)', borderRadius: '6px', textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', letterSpacing: '0.06em' }}>
                {kpi.label}
              </div>
              <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '1.5rem', fontWeight: 900, color: kpi.color }}>
                {kpi.value}
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <TrendChart
          data={filtered} dataKey="possession" name="Possession"
          color="#004D98" unit="%" yDomain={[40, 80]}
          label="POSSESSION MOYENNE (%)" allData={filtered}
        />
        <TrendChart
          data={filtered} dataKey="tirsConcedesCadres" name="Tirs concédés cadrés"
          color="#f87171" unit="" yDomain={[0, 8]}
          label="TIRS CADRÉS CONCÉDÉS" allData={filtered}
        />
        <TrendChart
          data={filtered} dataKey="tauxConversion" name="Taux de conversion"
          color="#EDBB00" unit="%" yDomain={[0, 70]}
          label="TAUX DE CONVERSION DES OCCASIONS (%)" allData={filtered}
        />

        {/* Insights automatiques */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em', marginBottom: '12px' }}>
            INSIGHTS AUTOMATIQUES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {insights.map((ins, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '12px 14px', background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${ins.color}30`, borderLeft: `3px solid ${ins.color}`,
                borderRadius: '0 4px 4px 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6,
              }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>{ins.icon}</span>
                <span>{ins.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
