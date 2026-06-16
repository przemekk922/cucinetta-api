import { findRecipeById, findRecipes } from "./recipes.repository.js";
import type { Recipe, RecipesListQuery, RecipesListResult } from "./recipes.types.js";

export async function getRecipes(query: RecipesListQuery): Promise<RecipesListResult> {
  const skip = (query.page - 1) * query.perPage;

  const { recipes, total } = await findRecipes({
    search: query.search,
    sortBy: query.sortBy,
    order: query.order,
    skip,
    take: query.perPage,
  });

  const totalPages = total === 0 ? 0 : Math.ceil(total / query.perPage);

  return {
    recipes,
    total,
    page: query.page,
    perPage: query.perPage,
    totalPages,
  };
}

export async function getRecipeById(recipeId: number): Promise<Recipe | undefined> {
  const recipe = await findRecipeById(recipeId);

  if (!recipe) {
    return undefined;
  }

  return recipe;
}
