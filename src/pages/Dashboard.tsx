import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4500, customers: 45 },
    { month: 'Fev', revenue: 5200, customers: 52 },
    { month: 'Mar', revenue: 4800, customers: 48 },
    { month: 'Abr', revenue: 6100, customers: 61 },
    { month: 'Mai', revenue: 7300, customers: 73 },
    { month: 'Jun', revenue: 8900, customers: 89 },
  ];

  const churnData = [
    { name: 'Ativos', value: 85, color: '#22c55e' },
    { name: 'Churned', value: 15, color: '#ef4444' },
  ];

  const kpis = [
    {
      title: 'MRR (Monthly Recurring Revenue)',
      value: 'R$ 8.900',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      description: 'Receita recorrente mensal'
    },
    {
      title: 'Churn Rate',
      value: '15%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingDown,
      description: 'Taxa de cancelamento mensal'
    },
    {
      title: 'CAC (Customer Acquisition Cost)',
      value: 'R$ 45',
      change: '-8.3%',
      trend: 'down',
      icon: Users,
      description: 'Custo de aquisição por cliente'
    },
    {
      title: 'CLV (Customer Lifetime Value)',
      value: 'R$ 890',
      change: '+18.7%',
      trend: 'up',
      icon: TrendingUp,
      description: 'Valor vitalício do cliente'
    },
    {
      title: 'NRR (Net Revenue Retention)',
      value: '112%',
      change: '+3.2%',
      trend: 'up',
      icon: BarChart3,
      description: 'Retenção líquida de receita'
    },
    {
      title: 'Vendas Totais',
      value: '1.247',
      change: '+24.1%',
      trend: 'up',
      icon: ShoppingCart,
      description: 'Vendas no último mês'
    }
  ];

  const recentActivities = [
    { type: 'sale', message: 'Nova venda: Smartphone Galaxy A54', time: '2 min atrás' },
    { type: 'customer', message: 'Novo cliente: João Silva', time: '15 min atrás' },
    { type: 'description', message: 'Descrição gerada: Notebook Dell', time: '1h atrás' },
    { type: 'sale', message: 'Nova venda: Fone Bluetooth', time: '2h atrás' },
    { type: 'customer', message: 'Cliente renovou: Maria Santos', time: '3h atrás' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Dashboard Analytics
              </h1>
              <p className="text-lg text-gray-600">
                Acompanhe suas métricas em tempo real
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>Atualizado há 2 min</span>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {kpi.trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                  <p className="text-xs text-gray-400">{kpi.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Receita & Clientes</h3>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mr-2"></div>
                  <span className="text-gray-600">Receita</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-accent-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Clientes</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} />
                  <Line type="monotone" dataKey="customers" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Churn Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Taxa de Churn</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={churnData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                  >
                    {churnData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {churnData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Atividades Recentes</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'sale' ? 'bg-green-100 text-green-600' :
                  activity.type === 'customer' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {activity.type === 'sale' ? <ShoppingCart className="w-5 h-5" /> :
                   activity.type === 'customer' ? <Users className="w-5 h-5" /> :
                   <BarChart3 className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;