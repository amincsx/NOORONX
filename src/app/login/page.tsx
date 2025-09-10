"use client";

import { useState } from 'react';
import Link from 'next/link';
import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.message || 'نام کاربری یا رمز عبور اشتباه است');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="glass rounded-full p-3 hover-lift transition-all duration-300 group flex items-center gap-2 text-white/80 hover:text-white">
          <span className="hidden sm:inline">بازگشت به خانه</span>
        </Link>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-24 pb-16">
        <div className="w-full max-w-md glass-strong rounded-2xl p-8 border border-white/10">
          <h1 className="text-3xl font-bold text-white/90 mb-6 text-center">ورود مدیر</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">نام کاربری</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">رمز عبور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover-lift disabled:opacity-60"
            >
              {loading ? 'در حال ورود...' : 'ورود'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


