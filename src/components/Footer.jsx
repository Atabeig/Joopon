import React from 'react';
import { Send, Linkedin, Twitter } from 'lucide-react';
import MainLogo from './MainLogo';

const Footer = () => {
  return (
    <footer className="bg-[#4A4A4A] text-white" style={{ fontFamily: 'IRANYekan' }}>
      <div className="safe-zone py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-3 gap-4 mb-16 items-start">
          {/* Joopon Section */}
          <div className="flex flex-col justify-start h-full">
            <h3 className="text-base font-bold mb-6">جوپن</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Collaboration Section */}
          <div className="flex flex-col justify-start h-full">
            <h3 className="text-base font-bold mb-6">همکاری با ما</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  تبلیغات
                </a>
              </li>
              <li>
                <a href="#" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  احراز هویت دانشجویی
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Logo and Social */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 h-6">
              <div style={{ filter: 'brightness(0) invert(1)', width: '32px', height: '32px', marginTop: '-26px' }}>
                <MainLogo />
              </div>
              <span className="text-base font-bold leading-6">جوپن</span>
            </div>
            <div>
              <p className="text-sm mb-4 opacity-80">جوپن در شبکه‌های اجتماعی:</p>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Telegram">
                  <Send size={20} />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="hover:opacity-60 transition-opacity" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-white border-opacity-20 pt-8">
          <div className="text-center text-xs opacity-70">
            <p>© ۱۴۰۴ جوپن. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
