# Architecture Overview

Comprehensive guide to the system architecture, design patterns, and technical decisions.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    User Browsers                         │
└──────────────────────┬──────────────────────────────────┘
                       │ HTTPS
        ┌──────────────┼──────────────┐
        │              │              │
   ┌────▼────┐  ┌─────▼─────┐  ┌────▼────┐
   │ Vercel  │  │ Supabase  │  │ Claude  │
   │Frontend │  │   Auth    │  │   API   │
   │(Next.js)│  │(OAuth)    │  │         │
   └────┬────┘  └───────────┘  └────┬────┘
        │                             │
        │    REST API (HTTPS)         │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │    Render Backend           │
        │  (Node.js/Fastify)          │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │   PostgreSQL Database       │
        │  (Render Managed)           │
        └─────────────────────────────┘
```

## Frontend Architecture (Next.js)

### Page Structure

```
app/
├── [locale]/                  # Internationalization
│   ├── layout.tsx            # Root layout with i18n provider
│   ├── page.tsx              # Home page
│   ├── test/
│   │   └── page.tsx          # Test interface
│   ├── results/
│   │   ├── [sessionId]/
│   │   └── page.tsx          # Results dashboard
│   └── auth/
│       ├── login/
│       │   └── page.tsx
│       └── signup/
│           └── page.tsx
```

### State Management

- **Zustand**: Global state (user session, test progress)
- **React Context**: Localization context via next-intl
- **Query Parameters**: Transient state (session ID, question progress)

```typescript
// Example: Test session store
import { create } from 'zustand'

interface TestStore {
  sessionId: string
  currentTheta: number
  responses: Record<string, string>
  setSessionId: (id: string) => void
  updateTheta: (newTheta: number) => void
}

export const useTestStore = create<TestStore>((set) => ({
  sessionId: '',
  currentTheta: 0,
  responses: {},
  setSessionId: (id) => set({ sessionId: id }),
  updateTheta: (newTheta) => set({ currentTheta: newTheta }),
}))
```

### Component Hierarchy

```
Layout
├── Navigation
├── TestInterface (when in test)
│   ├── QuestionCard
│   ├── OptionButtons
│   └── ProgressBar
└── ResultsDashboard (after test)
    ├── ScoreSummary
    ├── DomainCharts
    └── ActionButtons
```

## Backend Architecture (Fastify)

### Route Structure

```
/health               - Health check
/questions/next       - Get next adaptive question
/answers/submit       - Submit answer and update scoring
/results/:sessionId   - Get test results
```

### Service Layers

```
Routes (API Interface)
    ↓
Services (Business Logic)
    ├── QuestionBankService
    └── ScoringEngineService
    ↓
Repositories (Data Access)
    ├── SessionRepository
    ├── ResponseRepository
    └── UserRepository
    ↓
Database (PostgreSQL)
```

### Dependency Injection

```typescript
// Services injected into routes
fastify.register(async (fastify) => {
  const questionBank = await getQuestionBank()
  const scoringEngine = await getScoringEngine()

  fastify.post('/questions/next', async (request, reply) => {
    const question = await scoringEngine.getNextQuestion(
      questionBank.questions,
      usedQuestionIds,
      currentTheta
    )
    return { question }
  })
})
```

## Packages

### Question Bank (`packages/question-bank`)

**Responsibilities**:
- Load and validate questions
- Provide question filtering by domain
- Cache question data
- Export TypeScript types

**Data Flow**:
```
questions.json (JSON-LFS)
    ↓
loadQuestionBank()
    ↓
Zod Validation
    ↓
Cached QuestionBank
    ↓
Services consume via index.ts
```

### Scoring Engine (`packages/scoring-engine`)

**Responsibilities**:
- IRT calculations (2-PL model)
- Ability estimation (theta updates)
- Adaptive item selection
- Claude API integration for feedback

**IRT Mathematical Model**:
```
Item Characteristic Curve (ICC):
P(θ) = 1 / (1 + e^(-a(θ - b)))

Where:
- θ (theta): Person ability (-3 to +3)
- a: Discrimination parameter (0-3)
- b: Difficulty parameter (0-1)

Information Function:
I(θ) = a² × P(θ) × (1 - P(θ))

Ability Update:
θ_new = θ_old + a × (response - P(θ_old)) × learning_rate
```

**Question Selection Strategy**:
```
For each available question:
  Calculate I(θ) = Fisher Information at current θ
  Store question with highest I(θ)
Return question with maximum information
```

## Data Models

### Test Session

```typescript
interface TestSession {
  id: string              // UUID
  userId: string          // Foreign key to auth.users
  startedAt: Date
  completedAt?: Date
  totalScore?: number
  percentile?: number
  domainScores?: Record<Domain, number>
  responses: Record<string, boolean>
  currentTheta: number
  createdAt: Date
}
```

### Question

```typescript
interface Question {
  id: string              // UUID
  domain: 'Gf' | 'Gc' | 'Gwm' | 'Gv' | 'Gs'
  difficulty: number      // 0-1
  discrimination: number  // 0-3
  guessing: number        // 0-1 (for 3-PL)
  text_ar: string         // Arabic question text
  options: string[]       // Answer options
  correct: string         // Correct answer
  explanation_ar?: string
  culturalContext?: string
}
```

### Response

```typescript
interface Response {
  questionId: string
  userId: string
  sessionId: string
  answer: string
  isCorrect: boolean
  responseTime: number    // milliseconds
  thetaAfter: number
  timestamp: Date
}
```

## Authentication Flow

```
User
  ↓
1. Sign up/Login (Supabase UI)
  ↓
2. JWT token returned
  ↓
3. Token stored in browser
  ↓
4. Included in API requests
  ↓
Backend
  ↓
5. Verify JWT signature
  ↓
6. Extract user ID
  ↓
7. Proceed with request
```

## Adaptive Testing Flow

```
User Starts Test
  ↓
Initialize θ = 0
  ↓
1. Request next question
  ↓
Backend:
  - Calculate I(θ) for all available questions
  - Select question with max I(θ)
  - Return question
  ↓
User Answers Question
  ↓
2. Submit answer
  ↓
Backend:
  - Check if correct
  - Update θ using IRT formula
  - Store response
  ↓
Decision:
  - If < 20 questions → go to step 1
  - If >= 20 questions → calculate final score
  ↓
Calculate Final Scores
  ↓
- Convert θ to IQ scale
- Calculate percentiles
- Generate interpretation via Claude
  ↓
Return Results
```

## Scoring Calculation

### Step 1: Domain Scores

```typescript
// For each domain (Gf, Gc, Gwm, Gv, Gs):
const domainQuestions = questions.filter(q => q.domain === domain)
const correctCount = domainQuestions.filter(q => responses[q.id]).length
const percentage = (correctCount / domainQuestions.length) * 100

// Convert to IQ scale (mean 100, SD 15)
const domainIQ = 100 + (percentage - 50) * 3
```

### Step 2: Overall Score

```typescript
const overallIQ = (Gf + Gc + Gwm + Gv + Gs) / 5
const standardized = ((overallIQ - 100) / 15) * 15 + 100
```

### Step 3: Percentile Rank

```typescript
// From normal distribution table
const percentile = normDistribution(standardized)
```

## Claude AI Integration

### Use Cases

1. **Adaptive Difficulty Calibration**
   - Analyzes question responses
   - Suggests IRT parameter adjustments
   - Optimizes test reliability

2. **Result Interpretation**
   - Analyzes domain scores
   - Generates Arabic explanation
   - Provides personalized feedback

3. **Question Validation**
   - Checks cultural appropriateness
   - Verifies clarity and bias
   - Suggests improvements

### API Calls

```typescript
// Example: Generate interpretation
const interpretation = await generateResultInterpretation(
  overallScore: 128,
  domainScores: {
    Gf: 132,
    Gc: 125,
    Gwm: 120,
    Gv: 129,
    Gs: 124
  },
  responses: {...}
)
// Returns: Arabic text interpretation
```

## Error Handling Strategy

### Frontend

```typescript
try {
  const response = await api.post('/questions/next', data)
} catch (error) {
  if (error.status === 401) {
    // Redirect to login
    router.push('/auth/login')
  } else if (error.status === 400) {
    // Invalid request, show user error
    setError(error.response.data.message)
  } else {
    // Server error, retry or show generic message
    setError('An unexpected error occurred')
  }
}
```

### Backend

```typescript
// Middleware for error handling
fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof ValidationError) {
    return reply.code(400).send({ error: error.message })
  }

  if (error instanceof NotFoundError) {
    return reply.code(404).send({ error: 'Resource not found' })
  }

  // Log unexpected errors
  logger.error('Unexpected error', error)
  return reply.code(500).send({ error: 'Internal server error' })
})
```

## Caching Strategy

### Frontend

```typescript
// API response caching (60 seconds)
const cache = new Map<string, { data: any; timestamp: number }>()

function getCachedOrFetch(url: string) {
  const cached = cache.get(url)
  if (cached && Date.now() - cached.timestamp < 60000) {
    return cached.data
  }

  const response = await fetch(url)
  cache.set(url, { data: response, timestamp: Date.now() })
  return response
}
```

### Backend

```typescript
// Question bank cached in memory
let cachedQuestionBank: QuestionBank | null = null

export async function getQuestionBank(): Promise<QuestionBank> {
  if (cachedQuestionBank) return cachedQuestionBank

  cachedQuestionBank = await loadFromDatabase()
  return cachedQuestionBank
}
```

## Monitoring & Observability

### Logging

```
Winston logger with:
- File transport (error.log, combined.log)
- Console transport (dev)
- JSON format for parsing
- Correlation IDs for tracing
```

### Metrics

```
- Response times
- Error rates
- Question response distribution
- User session duration
- API hit rates
```

### Error Tracking

```
Sentry integration:
- Captures unhandled errors
- Tracks performance issues
- Groups related errors
- Alerts on critical errors
```

## Scalability Considerations

### Horizontal Scaling

**Frontend**:
- Stateless by design
- No per-instance session storage
- CDN for static assets

**Backend**:
- Stateless API
- Shared database
- Load balancer in front
- Connection pooling to DB

### Database Optimization

```sql
-- Indexes for performance
CREATE INDEX idx_test_sessions_user_id ON test_sessions(user_id)
CREATE INDEX idx_responses_session_id ON responses(session_id)
CREATE INDEX idx_questions_domain ON questions(domain)
```

## Security Architecture

### Input Validation

```typescript
// Zod schemas for all inputs
const QuestionSchema = z.object({
  sessionId: z.string().uuid(),
  currentResponses: z.record(z.string(), z.boolean()),
})

// Validate before processing
const validated = QuestionSchema.parse(request.body)
```

### Authentication

```
JWT tokens:
- Signed with secret
- Contains user ID
- 24-hour expiration
- Refreshable tokens
```

### Authorization

```
- User can only access their own data
- Admin endpoints require admin role
- Question bank is public
```

## Testing Strategy

### Unit Tests

- Pure functions (IRT calculations)
- Individual components
- Service methods

### Integration Tests

- API endpoint tests
- Database interactions
- Service communication

### E2E Tests

- Critical user workflows
- Login → Test → Results
- RTL/LTR layout

## Deployment Architecture

```
GitHub Repository
    ↓
GitHub Actions CI/CD
    ├─→ Run tests & lint
    └─→ On merge to main:
        ├─→ Deploy frontend to Vercel
        └─→ Deploy backend to Render
```

## Performance Optimization

### Frontend

- Code splitting by route
- Image optimization
- Critical CSS inlining
- Lazy component loading

### Backend

- Database query optimization
- Response caching
- Connection pooling
- API rate limiting

This architecture provides scalability, maintainability, and performance for growing user bases.
