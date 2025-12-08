import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import OfferCard from './OfferCard';
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

const CARD_WIDTH = 320;
const CARD_GAP = 4;

const NewOffersSlider = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // تخفیف‌های جدید
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
        storeName: 'تیوال',
        type: 'percentage',
        categories: ['سرگرمی'],
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

  useEffect(() => {
    if (items.length && listRef.current) {
      listRef.current.scrollLeft = 0;
    }
  }, [items.length]);

  const handleScroll = (direction) => {
    if (!listRef.current) return;
    const distance = CARD_WIDTH + CARD_GAP;
    listRef.current.scrollBy({
      left: direction * distance,
      behavior: 'smooth',
    });
  };

  return (
    <section className="flex flex-col gap-6" style={{ fontFamily: 'IRANYekan' }}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-[#3A3A3A]">تخفیف‌های جدید</h2>
        <button
          type="button"
          onClick={() => navigate('/new-discounts')}
          className="flex items-center gap-1 text-xs md:text-sm font-semibold text-[#FF6C08]"
        >
          <span>موارد بیشتر</span>
          <ChevronLeft size={16} className="hidden md:inline" />
          <ChevronLeft size={14} className="md:hidden" />
        </button>
      </div>
      <div 
        ref={containerRef}
        className="relative overflow-hidden w-full md:w-[1200px] md:mx-auto" 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => handleScroll(-1)}
          className={`hidden md:flex absolute left-6 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6C08] p-3 text-white shadow-md transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="مشاهده کارت‌های بعدی"
        >
          <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.5 25H11M11 25L20 16M11 25L20 34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
        <div
          ref={listRef}
          className="flex overflow-x-auto pb-2 touch-pan-x"
          style={{ 
            gap: `${CARD_GAP}px`, 
            paddingLeft: '6px', 
            paddingRight: '4px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {items.map((item) => (
            <OfferCard key={item.id} {...item} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => handleScroll(1)}
          className={`hidden md:flex absolute right-6 top-1/2 z-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#A8A8A8] p-3 text-white shadow-md transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="مشاهده کارت‌های قبلی"
        >
          <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5 25H39M39 25L30 16M39 25L30 34" stroke="white" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default NewOffersSlider;
