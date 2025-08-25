"use client";

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SimpleLanguageSelectorProps {
  currentLang: string;
}

export default function SimpleLanguageSelector({ currentLang }: SimpleLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'fa', name: 'FA' },
    { code: 'en', name: 'EN' }
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
        className="flex items-center justify-center w-12 h-8 text-white/60 hover:text-white transition-colors duration-300"
      >
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <svg
          className={`w-3 h-3 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-4 transform -translate-x-1/2 mt-2 w-16 z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full flex items-center justify-center px-3 py-2 text-sm transition-colors duration-200 ${
                  currentLang === language.code ? 'text-yellow-400' : 'text-white/60'
                }`}
              >
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
