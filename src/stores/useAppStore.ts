
import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipesSlices, RecipesSliceType } from './recipeSlice';
import { createFavoriteSlice,FavoritesSliceType } from './favoriteSlice';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType>()(devtools((...a) => ({
    ...createRecipesSlices(...a),
    ...createFavoriteSlice(...a),
})));

 