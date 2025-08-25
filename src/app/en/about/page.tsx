"use client";

import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations';
import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function EnglishAboutPage() {
  const t = (key: string) => getTranslation('en', key as TranslationKey);

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />
      
      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-start sm:left-12 lg:left-20 z-[9999] gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/en" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">{t('home')}</span>
        </Link>
      </nav>
      
      {/* Company Story Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-center text-shadow">
              {t('companyStory')}
            </h2>
            
            <div className="space-y-6">
              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-center">
                  {t('establishment')}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-center">
                  {t('establishmentText')}
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-center">
                  {t('ourMission')}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-center">
                  {t('missionText')}
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 sm:p-8 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white/60 mb-4 text-center">
                  {t('vision')}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed text-center">
                  {t('visionText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-center text-shadow">
              {t('team')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-48 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-6xl">👨‍💼</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2 text-center">
                  Mohammad Reza Ziaian
                </h3>
                <p className="text-white/60 text-sm text-center mb-3">{t('founder')}</p>
                <p className="text-white/60 text-xs text-center">
                  {t('renewableExpert')}
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-48 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-2 text-center">
                  Mohammad Amin Azizi
                </h3>
                <p className="text-white/60 text-sm text-center mb-3">{t('techManager')}</p>
                <p className="text-white/60 text-xs text-center">
                  {t('softwareExpert')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
