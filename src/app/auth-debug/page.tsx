"use client";

import { useState } from 'react';

export default function AuthDebugPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [debugResult, setDebugResult] = useState<any>(null);
  const [loginResult, setLoginResult] = useState<any>(null);

  const testCredentials = async () => {
    try {
      const response = await fetch('/api/debug/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();
      setDebugResult(result);
    } catch (error) {
      setDebugResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  const testLogin = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      const result = await response.json();
      setLoginResult({ status: response.status, ...result });
    } catch (error) {
      setLoginResult({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Tool</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Credentials Input */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Test Credentials</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username:</label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password:</label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={testCredentials}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Test Credentials
                </button>
                <button
                  onClick={testLogin}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Test Login
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            
            {debugResult && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Credential Check:</h3>
                <pre className="bg-gray-900 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(debugResult, null, 2)}
                </pre>
              </div>
            )}

            {loginResult && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Login Test:</h3>
                <pre className="bg-gray-900 p-3 rounded text-xs overflow-auto">
                  {JSON.stringify(loginResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-yellow-900 border border-yellow-600 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Expected Username:</h3>
          <p>Based on /api/debug/auth, your username should be: <strong>mohammadrezazia</strong></p>
          <p className="mt-2 text-sm text-yellow-200">
            ⚠️ This debug page is only for troubleshooting. Remove it after fixing the issue.
          </p>
        </div>
      </div>
    </div>
  );
}