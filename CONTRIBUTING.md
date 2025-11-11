# Contributing Guide

Thank you for your interest in contributing to the Arabic IQ Test Platform! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Report violations to maintainers

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/iq-test.git
   cd iq-test
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/original-owner/iq-test.git
   ```
4. **Create feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# In separate terminals:
# - Frontend: http://localhost:3000
# - Backend: http://localhost:3001
```

## Development Guidelines

### Code Style

- Use TypeScript for all code
- Run `npm run lint` to check style
- Run `npm run format` to auto-format
- Follow ESLint configuration

### Naming Conventions

```typescript
// Components: PascalCase
const TestInterface = () => {}

// Functions: camelCase
const calculateScore = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_QUESTIONS = 20

// Private methods: _camelCase
const _updateTheta = () => {}

// Interfaces: IPascalCase or PascalCase (prefer latter)
interface TestSession {}
type TestResult = {}
```

### File Structure

```
src/
├── components/     # React components
├── pages/          # Next.js pages
├── hooks/          # Custom React hooks
├── services/       # API and business logic
├── utils/          # Utility functions
├── types/          # TypeScript types
├── styles/         # CSS and styling
└── __tests__/      # Tests
```

### Testing Requirements

- Unit tests for business logic
- Integration tests for API endpoints
- E2E tests for critical user flows
- Target 70%+ coverage

```bash
# Run tests
npm run test

# Run with coverage
npm run test -- --coverage

# Watch mode
npm run test:watch
```

### Type Safety

- Use strict TypeScript
- Avoid `any` type (use `unknown` if necessary)
- Define interfaces for all objects
- Use Zod for runtime validation

```typescript
// Good
interface User {
  id: string
  email: string
  createdAt: Date
}

// Avoid
const user: any = {}
```

## Git Workflow

### Commits

- **Format**: Follow conventional commits
  ```
  type(scope): description

  Detailed explanation if needed.
  ```
- **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Examples**:
  ```
  feat(auth): add social login support
  fix(scoring): correct IRT calculation for 3-PL model
  docs(readme): update deployment instructions
  test(backend): add tests for question router
  ```

### Pull Requests

1. **Rebase on main**: `git rebase upstream/main`
2. **Create PR with description**:
   - What does this PR do?
   - Why is this change needed?
   - How has it been tested?
3. **Link related issues**: Use `Closes #123`
4. **Screenshots for UI changes**
5. **Request review** from maintainers

### Review Process

- At least 1 approval required
- CI/CD must pass
- Code coverage must not decrease
- Address all comments

## Issue Guidelines

### Reporting Bugs

**Title**: Clear description of the bug

**Description**:
```markdown
**Describe the bug**
[Clear description]

**To reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected behavior**
[What should happen]

**Actual behavior**
[What actually happens]

**Environment**
- OS: [e.g., macOS 14.0]
- Browser: [e.g., Chrome 119]
- Node version: [e.g., 20.10]
- Commit/Version: [e.g., abc123]

**Screenshots**
[If applicable]

**Additional context**
[Any other relevant info]
```

### Feature Requests

**Title**: Clear description of feature

**Description**:
```markdown
**Is your feature request related to a problem?**
[Description of the problem]

**Describe the solution you'd like**
[Clear description of desired feature]

**Describe alternatives you've considered**
[Alternative solutions]

**Additional context**
[Any other relevant info]
```

## Documentation

### Code Comments

```typescript
/**
 * Calculate probability of correct response using 2-PL IRT model.
 *
 * @param theta - Person ability level (typically -3 to +3)
 * @param item - Item parameters (difficulty, discrimination)
 * @returns Probability of correct response [0, 1]
 *
 * Formula: P(θ) = 1 / (1 + e^(-a(θ - b)))
 */
export function calculateProbability(theta: number, item: IRTItem): number {
  // implementation
}
```

### README Updates

- Update README.md for architecture changes
- Document new environment variables
- Add examples for new features
- Keep README up-to-date

## Performance Considerations

### Frontend

- Minimize bundle size
- Use code splitting
- Optimize images
- Lazy load components
- Cache API responses

### Backend

- Optimize database queries
- Implement caching
- Use connection pooling
- Monitor response times
- Profile CPU usage

## Security Considerations

- Never commit secrets
- Validate all inputs
- Use parameterized queries
- Follow OWASP guidelines
- Keep dependencies updated
- Audit npm packages

## Accessibility

- Follow WCAG AA guidelines
- Test with screen readers
- Keyboard navigation
- Sufficient color contrast
- Semantic HTML

## Localization (i18n)

- Add translations for new features
- Update `/src/messages/{ar,en}.json`
- Use translation keys consistently
- Test both RTL and LTR layouts

## Database Changes

- Create migration files
- Provide rollback scripts
- Document schema changes
- Update types

## Performance Benchmarks

Before submitting performance-related changes:

```bash
# Run benchmarks
npm run bench

# Profile
npm run profile
```

## Release Process

Maintainers handle releases:

1. Update version in package.json
2. Update CHANGELOG.md
3. Create git tag
4. Push to main
5. GitHub Actions handles deployment

## Getting Help

- **Questions**: Open discussion in GitHub Discussions
- **Bugs**: Create issue with bug template
- **Ideas**: Start discussion before implementing
- **General**: Check existing docs and issues first

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://www.fastify.io/docs/latest/)
- [IRT Overview](https://en.wikipedia.org/wiki/Item_response_theory)
- [CHC Theory](https://en.wikipedia.org/wiki/Cattell%E2%80%93Horn%E2%80%93Carroll_theory)

## Contributor Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- GitHub contributors page

Thank you for contributing to making intelligence testing more accessible to Arabic speakers! 🙏
