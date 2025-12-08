import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import Footer from '../components/Footer';
import MainLogo from '../components/MainLogo';
import BottomNavigation from '../components/BottomNavigation';
import { User, TicketPercent, Headphones, BookOpen } from 'lucide-react';

import digikalaLogo from '../assets/images/Logos/digikala_logo.svg';
import khanumiLogo from '../assets/images/Logos/khanumi_logo.svg';

const convertToPersian = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => persianDigits[digit]);
};

const CouponsPage = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('jooponUser');
      if (storedUser) {
        const data = JSON.parse(storedUser);
        const firstName = data.firstName || '';
        const lastName = data.lastName || '';
        const displayName = [firstName, lastName].filter(Boolean).join(' ');
        setUserName(displayName || 'نام و نام‌خانوادگی');
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  }, []);

  // Mock coupon data - این داده‌ها باید از API بیایند
  // ساختار مشابه discountTypes
  const coupons = [
    {
      id: 1,
      storeName: 'دیجی‌کالا',
      storeLogo: digikalaLogo,
      discount: 'تا ۴۰ درصد تخفیف', // description from discountTypes
      code: 'JPN9VXV7YS',
      expiryDate: '۱۴۰۴/۱۲/۲۹',
    },
    {
      id: 2,
      storeName: 'خانومی',
      storeLogo: khanumiLogo,
      discount: 'تا ۲۵ درصد تخفیف خرید اول', // description from discountTypes
      code: 'JPN9VXV7YS',
      expiryDate: '۱۴۰۴/۱۲/۲۹',
    },
  ];

  const handleCopyCode = (code, couponId) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(couponId);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'IRANYekan' }}>
      <main className="flex-1 flex flex-col">
        {/* Top header area */}
        <div className="w-full" style={{ marginTop: '16px', borderBottom: '1px solid #E2E2E2' }}>
          <div
            className="safe-zone flex items-center justify-between py-4"
          >
            <MainLogo />
            <div className="text-sm text-[#3A3A3A]">{userName}</div>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full" style={{ padding: '40px 0 80px 0' }}>
          <div
            className="safe-zone"
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {/* Side menu card (right side) */}
            <aside className="hidden md:block" style={{ width: '260px' }}>
              <div
                className="bg-white rounded-2xl border text-sm"
                style={{ borderColor: '#E2E2E2', padding: '16px' }}
              >
                <button
                  type="button"
                  onClick={() => window.location.href = '/account'}
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1 hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>حساب کاربری</span>
                  <User size={18} className="text-gray-500" />
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1"
                  style={{ backgroundColor: '#FFF7F1', color: '#FF6C08', fontWeight: 600 }}
                >
                  <span>کوپن‌های من</span>
                  <TicketPercent size={18} />
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1 hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>پشتیبانی</span>
                  <Headphones size={18} className="text-gray-500" />
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>راهنمای استفاده</span>
                  <BookOpen size={18} className="text-gray-500" />
                </button>
              </div>
            </aside>

            {/* Main coupons card (center/left) */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '640px',
                }}
              >
                <h1 className="text-2xl font-bold text-right mb-8" style={{ color: '#3A3A3A' }}>
                  کوپن‌های من
                </h1>

                {/* Coupons List */}
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="bg-white border rounded-2xl"
                      style={{ borderColor: '#E2E2E2', padding: 'clamp(16px, 4vw, 24px)' }}
                      dir="rtl"
                    >
                      <div className="flex items-start" style={{ gap: 'clamp(12px, 3vw, 16px)' }}>
                        {/* Store Logo */}
                        <div className="flex-shrink-0">
                          <div
                            className="rounded-lg flex items-center justify-center bg-white"
                            style={{ 
                              border: '1px solid #E2E2E2',
                              width: 'clamp(80px, 20vw, 120px)',
                              height: 'clamp(80px, 20vw, 120px)',
                              padding: 'clamp(8px, 2vw, 12px)'
                            }}
                          >
                            <img
                              src={coupon.storeLogo}
                              alt={coupon.storeName}
                              style={{ 
                                maxWidth: '100%',
                                maxHeight: '100%',
                                width: 'auto',
                                height: 'auto',
                                objectFit: 'contain',
                                transform: 'scale(1.5)'
                              }}
                            />
                          </div>
                        </div>

                        {/* Coupon Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-4">
                            <h2 className="font-bold" style={{ color: '#3A3A3A', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>
                              {coupon.storeName}
                            </h2>
                            <div style={{ color: '#FF6C08', borderRight: '2px solid #FF6C08', paddingRight: '8px', paddingLeft: '8px', fontSize: 'clamp(12px, 3vw, 14px)' }}>
                              {coupon.discount}
                            </div>
                          </div>

                          {/* Coupon Code */}
                          <div className="mb-3">
                            <div className="text-xs mb-1" style={{ color: '#4A4A4A' }}>
                              کد تخفیف:
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="flex-1 py-2 rounded-lg border-2 border-dashed text-center font-mono"
                                style={{ borderColor: '#E2E2E2', backgroundColor: '#F9F9F9', letterSpacing: '2px', padding: 'clamp(8px, 2vw, 16px)', fontSize: 'clamp(11px, 2.5vw, 14px)' }}
                              >
                                {coupon.code}
                              </div>
                              <button
                                onClick={() => handleCopyCode(coupon.code, coupon.id)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                style={{ border: '1px solid #E2E2E2' }}
                              >
                                {copiedCode === coupon.id ? (
                                  <Check size={18} style={{ color: '#10B981' }} />
                                ) : (
                                  <Copy size={18} style={{ color: '#3A3A3A' }} />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Expiry Date */}
                          <div className="text-xs" style={{ color: '#4A4A4A' }}>
                            تاریخ انقضا: <span className="font-medium">{coupon.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {coupons.length === 0 && (
                  <div className="text-center py-16">
                    <TicketPercent size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">هنوز کوپنی دریافت نکرده‌اید</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default CouponsPage;
