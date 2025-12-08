import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import MainLogo from '../components/MainLogo';
import JalaliDateSelector from '../components/JalaliDateSelector';
import EmailVerificationModal from '../components/EmailVerificationModal';
import BottomNavigation from '../components/BottomNavigation';
import { User, TicketPercent, Headphones, BookOpen } from 'lucide-react';

const AccountPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
  });
  const [emailError, setEmailError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [pendingEmailChange, setPendingEmailChange] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('jooponUser');
      const storedPhone = localStorage.getItem('jooponPhone');

      // Debug log to inspect stored data during development
      console.log('AccountPage localStorage', { storedUser, storedPhone });

      if (storedUser) {
        const data = JSON.parse(storedUser);
        let phone = data.phone || '';
        setIsEmailVerified(!!data.emailVerified);
        // Fallback: if phone is missing from user object, try separate phone key used during login
        if (!phone) {
          if (storedPhone) {
            phone = storedPhone;
          }
        }
        const userEmail = data.email || '';
        setOriginalEmail(userEmail);
        setFormData((prev) => ({
          ...prev,
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          phone,
          email: userEmail,
          birthYear: data.birthYear || '',
          birthMonth: data.birthMonth || '',
          birthDay: data.birthDay || '',
        }));
      } else if (storedPhone) {
        // If there is no user object yet but we do have a stored phone from login,
        // at least show that phone number in the account form.
        setFormData((prev) => ({
          ...prev,
          phone: storedPhone,
        }));
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  }, []);

  const validateStudentEmail = (email) => {
    if (!email || email.trim() === '') {
      return '';
    }

    const trimmedEmail = email.trim().toLowerCase();
    
    // Check for gmail or other common non-academic domains
    const nonAcademicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com'];
    const isNonAcademic = nonAcademicDomains.some(domain => trimmedEmail.endsWith(domain));
    
    if (isNonAcademic) {
      const firstName = formData.firstName || 'کاربر';
      return `${firstName} عزیز، باید ایمیل دانشجویی‌تون رو وارد کنید.`;
    }

    // Check for academic domains (.ac.ir or .edu)
    const isAcademicIran = trimmedEmail.endsWith('.ac.ir');
    const isAcademicEdu = trimmedEmail.endsWith('.edu');
    
    if (!isAcademicIran && !isAcademicEdu) {
      const firstName = formData.firstName || 'کاربر';
      return `${firstName} عزیز، باید ایمیل دانشجویی‌تون رو وارد کنید.`;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasChanges(true);
    setSaveMessage('');
    setSaveStatus(null);
    
    // Check if email changed
    if (name === 'email') {
      setEmailError('');
      if (value !== originalEmail) {
        setPendingEmailChange(true);
        setIsEmailVerified(false);
      } else {
        setPendingEmailChange(false);
      }
    }
  };

  const handleBirthDateChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: String(value),
    }));
    setHasChanges(true);
    setSaveMessage('');
    setSaveStatus(null);
  };

  const handleSave = () => {
    // Check if email changed and needs verification
    if (pendingEmailChange && formData.email && formData.email.trim() !== '') {
      // Validate student email
      const emailValidationError = validateStudentEmail(formData.email);
      if (emailValidationError) {
        setEmailError(emailValidationError);
        return;
      }

      // TODO: Call API to send OTP to email
      console.log('Sending OTP to email:', formData.email);
      setShowEmailVerification(true);
      return;
    }

    // Save without email verification
    saveUserData();
  };

  const saveUserData = () => {
    setIsSaving(true);
    setSaveMessage('');
    setSaveStatus(null);

    try {
      const stored = localStorage.getItem('jooponUser');
      const existing = stored ? JSON.parse(stored) : {};

      const firstName = formData.firstName ? formData.firstName.trim() : '';
      const lastName = formData.lastName ? formData.lastName.trim() : '';
      const displayName = [firstName, lastName].filter(Boolean).join(' ');

      const updatedUser = {
        ...existing,
        firstName,
        lastName,
        displayName,
        phone: formData.phone ? formData.phone.trim() : '',
        email: formData.email ? formData.email.trim() : '',
        birthYear: formData.birthYear,
        birthMonth: formData.birthMonth,
        birthDay: formData.birthDay,
        emailVerified: isEmailVerified,
      };

      localStorage.setItem('jooponUser', JSON.stringify(updatedUser));
      setSaveMessage('تغییرات با موفقیت ذخیره شد.');
      setSaveStatus('success');
      setHasChanges(false);
      setOriginalEmail(formData.email);
      setPendingEmailChange(false);
    } catch (error) {
      console.error('Failed to save user data', error);
      setSaveMessage('خطا در ذخیره تغییرات');
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEmailVerified = (verified) => {
    if (verified) {
      setIsEmailVerified(true);
      saveUserData();
    }
  };

  const headerName = (formData.firstName || formData.lastName)
    ? `${formData.firstName} ${formData.lastName}`.trim()
    : 'نام و نام‌خانوادگی';

  const saveButtonColor = hasChanges ? '#FF6C08' : '#FFB380';

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'IRANYekan' }}>
      <main className="flex-1 flex flex-col">
        {/* Top header area */}
        <div className="w-full" style={{ marginTop: '16px', borderBottom: '1px solid #E2E2E2' }}>
          <div
            className="safe-zone flex items-center justify-between py-4"
          >
            <MainLogo />
            <div className="text-sm text-[#3A3A3A]">{headerName}</div>
          </div>
        </div>

        {/* Content area */}
        <div className="w-full" style={{ padding: '40px 0 80px 0' }}>
          <div
            className="safe-zone"
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {/* Side menu card (right side) */}
            <aside className="hidden md:block" style={{ width: '260px' }}>
              <div
                className="bg-white rounded-2xl border text-sm"
                style={{ borderColor: '#E2E2E2', padding: '16px' }}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1"
                  style={{ backgroundColor: '#FFF7F1', color: '#FF6C08', fontWeight: 600 }}
                >
                  <span>حساب کاربری</span>
                  <User size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = '/coupons'}
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1 hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>کوپن‌های من</span>
                  <TicketPercent size={18} className="text-gray-500" />
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl mb-1 hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>پشتیبانی</span>
                  <Headphones size={18} className="text-gray-500" />
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-2 py-3 rounded-xl hover:bg-gray-50"
                  style={{ color: '#3A3A3A' }}
                >
                  <span>راهنمای استفاده</span>
                  <BookOpen size={18} className="text-gray-500" />
                </button>
              </div>
            </aside>

            {/* Main account card (center/left) */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  width: '100%',
                  maxWidth: '640px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E2E2E2',
                  padding: '32px 40px',
                }}
              >
                <h1 className="text-xl font-bold text-center mb-8" style={{ color: '#3A3A3A' }}>
                  حساب کاربری
                </h1>

                {/* Name row */}
                <div className="grid grid-cols-2 gap-4 mb-4" dir="rtl">
                  <div className="flex flex-col text-right">
                    <label className="mb-2 text-sm" style={{ color: '#3A3A3A' }}>
                      نام
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg text-right text-sm focus:outline-none focus:border-[#FF6C08]"
                      style={{ borderColor: '#E2E2E2' }}
                    />
                  </div>
                  <div className="flex flex-col text-right">
                    <label className="mb-2 text-sm" style={{ color: '#3A3A3A' }}>
                      نام‌خانوادگی
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg text-right text-sm focus:outline-none focus:border-[#FF6C08]"
                      style={{ borderColor: '#E2E2E2' }}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-4" dir="rtl">
                  <label className="mb-2 block text-sm text-right" style={{ color: '#3A3A3A' }}>
                    شماره موبایل
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg text-right text-sm focus:outline-none focus:border-[#FF6C08]"
                    style={{ borderColor: '#E2E2E2' }}
                  />
                </div>

                {/* Birth date */}
                <div className="mb-4" dir="rtl">
                  <JalaliDateSelector
                    day={formData.birthDay}
                    month={formData.birthMonth}
                    year={formData.birthYear}
                    onChange={handleBirthDateChange}
                  />
                </div>

                {/* Email */}
                <div className="mb-6" dir="rtl">
                  <div
                    className="mb-2 flex items-center justify-between"
                    style={{ direction: 'rtl' }}
                  >
                    <label className="text-sm" style={{ color: '#3A3A3A' }}>
                      آدرس ایمیل دانشجویی
                    </label>
                    {!isEmailVerified && (
                      <span
                        className="text-xs rounded-full"
                        style={{
                          color: '#DC2626',
                          border: '1px solid #FCA5A5',
                          padding: '2px 10px',
                        }}
                      >
                        تایید نشده
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg text-right text-sm focus:outline-none ${
                      emailError ? 'border-red-500 focus:border-red-500' : 'focus:border-[#FF6C08]'
                    }`}
                    style={{ borderColor: emailError ? '#EF4444' : '#E2E2E2' }}
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs mt-1 text-right">{emailError}</p>
                  )}
                </div>

                {/* Save button */}
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full py-3 rounded-lg text-white font-bold text-sm transition-colors"
                  style={{ backgroundColor: saveButtonColor }}
                >
                  {isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                </button>

                {saveMessage && (
                  <p
                    className={`mt-3 text-center text-xs ${
                      saveStatus === 'error' ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavigation />

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={formData.email}
        onVerify={handleEmailVerified}
      />
    </div>
  );
};

export default AccountPage;
