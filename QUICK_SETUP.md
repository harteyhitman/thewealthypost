# Quick Setup Guide - Production Environment

## Your URLs

- **Frontend (Vercel)**: `https://thewealthypost.vercel.app`
- **Backend (Render)**: `https://thewealthypost-backend.onrender.com`

## Step 1: Set Environment Variable in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://thewealthypost-backend.onrender.com`
   - **Environments**: ✅ Production ✅ Preview ✅ Development
5. Click **Save**
6. **Redeploy** your frontend (push a commit or manually redeploy)

## Step 2: Set CORS in Render Backend

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Select your backend service (`thewealthypost-backend`)
3. Go to **Environment** tab
4. Find or add:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://thewealthypost.vercel.app`
5. Click **Save Changes**
6. Render will automatically redeploy

## Step 3: Verify It Works

1. **Test backend is accessible**:
   ```bash
   curl https://thewealthypost-backend.onrender.com/posts
   ```
   Should return `[]` or an array of posts.

2. **Test admin login**:
   - Visit: `https://thewealthypost.vercel.app/admin/login`
   - Login with your admin credentials
   - Should work without CORS errors

## Troubleshooting

### Still seeing CORS errors?

1. **Wait a few minutes** - Render redeploy takes 1-2 minutes
2. **Clear browser cache** - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. **Check Render logs** - Make sure backend is running
4. **Verify environment variables**:
   - Vercel: `NEXT_PUBLIC_API_URL` = `https://thewealthypost-backend.onrender.com`
   - Render: `FRONTEND_URL` = `https://thewealthypost.vercel.app`

### Backend not responding?

1. **Check Render dashboard** - Service should be "Live"
2. **Check Render logs** - Look for errors
3. **First request may be slow** - Render free tier spins down after 15 min inactivity

## Default Admin Credentials

If you need to create the default admin:
- Username: `admin`
- Password: `admin123`

**⚠️ Change these in production!**

