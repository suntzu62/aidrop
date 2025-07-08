import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bgLight: 'bg-blue-100',
          textDark: 'text-blue-600',
          gradient: 'from-blue-50 to-blue-100'
        };
      case 'green':
        return {
          bgLight: 'bg-green-100',
          textDark: 'text-green-600',
          gradient: 'from-green-50 to-green-100'
        };
      case 'purple':
        return {
          bgLight: 'bg-purple-100',
          textDark: 'text-purple-600',
          gradient: 'from-purple-50 to-purple-100'
        };
      case 'orange':
        return {
          bgLight: 'bg-orange-100',
          textDark: 'text-orange-600',
          gradient: 'from-orange-50 to-orange-100'
        };
      case 'red':
        return {
          bgLight: 'bg-red-100',
          textDark: 'text-red-600',
          gradient: 'from-red-50 to-red-100'
        };
      default:
        return {
          bgLight: 'bg-gray-100',
          textDark: 'text-gray-600',
          gradient: 'from-gray-50 to-gray-100'
        };
    }
  };
  
  const colorClasses = getColorClasses(color);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${colorClasses.gradient}`}>
          <Icon className={`w-6 h-6 ${colorClasses.textDark}`} />
        </div>
        <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </motion.div>
  );
};

export default MetricCard;