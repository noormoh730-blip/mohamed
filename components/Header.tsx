
import React from 'react';

const PharmacyIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <PharmacyIcon />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">مراقب السكر في الدم</h1>
          <p className="text-md text-teal-600 font-semibold">برعاية صيدلية الدكتور محمد حامد</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
