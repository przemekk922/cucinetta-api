import { Router } from "express";
import { getRecipeByIdHandler, getRecipesHandler } from "./recipes.controller.js";

const recipesRouter = Router();

recipesRouter.get("/recipes", getRecipesHandler);
recipesRouter.get("/recipes/:recipeId", getRecipeByIdHandler);

export { recipesRouter };
