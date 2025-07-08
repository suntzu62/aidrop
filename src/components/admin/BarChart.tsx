import React from 'react';
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  color?: string;
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  color = '#8b5cf6' 
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={40}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip
          contentStyle={{ 
            backgroundColor: '#fff', 
            borderRadius: 8, 
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
        />
        <Bar 
          dataKey="value" 
          fill={color} 
          radius={[4, 4, 0, 0]}
          animationDuration={1500}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;