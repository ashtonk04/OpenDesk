import { useNavigate } from 'react-router-dom'
import { useSpots } from '../contexts/SpotsContext'
import AppHeader from '../components/layout/AppHeader'
import BottomNav from '../components/layout/BottomNav'

export default function ReportsPage() {
  const { spots } = useSpots()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-surface pb-24">
      <AppHeader title="Report a Study Spot" />

      <main className="pt-24 px-4 max-w-2xl mx-auto">
        <h1 className="font-headline font-bold text-xl text-on-surface mb-4">
          Select a location to report
        </h1>

        <div className="space-y-3">
          {spots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => navigate(`/spots/${spot.id}/report`)}
              className="p-4 rounded-xl bg-surface-container-low shadow-sm cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <p className="font-semibold text-on-surface">{spot.name}</p>
              <p className="text-sm text-on-surface-variant">{spot.subtitle}</p>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}