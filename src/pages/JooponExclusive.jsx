import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import OfferCard from '../components/OfferCard';
import giftaccPoster from '../assets/images/stores/Giftacc_Poster.jpg';
import janebiPoster from '../assets/images/stores/Janebi_Poster.jpg';
import tapsiPoster from '../assets/images/stores/Tapsi_Poster.jpg';
import giftaccLogo from '../assets/images/Logos/giftac_logo.svg';
import janebiLogo from '../assets/images/Logos/janebi_logo.svg';
import tapsiLogo from '../assets/images/Logos/tapsishop_logo.svg';

const JooponExclusivePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const exclusiveOffers = [
      {
        id: 'exclusive-1',
        image: giftaccPoster,
        discountText: 'تا ۳۵ درصد تخفیف',
        storeName: 'گیفت‌اکانت',
        type: 'percentage',
        categories: ['گیمینگ و سرگرمی'],
        logo: giftaccLogo,
      },
      {
        id: 'exclusive-2',
        image: janebiPoster,
        discountText: '۲۵ درصد تخفیف خرید اول',
        storeName: 'جانبی',
        type: 'first_purchase',
        categories: ['لوازم جانبی'],
        logo: janebiLogo,
      },
      {
        id: 'exclusive-3',
        image: tapsiPoster,
        discountText: 'تا ۳۰ درصد تخفیف',
        storeName: 'تپسی‌شاپ',
        type: 'percentage',
        categories: ['خرید آنلاین'],
        logo: tapsiLogo,
      },
    ];

    setItems(exclusiveOffers);
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IRANYekan' }}>
      <Navigation />

      <div 
        className="relative left-0 right-0 z-20"
        style={{
          height: '80px',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, transparent 100%), linear-gradient(to left, #FFFFFF 0%, #FFCA80 35%, #FFFF99 55%, #FFFFFF 100%)',
            WebkitMask:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
            mask:
              'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          }}
        />

        <div className="safe-zone relative z-10 h-full flex items-start justify-center">
          <h1 className="mt-12 text-center text-[32px] font-black text-[#3A3A3A]">
            مخصوص جوپن
          </h1>
        </div>
      </div>

      <main className="safe-zone pt-6 pb-12 md:pt-12">
        <div
          className="grid gap-4 md:gap-6 justify-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              main.safe-zone {
                padding-left: 16px !important;
                padding-right: 16px !important;
              }
              main.safe-zone > div.grid {
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 2px !important;
                max-width: 100%;
                justify-content: center !important;
              }
            }
          `}</style>
          {items.map((item) => (
            <OfferCard key={item.id} {...item} />
          ))}
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default JooponExclusivePage;
