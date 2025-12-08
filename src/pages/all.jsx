import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Home, ChevronLeft } from 'lucide-react';
import { getDiscounts } from '../services/api';
import OfferCard from '../components/OfferCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';

const AllDiscountsPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  // Map category query param to display names
  const categoryMap = {
    'food': 'غذا و نوشیدنی',
    'beauty': 'زیبایی و سلامت',
    'tech': 'تکنولوژی و دیجیتال',
    'education': 'آموزش'
  };

  useEffect(() => {
    getDiscounts().then((data) => {
      setDiscounts(data);
    });
  }, []);

  // Filter discounts by category if category param exists
  const filteredDiscounts = category && categoryMap[category]
    ? discounts.filter(discount => 
        discount.categories && discount.categories.includes(categoryMap[category])
      )
    : discounts;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'IRANYekan' }}>
      <Navigation />
      
      {/* Decorative Gradient Bar - Only show when no category selected */}
      {!category && (
        <div 
          className="relative left-0 right-0 z-20 pointer-events-none"
          style={{
            height: '80px',
            background: 'linear-gradient(to bottom, transparent 0%, transparent 100%), linear-gradient(to left, #FFFFFF 0%, #FFCA80 35%, #FFFF99 55%, #FFFFFF 100%)',
            WebkitMask: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
            mask: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
      )}

      {/* Breadcrumb - Show only when category is selected */}
      {category && (
        <div className="w-full px-4 md:px-[120px] pt-3 md:pt-[12px] mb-4 md:mb-6">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <Link to="/" className="flex items-center text-gray-500 hover:text-gray-600 transition-colors">
              <Home size={14} className="md:w-4 md:h-4 ml-1" />
              <span className="hidden md:inline">خانه</span>
            </Link>
            <ChevronLeft size={12} className="md:w-[14px] md:h-[14px] text-gray-400" />
            <span className="text-orange-500 font-medium">{categoryMap[category]}</span>
          </nav>
        </div>
      )}

      {/* Discounts Grid */}
      <main className="safe-zone py-6 md:py-12">
        <div 
          className="grid gap-4 md:gap-6 justify-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          }}
        >
          {filteredDiscounts.map((discount) => (
            <OfferCard key={discount.id} {...discount} />
          ))}
        </div>
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
      </main>

      <Footer />
      <BottomNavigation />
    </div>
  );
};

export default AllDiscountsPage;
