import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const convertToPersian = (num) => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/\d/g, (digit) => persianDigits[digit]);
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  return convertToPersian(formattedTime);
};

const EmailVerificationModal = ({ isOpen, onClose, email, onVerify }) => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  useEffect(() => {
    if (isOpen) {
      setOtp('');
      setTimer(120);
      setError('');
    }
  }, [isOpen]);

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9۰-۹]/g, '');
    setOtp(convertToPersian(value));
    setError('');
  };

  const handleVerify = () => {
    if (!otp || otp.length < 4) {
      setError('لطفاً کد تایید را وارد کنید');
      return;
    }

    // TODO: Call API to verify OTP
    console.log('Verifying email OTP:', otp, 'for email:', email);
    
    // Simulate success
    onVerify(true);
    onClose();
  };

  const handleResend = () => {
    // TODO: Call API to resend OTP
    console.log('Resending OTP to email:', email);
    setTimer(120);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      onClick={onClose}
      style={{ 
        fontFamily: 'IRANYekan', 
        zIndex: 9999,
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
      }}
    >
      <div
        className="bg-white rounded-2xl relative"
        style={{
          width: '420px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(191, 191, 191, 0.5)',
          zIndex: 10000,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} className="text-[#3A3A3A]" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-[#3A3A3A] mb-2">
            تایید ایمیل
          </h2>
          <p className="text-sm text-[#4A4A4A]">
            کد تایید به ایمیل <span className="font-bold">{email}</span> ارسال شد.
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-4" dir="rtl">
          <label className="block text-sm text-[#3A3A3A] mb-2 text-right font-medium">
            کد تایید
          </label>
          <input
            type="text"
            dir="rtl"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            className={`w-full px-4 py-3 border rounded-lg text-center text-lg focus:outline-none transition-colors ${
              error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#FF6C08]'
            }`}
            placeholder="کد تایید را وارد کنید"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-xs mt-1 text-right">{error}</p>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-[#FF6C08] text-white font-bold py-3 rounded-lg hover:bg-[#ff7f1f] transition-colors mb-4"
        >
          تایید ایمیل
        </button>

        {/* Resend Timer */}
        <div className="text-center">
          {timer > 0 ? (
            <p className="text-xs text-gray-400">
              {formatTime(timer)} مانده تا دریافت مجدد کد
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm text-[#FF6C08] hover:text-[#ff7f1f] transition-colors"
            >
              ارسال مجدد کد تایید
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationModal;
