import React from 'react';
import Navigation from '../components/Navigation';
import OffersSlider from '../components/OffersSlider';

const Home = () => {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IRANYekan' }}>
      <Navigation />
      <main className="safe-zone mt-20 flex flex-col gap-20 pt-36">
        <section className="flex justify-center">
          <div className="flex h-64 w-full max-w-[960px] items-center justify-center rounded-[32px] bg-[#FF6C08] text-2xl font-bold text-white">
            تخفیف به دانشجو می‌رسه
          </div>
        </section>
        <section>
          <OffersSlider />
        </section>
      </main>
    </div>
  );
};

export default Home;
