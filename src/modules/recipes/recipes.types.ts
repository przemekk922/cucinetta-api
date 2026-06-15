export interface Recipe {
  id: number;
  name: string;
  imageUrl: string;
  cuisine: string;
  difficulty: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  mealTypes: string[];
}

export interface RecipesListResult {
  recipes: Recipe[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export type RecipeSortField =
  | "name"
  | "rating"
  | "prepTimeMinutes"
  | "cookTimeMinutes"
  | "caloriesPerServing";

export type SortOrder = "asc" | "desc";

export interface RecipesListQuery {
  search?: string;
  sortBy?: RecipeSortField;
  order: SortOrder;
  page: number;
  perPage: number;
}
