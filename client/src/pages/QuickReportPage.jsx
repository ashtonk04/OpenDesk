import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import Icon from '../components/shared/Icon'
import { useSpot } from '../contexts/SpotsContext'

const NOISE_OPTIONS = [
  { value: 'quiet', label: 'Quiet', icon: 'volume_off', color: '#2e7d32' },
  { value: 'moderate', label: 'Moderate', icon: 'volume_down', color: '#1565c0' },
  { value: 'noisy', label: 'Noisy', icon: 'volume_up', color: '#ba1a1a' },
]

const OCCUPANCY_OPTIONS = [
  { value: 'empty', label: 'Empty', icon: 'person_outline', color: '#897175' },
  { value: 'moderate', label: 'Moderate', icon: 'person', color: '#1565c0' },
  { value: 'crowded', label: 'Crowded', icon: 'group_add', color: '#994700' },
]

const OUTLET_OPTIONS = [
  { value: true, label: 'Available', icon: 'power', color: '#67022b' },
  { value: false, label: 'None', icon: 'power_off', color: '#897175' },
]

function SelectGrid({ options, value, onChange }) {
  return (
    <div className={`grid gap-3 ${options.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {options.map(opt => {
        const selected = value === opt.value
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={`flex flex-col items-center justify-center gap-2 h-28 rounded-2xl bg-surface-container-low transition-all active:scale-95 ${
              selected ? 'ring-2 ring-primary/30' : ''
            }`}
          >
            <Icon name={opt.icon} size={28} style={{ color: opt.color }} />
            <span className="text-xs font-label font-semibold text-on-surface">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default function QuickReportPage() {
  const { spotId } = useParams()
  const navigate = useNavigate()
  const { spot } = useSpot(spotId)

  const [noise, setNoise] = useState('moderate')
  const [occupancy, setOccupancy] = useState('moderate')
  const [outlets, setOutlets] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spotId,
          noiseLevel: noise,
          occupancy,
          outletsAvailable: outlets,
          userId: 'anon-' + Math.random().toString(36).slice(2, 8),
        }),
      })
      const data = await res.json()
      if (data.success) {
        navigate(`/spots/${spotId}/report/confirm`, { state: { points: data.pointsEarned, spotName: spot?.name } })
      }
    } catch {
      // Server down — navigate anyway for demo
      navigate(`/spots/${spotId}/report/confirm`, { state: { points: 5, spotName: spot?.name } })
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-surface">
      <AppHeader mode="detail" title="Quick Report" />

      <main className="pt-20 px-4 pb-32 max-w-2xl mx-auto">
        {/* Location */}
        <div className="mb-8 pt-2">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">Reporting for</p>
          <h2 className="font-headline font-bold text-on-surface text-xl">{spot?.name ?? spotId}</h2>
          <p className="text-sm font-label text-on-surface-variant">{spot?.subtitle}</p>
        </div>

        {/* Decorative blobs */}
        <div className="fixed top-0 right-0 w-48 h-48 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #67022b, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="fixed bottom-24 left-0 w-40 h-40 rounded-full opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #994700, transparent)', transform: 'translate(-30%, 30%)' }} />

        {/* Noise */}
        <div className="mb-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Noise Level</p>
          <SelectGrid options={NOISE_OPTIONS} value={noise} onChange={setNoise} />
        </div>

        {/* Occupancy */}
        <div className="mb-6">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">How Busy?</p>
          <SelectGrid options={OCCUPANCY_OPTIONS} value={occupancy} onChange={setOccupancy} />
        </div>

        {/* Outlets */}
        <div className="mb-8">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Outlets</p>
          <SelectGrid options={OUTLET_OPTIONS} value={outlets} onChange={setOutlets} />
        </div>

        {/* Reward info */}
        <div className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl mb-2">
          <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
            <Icon name="stars" size={16} className="text-on-secondary-fixed" />
          </div>
          <div>
            <p className="text-sm font-label font-semibold text-on-surface">Contributor Reward</p>
            <p className="text-xs font-label text-on-surface-variant">+5 points for a verified report</p>
          </div>
        </div>
      </main>

      {/* Submit */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 glass-header">
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-on-primary font-label font-semibold text-base active:scale-[0.98] transition-all disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
        >
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </div>
    </div>
  )
}
