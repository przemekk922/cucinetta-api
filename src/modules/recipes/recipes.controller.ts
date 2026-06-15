import type { Request, Response } from "express";
import {
  formatValidationError,
  recipeIdParamSchema,
  recipesListQuerySchema,
} from "./recipes.schemas.js";
import { getRecipeById, getRecipes } from "./recipes.service.js";

export function getRecipesHandler(request: Request, response: Response): void {
  const validationResult = recipesListQuerySchema.safeParse(request.query);

  if (!validationResult.success) {
    response.status(400).json({
      message: formatValidationError(validationResult.error),
    });
    return;
  }

  const result = getRecipes(validationResult.data);

  response.json(result);
}

export function getRecipeByIdHandler(request: Request, response: Response): void {
  const validationResult = recipeIdParamSchema.safeParse(request.params);

  if (!validationResult.success) {
    response.status(400).json({
      message: formatValidationError(validationResult.error),
    });
    return;
  }

  const recipe = getRecipeById(validationResult.data.recipeId);

  if (!recipe) {
    response.status(404).json({
      message: `Recipe with id ${validationResult.data.recipeId} not found`,
    });
    return;
  }

  response.json(recipe);
}
