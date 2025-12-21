# Admin Dashboard Setup Guide

## Backend Setup (NestJS)

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies (if not already done):
```bash
npm install
```

3. Start the backend server:
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

## Frontend Setup

The admin dashboard is already integrated into the Next.js app.

## Accessing the Admin Dashboard

1. Start the Next.js frontend:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/admin/login`

3. **For new admins:**
   - Go to `/admin/signup` to create an account
   - Verify your email with the code sent to your inbox
   - Then login with your credentials

4. **Default admin credentials:**
   - **Username**: `admin`
   - **Password**: `admin123`
   - **Email**: `admin@thewealthypost.com` (pre-verified)

## Features

### Admin Dashboard (`/admin/dashboard`)
- View all blog posts
- See post status (Published/Draft)
- Edit and delete posts
- Create new posts

### Create/Edit Post (`/admin/posts/new` or `/admin/posts/:id`)
- Create new blog posts
- Edit existing posts
- Set post metadata (title, slug, category, author, date)
- Add content (HTML supported)
- Upload image URLs
- Set tags
- Toggle published status

## API Integration

The blog pages will automatically fetch posts from the API when available. The system falls back to static data if the API is unavailable.

## Database

The backend uses SQLite (`blog.db`) which is automatically created on first run. The database file is stored in the `backend` directory.

## Features

### Authentication
- ✅ Password visibility toggle
- ✅ Signup for multiple admin users
- ✅ Email verification with 6-digit code
- ✅ Resend verification code
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication

### Email Verification
- Verification codes are sent via email
- Codes expire after 10 minutes
- In development, codes are also logged to console if email fails

## Security Notes

⚠️ **Important for Production:**
1. Change the default admin password
2. Set a strong `JWT_SECRET` environment variable
3. Configure SMTP settings for email verification
4. Disable `synchronize: true` in TypeORM config
5. Use a production database (PostgreSQL, MySQL, etc.)
6. Enable HTTPS
7. Add rate limiting
8. Implement proper CORS settings
9. Set up proper email service (SendGrid, AWS SES, etc.)

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3001
JWT_SECRET=your-strong-secret-key-here
FRONTEND_URL=http://localhost:3000
```

## Next Steps

1. Start both servers (backend and frontend)
2. Login to admin dashboard
3. Create your first post
4. View it on the blog listing page

