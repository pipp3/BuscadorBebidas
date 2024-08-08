import { Drink } from "../types";
import { useAppStore } from "../stores/useAppStore";


type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard({ drink }: DrinkCardProps) {
   const selectRecipe= useAppStore((state) => state.selectRecipe)
  return (
    <div className="border shadow-lg bg-fourth">
      <div className="overflow-hidden">
        <img
          className="hover:scale-125 transition-transform hover:rotate-2"
          src={drink.strDrinkThumb}
          alt={`imagen de ${drink.strDrink}`}
        />
      </div>
      <div className="p-3">
        <h2 className="text-xl truncate font-black">{drink.strDrink}</h2>
        <button
          type="button"
          onClick={()=>selectRecipe(drink.idDrink)}
          className="cursor-pointer uppercase bg-[#38bdf8] text-fourth p-2 rounded-lg w-full font-bold text-md hover:bg-[#0284c7] mt-2"
        >
          Ver Receta
        </button>
      </div>
    </div>
  );
}
