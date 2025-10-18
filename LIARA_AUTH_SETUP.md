# Liara Deployment Environment Variables Setup

## Required Environment Variables for Authentication

Add these environment variables in your Liara dashboard:

### Authentication Variables
```bash
# Admin credentials (change these!)
ADMIN_USER=your_admin_username
ADMIN_PASS=your_secure_admin_password

# Authentication secret (use a strong random string)
AUTH_SECRET=your_very_secure_random_string_here_minimum_32_chars

# MongoDB Connection (already configured)
MONGODB_URI=mongodb://username:password@el-capitan.liara.cloud:34070/my-app?authSource=admin
```

### How to Set Environment Variables in Liara:

1. Go to your Liara dashboard
2. Select your app (NOORONX)
3. Go to "Settings" → "Environment Variables"
4. Add the following variables:

| Variable | Value | Description |
|----------|--------|-------------|
| `ADMIN_USER` | `admin` | Admin username for dashboard |
| `ADMIN_PASS` | `your_secure_password` | Admin password (change default!) |
| `AUTH_SECRET` | `random_string_32+_chars` | Secret for cookie signing |

### Generate AUTH_SECRET:
```bash
# Use this command to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Security Notes:
- **Never use default credentials in production!**
- **AUTH_SECRET must be the same across all deployments**
- **Use strong, unique passwords**

### Troubleshooting:
- If you get 401 Unauthorized errors, check environment variables
- Use `/api/debug/auth` endpoint to verify configuration
- Make sure all three variables are set correctly

## Default Values (Development Only):
- ADMIN_USER: `admin`  
- ADMIN_PASS: `admin123`
- AUTH_SECRET: `change-me-secret`

**⚠️ WARNING: Change these defaults before deploying to production!**