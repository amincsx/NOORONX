"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { toEnglishDigits } from '@/lib/utils';
import { NewsItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, Eye } from 'lucide-react';

export default function EnglishNewsPage() {
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

    // Ensure toEnglishDigits is applied consistently
    const formatNumber = (number: string | number) => toEnglishDigits(number);

    // Set up MutationObserver to catch dynamic content
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        document.querySelectorAll('.number-to-english').forEach(el => {
          el.textContent = toEnglishDigits(el.textContent || '');
        });
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Run conversion every 2 seconds to catch any missed numbers
    const interval = setInterval(() => {
      document.querySelectorAll('.number-to-english').forEach(el => {
        el.textContent = toEnglishDigits(el.textContent || '');
      });
    }, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const formatDate = (date: Date | string) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return toEnglishDigits(d);
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-start sm:left-12 lg:left-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/en" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">Home</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/en/news" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">News</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/en/education" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">Education</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/en/services/consultation" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">Services</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/en/contact" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">Contact</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-shadow">
            Latest News and Developments
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Stay informed about the latest solar technologies and projects
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-white/60">Loading news...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-white/60 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems
              .filter(item => item.published)
              .map((item, index) => (
                <article
                  key={item.id || item._id || index}
                  className="glass-strong rounded-2xl overflow-hidden hover-lift transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400&h=300&fit=crop"}
                      alt={item.titleEn || item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {item.featured && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-white/50 text-sm mb-3" style={{ direction: 'ltr', fontFeatureSettings: '"lnum"' }}>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {toEnglishDigits(item.views || 0)}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3 leading-tight" style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}>
                      {item.titleEn || item.title}
                    </h2>

                    <p className="text-white/60 text-sm leading-relaxed mb-4" style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}>
                      {item.excerptEn || item.excerpt || (item.contentEn || item.content).substring(0, 150) + '...'}
                    </p>

                    <Link
                      href={`/en/news/${item.id || item._id}`}
                      className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && newsItems.filter(item => item.published).length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/60 text-xl mb-4">No news articles available at the moment.</p>
            <Link
              href="/en"
              className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors duration-300"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
          .number-to-english {
            font-feature-settings: 'lnum';
            font-variant-numeric: lining-nums;
            font-family: Arial, Helvetica, sans-serif;
            direction: ltr;
          }
        `}</style>

      {/* Ensure the lang attribute is set to English */}
      <div className="number-to-english" lang="en">
        {/* Example usage */}
      </div>
    </div>
  );
}
