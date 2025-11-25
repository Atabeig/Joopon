import React from 'react';

const OfferCard = ({ image, discountText, storeName, categories = [], logo }) => {
  return (
    <article className="offer-card" dir="rtl">
      <div className="offer-card__image">
        <img src={image} alt={storeName} />
        {logo && (
          <div className="offer-card__logo">
            <img src={logo} alt={`${storeName} logo`} className="h-8 w-8 object-contain" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 pt-2">
        <strong className="text-base font-extrabold text-[#3A3A3A]">{discountText}</strong>
        <span className="text-sm font-medium text-[#4A4A4A]">{storeName}</span>
        <span className="text-xs font-medium text-[#9A9A9A]">
          مخصوص دانشجویان • {categories.length > 0 ? categories[0] : ''}
        </span>
      </div>
    </article>
  );
};

export default OfferCard;
