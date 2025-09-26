
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import HistoryLog from './components/HistoryLog';
import Loader from './components/Loader';
import SugarChart from './components/SugarChart';
import { classifyBloodSugar } from './services/geminiService';
import { Classification } from './types';
import type { BloodSugarReading } from './types';

const App: React.FC = () => {
  const [readings, setReadings] = useState<BloodSugarReading[]>([]);
  const [latestResult, setLatestResult] = useState<BloodSugarReading | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedReadings = localStorage.getItem('bloodSugarReadings');
      if (storedReadings) {
        setReadings(JSON.parse(storedReadings));
      }
    } catch (error) {
      console.error("Failed to parse readings from localStorage", error);
      // If parsing fails, clear the corrupted data
      localStorage.removeItem('bloodSugarReadings');
    }
  }, []);

  useEffect(() => {
    try {
        localStorage.setItem('bloodSugarReadings', JSON.stringify(readings));
    } catch (error) {
        console.error("Failed to save readings to localStorage", error);
    }
  }, [readings]);

  const handleNewReading = async (value: number) => {
    setIsLoading(true);
    setApiError(null);
    setLatestResult(null);

    try {
      const result = await classifyBloodSugar(value);
      
      const newReading: BloodSugarReading = {
        id: Date.now(),
        value,
        classification: result.classification as Classification || Classification.Unknown,
        advice: result.advice,
        timestamp: new Date().toISOString(),
      };
      
      setReadings(prevReadings => [newReading, ...prevReadings]);
      setLatestResult(newReading);

    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('حدث خطأ غير متوقع.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setReadings([]);
    setLatestResult(null);
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 flex flex-col items-center">
        <div className="mt-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">مرحباً بك في أداة مراقبة السكر</h2>
            <p className="text-gray-600 mt-2 max-w-2xl">
              أدخل قراءة السكر لديك للحصول على تحليل فوري ونصائح مفيدة للمحافظة على صحتك. هذه الأداة لا تغني عن استشارة الطبيب.
            </p>
        </div>

        <div className="w-full flex flex-col items-center mt-8">
            <InputForm onSubmit={handleNewReading} isLoading={isLoading} />
            {isLoading && <Loader />}
            <ResultDisplay result={latestResult} apiError={apiError} />
        </div>
        
        <SugarChart data={readings} />
        <HistoryLog readings={readings} onClear={handleClearHistory} />

      </main>
       <footer className="text-center p-4 mt-8 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} صيدلية الدكتور محمد حامد. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
};

export default App;
