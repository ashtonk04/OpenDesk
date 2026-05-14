import { useNavigate, useParams } from 'react-router-dom'
import AppHeader from '../components/layout/AppHeader'
import BentoStat from '../components/shared/BentoStat'
import HourlyChart from '../components/shared/HourlyChart'
import Icon from '../components/shared/Icon'
import { useSpot, useSpots } from '../contexts/SpotsContext'

const AMENITY_META = {
  wifi: { icon: 'wifi', label: 'Gigabit WiFi', desc: 'Strong signal across all floors' },
  coffee: { icon: 'coffee', label: 'Café Nearby', desc: 'ABP located on 2nd floor' },
  printing: { icon: 'print', label: 'Printing', desc: 'Print station on main floor' },
}

const NOISE_LABELS = {
  silent: 'Library Silence',
  quiet: 'Quiet Focus',
  moderate: 'Moderate Noise',
  loud: 'Loud & Social',
}

function getOccupancyLabel(pct) {
  if (pct < 30) return 'Near Empty'
  if (pct < 60) return 'Moderate Activity'
  if (pct < 85) return 'Very Busy'
  return 'Full'
}

export default function SpotDetailPage() {
  const { spotId } = useParams()
  const navigate = useNavigate()
  const { spot, loading } = useSpot(spotId)
  const { toggleFavorite, isFavorite } = useSpots()

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant font-label">Loading...</p>
      </div>
    )
  }

  if (!spot) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-on-surface-variant font-label">Spot not found.</p>
      </div>
    )
  }

  const currentHour = new Date().getHours()
  const chartHour = Math.min(
    Math.floor((currentHour - 8) / 1.5),
    (spot.hourlyBusyness?.length ?? 10) - 1
  )

  return (
    <div className="min-h-screen bg-surface pb-32">
      <AppHeader
        mode="detail"
        title={spot.name}
        isFavorite={isFavorite(spot.id)}
        onFavorite={() => toggleFavorite(spot.id)}
      />

      <main className="pt-20 px-4 max-w-2xl mx-auto">
        <div className="relative rounded-xl overflow-hidden h-52 mb-6 bg-surface-container-high">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />

          <div className="absolute bottom-4 left-4 z-20">
            <h2 className="font-headline font-bold text-white text-2xl leading-tight">
              {spot.name}
            </h2>
            <p className="text-white/80 text-sm font-label">{spot.subtitle}</p>
          </div>

          <div className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <Icon name="schedule" size={12} className="text-white/70" />
            <span className="text-white/70 text-[10px] font-label">
              Updated {Math.floor((Date.now() - new Date(spot.lastUpdated)) / 60000)}m ago
            </span>
          </div>

          {spot.imageUrl ? (
            <img
              src={spot.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: 'linear-gradient(135deg, #861f41 0%, #2e3235 100%)' }}
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <BentoStat
            icon="groups"
            label="Busyness"
            value={`${spot.occupancyPct}%`}
            sublabel={getOccupancyLabel(spot.occupancyPct)}
          />

          <BentoStat
            icon="volume_down"
            label="Noise Level"
            value={NOISE_LABELS[spot.noiseLevel] ?? 'Moderate'}
            valueColor="text-on-surface"
          />

          <BentoStat
            icon="power"
            label="Outlets"
            value={
              spot.outletStatus === 'plenty'
                ? '12+'
                : spot.outletStatus === 'available'
                  ? '6+'
                  : '2'
            }
            sublabel={
              spot.outletStatus === 'plenty'
                ? 'High availability'
                : spot.outletStatus === 'scarce'
                  ? 'Limited'
                  : 'Available'
            }
          />

          <BentoStat
            icon="chair"
            label="Space Size"
            value="Large"
            sublabel={`${spot.totalSeats}+ seats total`}
          />
        </div>

        {spot.amenities?.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">
              Features & Amenities
            </p>

            <div className="grid grid-cols-2 gap-3">
              {spot.amenities.map(a => {
                const meta = AMENITY_META[a]
                if (!meta) return null

                return (
                  <div
                    key={a}
                    className="flex items-center gap-3 p-4 bg-surface-container-low rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
                      <Icon name={meta.icon} size={18} className="text-on-secondary-fixed" />
                    </div>

                    <div>
                      <p className="font-label font-semibold text-on-surface text-sm">
                        {meta.label}
                      </p>
                      <p className="text-xs font-label text-on-surface-variant">
                        {meta.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {spot.hourlyBusyness && (
          <HourlyChart data={spot.hourlyBusyness} currentHour={Math.max(0, chartHour)} />
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 px-4 py-4 glass-header">
        <button
          onClick={() => navigate(`/spots/${spot.id}/report`)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-on-primary font-label font-semibold text-base active:scale-[0.98] transition-transform"
          style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
        >
          <Icon name="edit_note" size={20} className="text-on-primary" />
          Quick Report
        </button>
      </div>
    </div>
  )
}
