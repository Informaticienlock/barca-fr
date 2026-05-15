'use client'
import { useState, useEffect } from 'react'

const MATCH_DATE = new Date('2026-05-31T21:00:00+02:00')

const TV_CHANNELS: Record<string, {name: string, flag: string, logo: string}[]> = {
  FR: [
    {name:'Canal+', flag:'🇫🇷', logo:'C+'},
    {name:'RMC Sport', flag:'🇫🇷', logo:'RMC'},
    {name:'beIN Sports', flag:'🇫🇷', logo:'bein'},
  ],
  ES: [
    {name:'Movistar+', flag:'🇪🇸', logo:'MOV'},
    {name:'La 1', flag:'🇪🇸', logo:'LA1'},
  ],
  DE: [
    {name:'DAZN', flag:'🇩🇪', logo:'DAZ'},
    {name:'ZDF', flag:'🇩🇪', logo:'ZDF'},
  ],
  GB: [
    {name:'TNT Sports', flag:'🇬🇧', logo:'TNT'},
    {name:'BT Sport', flag:'🇬🇧', logo:'BT'},
  ],
  US: [
    {name:'CBS Sports', flag:'🇺🇸', logo:'CBS'},
    {name:'Paramount+', flag:'🇺🇸', logo:'P+'},
    {name:'UniMás', flag:'🇺🇸', logo:'UNI'},
  ],
  DEFAULT: [
    {name:'DAZN', flag:'🌍', logo:'DAZ'},
    {name:'beIN Sports', flag:'🌍', logo:'bein'},
    {name:'Canal+', flag:'🌍', logo:'C+'},
  ],
}

type TimeLeft = {days:number, hours:number, minutes:number, seconds:number}

function getTimeLeft(): TimeLeft {
  const diff = MATCH_DATE.getTime() - Date.now()
  if (diff <= 0) return {days:0,hours:0,minutes:0,seconds:0}
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000)  / 60000),
    seconds: Math.floor((diff % 60000)    / 1000),
  }
}

function CountBox({value, label}: {value: number, label: string}) {
  return (
    <div style={{textAlign:'center',minWidth:'64px'}}>
      <div style={{
        background:'rgba(0,0,0,0.4)',
        border:'1px solid rgba(255,255,255,0.15)',
        borderRadius:'8px',
        padding:'10px 14px',
        fontFamily:'DM Mono,monospace',
        fontSize:'clamp(1.4rem,3vw,2rem)',
        fontWeight:700,
        color:'white',
        lineHeight:1,
        minWidth:'56px',
        position:'relative',
        overflow:'hidden',
      }}>
        <div style={{
          position:'absolute',top:'50%',left:0,right:0,
          height:'1px',background:'rgba(255,255,255,0.08)',
        }}/>
        {String(value).padStart(2,'0')}
      </div>
      <div style={{
        fontSize:'9px',fontFamily:'DM Mono,monospace',
        color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em',
        textTransform:'uppercase',marginTop:'6px',
      }}>{label}</div>
    </div>
  )
}

export default function MatchDayBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft())
  const [channels, setChannels] = useState(TV_CHANNELS.DEFAULT)
  const [country, setCountry] = useState<string|null>(null)
  const [isMatchDay, setIsMatchDay] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const t = getTimeLeft()
      setTimeLeft(t)
      setIsMatchDay(t.days === 0 && MATCH_DATE.getTime() > Date.now())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(data => {
        const cc = data.country_code as string
        setCountry(cc)
        setChannels(TV_CHANNELS[cc] || TV_CHANNELS.DEFAULT)
      })
      .catch(() => {
        setChannels(TV_CHANNELS.DEFAULT)
      })
  }, [])

  const isOver = MATCH_DATE.getTime() < Date.now()

  return (
    <div style={{
      background: isMatchDay
        ? 'linear-gradient(135deg,rgba(165,0,68,0.4),rgba(0,77,152,0.4))'
        : 'linear-gradient(135deg,rgba(0,77,152,0.15),rgba(165,0,68,0.15))',
      border:'1px solid var(--barca-border)',
      borderRadius:'8px',
      overflow:'hidden',
      marginBottom:'32px',
    }}>

      {/* Barre top */}
      <div style={{
        height:'3px',
        background:'linear-gradient(to right,var(--barca-blue),var(--barca-red),var(--barca-gold))',
      }}/>

      <div style={{padding:'24px 28px'}}>

        {/* Header */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            {isMatchDay && (
              <div style={{
                background:'var(--barca-red)',color:'white',
                fontFamily:'DM Mono,monospace',fontSize:'10px',fontWeight:700,
                letterSpacing:'0.12em',padding:'4px 10px',borderRadius:'2px',
                display:'flex',alignItems:'center',gap:'6px',
              }}>
                <span style={{width:'6px',height:'6px',background:'white',borderRadius:'50%',animation:'pulse 1s infinite'}}/>
                MATCH DAY
              </div>
            )}
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.08em'}}>
              UCL FINALE · ALLIANZ ARENA · MUNICH
            </div>
          </div>
          <div style={{fontSize:'12px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
            31 MAI 2026 · 21H00 CET
          </div>
        </div>

        {/* Match */}
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'24px',marginBottom:'24px',flexWrap:'wrap'}}>
          <div style={{textAlign:'center'}}>
            <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'linear-gradient(135deg,var(--barca-blue),#003070)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:'20px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'white',fontSize:'1rem'}}>FC Barcelone</div>
          </div>

          {/* Compte à rebours */}
          <div style={{textAlign:'center'}}>
            {isOver ? (
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.1rem',color:'var(--barca-gold)',fontWeight:700}}>
                Match terminé
              </div>
            ) : (
              <div style={{display:'flex',gap:'8px',alignItems:'flex-start',justifyContent:'center'}}>
                <CountBox value={timeLeft.days} label="Jours"/>
                <div style={{fontSize:'1.8rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.hours} label="Heures"/>
                <div style={{fontSize:'1.8rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.minutes} label="Minutes"/>
                <div style={{fontSize:'1.8rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.seconds} label="Secondes"/>
              </div>
            )}
            <div style={{marginTop:'8px',fontSize:'11px',color:'rgba(255,255,255,0.3)',fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>
              AVANT LE COUP D&apos;ENVOI
            </div>
          </div>

          <div style={{textAlign:'center'}}>
            <div style={{width:'52px',height:'52px',borderRadius:'50%',background:'linear-gradient(135deg,#003F8C,#001f5c)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 8px',fontSize:'20px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'var(--text-secondary)',fontSize:'1rem'}}>PSG</div>
          </div>
        </div>

        {/* Chaînes TV */}
        <div style={{borderTop:'1px solid var(--barca-border)',paddingTop:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.1em',flexShrink:0}}>
              📺 OÙ REGARDER {country ? `(${country})` : ''} :
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {channels.map((ch,i)=>(
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:'6px',
                  background:'rgba(255,255,255,0.06)',
                  border:'1px solid var(--barca-border)',
                  borderRadius:'4px',padding:'5px 12px',
                }}>
                  <span style={{fontSize:'14px'}}>{ch.flag}</span>
                  <span style={{
                    fontFamily:'DM Mono,monospace',fontSize:'11px',
                    fontWeight:700,color:'white',
                  }}>{ch.name}</span>
                </div>
              ))}
            </div>
            <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace',marginLeft:'auto'}}>
              🌐 Streaming : DAZN · UEFA TV
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
