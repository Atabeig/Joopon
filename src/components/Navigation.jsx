import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLogo from './MainLogo';

const Navigation = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jooponUser');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to read user data', error);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('jooponUser');
    } catch (error) {
      console.error('Failed to clear user data', error);
    }
    setUser(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  const handleAccountClick = () => {
    setIsMenuOpen(false);
    navigate('/account');
  };

  return (
    <div className="relative z-50 bg-white" style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
      <div className="safe-zone">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Top Navigation Bar */}
          <div className="relative flex items-center justify-between py-2" style={{ fontFamily: 'IRANYekan', marginTop: '5px' }}>
            {/* Main Logo (Right side) */}
            <div className="flex items-center">
              <MainLogo />
            </div>

            {/* Search Box (Center) */}
            <div className="absolute left-1/2 top-1/2 w-[520px] max-w-full -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <input
                  type="text"
                  dir="rtl"
                  placeholder="جستجوی فروشگاه، کالا یا دسته‌بندی"
                  className="w-full rounded-full border border-gray-300 py-3 pr-12 pl-6 text-right bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none transition-all placeholder:text-gray-500"
                  style={{
                    boxShadow: '0 6px 15px 1px rgba(189, 189, 189, 0.3)',
                  }}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-400 p-2 hover:bg-orange-500 transition-colors">
                  <Search size={16} className="text-white" />
                </button>
              </div>
            </div>

            {/* Auth Buttons (Left side) */}
            <div className="flex items-center gap-4 relative">
              {!user ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    ورود
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="rounded-full bg-[#FF6B00] px-7 py-2 text-white font-bold hover:bg-[#ff7f1f] transition-colors"
                  >
                    ثبت نام
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <span>{user.displayName || user.firstName || 'کاربر'}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-left z-50">
                      <button
                        onClick={handleAccountClick}
                        className="block w-full px-4 py-2 text-sm text-[#3A3A3A] hover:bg-gray-50 hover:text-[#FF6C08] text-left"
                      >
                        حساب کاربری
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 hover:text-red-600 text-left"
                      >
                        خروج
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Menu */}
          <div className="py-3">
            <nav className="flex items-center gap-12 text-base" style={{ fontFamily: 'IRANYekan' }}>
              <button onClick={() => navigate('/all-discounts')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                همه
              </button>
              <button onClick={() => navigate('/category/food')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                غذا و نوشیدنی
              </button>
              <button onClick={() => navigate('/category/beauty')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                زیبایی و سلامت
              </button>
              <button onClick={() => navigate('/category/tech')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                تکنولوژی و دیجیتال
              </button>
              <button onClick={() => navigate('/category/education')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                آموزش
              </button>
              <button onClick={() => navigate('/category/entertainment')} className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
                سرگرمی
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-4" style={{ fontFamily: 'IRANYekan' }}>
          {/* Top Row: Logo and Auth Buttons */}
          <div className="flex items-center justify-between mb-1">
            {/* Logo - Smaller on mobile */}
            <div className="flex items-center scale-75 origin-right">
              <MainLogo />
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 text-sm">
              {!user ? (
                <>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    ورود
                  </button>
                  <span className="text-gray-400">/</span>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    ثبت نام
                  </button>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    <span>{user.displayName || user.firstName || 'کاربر'}</span>
                    <ChevronDown size={14} className="text-gray-500" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-left z-50">
                      <button
                        onClick={handleAccountClick}
                        className="block w-full px-4 py-2 text-sm text-[#3A3A3A] hover:bg-gray-50 hover:text-[#FF6C08] text-left"
                      >
                        حساب کاربری
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-50 hover:text-red-600 text-left"
                      >
                        خروج
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-3">
            <div className="relative">
              <input
                type="text"
                dir="rtl"
                placeholder="جستجوی فروشگاه، کالا یا دسته‌بندی"
                className="w-full rounded-full border border-gray-300 py-3 pr-12 pl-6 text-sm text-right bg-gray-50 focus:bg-white focus:border-orange-400 focus:outline-none transition-all placeholder:text-gray-400"
                style={{
                  boxShadow: '0 6px 15px 1px rgba(189, 189, 189, 0.3)',
                }}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gray-400 p-2 hover:bg-orange-500 transition-colors">
                <Search size={16} className="text-white" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Categories */}
          <div className="overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <nav className="flex items-center gap-3 text-sm whitespace-nowrap" style={{ paddingLeft: '4px', paddingRight: '4px' }}>
              <button 
                onClick={() => navigate('/all-discounts')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                همه
              </button>
              <button 
                onClick={() => navigate('/category/food')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                غذا و نوشیدنی
              </button>
              <button 
                onClick={() => navigate('/category/beauty')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                زیبایی و سلامت
              </button>
              <button 
                onClick={() => navigate('/category/tech')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                تکنولوژی و دیجیتال
              </button>
              <button 
                onClick={() => navigate('/category/education')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                آموزش
              </button>
              <button 
                onClick={() => navigate('/category/entertainment')} 
                className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-3 py-2 rounded-full bg-gray-100 hover:bg-orange-50"
              >
                سرگرمی
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;