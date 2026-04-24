import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const SpotsContext = createContext(null)

const SEED_SPOTS = [
  {
    id: 'newman-library',
    name: 'Newman Library',
    subtitle: 'Main Campus · 4th Floor Reading Room',
    occupancyPct: 46,
    noiseLevel: 'moderate',
    outletStatus: 'plenty',
    seatStatus: 'available',
    amenities: ['wifi', 'coffee'],
    lastUpdated: new Date(Date.now() - 4 * 60000).toISOString(),
    totalSeats: 350,
    lat: 37.2284,
    lng: -80.4234,
    hourlyBusyness: [20, 35, 40, 65, 85, 95, 75, 55, 30, 20],
    distance: 0.1,
  },
  {
    id: 'squires-student-center',
    name: 'Squires Student Center',
    subtitle: 'Main Campus · 2nd Floor Study Lounge',
    occupancyPct: 82,
    noiseLevel: 'loud',
    outletStatus: 'scarce',
    seatStatus: 'limited',
    amenities: ['wifi', 'coffee', 'printing'],
    lastUpdated: new Date(Date.now() - 12 * 60000).toISOString(),
    totalSeats: 120,
    lat: 37.2296,
    lng: -80.4218,
    hourlyBusyness: [10, 20, 45, 70, 90, 95, 85, 80, 60, 40],
    distance: 0.2,
  },
  {
    id: 'goodwin-hall',
    name: 'Goodwin Hall',
    subtitle: 'Engineering Quad · 3rd Floor Commons',
    occupancyPct: 18,
    noiseLevel: 'silent',
    outletStatus: 'available',
    seatStatus: 'available',
    amenities: ['wifi'],
    lastUpdated: new Date(Date.now() - 1 * 60000).toISOString(),
    totalSeats: 80,
    lat: 37.2275,
    lng: -80.4260,
    hourlyBusyness: [5, 10, 15, 25, 40, 55, 35, 20, 10, 5],
    distance: 0.3,
  },
  {
    id: 'torgersen-bridge',
    name: 'Torgersen Bridge',
    subtitle: 'Torgersen Hall · 4th Floor Bridge',
    occupancyPct: 12,
    noiseLevel: 'quiet',
    outletStatus: 'available',
    seatStatus: 'available',
    amenities: ['wifi'],
    lastUpdated: new Date(Date.now() - 2 * 60000).toISOString(),
    totalSeats: 40,
    lat: 37.2268,
    lng: -80.4255,
    hourlyBusyness: [5, 8, 12, 20, 35, 45, 30, 20, 10, 5],
    distance: 0.4,
  },
]

export function SpotsProvider({ children }) {
  const [spots, setSpots] = useState(SEED_SPOTS)
  const [loading, setLoading] = useState(false)

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favoriteSpots')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('favoriteSpots', JSON.stringify(favorites))
  }, [favorites])

  const updateSpot = useCallback((updatedSpot) => {
    setSpots(prev =>
      prev.map(s => s.id === updatedSpot.id ? { ...s, ...updatedSpot } : s)
    )
  }, [])

  const toggleFavorite = useCallback((spotId) => {
    setFavorites(prev =>
      prev.includes(spotId)
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId]
    )
  }, [])

  const isFavorite = useCallback((spotId) => {
    return favorites.includes(spotId)
  }, [favorites])

  useEffect(() => {
    setLoading(true)
    fetch('/api/spots')
      .then(r => r.json())
      .then(data => {
        setSpots(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const es = new EventSource('/api/events')
    es.addEventListener('spot-updated', (e) => {
      updateSpot(JSON.parse(e.data))
    })
    return () => es.close()
  }, [updateSpot])

  return (
    <SpotsContext.Provider
      value={{
        spots,
        loading,
        updateSpot,
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </SpotsContext.Provider>
  )
}

export function useSpots() {
  return useContext(SpotsContext)
}

export function useSpot(spotId) {
  const { spots, loading } = useContext(SpotsContext)

  return {
    spot: spots.find(s => s.id === spotId) ?? null,
    loading,
  }
}