import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCurrentLanguage, getTranslation } from '@/lib/i18n';
import { TranslationKey } from '@/lib/translations';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const currentLang = getCurrentLanguage(pathname);
  const t = (key: string) => getTranslation(currentLang, key as TranslationKey);

  const footerLinks = {
    services: [
      { name: t('solarInstallation'), href: currentLang === 'en' ? '/en/services/installation' : '/services/installation' },
      { name: t('energyConsultation'), href: currentLang === 'en' ? '/en/services/consultation' : '/services/consultation' },
      { name: t('maintenance'), href: currentLang === 'en' ? '/en/services/maintenance' : '/services/maintenance' },
      { name: t('inspection'), href: currentLang === 'en' ? '/en/services/inspection' : '/services/inspection' }
    ],
    company: [
      { name: t('about'), href: currentLang === 'en' ? '/en/about' : '/about' },
      { name: t('team'), href: currentLang === 'en' ? '/en/team' : '/team' },
      { name: 'اخبار و مقالات', href: currentLang === 'en' ? '/en/news' : '/news' },
      { name: t('contact'), href: currentLang === 'en' ? '/en/contact' : '/contact' }
    ],
    resources: [
      { name: t('solarEducation'), href: currentLang === 'en' ? '/en/education' : '/education' },
      { name: t('solarCalculator'), href: currentLang === 'en' ? '/en/calculator' : '/calculator' },
      { name: t('faq'), href: currentLang === 'en' ? '/en/faq' : '/faq' },
      { name: t('downloadCatalog'), href: currentLang === 'en' ? '/en/catalog' : '/catalog' }
    ],
    support: [
      { name: t('technicalSupport'), href: currentLang === 'en' ? '/en/support' : '/support' },
      { name: t('warranty'), href: currentLang === 'en' ? '/en/warranty' : '/warranty' },
      { name: t('terms'), href: currentLang === 'en' ? '/en/terms' : '/terms' },
      { name: t('privacy'), href: currentLang === 'en' ? '/en/privacy' : '/privacy' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Telegram', href: '#', icon: '📱' },
    { name: 'WhatsApp', href: '#', icon: '💬' },
    { name: 'LinkedIn', href: '#', icon: '💼' }
  ];

  return (
    <footer className="relative z-20 bg-black/80 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white/80 mb-4">NOORONX</h3>
              <p className="text-white/60 leading-relaxed mb-6">
                {t('footerDescription')}
              </p>
              <div className="flex space-x-4 space-x-reverse">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-yellow-400/20 rounded-full flex items-center justify-center text-white/60 hover:text-yellow-400 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white/80 mb-4">{t('ourServices')}</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold text-white/80 mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white/80 mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-yellow-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-right">
              <h5 className="text-white/80 font-semibold mb-2">{t('contactUs')}</h5>
              <p className="text-white/60 text-sm">{t('address')}</p>
              <p className="text-white/60 text-sm">info@nooronx.com</p>
            </div>
            <div className="text-center">
              <h5 className="text-white/80 font-semibold mb-2">{t('workingHours')}</h5>
              <p className="text-white/60 text-sm">{t('weekdays')}</p>
              <p className="text-white/60 text-sm">{t('thursday')}</p>
            </div>
            <div className="text-center md:text-left">
              <h5 className="text-white/80 font-semibold mb-2">{t('phone')}</h5>
              <p className="text-white/60 text-sm">021-12345678</p>
              <p className="text-white/60 text-sm">0912-1234567</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 text-sm">
              © {currentYear} NOORONX. {t('allRightsReserved')}
            </div>
            <div className="flex space-x-6 space-x-reverse text-sm">
              <Link href={currentLang === 'en' ? '/en/terms' : '/terms'} className="text-white/60 hover:text-yellow-400 transition-colors duration-300">
                {t('termsOfUse')}
              </Link>
              <Link href={currentLang === 'en' ? '/en/privacy' : '/privacy'} className="text-white/60 hover:text-yellow-400 transition-colors duration-300">
                {t('privacy')}
              </Link>
              <Link href={currentLang === 'en' ? '/en/cookies' : '/cookies'} className="text-white/60 hover:text-yellow-400 transition-colors duration-300">
                {t('cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
