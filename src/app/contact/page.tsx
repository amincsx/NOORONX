"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ResponsiveBackground from "@/components/ResponsiveBackground";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/Card";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const services = [
    { value: 'general', label: 'مشاوره عمومی' },
    { value: 'installation', label: 'نصب پنل خورشیدی' },
    { value: 'maintenance', label: 'نگهداری و تعمیر' },
    { value: 'inspection', label: 'بازرسی فنی' },
    { value: 'consultation', label: 'مشاوره انرژی' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        service: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "آدرس دفتر",
      details: ["تهران، مفتح شمالی، کوچه بخشی موقر، پلاک ۱۶، واحد ۱۰", "Iran, Tehran, North Mofateh, Bakhshi Movaghar St., Number 16"]
    },
    {
      icon: "📞",
      title: "شماره تماس",
      details: ["۰۹۱۲۱۹۴۱۳۴۰", "02188306001"]
    },
    {
      icon: "✉️",
      title: "ایمیل",
      details: ["Nooronxco@gmail.com"]
    },
    {
      icon: "🕒",
      title: "ساعات کاری",
      details: ["شنبه تا چهارشنبه: ۹ صبح تا ۶ عصر", "پنجشنبه: ۹ صبح تا ۱ ظهر"]
    }
  ];

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
      
      {/* Header */}
      <div className="relative z-30 pt-32 sm:pt-20 pb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg animate-fade-in-up">
            تماس با ما
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            آماده پاسخگویی به سوالات شما و ارائه مشاوره رایگان در زمینه انرژی خورشیدی هستیم
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Card variant="glass-strong" className="p-8">
                <CardHeader>
                  <CardTitle>فرم تماس</CardTitle>
                  <CardDescription>
                    اطلاعات خود را وارد کنید تا کارشناسان ما در اسرع وقت با شما تماس بگیرند
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                          نام و نام خانوادگی *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                          placeholder="نام خود را وارد کنید"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                          ایمیل *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                          placeholder="ایمیل خود را وارد کنید"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
                          شماره تماس *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                          placeholder="شماره تماس خود را وارد کنید"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="company" className="block text-white/80 text-sm font-medium mb-2">
                          نام شرکت
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                          placeholder="نام شرکت (اختیاری)"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-white/80 text-sm font-medium mb-2">
                        نوع خدمات مورد نظر
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value} className="bg-gray-800">
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                        پیام شما *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="پیام خود را اینجا بنویسید..."
                      />
                    </div>

                    {/* Submit Status */}
                    {submitStatus === 'success' && (
                      <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                        پیام شما با موفقیت ارسال شد. کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                        خطا در ارسال پیام. لطفاً دوباره تلاش کنید.
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isSubmitting}
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'در حال ارسال...' : 'ارسال پیام'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} variant="glass" className="p-6 hover-lift">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="text-3xl">{info.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-white/80 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-white/60 text-sm leading-relaxed">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Map Placeholder */}
              <Card variant="glass" className="mt-8 p-6">
                <h3 className="text-xl font-semibold text-white/80 mb-4">موقعیت ما روی نقشه</h3>
                <div className="bg-white/10 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-white/60">نقشه تعاملی</p>
                    <p className="text-white/40 text-sm">تهران، خیابان ولیعصر</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
