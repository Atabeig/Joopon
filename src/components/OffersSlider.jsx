import React, { useEffect, useRef, useState } from 'react';
import OfferCard from './OfferCard';
import { getDiscounts } from '../services/api';
import flashIcon from '../assets/images/figma/flash.svg';

const CARD_WIDTH = 320;
const CARD_GAP = 12;
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
      listRef.current.scrollLeft = INITIAL_OFFSET;
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
          موارد بیشتر &lt;
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
          onClick={() => handleScroll(1)}
          className={`absolute left-6 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6C08] p-3 text-white shadow-md transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="مشاهده کارت‌های بعدی"
        >
          <img src={flashIcon} alt="scroll" className="w-4 h-4" />
        </button>
        <div
          ref={listRef}
          dir="ltr"
          className="flex overflow-x-auto pb-2"
          style={{ gap: `${CARD_GAP}px`, paddingLeft: '12px', paddingRight: '12px' }}
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
