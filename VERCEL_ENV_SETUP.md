# Vercel Environment Variables Setup

To fix the CORS error and connect your Vercel frontend to your Render backend, you need to set environment variables in Vercel.

## Problem

If you see these errors:
- `NEXT_PUBLIC_API_URL not set, using fallback`
- `Failed to load resource: net::ERR_CONNECTION_REFUSED`
- `Login error: TypeError: Failed to fetch`

This means your frontend is trying to connect to `localhost:3001` instead of your Render backend.

## Steps:

1. **Go to your Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Select your project** (`thewealthypost-01` or your project name)

3. **Go to Settings** → **Environment Variables**

4. **Add the following environment variable**:

   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://thewealthypost-backend.onrender.com`
   - **Environment**: Select all (Production, Preview, Development)

5. **Click "Save"**

6. **Redeploy your application**:
   - Go to **Deployments** tab
   - Click the **"..."** menu on the latest deployment
   - Select **"Redeploy"**
   - Or push a new commit to trigger a redeploy

## Verify Setup

After redeploying, your frontend should now:
- ✅ Use the Render backend URL instead of localhost
- ✅ Work without CORS errors
- ✅ Connect to your deployed backend

**Check browser console** - you should NOT see `NEXT_PUBLIC_API_URL not set` anymore.

## Backend CORS Configuration

Make sure your Render backend has the `FRONTEND_URL` environment variable set:

1. **Go to Render Dashboard**: [dashboard.render.com](https://dashboard.render.com)

2. **Select your backend service**

3. **Go to Environment** tab

4. **Set or update**:
   - **Name**: `FRONTEND_URL`
   - **Value**: `https://thewealthypost-01.vercel.app` (your Vercel URL)

5. **Save and restart** the service

## Testing

After both are configured:
1. Visit your Vercel frontend
2. Open browser console (F12) - should NOT see API URL warnings
3. Try logging into the admin dashboard
4. Check Network tab - requests should go to Render backend, not localhost
5. Should work without CORS errors!

## Quick Checklist

- [ ] Added `NEXT_PUBLIC_API_URL` in Vercel
- [ ] Selected ALL environments
- [ ] Redeployed application
- [ ] Set `FRONTEND_URL` in Render
- [ ] Verified no errors in console
- [ ] Tested login functionality

## Common Issues

**Still seeing localhost?**
- Make sure you redeployed after setting the variable
- Clear browser cache
- Try incognito/private window

**CORS errors?**
- Verify `FRONTEND_URL` is set in Render
- Check Render logs for CORS warnings

**Backend not responding?**
- Check if Render service is running (not sleeping)
- First request after sleep takes 30-60 seconds

For more detailed troubleshooting, see `FIX_ENV_VARIABLE.md`

