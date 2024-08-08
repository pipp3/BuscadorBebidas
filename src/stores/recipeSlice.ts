import { StateCreator } from "zustand";
import { getCategories,getRecipeById,getRecipes } from "../services/RecipeService";
import type { Categories, Drinks, SearchFilter,Drink,Recipe } from "../types";

export type RecipesSliceType={
    categories: Categories;
    drinks: Drinks;
    selectedRecipe: Recipe;
    modal:boolean;
    fetchCategories: ()=>Promise<void>;
    searchRecipes: (SearchFilters:SearchFilter)=>Promise<void>;
    selectRecipe: (id:Drink['idDrink'])=>Promise<void>;
    closeModal: ()=>void;
}

export const createRecipesSlices : StateCreator<RecipesSliceType> = (set)=>({
    categories: {
        drinks: []
    },
    drinks:{
        drinks:[]
    },
    selectedRecipe:{} as Recipe,
    modal:false,

    fetchCategories: async()=>{
        const categories= await getCategories()
        
        set({categories})
    },
    searchRecipes: async(filters)=>{
       const drinks= await getRecipes(filters)
       set({drinks})
    },
    selectRecipe: async(id)=>{
       const selectRecipe= await getRecipeById(id)
       set({selectedRecipe:selectRecipe,modal:true})
    },
    closeModal:()=>{
        set({
            modal:false,
            selectedRecipe:{} as Recipe
        })
    }
})