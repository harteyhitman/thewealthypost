# Setting Up Environment Variables in Vercel

To fix the admin login in production, you need to set the `NEXT_PUBLIC_API_URL` environment variable in Vercel.

## Steps

### 1. Your Render Backend URL

Your Render backend URL is:
```
https://thewealthypost-backend.onrender.com
```

### 2. Set Environment Variable in Vercel

1. **Go to your Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select your project** (`thewealthypost`)
3. **Go to Settings** → **Environment Variables**
4. **Add a new variable**:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://thewealthypost-backend.onrender.com`
   - **Environment**: Select all (Production, Preview, Development)
5. **Click "Save"**

### 3. Redeploy Your Frontend

After adding the environment variable:

1. **Option A: Automatic Redeploy**
   - Push a new commit to trigger a redeploy
   ```bash
   git commit --allow-empty -m "Trigger redeploy for env vars"
   git push
   ```

2. **Option B: Manual Redeploy**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click the three dots (⋯) on the latest deployment
   - Select "Redeploy"

### 4. Verify It's Working

1. **Check the environment variable is set**:
   - In Vercel Dashboard → Settings → Environment Variables
   - You should see `NEXT_PUBLIC_API_URL` listed

2. **Test the admin login**:
   - Visit `https://thewealthypost.vercel.app/admin/login`
   - Try logging in with your admin credentials
   - Should no longer see CORS errors

## Important Notes

- **`NEXT_PUBLIC_` prefix**: This is required for Next.js to expose the variable to the browser
- **No trailing slash**: Make sure your backend URL doesn't have a trailing slash
- **HTTPS**: Use `https://` not `http://` for production
- **CORS**: Make sure your Render backend has `FRONTEND_URL` set to `https://thewealthypost.vercel.app`

## Troubleshooting

### Still seeing CORS errors?

1. **Check Render backend CORS settings**:
   - In Render dashboard, verify `FRONTEND_URL` environment variable is set to your Vercel URL
   - Should be: `https://thewealthypost.vercel.app`

2. **Check the backend URL**:
   - Make sure `NEXT_PUBLIC_API_URL` in Vercel matches your Render backend URL exactly
   - No trailing slashes

3. **Clear browser cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or use incognito mode

### Environment variable not working?

1. **Redeploy**: Environment variables require a redeploy to take effect
2. **Check spelling**: Make sure it's exactly `NEXT_PUBLIC_API_URL` (case-sensitive)
3. **Check environment**: Make sure it's enabled for Production environment

## Testing Locally

To test with your production backend locally:

1. **Update `.env.local`**:
   ```env
   NEXT_PUBLIC_API_URL=https://thewealthypost-backend.onrender.com
   ```

2. **Restart dev server**:
   ```bash
   npm run dev
   ```

3. **Test admin login** at `http://localhost:3000/admin/login`

