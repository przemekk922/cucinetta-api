import { recipes } from "./recipes.data.js";
import type {
  Recipe,
  RecipesListQuery,
  RecipesListResult,
  RecipeSortField,
  SortOrder,
} from "./recipes.types.js";

function filterBySearch(recipeList: Recipe[], search?: string): Recipe[] {
  if (!search) {
    return recipeList;
  }

  const normalizedSearch = search.toLowerCase();

  return recipeList.filter((recipe) =>
    recipe.name.toLowerCase().includes(normalizedSearch)
  );
}

function sortRecipes(
  recipeList: Recipe[],
  sortBy?: RecipeSortField,
  order: SortOrder = "asc"
): Recipe[] {
  if (!sortBy) {
    return recipeList;
  }

  const direction = order === "asc" ? 1 : -1;

  return [...recipeList].sort((first, second) => {
    const firstValue = first[sortBy];
    const secondValue = second[sortBy];

    if (typeof firstValue === "string" && typeof secondValue === "string") {
      return firstValue.localeCompare(secondValue) * direction;
    }

    if (typeof firstValue === "number" && typeof secondValue === "number") {
      return (firstValue - secondValue) * direction;
    }

    return 0;
  });
}

function paginateRecipes(
  recipeList: Recipe[],
  page: number,
  perPage: number
): RecipesListResult {
  const total = recipeList.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedRecipes = recipeList.slice(startIndex, startIndex + perPage);

  return {
    recipes: paginatedRecipes,
    total,
    page,
    perPage,
    totalPages,
  };
}

export function getRecipes(query: RecipesListQuery): RecipesListResult {
  const filtered = filterBySearch(recipes, query.search);
  const sorted = sortRecipes(filtered, query.sortBy, query.order);

  return paginateRecipes(sorted, query.page, query.perPage);
}

export function getRecipeById(recipeId: number): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === recipeId);
}
