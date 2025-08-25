"use client";

import BackgroundVideo from "@/components/BackgroundVideo";
import LogoVideo from "@/components/LogoVideo";
import Footer from "@/components/Footer";
import SimpleLanguageSelector from "@/components/SimpleLanguageSelector";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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

  // Intersection Observer for animations
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setIsLoaded(true);
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

  // Intersection Observer setup
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      {/* Fixed Logo and Navigation - Outside main container */}
      {/* Logo moved to top right corner for English version */}
      <div className="absolute max-sm:top-4 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 top-4 right-13 z-[9999] animate-on-scroll">
        <div className="english-logo">
          <LogoVideo />
        </div>
      </div>
      
      {/* Navigation moved to left side for English version */}
      <nav className="absolute max-sm:top-24 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 top-8 left-8 z-[9999] animate-on-scroll" style={{ position: 'absolute', zIndex: 9999 }}>
        <div className="glass rounded-2xl max-sm:p-2 max-sm:px-4 p-2">
          <div className="flex max-sm:gap-3 gap-2">
            <Link href="/en/design" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">Design</span>
            </Link>
            <Link href="/en/about" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">About Us</span>
            </Link>
            <Link href="/en/education" className="text-white/70 max-sm:px-2 max-sm:py-1 px-4 py-2 max-sm:text-xs text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full whitespace-nowrap">
              <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
              <span className="relative">Education</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Simple Language Selector - Right Side of Navigation */}
      <div className="absolute max-sm:top-40 max-sm:left-1/2 max-sm:transform max-sm:-translate-x-1/2 top-11 left-[330px] z-[99999] animate-on-scroll">
        <SimpleLanguageSelector currentLang="en" />
      </div>

      <div className="min-h-screen relative">
        <BackgroundVideo />
        
        {/* Hero Section */}
        <section className="relative z-30 min-h-screen flex items-center justify-center pt-130">
          <div className="container mx-auto px-4 text-center">
            {/* Animated Solar Text */}
            <div className="mb-8 mt-16 animate-on-scroll">
              <div className="glass rounded-2xl p-2 max-w-md mx-auto">
                <div className="relative overflow-hidden p-2 group hover:scale-105 transition-all duration-500">
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-0 group-hover:opacity-100"></div>
                  
                  <p className="relative text-white/80 text-sm sm:text-base lg:text-lg font-medium leading-relaxed tracking-wide min-h-[2em] group-hover:text-white transition-all duration-300 text-gradient">
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
                Why Solar Energy?
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto">
                Innovative solutions for a sustainable and cost-effective future
              </p>
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

        {/* News Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4">
            <div className="glass-strong rounded-3xl p-8 sm:p-12">
              <div className="text-center mb-12 animate-on-scroll">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/80 mb-6 text-shadow">
                  Latest News and Developments
                </h2>
                <p className="text-xl text-white/60">
                  Stay informed about the latest solar technologies and projects
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  {
                    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=400&h=300&fit=crop",
                    title: "Solar Panel Installation in 1000 New Homes",
                    description: "A new solar panel installation project has begun in various regions of the country, and by the end of the year, more than 1000 homes will be equipped with solar energy...",
                    category: "Solar Energy",
                    date: "2 weeks ago"
                  },
                  {
                    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop",
                    title: "Opening of the Country's Largest Solar Farm",
                    description: "The country's largest solar farm with a capacity to generate 50 megawatts of electricity was inaugurated in Yazd province. This project can provide electricity to 20,000 homes...",
                    category: "Solar Farm",
                    date: "1 month ago"
                  },
                  {
                    image: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?w=400&h=300&fit=crop",
                    title: "New Solar Panel Technology with 30% Efficiency",
                    description: "Iranian researchers have successfully developed new solar panels that increase energy conversion efficiency by up to 30%...",
                    category: "Solar Technology",
                    date: "3 weeks ago"
                  }
                ].map((article, index) => (
                  <article key={index} className="animate-on-scroll glass rounded-2xl overflow-hidden hover-lift" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block bg-yellow-400/90 text-black px-3 py-1 rounded-full text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-white/50">{article.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white/80 mb-3 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {article.description}
                      </p>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300 text-sm font-medium">
                        Read More →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="relative z-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-on-scroll glass-strong rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/80 mb-6 text-shadow-lg">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
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
