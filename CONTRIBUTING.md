# Contributing to Dr. Ahmed Pharmacy

Thank you for your interest in contributing to **Dr. Ahmed Pharmacy (`صيدلية د. أحمد طارق سليم`)**!

This project is a clean decoupled monorepo comprising:
- **Frontend**: TanStack Start, React 19, Tailwind CSS v4 (`dr-ahmed/`)
- **Backend**: ASP.NET Core .NET 9 Web API (`server-api/`)
- **Database**: PostgreSQL on Supabase (`database/`)

---

## Code of Conduct

Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

---

## Development Setup

### Prerequisites
- **Node.js**: v20.x or v22.x+
- **pnpm**: v12+ — install with `npm install -g pnpm` or via [pnpm.io](https://pnpm.io/installation)
- **.NET SDK**: 9.0+
- **Git**

### Installation
```bash
# Clone the repository
git clone https://github.com/Confidential-solutions/Pharma-Dr-Ahmed-Eg.git
cd Pharma-Dr-Ahmed-Eg

# Install frontend dependencies (uses pnpm-lock.yaml for reproducibility)
cd dr-ahmed
pnpm install
cd ..

# Restore backend dependencies
cd server-api
dotnet restore
cd ..
```

### Running Locally
```bash
# Terminal 1: Run Backend API
pnpm run:backend

# Terminal 2: Run Frontend App
pnpm dev:frontend
```
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend Swagger: [http://localhost:5076/swagger](http://localhost:5076/swagger)
- Backend Scalar: [http://localhost:5076/scalar/v1](http://localhost:5076/scalar/v1)

---

## Git Workflow & Branching

1. Fork or create a branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-description
   ```
2. Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
   - `feat:` A new feature
   - `fix:` A bug fix
   - `perf:` Performance improvements
   - `docs:` Documentation updates
   - `refactor:` Code changes without logic alteration
   - `test:` Adding or updating tests
   - `ci:` CI/CD and workflow changes

---

## Verification Before Pull Requests

Always run full verifications before submitting a pull request:

```bash
# 1. Type check frontend
cd dr-ahmed && pnpm exec tsc --noEmit && cd ..

# 2. Build frontend
pnpm run build:frontend

# 3. Build & test backend
pnpm run build:backend
pnpm run test:backend

# 4. Verify database connectivity
pnpm run db:verify
```

---

## Pull Request Guidelines

- Fill out the provided [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md).
- Ensure both Arabic (RTL) and English (LTR) layouts render correctly for any UI changes.
- Never commit credentials, Supabase service keys, or personal access tokens.
- Keep commits granular and purposeful.

