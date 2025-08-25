"use client";

import SunScrollVideo from '@/components/SunScrollVideo';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import Link from 'next/link';

export default function DesignPage() {
  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />
      
      {/* SunScroll Video Logo */}
      <SunScrollVideo />
      
      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
          {/* Sliding background animation - only comes in */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>
      
      {/* Main Content - Centered and Bigger */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <h1 className="text-8xl sm:text-9xl lg:text-[12rem] font-bold text-white text-shadow-lg mb-4">
            طراحی
          </h1>
          <p className="text-3xl sm:text-4xl lg:text-5xl text-white text-shadow">
            راه‌حل‌های نوآورانه خورشیدی
          </p>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              خدمات طراحی
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی مسکونی
                </h3>
                <p className="text-white/60 text-sm text-right">
                  طراحی و نصب سیستم‌های خورشیدی برای خانه‌ها و آپارتمان‌ها با بهترین کیفیت و قیمت
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی تجاری
                </h3>
                <p className="text-white/60 text-sm text-right">
                  راه‌حل‌های خورشیدی برای کسب‌وکارها، ادارات و مراکز تجاری
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏭</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی صنعتی
                </h3>
                <p className="text-white/60 text-sm text-right">
                  سیستم‌های خورشیدی مقیاس بزرگ برای کارخانه‌ها و مراکز صنعتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Process Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              فرآیند طراحی
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-4">۱</div>
                    <h3 className="text-lg font-bold text-white/60">مشاوره و بررسی</h3>
                  </div>
                  <p className="text-white/60 text-sm text-right">
                    بررسی نیازهای شما و ارائه مشاوره تخصصی برای انتخاب بهترین راه‌حل
                  </p>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-4">۲</div>
                    <h3 className="text-lg font-bold text-white/60">طراحی اولیه</h3>
                  </div>
                  <p className="text-white/60 text-sm text-right">
                    طراحی اولیه سیستم با در نظر گرفتن شرایط محیطی و نیازهای شما
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-4">۳</div>
                    <h3 className="text-lg font-bold text-white/60">بهینه‌سازی</h3>
                  </div>
                  <p className="text-white/60 text-sm text-right">
                    بهینه‌سازی طراحی برای حداکثر راندمان و کمترین هزینه
                  </p>
                </div>
                
                <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold mr-4">۴</div>
                    <h3 className="text-lg font-bold text-white/60">اجرا و نصب</h3>
                  </div>
                  <p className="text-white/60 text-sm text-right">
                    اجرای پروژه با تیم متخصص و نصب سیستم با بالاترین استانداردها
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
