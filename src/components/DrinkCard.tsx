import { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";


type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
   const selectRecipe= useAppStore((state) => state.selectRecipe)
  return (
    <div className="group relative border-2 border-cream rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="overflow-hidden rounded-t-xl">
        <img
          className="w-full h-48 object-cover transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
          src={drink.strDrinkThumb}
          alt={`imagen de ${drink.strDrink}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkTeal/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold text-darkTeal truncate mb-3 group-hover:text-teal transition-colors duration-300">
          {drink.strDrink}
        </h2>
        <button
          type="button"
          onClick={() => selectRecipe(drink.idDrink)}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-teal to-lightBlue text-white rounded-lg font-semibold 
            hover:from-darkTeal hover:to-teal transform transition-all duration-300 hover:scale-[1.02] 
            active:scale-[0.98] shadow-md hover:shadow-lg text-cream"
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
