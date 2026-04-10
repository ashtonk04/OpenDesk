import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpotsContext } from "../contexts/SpotsContext";

// FavoritesPage — displays study spots saved by the user (Use Case 5)
export default function FavoritesPage() {
  const { spots } = useContext(SpotsContext);
  const navigate = useNavigate();

  // TODO: replace with persisted favorites from local storage or backend
  const [favorites, setFavorites] = useState([]);

  const favorited = spots.filter((spot) => favorites.includes(spot.id));

  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Saved Spots</h1>

      {favorited.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No favorites yet. Tap the star on any study spot to save it here.
        </p>
      ) : (
        <ul className="space-y-3">
          {favorited.map((spot) => (
            <li
              key={spot.id}
              className="flex items-center justify-between bg-gray-800 rounded-xl p-4 cursor-pointer"
              onClick={() => navigate(`/spot/${spot.id}`)}
            >
              <div>
                <p className="font-medium">{spot.name}</p>
                <p className="text-sm text-gray-400">{spot.location}</p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(spot.id);
                }}
                aria-label="Remove from favorites"
                className="text-yellow-400 text-lg"
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
