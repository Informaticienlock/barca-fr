'use client'
import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip
} from 'recharts'

/* ── Types ── */
type StatCircle = { label: string; value: number; max: number; unit: string; color: string }
type Player = {
  id: number
  name: string
  fullName: string
  number: number
  position: string
  positionCode: string
  nationality: string
  age: number
  note: number
  photo: string
  stats: StatCircle[]
  radar: { subject: string; value: number; fullMark: number }[]
  quote: string
}

/* ── Données joueurs ── */
const PLAYERS: Player[] = [
  {
    id: 1,
    name: 'Casadó',
    fullName: 'Marc Casadó',
    number: 5,
    position: 'Milieu Défensif',
    positionCode: 'MDC',
    nationality: '🇪🇸',
    age: 21,
    note: 8.4,
    photo: 'MC',
    stats: [
      { label: 'Duels gagnés',     value: 14, max: 20, unit: '', color: '#004D98' },
      { label: 'Interceptions',    value: 6,  max: 10, unit: '', color: '#60a5fa' },
      { label: 'Passes réussies',  value: 68, max: 80, unit: '', color: '#EDBB00' },
      { label: 'Km parcourus',     value: 11.2, max: 14, unit: ' km', color: '#4ade80' },
      { label: 'Dribbles réussis', value: 4,  max: 6,  unit: '', color: '#f472b6' },
      { label: 'Récupérations',    value: 9,  max: 12, unit: '', color: '#a78bfa' },
    ],
    radar: [
      { subject: 'Duels',      value: 92, fullMark: 100 },
      { subject: 'Passes',     value: 88, fullMark: 100 },
      { subject: 'Pressing',   value: 95, fullMark: 100 },
      { subject: 'Dribbles',   value: 74, fullMark: 100 },
      { subject: 'Vision',     value: 81, fullMark: 100 },
      { subject: 'Défense',    value: 90, fullMark: 100 },
    ],
    quote: 'Métronome défensif. Casadó a étouffé les transitions madrilènes avec une intelligence de positionnement rare pour son âge.',
  },
  {
    id: 2,
    name: 'Yamal',
    fullName: 'Lamine Yamal',
    number: 19,
    position: 'Ailier Droit',
    positionCode: 'AD',
    nationality: '🇪🇸',
    age: 17,
    note: 9.1,
    photo: 'LY',
    stats: [
      { label: 'Dribbles réussis', value: 9,  max: 12, unit: '', color: '#004D98' },
      { label: 'Passes clés',      value: 5,  max: 8,  unit: '', color: '#60a5fa' },
      { label: 'Tirs',             value: 4,  max: 6,  unit: '', color: '#EDBB00' },
      { label: 'Km parcourus',     value: 10.8, max: 14, unit: ' km', color: '#4ade80' },
      { label: 'Duels offensifs',  value: 11, max: 14, unit: '', color: '#f472b6' },
      { label: 'Centres réussis',  value: 3,  max: 6,  unit: '', color: '#a78bfa' },
    ],
    radar: [
      { subject: 'Dribbles',  value: 97, fullMark: 100 },
      { subject: 'Vitesse',   value: 95, fullMark: 100 },
      { subject: 'Tirs',      value: 82, fullMark: 100 },
      { subject: 'Passes',    value: 86, fullMark: 100 },
      { subject: 'Défense',   value: 58, fullMark: 100 },
      { subject: 'Vision',    value: 88, fullMark: 100 },
    ],
    quote: 'Phénomène. À 17 ans, Yamal a humilié Carvajal et offert le but de la victoire sur un débordement de génie.',
  },
  {
    id: 3,
    name: 'Pedri',
    fullName: 'Pedro González',
    number: 8,
    position: 'Milieu Central',
    positionCode: 'MC',
    nationality: '🇪🇸',
    age: 23,
    note: 8.7,
    photo: 'PE',
    stats: [
      { label: 'Passes réussies',  value: 74, max: 90, unit: '', color: '#004D98' },
      { label: 'Passes clés',      value: 6,  max: 8,  unit: '', color: '#60a5fa' },
      { label: 'Dribbles réussis', value: 6,  max: 8,  unit: '', color: '#EDBB00' },
      { label: 'Km parcourus',     value: 12.1, max: 14, unit: ' km', color: '#4ade80' },
      { label: 'Tirs',             value: 3,  max: 6,  unit: '', color: '#f472b6' },
      { label: 'Duels gagnés',     value: 8,  max: 14, unit: '', color: '#a78bfa' },
    ],
    radar: [
      { subject: 'Passes',    value: 96, fullMark: 100 },
      { subject: 'Vision',    value: 94, fullMark: 100 },
      { subject: 'Dribbles',  value: 85, fullMark: 100 },
      { subject: 'Tirs',      value: 76, fullMark: 100 },
      { subject: 'Défense',   value: 72, fullMark: 100 },
      { subject: 'Duels',     value: 78, fullMark: 100 },
    ],
    quote: 'Maestro. Pedri a orchestré la domination barcelonaise avec 74 passes réussies et un but décisif en seconde période.',
  },
]

/* ── Cercle de progression ── */
function StatCircleComp({ stat, index }: { stat: StatCircle; index: number }) {
  const pct = Math.min((stat.value / stat.max) * 100, 100)
  const r = 28
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
      animationDelay: `${index * 0.08}s`,
    }}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
          <circle
            cx="40" cy="40" r={r} fill="none"
            stroke={stat.color} strokeWidth="5"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: stat.unit ? '13px' : '16px', fontWeight: 800,
            fontFamily: 'DM Mono, monospace', color: 'white', lineHeight: 1,
          }}>
            {stat.value}{stat.unit}
          </span>
          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', fontFamily: 'DM Mono,monospace' }}>
            /{stat.max}{stat.unit}
          </span>
        </div>
      </div>
      <span style={{
        fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace',
        textAlign: 'center', letterSpacing: '0.04em', maxWidth: '72px', lineHeight: 1.3,
      }}>{stat.label}</span>
    </div>
  )
}

/* ── Tooltip radar ── */
function RadarTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(10,15,30,0.95)', border: '1px solid var(--barca-border)',
      borderRadius: '6px', padding: '8px 12px', fontSize: '12px',
    }}>
      <span style={{ color: '#EDBB00', fontFamily: 'DM Mono,monospace', fontWeight: 700 }}>
        {payload[0].payload.subject} : {payload[0].value}
      </span>
    </div>
  )
}

/* ── Composant principal ── */
export default function FocusJoueur() {
  const [selected, setSelected] = useState<number>(0)
  const [view, setView] = useState<'circles' | 'radar'>('circles')
  const player = PLAYERS[selected]

  return (
    <div style={{
      background: 'var(--barca-card)', border: '1px solid var(--barca-border)',
      borderRadius: '8px', overflow: 'hidden',
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(237,187,0,0.12),rgba(0,77,152,0.2))',
        padding: '18px 22px', borderBottom: '1px solid var(--barca-border)',
      }}>
        <div style={{ fontFamily: 'DM Mono,monospace', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: '4px' }}>
          FOCUS JOUEUR · PERFORMANCE INDIVIDUELLE
        </div>
        <div style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.05rem', fontWeight: 700, color: 'white' }}>
          Duel de Match — <span style={{ color: 'var(--barca-gold)' }}>Analyse Individuelle</span>
        </div>
      </div>

      {/* Sélecteur joueurs */}
      <div style={{
        display: 'flex', gap: '10px', padding: '16px 22px',
        borderBottom: '1px solid var(--barca-border)', flexWrap: 'wrap',
      }}>
        {PLAYERS.map((p, i) => (
          <button key={p.id} onClick={() => setSelected(i)} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 16px', borderRadius: '6px', border: '1px solid',
            borderColor: selected === i ? 'var(--barca-blue)' : 'var(--barca-border)',
            background: selected === i ? 'rgba(0,77,152,0.15)' : 'rgba(255,255,255,0.03)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {/* Avatar */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: selected === i
                ? 'linear-gradient(135deg,#004D98,#EDBB00)'
                : 'linear-gradient(135deg,rgba(0,77,152,0.4),rgba(237,187,0,0.2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 800, color: 'white',
              fontFamily: 'DM Mono,monospace', flexShrink: 0,
              border: selected === i ? '2px solid rgba(237,187,0,0.5)' : '2px solid rgba(255,255,255,0.1)',
            }}>
              {p.photo}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'DM Mono,monospace', fontSize: '12px', fontWeight: 700,
                color: selected === i ? 'white' : 'var(--text-secondary)',
              }}>{p.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>
                #{p.number} · {p.positionCode}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '24px' }}>

        {/* Carte joueur */}
        <div style={{
          display: 'flex', gap: '20px', alignItems: 'flex-start',
          marginBottom: '28px', flexWrap: 'wrap',
        }}>
          {/* Grand avatar */}
          <div style={{
            width: '90px', height: '90px', borderRadius: '10px', flexShrink: 0,
            background: 'linear-gradient(145deg,#003070,#004D98,rgba(237,187,0,0.3))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px', fontWeight: 900, color: 'white',
            fontFamily: 'DM Mono,monospace',
            border: '2px solid rgba(237,187,0,0.3)',
            boxShadow: '0 8px 32px rgba(0,77,152,0.4)',
          }}>
            {player.photo}
          </div>

          {/* Infos */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Playfair Display,serif', fontSize: '1.4rem', fontWeight: 900, color: 'white' }}>
                {player.fullName}
              </span>
              <span style={{ fontSize: '18px' }}>{player.nationality}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {[
                { label: player.position, color: 'rgba(0,77,152,0.3)', border: 'rgba(0,77,152,0.6)' },
                { label: `${player.age} ans`, color: 'rgba(237,187,0,0.1)', border: 'rgba(237,187,0,0.4)' },
                { label: `#${player.number}`, color: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)' },
              ].map((tag, i) => (
                <span key={i} style={{
                  fontSize: '11px', fontFamily: 'DM Mono,monospace',
                  color: 'rgba(255,255,255,0.8)', padding: '3px 10px',
                  background: tag.color, border: `1px solid ${tag.border}`,
                  borderRadius: '4px',
                }}>{tag.label}</span>
              ))}
            </div>
            {/* Note */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                fontFamily: 'DM Mono,monospace', fontSize: '2.2rem', fontWeight: 900,
                color: player.note >= 9 ? '#EDBB00' : player.note >= 8 ? '#4ade80' : 'white',
                lineHeight: 1,
              }}>{player.note}</div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace' }}>NOTE DU MATCH</div>
                <div style={{ display: 'flex', gap: '2px', marginTop: '3px' }}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <div key={n} style={{
                      width: '14px', height: '4px', borderRadius: '2px',
                      background: n <= Math.round(player.note)
                        ? (player.note >= 9 ? '#EDBB00' : '#004D98')
                        : 'rgba(255,255,255,0.08)',
                      transition: 'background 0.3s',
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Citation */}
          <div style={{
            flex: '0 0 100%', padding: '12px 16px',
            background: 'rgba(237,187,0,0.06)', borderLeft: '3px solid var(--barca-gold)',
            borderRadius: '0 4px 4px 0',
            fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6,
            fontStyle: 'italic',
          }}>
            "{player.quote}"
          </div>
        </div>

        {/* Toggle vue */}
        <div style={{
          display: 'flex', gap: '0', marginBottom: '24px',
          border: '1px solid var(--barca-border)', borderRadius: '6px',
          overflow: 'hidden', width: 'fit-content',
        }}>
          {([['circles', '⬤ PROGRESSION'], ['radar', '🔷 RADAR']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setView(key)} style={{
              padding: '9px 20px', border: 'none', cursor: 'pointer',
              background: view === key ? 'rgba(0,77,152,0.2)' : 'transparent',
              color: view === key ? 'white' : 'var(--text-muted)',
              fontFamily: 'DM Mono,monospace', fontSize: '10px', fontWeight: 700,
              letterSpacing: '0.06em', transition: 'all 0.2s',
              borderRight: key === 'circles' ? '1px solid var(--barca-border)' : 'none',
            }}>{label}</button>
          ))}
        </div>

        {/* Cercles de progression */}
        {view === 'circles' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: '16px',
          }}>
            {player.stats.map((stat, i) => (
              <StatCircleComp key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        )}

        {/* Radar */}
        {view === 'radar' && (
          <div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={player.radar} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.6)', fontFamily: 'DM Mono,monospace' }}
                />
                <Tooltip content={<RadarTooltip />} />
                <Radar
                  name={player.name}
                  dataKey="value"
                  stroke="#004D98"
                  fill="#004D98"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={{ fill: '#EDBB00', r: 4, strokeWidth: 0 }}
                />
              </RadarChart>
            </ResponsiveContainer>
            {/* Légende radar */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px',
              marginTop: '8px',
            }}>
              {player.radar.map(r => (
                <div key={r.subject} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 12px', background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--barca-border)', borderRadius: '4px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'DM Mono,monospace', marginBottom: '4px' }}>
                      {r.subject}
                    </div>
                    <div style={{
                      height: '4px', borderRadius: '2px',
                      background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${r.value}%`, height: '100%',
                        background: r.value >= 90 ? '#EDBB00' : r.value >= 75 ? '#004D98' : '#60a5fa',
                        borderRadius: '2px', transition: 'width 0.8s ease',
                      }} />
                    </div>
                  </div>
                  <span style={{
                    fontFamily: 'DM Mono,monospace', fontSize: '13px', fontWeight: 800,
                    color: r.value >= 90 ? '#EDBB00' : 'white',
                  }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
