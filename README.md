<div align="center">

<img src="https://cdn-icons-png.flaticon.com/512/4144/4144513.png" width="160"/>

# ☁️ Cloud Cost Calculator

### Modern Full-Stack Cloud Pricing Estimator 🚀

Estimate EC2, storage, bandwidth, monthly billing, and yearly infrastructure costs with a clean and modern dashboard.

<br/>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

---

# ✨ Overview

Cloud Cost Calculator is a modern SaaS-style full-stack application that helps developers, startups, and students estimate cloud infrastructure pricing before deployment 💸

The project currently supports:

✅ EC2 compute pricing  
✅ Storage pricing estimation  
✅ Bandwidth cost calculation  
✅ Monthly & yearly projections  
✅ Region-based pricing selection  
✅ Responsive dashboard UI  
✅ Backend API validation  
✅ Docker-ready setup  

The architecture is designed to scale into a production-ready cloud analytics platform with authentication, PostgreSQL, Prisma, dashboards, and deployment pipelines 🚀

---

# 🖼️ Preview

<div align="center">

<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop" width="90%" />

</div>

---

# 🛠️ Tech Stack

## 🎨 Frontend
- ⚛️ React
- ⚡ Vite
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 📊 Recharts

## 🔧 Backend
- 🟢 Node.js
- 🚂 Express.js
- 🛡️ Zod Validation
- 🔷 TypeScript

## 🗄️ Database (Planned)
- 🐘 PostgreSQL
- 🔺 Prisma ORM

## ☁️ DevOps & Deployment
- 🐳 Docker
- 📦 docker-compose
- ▲ Vercel
- ☁️ Render / AWS EC2

---

# ✨ Features

## ☁️ Compute Pricing
- EC2 instance pricing calculator
- Region-aware cost calculations
- Multiple instance support

## 💾 Storage Pricing
- S3 storage estimation
- Storage class selection
- Flexible GB calculations

## 🌐 Network Pricing
- Bandwidth transfer cost estimation
- Usage-based pricing model

## 📈 Billing Analytics
- Monthly billing estimates
- Yearly projections
- Dynamic pricing totals

## 🔒 Backend Security
- Zod API validation
- Centralized error handling
- Helmet security headers
- Rate limiting
- Secure environment variables

---

# 📂 Project Structure

```txt
cloud-cost-calculator/
├── apps/
│   ├── api/                 # 🚂 Express backend
│   └── web/                 # ⚛️ React frontend
├── packages/
│   └── shared/              # 🔁 Shared TypeScript types
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 🚀 Local Development

## 📦 Install Dependencies

```bash
npm install
```

## ▶️ Start Backend

```bash
npm run dev:api
```

## ▶️ Start Frontend

```bash
npm run dev:web
```

---

# 🌐 Local URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:4000 |
| Health Check | http://localhost:4000/api/health |

---

# ⚙️ Environment Variables

Create a `.env` file from `.env.example`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cloud_cost_calculator"

JWT_SECRET="replace-with-a-secure-secret-before-production"

JWT_EXPIRES_IN="7d"

API_PORT=4000

NODE_ENV="development"

CORS_ORIGIN="http://localhost:3000"

VITE_API_URL="http://localhost:4000/api"
```

---

# 🔌 API Routes

```txt
GET  /api/health
GET  /api/pricing/catalog
POST /api/pricing/calculate
```

---

# 📥 Example API Request

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

---

# 📤 Example Response

```json
{
  "monthlyCost": 74.32,
  "yearlyCost": 891.84,
  "breakdown": {
    "compute": 40.12,
    "storage": 21.50,
    "bandwidth": 12.70
  }
}
```

---

# 🐳 Docker Setup

## ▶️ Start Containers

```bash
docker compose up --build
```

---

# 📦 Docker Services

| Service | Port |
|---|---|
| Frontend | 3000 |
| Backend | 4000 |
| PostgreSQL | 5432 |

---

# 🔒 Security Practices

✅ Validate API inputs with Zod  
✅ Use centralized error handling  
✅ Use Helmet for secure HTTP headers  
✅ Enable API rate limiting  
✅ Restrict CORS in production  
✅ Keep secrets out of Git  
✅ Recalculate trusted totals on backend  

---

# 🌳 Git Workflow

## Recommended Branches

```txt
main
develop
feature/mvp-calculator
feature/auth
feature/dashboard
feature/docker
```

---

# 📝 Commit Convention

```txt
feat: add cloud pricing calculator
feat: add yearly cost projections
fix: validate pricing ranges
chore: add docker compose setup
docs: improve README design
```

---

# 🚀 Deployment Guide

# ▲ Frontend Deployment (Vercel)

1. Import GitHub repository
2. Set root directory → `apps/web`
3. Build command:

```bash
npm run build
```

4. Output directory:

```txt
dist
```

5. Add environment variable:

```env
VITE_API_URL=https://your-api-url.com/api
```

6. Deploy 🎉

---

# ☁️ Backend Deployment (Render)

## Build Command

```bash
npm install &&
npm run build -w packages/shared &&
npm run build -w apps/api
```

## Start Command

```bash
npm run start -w apps/api
```

## Required Environment Variables

```env
API_PORT=
DATABASE_URL=
JWT_SECRET=
CORS_ORIGIN=
```

---

# 🗺️ Future Roadmap

- 🔐 JWT Authentication
- 👤 User Accounts
- 💾 Saved Estimates
- 📊 Cost Analytics Dashboard
- 📈 Historical Usage Tracking
- 🤖 AI Cost Recommendations
- ☁️ Multi-Cloud Support
- 📤 PDF/CSV Export
- 🔔 Budget Alerts
- 👥 Team Collaboration

---

# 📸 Future UI Ideas

- 🌙 Dark mode dashboard
- 📈 Interactive analytics charts
- 🧠 AI cloud recommendations
- 🔔 Cost optimization alerts
- ☁️ AWS-style billing dashboard


# 🤝 Contributing

Contributions are welcome 🚀

## Steps

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ⭐ Star the Repository if You Like the Project

Built with ☁️ + ❤️ using React, Node.js, TypeScript, and Docker.

</div>
