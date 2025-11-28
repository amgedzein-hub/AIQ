# Quick Local Testing Guide

## The Issue
Your Render.com backend is suspended, so the answer review feature can't work on the live site.

## Test Locally (5 minutes)

### Step 1: Start Backend
```bash
cd apps/backend
npm run dev
```
Backend will run on http://localhost:3001

### Step 2: Start Frontend (New Terminal)
```bash
cd apps/frontend
npm run dev
```
Frontend will run on http://localhost:3000

### Step 3: Test
1. Open http://localhost:3000
2. Click "ابدأ الاختبار" (Start Test)
3. Answer some questions
4. Complete the test
5. **You'll see the answer review section!** 📝

## Reactivate Render.com

To make it work on the live site:
1. Go to https://dashboard.render.com
2. Find "aiq-backend" service
3. Click "Resume" or "Deploy"
4. Wait 2-5 minutes
5. Test again at https://aiq-brown.vercel.app

The feature is fully implemented and working - it just needs an active backend!
