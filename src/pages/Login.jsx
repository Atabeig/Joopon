import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MainLogo from '../components/MainLogo';

const convertToPersian = (num) => {
  // First convert any Persian numbers to English for processing
  const persianToEnglish = String(num)
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  
  // Then convert back to Persian for display
  return persianToEnglish
    .replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return convertToPersian(formattedTime);
};

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [timer, setTimer] = useState(0);
  const [phoneError, setPhoneError] = useState('');
  const phoneInputRef = useRef(null);
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    if (number.length === 0) {
      return '';
    }
    // Convert to English for validation
    const englishNumber = number.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    if (englishNumber.length !== 11 || !englishNumber.startsWith('09')) {
      return 'شماره موبایل نادرست است.';
    }
    return '';
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    // Keep only digits (both English and Persian)
    value = value.replace(/[^0-9۰-۹]/g, '');
    // Convert to Persian for display
    setPhoneNumber(convertToPersian(value));
    setPhoneError('');
  };

  const handlePhoneSubmit = () => {
    const error = validatePhoneNumber(phoneNumber);
    if (error) {
      setPhoneError(error);
      return;
    }
    setPhoneError('');
    // TODO: Call API to send OTP
    console.log('Sending OTP to:', phoneNumber);
    setStep('otp');
    setTimer(120);
  };

  const handleOtpSubmit = () => {
    // TODO: Call API to verify OTP
    console.log('Verifying OTP:', otp);
    // For new users, navigate to signup
    try {
      const englishNumber = phoneNumber.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
      localStorage.setItem('jooponPhone', englishNumber);
      // Also sync phone into existing user data if present, so account page can show it
      try {
        const existingUserRaw = localStorage.getItem('jooponUser');
        if (existingUserRaw) {
          const existingUser = JSON.parse(existingUserRaw);
          const updatedUser = { ...existingUser, phone: englishNumber };
          localStorage.setItem('jooponUser', JSON.stringify(updatedUser));
        }
      } catch (innerError) {
        console.error('Failed to sync phone into user data', innerError);
      }
    } catch (error) {
      console.error('Failed to store phone number', error);
    }
    navigate('/signup');
  };

  const handleResendOtp = () => {
    // TODO: Call API to resend OTP
    console.log('Resending OTP to:', phoneNumber);
    setTimer(120);
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
      setTimer(0);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ fontFamily: 'IRANYekan' }}>
      <div
        className="bg-white rounded-lg relative"
        style={{
          width: '420px',
          height: '600px',
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
          {step === 'phone' ? (
            <>
              {/* Title */}
              <div className="w-full text-center">
                <h1 className="text-2xl font-bold text-[#3A3A3A] mb-8">ورود یا ثبت‌نام</h1>
              </div>

              {/* Phone Input */}
              <div className="w-full">
                <label className="block text-sm  text-[#3A3A3A] mb-2 text-right font-medium">
                 لطفا شماره موبایل خود را وارد کنید.
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  inputMode="tel"
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={11}
                  className={`w-full px-4 py-3 border rounded-lg text-left placeholder:text-gray-400 text-md placeholder:font-regular focus:outline-none transition-colors ${
                    phoneError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#FF6C08]'
                  }`}
                  style={{ textAlign: 'left', direction: 'ltr' }}
                />
                {phoneError && (
                  <p className="text-red-500 text-xs mt-1 text-right">{phoneError}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                onClick={handlePhoneSubmit}
                className="w-full bg-[#FF6C08] text-white font-bold py-3 rounded-lg hover:bg-[#ff7f1f] transition-colors mt-4"
              >
                ورود به جوپن
              </button>

              {/* Terms */}
              <div className="mt-8 text-center text-xs text-gray-400">
                <p>
               {'ورود شما به معنای پذیرش '}
                  <a href="#" className="text-[#4A4AFF]">
                    شرایط جوپن
                  </a>
                  {' است.'}
                </p>
              </div>
            </>
          ) : (
            <>
              {/* OTP Title */}
              <div className="w-full text-center mb-4">
                <h1 className="text-2xl font-bold text-[#3A3A3A] mb-4">ورود یا ثبت‌نام</h1>
              </div>

              {/* OTP Label */}
              <div className="w-full text-right mb-0">
                <label className="block text-lg font-bold text-[#3A3A3A] mb-2">
                 کد تایید را وارد کنید
                </label>
                <p className="text-xs text-gray-600 mb-3">
                 کد تایید به شماره {convertToPersian(phoneNumber)} ارسال شد.
                </p>
              </div>

              {/* OTP Input */}
              <input
                type="text"
                dir="rtl"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right placeholder:text-gray-400 placeholder:font-regular focus:outline-none focus:border-[#FF6C08] transition-colors"
                placeholder="کد تایید"
              />

              {/* Verify Button */}
              <button
                onClick={handleOtpSubmit}
                className="w-full bg-[#FF6C08] text-white font-bold py-3 rounded-lg hover:bg-[#ff7f1f] transition-colors mt-4"
              >
                تایید
              </button>

              {/* Resend OTP Timer */}
              <div className="w-full text-center mt-6">
                {timer > 0 ? (
                  <p className="text-xs text-gray-400 font-regular">
                    {formatTime(timer)} مانده تا دریافت مجدد کد
                  </p>
                ) : (
                  <button
                    onClick={handleResendOtp}
                    className="text-xs text-[#4A4AFF] font-regular hover:text-[#ff7f1f] transition-colors"
                  >
                    دریافت مجدد کد
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
