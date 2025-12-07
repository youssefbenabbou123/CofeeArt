# Fixing 500 Error: Railway Backend Connection

## Problem
Getting "Erreur lors de la connexion" (500 error) when trying to sign in on Vercel deployment.

## Solution: Set Environment Variable in Vercel

### Step 1: Get Your Railway Backend URL
1. Go to your Railway dashboard
2. Select your backend project
3. Go to **Settings** → **Networking**
4. Copy your **Public Domain** (e.g., `https://coffee-arts-backend.up.railway.app`)
5. **Important:** Make sure it starts with `https://` and has NO trailing slash

### Step 2: Add Environment Variable in Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your Railway backend URL (e.g., `https://coffee-arts-backend.up.railway.app`)
   - **Environment:** Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy
After adding the environment variable:
- Vercel will automatically trigger a new deployment, OR
- Go to **Deployments** tab → Click **⋯** on latest deployment → **Redeploy**

## Verify It's Working

1. **Check the browser console** (F12 → Console tab)
   - You should see the API URL being used (check Network tab for requests)
   - Look for any CORS errors

2. **Test the connection:**
   - Try signing in again
   - If you still get errors, check:
     - Railway backend logs
     - Vercel deployment logs
     - Browser console for specific error messages

## Common Issues

### Issue 1: CORS Error
**Symptom:** Browser console shows CORS error

**Fix:** Update your backend CORS settings to allow your Vercel domain:
```javascript
// In backend/server.js or similar
const cors = require('cors');
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-vercel-app.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

### Issue 2: Backend Not Accessible
**Symptom:** Network error or timeout

**Fix:**
- Verify Railway backend is running
- Check Railway logs for errors
- Ensure Railway service is not paused

### Issue 3: Wrong URL Format
**Symptom:** Still getting 500 errors

**Fix:** Double-check your `NEXT_PUBLIC_API_URL`:
- ✅ `https://your-app.up.railway.app`
- ❌ `http://your-app.up.railway.app` (missing 's')
- ❌ `https://your-app.up.railway.app/` (trailing slash)
- ❌ `your-app.up.railway.app` (missing protocol)

## Testing Locally

Create a `.env.local` file in the `frontend` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3002
```

Then restart your dev server:
```bash
npm run dev
```

## Need Help?

Check:
1. Vercel deployment logs (Deployments → Click deployment → Logs)
2. Railway backend logs (Railway dashboard → Your service → Logs)
3. Browser console (F12 → Console and Network tabs)

