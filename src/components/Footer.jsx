import React from 'react';
import { Send, Linkedin, Twitter } from 'lucide-react';
import JooponLogoNoText from '../assets/images/Logos/joopon_withouttezt.svg';

const Footer = () => {
  return (
    <footer className="bg-[#4A4A4A] text-white pb-16 md:pb-0" style={{ fontFamily: 'IRANYekan', marginBottom: 0 }}>
      <div className="safe-zone py-8 md:py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-4 mb-8 md:mb-16 items-start">
          {/* Right Section - Logo and Social (First on mobile) */}
          <div className="flex flex-col gap-6 md:order-3">
            <div className="flex items-center gap-2 h-6">
              <div style={{ width: '32px', height: '32px', marginTop: '0px', filter: 'brightness(0) invert(1)' }}>
                <img
                  src={JooponLogoNoText}
                  alt="Joopon logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-base font-bold leading-6">جوپن</span>
            </div>
            <div>
              <p className="text-sm mb-4 opacity-80">جوپن در شبکه‌های اجتماعی:</p>
              <div className="flex items-center gap-3">
                <a 
                  href="https://t.me/Joo_pon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity" 
                  aria-label="Telegram"
                >
                  <Send size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/company/joopon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity" 
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://x.com/jooponstudent" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity" 
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Joopon Section */}
          <div className="flex flex-col justify-start h-full md:order-1">
            <h3 className="text-base font-bold mb-4 md:mb-6">جوپن</h3>
            <ul className="space-y-2 md:space-y-3">
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
          <div className="flex flex-col justify-start h-full md:order-2">
            <h3 className="text-base font-bold mb-4 md:mb-6">همکاری با ما</h3>
            <ul className="space-y-2 md:space-y-3">
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
        </div>

        {/* Bottom Divider */}
        <div className="text-center text-xs opacity-70">
          <p>کلیه حقوق این سایت متعلق به جوپن می‌باشد.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
