# Quick Start Guide

Get the Arabic IQ Test Platform running in 5 minutes.

## Prerequisites

- Node.js 20+ ([download](https://nodejs.org/))
- PostgreSQL 15+ or Docker ([download](https://www.docker.com/))
- Git ([download](https://git-scm.com/))

## Option 1: Development (Recommended for local testing)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/iq-test.git
cd iq-test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your settings:
```env
# Required for development
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
CLAUDE_API_KEY=sk-your-api-key

# Optional - use defaults for local dev
BACKEND_PORT=3001
JWT_SECRET=dev-secret-key-change-in-production
DATABASE_URL=postgresql://user:password@localhost:5432/iq_test
```

### 4. Start Database (with Docker)
```bash
docker-compose up postgres
```

Or skip this if you have PostgreSQL running locally and update `DATABASE_URL`.

### 5. Start Development Servers
In one terminal:
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### 6. Open in Browser
- **Home**: http://localhost:3000
- **Arabic**: http://localhost:3000/ar
- **English**: http://localhost:3000/en

## Option 2: Docker (Full Stack)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/iq-test.git
cd iq-test
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Run Full Stack
```bash
docker-compose up
```

Access at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Database: localhost:5432

### 4. Stop Services
```bash
docker-compose down
```

## Common Tasks

### Running Tests
```bash
# All tests
npm run test

# Frontend tests only
npm run test -w @iq-test/frontend

# Backend tests only
npm run test -w @iq-test/backend

# E2E tests
npm run test:e2e -w @iq-test/frontend

# Watch mode
npm run test:watch -w @iq-test/backend
```

### Linting & Formatting
```bash
# Check code style
npm run lint

# Auto-format code
npm run format

# Type checking
npm run type-check
```

### Building
```bash
# Build all packages
npm run build

# Build specific package
npm run build -w @iq-test/frontend
npm run build -w @iq-test/backend
```

## Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:3001/health

# Get next question
curl -X POST http://localhost:3001/questions/next \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test-123","currentResponses":{},"currentTheta":0}'

# Submit answer
curl -X POST http://localhost:3001/answers/submit \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test-123","questionId":"550e8400-e29b-41d4-a716-446655440001","answer":"32","currentTheta":0}'

# Get results
curl http://localhost:3001/results/test-123
```

### Using Postman or Insomnia:

1. Import the API base URL: `http://localhost:3001`
2. Create requests for each endpoint
3. Test with sample data

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process
lsof -i :3000     # Frontend
lsof -i :3001     # Backend
kill -9 <PID>
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Error
```bash
# Check Docker container
docker-compose ps

# View logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### TypeScript Errors
```bash
# Rebuild type definitions
npm run type-check

# If that fails, regenerate
rm -rf node_modules/.cache
npm install
```

### Frontend Not Loading
```bash
# Check if port 3000 is running
curl http://localhost:3000

# Restart development server
# Kill current process and run: npm run dev
```

## Creating a Test User

### Via Supabase Dashboard:
1. Go to Supabase dashboard
2. Click "Auth" → "Users"
3. Click "Add user"
4. Enter email and password
5. Click "Create user"

### Via Frontend:
1. Open http://localhost:3000/ar/auth/signup
2. Create new account with email
3. Check email for verification (if enabled)
4. Login with credentials

## Next Steps

1. **Explore the Code**
   - Check `ARCHITECTURE.md` for system design
   - Review `README.md` for full documentation
   - Look at `CONTRIBUTING.md` for development guidelines

2. **Configure Services**
   - Set up Supabase project
   - Get Claude API key from Anthropic
   - Update `.env.local` with credentials

3. **Test the Features**
   - Create test account
   - Take test and answer questions
   - View results dashboard

4. **Deploy to Production**
   - See `DEPLOYMENT.md` for detailed instructions
   - Push to GitHub
   - Configure Vercel and Render

## Environment Variables Quick Reference

### Frontend Only
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### Backend Only
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/iq_test
JWT_SECRET=your-secret-key-min-32-chars
CLAUDE_API_KEY=sk-...
BACKEND_PORT=3001
```

## File Structure Reference

```
Project Root
├── apps/
│   ├── frontend/      ← Next.js app (npm run dev -w @iq-test/frontend)
│   └── backend/       ← Fastify API (npm run dev -w @iq-test/backend)
├── packages/
│   ├── question-bank/ ← Question database
│   └── scoring-engine/← IRT & Claude integration
├── .env.example       ← Copy to .env.local
├── docker-compose.yml ← Database setup
└── package.json       ← Root workspace config
```

## Package Commands

```bash
# Work within a package
npm run <command> -w @iq-test/frontend
npm run <command> -w @iq-test/backend
npm run <command> -w @iq-test/question-bank
npm run <command> -w @iq-test/scoring-engine

# Or navigate to package directory
cd apps/frontend
npm run dev
```

## Performance Tips

- Use VSCode with ESLint plugin for real-time feedback
- Enable TypeScript auto-save compilation
- Keep one dev server running per app
- Use `npm run dev` for fastest turnaround
- Clear cache if experiencing weird issues: `rm -rf .next .turbo`

## Getting Help

1. **Check Documentation**
   - README.md - Full overview
   - ARCHITECTURE.md - Technical details
   - CONTRIBUTING.md - Development guidelines

2. **Search Issues**
   - GitHub Issues may have your question
   - Check closed issues for solutions

3. **Ask Questions**
   - Create GitHub Discussion
   - Open GitHub Issue with `question` label

## What's Next?

### Immediate Tasks
- [ ] Configure Supabase
- [ ] Get Claude API key
- [ ] Test the full flow locally
- [ ] Run test suite
- [ ] Review ARCHITECTURE.md

### Before Production
- [ ] Add more questions to question bank
- [ ] Calibrate IRT parameters
- [ ] Run full test suite
- [ ] Review security checklist
- [ ] Setup monitoring (Sentry)

### After Deployment
- [ ] Configure custom domain
- [ ] Set up analytics
- [ ] Monitor error rates
- [ ] Gather user feedback
- [ ] Iterate on UX/features

## Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Fastify Docs](https://www.fastify.io/)
- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

---

**That's it!** You now have the Arabic IQ Test Platform running locally. 🚀

For detailed deployment to production, see `DEPLOYMENT.md`.
