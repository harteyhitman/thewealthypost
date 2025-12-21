# The Wealthy Post Backend API

NestJS backend for blog post management and admin dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run start:dev
```

The server will run on `http://localhost:3001`

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**⚠️ Change these credentials in production!**

## API Endpoints

### Authentication
- `POST /auth/signup` - Create new admin account
- `POST /auth/verify-email` - Verify email with code
- `POST /auth/resend-code` - Resend verification code
- `POST /auth/login` - Admin login (requires verified email)

### Posts (Public)
- `GET /posts` - Get all published posts
- `GET /posts/:id` - Get post by ID
- `GET /posts/slug/:slug` - Get post by slug

### Posts (Admin - Requires JWT)
- `GET /posts/admin` - Get all posts (including drafts)
- `POST /posts` - Create new post
- `PATCH /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

## Database

Uses SQLite database (`blog.db`) for simplicity. The database is automatically created on first run.

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=3001
JWT_SECRET=your-strong-secret-key-here
FRONTEND_URL=http://localhost:3000

# Email Configuration (for verification codes)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@thewealthypost.com
```

### Email Setup

For Gmail:
1. Enable 2-Step Verification
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password as `SMTP_PASS`

**Note:** In development, if email fails, verification codes will be logged to the console.

