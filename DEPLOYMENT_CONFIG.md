# Production Deployment Configuration

This file contains the environment variables you need to configure in your Liara deployment to ensure data persistence.

## Required Environment Variables for Liara Deployment

Set these environment variables in your Liara app settings:

### Database Configuration

**For Liara Production Deployment** (use the internal hostname):
```
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas:27017/my-app?authSource=admin
NODE_ENV=production
```

**For Local Development** (use the external hostname):
```
MONGODB_URI=mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/my-app?authSource=admin
NODE_ENV=development
```

### Authentication (keep your existing values)
```
ADMIN_USER=mohammadrezazia
ADMIN_PASS=mohammadrezaziayektanoh
AUTH_SECRET=69ad3a4b-871c-4154-bce0-c1444a093ff40bd3eddf-f84e-42e1-90aa-f749bca58567
```

## How to Set Environment Variables in Liara

1. **Go to your Liara dashboard**
2. **Select your app**
3. **Navigate to "Settings" → "Environment Variables"**
4. **Add the following variables:**

   | Variable Name | Value |
   |---------------|-------|
   | `MONGODB_URI` | `mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas:27017/my-app?authSource=admin` *(internal hostname for Liara)* |
   | `NODE_ENV` | `production` |
   | `ADMIN_USER` | `mohammadrezazia` |
   | `ADMIN_PASS` | `mohammadrezaziayektanoh` |
   | `AUTH_SECRET` | `69ad3a4b-871c-4154-bce0-c1444a093ff40bd3eddf-f84e-42e1-90aa-f749bca58567` |

5. **Save and redeploy your app**

## 🔗 **Important: Connection String Differences**

**You have TWO different MongoDB connection strings:**

1. **External Hostname** (for local development):
   ```
   mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@el-capitan.liara.cloud:34070/my-app?authSource=admin
   ```

2. **Internal Hostname** (for Liara production):
   ```
   mongodb://root:iapqIvsm1GACa6OPHFnqQhWl@nooronxdatabas:27017/my-app?authSource=admin
   ```

- **Use the external hostname** in your local `.env.local` file
- **Use the internal hostname** in Liara's environment variables
- The internal hostname (`nooronxdatabas`) only works within Liara's infrastructure

## What Changed

### 🔄 **Database Connection Logic**
- **Development**: Falls back to mock data if MongoDB is unavailable
- **Production**: **ALWAYS** requires MongoDB connection - no fallback
- **Improved Error Handling**: Clear error messages when database is unavailable

### 🛡️ **Data Persistence Guarantee**
- **Production builds will fail** if MongoDB URI is not configured
- **API routes return 503 errors** instead of falling back to mock data
- **All admin-added data will persist** across deployments

### 📊 **Database Headers**
- API responses now include `X-Database` header indicating data source:
  - `X-Database: mongodb` - Data from your database
  - `X-Database: mock` - Data from local fallback (development only)

## Testing Data Persistence

### Before Deployment:
1. **Add some test data through your admin interface**
2. **Run sync to verify data is in database:**
   ```bash
   node scripts/sync-liara-db.js
   ```

### After Deployment:
1. **Check that your data is visible on the live site**
2. **Add more data through the deployed admin interface**
3. **Verify data persists after subsequent deployments**

## Troubleshooting

### If deployed site shows no data:
1. **Check Liara environment variables are set correctly**
2. **Check Liara deployment logs for MongoDB connection errors**
3. **Verify your MongoDB connection string is accessible from Liara servers**

### If you see database connection errors:
1. **Verify the MongoDB URI format is correct**
2. **Check that your MongoDB service is running and accessible**
3. **Look for network connectivity issues in Liara logs**

### If data disappears after deployment:
1. **This should no longer happen with the new configuration**
2. **Check that `NODE_ENV=production` is set in Liara**
3. **Verify the API is using MongoDB (check `X-Database` header)**

## Development vs Production Behavior

| Aspect | Development | Production |
|--------|-------------|------------|
| **MongoDB unavailable** | Falls back to local mock data | Returns 503 error |
| **Data source** | MongoDB → Mock fallback | MongoDB only |
| **Environment check** | Flexible connection handling | Strict connection requirements |
| **Error handling** | Graceful degradation | Fail-fast with clear errors |

## Next Steps

1. **Set the environment variables in Liara**
2. **Deploy your updated code**
3. **Test that data persists across deployments**
4. **Add content through admin interface and verify it stays**

Your data will now persist across all deployments! 🎉