"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { NewsItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, ArrowRight, Eye } from 'lucide-react';

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/news/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        setNewsItem(data);
        
        // Track view
        try {
          await fetch(`/api/news/${id}/views`, { 
            method: 'PATCH',
            cache: 'no-store'
          });
        } catch (viewError) {
          console.warn('Failed to track view:', viewError);
        }
      } catch (e) {
        console.warn('API failed, using sample data:', e);
        // Fallback to sample data if API fails
        const sampleNews = dataStore.getNews().find(item => 
          item.id === id || (item as any)._id === id
        );
        setNewsItem(sampleNews || null);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <ResponsiveBackground />
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p>در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <ResponsiveBackground />
        <div className="text-white text-center">
          <p className="mb-4">خبر مورد نظر یافت نشد</p>
          <Link href="/news" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
            بازگشت به اخبار
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">خانه</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/news" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">اخبار</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/education" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">آموزش</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/services/consultation" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">خدمات</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
        <Link href="/contact" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105">
          <span className="relative z-10">تماس</span>
          <div className="absolute inset-0 bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </Link>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            بازگشت به اخبار
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="glass-strong rounded-2xl p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed">
              {newsItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(newsItem.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {newsItem.author || 'مدیر سایت'}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                کل بازدید: {newsItem.views || 0}
              </div>
              {newsItem.featured && (
                <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                  ویژه
                </div>
              )}
            </div>

            {newsItem.excerpt && (
              <p className="text-xl text-white/80 leading-relaxed border-r-4 border-yellow-500 pr-4">
                {newsItem.excerpt}
              </p>
            )}
          </div>

          {/* Image */}
          {newsItem.imageUrl && (
            <div className="mb-8">
              <img 
                src={newsItem.imageUrl} 
                alt={newsItem.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          )}

          {/* Content */}
          <div className="glass-strong rounded-2xl p-8 mb-8">
            <div className="prose prose-invert prose-yellow max-w-none">
              <div 
                className="text-white/90 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: newsItem.content.replace(/\n/g, '<br>') }}
              />
            </div>
          </div>

          {/* Tags */}
          {newsItem.tags && newsItem.tags.length > 0 && (
            <div className="glass rounded-xl p-6 mb-8">
              <h3 className="text-white font-medium mb-4">برچسب‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {newsItem.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-center">
            <Link 
              href="/news"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              مشاهده سایر اخبار
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
