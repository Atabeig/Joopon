import React from 'react';
import { Search } from 'lucide-react';
import MainLogo from './MainLogo';

const Navigation = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg">
      <div className="safe-zone">
        {/* Top Navigation Bar */}
        <div className="relative flex items-center justify-between py-4" style={{ fontFamily: 'IRANYekan' }}>
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
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-800 transition-colors font-medium">
              ورود
            </button>
            <button className="rounded-full bg-[#FF6B00] px-7 py-2 text-white font-bold hover:bg-[#ff7f1f] transition-colors">
              ثبت نام
            </button>
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="py-3">
          <nav className="flex items-center gap-12 text-base" style={{ fontFamily: 'IRANYekan', paddingRight: 'calc(56px)' }}>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
              همه
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
              غذا و نوشیدنی
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
              زیبایی و سلامت
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
              تکنولوژی و دیجیتال
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors font-medium px-2 py-2">
              آموزش
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navigation;