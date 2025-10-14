"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { NewsItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, Eye } from 'lucide-react';

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        setNewsItems(data);
      } catch (e) {
        console.warn('API failed, using sample data:', e);
        // Fallback to sample data if API fails
        const sampleNews = dataStore.getNews().filter(item => item.published);
        setNewsItems(sampleNews);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32 pb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg mb-6">
              اخبار نوران ایکس
            </h1>
            <p className="text-xl sm:text-2xl text-white/60 text-shadow mb-8">
              آخرین اخبار و رویدادهای دنیای انرژی خورشیدی
            </p>
          </div>

          {loading ? (
            <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-6"></div>
              <p className="text-white/60">در حال بارگذاری اخبار...</p>
            </div>
          ) : error ? (
            <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
            </div>
          ) : newsItems.length === 0 ? (
            <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">📰</div>
              <h2 className="text-2xl font-bold text-white mb-4">هنوز خبری منتشر نشده</h2>
              <p className="text-white/60">
                اخبار جدید به زودی منتشر خواهد شد
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <article key={item.id} className="bg-black/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-black/40 transition-all duration-300 group flex flex-col h-full">
                  {item.imageUrl && (
                    <div className="w-full h-48 bg-gray-700 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3">
                      {item.featured && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                          ویژه
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h2>

                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {item.excerpt || item.content.substring(0, 150) + '...'}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        {item.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{item.author}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views || 0}</span>
                        </div>
                      </div>
                    </div>

                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                        {item.tags.length > 3 && (
                          <span className="text-white/50 text-xs px-2 py-1">
                            +{item.tags.length - 3} بیشتر
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <Link
                    href={`/news/${item.id || (item as any)._id}`}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 group-hover:scale-105 mt-auto"
                  >
                    مطالعه کامل
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
