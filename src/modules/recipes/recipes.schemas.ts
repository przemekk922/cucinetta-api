import { z } from "zod";

const sortByValues = [
  "name",
  "rating",
  "prepTimeMinutes",
  "cookTimeMinutes",
  "caloriesPerServing",
] as const;

const orderValues = ["asc", "desc"] as const;

const perPageValues = [6, 9, 12, 15] as const;

export const recipesListQuerySchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(sortByValues).optional(),
  order: z.enum(orderValues).default("asc"),
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce
    .number()
    .int()
    .refine((value) => perPageValues.includes(value as typeof perPageValues[number]), {
      message: "perPage must be one of: 6, 9, 12, 15",
    })
    .default(9),
});

export const recipeIdParamSchema = z.object({
  recipeId: z.coerce.number().int().positive({
    message: "recipeId must be a positive integer",
  }),
});

export function formatValidationError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join("; ");
}
