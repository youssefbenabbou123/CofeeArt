# Quick Vercel Setup Guide

## Immediate Fix (Choose One Method):

### Method 1: CLI Setup (Fastest)
```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Navigate to your project
cd C:\Users\lhehl\Desktop\coffee-arts-paris-website

# 3. Login to Vercel
vercel login

# 4. Link and deploy your project
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No (first time)ok make it
# - Project name? → coffee-arts-paris-website (or press Enter)
# - Directory? → ./ (press Enter)

# 5. Deploy to production
vercel --prod
```

### Method 2: Dashboard Setup (Easiest)
1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. **Import Git Repository:**
   - If your code is on GitHub/GitLab/Bitbucket, select it
   - Vercel will auto-detect Next.js
   - Click **"Deploy"**

4. **Or Upload Project:**
   - Click **"Browse"** to upload your project folder
   - Vercel will auto-detect Next.js
   - Click **"Deploy"**

### Method 3: Connect Git (Best for Ongoing Use)
1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. In Vercel Dashboard:
   - Click **"Add New Project"**
   - Select your GitHub repository
   - Click **"Import"**
   - Vercel auto-configures everything

---

## After Setup - Verify It Works:

```bash
# List your deployments
vercel ls

# Check deployment status
vercel inspect

# View deployment logs
vercel logs
```

---

## Expected Output After Success:

✅ A `.vercel/` directory will be created with:
- `project.json` - Project metadata
- `link.json` - Deployment link info

✅ You'll get a deployment URL like:
- Preview: `https://coffee-arts-paris-website-xyz123.vercel.app`
- Production: `https://coffee-arts-paris-website.vercel.app`

✅ Your deployment will appear in Vercel Dashboard

---

## Troubleshooting:

**If `vercel` command not found:**
```bash
npm install -g vercel
# or
npx vercel
```

**If deployment fails:**
- Check build locally: `npm run build`
- Check for TypeScript errors: `npm run lint`
- Check Vercel dashboard for build logs

**If authentication fails:**
```bash
vercel logout
vercel login
```

