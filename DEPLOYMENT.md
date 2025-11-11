# Deployment Guide

Complete deployment instructions for the Arabic IQ Test Platform on Vercel, Render, and Supabase.

## Prerequisites

- GitHub account with repository
- Vercel account
- Render account
- Supabase account
- Claude API key from Anthropic

## Environment Setup

### 1. Supabase Configuration

1. Create a new Supabase project
2. Configure Authentication:
   - Enable Email/Password provider
   - Set redirect URLs: `http://localhost:3000/auth/callback`, `https://your-domain.com/auth/callback`
3. Create tables:
   ```sql
   -- Test Sessions Table
   CREATE TABLE test_sessions (
     id UUID PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     started_at TIMESTAMP DEFAULT NOW(),
     completed_at TIMESTAMP,
     total_score INT,
     percentile INT,
     domain_scores JSONB,
     responses JSONB,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- User Profiles Table
   CREATE TABLE user_profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id),
     email TEXT,
     first_name TEXT,
     last_name TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   ```
4. Get your credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2. Claude API Key

1. Sign up at https://console.anthropic.com
2. Create an API key
3. Store securely (never commit to git)

## Frontend Deployment (Vercel)

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Select project root (for monorepo): `.`

### Step 2: Configure Environment Variables

In Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
```

### Step 3: Build Settings

- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Access your site at `project-name.vercel.app`

### Step 5: Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records according to Vercel's instructions

## Backend Deployment (Render)

### Step 1: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New+" → "Web Service"
3. Connect your GitHub repository
4. Select `apps/backend` as root directory

### Step 2: Configure Settings

- **Name**: `iq-test-backend`
- **Environment**: Node
- **Region**: Select closest to your users
- **Build Command**: `npm install && npm run build -w @iq-test/backend`
- **Start Command**: `npm start -w @iq-test/backend`

### Step 3: Set Environment Variables

In Render Settings → Environment:

```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/iq_test
JWT_SECRET=your-secure-random-key
CLAUDE_API_KEY=sk-...
BACKEND_PORT=3001
SENTRY_DSN=https://...@sentry.io/...
ENVIRONMENT=production
```

### Step 4: Create PostgreSQL Database

1. In Render: Click "New+" → "PostgreSQL"
2. Database name: `iq-test-db`
3. PostgreSQL version: 15
4. Region: Same as backend
5. Note the connection string

### Step 5: Deploy

1. Click "Deploy"
2. Monitor logs for errors
3. Access at `https://iq-test-backend.onrender.com`

## Database Migrations

After deploying PostgreSQL:

```bash
# Connect to your Render database
psql $DATABASE_URL

# Run SQL scripts
\i migrations/001_initial_schema.sql
```

## GitHub Actions CI/CD

The repository includes GitHub Actions workflows that:
1. Run linting on PR
2. Run tests on PR
3. Build on PR
4. Auto-deploy to Vercel on merge to main
5. Auto-deploy to Render on merge to main

### Secret Setup

In GitHub Settings → Secrets and variables:

- `VERCEL_TOKEN`: Get from Vercel Settings
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `RENDER_SERVICE_ID`: Your Render service ID
- `RENDER_DEPLOY_KEY`: Your Render deploy key

## Monitoring & Observability

### Sentry Setup (Error Tracking)

1. Create Sentry account at https://sentry.io
2. Create project for Node.js
3. Set DSN in backend environment variables
4. Frontend will automatically report errors to Sentry

### Health Checks

- Vercel auto health check: `/_next/ping`
- Render health check: `/health`
- Set interval: 5 minutes

## SSL/HTTPS

- Vercel: Automatic SSL certificates
- Render: Automatic SSL certificates
- Custom domains: HTTPS automatically provisioned

## Backup & Recovery

### Database Backups

1. Enable automated backups in Render PostgreSQL settings
2. Retention: 7 days minimum
3. Download backups: Use `pg_dump`

```bash
pg_dump $DATABASE_URL > backup.sql
```

## Scaling Considerations

### Frontend (Vercel)
- Automatic edge caching
- Serverless functions scale automatically
- No configuration needed

### Backend (Render)
- Scale to multiple instances if needed
- Add load balancer when scaling beyond 2-3 instances
- Database connection pooling recommended at scale

## Troubleshooting

### Common Issues

**Frontend build fails:**
- Clear Vercel cache: Settings → Git → Redeploy
- Check environment variables
- Verify Node version compatibility

**Backend won't start:**
- Check DATABASE_URL format
- Verify Claude API key is valid
- Check logs in Render dashboard
- Run migrations if database is empty

**Database connection errors:**
- Verify connection string
- Check network access rules
- Ensure database is running

**API timeout errors:**
- Increase timeout in backend configuration
- Check Claude API quotas
- Monitor database query performance

## Security Checklist

- [ ] Environment variables not in code
- [ ] JWT secret is long and random (32+ characters)
- [ ] SSL/HTTPS enabled on all services
- [ ] Database backups enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Sensitive logs not publicly accessible
- [ ] Regular security updates applied
- [ ] API keys rotated regularly

## Maintenance

### Regular Tasks

Weekly:
- Check Sentry for errors
- Review logs
- Monitor performance metrics

Monthly:
- Update dependencies: `npm update`
- Check for security vulnerabilities: `npm audit`
- Review database size
- Backup database

Quarterly:
- Full security review
- Load testing
- Disaster recovery drill

## Cost Estimation

### Vercel
- Hobby: Free (with limitations)
- Pro: $20/month
- Expected cost: ~$20-50/month

### Render
- Web Service: $7/month minimum
- PostgreSQL: $15/month minimum
- Expected cost: ~$30-100/month

### Supabase
- Free: 50,000 MAU
- Pro: $25/month
- Expected cost: Free (small scale) to $50/month

**Total estimated cost**: $50-150/month for production

## Documentation Links

- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Claude API Docs](https://docs.anthropic.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Fastify Docs](https://www.fastify.io/docs/latest)
