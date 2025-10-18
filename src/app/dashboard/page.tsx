"use client";

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import ContentForm from '@/components/ContentForm';
import ContentList from '@/components/ContentList';
import ResponsiveBackground from "@/components/ResponsiveBackground";
import { dataStore } from '@/lib/dataStore';
import { NewsItem, EducationItem, ProductItem, DesignConsultationItem, AdminFormData } from '@/types/admin';
import { BarChart3, Plus, Newspaper, GraduationCap, Package, Eye, Star, ArrowLeft, LogIn, LogOut, MessageSquare } from 'lucide-react';
import Link from 'next/link';

// Helper function for authenticated API calls
const authenticatedFetch = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};

// Product Form Component
const ProductForm = ({
  item,
  onSave,
  onCancel
}: {
  item?: ProductItem | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = React.useState({
    name: item?.name || '',
    nameEn: item?.nameEn || '',
    description: item?.description || '',
    descriptionEn: item?.descriptionEn || '',
    price: item?.price || 0,
    category: item?.category || '',
    categoryEn: item?.categoryEn || '',
    imageUrl: item?.imageUrl || '',
    stock: item?.stock || 0,
    published: item?.published ?? true,
    featured: item?.featured ?? false,
    tags: item?.tags || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'tags') {
      // Handle tags separately in the input field itself
      return;
    }
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-strong rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {item ? 'ویرایش محصول' : 'افزودن محصول جدید'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">نام محصول</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Product Name (English)</label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">توضیحات محصول</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">Product Description (English)</label>
            <textarea
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">قیمت ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">موجودی</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">دسته‌بندی</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">Category (English)</label>
              <input
                type="text"
                name="categoryEn"
                value={formData.categoryEn}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">لینک تصویر</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">برچسب‌ها (با کاما جدا کنید)</label>
            <input
              type="text"
              name="tags"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
              onChange={(e) => {
                const tagsArray = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                setFormData(prev => ({ ...prev, tags: tagsArray }));
              }}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400"
              placeholder="مثال: خورشیدی, سولار, انرژی"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-white/70 cursor-pointer">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-400 bg-black/30 border-white/20 rounded focus:ring-yellow-400"
              />
              منتشر شده
            </label>
            <label className="flex items-center gap-2 text-white/70 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-yellow-400 bg-black/30 border-white/20 rounded focus:ring-yellow-400"
              />
              محصول ویژه
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
            >
              {item ? 'بروزرسانی محصول' : 'افزودن محصول'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-600/50 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-600/70 transition-all duration-300"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [apiError, setApiError] = useState('');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);
  const [consultationItems, setConsultationItems] = useState<DesignConsultationItem[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'education' | 'products' | 'consultations'>('overview');
  const [showForm, setShowForm] = useState<{
    show: boolean;
    type: 'news' | 'education' | 'products';
    item?: NewsItem | EducationItem | ProductItem | null;
  }>({ show: false, type: 'news' });
  const [showConsultationDetails, setShowConsultationDetails] = useState<{ show: boolean; consultation?: DesignConsultationItem }>({
    show: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        }),
        credentials: 'include'
      });

      if (response.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem('adminAuthenticated', 'true');
      } else {
        setLoginError('نام کاربری یا رمز عبور اشتباه است');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('خطا در ورود به سیستم');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      sessionStorage.removeItem('adminAuthenticated');
      setLoginForm({ username: '', password: '' });
    }
  };

  const testDatabaseConnection = async () => {
    try {
      setApiError('در حال تست اتصال به دیتابیس...');
      const res = await fetch('/api/test');
      const data = await res.json();
      if (data.status === 'success') {
        setApiError(`✅ اتصال موفق: ${data.timestamp}`);
      } else {
        setApiError(`❌ خطای اتصال: ${data.message} - ${data.error}`);
      }
    } catch (error) {
      setApiError(`❌ خطا در تست: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
    }
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
        const res = await authenticatedFetch('/api/news?all=1', {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          setNewsItems(data);
          setApiError('');
        } else {
          // Fallback to local for dev if API fails
          setNewsItems(dataStore.getNews());
          setApiError('بانک اطلاعات متصل نیست - استفاده از داده‌های آزمایشی');
        }
      } catch {
        setNewsItems(dataStore.getNews());
        setApiError('بانک اطلاعات متصل نیست - استفاده از داده‌های آزمایشی');
      }
    };
    loadNews();
    const loadEducation = async () => {
      try {
        const res = await authenticatedFetch('/api/education?all=1', {
          cache: 'no-store'
        });
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

    const loadProducts = async () => {
      try {
        const res = await authenticatedFetch('/api/products?all=1', {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          setProductItems(data);
        } else {
          setProductItems(dataStore.getProducts());
        }
      } catch {
        setProductItems(dataStore.getProducts());
      }
    };

    const loadConsultations = async () => {
      try {
        const res = await authenticatedFetch('/api/consultations', {
          cache: 'no-store'
        });
        if (res.ok) {
          const data = await res.json();
          console.log('Loaded consultations:', data);
          setConsultationItems(data);
        } else {
          console.error('Failed to load consultations:', res.status, res.statusText);
          setConsultationItems([]);
        }
      } catch (error) {
        console.error('Error loading consultations:', error);
        setConsultationItems([]);
      }
    };

    loadProducts();
    loadConsultations();
  }, [isAuthenticated]);

  // Calculate total views whenever news or education items change
  useEffect(() => {
    const calculateTotalViews = () => {
      const newsViews = newsItems.reduce((total, item) => total + (item.views || 0), 0);
      const educationViews = educationItems.reduce((total, item) => total + (item.views || 0), 0);
      setTotalViews(newsViews + educationViews);
    };

    if (newsItems.length > 0 || educationItems.length > 0) {
      calculateTotalViews();
    }
  }, [newsItems, educationItems]);

  const handleSaveContent = async (formData: AdminFormData) => {
    if (showForm.type === 'news') {
      if (showForm.item) {
        // Update existing news
        try {
          const res = await authenticatedFetch(`/api/news/${(showForm.item as NewsItem).id || (showForm.item as NewsItem)._id}`, {
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
            setNewsItems(prev => prev.map(n => (n.id === updated._id || n._id === updated._id ? { ...updated, id: updated._id || updated.id } : n)));
            setApiError('');
          } else {
            const errorData = await res.text();
            setApiError(`خطا در بروزرسانی خبر: ${res.status} - ${errorData}`);
          }
        } catch (error) {
          setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
        }
      } else {
        // Add new news
        try {
          const res = await authenticatedFetch('/api/news', {
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
            setApiError('');
          } else {
            const errorData = await res.text();
            setApiError(`خطا در ایجاد خبر: ${res.status} - ${errorData}`);
          }
        } catch (error) {
          setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
        }
      }
    } else {
      if (showForm.item) {
        // Update existing education
        try {
          const res = await authenticatedFetch(`/api/education/${(showForm.item as EducationItem).id || (showForm.item as any)._id}`, {
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
          const res = await authenticatedFetch('/api/education', {
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

  const handleSaveProduct = async (productData: {
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    price: number;
    category: string;
    imageUrl?: string;
    published: boolean;
    featured: boolean;
  }) => {
    const product = showForm.item as ProductItem;
    if (product) {
      // Update existing product
      try {
        const res = await authenticatedFetch(`/api/products/${product.id || product._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (res.ok) {
          const updated = await res.json();
          setProductItems(prev => prev.map(p => (p.id === updated._id || p._id === updated._id ? { ...updated, id: updated._id || updated.id } : p)));
          setApiError('');
        } else {
          const errorData = await res.text();
          setApiError(`خطا در بروزرسانی محصول: ${res.status} - ${errorData}`);
        }
      } catch (error) {
        setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      }
    } else {
      // Add new product
      try {
        const res = await authenticatedFetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        });
        if (res.ok) {
          const created = await res.json();
          setProductItems(prev => [{ ...(created as any), id: (created as any)._id }, ...prev]);
          setApiError('');
        } else {
          const errorData = await res.text();
          setApiError(`خطا در ایجاد محصول: ${res.status} - ${errorData}`);
        }
      } catch (error) {
        setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      }
    }
    setShowForm({ show: false, type: 'news' });
  };

  const handleDeleteContent = async (type: 'news' | 'education' | 'products', id: string) => {
    if (type === 'news') {
      try {
        const res = await authenticatedFetch(`/api/news/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setNewsItems(prev => prev.filter(n => n.id !== id && (n as any)._id !== id));
          setApiError('');
        } else {
          const errorData = await res.text();
          setApiError(`خطا در حذف خبر: ${res.status} - ${errorData}`);
        }
      } catch (error) {
        setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      }
    } else if (type === 'education') {
      try {
        const res = await authenticatedFetch(`/api/education/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setEducationItems(prev => prev.filter(e => e.id !== id && (e as any)._id !== id));
          setApiError('');
        } else {
          const errorData = await res.text();
          setApiError(`خطا در حذف آموزش: ${res.status} - ${errorData}`);
        }
      } catch (error) {
        setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      }
    } else if (type === 'products') {
      try {
        const res = await authenticatedFetch(`/api/products/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setProductItems(prev => prev.filter(p => p.id !== id && (p as any)._id !== id));
          setApiError('');
        } else {
          const errorData = await res.text();
          setApiError(`خطا در حذف محصول: ${res.status} - ${errorData}`);
        }
      } catch (error) {
        setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      }
    }
  };

  const handleDeleteConsultation = async (id: string) => {
    try {
      const res = await authenticatedFetch(`/api/consultations/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setConsultationItems(prev => prev.filter(c => c.id !== id && (c as any)._id !== id));
        setApiError('');
      } else {
        const errorData = await res.text();
        setApiError(`خطا در حذف درخواست مشاوره: ${res.status} - ${errorData}`);
      }
    } catch (error) {
      setApiError(`خطا در ارتباط با سرور: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
    }
  };

  const handleTogglePublished = async (type: 'news' | 'education', id: string, published: boolean) => {
    if (type === 'news') {
      try {
        const item = newsItems.find(n => n.id === id || (n as any)._id === id);
        if (!item) return;
        const res = await authenticatedFetch(`/api/news/${id}`, {
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
        const res = await authenticatedFetch(`/api/education/${id}`, {
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
        const res = await authenticatedFetch(`/api/news/${id}`, {
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
        const res = await authenticatedFetch(`/api/education/${id}`, {
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

  const totalProducts = productItems.length;
  const publishedProducts = productItems.filter(item => item.published).length;
  const featuredProducts = productItems.filter(item => item.featured).length;

  const totalConsultations = consultationItems.length;
  const pendingConsultations = consultationItems.filter(item => item.status === 'pending').length;
  const inProgressConsultations = consultationItems.filter(item => item.status === 'in-progress').length;

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

                {/* Logout Button and Test Button */}
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={testDatabaseConnection}
                    className="glass rounded-full px-4 py-2 hover-lift transition-all duration-300 group flex items-center gap-2 text-white/80 hover:text-white"
                  >
                    <BarChart3 className="w-4 h-4" />
                    تست دیتابیس
                  </button>
                  <button
                    onClick={handleLogout}
                    className="glass rounded-full px-4 py-2 hover-lift transition-all duration-300 group flex items-center gap-2 text-white/80 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                    خروج
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* API Status Notification */}
          {apiError && (
            <div className="relative z-20 mx-4 mb-6">
              <div className="max-w-4xl mx-auto">
                <div className="glass rounded-lg p-4 border border-yellow-500/30 bg-yellow-500/10">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-200 text-sm">{apiError}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                    مطالب آموزشی
                  </button>
                  <button
                    onClick={() => setActiveTab('products')}
                    className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'products'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <Package className="w-4 h-4" />
                    مدیریت محصولات
                  </button>
                  <button
                    onClick={() => setActiveTab('consultations')}
                    className={`py-3 px-6 rounded-lg font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'consultations'
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <MessageSquare className="w-4 h-4" />
                    درخواست‌های مشاوره
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
                      <h3 className="text-sm font-medium text-white/70">کل محصولات</h3>
                      <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-orange-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{totalProducts}</div>
                    <p className="text-sm text-green-400">{publishedProducts} منتشر شده</p>
                  </div>

                  <div className="glass-strong rounded-xl p-6 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-white/70">درخواست‌های مشاوره</h3>
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{totalConsultations}</div>
                    <p className="text-sm text-purple-400">{pendingConsultations} در انتظار، {inProgressConsultations} در حال بررسی</p>
                  </div>

                  <div className="glass-strong rounded-xl p-6 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-white/70">محتوای ویژه</h3>
                      <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{featuredNews + featuredEducation + featuredProducts}</div>
                    <p className="text-sm text-yellow-400">{featuredNews} خبر، {featuredEducation} آموزش، {featuredProducts} محصول</p>
                  </div>

                  <div className="glass-strong rounded-xl p-6 hover-lift">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-white/70">کل بازدید</h3>
                      <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{totalViews.toLocaleString('fa-IR')}</div>
                    <p className="text-sm text-purple-400">مجموع بازدید همه محتواها</p>
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
                              {item.category && ` • ${item.category}`}
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
                      افزودن مطلب آموزشی
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

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="glass-strong rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white/90 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      مدیریت محصولات
                    </h2>
                    <button
                      onClick={() => setShowForm({ show: true, type: 'products', item: null })}
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover-lift flex items-center gap-2 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      افزودن محصول جدید
                    </button>
                  </div>
                </div>
                <div className="glass-strong rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productItems.map((product) => (
                        <div key={product.id || product._id} className="glass rounded-lg p-4 hover-lift">
                          <div className="relative mb-4">
                            <img
                              src={product.imageUrl || "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=300&h=200&fit=crop"}
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              {product.published && (
                                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                                  <Eye className="w-3 h-3 text-green-400" />
                                </div>
                              )}
                              {product.featured && (
                                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                </div>
                              )}
                            </div>
                          </div>
                          <h3 className="text-white font-semibold mb-2">{product.name}</h3>
                          <p className="text-white/70 text-sm mb-2 line-clamp-2">{product.description}</p>
                          <p className="text-yellow-400 font-bold mb-4">${product.price}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setShowForm({ show: true, type: 'products', item: product })}
                              className="flex-1 bg-blue-500/20 text-blue-300 py-2 px-3 rounded text-sm hover:bg-blue-500/30 transition-colors"
                            >
                              ویرایش
                            </button>
                            <button
                              onClick={() => handleDeleteContent('products', product.id || product._id!)}
                              className="flex-1 bg-red-500/20 text-red-300 py-2 px-3 rounded text-sm hover:bg-red-500/30 transition-colors"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))}
                      {productItems.length === 0 && (
                        <div className="col-span-full text-center py-12">
                          <div className="text-4xl mb-4">📦</div>
                          <p className="text-white/60">هنوز محصولی اضافه نشده است</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'consultations' && (
              <div className="space-y-6">
                <div className="glass-strong rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white/90 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      درخواست‌های مشاوره طراحی
                    </h2>
                    <div className="flex gap-2">
                      <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {totalConsultations} درخواست
                      </span>
                    </div>
                  </div>
                </div>
                <div className="glass-strong rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-4">
                      {consultationItems.map((consultation) => (
                        <div key={consultation.id || consultation._id} className="glass rounded-lg p-6 hover-lift">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div>
                              <h3 className="text-lg font-bold text-white mb-2">{consultation.fullName}</h3>
                              <p className="text-white/60 text-sm mb-2">{consultation.phone}</p>
                              <p className="text-white/60 text-sm mb-2">{consultation.email}</p>
                              <p className="text-white/60 text-sm">{consultation.address}</p>
                            </div>
                            <div>
                              <p className="text-white/80 mb-2"><strong>نوع ساختمان:</strong> {consultation.buildingType}</p>
                              <p className="text-white/80 mb-2"><strong>مساحت:</strong> {consultation.area}</p>
                              <p className="text-white/80 mb-2"><strong>مصرف ماهانه:</strong> {consultation.monthlyConsumption}</p>
                              <p className="text-white/80 mb-2"><strong>بودجه:</strong> {consultation.budget}</p>
                            </div>
                            <div className="flex flex-col justify-between">
                              <div>
                                <p className="text-white/40 text-xs">
                                  {new Date(consultation.createdAt).toLocaleDateString('fa-IR')}
                                </p>
                              </div>
                              <div className="flex gap-2 mt-4">
                                <button
                                  onClick={() => setShowConsultationDetails({ show: true, consultation })}
                                  className="flex-1 bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-2 rounded-lg text-sm transition-all duration-300"
                                >
                                  مشاهده جزئیات
                                </button>
                                <button
                                  onClick={() => {
                                    const consultationId = consultation.id || consultation._id;
                                    if (consultationId) {
                                      handleDeleteConsultation(consultationId);
                                    }
                                  }}
                                  className="bg-red-500/20 text-red-300 hover:bg-red-500/30 px-3 py-2 rounded-lg text-sm transition-all duration-300"
                                >
                                  حذف
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {consultationItems.length === 0 && (
                        <div className="text-center py-12">
                          <div className="text-4xl mb-4">💬</div>
                          <p className="text-white/60">هنوز درخواست مشاوره‌ای ثبت نشده است</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Content Form Modal */}
          {showForm.show && showForm.type !== 'products' && (
            <ContentForm
              type={showForm.type as 'news' | 'education'}
              item={showForm.item as NewsItem | EducationItem | null | undefined}
              onSave={handleSaveContent}
              onCancel={() => setShowForm({ show: false, type: 'news' })}
            />
          )}

          {/* Product Form Modal */}
          {showForm.show && showForm.type === 'products' && (
            <ProductForm
              item={showForm.item as ProductItem | null | undefined}
              onSave={handleSaveProduct}
              onCancel={() => setShowForm({ show: false, type: 'news' })}
            />
          )}

          {/* Consultation Details Modal */}
          {showConsultationDetails.show && showConsultationDetails.consultation && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                        <span className="text-white text-lg">☀️</span>
                      </div>
                      جزئیات درخواست مشاوره
                    </h2>
                    <button
                      onClick={() => setShowConsultationDetails({ show: false })}
                      className="p-2 rounded-lg bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-300"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-400 text-sm">👤</span>
                        </div>
                        اطلاعات تماس
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-white/60 text-sm">نام کامل</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.fullName}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">شماره تماس</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.phone}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">ایمیل</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.email}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">روش تماس ترجیحی</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.contactPreference === 'phone' ? 'تماس تلفنی' :
                              showConsultationDetails.consultation.contactPreference === 'email' ? 'ایمیل' :
                                showConsultationDetails.consultation.contactPreference === 'whatsapp' ? 'واتساپ' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">آدرس</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Property Information */}
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-orange-400 text-sm">🏢</span>
                        </div>
                        مشخصات ملک
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-white/60 text-sm">نوع ساختمان</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.buildingType === 'house' ? 'خانه' :
                              showConsultationDetails.consultation.buildingType === 'apartment' ? 'آپارتمان' :
                                showConsultationDetails.consultation.buildingType === 'commercial' ? 'تجاری' :
                                  showConsultationDetails.consultation.buildingType === 'industrial' ? 'صنعتی' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">وضعیت مالکیت</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.ownership === 'owner' ? 'مالک' :
                              showConsultationDetails.consultation.ownership === 'tenant' ? 'مستاجر' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">نوع نصب</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.installationType === 'roof' ? 'پشت بام' :
                              showConsultationDetails.consultation.installationType === 'ground' ? 'روی زمین' :
                                showConsultationDetails.consultation.installationType === 'facade' ? 'نما' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">مساحت (متر مربع)</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.area}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">جهت سقف</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.roofDirection === 'south' ? 'جنوب' :
                              showConsultationDetails.consultation.roofDirection === 'north' ? 'شمال' :
                                showConsultationDetails.consultation.roofDirection === 'east' ? 'شرق' :
                                  showConsultationDetails.consultation.roofDirection === 'west' ? 'غرب' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">زاویه سقف (درجه)</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.roofAngle}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">مواد سقف</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.roofMaterial}</p>
                        </div>
                        {showConsultationDetails.consultation.obstacles && (
                          <div>
                            <label className="text-white/60 text-sm">موانع</label>
                            <p className="text-white font-medium">{showConsultationDetails.consultation.obstacles}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Energy Information */}
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-yellow-400 text-sm">⚡</span>
                        </div>
                        اطلاعات مصرف انرژی
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-white/60 text-sm">مصرف ماهانه (کیلووات ساعت)</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.monthlyConsumption}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">دسته مصرف</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.consumptionCategory === 'low' ? 'کم' :
                              showConsultationDetails.consultation.consumptionCategory === 'medium' ? 'متوسط' :
                                showConsultationDetails.consultation.consumptionCategory === 'high' ? 'زیاد' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">هدف از نصب سولار</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.solarGoal === 'cost' ? 'کاهش هزینه' :
                              showConsultationDetails.consultation.solarGoal === 'environment' ? 'محیط زیست' :
                                showConsultationDetails.consultation.solarGoal === 'independence' ? 'استقلال انرژی' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">تعداد ساکنین</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.residents}</p>
                        </div>
                        {showConsultationDetails.consultation.highConsumptionDevices && showConsultationDetails.consultation.highConsumptionDevices.length > 0 && (
                          <div>
                            <label className="text-white/60 text-sm">دستگاه‌های پرمصرف</label>
                            <p className="text-white font-medium">{showConsultationDetails.consultation.highConsumptionDevices.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Financial & Technical Information */}
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-orange-400 text-sm">💰</span>
                        </div>
                        اطلاعات مالی و فنی
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="text-white/60 text-sm">بودجه (میلیون تومان)</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.budget}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">دسته بودجه</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.budgetCategory}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">تأمین مالی</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.financing === 'cash' ? 'نقدی' :
                              showConsultationDetails.consultation.financing === 'installment' ? 'اقساطی' :
                                showConsultationDetails.consultation.financing === 'loan' ? 'وام' :
                                  showConsultationDetails.consultation.financing === 'no' ? 'ندارم' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">مدت بازگشت سرمایه</label>
                          <p className="text-white font-medium">
                            {showConsultationDetails.consultation.paybackPeriod === 'under3' ? 'کمتر از 3 سال' :
                              showConsultationDetails.consultation.paybackPeriod === '3-5' ? '3 تا 5 سال' :
                                showConsultationDetails.consultation.paybackPeriod === '5-7' ? '5 تا 7 سال' :
                                  showConsultationDetails.consultation.paybackPeriod === 'over7' ? 'بیش از 7 سال' : 'نامشخص'}
                          </p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">اتصال به شبکه</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.gridConnection || 'نامشخص'}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">ذخیره باتری</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.batteryStorage || 'نامشخص'}</p>
                        </div>
                        <div>
                          <label className="text-white/60 text-sm">نوع سیستم</label>
                          <p className="text-white font-medium">{showConsultationDetails.consultation.systemType || 'نامشخص'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="mt-6 glass rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-yellow-400 text-sm">📋</span>
                      </div>
                      وضعیت و عملیات
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-white/60 text-sm">وضعیت</label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${showConsultationDetails.consultation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            showConsultationDetails.consultation.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                              showConsultationDetails.consultation.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                'bg-red-500/20 text-red-300'
                            }`}>
                            {showConsultationDetails.consultation.status === 'pending' ? 'در انتظار' :
                              showConsultationDetails.consultation.status === 'in-progress' ? 'در حال بررسی' :
                                showConsultationDetails.consultation.status === 'completed' ? 'تکمیل شده' : 'لغو شده'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm">اولویت</label>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${showConsultationDetails.consultation.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                            showConsultationDetails.consultation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                            {showConsultationDetails.consultation.priority === 'high' ? 'اولویت بالا' :
                              showConsultationDetails.consultation.priority === 'medium' ? 'اولویت متوسط' : 'اولویت پایین'}
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm">تاریخ ثبت</label>
                        <p className="text-white font-medium mt-1">
                          {new Date(showConsultationDetails.consultation.createdAt).toLocaleDateString('fa-IR')}
                        </p>
                      </div>
                    </div>
                    {showConsultationDetails.consultation.notes && (
                      <div className="mt-4">
                        <label className="text-white/60 text-sm">یادداشت‌ها</label>
                        <p className="text-white font-medium mt-1">{showConsultationDetails.consultation.notes}</p>
                      </div>
                    )}
                    {showConsultationDetails.consultation.assignedTo && (
                      <div className="mt-4">
                        <label className="text-white/60 text-sm">تخصیص یافته به</label>
                        <p className="text-white font-medium mt-1">{showConsultationDetails.consultation.assignedTo}</p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => setShowConsultationDetails({ show: false })}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-medium shadow-lg"
                    >
                      بستن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
