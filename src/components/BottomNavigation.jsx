import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, TicketPercent } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('jooponUser');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to read user data', error);
    }
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleCouponsClick = () => {
    if (user) {
      navigate('/coupons');
    } else {
      navigate('/login');
    }
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className="md:hidden bg-white border-t"
      style={{ 
        borderColor: '#E2E2E2',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.08)',
        fontFamily: 'IRANYekan',
        zIndex: 9999,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%'
      }}
    >
      <div className="flex items-center justify-around" style={{ height: '64px' }}>
        {/* Home */}
        <button
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          style={{
            color: isActive('/') ? '#FF6C08' : '#4A4A4A'
          }}
        >
          <Home size={24} strokeWidth={isActive('/') ? 2.5 : 2} />
          <span className="text-xs mt-1" style={{ fontWeight: isActive('/') ? 600 : 400 }}>
            خانه
          </span>
        </button>

        {/* My Coupons */}
        <button
          onClick={handleCouponsClick}
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          style={{
            color: isActive('/coupons') ? '#FF6C08' : '#4A4A4A'
          }}
        >
          <TicketPercent size={24} strokeWidth={isActive('/coupons') ? 2.5 : 2} />
          <span className="text-xs mt-1" style={{ fontWeight: isActive('/coupons') ? 600 : 400 }}>
            کوپن‌های من
          </span>
        </button>

        {/* Profile */}
        <button
          onClick={handleProfileClick}
          className="flex flex-col items-center justify-center flex-1 h-full transition-colors"
          style={{
            color: isActive('/account') ? '#FF6C08' : '#4A4A4A'
          }}
        >
          <User size={24} strokeWidth={isActive('/account') ? 2.5 : 2} />
          <span className="text-xs mt-1" style={{ fontWeight: isActive('/account') ? 600 : 400 }}>
            حساب کاربری
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
