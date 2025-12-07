# Troubleshooting Admin Panel 404 Errors

## Issue: Getting 404 errors on all admin routes

If you're seeing `404 (Not Found)` errors for routes like:
- `/api/admin/stats`
- `/api/admin/users`
- `/api/admin/products`
- etc.

## Solution Steps

### 1. Restart Your Backend Server

**This is the most common fix!** After adding new routes, you must restart the server:

```bash
# Stop the current server (Ctrl+C)
# Then restart it:
cd backend
npm run dev
```

### 2. Verify Routes Are Loaded

Check your backend console when starting the server. You should see:
```
🚀 Server is running on port 3001
📍 Admin routes: http://localhost:3001/api/admin/*
```

### 3. Test the Admin Routes

Try accessing this test endpoint (no auth required):
```
http://localhost:3001/api/admin/test
```

You should get: `{"success": true, "message": "Admin routes are working!"}`

If this works, the routes are loaded correctly.

### 4. Check Your Token

Admin routes require authentication. Make sure:
- You're logged in (check localStorage for `auth_token`)
- The token is being sent in requests (check Network tab in browser dev tools)
- The Authorization header is: `Bearer YOUR_TOKEN_HERE`

### 5. Verify Backend is Running

Make sure your backend server is actually running:
```bash
cd backend
npm run dev
```

You should see the server start message.

### 6. Check API URL

In your frontend `.env.local` file, make sure:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 7. Check Browser Console

Look for:
- CORS errors
- Network errors
- Authentication errors (401/403)

### 8. Common Issues

**Issue**: Routes return 404 even after restart
- **Fix**: Check if there are any syntax errors in `backend/routes/admin.js`
- **Fix**: Make sure `backend/middleware/auth.js` exists and is correct

**Issue**: Getting 401/403 instead of 404
- This is actually good! It means routes are working, but auth is failing
- Make sure you're logged in as admin
- Check your token is valid

**Issue**: Server won't start
- Check for syntax errors in server.js
- Make sure all dependencies are installed: `npm install`
- Check database connection

## Still Not Working?

1. Check backend console for error messages
2. Verify all files exist:
   - `backend/routes/admin.js`
   - `backend/middleware/auth.js`
   - `backend/server.js`
3. Make sure you've run the database migration:
   ```bash
   # Check if tables exist
   psql your_database -c "\dt"
   ```

## Quick Test

Run this in your browser console (while on your site):
```javascript
fetch('http://localhost:3001/api/admin/test')
  .then(r => r.json())
  .then(console.log)
```

If this returns `{"success": true, ...}`, routes are working!
If it returns 404, the server needs to be restarted.

