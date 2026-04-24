import { useNavigate } from "react-router-dom";
import { useSpots } from "../contexts/SpotsContext";

export default function FavoritesPage() {
  const { spots, favorites, toggleFavorite } = useSpots();
  const navigate = useNavigate();

  const favorited = spots.filter((spot) => favorites.includes(spot.id));

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Saved Spots</h1>

      {favorited.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No favorites yet. Tap the heart on any study spot to save it here.
        </p>
      ) : (
        <ul className="space-y-3">
          {favorited.map((spot) => (
            <li
              key={spot.id}
              className="flex items-center justify-between bg-gray-100 rounded-xl p-4 cursor-pointer"
              onClick={() => navigate(`/spots/${spot.id}`)}
            >
              <div>
                <p className="font-medium">{spot.name}</p>
                <p className="text-sm text-gray-500">{spot.subtitle}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(spot.id);
                }}
                aria-label="Remove from favorites"
                className="text-yellow-500 text-lg"
              >
                ★
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}