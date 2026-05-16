'use client'
import { useState, useEffect } from 'react'

const MATCH_DATE = new Date('2026-05-31T21:00:00+02:00')

const TV_CHANNELS: Record<string, {name: string, flag: string}[]> = {
  FR: [{name:'Canal+',flag:'🇫🇷'},{name:'RMC Sport',flag:'🇫🇷'},{name:'beIN Sports',flag:'🇫🇷'}],
  ES: [{name:'Movistar+',flag:'🇪🇸'},{name:'La 1',flag:'🇪🇸'}],
  DE: [{name:'DAZN',flag:'🇩🇪'},{name:'ZDF',flag:'🇩🇪'}],
  GB: [{name:'TNT Sports',flag:'🇬🇧'},{name:'BT Sport',flag:'🇬🇧'}],
  US: [{name:'CBS Sports',flag:'🇺🇸'},{name:'Paramount+',flag:'🇺🇸'}],
  DEFAULT: [{name:'DAZN',flag:'🌍'},{name:'beIN Sports',flag:'🌍'},{name:'Canal+',flag:'🌍'}],
}

type TimeLeft = {days:number, hours:number, minutes:number, seconds:number}

function getTimeLeft(): TimeLeft {
  const diff = MATCH_DATE.getTime() - Date.now()
  if (diff <= 0) return {days:0,hours:0,minutes:0,seconds:0}
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function CountBox({value, label}: {value: number, label: string}) {
  return (
    <div style={{textAlign:'center'}}>
      <div style={{
        background:'rgba(0,0,0,0.4)',
        border:'1px solid rgba(255,255,255,0.15)',
        borderRadius:'8px',
        padding:'10px 14px',
        fontFamily:'DM Mono,monospace',
        fontSize:'clamp(1.3rem,3vw,2rem)',
        fontWeight:700,
        color:'white',
        lineHeight:1,
        minWidth:'52px',
      }}>
        {String(value).padStart(2,'0')}
      </div>
      <div style={{fontSize:'9px',fontFamily:'DM Mono,monospace',color:'rgba(255,255,255,0.5)',letterSpacing:'0.12em',textTransform:'uppercase',marginTop:'6px'}}>{label}</div>
    </div>
  )
}

export default function MatchDayBanner() {
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({days:0,hours:0,minutes:0,seconds:0})
  const [channels, setChannels] = useState(TV_CHANNELS.DEFAULT)
  const [country, setCountry] = useState<string|null>(null)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeLeft())
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(r=>r.json())
      .then(data=>{
        const cc = data.country_code as string
        setCountry(cc)
        setChannels(TV_CHANNELS[cc] || TV_CHANNELS.DEFAULT)
      })
      .catch(()=>setChannels(TV_CHANNELS.DEFAULT))
  }, [])

  const isOver = MATCH_DATE.getTime() < Date.now()
  const isMatchDay = mounted && timeLeft.days === 0 && !isOver

  return (
    <div style={{
      background:isMatchDay?'linear-gradient(135deg,rgba(165,0,68,0.4),rgba(0,77,152,0.4))':'linear-gradient(135deg,rgba(0,77,152,0.15),rgba(165,0,68,0.15))',
      border:'1px solid var(--barca-border)',
      borderRadius:'8px',
      overflow:'hidden',
      marginBottom:'32px',
    }}>
      <div style={{height:'3px',background:'linear-gradient(to right,var(--barca-blue),var(--barca-red),var(--barca-gold))'}}/>
      <div style={{padding:'24px 20px'}}>

        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px',flexWrap:'wrap',gap:'8px'}}>
          <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.08em'}}>
            UCL FINALE · ALLIANZ ARENA · MUNICH
          </div>
          <div style={{fontSize:'11px',color:'var(--text-muted)',fontFamily:'DM Mono,monospace'}}>
            31 MAI 2026 · 21H00 CET
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'24px',flexWrap:'wrap'}}>
          <div style={{textAlign:'center'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,var(--barca-blue),#003070)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px',fontSize:'18px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'white',fontSize:'0.95rem'}}>FC Barcelone</div>
          </div>

          <div style={{textAlign:'center'}}>
            {!mounted ? (
              <div style={{fontFamily:'DM Mono,monospace',fontSize:'13px',color:'var(--text-muted)'}}>Chargement...</div>
            ) : isOver ? (
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1rem',color:'var(--barca-gold)',fontWeight:700}}>Match terminé</div>
            ) : (
              <div style={{display:'flex',gap:'6px',alignItems:'flex-start',justifyContent:'center'}}>
                <CountBox value={timeLeft.days} label="Jours"/>
                <div style={{fontSize:'1.5rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.hours} label="Heures"/>
                <div style={{fontSize:'1.5rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.minutes} label="Min"/>
                <div style={{fontSize:'1.5rem',color:'rgba(255,255,255,0.3)',marginTop:'8px',fontWeight:300}}>:</div>
                <CountBox value={timeLeft.seconds} label="Sec"/>
              </div>
            )}
            <div style={{marginTop:'6px',fontSize:'10px',color:'rgba(255,255,255,0.3)',fontFamily:'DM Mono,monospace',letterSpacing:'0.06em'}}>
              AVANT LE COUP D&apos;ENVOI
            </div>
          </div>

          <div style={{textAlign:'center'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'linear-gradient(135deg,#003F8C,#001f5c)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 6px',fontSize:'18px'}}>⚽</div>
            <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'var(--text-secondary)',fontSize:'0.95rem'}}>PSG</div>
          </div>
        </div>

        <div style={{borderTop:'1px solid var(--barca-border)',paddingTop:'14px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
            <div style={{fontFamily:'DM Mono,monospace',fontSize:'10px',color:'var(--text-muted)',letterSpacing:'0.08em',flexShrink:0}}>
              📺 OÙ REGARDER {country?`(${country})`:''}:
            </div>
            <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
              {channels.map((ch,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px',background:'rgba(255,255,255,0.06)',border:'1px solid var(--barca-border)',borderRadius:'4px',padding:'4px 10px'}}>
                  <span style={{fontSize:'13px'}}>{ch.flag}</span>
                  <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',fontWeight:700,color:'white'}}>{ch.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
