# Cloud Cost Calculator

A full-stack cloud pricing estimator for EC2, storage, bandwidth, monthly totals, and yearly projections. The current codebase implements the Phase 1 MVP and is structured to grow into authentication, PostgreSQL-backed saved estimates, analytics, Docker, and production deployment.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind CSS, Recharts
- Backend: Node.js, Express.js, TypeScript, Zod
- Database path: PostgreSQL with Prisma planned for Phase 2
- DevOps: Docker, docker-compose, environment variables
- Deployment path: Vercel frontend, Render or AWS EC2 backend

## Features Implemented

- EC2 cost calculator
- Storage cost calculator
- Bandwidth pricing calculator
- Monthly and yearly cost totals
- Region and instance type selection
- Responsive modern UI
- Express API with validation and centralized error handling
- Docker and docker-compose foundation

## Project Structure

```txt
cloud-cost-calculator/
├── apps/
│   ├── api/                 # Express backend
│   └── web/                 # React frontend
├── packages/
│   └── shared/              # Shared TypeScript types
├── docker-compose.yml
├── .env.example
└── README.md
```

## Local Setup

```bash
npm install
npm run dev:api
npm run dev:web
```

Open the frontend at `http://localhost:3000` and the backend health check at `http://localhost:4000/api/health`.

## Environment Variables

Copy `.env.example` to `.env` for local development and update values as needed.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cloud_cost_calculator"
JWT_SECRET="replace-with-a-secure-secret-before-production"
JWT_EXPIRES_IN="7d"
API_PORT=4000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"
VITE_API_URL="http://localhost:4000/api"
```

## API Routes

```txt
GET  /api/health
GET  /api/pricing/catalog
POST /api/pricing/calculate
```

Example calculation body:

```json
{
  "region": "us-east-1",
  "instanceType": "t3.micro",
  "instanceCount": 2,
  "hoursPerDay": 8,
  "daysPerMonth": 22,
  "storageGb": 250,
  "storageClass": "s3-standard",
  "bandwidthGb": 100
}
```

## Docker

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- PostgreSQL: `localhost:5432`

## Security Practices

- Validate API inputs with Zod
- Use centralized error handling
- Use Helmet for secure HTTP headers
- Use rate limiting for API routes
- Restrict CORS in production
- Keep secrets out of Git
- Recalculate trusted totals on the backend

## Git Workflow

Recommended branches:

```txt
main
develop
feature/mvp-calculator
feature/auth
feature/dashboard
feature/docker
```

Commit style examples:

```txt
feat: add cloud cost calculator MVP
feat: add pricing calculation API
fix: validate calculator input ranges
chore: add docker compose setup
docs: document local setup
```

## Deployment Guide

Frontend on Vercel:

1. Import the GitHub repo into Vercel.
2. Set the root directory to `apps/web`.
3. Set build command to `npm run build`.
4. Set output directory to `dist`.
5. Add `VITE_API_URL` pointing to the deployed backend URL.
6. Deploy.

Backend on Render:

1. Create a Web Service from the GitHub repo.
2. Set the root directory to `apps/api` if deploying the app alone, or use the root with workspace commands.
3. Build command: `npm install && npm run build -w packages/shared && npm run build -w apps/api`.
4. Start command: `npm run start -w apps/api`.
5. Add `API_PORT`, `CORS_ORIGIN`, `DATABASE_URL`, and `JWT_SECRET`.

Database:

- Use Render Postgres, Neon, Supabase, or AWS RDS for production.
- Phase 2 will add Prisma migrations.
