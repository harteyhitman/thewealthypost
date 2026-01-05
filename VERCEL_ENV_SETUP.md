# Vercel Environment Variables Setup

To fix the CORS error and connect your Vercel frontend to your Render backend, you need to set environment variables in Vercel.

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
2. Try logging into the admin dashboard
3. Should work without CORS errors!

