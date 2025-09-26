
import React from 'react';
import type { BloodSugarReading } from '../types';
import { Classification } from '../types';

interface ResultDisplayProps {
  result: BloodSugarReading | null;
  apiError: string | null;
}

const getResultStyles = (classification: Classification | undefined) => {
  switch (classification) {
    case Classification.High:
      return {
        bgColor: 'bg-red-100',
        borderColor: 'border-red-500',
        textColor: 'text-red-800',
        title: 'مرتفع',
      };
    case Classification.Low:
      return {
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-800',
        title: 'منخفض',
      };
    case Classification.Normal:
      return {
        bgColor: 'bg-green-100',
        borderColor: 'border-green-500',
        textColor: 'text-green-800',
        title: 'طبيعي',
      };
    default:
      return {
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-400',
        textColor: 'text-gray-800',
        title: 'نتيجة',
      };
  }
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, apiError }) => {
  if (apiError) {
    const styles = getResultStyles(Classification.High);
    return (
      <div className={`w-full max-w-lg mt-6 p-5 border-r-4 ${styles.bgColor} ${styles.borderColor} rounded-lg shadow-md transition-all duration-300`}>
        <h3 className={`text-xl font-bold ${styles.textColor}`}>خطأ في التحليل</h3>
        <p className={`mt-2 ${styles.textColor}`}>{apiError}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const styles = getResultStyles(result.classification);

  return (
    <div className={`w-full max-w-lg mt-6 p-5 border-r-4 ${styles.bgColor} ${styles.borderColor} rounded-lg shadow-md transition-all duration-300`}>
      <h3 className={`text-xl font-bold ${styles.textColor}`}>النتيجة: {styles.title}</h3>
      <p className={`mt-2 ${styles.textColor}`}>{result.advice}</p>
    </div>
  );
};

export default ResultDisplay;
