"use client";

import Link from 'next/link';
import Image from 'next/image';

import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function AboutPage() {
  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* SunScroll Video Logo */}


      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-[9999] gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full">
          {/* Sliding background animation - only comes in */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>



      {/* Company Story Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              داستان شرکت نوران
            </h2>

            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-right">
                  تأسیس و اهداف
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-right">
                  شرکت نوران در سال ۱۴۰۴ با هدف ارتقاء سطح آگاهی جامعه و ارائه راه‌حل‌های جامع در زمینه انرژی‌های تجدیدپذیر تأسیس شد. این شرکت به‌طور تخصصی در حوزه‌های مختلف انرژی‌های پاک و پایدار از جمله انرژی‌های خورشیدی، بادی، آبی، هیدروژنی، ژئوترمال، زیست‌توده و کربن‌زدایی فعالیت می‌کند و در تلاش است تا به توسعه پایدار و کاهش اثرات منفی تغییرات اقلیمی کمک نماید.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-right">
                  ماموریت ما
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-right">
                  هدف ما در شرکت نوران، فراهم کردن راهکارهای نوین و ساده برای تسهیل انتقال از انرژی‌های فسیلی به انرژی‌های تجدیدپذیر است. ما در تلاشیم تا فرآیند انتقال به منابع انرژی پاک را برای تمامی افراد، شرکت‌ها و صنایع به راحتی قابل دسترس و عملی کنیم. با استفاده از فناوری‌های پیشرفته و مشاوره‌های تخصصی، ما به مشتریان کمک می‌کنیم تا به راحتی و با کمترین هزینه و پیچیدگی، انرژی‌های تجدیدپذیر را به عنوان جایگزینی پایدار و مؤثر برای منابع انرژی فسیلی استفاده کنند.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-right">
                  چشم‌انداز و خدمات
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-right">
                  ما به‌دنبال ارائه راه‌حل‌هایی هستیم که نه تنها برای محیط زیست مفید باشد، بلکه از لحاظ اقتصادی نیز به‌صرفه باشد و بتواند به‌راحتی در مقیاس‌های کوچک و بزرگ پیاده‌سازی گردد. در این مسیر، شرکت نوران در کنار ارائه خدمات مشاوره‌ای، آموزشی، نصب و پشتیبانی، به‌طور مداوم در حال تحقیق و توسعه فناوری‌های نوین در زمینه انرژی‌های تجدیدپذیر است تا تغییرات بزرگ و مؤثری در صنعت انرژی ایجاد کند.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              تیم ما
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-64 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-start justify-center overflow-hidden">
                  <Image
                    src="/mohammad reza.jpeg"
                    alt="Mohammad Reza - Founder of Nouran Company - Renewable Energy Expert"
                    width={100}
                    height={100}
                    className="w-50 h-64 object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2 text-right">
                  محمدرضا ضیایان
                </h3>
                <p className="text-white/60 text-sm text-right mb-3">بنیان‌گذار شرکت نوران</p>
                <p className="text-white/60 text-xs text-right">
                  متخصص در زمینه انرژی‌های تجدیدپذیر و توسعه پایدار
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-64 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-4 flex items-start justify-center overflow-hidden">
                  <Image
                    src="/amin azizi.jpg"
                    alt="Mohammad Amin Azizi - IT Manager and Developer at Nouran Company"
                    width={100}
                    height={100}
                    className="w-50 h-64 object-cover"
                    priority
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2 text-right">
                  محمدامین عزیزی
                </h3>
                <p className="text-white/60 text-sm text-right mb-3">مدیر فناوری اطلاعات و برنامه‌نویس</p>
                <p className="text-white/60 text-xs text-right">
                  متخصص در توسعه نرم‌افزار و سیستم‌های دیجیتال
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
