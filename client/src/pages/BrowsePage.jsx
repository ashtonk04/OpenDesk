import { useState, useMemo } from 'react'
import AppHeader from '../components/layout/AppHeader'
import BottomNav from '../components/layout/BottomNav'
import SpotCard from '../components/spots/SpotCard'
import RecommendationBanner from '../components/spots/RecommendationBanner'
import FilterModal from '../components/filters/FilterModal'
import Icon from '../components/shared/Icon'
import { useSpots } from '../contexts/SpotsContext'

export default function BrowsePage() {
  const { spots, loading } = useSpots()
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({})

  const recommendation = spots.reduce((best, s) =>
    s.occupancyPct < (best?.occupancyPct ?? 100) ? s : best, null)

  const filtered = useMemo(() => {
    return spots.filter(s => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false
      if (filters.noise) {
        const map = { silent: ['silent'], quiet: ['silent', 'quiet'], social: ['moderate', 'loud'] }
        if (!map[filters.noise]?.includes(s.noiseLevel)) return false
      }
      if (filters.amenities?.includes('outlets') && ['none', 'scarce'].includes(s.outletStatus)) return false
      if (filters.amenities?.includes('coffee') && !s.amenities.includes('coffee')) return false
      if (filters.amenities?.includes('printing') && !s.amenities.includes('printing')) return false
      return true
    })
  }, [spots, search, filters])

  return (
    <div className="min-h-screen bg-surface pb-32">
      <AppHeader />

      <main className="pt-24 px-4 max-w-2xl mx-auto">
        {/* Editorial header */}
        <section className="mb-6">
          <p className="font-label text-secondary font-semibold uppercase tracking-widest text-[10px] mb-2">Campus Pulse</p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-4xl font-headline font-bold text-primary tracking-tight leading-none">Find your quiet.</h2>
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative flex items-center">
                <Icon name="search" size={18} className="absolute left-3 text-on-surface-variant" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2.5 bg-surface-container-highest rounded-full border-none outline-none focus:ring-2 focus:ring-primary/20 text-sm font-label text-on-surface w-40"
                />
              </div>
              <button
                onClick={() => setShowFilters(true)}
                className="w-10 h-10 flex items-center justify-center bg-surface-container-highest rounded-full text-on-surface-variant active:scale-95 transition-transform"
              >
                <Icon name="tune" />
              </button>
            </div>
          </div>
        </section>

        {/* Recommendation */}
        {recommendation && <RecommendationBanner spot={recommendation} />}

        {/* Spot list */}
        <section className="flex flex-col gap-4">
          {loading && (
            <div className="text-center py-12 text-on-surface-variant font-label text-sm">Loading spots...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant font-label text-sm">No spots match your filters.</div>
          )}
          {filtered.map(spot => <SpotCard key={spot.id} spot={spot} />)}
        </section>
      </main>

      <BottomNav />

      {showFilters && (
        <FilterModal
          initialFilters={filters}
          onClose={() => setShowFilters(false)}
          onApply={setFilters}
        />
      )}
    </div>
  )
}
