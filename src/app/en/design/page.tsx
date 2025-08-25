"use client";

import Link from 'next/link';
import ResponsiveBackground from '@/components/ResponsiveBackground';
import { useState } from 'react';

export default function EnglishDesignPage() {
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="min-h-screen relative">
      <ResponsiveBackground />
      
      {/* Navigation */}
      <nav className="absolute top-18 sm:top-10 w-full flex justify-center sm:w-auto sm:justify-start sm:left-12 lg:left-20 z-[9999] gap-3 sm:gap-1 scale-90 sm:scale-110">
        <Link href="/en" className="text-white/60 px-4 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden rounded-full">
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
          <span className="relative">Home</span>
        </Link>
      </nav>

      {/* Consultation Form Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center py-8 sm:py-16 pt-32 sm:pt-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 sm:mb-12 text-center text-shadow">
              Free Consultation Request Form
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Installation Location */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">🏠 Installation Location Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Exact Address or Postal Code</label>
                    <textarea 
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      rows={3}
                      placeholder="For solar radiation calculation, climate conditions, regional limitations"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Building Type</label>
                    <select 
                      value={formData.buildingType}
                      onChange={(e) => handleInputChange('buildingType', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="residential">Residential Complex</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="agricultural">Agricultural</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Installation Location Ownership</label>
                    <select 
                      value={formData.ownership}
                      onChange={(e) => handleInputChange('ownership', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="owner">I am the owner</option>
                      <option value="tenant">I am a tenant (with landlord permission)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Installation Space */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">☀️ Roof or Installation Space Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Type of Available Space</label>
                    <select 
                      value={formData.installationType}
                      onChange={(e) => handleInputChange('installationType', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="pitched">Pitched Roof</option>
                      <option value="flat">Flat Roof</option>
                      <option value="ground">Empty Ground</option>
                      <option value="carport">Shaded Parking</option>
                      <option value="vertical">Vertical Wall</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Approximate Installable Area (Square Meters)</label>
                    <input 
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Enter number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Roof Direction</label>
                    <select 
                      value={formData.roofDirection}
                      onChange={(e) => handleInputChange('roofDirection', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="south">South</option>
                      <option value="west">West</option>
                      <option value="east">East</option>
                      <option value="north">North</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Approximate Angle (Degrees)</label>
                    <input 
                      type="number"
                      value={formData.roofAngle}
                      onChange={(e) => handleInputChange('roofAngle', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="e.g., 30"
                    />
                  </div>
                </div>
              </div>

              {/* Energy Consumption */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">⚡ Energy Consumption Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Average Monthly Electricity Consumption (kWh)</label>
                    <input 
                      type="number"
                      value={formData.monthlyConsumption}
                      onChange={(e) => handleInputChange('monthlyConsumption', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Exact number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Consumption Category</label>
                    <select 
                      value={formData.consumptionCategory}
                      onChange={(e) => handleInputChange('consumptionCategory', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="low">Low (Under 200 kWh)</option>
                      <option value="medium">Medium (200 to 600 kWh)</option>
                      <option value="high">High (Over 600 kWh)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Solar System Goal</label>
                    <select 
                      value={formData.solarGoal}
                      onChange={(e) => handleInputChange('solarGoal', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="full">Full Power Supply</option>
                      <option value="partial">Partial Power Supply</option>
                      <option value="cost">Reduce Electricity Costs</option>
                      <option value="backup">Backup Power</option>
                      <option value="sell">Sell Power to Grid</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Number of Residents</label>
                    <input 
                      type="number"
                      value={formData.residents}
                      onChange={(e) => handleInputChange('residents', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Number"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">💰 Financial and Budget Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Initial Budget Amount (Toman)</label>
                    <input 
                      type="number"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Budget Category</label>
                    <select 
                      value={formData.budgetCategory}
                      onChange={(e) => handleInputChange('budgetCategory', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="under50">Under 50 Million</option>
                      <option value="50-100">50 to 100 Million</option>
                      <option value="100-200">100 to 200 Million</option>
                      <option value="over200">Over 200 Million</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Interest in Financing</label>
                    <select 
                      value={formData.financing}
                      onChange={(e) => handleInputChange('financing', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="maybe">Depends</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Expected Return on Investment</label>
                    <select 
                      value={formData.paybackPeriod}
                      onChange={(e) => handleInputChange('paybackPeriod', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="under3">Under 3 Years</option>
                      <option value="3-5">3 to 5 Years</option>
                      <option value="longterm">Not Important, Long-term Savings</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/30">
                <h3 className="text-xl font-bold text-white mb-4 text-center">📞 Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-sm mb-2">Full Name</label>
                    <input 
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Email (Optional)</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                      placeholder="Email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm mb-2">Contact Preference</label>
                    <select 
                      value={formData.contactPreference}
                      onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg p-3 text-white"
                    >
                      <option value="">Select</option>
                      <option value="phone">Phone</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button 
                  type="submit"
                  className="text-white/60 px-8 py-4 text-xl font-bold relative group transition-all duration-300 hover:text-white hover:scale-105 overflow-hidden"
                >
                  <div className="absolute top-1/4 left-1/4 w-1/4 h-1/2 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out opacity-0 group-hover:opacity-100"></div>
                  <span className="relative">Submit Consultation Request</span>
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white/60 mb-8 sm:mb-12 text-center text-shadow">
              Design Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  Residential Design
                </h3>
                <p className="text-white/60 text-sm text-center">
                  Design and installation of solar systems for homes and apartments with the best quality and price
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏢</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  Commercial Design
                </h3>
                <p className="text-white/60 text-sm text-center">
                  Solar solutions for businesses, offices, and commercial centers
                </p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-6 border border-gray-700/30 hover:bg-gray-900/50 transition-all duration-300 hover:scale-105 rounded-xl">
                <div className="h-32 bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-4xl">🏭</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white/60 mb-3 text-center">
                  Industrial Design
                </h3>
                <p className="text-white/60 text-sm text-center">
                  Large-scale solar systems for factories and industrial centers
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
            <h3 className="text-2xl font-bold text-white mb-4">Your request has been successfully submitted</h3>
            <p className="text-white/90 text-lg">We will contact you soon</p>
          </div>
        </div>
      )}
    </div>
  );
}
