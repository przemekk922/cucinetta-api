import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { recipes } from "../src/modules/recipes/recipes.data.js";

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Copy .env.example to .env and configure your PostgreSQL connection."
    );
  }

  return databaseUrl;
}

const adapter = new PrismaPg({
  connectionString: getDatabaseUrl(),
});

const prisma = new PrismaClient({ adapter });

async function seed(): Promise<void> {
  for (const recipe of recipes) {
    await prisma.recipe.upsert({
      where: { id: recipe.id },
      update: {
        name: recipe.name,
        imageUrl: recipe.imageUrl,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        caloriesPerServing: recipe.caloriesPerServing,
        rating: recipe.rating,
        reviewCount: recipe.reviewCount,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tags: recipe.tags,
        mealTypes: recipe.mealTypes,
      },
      create: {
        id: recipe.id,
        name: recipe.name,
        imageUrl: recipe.imageUrl,
        cuisine: recipe.cuisine,
        difficulty: recipe.difficulty,
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        caloriesPerServing: recipe.caloriesPerServing,
        rating: recipe.rating,
        reviewCount: recipe.reviewCount,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        tags: recipe.tags,
        mealTypes: recipe.mealTypes,
      },
    });
  }

  console.log(`Seeded ${recipes.length} recipes`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
