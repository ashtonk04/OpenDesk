import { useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon'
import SegmentedBar from '../shared/SegmentedBar'
import AmenityChip from '../shared/AmenityChip'

const NOISE_META = {
  silent: { icon: 'volume_off', label: 'Silent' },
  quiet: { icon: 'volume_down', label: 'Quiet' },
  moderate: { icon: 'volume_down', label: 'Moderate' },
  loud: { icon: 'volume_up', label: 'Loud' },
}

const OUTLET_META = {
  plenty: { icon: 'power', label: 'Plenty outlets' },
  available: { icon: 'power', label: 'Outlets available' },
  scarce: { icon: 'power_off', label: 'Scarce outlets' },
  none: { icon: 'power_off', label: 'No outlets' },
}

function timeAgo(iso) {
  const mins = Math.floor((Date.now() - new Date(iso)) / 60000)
  if (mins < 1) return 'just now'
  if (mins === 1) return '1 min ago'
  return `${mins} mins ago`
}

export default function SpotCard({ spot }) {
  const navigate = useNavigate()
  const noise = NOISE_META[spot.noiseLevel] ?? NOISE_META.moderate
  const outlet = OUTLET_META[spot.outletStatus] ?? OUTLET_META.available

  return (
    <div
      className="bg-surface-container-low rounded-xl p-6 flex flex-col gap-4 shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
      onClick={() => navigate(`/spots/${spot.id}`)}
    >
      {spot.imageUrl && (
        <div className="h-36 -mx-2 -mt-2 rounded-lg overflow-hidden bg-surface-container-high">
          <img
            src={spot.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-headline font-bold text-on-surface text-base leading-tight">{spot.name}</h3>
          <p className="text-xs font-label text-on-surface-variant mt-0.5">{spot.subtitle}</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); navigate(`/spots/${spot.id}/report`) }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-label font-semibold text-on-primary active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
        >
          <Icon name="edit_note" size={14} className="text-on-primary" />
          Report
        </button>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-2xl font-headline font-bold text-secondary">{spot.occupancyPct}%</span>
          <span className="text-xs font-label text-on-surface-variant">{timeAgo(spot.lastUpdated)}</span>
        </div>
        <SegmentedBar percentage={spot.occupancyPct} />
      </div>

      <div className="flex flex-wrap gap-2">
        <AmenityChip icon={noise.icon} label={noise.label} />
        <AmenityChip icon={outlet.icon} label={outlet.label} />
        {spot.seatStatus === 'available' && <AmenityChip icon="chair" label="Available seating" />}
      </div>
    </div>
  )
}
