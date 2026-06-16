# Cucinetta API

Backend service for the Cucinetta application.

## Requirements

- Node.js 20+

## Installation

```bash
npm install
```

Copy the environment variables file:

```bash
cp .env.example .env
```

## Running

Development mode (with hot reload):

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Scripts

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run dev`       | Starts the server in development mode |
| `npm run build`     | Compiles TypeScript to `dist/`        |
| `npm start`         | Runs the compiled application         |
| `npm run typecheck` | Type-checks without compiling         |
| `npm run test`      | Runs integration tests                |

## Database

Start PostgreSQL and prepare the database:

```bash
docker compose up -d
npm run db:push
npm run db:seed
```

Integration tests read recipes from the database, so run the commands above before `npm run test`.

## Scripts (database)

| Script              | Description                          |
|---------------------|--------------------------------------|
| `npm run db:generate` | Generates Prisma Client              |
| `npm run db:push`     | Pushes schema to the database        |
| `npm run db:seed`     | Seeds recipes into the database      |
| `npm run db:studio`   | Opens Prisma Studio                  |

## Endpoints

### `GET /health`

Checks whether the server is running.

**Response:**

```json
{
  "status": "ok"
}
```

## Configuration

| Variable   | Default       | Description |
|------------|---------------|-------------|
| `PORT`         | `4000`        | Server port |
| `NODE_ENV`     | `development` | Environment |
| `DATABASE_URL` | —             | PostgreSQL connection string |
