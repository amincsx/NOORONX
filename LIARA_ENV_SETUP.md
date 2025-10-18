# Environment Variables for Liara Production Deployment

## Required Environment Variables

Set these in your Liara dashboard under your app's Environment Variables section:

### 1. MongoDB Configuration
```bash
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas:27017/my-app?authSource=admin
```

### 2. Authentication Configuration  
```bash
ADMIN_USER=mohammadrezazia
ADMIN_PASS=mohammadrezaziayektanoh
AUTH_SECRET=69ad3a4b-871c-4154-bce0-c1444a093ff40bd3eddf-f84e-42e1-90aa-f749bca58567
```

### 3. Next.js Configuration
```bash
NODE_ENV=production
NEXTAUTH_SECRET=69ad3a4b-871c-4154-bce0-c1444a093ff40bd3eddf-f84e-42e1-90aa-f749bca58567
NEXTAUTH_URL=https://your-app-name.liara.run
```

## Steps to Configure in Liara:

1. Go to your Liara dashboard
2. Select your NOORONX app
3. Go to "Settings" → "Environment Variables"
4. Add each variable above with its corresponding value
5. Redeploy your application

## Alternative MongoDB URIs to try:

If the first one doesn't work, try these alternatives in order:

```bash
# Option 1 (Internal Liara network)
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas:27017/my-app?authSource=admin

# Option 2 (With .iran.liara.ir domain)
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas.iran.liara.ir:27017/my-app?authSource=admin

# Option 3 (External hostname)
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/my-app?authSource=admin
```

## Testing the Configuration:

After setting the environment variables, check the logs during deployment. You should see:
- ✅ MongoDB URI configured: mongodb://***:***@...
- Not: ❌ خطای اتصال: No MongoDB URI found

## Troubleshooting:

If you still get connection errors:
1. Verify the MongoDB database name in Liara dashboard
2. Check if the MongoDB service is running
3. Ensure the credentials match your MongoDB setup
4. Try each alternative URI above