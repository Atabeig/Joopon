import React, { useState, useEffect } from 'react';
import { getDiscounts } from '../services/api';
import OfferCard from '../components/OfferCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import popularBanner from '../assets/images/Hero/popular-banner.jpg';

const PopularDiscountsPage = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    getDiscounts().then((data) => {
      // فقط فروشگاه‌های محبوب (قدیمی‌ها)
      const popularStores = ['دیجی‌کالا', 'شیلا', 'خانومی', 'ایران‌کتاب'];
      const uniqueStores = new Map();
      data.forEach((item) => {
        if (popularStores.includes(item.storeName) && !uniqueStores.has(item.storeName)) {
          uniqueStores.set(item.storeName, item);
        }
      });
      setDiscounts(Array.from(uniqueStores.values()));
    });
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IRANYekan' }}>
      <Navigation />

      <div className="w-full overflow-hidden">
        <img
          src={popularBanner}
          alt="محبوب‌ترین تخفیف‌ها"
          className="h-auto w-full object-cover"
        />
      </div>

      <main className="safe-zone py-6 md:py-12">
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
          {discounts.map((discount) => (
            <OfferCard key={discount.id} {...discount} />
          ))}
        </div>
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default PopularDiscountsPage;
