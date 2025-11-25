import React, { useEffect, useRef, useState } from 'react';
import OfferCard from './OfferCard';
import { getDiscounts } from '../services/api';

const CARD_WIDTH = 320;
const CARD_GAP = 4;
const INITIAL_OFFSET = 0;

const OffersSlider = () => {
  const [items, setItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const listRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    getDiscounts().then((data) => {
      setItems(data);
    });
  }, []);

  useEffect(() => {
    if (items.length && listRef.current) {
  
      listRef.current.scrollLeft = listRef.current.scrollWidth;
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
        <h2 className="text-2xl font-bold text-[#3A3A3A]">محبوب‌ترین تخفیف‌ها</h2>
        <button type="button" className="text-sm font-semibold text-[#FF6C08]">
          موارد بیشتر &gt;
        </button>
      </div>
      <div 
        ref={containerRef}
        className="relative overflow-hidden" 
        style={{ width: '1200px', margin: '0 auto' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => handleScroll(-1)}
          className={`absolute left-6 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6C08] p-3 text-white shadow-md transition-opacity duration-300 ${
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
          dir="ltr"
          className="flex overflow-x-auto pb-2"
          style={{ gap: `${CARD_GAP}px`, paddingLeft: '4px', paddingRight: '6px' }}
        >
          {items.map((item) => (
            <OfferCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSlider;
