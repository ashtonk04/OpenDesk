import { useNavigate } from 'react-router-dom'
import Icon from '../shared/Icon'

export default function RecommendationBanner({ spot }) {
  const navigate = useNavigate()
  if (!spot) return null
  return (
    <section className="mb-8">
      <div
        className="relative overflow-hidden rounded-3xl p-6 text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #67022b, #861f41)' }}
      >
        {spot.imageUrl && (
          <img
            src={spot.imageUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e3235]/85 to-[#67022b]/70" />
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #ff8934, transparent)' }} />
        <div className="absolute bottom-0 left-1/3 w-28 h-28 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #67022b, transparent)' }} />

        <div className="relative z-10">
          <p className="text-[10px] font-label uppercase tracking-widest opacity-70 mb-2">Recommended Now</p>
          <h3 className="font-headline font-bold text-xl leading-tight mb-1">{spot.name}</h3>
          <p className="text-sm opacity-80 mb-4">{spot.occupancyPct}% capacity · {spot.totalSeats} seats</p>
          <button
            onClick={() => navigate(`/spots/${spot.id}`)}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-label font-semibold transition-colors active:scale-95"
          >
            <Icon name="arrow_forward" size={16} className="text-white" />
            Go to {spot.name.split(' ')[0]}
          </button>
        </div>
      </div>
    </section>
  )
}
