import { useState } from 'react'
import Icon from '../shared/Icon'

const NOISE_OPTIONS = [
  { value: 'silent', label: 'Silent', icon: 'volume_off' },
  { value: 'quiet', label: 'Quiet', icon: 'volume_down' },
  { value: 'social', label: 'Social', icon: 'volume_up' },
]

const AMENITY_OPTIONS = [
  { value: 'outlets', label: 'Available Outlets', icon: 'power' },
  { value: 'coffee', label: 'Near Coffee', icon: 'coffee' },
  { value: 'printing', label: 'Printing', icon: 'print' },
]

const MOOD_OPTIONS = ['Library Silence', 'Coffee Shop Hum', 'Outdoor Air']

export default function FilterModal({ onClose, onApply, initialFilters = {} }) {
  const [noise, setNoise] = useState(initialFilters.noise ?? 'quiet')
  const [distance, setDistance] = useState(initialFilters.distance ?? 10)
  const [groupSize, setGroupSize] = useState(initialFilters.groupSize ?? 4)
  const [amenities, setAmenities] = useState(initialFilters.amenities ?? ['outlets', 'coffee'])
  const [mood, setMood] = useState(initialFilters.mood ?? null)

  const toggleAmenity = (v) =>
    setAmenities(prev => prev.includes(v) ? prev.filter(a => a !== v) : [...prev, v])

  const handleApply = () => {
    onApply({ noise, distance, groupSize, amenities, mood })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: 'rgba(26,28,28,0.4)' }}>
      <div className="mt-auto bg-surface rounded-t-3xl flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container">
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container active:scale-95 transition-all">
            <Icon name="close" className="text-on-surface" />
          </button>
          <h2 className="font-headline font-bold text-on-surface">StudySpot Filters</h2>
          <button onClick={() => { setNoise('quiet'); setDistance(10); setGroupSize(4); setAmenities([]); setMood(null) }}
            className="text-sm font-label font-semibold text-primary">
            Clear All
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-8 pb-32">
          {/* Noise Level */}
          <div>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Noise Level</p>
            <div className="flex gap-3">
              {NOISE_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setNoise(opt.value)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all active:scale-95 ${
                    noise === opt.value
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <Icon name={opt.icon} size={22} />
                  <span className="text-xs font-label font-semibold">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Walking Distance */}
          <div>
            <div className="flex justify-between mb-3">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Walking Distance</p>
              <span className="text-sm font-label font-semibold text-on-surface">{distance} min</span>
            </div>
            <input
              type="range" min={2} max={20} value={distance}
              onChange={e => setDistance(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Group Size */}
          <div>
            <div className="flex justify-between mb-3">
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Group Size</p>
              <span className="text-sm font-label font-semibold text-on-surface">{groupSize === 12 ? '12+' : groupSize} {groupSize === 1 ? 'person' : 'people'}</span>
            </div>
            <input
              type="range" min={1} max={12} value={groupSize}
              onChange={e => setGroupSize(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Amenities */}
          <div>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Amenities</p>
            <div className="flex flex-col gap-2">
              {AMENITY_OPTIONS.map(opt => {
                const checked = amenities.includes(opt.value)
                return (
                  <button
                    key={opt.value}
                    onClick={() => toggleAmenity(opt.value)}
                    className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl active:scale-[0.99] transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={opt.icon} size={18} className="text-on-surface-variant" />
                      <span className="text-sm font-label font-medium text-on-surface">{opt.label}</span>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-0.5 transition-colors flex items-center ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mood */}
          <div>
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Academic Mood</p>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {MOOD_OPTIONS.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(mood === m ? null : m)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-label font-medium transition-all active:scale-95 ${
                    mood === m
                      ? 'bg-secondary-fixed text-on-secondary-fixed'
                      : 'bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 glass-header">
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-full text-on-primary font-label font-semibold text-base active:scale-[0.98] transition-transform"
            style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
