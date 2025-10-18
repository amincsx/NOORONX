/**
 * Simple sync script that calls the sync API endpoint
 * This approach works around the module resolution issues by using the API
 */

const https = require('http');

async function callSyncAPI(publishedOnly = false) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: `/api/sync${publishedOnly ? '?published=true' : ''}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = https.request(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const response = JSON.parse(data);
                    resolve(response);
                } catch (error) {
                    reject(new Error(`Failed to parse response: ${error.message}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.end();
    });
}

async function syncDatabase() {
    console.log('🔄 Calling sync API endpoint...');

    try {
        // Try syncing all content first
        console.log('📡 Syncing all content...');
        const result = await callSyncAPI(false);

        if (result.success) {
            console.log('✅ Sync completed successfully!');
            console.log(`📊 ${result.message}`);
            console.log('📄 Data written to local-db.json');
            return result;
        } else {
            console.error('❌ Sync failed:', result.message);
            if (result.error) {
                console.error('💥 Error details:', result.error);
            }
            return result;
        }
    } catch (error) {
        console.error('❌ Failed to call sync API:', error.message);

        // If auth failed, try without authentication (assuming local development)
        if (error.message.includes('Unauthorized') || error.code === 'ECONNREFUSED') {
            console.log('ℹ️  Note: Make sure the Next.js server is running on localhost:3001');
            console.log('ℹ️  You can also manually call: POST http://localhost:3001/api/sync');
        }

        throw error;
    }
}

// Run if called directly
if (require.main === module) {
    syncDatabase()
        .then((result) => {
            console.log('🎉 Database sync process completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Database sync process failed:', error.message);
            process.exit(1);
        });
}

module.exports = { syncDatabase, callSyncAPI };