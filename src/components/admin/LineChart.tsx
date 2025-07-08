import React from 'react';
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  strokeWidth?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  color = '#2563eb', 
  strokeWidth = 2 
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          activeDot={{ r: 6 }}
          strokeWidth={strokeWidth}
          animationDuration={1500}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;