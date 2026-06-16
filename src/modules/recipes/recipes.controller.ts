import type { Request, Response } from "express";
import {
  formatValidationError,
  recipeIdParamSchema,
  recipesListQuerySchema,
} from "./recipes.schemas.js";
import { getRecipeById, getRecipes } from "./recipes.service.js";

export async function getRecipesHandler(
  request: Request,
  response: Response
): Promise<void> {
  const validationResult = recipesListQuerySchema.safeParse(request.query);

  if (!validationResult.success) {
    response.status(400).json({
      message: formatValidationError(validationResult.error),
    });
    return;
  }

  const result = await getRecipes(validationResult.data);

  response.json(result);
}

export async function getRecipeByIdHandler(
  request: Request,
  response: Response
): Promise<void> {
  const validationResult = recipeIdParamSchema.safeParse(request.params);

  if (!validationResult.success) {
    response.status(400).json({
      message: formatValidationError(validationResult.error),
    });
    return;
  }

  const recipe = await getRecipeById(validationResult.data.recipeId);

  if (!recipe) {
    response.status(404).json({
      message: `Recipe with id ${validationResult.data.recipeId} not found`,
    });
    return;
  }

  response.json(recipe);
}
