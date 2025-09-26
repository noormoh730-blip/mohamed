
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { BloodSugarReading } from '../types';

interface SugarChartProps {
  data: BloodSugarReading[];
}

const SugarChart: React.FC<SugarChartProps> = ({ data }) => {
   if (data.length < 2) {
    return null; // Don't render chart for less than 2 data points
  }
  
  const formattedData = data.map(item => ({
    ...item,
    name: new Date(item.timestamp).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">مخطط مستوى السكر</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" reversed={true} />
          <YAxis domain={['dataMin - 20', 'dataMax + 20']} />
          <Tooltip 
            formatter={(value) => [`${value} mg/dL`, 'القراءة']}
            labelFormatter={(label) => `التاريخ: ${label}`}
          />
          <Legend formatter={() => 'مستوى السكر'} />
          <Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SugarChart;
