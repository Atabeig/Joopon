import React from 'react';
import { useNavigate } from 'react-router-dom';
import jooponLogo from '../assets/images/Logos/Joopon.svg';

const MainLogo = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')}
      className="flex items-center cursor-pointer"
    >
      <img 
        src={jooponLogo} 
        alt="جوپن" 
        className="h-20 md:h-20 w-auto"
      />
    </button>
  );
};

export default MainLogo;