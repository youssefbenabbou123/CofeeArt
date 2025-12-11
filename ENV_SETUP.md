# Environment Variables Setup Guide

## 🚨 Critical: Fix API Connection and Stripe Errors

## ⚠️ IMPORTANT: Stripe Keys Explained

You need **TWO different Stripe keys**:

1. **`STRIPE_SECRET_KEY`** (starts with `sk_test_` or `sk_live_`)
   - ✅ Goes in **BACKEND** Vercel (you already have this!)
   - Used server-side to create payment intents, process payments
   - **NEVER expose this in frontend code!**

2. **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** (starts with `pk_test_` or `pk_live_`)
   - ❌ **MISSING** - Needs to go in **FRONTEND** Vercel
   - Safe to expose in browser, used by Stripe.js
   - **This is what you're missing!**

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

**IMPORTANT:** This is DIFFERENT from your secret key!

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. You'll see TWO keys:
   - **Secret key** (sk_test_...) - ✅ You already have this in backend
   - **Publishable key** (pk_test_...) - ❌ **You need this for frontend!**
3. Copy the **Publishable key** (starts with `pk_test_` for testing or `pk_live_` for production)
4. Replace `pk_test_your_key_here` in `.env.local` with your actual publishable key

**Note:** The publishable key is different from your secret key. They're shown side-by-side in the Stripe dashboard.

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

### Frontend Vercel Project (Your Next.js App)

1. Go to your **FRONTEND** Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add/Update:
   - `NEXT_PUBLIC_API_URL` = `https://cofee-art-backend.vercel.app`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = Your Stripe **PUBLISHABLE** key (pk_test_...)

4. **Redeploy** your frontend application after adding/updating variables

### Backend Vercel Project (Already Done ✅)

Your backend already has:
- ✅ `STRIPE_SECRET_KEY` = `sk_test_...` (This is correct!)

**Summary:**
- Backend Vercel: `STRIPE_SECRET_KEY` (sk_test_...) ✅ You have this
- Frontend Vercel: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk_test_...) ❌ You need this!

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

