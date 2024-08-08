import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType={
    favorites: Recipe[];
    handleClickFavorite: (recipe: Recipe) => void;
}

export const createFavoriteSlice: StateCreator<FavoritesSliceType> = () => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        console.log(recipe);
    }
})