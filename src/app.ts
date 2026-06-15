import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";

const app = express();

app.use(express.json());
app.use(healthRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
