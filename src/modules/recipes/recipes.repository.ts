import type { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import type { Recipe, RecipeSortField, SortOrder } from "./recipes.types.js";

type RecipeRecord = Prisma.RecipeGetPayload<object>;

function toRecipe(record: RecipeRecord): Recipe {
  return {
    id: record.id,
    name: record.name,
    imageUrl: record.imageUrl,
    cuisine: record.cuisine,
    difficulty: record.difficulty,
    prepTimeMinutes: record.prepTimeMinutes,
    cookTimeMinutes: record.cookTimeMinutes,
    servings: record.servings,
    caloriesPerServing: record.caloriesPerServing,
    rating: record.rating,
    reviewCount: record.reviewCount,
    ingredients: record.ingredients as string[],
    instructions: record.instructions as string[],
    tags: record.tags as string[],
    mealTypes: record.mealTypes as string[],
  };
}

function buildWhereClause(search?: string): Prisma.RecipeWhereInput {
  if (!search) {
    return {};
  }

  return {
    name: {
      contains: search,
      mode: "insensitive",
    },
  };
}

function buildOrderBy(
  sortBy?: RecipeSortField,
  order: SortOrder = "asc"
): Prisma.RecipeOrderByWithRelationInput | undefined {
  if (!sortBy) {
    return undefined;
  }

  return { [sortBy]: order };
}

export async function findRecipes(params: {
  search?: string;
  sortBy?: RecipeSortField;
  order: SortOrder;
  skip: number;
  take: number;
}): Promise<{ recipes: Recipe[]; total: number }> {
  const where = buildWhereClause(params.search);
  const orderBy = buildOrderBy(params.sortBy, params.order);

  const [records, total] = await Promise.all([
    prisma.recipe.findMany({
      where,
      orderBy,
      skip: params.skip,
      take: params.take,
    }),
    prisma.recipe.count({ where }),
  ]);

  return {
    recipes: records.map(toRecipe),
    total,
  };
}

export async function findRecipeById(recipeId: number): Promise<Recipe | null> {
  const record = await prisma.recipe.findUnique({
    where: { id: recipeId },
  });

  if (!record) {
    return null;
  }

  return toRecipe(record);
}
