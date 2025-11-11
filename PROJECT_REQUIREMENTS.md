To adapt your `PROJECT_REQUIREMENTS.md` for **Claude code** and the new infrastructure (GitHub + Vercel + Render), here’s the updated, production-ready version:

---

# 📋 Project Requirements: Arabic IQ Test (Claude + GitHub + Vercel + Render)

## 1. Overview

Develop a **Claude-powered Arabic IQ Test** platform with adaptive, psychometrically valid intelligence testing.
Use **Claude for adaptive question selection and scoring logic** via its API.
Architecture must integrate GitHub (source), Vercel (frontend), and Render (backend).

---

## 2. Objectives

* Deliver computerised IQ testing for Arabic speakers using **CHC theory domains**: Gf, Gc, Gwm, Gv, Gs.
* Ensure questions are **culturally fair** across the Arab world.
* Implement **adaptive testing** using Item Response Theory (IRT, 2-PL/3-PL).
* Integrate **Claude API** for:

  * Question difficulty calibration.
  * Adaptive test routing (next-item logic).
  * Summary and feedback generation in Arabic.
* Provide **modern Arabic UI** with RTL support.

---

## 3. Architecture

### Monorepo (GitHub)

```
iq-test/
├── apps/
│   ├── frontend     # Next.js + React + Tailwind (deployed to Vercel)
│   └── backend      # Node.js (Fastify) on Render.com
├── packages/
│   ├── question-bank   # JSON item metadata
│   └── scoring-engine  # IRT + Claude integration
├── scripts/
│   └── deploy.yml      # GitHub Actions CI/CD
├── .env.example
├── docker-compose.yml
└── README.md
```

**Repository:** GitHub monorepo with protected main branch, PR workflow, and CI/CD pipelines.

---

## 4. Frontend (Vercel)

* **Stack:** Next.js 15 + React + Tailwind + TypeScript
* **Features:**

  * Full RTL and Arabic typography (Amiri, Noto Naskh).
  * Login/Signup via Supabase Auth.
  * Adaptive test interface (one question/page).
  * Realtime progress and Claude-driven feedback.
  * Result dashboard: percentile + domain chart.
* **Localization:** `next-intl` or `next-i18next`.
* **Deployment:** GitHub → Vercel auto-build → staging → production.

---

## 5. Backend (Render.com)

* **Stack:** Node.js + Fastify + PostgreSQL (Supabase).
* **Core Endpoints:**

  * `POST /questions/next` → Claude decides next question.
  * `POST /answers/submit` → Update θ via scoring engine.
  * `GET /results` → Return structured domain scores.
* **Claude Integration:**

  * Model: `claude-3-opus` or `claude-3.5-sonnet`.
  * Used for IRT logic tuning, dynamic difficulty, and summarised result feedback.
* **Security:** JWT + HTTPS + rate limit.
* **Observability:** Sentry + Winston logs.
* **Deployment:** GitHub → Render auto-deploy on push.

---

## 6. Packages

### Question Bank

```json
{
  "id": "uuid",
  "domain": "Gf",
  "difficulty": 0.75,
  "discrimination": 1.2,
  "text_ar": "سؤال مثال",
  "options": ["خيار أ", "خيار ب", "خيار ج"],
  "correct": "خيار ب"
}
```

* Versioned via Git LFS.
* Managed through a JSON schema validated on build.

### Scoring Engine

* Implements **2-PL IRT** (θ, a, b parameters).
* Adaptive logic: choose next item based on info gain.
* Uses Claude API for:

  * Predicting question info functions.
  * Generating Arabic explanations.
* Exposed as backend module (`packages/scoring-engine`).

---

## 7. DevOps & Testing

* **CI/CD:** GitHub Actions

  * Lint, test, build, and deploy to Vercel and Render.
* **Tests:**

  * Jest for backend logic.
  * Playwright for frontend user flows.
* **Static Analysis:** ESLint, Prettier, strict TS config.
* **Secrets:** `.env` managed via GitHub + Render environment variables.

---

## 8. Best Practices

* **Accessibility:** WCAG AA compliant.
* **Performance:** ISR for static pages, lazy loading.
* **Security:** Never expose raw IRT parameters.
* **Scalability:** Stateless API, horizontal scaling on Render.
* **Monitoring:** Health checks + Sentry + PostHog analytics.

---

## 9. Deliverables

* Complete GitHub monorepo with CI/CD setup.
* Fully working Vercel frontend and Render backend.
* Integrated Claude adaptive scoring logic.
* Sample Arabic question bank and IRT engine.
* Deployment documentation.

---

Would you like me to generate the **project bootstrap code** next (Next.js + Fastify + Claude API integration with GitHub Actions + Vercel + Render deploy configs)? This would include ready-to-commit folders and initial `.yml` pipelines.
