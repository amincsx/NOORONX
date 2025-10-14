"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { dataStore } from '@/lib/dataStore';
import { EducationItem } from '@/types/admin';
import { Calendar, User, Clock, Star, PlayCircle, Eye } from 'lucide-react';

export default function EducationPage() {
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/education', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        setEducationItems(data);
      } catch {
        // fallback to local mock in dev
        const allEducation = dataStore.getEducation();
        const publishedEducation = allEducation.filter(item => item.published);
        setEducationItems(publishedEducation);
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

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner': return 'مقدماتی';
      case 'intermediate': return 'متوسط';
      case 'advanced': return 'پیشرفته';
      default: return 'مقدماتی';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-green-500/20 text-green-400';
    }
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-[9999] gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10 mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg mb-6">
              آموزش‌های نوران ایکس
            </h1>
            <p className="text-xl sm:text-2xl text-white/60 text-shadow mb-8">
              آموزش تخصصی انرژی خورشیدی از صفر تا صد
            </p>
          </div>

          {loading ? (
            <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-6"></div>
              <p className="text-white/60">در حال بارگذاری دوره‌ها...</p>
            </div>
          ) : educationItems.length === 0 ? (
            <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="text-4xl mb-4">🎓</div>
              <h2 className="text-2xl font-bold text-white mb-4">هنوز دوره‌ای منتشر نشده</h2>
              <p className="text-white/60">
                دوره‌های آموزشی جدید به زودی اضافه خواهد شد
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {educationItems.map((item) => (
                <article key={item.id} className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl group flex flex-col h-full">
                  {item.imageUrl ? (
                    <div className="h-48 bg-gray-700 rounded-xl mb-4 overflow-hidden relative">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                      {item.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-4 flex items-center justify-center relative">
                      <span className="text-6xl">🎓</span>
                      {item.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <PlayCircle className="w-16 h-16 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(item.level)}`}>
                        {getLevelText(item.level)}
                      </span>
                      {item.featured && (
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          ویژه
                        </span>
                      )}
                      {item.category && (
                        <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white/90 mb-3 text-right group-hover:text-yellow-400 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-white/60 text-sm text-right mb-4 line-clamp-3">
                      {item.description || item.content.substring(0, 150) + '...'}
                    </p>

                    <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                        {item.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.duration}</span>
                          </div>
                        )}
                        {item.instructor && (
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{item.instructor}</span>
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
                    href={`/education/${item.id || (item as any)._id}`}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 group-hover:scale-105 flex items-center justify-center gap-2 mt-auto"
                  >
                    {item.videoUrl ? <PlayCircle className="w-4 h-4" /> : null}
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
