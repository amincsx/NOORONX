"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface LanguageSelectorProps {
  currentLang: string;
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const switchLanguage = (langCode: string) => {
    setIsOpen(false);
    
    // Get the current path without the language prefix
    let newPath = pathname;
    
    // Remove existing language prefix if present
    if (pathname.startsWith('/en/') || pathname.startsWith('/fa/')) {
      newPath = pathname.substring(3); // Remove /en/ or /fa/
    }
    
    // Add new language prefix
    if (langCode === 'en') {
      newPath = `/en${newPath}`;
    } else if (langCode === 'fa') {
      // For Farsi, remove the /en/ prefix if present and go to root path
      if (pathname.startsWith('/en/')) {
        newPath = pathname.substring(3); // Remove /en/
      } else if (pathname.startsWith('/en')) {
        newPath = '/'; // If it's just /en, go to root
      } else {
        newPath = newPath.startsWith('/') ? newPath : `/${newPath}`;
      }
    }
    
    router.push(newPath);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-white/60 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/10"
      >
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg shadow-lg z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-2 text-sm hover:bg-white/10 transition-colors duration-200 ${
                  currentLang === language.code ? 'text-yellow-400' : 'text-white/60'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
