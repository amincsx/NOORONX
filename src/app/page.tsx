"use client";

import BackgroundVideo from "@/components/BackgroundVideo";
import LogoVideo from "@/components/LogoVideo";
import Footer from "@/components/Footer";
import SimpleLanguageSelector from "@/components/SimpleLanguageSelector";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NewsItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';

export default function Home() {
  const pathname = usePathname();

  // Detect current language from URL
  const getCurrentLanguage = () => {
    if (pathname?.startsWith('/en')) {
      return 'en';
    }
    return 'fa'; // Default to Farsi
  };

  const currentLanguage = getCurrentLanguage();

  const solarSentences = [
    "☀️ انرژی خورشید، سرمایه آینده شما",
    "⚡️ صرفه‌جویی در هزینه‌ها با پنل‌های خورشیدی مدرن",
    "🌱 زندگی سبز با انرژی پاک خورشیدی",
    "🔋 تولید برق رایگان از خورشید، همین امروز شروع کنید",
    "🏡 خانه‌ای روشن با پنل‌های خورشیدی هوشمند",
    "🌞 خورشید بی‌پایان، انرژی بی‌پایان",
    "💡 راهکاری پایدار برای کاهش هزینه برق شما",
    "🌍 با انرژی خورشیدی، به آینده‌ای پاک کمک کنید",
    "🚀 تکنولوژی خورشیدی، گامی به سوی استقلال انرژی",
    "✅ پنل‌های خورشیدی؛ انتخابی هوشمند برای شما و محیط زیست"
  ];

  const [currentSentence, setCurrentSentence] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBottomSections, setShowBottomSections] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  // Intersection Observer for animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  const formatDate = (date: Date | string) => {
    const now = new Date();
    const itemDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '۱ روز پیش';
    if (diffDays < 7) return `${diffDays} روز پیش`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} هفته پیش`;
    return `${Math.ceil(diffDays / 30)} ماه پیش`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Load latest news
  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await fetch('/api/news', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          // Get only published news and limit to 3 for homepage
          const publishedNews = data.filter((item: NewsItem) => item.published);
          setNewsItems(publishedNews.slice(0, 3));
        } else {
          // Fallback to local data
          const allNews = dataStore.getNews();
          const publishedNews = allNews.filter(item => item.published);
          setNewsItems(publishedNews.slice(0, 3));
        }
      } catch {
        // Fallback to local data
        const allNews = dataStore.getNews();
        const publishedNews = allNews.filter(item => item.published);
        setNewsItems(publishedNews.slice(0, 3));
      }
    };
    loadNews();
  }, []);

  // Typing effect for current sentence
  useEffect(() => {
    const currentText = solarSentences[currentSentence] || "";
    setDisplayedText("");
    setIsTyping(true);

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < currentText.length) {
        const char = currentText.charAt(index);
        if (char) {
          setDisplayedText(prev => prev + char);
        }
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentSentence]);

  // Main sentence rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % solarSentences.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [solarSentences.length]);

  // Scroll handler for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer setup - Disabled to prevent flickering
  useEffect(() => {
    // Disable intersection observer to prevent flickering
    // Elements will be visible immediately without animations
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      el.classList.add('animate-fade-in-up');
    });

    return () => {
      // Cleanup not needed since observer is disabled
    };
  }, []);

  return (
    <>
      {/* Fixed Logo and Navigation - Outside main container */}
      {/* Logo with same structure as English version */}
      <div className="absolute max-sm:top-4 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 top-4 left-13 z-[9999] animate-on-scroll">
        <LogoVideo />
      </div>

      {/* Navigation - Desktop: Right side, Mobile: Center (like English) */}
      <nav className="absolute top-12 right-8 max-sm:top-24 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 max-sm:right-auto z-[9999] animate-on-scroll" style={{ position: 'absolute', zIndex: 9999 }}>
        <div className="glass rounded-2xl max-sm:p-2 max-sm:px-4 p-2">
          <div className="flex max-sm:gap-3 gap-2">
            <Link href="/design" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">طراحی</span>
            </Link>
            <Link href="/about" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">درباره ما</span>
            </Link>
            <Link href="/education" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">آموزش</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Simple Language Selector - Desktop: Right side, Mobile: Center (like English) */}
      <div className="absolute top-15 right-[270px] z-[999999] animate-on-scroll max-sm:top-36 max-sm:left-1/2 max-sm:right-auto max-sm:transform max-sm:-translate-x-1/2">
        <SimpleLanguageSelector currentLang={currentLanguage} />
      </div>

      <div className="min-h-screen relative">
        <BackgroundVideo />

        {/* Hero Section */}
        <section className="relative z-30 min-h-screen flex items-center justify-center pt-130">
          <div className="container mx-auto px-4 text-center">
            {/* Animated Solar Text */}
            <div className="mb-8 mt-16 max-sm:mt-4 lg:mt-16 xl:mt-16 mt-4k animate-on-scroll">
              <div className="glass rounded-2xl p-2 max-w-md mx-auto">
                <div className="relative overflow-hidden p-2 group hover:scale-105 transition-all duration-500">
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>

                  <p className="relative text-white/80 text-sm sm:text-base lg:text-lg font-medium leading-relaxed tracking-wide min-h-[2em] group-hover:text-white transition-all duration-300 text-gradient" style={{ fontFamily: "'B Nazanin', 'B Titr', 'B Mitra', 'Tahoma', 'Arial', sans-serif" }}>
                    {displayedText || ""}
                    <span className={`inline-block w-1 h-[1.2em] bg-yellow-400 ml-2 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}></span>
                  </p>
                </div>
              </div>
            </div>


          </div>
        </section>



        {/* Features Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-on-scroll">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg">
                چرا انرژی خورشیدی؟
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                راه‌حل‌های نوآورانه برای آینده‌ای پایدار و مقرون به صرفه
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "☀️",
                  title: "صرفه‌جویی در هزینه",
                  description: "کاهش قابل توجه قبض برق ماهانه و بازگشت سرمایه در کمتر از 5 سال"
                },
                {
                  icon: "🌱",
                  title: "محیط زیست پاک",
                  description: "کاهش انتشار کربن و کمک به حفظ محیط زیست برای نسل‌های آینده"
                },
                {
                  icon: "⚡",
                  title: "استقلال انرژی",
                  description: "تولید برق مستقل و عدم وابستگی به شبکه‌های برق شهری"
                }
              ].map((feature, index) => (
                <div key={index} className="animate-on-scroll glass-strong rounded-2xl p-8 text-center hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-6xl mb-6 animate-float">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white/80 mb-4">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* News Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4">
            <div className="glass-strong rounded-3xl p-8 sm:p-12">
              <div className="text-center mb-12 animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/80 mb-6 text-shadow">
                  آخرین{' '}
                  <Link href="/news" className="text-yellow-400 hover:text-yellow-300">
                    اخبار
                  </Link>{' '}
                  و تحولات
                </h2>
                <p className="text-xl text-white/60">
                  از جدیدترین تکنولوژی‌ها و پروژه‌های خورشیدی مطلع شوید
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {newsItems.length > 0 ? newsItems.map((article, index) => (
                  <article key={article.id} className="animate-on-scroll glass rounded-2xl overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.imageUrl || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-yellow-500/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.tags?.[0] || 'خبر'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white/90 mb-3 leading-tight hover:text-yellow-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed mb-4">
                        {truncateText(article.excerpt || article.content, 120)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-white/50 mb-4">
                        <div className="flex items-center gap-4">
                          <span>{formatDate(article.createdAt)}</span>
                          {article.views && article.views > 0 && (
                            <div className="flex items-center gap-1">
                              <span>👁</span>
                              <span>{article.views}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Link href={`/news/${article.id || article._id}`}>
                        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 group-hover:scale-105">
                          مطالعه کامل
                        </button>
                      </Link>
                    </div>
                  </article>
                )) : (
                  // Fallback content when no news is available
                  [1, 2, 3].map((index) => (
                    <article key={index} className="animate-on-scroll glass rounded-2xl overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="relative h-48 overflow-hidden">
                        <div className="w-full h-full bg-gray-700/50 flex items-center justify-center">
                          <span className="text-white/50">در حال بارگذاری...</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="h-6 bg-gray-700/50 rounded mb-3"></div>
                        <div className="h-16 bg-gray-700/30 rounded mb-4"></div>
                        <div className="h-8 bg-gray-700/20 rounded"></div>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>


        {/* Contact CTA Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll glass-strong rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg">
                آماده شروع هستید؟
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
                همین امروز با کارشناسان ما تماس بگیرید و مشاوره رایگان دریافت کنید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-lg px-8 py-4 hover-lift">
                  تماس با ما
                </Link>
                <Link href="/education" className="glass rounded-lg text-lg px-8 py-4 text-white/80 hover:text-white transition-colors duration-300 hover-lift">
                  اطلاعات بیشتر
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Toggle Button for Footer */}
        <div className="relative z-20 py-8 text-center">
          <button
            onClick={() => setShowBottomSections(!showBottomSections)}
            className="glass rounded-full p-4 hover-lift transition-all duration-300 group"
          >
            <div className="flex items-center gap-2 text-white/80 group-hover:text-white">
              <span className="text-lg font-medium">
                {showBottomSections ? 'مخفی کردن فوتر' : 'نمایش فوتر'}
              </span>
              <div className={`w-6 h-6 transition-transform duration-300 ${showBottomSections ? 'rotate-180' : ''}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Footer - Conditionally Rendered */}
        {showBottomSections && <Footer />}
      </div>
    </>
  );
}

