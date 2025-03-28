import { useMemo } from "react";
import { useAppStore } from "../stores/useAppStore";
import DrinkCard from "../components/DrinkCard";

export default function IndexPage() {
  const drinks = useAppStore((state) => state.drinks);

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-indigo-100/40 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl blur-3xl -z-10"></div>
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-400 animate-gradient-x bg-[length:200%_auto] tracking-tight">
            Recetas de Bebidas
          </h1>
          <p className="mt-6 text-gray-800 dark:text-gray-200 text-xl md:text-2xl font-light italic max-w-2xl mx-auto leading-relaxed">
            Descubre nuestras deliciosas recetas de bebidas
          </p>
        </div>
        
        {hasDrinks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {drinks.drinks.map((drink) => (
              <div key={drink.idDrink} className="transform transition-all duration-300 hover:scale-105">
                <DrinkCard drink={drink} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 text-center">
              No hay recetas disponibles
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              ¡Vuelve más tarde para ver nuevas recetas!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
