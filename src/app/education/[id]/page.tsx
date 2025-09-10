"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { EducationItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { Calendar, User, ArrowRight, Play, FileText, Eye } from 'lucide-react';

export default function EducationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [educationItem, setEducationItem] = useState<EducationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/education/${id}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load education');
        const data = await res.json();
        setEducationItem(data);
        
        // Track view
        try {
          const viewRes = await fetch(`/api/education/${id}/views`, { 
            method: 'PATCH',
            cache: 'no-store'
          });
          if (viewRes.ok) {
            const viewData = await viewRes.json();
            // Update the view count in the current item
            setEducationItem(prev => prev ? { ...prev, views: viewData.views } : null);
          }
        } catch (viewError) {
          console.warn('Failed to track view:', viewError);
        }
      } catch (e) {
        console.warn('API failed, using sample data:', e);
        // Fallback to sample data if API fails
        const sampleEducation = dataStore.getEducation().find(item => 
          item.id === id || (item as any)._id === id
        );
        setEducationItem(sampleEducation || null);
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

  if (error || !educationItem) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <ResponsiveBackground />
        <div className="text-white text-center">
          <p className="mb-4">مطلب آموزشی مورد نظر یافت نشد</p>
          <Link href="/education" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300">
            بازگشت به آموزش
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
            href="/education"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 group"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            بازگشت به آموزش
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="glass-strong rounded-2xl p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-relaxed">
              {educationItem.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/60 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(educationItem.createdAt)}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {educationItem.instructor || 'تیم نورونکس'}
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                کل بازدید: {educationItem.views || 0}
              </div>
              {educationItem.category && (
                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs">
                  {educationItem.category}
                </div>
              )}
              {educationItem.featured && (
                <div className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs">
                  ویژه
                </div>
              )}
            </div>

            {educationItem.description && (
              <p className="text-xl text-white/80 leading-relaxed border-r-4 border-green-500 pr-4">
                {educationItem.description}
              </p>
            )}
          </div>

          {/* Video */}
          {educationItem.videoUrl && (
            <div className="mb-8">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-medium">ویدیو آموزشی</h3>
                </div>
                <div className="aspect-video bg-black/30 rounded-xl overflow-hidden">
                  {educationItem.videoUrl.includes('youtube.com') || educationItem.videoUrl.includes('youtu.be') ? (
                    <iframe
                      src={educationItem.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title={educationItem.title}
                    />
                  ) : (
                    <video 
                      controls 
                      className="w-full h-full object-cover"
                      src={educationItem.videoUrl}
                    >
                      مرورگر شما از نمایش ویدیو پشتیبانی نمی‌کند.
                    </video>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Image */}
          {educationItem.imageUrl && (
            <div className="mb-8">
              <img 
                src={educationItem.imageUrl} 
                alt={educationItem.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          )}

          {/* Content */}
          <div className="glass-strong rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-5 h-5 text-green-400" />
              <h3 className="text-white font-medium">محتوای آموزشی</h3>
            </div>
            <div className="prose prose-invert prose-green max-w-none">
              <div 
                className="text-white/90 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: educationItem.content.replace(/\n/g, '<br>') }}
              />
            </div>
          </div>

          {/* Tags */}
          {educationItem.tags && educationItem.tags.length > 0 && (
            <div className="glass rounded-xl p-6 mb-8">
              <h3 className="text-white font-medium mb-4">برچسب‌ها:</h3>
              <div className="flex flex-wrap gap-2">
                {educationItem.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm"
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
              href="/education"
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              مشاهده سایر مطالب آموزشی
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
