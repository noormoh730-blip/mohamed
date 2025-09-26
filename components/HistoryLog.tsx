
import React from 'react';
import type { BloodSugarReading } from '../types';
import { Classification } from '../types';

interface HistoryLogProps {
  readings: BloodSugarReading[];
  onClear: () => void;
}

const getClassificationChipStyle = (classification: Classification) => {
  switch (classification) {
    case Classification.High:
      return 'bg-red-200 text-red-800';
    case Classification.Low:
      return 'bg-blue-200 text-blue-800';
    case Classification.Normal:
      return 'bg-green-200 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const HistoryLog: React.FC<HistoryLogProps> = ({ readings, onClear }) => {
  if (readings.length === 0) {
    return (
      <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">سجل القراءات</h2>
        <p className="text-gray-500">لا توجد قراءات مسجلة حتى الآن.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">سجل القراءات</h2>
        <button
          onClick={onClear}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
        >
          مسح السجل
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">القراءة</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">التصنيف</th>
              <th className="p-3 text-sm font-semibold tracking-wide text-gray-600">التاريخ والوقت</th>
            </tr>
          </thead>
          <tbody>
            {readings.map((reading) => (
              <tr key={reading.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3 text-gray-800 font-medium">{reading.value} mg/dL</td>
                <td className="p-3">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getClassificationChipStyle(reading.classification)}`}>
                    {reading.classification}
                  </span>
                </td>
                <td className="p-3 text-sm text-gray-500">{new Date(reading.timestamp).toLocaleString('ar-EG')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLog;
