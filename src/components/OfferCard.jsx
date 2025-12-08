import React from 'react';
import { useNavigate } from 'react-router-dom';

const OfferCard = ({ image, discountText, storeName, categories = [], logo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // استفاده مستقیم از نام فارسی به عنوان URL
    navigate(`/${storeName}`);
  };

  return (
    <article className="offer-card cursor-pointer" onClick={handleClick} dir="rtl">
      <div className="offer-card__image">
        <img src={image} alt={storeName} />
        {logo && (
          <div className="offer-card__logo">
            <img src={logo} alt={`${storeName} logo`} className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2 pt-1.5 md:pt-2">
        <strong className="text-sm md:text-base font-extrabold text-[#3A3A3A]">{discountText}</strong>
        <span className="text-xs md:text-sm font-medium text-[#4A4A4A]">{storeName}</span>
        <span className="text-[10px] md:text-xs font-medium text-[#9A9A9A]">
          مخصوص دانشجویان • {categories.length > 0 ? categories[0] : ''}
        </span>
      </div>
    </article>
  );
};

export default OfferCard;
