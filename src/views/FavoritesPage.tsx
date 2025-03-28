import DrinkCard from "../components/DrinkCard";
import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";

export default function FavoritesPage() {
  const favorites = useAppStore((state) => state.favorites);
  const hasFavorites = useMemo(() => favorites.length, [favorites]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-8">
          Mis Bebidas Favoritas
        </h1>

        <div className="rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm shadow-xl">
          {hasFavorites ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((drink) => (
                <DrinkCard key={drink.idDrink} drink={drink} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-xl sm:text-2xl text-gray-300 text-center mb-4">
                No tienes bebidas favoritas aún
              </p>
              <p className="text-gray-400 text-center">
                Las bebidas que marques como favoritas aparecerán aquí
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
