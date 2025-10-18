"use client";

import BackgroundVideo from "@/components/BackgroundVideo";
import Footer from "@/components/Footer";
import SimpleLanguageSelector from "@/components/SimpleLanguageSelector";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NewsItem, EducationItem, ProductItem } from '@/types/admin';
import { dataStore } from '@/lib/dataStore';
import { toEnglishDigits } from '@/lib/utils';

export default function EnglishHomePage() {
  const solarSentences = [
    "☀️ Solar energy, your future investment",
    "⚡ Save costs with modern solar panels",
    "🌱 Green living with clean solar energy",
    "🔋 Generate free electricity from the sun, start today",
    "🏡 A bright home with smart solar panels",
    "🌞 Endless sun, endless energy",
    "💡 A sustainable solution to reduce your electricity costs",
    "🌍 Help create a clean future with solar energy",
    "🚀 Solar technology, a step towards energy independence",
    "✅ Solar panels; a smart choice for you and the environment"
  ];

  const [currentSentence, setCurrentSentence] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showBottomSections, setShowBottomSections] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [educationItems, setEducationItems] = useState<EducationItem[]>([]);
  const [productItems, setProductItems] = useState<ProductItem[]>([]);

  // Intersection Observer for animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  const formatDate = (date: Date | string) => {
    const now = new Date();
    const itemDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return toEnglishDigits(`${diffDays} days ago`);
    if (diffDays < 30) return toEnglishDigits(`${Math.ceil(diffDays / 7)} weeks ago`);
    return toEnglishDigits(`${Math.ceil(diffDays / 30)} months ago`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  useEffect(() => {
    setIsLoaded(true);

    // Aggressive number conversion function
    const convertNumbersToEnglish = () => {
      const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

      // Convert all text nodes
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );

      let node;
      while (node = walker.nextNode()) {
        if (node.textContent && node.parentElement) {
          let text = node.textContent;
          let changed = false;

          for (let i = 0; i < persian.length; i++) {
            if (text.includes(persian[i])) {
              text = text.replace(new RegExp(persian[i], 'g'), i.toString());
              changed = true;
            }
          }

          for (let i = 0; i < arabic.length; i++) {
            if (text.includes(arabic[i])) {
              text = text.replace(new RegExp(arabic[i], 'g'), i.toString());
              changed = true;
            }
          }

          if (changed) {
            node.textContent = text;
          }
        }
      }

      // Also convert innerHTML of all elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(element => {
        if (element.innerHTML) {
          let html = element.innerHTML;
          let changed = false;

          for (let i = 0; i < persian.length; i++) {
            if (html.includes(persian[i])) {
              html = html.replace(new RegExp(persian[i], 'g'), i.toString());
              changed = true;
            }
          }

          for (let i = 0; i < arabic.length; i++) {
            if (html.includes(arabic[i])) {
              html = html.replace(new RegExp(arabic[i], 'g'), i.toString());
              changed = true;
            }
          }

          if (changed) {
            element.innerHTML = html;
          }
        }
      });
    };

    // Run conversion multiple times with different delays
    setTimeout(convertNumbersToEnglish, 100);
    setTimeout(convertNumbersToEnglish, 500);
    setTimeout(convertNumbersToEnglish, 1000);
    setTimeout(convertNumbersToEnglish, 2000);

    // Set up MutationObserver to catch dynamic content
    const observer = new MutationObserver(() => {
      setTimeout(convertNumbersToEnglish, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Run conversion every 2 seconds to catch any missed numbers
    const interval = setInterval(convertNumbersToEnglish, 2000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Load latest news, education, and products
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch News
        const newsRes = await fetch('/api/news', { cache: 'no-store' });
        if (newsRes.ok) {
          const newsData = await newsRes.json();
          const publishedNews = newsData.filter((item: NewsItem) => item.published);
          setNewsItems(publishedNews.slice(0, 1));
        } else {
          const allNews = await dataStore.getNews();
          const publishedNews = allNews.filter(item => item.published);
          setNewsItems(publishedNews.slice(0, 1));
        }

        // Fetch Education
        const eduRes = await fetch('/api/education', { cache: 'no-store' });
        if (eduRes.ok) {
          const eduData = await eduRes.json();
          const publishedEducation = eduData.filter((item: EducationItem) => item.published);
          setEducationItems(publishedEducation.slice(0, 1));
        } else {
          const allEducation = await dataStore.getEducation();
          const publishedEducation = allEducation.filter(item => item.published);
          setEducationItems(publishedEducation.slice(0, 1));
        }

        // Fetch Products
        const prodRes = await fetch('/api/products', { cache: 'no-store' });
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          const publishedProducts = prodData.filter((item: ProductItem) => item.published);
          setProductItems(publishedProducts.slice(0, 1));
        } else {
          const allProducts = await dataStore.getProducts();
          const publishedProducts = allProducts.filter(item => item.published);
          setProductItems(publishedProducts.slice(0, 1));
        }
      } catch (error) {
        console.error("Failed to load data, falling back to local store", error);
        // Fallback for all
        const allNews = await dataStore.getNews();
        const publishedNews = allNews.filter(item => item.published);
        setNewsItems(publishedNews.slice(0, 1));

        const allEducation = await dataStore.getEducation();
        const publishedEducation = allEducation.filter(item => item.published);
        setEducationItems(publishedEducation.slice(0, 1));

        const allProducts = await dataStore.getProducts();
        const publishedProducts = allProducts.filter(item => item.published);
        setProductItems(publishedProducts.slice(0, 1));
      }
    };
    loadData();
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

      {/* Navigation moved to left side for English version */}
      <nav className="absolute max-sm:top-8 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 top-8 left-8 z-[9999] animate-on-scroll" style={{ position: 'absolute', zIndex: 9999 }}>
        <div className="glass rounded-2xl max-sm:p-2 max-sm:px-4 p-2">
          <div className="flex max-sm:gap-3 gap-2">
            <Link href="/en/design" className="text-white/70 max-sm:px-2 max-sm:py-1 px-3 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">Design</span>
            </Link>
            <Link href="/en/about" className="text-white/70 max-sm:px-2 max-sm:py-1 px-3 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">About</span>
            </Link>
            <Link href="/en/catalog" className="text-white/70 max-sm:px-2 max-sm:py-1 px-3 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">Products</span>
            </Link>
            <Link href="/en/education" className="text-white/70 max-sm:px-2 max-sm:py-1 px-3 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">Education</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Simple Language Selector - Desktop: Left side, Mobile: Center (like Farsi) */}
      <div className="absolute top-12 left-[370px] z-[999999] animate-on-scroll max-sm:top-20 max-sm:left-1/2 max-sm:right-auto max-sm:transform max-sm:-translate-x-1/2">
        <SimpleLanguageSelector currentLang="en" />
      </div>

      <div className="min-h-screen relative">
        <BackgroundVideo />

        {/* Content Sections */}
        <section className="relative z-10 py-40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* News Section */}
              <div className="glass-strong rounded-3xl p-4 sm:p-6 flex flex-col h-full">
                <div className="text-center mb-6 animate-on-scroll">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/80 mb-3 text-shadow">Latest News</h2>
                </div>
                <div className="space-y-4 flex-grow">
                  {newsItems.length > 0 ? (
                    newsItems.map((article, index) => (
                      <article key={article.id} className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={article.imageUrl || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop"}
                            alt={article.titleEn || article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="inline-block bg-yellow-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                              {article.tags?.[0] || 'News'}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-base font-bold text-white/90 mb-2 leading-tight hover:text-yellow-400 transition-colors">
                            {article.titleEn || article.title}
                          </h3>
                          <p className="text-white/70 text-xs leading-relaxed mb-2">
                            {truncateText(article.excerptEn || article.excerpt || article.contentEn || article.content, 60)}
                          </p>
                          <Link href={`/en/news/${article.id || article._id}`} className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-xs font-medium">
                            Read More
                          </Link>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift">
                      <div className="relative h-32 overflow-hidden"><div className="w-full h-full bg-gray-700/50 flex items-center justify-center"><span className="text-white/50">Loading...</span></div></div>
                      <div className="p-3"><div className="h-4 bg-gray-700/50 rounded mb-2"></div><div className="h-12 bg-gray-700/30 rounded mb-2"></div><div className="h-6 bg-gray-700/20 rounded"></div></div>
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="/en/news"
                    className="inline-block bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-yellow-500/30 transition-colors duration-300"
                  >
                    View All News →
                  </Link>
                </div>
              </div>

              {/* Education Section */}
              <div className="glass-strong rounded-3xl p-4 sm:p-6 flex flex-col h-full">
                <div className="text-center mb-6 animate-on-scroll">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/80 mb-3 text-shadow">Latest Education</h2>
                </div>
                <div className="space-y-4 flex-grow">
                  {educationItems.length > 0 ? (
                    educationItems.map((item, index) => (
                      <article key={item.id} className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={item.imageUrl || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop"}
                            alt={item.titleEn || item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="inline-block bg-blue-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                              {item.category || 'Education'}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-base font-bold text-white/90 mb-2 leading-tight hover:text-blue-400 transition-colors">
                            {item.titleEn || item.title}
                          </h3>
                          <p className="text-white/70 text-xs leading-relaxed mb-2">
                            {truncateText(item.descriptionEn || item.description, 60)}
                          </p>
                          <Link href={`/en/education/${item.id || item._id}`} className="text-blue-400 hover:text-blue-300 transition-colors duration-300 text-xs font-medium">
                            View Course
                          </Link>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift">
                      <div className="relative h-32 overflow-hidden"><div className="w-full h-full bg-gray-700/50 flex items-center justify-center"><span className="text-white/50">Loading...</span></div></div>
                      <div className="p-3"><div className="h-4 bg-gray-700/50 rounded mb-2"></div><div className="h-12 bg-gray-700/30 rounded mb-2"></div><div className="h-6 bg-gray-700/20 rounded"></div></div>
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="/en/education"
                    className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-500/30 transition-colors duration-300"
                  >
                    View All Education →
                  </Link>
                </div>
              </div>

              {/* Products Section */}
              <div className="glass-strong rounded-3xl p-4 sm:p-6 flex flex-col h-full">
                <div className="text-center mb-6 animate-on-scroll">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/80 mb-3 text-shadow">Latest Product</h2>
                </div>
                <div className="space-y-4 flex-grow">
                  {productItems.length > 0 ? (
                    productItems.map((product, index) => (
                      <article key={product.id} className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                        <div className="relative h-32 overflow-hidden">
                          <img
                            src={product.imageUrl || "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=400&h=300&fit=crop"}
                            alt={product.nameEn || product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-2 left-2 right-2">
                            <span className="inline-block bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium">
                              {product.category || 'Product'}
                            </span>
                          </div>
                        </div>
                        <div className="p-3">
                          <h3 className="text-base font-bold text-white/90 mb-2 leading-tight hover:text-green-400 transition-colors">
                            {product.nameEn || product.name}
                          </h3>
                          <p className="text-white/70 text-xs leading-relaxed mb-2">
                            {truncateText(product.descriptionEn || product.description, 60)}
                          </p>
                          <Link href={`/en/catalog`} className="text-green-400 hover:text-green-300 transition-colors duration-300 text-xs font-medium">
                            View Product
                          </Link>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="animate-on-scroll glass rounded-lg overflow-hidden hover-lift">
                      <div className="relative h-32 overflow-hidden"><div className="w-full h-full bg-gray-700/50 flex items-center justify-center"><span className="text-white/50">Loading...</span></div></div>
                      <div className="p-3"><div className="h-4 bg-gray-700/50 rounded mb-2"></div><div className="h-12 bg-gray-700/30 rounded mb-2"></div><div className="h-6 bg-gray-700/20 rounded"></div></div>
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <Link
                    href="/en/catalog"
                    className="inline-block bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-500/30 transition-colors duration-300"
                  >
                    View All Products →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative z-30 flex items-start justify-center pt-0 pb-50 min-h-0" style={{ marginTop: '-55px' }}>
          <div className="container mx-auto px-4 text-center">
            {/* Animated Solar Text */}
            <div className="mb-2 mt-2 max-sm:mt-0 lg:mt-2 xl:mt-2 mt-4k animate-on-scroll">
              <div className="glass rounded-2xl p-2 max-w-md mx-auto">
                <div className="relative overflow-hidden p-2 group hover:scale-105 transition-all duration-500">
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>

                  <p className="relative text-white/80 text-sm sm:text-base lg:text-lg font-medium leading-relaxed tracking-wide min-h-[2em] group-hover:text-white transition-all duration-300 text-gradient" style={{ direction: 'ltr', textAlign: 'left', fontFamily: "'B Nazanin', 'B Titr', 'B Mitra', 'Tahoma', 'Arial', sans-serif" }}>
                    {displayedText || ""}
                    <span className={`inline-block w-1 h-[1.2em] bg-yellow-400 ml-2 ${isTyping ? 'animate-pulse' : 'opacity-0'}`} style={{ direction: 'ltr' }}></span>
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
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg" style={{ direction: 'ltr', textAlign: 'center', fontFeatureSettings: '"lnum"' }}>
                Why Solar Energy?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "☀️",
                  title: "Cost Savings",
                  description: "Significant reduction in monthly electricity bills with return on investment in less than 5 years"
                },
                {
                  icon: "🌱",
                  title: "Clean Environment",
                  description: "Reduce carbon emissions and help preserve the environment for future generations"
                },
                {
                  icon: "⚡",
                  title: "Energy Independence",
                  description: "Independent power generation and freedom from urban electricity grids"
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

        {/* Contact CTA Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll glass-strong rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg" style={{ direction: 'ltr', textAlign: 'center', fontFeatureSettings: '"lnum"' }}>
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto" style={{ direction: 'ltr', textAlign: 'left', fontFeatureSettings: '"lnum"' }}>
                Contact our experts today and get free consultation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/en/contact" className="btn-primary text-lg px-8 py-4 hover-lift">
                  Contact Us
                </Link>
                <Link href="/en/education" className="glass rounded-lg text-lg px-8 py-4 text-white/80 hover:text-white transition-colors duration-300 hover-lift">
                  Learn More
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
                {showBottomSections ? 'Hide Footer' : 'Show Footer'}
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
