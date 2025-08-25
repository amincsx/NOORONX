"use client";

import Link from 'next/link';
import { getTranslation } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations';
import ResponsiveBackground from '@/components/ResponsiveBackground';

export default function EnglishContactPage() {
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
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-32 sm:pt-0">
        <div className="max-w-4xl mx-auto w-full">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-shadow-lg mb-8 text-center">
              {t('contactUs')}
            </h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white/60 mb-6 text-center">
                  Send us a message
                </h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                      placeholder="+98 912 123 4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-3 hover-lift"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white/60 mb-6 text-center">
                  {t('contactInfo')}
                </h2>
                
                <div className="space-y-6">
                  <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 rounded-xl">
                    <h3 className="text-lg font-bold text-white/60 mb-3 text-center">
                      Address
                    </h3>
                    <p className="text-white/60 text-center mb-2">
                      {t('address')}
                    </p>
                    <p className="text-white/60 text-center text-sm">
                      {t('addressEn')}
                    </p>
                  </div>
                  
                  <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 rounded-xl">
                    <h3 className="text-lg font-bold text-white/60 mb-3 text-center">
                      {t('workingHours')}
                    </h3>
                    <p className="text-white/60 text-center mb-2">
                      {t('weekdays')}
                    </p>
                    <p className="text-white/60 text-center">
                      {t('thursday')}
                    </p>
                  </div>
                  
                  <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 rounded-xl">
                    <h3 className="text-lg font-bold text-white/60 mb-3 text-center">
                      {t('phone')}
                    </h3>
                    <p className="text-white/60 text-center mb-2">
                      {t('phoneNumber1')}
                    </p>
                    <p className="text-white/60 text-center">
                      {t('phoneNumber2')}
                    </p>
                  </div>
                  
                                     <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 rounded-xl">
                     <h3 className="text-lg font-bold text-white/60 mb-3 text-center">
                       Email
                     </h3>
                     <p className="text-white/60 text-center">
                       {t('email')}
                     </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
