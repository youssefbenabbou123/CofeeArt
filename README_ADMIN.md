# Admin Panel Setup

## Quick Start

### 1. Create an Admin User

Navigate to the `backend` folder and run:

```bash
cd backend
npm run create-admin
```

This creates an admin user with:
- **Email**: `admin@coffeearts.fr`
- **Password**: `admin123`

### 2. Start the Backend Server

Make sure your backend is running:

```bash
cd backend
npm run dev
```

The backend should be running on `http://localhost:3001`

### 3. Login as Admin

1. Go to your website's login page: `/connexion`
2. Enter the admin credentials
3. You'll be automatically redirected to `/admin`

## Custom Admin User

To create an admin with custom credentials:

```bash
npm run create-admin your-email@example.com your-password "Your Name"
```

## Make Existing User Admin

If you already have an account, make it admin:

```bash
npm run create-admin your-email@example.com
```

This updates the role without changing the password.

## Troubleshooting

### "I get logged out after page refresh"

**Solution**: The JWT token is stored in `localStorage`. Make sure:
1. ✅ Backend server is running (`npm run dev` in backend folder)
2. ✅ Backend URL is correct (check `NEXT_PUBLIC_API_URL` in `.env.local`)
3. ✅ Browser allows localStorage (not in incognito mode)
4. ✅ Check browser console for errors

### "I can't access /admin"

**Check**:
1. Your user role is `admin` in database (not `client`)
2. You're logged in (token exists in localStorage)
3. Backend API is accessible

### Check Your Admin Status

Run this SQL query in your database:

```sql
SELECT email, role FROM users WHERE email = 'your-email@example.com';
```

The `role` should be `'admin'`.

## Admin Panel Features

- 📊 **Dashboard**: Statistics and charts
- 👥 **Users**: Manage users and roles
- 📦 **Products**: Create, edit, delete products
- 📧 **Messages**: View and manage contact form messages
- ⚙️ **Settings**: Configure site settings

## Security Note

⚠️ **Important**: Change the default admin password after first login!

You can do this by:
1. Logging in as admin
2. Going to Users section
3. Or directly in the database

