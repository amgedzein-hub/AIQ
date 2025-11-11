# Arabic IQ Test Platform - Claude Powered

A modern, adaptive intelligence testing platform for Arabic speakers with Claude AI integration, built with Next.js, Fastify, and Item Response Theory (IRT).

## Overview

This project implements a psychometrically valid IQ testing system that adapts to each user's ability level using:
- **Adaptive Testing**: Item Response Theory (IRT) for intelligent question selection
- **Claude AI**: For result interpretation, feedback generation, and question validation
- **CHC Theory Domains**: Gf (Fluid), Gc (Crystallized), Gwm (Working Memory), Gv (Visual), Gs (Processing Speed)
- **Arabic First**: Full RTL support with culturally appropriate content

## Architecture

### Monorepo Structure

```
iq-test/
├── apps/
│   ├── frontend/          # Next.js 15 + React + Tailwind
│   └── backend/           # Node.js + Fastify + PostgreSQL
├── packages/
│   ├── question-bank/     # JSON-based question database with IRT parameters
│   └── scoring-engine/    # IRT implementation + Claude integration
├── .github/workflows/     # CI/CD pipelines
├── docker-compose.yml     # Local development setup
└── render.yaml           # Render deployment config
```

## Tech Stack

### Frontend
- **Framework**: Next.js 15
- **UI**: React 19 + Tailwind CSS
- **Internationalization**: next-intl (Arabic/English)
- **Auth**: Supabase Auth
- **Charting**: Recharts
- **State**: Zustand

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Fastify
- **Database**: PostgreSQL
- **AI Integration**: Claude API (@anthropic-ai/sdk)
- **Logging**: Winston
- **Monitoring**: Sentry

### Packages
- **IRT Engine**: 2-PL (2-Parameter Logistic) model implementation
- **Claude Integration**: Result interpretation, feedback, question validation
- **Question Bank**: Versioned JSON schema with validation

## Features

### For Test Takers
- Adaptive question selection based on ability level
- Real-time progress tracking
- Detailed results with domain breakdowns
- Percentile rankings
- Arabic-language feedback and interpretation
- Dark mode support

### For Administrators
- Question bank management
- IRT parameter calibration
- User performance analytics
- Result export and reporting
- Question quality validation via Claude

## Installation

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm 9+
- Docker & Docker Compose (for local development)

### Development Setup

1. **Clone and install**:
   ```bash
   git clone https://github.com/yourusername/iq-test.git
   cd iq-test
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

3. **Set up database**:
   ```bash
   # Using Docker Compose
   docker-compose up postgres

   # Or connect to existing PostgreSQL
   npm run migrate
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

   This starts:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

## Project Structure Details

### Frontend (`apps/frontend`)

Key directories:
- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/hooks` - Custom React hooks (useAuth, useTest)
- `/src/styles` - Tailwind + global CSS
- `/src/messages` - i18n translations (Arabic/English)

Key pages:
- `/[locale]/` - Home page with test introduction
- `/[locale]/test` - Adaptive test interface
- `/[locale]/results/[sessionId]` - Results dashboard
- `/[locale]/auth/login` - Supabase authentication
- `/[locale]/auth/signup` - User registration

### Backend (`apps/backend`)

Key routes:
- `GET /health` - Health check endpoint
- `POST /questions/next` - Get next adaptive question
- `POST /answers/submit` - Submit and score answer
- `GET /results/:sessionId` - Get test results

Key services:
- `/services/question-bank.ts` - Question loading and caching
- `/services/scoring-engine.ts` - IRT scoring logic
- `/utils/logger.ts` - Winston logging setup

### Packages

#### Question Bank (`packages/question-bank`)
- `types.ts` - Zod schemas for question validation
- `questions.json` - Question database with IRT parameters
- `index.ts` - API for accessing questions

Structure:
```json
{
  "id": "uuid",
  "domain": "Gf|Gc|Gwm|Gv|Gs",
  "difficulty": 0.0-1.0,
  "discrimination": 0.0-3.0,
  "guessing": 0.0-1.0,
  "text_ar": "السؤال بالعربية",
  "options": ["الخيار أ", "الخيار ب", "الخيار ج"],
  "correct": "الخيار ب",
  "explanation_ar": "شرح الإجابة",
  "culturalContext": "السياق الثقافي"
}
```

#### Scoring Engine (`packages/scoring-engine`)
- `irt.ts` - IRT implementation (2-PL model)
- `claude-integration.ts` - Claude API calls
- `index.ts` - Main scoring engine class

IRT Functions:
- `calculateProbability()` - P(θ) = 1/(1 + e^(-a(θ-b)))
- `calculateItemInformation()` - Fisher information
- `updateTheta()` - Ability update after each response
- `selectNextQuestion()` - Adaptive question selection via max information

## Deployment

### Vercel (Frontend)

1. Create Vercel project linked to GitHub
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://backend-url.com
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
3. Push to main branch triggers automatic deployment

### Render (Backend)

1. Create Render service from GitHub
2. Use `render.yaml` for configuration
3. Set environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret
   CLAUDE_API_KEY=sk-...
   NODE_ENV=production
   ```
4. Enable auto-deploy on push to main

### Docker (Local)

```bash
docker-compose up
```

Starts:
- PostgreSQL on port 5432
- Backend on port 3001
- Frontend on port 3000

## Testing

### Run all tests
```bash
npm run test
```

### Frontend (Playwright E2E)
```bash
npm run test:e2e -w @iq-test/frontend
```

### Backend (Jest)
```bash
npm run test -w @iq-test/backend
```

## CI/CD Pipeline

GitHub Actions workflows:
- **ci.yml** - Lint, type-check, test, build on PR/push
- **deploy-vercel.yml** - Auto-deploy frontend to Vercel
- **deploy-render.yml** - Auto-deploy backend to Render

## Environment Variables

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Backend
```
BACKEND_PORT=3001
DATABASE_URL=postgresql://user:pass@localhost:5432/iq_test
JWT_SECRET=your-secret-key
CLAUDE_API_KEY=sk-your-api-key
SENTRY_DSN=https://your-sentry-url
ENVIRONMENT=development
```

## IRT Scoring Explanation

### 2-Parameter Logistic (2-PL) Model
- **θ (theta)**: Person ability (typically -3 to +3)
- **a**: Item discrimination (0-3, how well question separates abilities)
- **b**: Item difficulty (0-1, threshold difficulty)

### Ability Estimation
- Starts at θ = 0 (average)
- Updates after each response using maximum likelihood
- Learning rate: 0.5 (adjustable)
- Clamped to [-3, 3] range

### Question Selection
- Uses Fisher Information I(θ) = a²P(θ)(1-P(θ))
- Selects item with maximum information at current θ
- Ensures optimal measurement precision

## Internationalization

Arabic/English support via `next-intl`:
- `/ar/*` routes - Arabic (RTL)
- `/en/*` routes - English (LTR)

Message files: `src/messages/{ar,en}.json`

## Accessibility

- WCAG AA compliant
- RTL layout support
- Semantic HTML
- ARIA labels
- Keyboard navigation

## Performance

- ISR (Incremental Static Regeneration) for home page
- Lazy loading of components
- Image optimization
- API response caching
- Database query optimization with indexes

## Security

- JWT-based authentication
- HTTPS enforced in production
- Rate limiting (100 req/15min)
- CORS configured
- Environment variables secured
- No IRT parameters exposed to client
- SQL injection prevention via parameterized queries

## Monitoring

- Sentry error tracking
- Winston logging (file + console)
- Health check endpoints
- Database connection monitoring
- API response time tracking

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

Code style:
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode
- 2-space indentation

## License

MIT

## Support

For issues and questions:
- GitHub Issues: https://github.com/yourusername/iq-test/issues
- Email: support@example.com
- Documentation: https://docs.example.com

## Credits

Built with:
- Claude API for adaptive logic and Arabic interpretation
- CHC Theory (Cattell-Horn-Carroll) for cognitive domains
- IRT (Item Response Theory) for adaptive testing
- Next.js 15 and Fastify frameworks

## Roadmap

- [ ] Advanced analytics dashboard
- [ ] Multi-language support (French, German)
- [ ] Mobile native apps (React Native)
- [ ] Integration with educational platforms
- [ ] Adaptive retesting with growth tracking
- [ ] Question bank management UI
- [ ] Group testing administration
- [ ] Machine learning for IRT parameter optimization
