import { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import Icon from '../components/shared/Icon'
import SpotCardMini from '../components/spots/SpotCardMini'
import { useSpots } from '../contexts/SpotsContext'

export default function ReportConfirmPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { spotId } = useParams()
  const { spots } = useSpots()
  const [countdown, setCountdown] = useState(5)

  const points = location.state?.points ?? 5
  const spotName = location.state?.spotName ?? 'Study Spot'

  // Nearby spots (all except the one just reported)
  const nearby = spots.filter(s => s.id !== spotId).slice(0, 2)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); navigate('/'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Background image placeholder */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: 'linear-gradient(135deg, #67022b, #2e3235)' }} />

      <main className="flex-1 flex flex-col items-center px-4 pt-16 pb-32 max-w-2xl mx-auto w-full">
        {/* Decorative blobs */}
        <div className="fixed top-16 right-4 w-32 h-32 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #994700, transparent)' }} />
        <div className="fixed bottom-32 left-4 w-24 h-24 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #67022b, transparent)' }} />

        {/* Success icon */}
        <div className="relative mb-8 mt-8">
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #2e7d32, #1b5e20)' }}>
            <Icon name="check_circle" size={48} filled className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center">
            <Icon name="stars" size={14} className="text-on-secondary-fixed" />
          </div>
        </div>

        <h1 className="font-headline font-bold text-3xl text-on-surface text-center mb-2">Report Submitted!</h1>
        <p className="text-sm font-label text-on-surface-variant text-center mb-8">Thanks for helping the community.</p>

        {/* Summary card */}
        <div className="w-full bg-surface-container-low rounded-2xl p-5 mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="location_on" size={16} className="text-primary" />
              <p className="font-label font-semibold text-on-surface text-sm">{spotName}</p>
            </div>
            <div className="flex items-center gap-1 bg-secondary-fixed px-3 py-1 rounded-full">
              <Icon name="stars" size={12} className="text-on-secondary-fixed" />
              <span className="text-xs font-label font-bold text-on-secondary-fixed">+{points} Pts</span>
            </div>
          </div>
          <p className="text-xs font-label text-on-surface-variant">Quiet Level Verified · Contribution logged</p>
        </div>

        {/* Nearby spots */}
        {nearby.length > 0 && (
          <div className="w-full">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Nearby with open spots</p>
            <div className="flex flex-col gap-2">
              {nearby.map(s => <SpotCardMini key={s.id} spot={s} />)}
            </div>
          </div>
        )}
      </main>

      {/* Done button */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 glass-header">
        <p className="text-center text-xs font-label text-on-surface-variant mb-3">
          Returning in {countdown}s...
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full py-4 rounded-full text-on-primary font-label font-semibold text-base active:scale-[0.98] transition-transform"
          style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
