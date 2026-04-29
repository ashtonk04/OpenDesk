import { useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon'

const NOISE_LABELS = {
  silent: 'Very Quiet',
  quiet: 'Very Quiet',
  moderate: 'Moderately Busy',
  loud: 'Busy',
}

function getBarColor(pct) {
  if (pct < 40) return '#2e7d32'
  if (pct < 70) return '#994700'
  return '#67022b'
}

export default function SpotCardMini({ spot }) {
  const navigate = useNavigate()
  return (
    <div
      className="flex items-center gap-4 p-4 bg-surface-container/50 rounded-xl hover:bg-surface-container transition-colors cursor-pointer"
      onClick={() => navigate(`/spots/${spot.id}`)}
    >
      {spot.imageUrl ? (
        <img
          src={spot.imageUrl}
          alt=""
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          loading="lazy"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
          <Icon name="location_on" size={18} className="text-on-surface-variant" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-label font-semibold text-on-surface text-sm truncate">{spot.name}</p>
          <span className="text-xs font-label text-on-surface-variant ml-2 flex-shrink-0">
            {spot.distance ? `${spot.distance} mi` : ''}
          </span>
        </div>
        <p className="text-xs font-label text-on-surface-variant mb-2">{NOISE_LABELS[spot.noiseLevel] ?? 'Active'}</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${spot.occupancyPct}%`, backgroundColor: getBarColor(spot.occupancyPct) }}
            />
          </div>
          <span className="text-xs font-label text-on-surface-variant flex-shrink-0">{spot.occupancyPct}% Full</span>
        </div>
      </div>
    </div>
  )
}
