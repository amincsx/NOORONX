"use client";

import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations';
import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function EnglishInstallationPage() {
  const t = (key: string) => getTranslation('en', key as TranslationKey);

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />
      
      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-start sm:left-12 lg:left-20 z-20 gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/en" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">{t('home')}</span>
        </Link>
      </nav>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
          <div className="mb-8">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mb-6"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg mb-6">
            {t('underConstruction')}
          </h1>
          <p className="text-xl sm:text-2xl text-white/60 text-shadow mb-8">
            {t('solarInstallationPage')}
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
