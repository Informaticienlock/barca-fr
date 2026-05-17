'use client'
import { useState } from 'react'

/* ── Types ── */
type TypeTransfert = 'Transfert' | 'Prêt' | 'Fin de contrat' | 'Gratuit'
type StatutTransfert = 'Officiel' | 'En négociation' | 'Accord trouvé'

type Transfert = {
  id: number
  joueur: string
  age: number
  nationalite: string
  poste: string
  positionCode: string
  clubDepart: string
  clubArrivee: string
  type: TypeTransfert
  montant: string
  statut: StatutTransfert
  date: string
}

const ARRIVEES: Transfert[] = [
  { id:1, joueur:'Dani Olmo',        age:26, nationalite:'🇪🇸', poste:'Milieu Offensif',   positionCode:'CAM', clubDepart:'RB Leipzig',        clubArrivee:'FC Barcelone', type:'Transfert',      montant:'55 M€', statut:'Officiel',        date:'17 mai 2026' },
  { id:2, joueur:'Alphonso Davies',  age:24, nationalite:'🇨🇦', poste:'Latéral Gauche',    positionCode:'LB',  clubDepart:'Bayern Munich',      clubArrivee:'FC Barcelone', type:'Fin de contrat', montant:'0 M€',  statut:'Accord trouvé',   date:'16 mai 2026' },
  { id:3, joueur:'Jonathan Tah',     age:28, nationalite:'🇩🇪', poste:'Défenseur Central', positionCode:'CB',  clubDepart:'Bayer Leverkusen',   clubArrivee:'FC Barcelone', type:'Fin de contrat', montant:'0 M€',  statut:'En négociation',  date:'15 mai 2026' },
  { id:4, joueur:'Nico Williams',    age:22, nationalite:'🇪🇸', poste:'Ailier Gauche',     positionCode:'LW',  clubDepart:'Athletic Club',      clubArrivee:'FC Barcelone', type:'Transfert',      montant:'58 M€', statut:'En négociation',  date:'14 mai 2026' },
]

const DEPARTS: Transfert[] = [
  { id:5, joueur:'Sergi Roberto',   age:32, nationalite:'🇪🇸', poste:'Milieu / Latéral',  positionCode:'MF',  clubDepart:'FC Barcelone', clubArrivee:'Non défini',   type:'Fin de contrat', montant:'0 M€',  statut:'Officiel',       date:'1 juin 2026'  },
  { id:6, joueur:'Vitor Roque',     age:19, nationalite:'🇧🇷', poste:'Avant-Centre',       positionCode:'ST',  clubDepart:'FC Barcelone', clubArrivee:'Betis (prêt)', type:'Prêt',           montant:'0 M€',  statut:'Officiel',       date:'10 mai 2026'  },
  { id:7, joueur:'Ansu Fati',       age:22, nationalite:'🇪🇸', poste:'Ailier Gauche',      positionCode:'LW',  clubDepart:'FC Barcelone', clubArrivee:'Non défini',   type:'Transfert',      montant:'25 M€', statut:'En négociation', date:'12 mai 2026'  },
  { id:8, joueur:'Clément Lenglet', age:29, nationalite:'🇫🇷', poste:'Défenseur Central',  positionCode:'CB',  clubDepart:'FC Barcelone', clubArrivee:'Non défini',   type:'Fin de contrat', montant:'0 M€',  statut:'Officiel',       date:'1 juin 2026'  },
]

const STATUT_CONFIG: Record<StatutTransfert, { color: string; bg: string; border: string }> = {
  'Officiel':       { color: '#4ade80', bg: 'rgba(74,222,128,0.12)',  border: 'rgba(74,222,128,0.3)'  },
  'Accord trouvé':  { color: '#EDBB00', bg: 'rgba(237,187,0,0.12)',   border: 'rgba(237,187,0,0.3)'   },
  'En négociation': { color: '#60a5fa', bg: 'rgba(96,165,250,0.12)',  border: 'rgba(96,165,250,0.3)'  },
}

const TYPE_CONFIG: Record<TypeTransfert, { color: string; bg: string }> = {
  'Transfert':      { color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  'Prêt':           { color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
  'Fin de contrat': { color: '#94a3b8', bg: 'rgba(148,163,184,0.10)' },
  'Gratuit':        { color: '#4ade80', bg: 'rgba(74,222,128,0.10)'  },
}

function LigneTransfert({ t, isArrivee }: { t: Transfert; isArrivee: boolean }) {
  const statut = STATUT_CONFIG[t.statut]
  const type   = TYPE_CONFIG[t.type]
  const initiales = t.joueur.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div style={{ display:'grid', gridTemplateColumns:'40px 1fr 1fr 100px 80px 90px', alignItems:'center', gap:'12px', padding:'12px 16px', borderBottom:'1px solid var(--barca-border)', transition:'background 0.15s' }}
      onMouseEnter={e=>(e.currentTarget.style.background='rgba(255,255,255,0.02)')}
      onMouseLeave={e=>(e.currentTarget.style.background='transparent')}
    >
      <div style={{ width:'36px', height:'36px', borderRadius:'6px', flexShrink:0, background: isArrivee ? 'linear-gradient(135deg,rgba(0,77,152,0.5),rgba(0,77,152,0.2))' : 'linear-gradient(135deg,rgba(165,0,68,0.5),rgba(165,0,68,0.2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:'rgba(255,255,255,0.7)', fontFamily:'DM Mono,monospace', border:`1px solid ${isArrivee?'rgba(0,77,152,0.4)':'rgba(165,0,68,0.4)'}` }}>
        {initiales}
      </div>
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'2px' }}>
          <span style={{ fontSize:'13px', fontWeight:700, color:'white', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.joueur}</span>
          <span style={{ fontSize:'12px', flexShrink:0 }}>{t.nationalite}</span>
        </div>
        <div style={{ display:'flex', gap:'5px', alignItems:'center' }}>
          <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', background:'rgba(255,255,255,0.05)', padding:'1px 5px', borderRadius:'3px' }}>{t.positionCode}</span>
          <span style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>{t.age} ans</span>
        </div>
      </div>
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <span style={{ fontSize:'11px', color:'var(--text-secondary)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.clubDepart}</span>
          <span style={{ fontSize:'10px', color: isArrivee?'#4ade80':'#f87171', flexShrink:0 }}>{isArrivee?'→':'←'}</span>
          <span style={{ fontSize:'11px', color:'white', fontWeight:600, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.clubArrivee}</span>
        </div>
        <div style={{ fontSize:'10px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace', marginTop:'2px' }}>{t.date}</div>
      </div>
      <div>
        <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:type.color, background:type.bg, padding:'3px 7px', borderRadius:'3px', whiteSpace:'nowrap' }}>{t.type}</span>
      </div>
      <div style={{ fontFamily:'DM Mono,monospace', fontSize:'13px', fontWeight:900, color: t.montant==='0 M€'?'var(--text-muted)':'var(--barca-gold)', textAlign:'right' }}>
        {t.montant}
      </div>
      <div style={{ textAlign:'right' }}>
        <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:statut.color, background:statut.bg, border:`1px solid ${statut.border}`, padding:'3px 7px', borderRadius:'3px', whiteSpace:'nowrap' }}>{t.statut}</span>
      </div>
    </div>
  )
}

function LigneMobile({ t, isArrivee }: { t: Transfert; isArrivee: boolean }) {
  const statut = STATUT_CONFIG[t.statut]
  const type   = TYPE_CONFIG[t.type]
  const initiales = t.joueur.split(' ').map(w => w[0]).join('').slice(0, 2)
  return (
    <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--barca-border)' }}>
      <div style={{ display:'flex', alignItems:'flex-start', gap:'10px' }}>
        <div style={{ width:'38px', height:'38px', borderRadius:'6px', flexShrink:0, background: isArrivee?'linear-gradient(135deg,rgba(0,77,152,0.5),rgba(0,77,152,0.2))':'linear-gradient(135deg,rgba(165,0,68,0.5),rgba(165,0,68,0.2))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:900, color:'rgba(255,255,255,0.7)', fontFamily:'DM Mono,monospace', border:`1px solid ${isArrivee?'rgba(0,77,152,0.4)':'rgba(165,0,68,0.4)'}` }}>
          {initiales}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'6px', marginBottom:'4px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5px' }}>
              <span style={{ fontSize:'13px', fontWeight:700, color:'white' }}>{t.joueur}</span>
              <span>{t.nationalite}</span>
            </div>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:statut.color, background:statut.bg, border:`1px solid ${statut.border}`, padding:'2px 6px', borderRadius:'3px', flexShrink:0 }}>{t.statut}</span>
          </div>
          <div style={{ fontSize:'11px', color:'var(--text-secondary)', marginBottom:'6px' }}>
            {t.clubDepart} <span style={{ color: isArrivee?'#4ade80':'#f87171' }}>{isArrivee?'→':'←'}</span> {t.clubArrivee}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'8px', flexWrap:'wrap' }}>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', background:'rgba(255,255,255,0.05)', padding:'2px 6px', borderRadius:'3px' }}>{t.positionCode} · {t.age} ans</span>
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', fontWeight:700, color:type.color, background:type.bg, padding:'2px 6px', borderRadius:'3px' }}>{t.type}</span>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'12px', fontWeight:900, color: t.montant==='0 M€'?'var(--text-muted)':'var(--barca-gold)', marginLeft:'auto' }}>{t.montant}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TableauTransferts() {
  const [onglet, setOnglet] = useState<'arrivees'|'departs'>('arrivees')
  const data = onglet === 'arrivees' ? ARRIVEES : DEPARTS
  const officiels   = data.filter(t => t.statut === 'Officiel').length
  const enCours     = data.filter(t => t.statut !== 'Officiel').length
  const budgetTotal = data.filter(t => t.montant !== '0 M€').reduce((s,t) => s + parseFloat(t.montant), 0)

  return (
    <div style={{ background:'var(--barca-card)', border:'1px solid var(--barca-border)', borderRadius:'8px', overflow:'hidden' }}>

      <div style={{ background:'linear-gradient(135deg,rgba(0,77,152,0.15),rgba(165,0,68,0.15))', padding:'18px 22px', borderBottom:'1px solid var(--barca-border)' }}>
        <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'var(--text-muted)', letterSpacing:'0.1em', marginBottom:'4px' }}>TABLEAU DES TRANSFERTS · MERCATO ÉTÉ 2026</div>
        <div style={{ fontFamily:'Playfair Display,serif', fontSize:'1.05rem', fontWeight:700, color:'white' }}>
          Arrivées & Départs — <span style={{ color:'var(--barca-gold)' }}>FC Barcelone</span>
        </div>
      </div>

      <div style={{ display:'flex', borderBottom:'1px solid var(--barca-border)' }}>
        {([['arrivees','⬆ ARRIVÉES',ARRIVEES.length],['departs','⬇ DÉPARTS',DEPARTS.length]] as const).map(([key,label,count])=>(
          <button key={key} onClick={()=>setOnglet(key)} style={{ flex:1, padding:'13px 16px', border:'none', cursor:'pointer', background: onglet===key ? (key==='arrivees'?'rgba(0,77,152,0.12)':'rgba(165,0,68,0.12)') : 'transparent', color: onglet===key?'white':'var(--text-muted)', fontFamily:'DM Mono,monospace', fontSize:'11px', fontWeight:700, letterSpacing:'0.06em', borderBottom: onglet===key ? `2px solid ${key==='arrivees'?'var(--barca-blue)':'var(--barca-red)'}` : '2px solid transparent', transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
            {label}
            <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', background: onglet===key?(key==='arrivees'?'rgba(0,77,152,0.3)':'rgba(165,0,68,0.3)'):'rgba(255,255,255,0.08)', color: onglet===key?'white':'var(--text-muted)', padding:'1px 6px', borderRadius:'10px' }}>{count}</span>
          </button>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', borderBottom:'1px solid var(--barca-border)' }}>
        {[
          { label:'OFFICIELS', value:officiels,  color:'#4ade80' },
          { label:'EN COURS',  value:enCours,    color:'#60a5fa' },
          { label:'BUDGET',    value: budgetTotal>0?`${budgetTotal} M€`:'Gratuit', color:'var(--barca-gold)' },
        ].map((k,i)=>(
          <div key={i} style={{ padding:'12px 16px', textAlign:'center', borderRight: i<2?'1px solid var(--barca-border)':'none' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'1.15rem', fontWeight:900, color:k.color }}>{k.value}</div>
            <div style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.06em', marginTop:'2px' }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* Header colonnes — desktop seulement via CSS */}
      <div className="th-desktop" style={{ display:'grid', gridTemplateColumns:'40px 1fr 1fr 100px 80px 90px', gap:'12px', padding:'10px 16px', borderBottom:'1px solid var(--barca-border)', background:'rgba(255,255,255,0.02)' }}>
        {['','JOUEUR','CLUBS','TYPE','MONTANT','STATUT'].map((h,i)=>(
          <div key={i} style={{ fontSize:'9px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)', letterSpacing:'0.08em', textAlign: i>=4?'right':'left' }}>{h}</div>
        ))}
      </div>

      <div className="tb-desktop">{data.map(t=><LigneTransfert key={t.id} t={t} isArrivee={onglet==='arrivees'}/>)}</div>
      <div className="tb-mobile">{data.map(t=><LigneMobile   key={t.id} t={t} isArrivee={onglet==='arrivees'}/>)}</div>

      <div style={{ padding:'12px 16px', borderTop:'1px solid var(--barca-border)', background:'rgba(255,255,255,0.01)', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'8px' }}>
        <div style={{ fontSize:'11px', color:'var(--text-muted)', fontFamily:'DM Mono,monospace' }}>Dernière mise à jour : 17 mai 2026</div>
        <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
          {Object.entries(STATUT_CONFIG).map(([key,val])=>(
            <div key={key} style={{ display:'flex', alignItems:'center', gap:'5px' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:val.color }}/>
              <span style={{ fontSize:'10px', fontFamily:'DM Mono,monospace', color:'var(--text-muted)' }}>{key}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .th-desktop { display: grid !important; }
        .tb-desktop { display: block; }
        .tb-mobile  { display: none;  }
        @media (max-width: 680px) {
          .th-desktop { display: none !important; }
          .tb-desktop { display: none  !important; }
          .tb-mobile  { display: block !important; }
        }
      `}</style>
    </div>
  )
}
