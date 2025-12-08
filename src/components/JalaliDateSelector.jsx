import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const convertToPersian = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => persianDigits[digit]);
};

const JALALI_MONTHS = [
  { value: '1', label: 'فروردین' },
  { value: '2', label: 'اردیبهشت' },
  { value: '3', label: 'خرداد' },
  { value: '4', label: 'تیر' },
  { value: '5', label: 'مرداد' },
  { value: '6', label: 'شهریور' },
  { value: '7', label: 'مهر' },
  { value: '8', label: 'آبان' },
  { value: '9', label: 'آذر' },
  { value: '10', label: 'دی' },
  { value: '11', label: 'بهمن' },
  { value: '12', label: 'اسفند' },
];

const CURRENT_JALALI_YEAR = 1404;
const YEAR_RANGE = 60;

const CustomDropdown = ({ value, placeholder, options, onChange, isOpen, onToggle }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onToggle(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const selectedOption = options.find((opt) => String(opt.value) === String(value));
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => onToggle(!isOpen)}
        className="w-full px-3 py-2.5 border rounded-lg text-center text-sm focus:outline-none bg-white flex items-center justify-between"
        style={{
          borderColor: '#E2E2E2',
          color: value ? '#3A3A3A' : '#9CA3AF',
          backgroundColor: '#F5F5F7',
        }}
      >
        <div style={{ width: '18px' }} />
        <span>{displayText}</span>
        <ChevronDown 
          size={18} 
          style={{ color: '#3A3A3A' }} 
          className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden"
          style={{
            border: '1px solid #E2E2E2',
            maxHeight: '240px',
          }}
        >
          <div
            className="overflow-y-auto"
            style={{
              maxHeight: '240px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#FF6C08 #F5F5F7',
            }}
          >
            {options.map((option) => {
              const isSelected = String(value) === String(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    onToggle(false);
                  }}
                  className="w-full px-4 py-3 text-center text-sm hover:bg-gray-50 transition-colors relative"
                  style={{
                    color: '#3A3A3A',
                    backgroundColor: isSelected ? '#F0F4FF' : 'transparent',
                    borderLeft: isSelected ? '4px solid #FF6C08' : '4px solid transparent',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const JalaliDateSelector = ({
  label = 'تاریخ تولد',
  day,
  month,
  year,
  onChange,
  error,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const years = Array.from({ length: YEAR_RANGE }, (_, index) => CURRENT_JALALI_YEAR - index);

  const numericMonth = parseInt(month, 10);
  let maxDays = 31;
  if (!Number.isNaN(numericMonth)) {
    if (numericMonth >= 7 && numericMonth <= 12) {
      maxDays = 30;
    }
  }

  const days = Array.from({ length: maxDays }, (_, index) => ({
    value: String(index + 1),
    label: convertToPersian(index + 1),
  }));

  const yearOptions = years.map((y) => ({
    value: String(y),
    label: convertToPersian(y),
  }));

  const handleToggle = (dropdownName) => (isOpen) => {
    setOpenDropdown(isOpen ? dropdownName : null);
  };

  const handleChange = (field) => (value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div className="w-full" dir="rtl">
      <label className="block text-sm mb-2 text-right" style={{ color: '#3A3A3A' }}>
        {label}
      </label>
      <div className="grid grid-cols-3 gap-2 w-full">
        <CustomDropdown
          value={day}
          placeholder="روز"
          options={days}
          onChange={handleChange('birthDay')}
          isOpen={openDropdown === 'day'}
          onToggle={handleToggle('day')}
        />

        <CustomDropdown
          value={month}
          placeholder="ماه"
          options={JALALI_MONTHS}
          onChange={handleChange('birthMonth')}
          isOpen={openDropdown === 'month'}
          onToggle={handleToggle('month')}
        />

        <CustomDropdown
          value={year}
          placeholder="سال"
          options={yearOptions}
          onChange={handleChange('birthYear')}
          isOpen={openDropdown === 'year'}
          onToggle={handleToggle('year')}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 text-right">
          {error}
        </p>
      )}
    </div>
  );
};

export default JalaliDateSelector;
