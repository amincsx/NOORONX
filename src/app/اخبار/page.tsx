"use client";


import ResponsiveBackground from '@/components/ResponsiveBackground';
import Link from 'next/link';

export default function NewsPage() {
  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />
      
      {/* SunScroll Video Logo */}

      
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
            اخبار
          </h1>
          <p className="text-3xl sm:text-4xl lg:text-5xl text-white text-shadow">
            آخرین اخبار و رویدادها
          </p>
        </div>
      </div>
      
      {/* News Grid */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              آخرین اخبار
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* News Article 1 */}
              <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400&h=300&fit=crop" 
                    alt="Solar Panel Installation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  نصب پنل‌های خورشیدی در ۱۰۰۰ خانه جدید
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed text-right mb-4">
                  پروژه جدید نصب پنل‌های خورشیدی در مناطق مختلف کشور آغاز شده و تا پایان سال بیش از ۱۰۰۰ خانه مجهز به انرژی خورشیدی خواهند شد...
                </p>
                <div className="flex justify-end items-center text-xs text-white/60">
                  <span>انرژی خورشیدی</span>
                </div>
              </div>

              {/* News Article 2 */}
              <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-700/50 to-gray-900/50 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop" 
                    alt="Solar Farm" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  افتتاح بزرگترین مزرعه خورشیدی کشور
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed text-right mb-4">
                  بزرگترین مزرعه خورشیدی کشور با ظرفیت تولید ۵۰ مگاوات برق در استان یزد افتتاح شد. این پروژه می‌تواند برق ۲۰ هزار خانه را تامین کند...
                </p>
                <div className="flex justify-end items-center text-xs text-white/60">
                  <span>مزرعه خورشیدی</span>
                </div>
              </div>

              {/* News Article 3 */}
              <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-stone-700/50 to-stone-900/50 rounded-xl mb-4 overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?w=400&h=300&fit=crop" 
                    alt="Solar Technology Innovation" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  فناوری جدید پنل‌های خورشیدی با راندمان ۳۰٪
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed text-right mb-4">
                  محققان ایرانی موفق به توسعه پنل‌های خورشیدی جدیدی شدند که راندمان تبدیل انرژی را تا ۳۰٪ افزایش می‌دهد...
                </p>
                <div className="flex justify-end items-center text-xs text-white/60">
                  <span>فناوری خورشیدی</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
