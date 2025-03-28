import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const showNotification = useAppStore((state) => state.showNotification);

  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(searchFilters).includes("")) {
      showNotification({
        text: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    searchRecipes(searchFilters);
  };

  return (
    <header className={`relative ${isHome ? "bg-header bg-center bg-cover min-h-[600px]" : "bg-darkTeal shadow-lg"}`}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto container px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img className="w-28 sm:w-32" src="/logo.svg" alt="Logotipo" />
          </div>
          <nav className="flex gap-6">
            <NavLink
              className={({ isActive }) =>
                `uppercase font-bold transition-all duration-300 hover:text-lightBlue ${
                  isActive
                    ? "text-lightBlue border-b-2 border-lightBlue"
                    : "text-cream hover:border-b-2 hover:border-lightBlue"
                }`
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `uppercase font-bold transition-all duration-300 hover:text-lightBlue ${
                  isActive
                    ? "text-lightBlue border-b-2 border-lightBlue"
                    : "text-cream hover:border-b-2 hover:border-lightBlue"
                }`
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form onSubmit={handleSubmit} className="mt-16 sm:mt-24 md:w-2/3 lg:w-1/2 mx-auto bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-xl shadow-2xl space-y-6 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-cream font-extrabold text-lg sm:text-xl"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                value={searchFilters.ingredient}
                onChange={handleSearch}
                className="p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal border border-gray-300 transition-all duration-300"
                placeholder="Nombre o Ingredientes"
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-cream font-extrabold text-lg sm:text-xl"
              >
                Categoría
              </label>
              <select
                name="category"
                id="category"
                className="p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal border border-gray-300 transition-all duration-300"
                value={searchFilters.category}
                onChange={handleSearch}
              >
                <option value="">-- Seleccione --</option>
                {categories.drinks.map((category) => (
                  <option key={category.strCategory} value={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Buscar Recetas"
              className="cursor-pointer uppercase text-cream bg-gradient-to-r from-teal to-lightBlue text-white p-4 rounded-lg w-full font-bold hover:from-darkTeal hover:to-teal transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            />
          </form>
        )}
      </div>
    </header>
  );
}
