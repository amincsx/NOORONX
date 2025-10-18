"use client";

import Link from 'next/link';

import ResponsiveBackground from '@/components/ResponsiveBackground';
import { useState } from 'react';

export default function DesignPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Installation Location
    address: '',
    buildingType: '',
    ownership: '',

    // Installation Space
    installationType: '',
    area: '',
    roofDirection: '',
    roofAngle: '',
    obstacles: '',
    roofMaterial: '',

    // Energy Consumption
    monthlyConsumption: '',
    consumptionCategory: '',
    solarGoal: '',
    residents: '',
    highConsumptionDevices: [],

    // Financial
    budget: '',
    budgetCategory: '',
    financing: '',
    paybackPeriod: '',

    // Technical
    gridConnection: '',
    batteryStorage: '',
    systemType: '',

    // Contact
    fullName: '',
    phone: '',
    email: '',
    contactPreference: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields (only fields that actually exist in the form)
    const requiredFields = {
      'address': 'آدرس',
      'buildingType': 'نوع ساختمان',
      'ownership': 'مالکیت',
      'installationType': 'نوع نصب',
      'area': 'مساحت',
      'roofDirection': 'جهت بام',
      'roofAngle': 'زاویه بام',
      'monthlyConsumption': 'مصرف ماهانه',
      'consumptionCategory': 'دسته مصرف',
      'solarGoal': 'هدف از خورشیدی',
      'residents': 'تعداد ساکنین',
      'budget': 'بودجه',
      'budgetCategory': 'دسته بودجه',
      'financing': 'تامین مالی',
      'paybackPeriod': 'دوره بازگشت سرمایه',
      'fullName': 'نام کامل',
      'phone': 'تلفن',
      'contactPreference': 'روش تماس ترجیحی'
    };

    const missingFields = Object.keys(requiredFields).filter(field => {
      const value = formData[field as keyof typeof formData];
      return !value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0);
    });

    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(field => requiredFields[field as keyof typeof requiredFields]).join('، ');
      setSubmitError(`فیلدهای زیر ضروری هستند: ${missingFieldNames}`);
      console.log('Missing fields:', missingFields);
      console.log('Form data:', formData);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log('Submitting form with data:', formData);
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const result = await response.json();
        console.log('Form submitted successfully:', result);
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
          setFormData({
            address: '', buildingType: '', ownership: '', installationType: '', area: '',
            roofDirection: '', roofAngle: '', obstacles: '', roofMaterial: '',
            monthlyConsumption: '', consumptionCategory: '', solarGoal: '', residents: '',
            highConsumptionDevices: [], budget: '', budgetCategory: '', financing: '',
            paybackPeriod: '', gridConnection: '', batteryStorage: '', systemType: '',
            fullName: '', phone: '', email: '', contactPreference: ''
          });
        }, 3000);
      } else {
        const errorText = await response.text();
        console.error('API Error - Status:', response.status);
        console.error('API Error - Response:', errorText);
        try {
          const errorData = JSON.parse(errorText);
          setSubmitError(errorData.message || `خطا در ارسال فرم: ${response.status}`);
        } catch {
          setSubmitError(`خطا در ارسال فرم: ${response.status} - ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(`خطا در ارسال فرم: ${error instanceof Error ? error.message : 'خطای نامشخص'}`);
      setSubmitError('خطا در ارسال فرم. لطفا اتصال اینترنت خود را بررسی کنید.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />

      {/* SunScroll Video Logo */}


      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-end sm:right-12 lg:right-20 z-[9999] gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full">
          {/* Sliding background animation - only comes in */}
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">صفحه اصلی</span>
        </Link>
      </nav>

      {/* Consultation Form Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-right text-shadow">
              فرم درخواست مشاوره رایگان
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Installation Location */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-right">🏠 اطلاعات محل نصب</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2 text-right">آدرس دقیق یا کد پستی</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      rows={3}
                      placeholder="برای محاسبه تابش خورشید، شرایط اقلیمی، محدودیت‌های منطقه‌ای"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">نوع ساختمان</label>
                    <select
                      value={formData.buildingType}
                      onChange={(e) => handleInputChange('buildingType', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="villa">ویلایی</option>
                      <option value="apartment">آپارتمان</option>
                      <option value="residential">مجتمع مسکونی</option>
                      <option value="commercial">تجاری</option>
                      <option value="industrial">صنعتی</option>
                      <option value="agricultural">کشاورزی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">مالکیت محل نصب</label>
                    <select
                      value={formData.ownership}
                      onChange={(e) => handleInputChange('ownership', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="owner">مالک هستم</option>
                      <option value="tenant">مستاجر هستم (با اجازه صاحب ملک)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Installation Space */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-right">☀️ اطلاعات مربوط به سقف یا فضای نصب</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2 text-right">نوع فضای قابل استفاده</label>
                    <select
                      value={formData.installationType}
                      onChange={(e) => handleInputChange('installationType', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="pitched">سقف شیروانی</option>
                      <option value="flat">سقف صاف</option>
                      <option value="ground">زمین خالی</option>
                      <option value="carport">پارکینگ سایه‌بان‌دار</option>
                      <option value="vertical">دیوار عمودی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">مساحت تقریبی قابل نصب (متر مربع)</label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="عدد وارد کنید"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">جهت سقف</label>
                    <select
                      value={formData.roofDirection}
                      onChange={(e) => handleInputChange('roofDirection', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="south">جنوبی</option>
                      <option value="west">غربی</option>
                      <option value="east">شرقی</option>
                      <option value="north">شمالی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">زاویه تقریبی (درجه)</label>
                    <input
                      type="number"
                      value={formData.roofAngle}
                      onChange={(e) => handleInputChange('roofAngle', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="مثلاً ۳۰"
                    />
                  </div>
                </div>
              </div>

              {/* Energy Consumption */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-right">⚡ اطلاعات مصرف انرژی</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2 text-right">میانگین مصرف ماهانه برق (کیلووات ساعت)</label>
                    <input
                      type="number"
                      value={formData.monthlyConsumption}
                      onChange={(e) => handleInputChange('monthlyConsumption', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="عدد دقیق"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">دسته‌بندی مصرف</label>
                    <select
                      value={formData.consumptionCategory}
                      onChange={(e) => handleInputChange('consumptionCategory', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="low">کم (زیر 200 کیلووات ساعت)</option>
                      <option value="medium">متوسط (200 تا 600)</option>
                      <option value="high">زیاد (بیشتر از 600)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">هدف از سیستم خورشیدی</label>
                    <select
                      value={formData.solarGoal}
                      onChange={(e) => handleInputChange('solarGoal', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="full">تأمین کامل برق</option>
                      <option value="partial">تأمین بخشی از برق</option>
                      <option value="cost">کاهش هزینه برق</option>
                      <option value="backup">برق پشتیبان</option>
                      <option value="sell">فروش برق به شبکه</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">تعداد ساکنین</label>
                    <input
                      type="number"
                      value={formData.residents}
                      onChange={(e) => handleInputChange('residents', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="عدد"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-right">💰 اطلاعات مالی و بودجه</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2 text-right">میزان بودجه اولیه (تومان)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="عدد"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">دسته‌بندی بودجه</label>
                    <select
                      value={formData.budgetCategory}
                      onChange={(e) => handleInputChange('budgetCategory', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="under50">کمتر از 50 میلیون</option>
                      <option value="50-100">50 تا 100 میلیون</option>
                      <option value="100-200">100 تا 200 میلیون</option>
                      <option value="over200">بیشتر از 200 میلیون</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">تمایل به تسهیلات</label>
                    <select
                      value={formData.financing}
                      onChange={(e) => handleInputChange('financing', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="yes">بله</option>
                      <option value="no">خیر</option>
                      <option value="maybe">بستگی دارد</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">انتظار بازگشت سرمایه</label>
                    <select
                      value={formData.paybackPeriod}
                      onChange={(e) => handleInputChange('paybackPeriod', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="under3">کمتر از 3 سال</option>
                      <option value="3-5">3 تا 5 سال</option>
                      <option value="longterm">مهم نیست، صرفه‌جویی بلندمدت</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-right">📞 اطلاعات تماس</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2 text-right">نام و نام خانوادگی</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="نام و نام خانوادگی"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">شماره تماس</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="شماره تماس"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">ایمیل (اختیاری)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                      placeholder="ایمیل"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm mb-2 text-right">ترجیح تماس</label>
                    <select
                      value={formData.contactPreference}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="w-full bg-gray-800 border border-gray-500 rounded-lg p-3 text-white text-right focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="">انتخاب کنید</option>
                      <option value="phone">تلفنی</option>
                      <option value="whatsapp">واتساپ</option>
                      <option value="email">ایمیل</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {submitError && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-300 text-center">
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 text-xl font-bold relative group transition-all duration-300 overflow-hidden ${isSubmitting
                    ? 'text-white/40 cursor-not-allowed'
                    : 'text-white/60 hover:text-white hover:scale-105'
                    }`}
                >
                  {/* Sliding background animation - only comes in */}
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
                  <span className="relative">
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></span>
                        در حال ارسال...
                      </>
                    ) : (
                      'ارسال درخواست مشاوره'
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-right text-shadow">
              خدمات طراحی
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی مسکونی
                </h3>
                <p className="text-white/60 text-sm text-right">
                  طراحی و نصب سیستم‌های خورشیدی برای خانه‌ها و آپارتمان‌ها با بهترین کیفیت و قیمت
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی تجاری
                </h3>
                <p className="text-white/60 text-sm text-right">
                  راه‌حل‌های خورشیدی برای کسب‌وکارها، ادارات و مراکز تجاری
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏭</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-right">
                  طراحی صنعتی
                </h3>
                <p className="text-white/60 text-sm text-right">
                  سیستم‌های خورشیدی مقیاس بزرگ برای کارخانه‌ها و مراکز صنعتی
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-green-600/90 backdrop-blur-md rounded-2xl p-8 border border-green-400/50 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-white mb-4">درخواست شما با موفقیت ثبت شد</h3>
            <p className="text-white/90 text-lg">ما به زودی با شما تماس خواهیم گرفت</p>
          </div>
        </div>
      )}
    </div>
  );
}

