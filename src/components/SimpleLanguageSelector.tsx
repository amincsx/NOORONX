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

  // Filter languages to show only the opposite language
  const availableLanguages = languages.filter(lang => lang.code !== currentLang);

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  const switchLanguage = (langCode: string) => {
    setIsOpen(false);

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

    // Try app router navigation as a best-effort fallback for non-anchor usages
    try {
      router.push(newPath);
    } catch (err) {
      console.warn('router.push threw, falling back to window.location', err);
      window.location.href = newPath;
    }
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

  return (
    <div className="relative z-[999999]">
      {availableLanguages.length === 1 ? (
        // Direct link when only one option is available
        <a
          href={computePath(availableLanguages[0].code)}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = computePath(availableLanguages[0].code);
          }}
          className="flex items-center justify-center w-12 h-8 text-white/60 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium">{availableLanguages[0].name}</span>
        </a>
      ) : (
        // Dropdown when multiple options (fallback, shouldn't happen with current logic)
        <>
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
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-16 z-[999999] pointer-events-auto">
              <div className="py-1">
                {availableLanguages.map((language) => {
                  const href = computePath(language.code);
                  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    setIsOpen(false);
                    // Force full page navigation to ensure it works on mobile
                    window.location.href = href;
                  };

                  return (
                    <a
                      key={language.code}
                      href={href}
                      onClick={handleClick}
                      className={`w-full block text-center px-3 py-2 text-sm transition-colors duration-200 rounded-md ${currentLang === language.code ? 'text-yellow-400' : 'text-white/60 hover:text-white'
                        }`}
                      aria-current={currentLang === language.code ? 'true' : undefined}
                    >
                      {language.name}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
