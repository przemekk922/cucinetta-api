import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("GET /health", () => {
  it("returns status 200", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
  });

  it("returns { status: 'ok' }", async () => {
    const response = await request(app).get("/health");

    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /recipes", () => {
  it("returns status 200", async () => {
    const response = await request(app).get("/recipes");

    expect(response.status).toBe(200);
  });

  it("returns an object with recipes, total, page, perPage, and totalPages", async () => {
    const response = await request(app).get("/recipes");

    expect(response.body).toMatchObject({
      recipes: expect.any(Array),
      total: expect.any(Number),
      page: expect.any(Number),
      perPage: expect.any(Number),
      totalPages: expect.any(Number),
    });
  });

  it("defaults to page = 1 and perPage = 9", async () => {
    const response = await request(app).get("/recipes");

    expect(response.body.page).toBe(1);
    expect(response.body.perPage).toBe(9);
  });
});

describe("GET /recipes?search=chicken", () => {
  it("returns status 200", async () => {
    const response = await request(app).get("/recipes?search=chicken");

    expect(response.status).toBe(200);
  });

  it("returns only recipes whose name contains chicken, case-insensitive", async () => {
    const response = await request(app).get("/recipes?search=chicken");

    for (const recipe of response.body.recipes) {
      expect(recipe.name.toLowerCase()).toContain("chicken");
    }
  });
});

describe("GET /recipes?sortBy=rating&order=desc", () => {
  it("returns status 200", async () => {
    const response = await request(app).get("/recipes?sortBy=rating&order=desc");

    expect(response.status).toBe(200);
  });

  it("returns results sorted by rating descending", async () => {
    const response = await request(app).get("/recipes?sortBy=rating&order=desc");
    const ratings = response.body.recipes.map(
      (recipe: { rating: number }) => recipe.rating
    );

    for (let index = 1; index < ratings.length; index++) {
      expect(ratings[index - 1]).toBeGreaterThanOrEqual(ratings[index]);
    }
  });
});

describe("GET /recipes?page=2&perPage=6", () => {
  it("returns status 200", async () => {
    const response = await request(app).get("/recipes?page=2&perPage=6");

    expect(response.status).toBe(200);
  });

  it("returns page = 2, perPage = 6, and no more than 6 results", async () => {
    const response = await request(app).get("/recipes?page=2&perPage=6");

    expect(response.body.page).toBe(2);
    expect(response.body.perPage).toBe(6);
    expect(response.body.recipes.length).toBeLessThanOrEqual(6);
  });
});

describe("GET /recipes/:recipeId", () => {
  it("returns status 200 and the recipe for an existing ID", async () => {
    const response = await request(app).get("/recipes/1");

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });
});

describe("GET /recipes/999999", () => {
  it("returns status 404 with a clear error message", async () => {
    const response = await request(app).get("/recipes/999999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Recipe with id 999999 not found");
  });
});

describe("GET /recipes?sortBy=unknown", () => {
  it("returns status 400 with a clear error message", async () => {
    const response = await request(app).get("/recipes?sortBy=unknown");

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(typeof response.body.message).toBe("string");
    expect(response.body.message.length).toBeGreaterThan(0);
  });
});

describe("GET /recipes?perPage=10", () => {
  it("returns status 400", async () => {
    const response = await request(app).get("/recipes?perPage=10");

    expect(response.status).toBe(400);
  });
});

describe("GET /recipes?page=0", () => {
  it("returns status 400", async () => {
    const response = await request(app).get("/recipes?page=0");

    expect(response.status).toBe(400);
  });
});
