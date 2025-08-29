"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface SimpleLanguageSelectorProps {
  currentLang: string;
}

export default function SimpleLanguageSelector({ currentLang }: SimpleLanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: 'fa', name: 'FA' },
    { code: 'en', name: 'EN' }
  ];

  // Only show the alternative language, not the current one
  const alternativeLanguage = languages.find(lang => lang.code !== currentLang) || languages[0];

  // Debug logging for mobile
  useEffect(() => {
    console.log('Language selector mounted with currentLang:', currentLang);
    console.log('Pathname:', pathname);
    console.log('Is mobile:', window.innerWidth < 768);
  }, [currentLang, pathname]);

  const switchLanguage = (langCode: string) => {
    console.log('Language selector: Switching to', langCode, 'from', currentLang);

    // Get the current path without the language prefix
    let newPath = pathname;

    // Remove existing language prefix if present
    if (pathname.startsWith('/en/')) {
      newPath = pathname.substring(3); // Remove /en/
    } else if (pathname === '/en') {
      newPath = '/'; // If it's just /en, go to root
    } else if (pathname.startsWith('/fa/')) {
      newPath = pathname.substring(3); // Remove /fa/
    }

    // Ensure newPath starts with /
    if (!newPath.startsWith('/')) {
      newPath = '/' + newPath;
    }

    // Normalize trailing slashes and ensure a clean path
    newPath = newPath.replace(/\/+$/g, ''); // remove trailing slashes
    if (newPath === '') newPath = '/';

    // Add new language prefix
    if (langCode === 'en') {
      // For root, use '/en' (not '/en/')
      newPath = newPath === '/' ? '/en' : `/en${newPath}`;
    } else {
      // For Farsi (fa), just use the path without prefix (already normalized)
    }

    console.log('Switching from', pathname, 'to', newPath);

    // Force full page navigation to ensure it works on mobile
    window.location.href = newPath;
  };

  // Compute href for a language option using the same normalization logic
  const computePath = (langCode: string) => {
    let newPath = pathname || '/';

    if (newPath.startsWith('/en/')) {
      newPath = newPath.substring(3);
    } else if (newPath === '/en') {
      newPath = '/';
    } else if (newPath.startsWith('/fa/')) {
      newPath = newPath.substring(3);
    }

    if (!newPath.startsWith('/')) newPath = '/' + newPath;
    newPath = newPath.replace(/\/+$/g, '');
    if (newPath === '') newPath = '/';

    if (langCode === 'en') {
      return newPath === '/' ? '/en' : `/en${newPath}`;
    }

    return newPath;
  };

  const handleLanguageClick = (e: React.MouseEvent, langCode: string) => {
    e.preventDefault();
    e.stopPropagation();
    switchLanguage(langCode);
  };

  return (
    <div className="relative z-[999999] language-selector-container">
      {/* Fallback for when JavaScript is disabled */}
      <noscript>
        <div className="flex gap-2">
          <a 
            href={currentLang === 'fa' ? '/en' : '/'} 
            className="px-3 py-2 text-sm rounded-md text-white/60 hover:text-white"
          >
            {currentLang === 'fa' ? 'EN' : 'FA'}
          </a>
        </div>
      </noscript>
      
      {/* Simple language switch button */}
      <button
        onClick={(e) => handleLanguageClick(e, alternativeLanguage.code)}
        className="flex items-center justify-center w-12 h-10 sm:h-8 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 touch-manipulation language-selector-button rounded-md cursor-pointer"
        aria-label={`Switch to ${alternativeLanguage.name}`}
      >
        <span className="text-sm font-medium">{alternativeLanguage.name}</span>
      </button>
    </div>
  );
}
