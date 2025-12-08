import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import OfferCard from './OfferCard';
import giftaccPoster from '../assets/images/stores/Giftacc_Poster.jpg';
import janebiPoster from '../assets/images/stores/Janebi_Poster.jpg';
import tapsiPoster from '../assets/images/stores/Tapsi_Poster.jpg';
import giftaccLogo from '../assets/images/Logos/giftac_logo.svg';
import janebiLogo from '../assets/images/Logos/janebi_logo.svg';
import tapsiLogo from '../assets/images/Logos/tapsishop_logo.svg';

const CARD_WIDTH = 320;
const CARD_GAP = 4;

const JooponExclusiveSlider = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // مخصوص جوپن
    const exclusiveOffers = [
      {
        id: 'exclusive-1',
        image: giftaccPoster,
        discountText: 'تا ۳۵ درصد تخفیف',
        storeName: 'گیفتک',
        type: 'percentage',
        categories: ['سرگرمی'],
        logo: giftaccLogo,
      },
      {
        id: 'exclusive-2',
        image: janebiPoster,
        discountText: '۲۵ درصد تخفیف خرید اول',
        storeName: 'جانبی',
        type: 'first_purchase',
        categories: ['تکنولوژی و دیجیتال'],
        logo: janebiLogo,
      },
      {
        id: 'exclusive-3',
        image: tapsiPoster,
        discountText: 'تا ۳۰ درصد تخفیف',
        storeName: 'تپسی‌شاپ',
        type: 'percentage',
        categories: ['تکنولوژی و دیجیتال'],
        logo: tapsiLogo,
      },
    ];
    setItems(exclusiveOffers);
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
        <h2 className="text-xl md:text-2xl font-bold text-[#3A3A3A]">مخصوص جوپن</h2>
        <button
          type="button"
          onClick={() => navigate('/joopon-exclusive')}
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

export default JooponExclusiveSlider;
