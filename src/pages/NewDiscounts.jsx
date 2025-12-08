import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import OfferCard from '../components/OfferCard';
import digikalaPoster from '../assets/images/stores/Digikala_Poster.jpg';
import sdfPoster from '../assets/images/stores/SDF_Poster.jpg';
import shilaPoster from '../assets/images/stores/Shila_Poster.jpg';
import khanumiPoster from '../assets/images/stores/Khanumi_Poster.jpg';
import tiwallPoster from '../assets/images/stores/Tiwall_Poster.jpg';
import digikalaLogo from '../assets/images/Logos/digikala_logo.svg';
import shilaLogo from '../assets/images/Logos/shila_logo.svg';
import khanumiLogo from '../assets/images/Logos/khanumi_logo.svg';
import tiwallLogo from '../assets/images/Logos/tiwall_logo.svg';
import sdpLogo from '../assets/images/Logos/SDF_logo.svg';

const NewDiscountsPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const newOffers = [
      {
        id: 'new-1',
        image: digikalaPoster,
        discountText: 'تا ۳۰ درصد تخفیف',
        storeName: 'دیجی‌کالا',
        type: 'percentage',
        categories: ['تکنولوژی و دیجیتال'],
        logo: digikalaLogo,
      },
      {
        id: 'new-2',
        image: shilaPoster,
        discountText: 'تا ۲۵ درصد تخفیف',
        storeName: 'شیلا',
        type: 'percentage',
        categories: ['غذا و نوشیدنی'],
        logo: shilaLogo,
      },
      {
        id: 'new-3',
        image: khanumiPoster,
        discountText: '۱۵ درصد تخفیف خرید اول',
        storeName: 'خانومی',
        type: 'first_purchase',
        categories: ['زیبایی و سلامت'],
        logo: khanumiLogo,
      },
      {
        id: 'new-4',
        image: tiwallPoster,
        discountText: 'تا ۴۰ درصد تخفیف بلیط تئاتر',
        storeName: 'تی‌وال',
        type: 'percentage',
        categories: ['سرگرمی و فرهنگ'],
        logo: tiwallLogo,
      },
      {
        id: 'new-5',
        image: sdfPoster,
        discountText: '۲۰ درصد تخفیف خرید اول',
        storeName: 'اس‌دی‌پی',
        type: 'first_purchase',
        categories: ['تکنولوژی و دیجیتال'],
        logo: sdpLogo,
      },
    ];

    setItems(newOffers);
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
            تخفیف‌های جدید
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

export default NewDiscountsPage;
