import React from 'react';
import jooponLogo from '../assets/images/Logos/Joopon.svg';

const MainLogo = () => {
  return (
    <div className="flex items-center">
      <img 
        src={jooponLogo} 
        alt="جوپن" 
        className="h-16 w-auto"
      />
    </div>
  );
};

export default MainLogo;