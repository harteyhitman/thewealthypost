# Mobile/Cross-Browser Login Fix

## Problem
Login works on laptop Chrome but shows "failed to fetch" on mobile browsers and other browsers.

## Root Causes

1. **Environment Variable Not Set in Vercel**
   - `NEXT_PUBLIC_API_URL` might not be set correctly
   - Different builds might have different env vars

2. **Network Timeout Issues**
   - Mobile networks are slower
   - Render free tier services spin down after 15 minutes
   - First request after spin-down takes 30-60 seconds

3. **CORS Configuration**
   - Backend might not allow requests from all origins
   - Mobile browsers might have stricter CORS policies

## Solutions Applied

### 1. Improved API URL Resolution
- Better fallback logic for environment variables
- Handles cases where env var might not be available

### 2. Added Request Timeouts
- 15-second timeout for mobile networks
- Better error messages for timeout scenarios

### 3. Enhanced Error Handling
- Specific error messages for network issues
- Better debugging information

## Steps to Fix

### Step 1: Verify Vercel Environment Variable

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Verify `NEXT_PUBLIC_API_URL` is set to:
   ```
   https://thewealthypost-backend.onrender.com
   ```
5. Make sure it's set for **ALL environments** (Production, Preview, Development)

### Step 2: Verify Render Backend CORS

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Environment** tab
4. Verify `FRONTEND_URL` includes:
   ```
   https://thewealthypost-01.vercel.app
   ```
   Or set it to allow all origins temporarily:
   ```
   https://thewealthypost-01.vercel.app,https://*.vercel.app
   ```

### Step 3: Check Render Service Status

1. In Render dashboard, check if service is **Running**
2. If it shows "Sleeping", it will wake up on first request (takes 30-60 seconds)
3. Consider upgrading to paid plan for always-on service

### Step 4: Test the Fix

1. **Clear browser cache** on mobile device
2. **Hard refresh** the page (or clear app data)
3. Try logging in again
4. Wait up to 60 seconds on first request (if service was sleeping)

## Debugging

### Check API URL in Browser Console

On mobile device, open browser console and run:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

Or check the network tab to see what URL is being called.

### Common Issues

1. **"Failed to fetch" on mobile but works on desktop**
   - Check if `NEXT_PUBLIC_API_URL` is set in Vercel
   - Verify backend is accessible from mobile network
   - Check Render service is running (not sleeping)

2. **Works on Chrome but not Safari/Firefox**
   - CORS issue - verify `FRONTEND_URL` in Render
   - Check browser console for CORS errors

3. **Timeout errors**
   - Render free tier service might be sleeping
   - First request takes longer
   - Consider upgrading Render plan

## Quick Test

Test the backend directly from mobile:
```
https://thewealthypost-backend.onrender.com/posts
```

Should return JSON (empty array or posts). If this fails, the backend is not accessible.

## Alternative: Use API Route Proxy

If issues persist, consider creating a Next.js API route to proxy requests:

```typescript
// src/app/api/auth/login/route.ts
export async function POST(request: Request) {
  const body = await request.json();
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://thewealthypost-backend.onrender.com';
  
  const response = await fetch(`${backendUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  return response;
}
```

This avoids CORS issues entirely since requests go through your Next.js server.

