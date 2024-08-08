import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";
import { createRecipesSlices, RecipesSliceType } from "./recipeSlice";

export type FavoritesSliceType={
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
    favoriteExist: (id: string) => boolean;
    loadFromStorage: () => void;
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [],[],FavoritesSliceType> = (set,get,api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        if(get().favorites.some(favorite=>favorite.idDrink===recipe.idDrink)){
            set({
                favorites:get().favorites.filter(favorite=>favorite.idDrink!==recipe.idDrink)
            })
            createNotificationSlice(set,get,api).showNotification({ text: 'Receta eliminada de favoritos', error: false })
        }
        
        else{
            set({
                favorites:[...get().favorites,recipe]
            })
            createNotificationSlice(set,get,api).showNotification({ text: 'Receta añadida a favoritos', error: false })
        }
        createRecipesSlices(set,get,api).closeModal()
        localStorage.setItem('favorites',JSON.stringify(get().favorites))
    },
    favoriteExist: (id)=>{
        return get().favorites.some(favorite=>favorite.idDrink===id)
    },
    loadFromStorage:()=>{
        const storedFavorites=localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites:JSON.parse(storedFavorites)
            })
        }
    }
})