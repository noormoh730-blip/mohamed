
import React, { useState } from 'react';

interface InputFormProps {
  onSubmit: (reading: number) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [reading, setReading] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const readingValue = parseInt(reading, 10);
    if (isNaN(readingValue) || readingValue <= 0 || readingValue > 600) {
      setError('الرجاء إدخال رقم صحيح بين 1 و 600.');
      return;
    }
    setError('');
    onSubmit(readingValue);
    setReading('');
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="sugar-level" className="block text-lg font-semibold text-gray-700 mb-2">
          أدخل قراءة السكر (mg/dL)
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="sugar-level"
            type="number"
            value={reading}
            onChange={(e) => setReading(e.target.value)}
            placeholder="مثال: 120"
            className="flex-grow w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition duration-200"
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto bg-teal-500 text-white font-bold text-lg px-8 py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? '...' : 'تحليل'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default InputForm;
