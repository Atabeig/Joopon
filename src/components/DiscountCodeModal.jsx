import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import starIcon from '../assets/images/icons/icon_star.svg';

const DiscountCodeModal = ({ isOpen, onClose, discountCode, userName = 'جوپن', storeName, storeLogo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" dir="rtl">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        {/* Star icon */}
        <div className="flex justify-center mb-4">
          <img src={starIcon} alt="star" className="w-12 h-12" />
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-bold text-[#3A3A3A] mb-6">
          {userName} عزیز، این کد تخفیف مخصوص شماست
        </h2>

        {/* Discount code */}
        <div className="border-2 border-dashed border-[#FF6C08] rounded-lg p-4 mb-6 flex items-center justify-between bg-orange-50">
          <code className="text-lg font-bold text-[#3A3A3A] tracking-wider">
            {discountCode}
          </code>
          <button
            onClick={handleCopy}
            className="text-[#FF6C08] hover:text-[#e65c00] transition-colors"
            title="کپی کن"
          >
            {copied ? (
              <Check size={20} className="text-green-500" />
            ) : (
              <Copy size={20} />
            )}
          </button>
        </div>

        {/* Store info */}
        {storeLogo && (
          <div className="flex justify-center">
            <img src={storeLogo} alt={storeName} className="h-12 w-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountCodeModal;
