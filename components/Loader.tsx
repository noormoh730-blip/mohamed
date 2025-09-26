
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      <p className="mr-3 text-gray-600">جاري التحليل...</p>
    </div>
  );
};

export default Loader;
