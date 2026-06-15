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
| `PORT`     | `4000`        | Server port |
| `NODE_ENV` | `development` | Environment |
