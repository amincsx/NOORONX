"use client";

import React, { useState, useEffect } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ContentForm from '@/components/ContentForm';
import ContentList from '@/components/ContentList';
import ResponsiveBackground from "@/components/ResponsiveBackground";
import { dataStore } from '@/lib/dataStore';
import { NewsItem, EducationItem, AdminFormData } from '@/types/admin';
import { BarChart3, Users, DollarSign, TrendingUp, Activity, Settings, Plus, Newspaper, GraduationCap, Eye, Star, ArrowLeft, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'education'>('overview');
  const [showForm, setShowForm] = useState<{
    show: boolean;
    type: 'news' | 'education';
    item?: NewsItem | EducationItem | null;
  }>({ show: false, type: 'news' });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    // Simple authentication check
    if (loginForm.username === 'mohammadrezazia' && loginForm.password === 'mohammadrezaziayektanoh') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setLoginForm({ username: '', password: '' });
  };

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  useEffect(() => {
    // Load data only when authenticated
    if (!isAuthenticated) return;
    
    const loadNews = async () => {
      try {
        const res = await fetch('/api/news?all=1', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setNewsItems(data);
        } else {
          // Fallback to local for dev if API fails
          setNewsItems(dataStore.getNews());
        }
      } catch {
        setNewsItems(dataStore.getNews());
      }
    };
    loadNews();
    const loadEducation = async () => {
      try {
        const res = await fetch('/api/education?all=1', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setEducationItems(data);
        } else {
          setEducationItems(dataStore.getEducation());
        }
      } catch {
        setEducationItems(dataStore.getEducation());
      }
    };
    loadEducation();
  }, [isAuthenticated]);

  const handleSaveContent = async (formData: AdminFormData) => {
    if (showForm.type === 'news') {
      if (showForm.item) {
        // Update existing news
        try {
          const res = await fetch(`/api/news/${(showForm.item as NewsItem).id || (showForm.item as any)._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: formData.title,
              titleEn: formData.titleEn,
              content: formData.content,
              contentEn: formData.contentEn,
              excerpt: formData.excerpt || '',
              excerptEn: formData.excerptEn || '',
              imageUrl: formData.imageUrl,
              author: formData.author || 'مدیر سایت',
              published: formData.published,
              featured: formData.featured,
              tags: formData.tags
            })
          });
          if (res.ok) {
            const updated = await res.json();
            setNewsItems(prev => prev.map(n => (n.id === updated._id || (n as any)._id === updated._id ? { ...(updated as any), id: (updated as any)._id } : n)));
          }
        } catch {
          // no-op
        }
      } else {
        // Add new news
        try {
          const res = await fetch('/api/news', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: formData.title,
              titleEn: formData.titleEn,
              content: formData.content,
              contentEn: formData.contentEn,
              excerpt: formData.excerpt || '',
              excerptEn: formData.excerptEn || '',
              imageUrl: formData.imageUrl,
              author: formData.author || 'مدیر سایت',
              published: formData.published,
              featured: formData.featured,
              tags: formData.tags
            })
          });
          if (res.ok) {
            const created = await res.json();
            setNewsItems(prev => [{ ...(created as any), id: (created as any)._id }, ...prev]);
          }
        } catch {
          // no-op
        }
      }
    } else {
      if (showForm.item) {
        // Update existing education
        try {
          const res = await fetch(`/api/education/${(showForm.item as EducationItem).id || (showForm.item as any)._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: formData.title,
              titleEn: formData.titleEn,
              content: formData.content,
              contentEn: formData.contentEn,
              description: formData.description || '',
              descriptionEn: formData.descriptionEn || '',
              imageUrl: formData.imageUrl,
              videoUrl: formData.videoUrl,
              duration: formData.duration || '',
              level: formData.level || 'beginner',
              category: formData.category || '',
              instructor: formData.instructor || '',
              published: formData.published,
              featured: formData.featured,
              tags: formData.tags
            })
          });
          if (res.ok) {
            const updated = await res.json();
            setEducationItems(prev => prev.map(e => (e.id === updated._id || (e as any)._id === updated._id ? { ...(updated as any), id: (updated as any)._id } : e)));
          }
        } catch {
          // no-op
        }
      } else {
        // Add new education
        try {
          const res = await fetch('/api/education', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: formData.title,
              titleEn: formData.titleEn,
              content: formData.content,
              contentEn: formData.contentEn,
              description: formData.description || '',
              descriptionEn: formData.descriptionEn || '',
              imageUrl: formData.imageUrl,
              videoUrl: formData.videoUrl,
              duration: formData.duration || '',
              level: formData.level || 'beginner',
              category: formData.category || '',
              instructor: formData.instructor || '',
              published: formData.published,
              featured: formData.featured,
              tags: formData.tags
            })
          });
          if (res.ok) {
            const created = await res.json();
            setEducationItems(prev => [{ ...(created as any), id: (created as any)._id }, ...prev]);
          }
        } catch {
          // no-op
        }
      }
    }

    setShowForm({ show: false, type: 'news' });
  };

  const handleDeleteContent = async (type: 'news' | 'education', id: string) => {
    if (type === 'news') {
      try {
        const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setNewsItems(prev => prev.filter(n => n.id !== id && (n as any)._id !== id));
        }
      } catch {
        // no-op
      }
    } else {
      try {
        const res = await fetch(`/api/education/${id}`, { method: 'DELETE' });
        if (res.ok) {
          setEducationItems(prev => prev.filter(e => e.id !== id && (e as any)._id !== id));
        }
      } catch {
        // no-op
      }
    }
  };

  const handleTogglePublished = async (type: 'news' | 'education', id: string, published: boolean) => {
    if (type === 'news') {
      try {
        const item = newsItems.find(n => n.id === id || (n as any)._id === id);
        if (!item) return;
        const res = await fetch(`/api/news/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, published })
        });
        if (res.ok) {
          const updated = await res.json();
          setNewsItems(prev => prev.map(n => (n.id === id || (n as any)._id === id ? { ...(updated as any), id } : n)));
        }
      } catch {
        // no-op
      }
    } else {
      try {
        const item = educationItems.find(e => e.id === id || (e as any)._id === id);
        if (!item) return;
        const res = await fetch(`/api/education/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, published })
        });
        if (res.ok) {
          const updated = await res.json();
          setEducationItems(prev => prev.map(e => (e.id === id || (e as any)._id === id ? { ...(updated as any), id } : e)));
        }
      } catch {
        // no-op
      }
    }
  };

  const handleToggleFeatured = async (type: 'news' | 'education', id: string, featured: boolean) => {
    if (type === 'news') {
      try {
        const item = newsItems.find(n => n.id === id || (n as any)._id === id);
        if (!item) return;
        const res = await fetch(`/api/news/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, featured })
        });
        if (res.ok) {
          const updated = await res.json();
          setNewsItems(prev => prev.map(n => (n.id === id || (n as any)._id === id ? { ...(updated as any), id } : n)));
        }
      } catch {
        // no-op
      }
    } else {
      try {
        const item = educationItems.find(e => e.id === id || (e as any)._id === id);
        if (!item) return;
        const res = await fetch(`/api/education/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, featured })
        });
        if (res.ok) {
          const updated = await res.json();
          setEducationItems(prev => prev.map(e => (e.id === id || (e as any)._id === id ? { ...(updated as any), id } : e)));
        }
      } catch {
        // no-op
      }
    }
  };

  // Calculate statistics
  const totalNews = newsItems.length;
  const publishedNews = newsItems.filter(item => item.published).length;
  const featuredNews = newsItems.filter(item => item.featured).length;

  const totalEducation = educationItems.length;
  const publishedEducation = educationItems.filter(item => item.published).length;
  const featuredEducation = educationItems.filter(item => item.featured).length;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <ResponsiveBackground />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-30">
        <Link href="/" className="glass rounded-full p-3 hover-lift transition-all duration-300 group flex items-center gap-2 text-white/80 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">بازگشت به خانه</span>
        </Link>
      </div>

      {!isAuthenticated ? (
        /* Login Form */
        <div className="relative z-20 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-md mx-auto px-4">
            <div className="glass rounded-2xl p-8 shadow-2xl">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <h1 className="text-2xl font-bold text-white/90 mb-2">
                  ورود به پنل مدیریت
                </h1>
                <p className="text-white/60">
                  وارد کردن اطلاعات ورود برای دسترسی به داشبورد
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    نام کاربری
                  </label>
                  <input
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="نام کاربری خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    رمز عبور
                  </label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="رمز عبور خود را وارد کنید"
                  />
                </div>

                {loginError && (
                  <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    {loginError}
                  </div>
                )}

                <Button type="submit" className="w-full">
                  <LogIn className="w-5 h-5 ml-2" />
                  ورود به پنل
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Dashboard Content */
        <>
          {/* Header */}
          <header className="relative z-20 pt-20 pb-6">
            <div className="container mx-auto px-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">N</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-white/90 text-shadow-lg">
                    پنل مدیریت NOORONX
                  </h1>
                </div>
                <p className="text-xl text-white/60 max-w-3xl mx-auto">
                  مدیریت محتوای وب‌سایت انرژی خورشیدی
                </p>
                
                {/* Logout Button */}
                <div className="mt-4">
                  <button
                    onClick={handleLogout}
                    className="glass rounded-full px-4 py-2 hover-lift transition-all duration-300 group flex items-center gap-2 text-white/80 hover:text-white mx-auto"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
              </div>
            </div>
          </header>

      {/* Navigation Tabs */}
      <div className="relative z-20 mb-8">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center">
            <div className="glass rounded-xl p-2 flex space-x-2 space-x-reverse" dir="rtl">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'overview'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                <BarChart3 className="w-4 h-4" />
                نمای کلی
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'news'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                <Newspaper className="w-4 h-4" />
                مدیریت اخبار
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'education'
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
              >
                <GraduationCap className="w-4 h-4" />
                مدیریت آموزش
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-20 container mx-auto px-4 pb-20">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-strong rounded-xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/70">کل اخبار</h3>
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Newspaper className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{totalNews}</div>
                <p className="text-sm text-green-400">{publishedNews} منتشر شده</p>
              </div>

              <div className="glass-strong rounded-xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/70">کل آموزش‌ها</h3>
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-green-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{totalEducation}</div>
                <p className="text-sm text-green-400">{publishedEducation} منتشر شده</p>
              </div>

              <div className="glass-strong rounded-xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/70">محتوای ویژه</h3>
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{featuredNews + featuredEducation}</div>
                <p className="text-sm text-yellow-400">{featuredNews} خبر، {featuredEducation} آموزش</p>
              </div>

              <div className="glass-strong rounded-xl p-6 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-white/70">کل بازدید</h3>
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">12,543</div>
                <p className="text-sm text-purple-400">+15.2% از ماه گذشته</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-strong rounded-xl p-6">
                <h2 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-yellow-400" />
                  آخرین اخبار
                </h2>
                <div className="space-y-4">
                  {newsItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/30 transition-all duration-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-white/90 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/60">
                          {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.published && (
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Eye className="w-3 h-3 text-green-400" />
                          </div>
                        )}
                        {item.featured && (
                          <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {newsItems.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">📰</div>
                      <p className="text-white/60">هنوز خبری اضافه نشده است</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-strong rounded-xl p-6">
                <h2 className="text-xl font-bold text-white/90 mb-6 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-green-400" />
                  آخرین آموزش‌ها
                </h2>
                <div className="space-y-4">
                  {educationItems.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/30 transition-all duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-3 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-white/90 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-white/60">
                          {new Date(item.createdAt).toLocaleDateString('fa-IR')}
                          {item.duration && ` • ${item.duration}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.published && (
                          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                            <Eye className="w-3 h-3 text-green-400" />
                          </div>
                        )}
                        {item.featured && (
                          <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-yellow-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {educationItems.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">🎓</div>
                      <p className="text-white/60">هنوز آموزشی اضافه نشده است</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="glass-strong rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white/90 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Newspaper className="w-5 h-5 text-white" />
                  </div>
                  مدیریت اخبار
                </h2>
                <button
                  onClick={() => setShowForm({ show: true, type: 'news', item: null })}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover-lift flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  افزودن خبر جدید
                </button>
              </div>
            </div>
            <div className="glass-strong rounded-xl overflow-hidden">
              <ContentList
                type="news"
                items={newsItems}
                onEdit={(item) => setShowForm({ show: true, type: 'news', item })}
                onDelete={(id) => handleDeleteContent('news', id)}
                onTogglePublished={(id, published) => handleTogglePublished('news', id, published)}
                onToggleFeatured={(id, featured) => handleToggleFeatured('news', id, featured)}
              />
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="glass-strong rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white/90 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  مدیریت آموزش‌ها
                </h2>
                <button
                  onClick={() => setShowForm({ show: true, type: 'education', item: null })}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover-lift flex items-center gap-2 shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  افزودن آموزش جدید
                </button>
              </div>
            </div>
            <div className="glass-strong rounded-xl overflow-hidden">
              <ContentList
                type="education"
                items={educationItems}
                onEdit={(item) => setShowForm({ show: true, type: 'education', item })}
                onDelete={(id) => handleDeleteContent('education', id)}
                onTogglePublished={(id, published) => handleTogglePublished('education', id, published)}
                onToggleFeatured={(id, featured) => handleToggleFeatured('education', id, featured)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Content Form Modal */}
      {showForm.show && (
        <ContentForm
          type={showForm.type}
          item={showForm.item}
          onSave={handleSaveContent}
          onCancel={() => setShowForm({ show: false, type: 'news' })}
        />
      )}
          </>
        )}
    </div>
  );
}
