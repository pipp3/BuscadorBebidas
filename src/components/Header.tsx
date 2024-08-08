import { ChangeEvent, useEffect, useMemo,useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
const [searchFilters, setSearchFilters] = useState({
  ingredient: "",
  category: "",
})
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
  })
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault()
  if(Object.values(searchFilters).includes('')){
    console.log('Debe seleccionar un filtro')
    return
}
searchRecipes(searchFilters)

}
  return (
    <header className={isHome ? "bg-header bg-center bg-cover" : "bg-primary"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="Logotipo" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "uppercase text-[#60a5fa] font-bold"
                  : "uppercase text-fourth font-bold"
              }
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "uppercase text-[#60a5fa] font-bold"
                  : "uppercase text-fourth font-bold"
              }
              to="/favoritos"
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-third my-32 p-10 rounded-lg shadow space-y-6">
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-fourth font-extrabold text-lg"
              >
                Nombre o Ingredientes
              </label>
              <input
                type="text"
                id="ingredient"
                name="ingredient"
                value={searchFilters.ingredient}
                onChange={handleSearch}
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Nombre o Ingredientes"
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-fourth font-extrabold text-lg"
              >
                Categoria
              </label>
              <select
                name="category"
                id="category"
                className="p-3 w-full rounded-lg focus:outline-none"
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
              className="cursor-pointer uppercase bg-secondary text-fourth p-4 rounded-lg w-full font-bold"
            />
          </form>
        )}
      </div>
    </header>
  );
}
