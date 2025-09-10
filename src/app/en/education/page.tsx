"use client";

import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations';
import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function EnglishEducationPage() {
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

      {/* Courses Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-center text-shadow">
              {t('education')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">📚</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  {t('solarBasics')}
                </h3>
                <p className="text-white/60 text-sm text-center mb-4">
                  {t('solarBasicsDesc')}
                </p>
                <div className="text-yellow-400 text-sm text-center">{t('duration')}: 8 {t('hours')}</div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🔧</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  {t('installation')}
                </h3>
                <p className="text-white/60 text-sm text-center mb-4">
                  {t('installationDesc')}
                </p>
                <div className="text-yellow-400 text-sm text-center">{t('duration')}: 12 {t('hours')}</div>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">💡</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  {t('systemDesign')}
                </h3>
                <p className="text-white/60 text-sm text-center mb-4">
                  {t('systemDesignDesc')}
                </p>
                <div className="text-yellow-400 text-sm text-center">{t('duration')}: 16 {t('hours')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-center text-shadow">
              {t('resources')}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl font-bold text-white/60 mb-4 text-center">{t('digitalLibrary')}</h3>
                <ul className="space-y-3 text-center">
                  <li className="text-white/60 text-sm">• {t('completeGuide')}</li>
                  <li className="text-white/60 text-sm">• {t('safetyStandards')}</li>
                  <li className="text-white/60 text-sm">• {t('technicalCalculations')}</li>
                  <li className="text-white/60 text-sm">• {t('successfulProjects')}</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 rounded-xl">
                <h3 className="text-xl font-bold text-white/60 mb-4 text-center">{t('educationalVideos')}</h3>
                <ul className="space-y-3 text-center">
                  <li className="text-white/60 text-sm">• {t('practicalInstallation')}</li>
                  <li className="text-white/60 text-sm">• {t('equipmentIntroduction')}</li>
                  <li className="text-white/60 text-sm">• {t('troubleshooting')}</li>
                  <li className="text-white/60 text-sm">• {t('optimization')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
