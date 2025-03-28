import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";
import { useAppStore } from "../stores/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
  const modal = useAppStore((state) => state.modal);
  const closeModal = useAppStore((state) => state.closeModal);
  const selectedRecipe = useAppStore((state) => state.selectedRecipe);
  const handleClickFavorite = useAppStore((state) => state.handleClickFavorite);
  const favoriteExist = useAppStore((state) => state.favoriteExist);

  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="flex items-center gap-2 text-lg">
            <span className="w-2 h-2 bg-teal rounded-full"></span>
            <span className="text-darkTeal">{ingredient}</span>
            <span className="text-teal">-</span>
            <span className="text-darkTeal">{measure}</span>
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-2xl bg-cream px-4 pt-5 pb-4 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="rounded-md text-darkTeal/70 hover:text-darkTeal focus:outline-none"
                      onClick={closeModal}
                    >
                      <span className="sr-only">Cerrar</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <DialogTitle
                        as="h3"
                        className="text-3xl font-bold text-darkTeal mb-6 text-center"
                      >
                        {selectedRecipe.strDrink}
                      </DialogTitle>
                      
                      <div className="relative group">
                        <img
                          src={selectedRecipe.strDrinkThumb}
                          alt={`Imagen de ${selectedRecipe.strDrink}`}
                          className="mx-auto w-full max-w-md rounded-xl shadow-lg transform transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-darkTeal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      </div>

                      <div className="mt-8 space-y-6">
                        <div>
                          <h4 className="text-xl font-semibold text-darkTeal mb-4">Ingredientes</h4>
                          <ul className="space-y-2">
                            {renderIngredients()}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xl font-semibold text-darkTeal mb-4">Instrucciones</h4>
                          <p className="text-lg text-darkTeal leading-relaxed">
                            {selectedRecipe.strInstructions}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                          <button
                            onClick={closeModal}
                            className="flex-1 py-3 px-4 rounded-xl uppercase bg-gradient-to-r from-teal to-lightBlue text-white font-bold 
                              hover:from-darkTeal hover:to-teal transform transition-all duration-300 hover:scale-[1.02] 
                              active:scale-[0.98] shadow-md hover:shadow-lg text-cream"
                            type="button"
                          >
                            Cerrar
                          </button>
                          <button
                            onClick={() => {
                              handleClickFavorite(selectedRecipe);
                              closeModal();
                            }}
                            className="flex-1 py-3 px-4 rounded-xl uppercase bg-gradient-to-r from-lightBlue to-teal text-white font-bold 
                              hover:from-teal hover:to-darkTeal transform transition-all duration-300 hover:scale-[1.02] 
                              active:scale-[0.98] shadow-md hover:shadow-lg text-cream"
                            type="button"
                          >
                            {favoriteExist(selectedRecipe.idDrink) ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
