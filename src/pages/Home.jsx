import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import OffersSlider from '../components/OffersSlider';
import NewOffersSlider from '../components/NewOffersSlider';
import JooponExclusiveSlider from '../components/JooponExclusiveSlider';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import heroImage from '../assets/images/Hero/Hero.jpg';
import heroMobileImage from '../assets/images/Hero/Hero-mobile.webp';

const Home = () => {
  const storeNames = ['دیجی‌کالا', 'خانــومی', 'ایران‌کتاب', 'شیــــــلا', 'کجـــــــــــا'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const getDelay = () => {
      // If current is last item, wait longer
      return currentIndex === storeNames.length - 1 ? 4000 : 2500;
    };

    const timeout = setTimeout(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        // Move to next item in sequence
        const nextIndex = (currentIndex + 1) % storeNames.length;
        setCurrentIndex(nextIndex);
        setIsAnimating(false);
      }, 300);
    }, getDelay());

    return () => clearTimeout(timeout);
  }, [currentIndex, storeNames.length]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IRANYekan' }}>
      <Navigation />
      {/* Full-width hero section */}
      <div className="w-full overflow-hidden relative h-[200px] md:h-[440px]">
        {/* Desktop Hero Image */}
        <img 
          src={heroImage} 
          alt="Hero" 
          className="hidden md:block w-full h-full object-cover"
          style={{ objectPosition: 'center bottom' }}
        />
        {/* Mobile Hero Image */}
        <img 
          src={heroMobileImage} 
          alt="Hero" 
          className="md:hidden w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: '#15152A', opacity: 0.6 }}></div>
        {/* Gradient shadows from top and bottom */}
        <div className="absolute inset-0" style={{ 
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)'
        }}></div>
        
        {/* Desktop Hero Text - Single Line */}
        <div className="absolute inset-0 hidden md:flex items-center justify-center px-4">
          <h1 className="text-white text-[48px] font-black" style={{ fontFamily: 'IRANYekan', textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>از</span>
            <span 
              style={{
                display: 'inline-block',
                minWidth: '210px',
                textAlign: 'center',
                color: '#FF6C08',
                transform: isAnimating ? 'translateY(60px)' : 'translateY(0)',
                opacity: isAnimating ? 0 : 1,
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {storeNames[currentIndex]}
            </span>
            <span>چی می‌خوای بخری؟</span>
          </h1>
        </div>

        {/* Mobile Hero Text - Two Lines */}
        <div className="absolute inset-0 flex md:hidden items-center justify-center px-4">
          <h1 className="text-white text-[32px] font-black text-center" style={{ fontFamily: 'IRANYekan', textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            <div>
              <span>از </span>
              <span 
                style={{
                  display: 'inline-block',
                  minWidth: '140px',
                  textAlign: 'center',
                  color: '#FF6C08',
                  transform: isAnimating ? 'translateY(60px)' : 'translateY(0)',
                  opacity: isAnimating ? 0 : 1,
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                {storeNames[currentIndex]}
              </span>
            </div>
            <div className="mt-2">چی می‌خوای بخری؟</div>
          </h1>
        </div>
      </div>
      
      <main className="safe-zone flex flex-col" style={{ paddingTop: '40px', gap: '20px', paddingBottom: 0 }}>
        <section>
          <OffersSlider />
        </section>
        <section>
          <NewOffersSlider />
        </section>
        <section>
          <JooponExclusiveSlider />
        </section>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default Home;
