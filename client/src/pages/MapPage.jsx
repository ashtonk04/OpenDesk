import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import BottomNav from '../components/layout/BottomNav'
import Icon from '../components/shared/Icon'
import { useSpots } from '../contexts/SpotsContext'

// Approximate positions as % of a campus map area
const PIN_POSITIONS = {
  'newman-library': { top: '45%', left: '40%' },
  'newman-learning-commons': { top: '47%', left: '42%' },
  'newman-quiet-floors': { top: '43%', left: '38%' },
  'squires-student-center': { top: '35%', left: '55%' },
  'goodwin-hall': { top: '60%', left: '30%' },
  'torgersen-bridge': { top: '65%', left: '25%' },
  'torgersen-atrium': { top: '62%', left: '28%' },
  'graduate-life-center': { top: '78%', left: '52%' },
  'art-architecture-library': { top: '38%', left: '33%' },
  'academic-building-one-library': { top: '24%', left: '22%' },
  'ati-waoki-center': { top: '32%', left: '58%' },
  'el-centro': { top: '38%', left: '58%' },
}

function getPinColor(pct, noiseLevel) {
  if (pct < 40 && ['silent', 'quiet'].includes(noiseLevel)) return { bg: '#2e7d32', label: 'Quiet' }
  if (pct < 75) return { bg: '#994700', label: 'Active' }
  return { bg: '#ba1a1a', label: 'Full' }
}

export default function MapPage() {
  const { spots } = useSpots()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [quietOnly, setQuietOnly] = useState(false)

  const visible = quietOnly
    ? spots.filter(s => s.occupancyPct < 50 && ['silent', 'quiet'].includes(s.noiseLevel))
    : spots

  const selectedSpot = spots.find(s => s.id === selected)

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader title="Campus Map" />

      {/* Map area */}
      <div className="fixed inset-0 top-16">
        {/* Gradient campus map background */}
        <div className="w-full h-full"
          style={{ background: 'linear-gradient(160deg, #e8e8e8 0%, #d4d4d4 40%, #c8c4c0 100%)' }}>
          {/* Simulated campus paths */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="30%" y1="0%" x2="30%" y2="100%" stroke="#897175" strokeWidth="2" />
            <line x1="60%" y1="0%" x2="60%" y2="100%" stroke="#897175" strokeWidth="2" />
            <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="#897175" strokeWidth="2" />
            <line x1="0%" y1="30%" x2="100%" y2="30%" stroke="#897175" strokeWidth="1.5" />
            <line x1="15%" y1="0%" x2="85%" y2="100%" stroke="#897175" strokeWidth="1" />
          </svg>
        </div>

        {/* Pins */}
        {visible.map(spot => {
          const pos = PIN_POSITIONS[spot.id]
          if (!pos) return null
          const { bg, label } = getPinColor(spot.occupancyPct, spot.noiseLevel)
          return (
            <button
              key={spot.id}
              onClick={() => setSelected(selected === spot.id ? null : spot.id)}
              className="absolute flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
              style={{ top: pos.top, left: pos.left, transform: 'translate(-50%, -100%)' }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: bg }}>
                <Icon name="local_library" size={18} className="text-white" />
              </div>
              <div className="text-[9px] font-label font-bold text-white mt-0.5 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: bg }}>
                {label}
              </div>
            </button>
          )
        })}

        {/* Quiet toggle */}
        <div className="absolute top-4 left-4 glass-header rounded-2xl px-4 py-3 flex items-center gap-3 shadow">
          <span className="text-xs font-label font-semibold text-on-surface">Quiet only</span>
          <button
            onClick={() => setQuietOnly(q => !q)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${quietOnly ? 'bg-primary' : 'bg-surface-container-highest'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${quietOnly ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Selected spot preview */}
        {selectedSpot && (
          <div className="absolute bottom-24 left-4 right-4 glass-header rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-headline font-bold text-on-surface">{selectedSpot.name}</h3>
                <p className="text-xs font-label text-on-surface-variant">{selectedSpot.occupancyPct}% full · {selectedSpot.subtitle}</p>
              </div>
              <button
                onClick={() => navigate(`/spots/${selectedSpot.id}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-label font-semibold text-on-primary active:scale-95 transition-transform"
                style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
              >
                <Icon name="arrow_forward" size={14} className="text-on-primary" />
                View
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
