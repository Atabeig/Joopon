import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MainLogo from '../components/MainLogo';
import JalaliDateSelector from '../components/JalaliDateSelector';

const convertToPersian = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => persianDigits[digit]);
};

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For birth date fields, convert numbers to Persian and ensure proper RTL
    let convertedValue = value;
    if (['birthYear', 'birthMonth', 'birthDay'].includes(name)) {
      // Convert to Persian digits
      convertedValue = convertToPersian(value);
      
      // Ensure the cursor stays at the end of the input
      // This is a workaround for RTL input issues
      setTimeout(() => {
        const input = e.target;
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }, 0);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: convertedValue,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleBirthDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: String(value),
    }));

    if (errors.birthDate) {
      setErrors((prev) => ({
        ...prev,
        birthDate: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
    }

    if (!formData.gender) {
      newErrors.gender = 'جنسیت الزامی است';
    }

    if (!formData.birthYear || !formData.birthMonth || !formData.birthDay) {
      newErrors.birthDate = 'تاریخ تولد الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Call API to complete signup
      console.log('Signup data:', formData);
      try {
        const firstName = formData.firstName ? formData.firstName.trim() : '';
        const lastName = formData.lastName ? formData.lastName.trim() : '';
        const displayName = [firstName, lastName].filter(Boolean).join(' ');
        let phone = '';
        try {
          const storedPhone = localStorage.getItem('jooponPhone');
          if (storedPhone) {
            phone = storedPhone;
          }
        } catch (error) {
          console.error('Failed to read stored phone number', error);
        }

        const userData = {
          firstName,
          lastName,
          displayName,
          gender: formData.gender,
          birthYear: formData.birthYear,
          birthMonth: formData.birthMonth,
          birthDay: formData.birthDay,
          phone,
          email: '',
        };

        localStorage.setItem('jooponUser', JSON.stringify(userData));
      } catch (error) {
        console.error('Failed to store user data', error);
      }
      navigate('/');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ fontFamily: 'IRANYekan' }}>
      <div
        className="bg-white rounded-lg relative"
        style={{
          width: '420px',
          height: '700px',
          boxShadow: '0 4px 20px rgba(191, 191, 191, 0.5)',
        }}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight size={24} className="text-[#3A3A3A]" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center pt-12">
          <MainLogo />
        </div>

        {/* Form Container */}
        <div className="flex flex-col items-center px-8 gap-4" style={{ marginTop: '40px' }}>
          {/* Title */}
          <div className="w-full text-center mb-4">
            <h1 className="text-2xl font-bold text-[#3A3A3A]">بیشتر از خودتان بگویید</h1>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-4 w-full">
          {/* First Name */}
          <div className="w-full">
            <label className="block text-sm text-[#3A3A3A] mb-2 text-right font-medium">نام</label>
            <input
              type="text"
              name="firstName"
              dir="rtl"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none transition-colors text-sm ${
                errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#FF6C08]'
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1 text-right">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="w-full">
            <label className="block text-sm text-[#3A3A3A] mb-2 text-right font-medium">نام‌خانوادگی</label>
            <input
              type="text"
              name="lastName"
              dir="rtl"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none transition-colors text-sm ${
                errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#FF6C08]'
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1 text-right">{errors.lastName}</p>}
          </div>

          {/* Gender Selection */}
          <div className="w-full">
            <label className="block text-sm text-[#3A3A3A] mb-2 text-right font-medium">جنسیت خود را انتخاب کنید</label>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => handleInputChange({ target: { name: 'gender', value: 'male' } })}
                className={`flex-1 px-4 py-3 rounded-lg font-regular transition-colors border ${
                  formData.gender === 'male'
                    ? 'bg-[#FF6C08] text-white border-[#FF6C08]'
                    : 'bg-white border-gray-300 text-[#3A3A3A] hover:border-[#FF6C08]'
                }`}
              >
                مرد
              </button>
              <button
                onClick={() => handleInputChange({ target: { name: 'gender', value: 'female' } })}
                className={`flex-1 px-4 py-3 rounded-lg font-regular transition-colors border ${
                  formData.gender === 'female'
                    ? 'bg-[#FF6C08] text-white border-[#FF6C08]'
                    : 'bg-white border-gray-300 text-[#3A3A3A] hover:border-[#FF6C08]'
                }`}
              >
                زن
              </button>
            </div>
            {errors.gender && <p className="text-red-500 text-xs mt-1 text-right">{errors.gender}</p>}
          </div>

          {/* Birth Date */}
          <div className="w-full">
            <JalaliDateSelector
              label="تاریخ تولد خود را انتخاب کنید"
              day={formData.birthDay}
              month={formData.birthMonth}
              year={formData.birthYear}
              onChange={handleBirthDateChange}
              error={errors.birthDate}
            />
          </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#FF6C08] text-white font-bold py-3 rounded-lg hover:bg-[#ff7f1f] transition-colors mt-4"
            >
              شروع کنید
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
