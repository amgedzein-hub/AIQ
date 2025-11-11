# File Manifest

Complete listing of all files created for the Arabic IQ Test Platform.

## Root Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Monorepo root configuration with workspaces |
| `turbo.json` | Turbo build system configuration |
| `tsconfig.json` | Root TypeScript configuration |
| `.env.example` | Environment variables template |
| `.eslintrc.json` | ESLint configuration |
| `.prettierrc.json` | Code formatter configuration |
| `.gitignore` | Git ignore patterns |
| `docker-compose.yml` | Docker Compose for local development |
| `render.yaml` | Render deployment configuration |

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Complete project overview and guide |
| `QUICKSTART.md` | Quick start guide for getting started |
| `DEPLOYMENT.md` | Detailed deployment instructions |
| `ARCHITECTURE.md` | Technical architecture and design patterns |
| `CONTRIBUTING.md` | Contributing guidelines |
| `PROJECT_SUMMARY.md` | Summary of all developed components |
| `FILE_MANIFEST.md` | This file - complete file listing |

## Frontend Application (`apps/frontend/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Frontend dependencies and scripts |
| `tsconfig.json` | Frontend TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `jest.config.js` | Jest testing configuration |
| `jest.setup.js` | Jest setup file |
| `playwright.config.ts` | Playwright E2E testing configuration |
| `Dockerfile` | Docker image for frontend |

### Source Code (`src/`)
| File | Purpose |
|------|---------|
| `i18n.ts` | Internationalization setup |
| `app/layout.tsx` | Root layout with i18n provider |
| `app/[locale]/page.tsx` | Home page |
| `app/[locale]/test/page.tsx` | Test interface page |
| `app/[locale]/auth/login/page.tsx` | Login page |
| `app/[locale]/auth/signup/page.tsx` | Sign up page |
| `components/TestInterface.tsx` | Main test component |
| `components/ResultsDashboard.tsx` | Results visualization component |
| `hooks/useAuth.ts` | Authentication hook |
| `styles/globals.css` | Global styles |
| `messages/ar.json` | Arabic translations |
| `messages/en.json` | English translations |

### Testing Files
| File | Purpose |
|------|---------|
| `e2e/test.spec.ts` | Playwright E2E tests |

## Backend Application (`apps/backend/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Backend dependencies and scripts |
| `tsconfig.json` | Backend TypeScript configuration |
| `jest.config.js` | Jest testing configuration |
| `Dockerfile` | Docker image for backend |

### Source Code (`src/`)
| File | Purpose |
|------|---------|
| `index.ts` | Server setup and plugin registration |
| `routes/health.ts` | Health check endpoint |
| `routes/questions.ts` | Question retrieval endpoint |
| `routes/answers.ts` | Answer submission endpoint |
| `routes/results.ts` | Results retrieval endpoint |
| `routes/questions.test.ts` | Unit tests for questions route |
| `services/question-bank.ts` | Question bank service |
| `services/scoring-engine.ts` | Scoring engine service |
| `utils/logger.ts` | Winston logging setup |

## Question Bank Package (`packages/question-bank/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Package dependencies |
| `tsconfig.json` | TypeScript configuration |

### Source Code (`src/`)
| File | Purpose |
|------|---------|
| `types.ts` | Zod schemas and TypeScript types |
| `questions.json` | Question database with IRT parameters |
| `index.ts` | Public API for question bank |

## Scoring Engine Package (`packages/scoring-engine/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Package dependencies |
| `tsconfig.json` | TypeScript configuration |

### Source Code (`src/`)
| File | Purpose |
|------|---------|
| `irt.ts` | IRT mathematical implementation |
| `irt.test.ts` | Unit tests for IRT calculations |
| `claude-integration.ts` | Claude API integration |
| `index.ts` | Main scoring engine class |

## GitHub Actions Workflows (`.github/workflows/`)

| File | Purpose |
|------|---------|
| `ci.yml` | CI pipeline (lint, test, build) |
| `deploy-vercel.yml` | Auto-deploy frontend to Vercel |
| `deploy-render.yml` | Auto-deploy backend to Render |

## Summary Statistics

### File Counts
- **Total Files**: 70+
- **Configuration Files**: 17
- **Documentation Files**: 7
- **Source Code Files**: 34
- **Test Files**: 3
- **Docker Files**: 3
- **GitHub Actions Workflows**: 3

### Code Statistics
- **Frontend Components**: 3
- **Backend Routes**: 4
- **TypeScript Files**: 40+
- **JSON Configuration Files**: 10
- **Test Files**: 3+
- **Markdown Documentation**: 7

### Language Breakdown
- TypeScript: 40+ files
- JSON: 12+ files
- JavaScript: 8+ files
- Markdown: 7 files
- YAML: 3 files
- Dockerfile: 3 files

## File Organization by Layer

### Presentation Layer (Frontend)
- `apps/frontend/src/app/` - Pages
- `apps/frontend/src/components/` - Components
- `apps/frontend/src/styles/` - Styling
- `apps/frontend/src/messages/` - Translations
- `apps/frontend/src/hooks/` - Custom hooks

### API Layer (Backend)
- `apps/backend/src/routes/` - API endpoints
- `apps/backend/src/services/` - Business logic
- `apps/backend/src/utils/` - Utilities

### Domain Layer (Packages)
- `packages/question-bank/` - Question data
- `packages/scoring-engine/` - Scoring logic

### Infrastructure
- Root configuration files
- Docker setup
- GitHub Actions workflows
- Deployment configurations

## Critical Files to Review

### Getting Started
1. `QUICKSTART.md` - Start here
2. `README.md` - Full overview
3. `ARCHITECTURE.md` - Technical details

### Development
1. `CONTRIBUTING.md` - Development guidelines
2. `.eslintrc.json` - Code style
3. `tsconfig.json` - TypeScript settings

### Deployment
1. `DEPLOYMENT.md` - Production deployment
2. `render.yaml` - Backend deployment
3. `.github/workflows/` - CI/CD pipelines

### Testing
1. `jest.config.js` (frontend & backend)
2. `playwright.config.ts`
3. `**/**.test.ts` files

## Dependencies Overview

### Frontend Dependencies (12+)
- `next`, `react`, `react-dom`
- `next-intl`, `tailwindcss`
- `@supabase/auth-helpers-nextjs`, `@supabase/supabase-js`
- `axios`, `recharts`, `zustand`, `clsx`

### Backend Dependencies (11+)
- `fastify`, `@fastify/cors`, `@fastify/jwt`, `@fastify/helmet`, `@fastify/rate-limit`
- `pg`, `axios`, `@anthropic-ai/sdk`
- `dotenv`, `zod`, `winston`, `sentry-node`

### Shared Dependencies (3+)
- `typescript`, `zod`, `axios`

### Development Dependencies (15+)
- Testing: `jest`, `ts-jest`, `@testing-library/react`, `@playwright/test`
- Linting: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- Formatting: `prettier`
- Build: `turbo`, `tsx`

## File Relationships

```
┌─────────────────────────────────────┐
│   Root Configuration Files          │
│ (package.json, tsconfig.json, etc)  │
└────────────┬────────────────────────┘
             │
    ┌────────┼────────┐
    │        │        │
    ▼        ▼        ▼
┌──────┐ ┌──────┐ ┌─────────┐
│Apps  │ │Pkgs  │ │Workflows│
└──┬───┘ └──┬───┘ └─────────┘
   │        │
  ┌┴┐      ┌┴┐
  │ │      │ │
  ▼ ▼      ▼ ▼
 FE BE    QB SE
```

## How Files Work Together

### Test Flow
1. User accesses frontend (Frontend app files)
2. Frontend calls backend API (Backend route files)
3. Backend retrieves questions (Question bank files)
4. Backend calculates scores (Scoring engine files)
5. Results returned to frontend (React components)

### Build Flow
1. `turbo.json` coordinates build
2. Each app/package builds independently
3. Artifacts generated (`.next`, `dist`)
4. Docker images created (Dockerfiles)

### Deploy Flow
1. GitHub Actions triggered (CI workflow)
2. Tests run on all files
3. Build successful → auto-deploy
4. Frontend → Vercel, Backend → Render

## File Modification Guide

### To Add a New API Endpoint
1. Create route in `apps/backend/src/routes/`
2. Export from route file
3. Register in `apps/backend/src/index.ts`
4. Add tests in `**.test.ts`
5. Update `ARCHITECTURE.md`

### To Add a New Frontend Page
1. Create file in `apps/frontend/src/app/[locale]/`
2. Use Next.js app router conventions
3. Add translations to `messages/ar.json` and `messages/en.json`
4. Add E2E test in `e2e/`
5. Update `README.md`

### To Add Questions
1. Edit `packages/question-bank/src/questions.json`
2. Follow schema in `packages/question-bank/src/types.ts`
3. Ensure IRT parameters are valid
4. Rebuild: `npm run build -w @iq-test/question-bank`

### To Modify Scoring Logic
1. Edit `packages/scoring-engine/src/irt.ts`
2. Add/update tests in `irt.test.ts`
3. Ensure backwards compatibility
4. Update `ARCHITECTURE.md` mathematical formulas

## Cleanup Guide

If you need to remove generated files:

```bash
# Remove build artifacts
rm -rf .next apps/*/dist

# Remove node modules (if starting fresh)
rm -rf node_modules

# Remove cache
rm -rf .turbo

# Remove generated files (keep source)
rm -rf coverage test-results playwright-report
```

## Next Steps

1. **Review Documentation**
   - Start with `QUICKSTART.md`
   - Read `README.md` for full overview
   - Study `ARCHITECTURE.md` for technical details

2. **Understand File Structure**
   - Navigate each directory
   - Review key files listed above
   - Understand relationships

3. **Start Development**
   - Follow `QUICKSTART.md` to setup
   - Run `npm run dev`
   - Make changes and test

4. **Contribute**
   - Follow `CONTRIBUTING.md`
   - Make commits with conventional format
   - Submit pull requests

---

**Total Project Size**: ~5,000+ lines of code
**File Creation Date**: November 11, 2024
**Status**: Complete and ready for development ✅
