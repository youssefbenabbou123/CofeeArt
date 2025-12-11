# Environment Variables Setup Guide

## 🚨 Critical: Fix API Connection and Stripe Errors

Your application is currently trying to connect to `localhost:3002` instead of your production backend, and Stripe is not configured.

## Step 1: Create `.env.local` File

Create a file named `.env.local` in the `frontend` directory with the following content:

```env
# Backend API URL - Production
NEXT_PUBLIC_API_URL=https://cofee-art-backend.vercel.app

# Stripe Publishable Key
# Get your key from: https://dashboard.stripe.com/apikeys
# Use pk_test_... for testing or pk_live_... for production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

## Step 2: Get Your Stripe Publishable Key

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_` for testing or `pk_live_` for production)
3. Replace `pk_test_your_key_here` in `.env.local` with your actual key

## Step 3: Restart Your Development Server

After creating/updating `.env.local`:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
# or
pnpm dev
```

## Step 4: For Production (Vercel)

Make sure these environment variables are set in your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/Update:
   - `NEXT_PUBLIC_API_URL` = `https://cofee-art-backend.vercel.app`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your Stripe publishable key

4. **Redeploy** your application after adding/updating variables

## Verification

After setting up, you should see:
- ✅ API calls going to `https://cofee-art-backend.vercel.app` instead of `localhost:3002`
- ✅ No Stripe "empty string" errors
- ✅ Products, blogs, and other data loading correctly

## Troubleshooting

### Still seeing localhost:3002?
- Make sure `.env.local` is in the `frontend` directory (not root)
- Restart your dev server after creating the file
- Check that the variable name is exactly `NEXT_PUBLIC_API_URL` (case-sensitive)

### Still seeing Stripe errors?
- Verify your Stripe key starts with `pk_test_` or `pk_live_`
- Make sure there are no extra spaces or quotes in `.env.local`
- Restart your dev server

### For Production
- Environment variables in Vercel must be set for each environment (Production, Preview, Development)
- After adding variables, trigger a new deployment

