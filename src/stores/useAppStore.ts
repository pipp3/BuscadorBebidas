
import {create} from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipesSlices, RecipesSliceType } from './recipeSlice';
import { createFavoriteSlice,FavoritesSliceType } from './favoriteSlice';
import { NotificationSliceType,createNotificationSlice } from './notificationSlice';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(devtools((...a) => ({
    ...createRecipesSlices(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
})));

 