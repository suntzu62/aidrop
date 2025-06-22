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
  ArrowDown,
  Store,
  Target,
  Crown,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

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

  // New: Platform Performance Data
  const platformData = [
    { 
      platform: 'Mercado Livre', 
      revenue: 3200, 
      orders: 45, 
      conversion: 3.2,
      growth: 12.5,
      color: '#FFE600'
    },
    { 
      platform: 'Shopee', 
      revenue: 2800, 
      orders: 38, 
      conversion: 2.8,
      growth: 18.3,
      color: '#EE4D2D'
    },
    { 
      platform: 'Amazon', 
      revenue: 1900, 
      orders: 22, 
      conversion: 4.1,
      growth: 8.7,
      color: '#FF9900'
    },
    { 
      platform: 'Magazine Luiza', 
      revenue: 900, 
      orders: 12, 
      conversion: 2.1,
      growth: 25.4,
      color: '#0F4C81'
    }
  ];

  // New: Customer Segmentation Data
  const customerSegments = [
    { 
      segment: 'Novos Clientes', 
      count: 245, 
      clv: 180, 
      percentage: 35,
      color: '#22c55e',
      avgOrderValue: 85,
      frequency: 1.2
    },
    { 
      segment: 'Clientes Recorrentes', 
      count: 189, 
      clv: 450, 
      percentage: 27,
      color: '#3b82f6',
      avgOrderValue: 120,
      frequency: 3.8
    },
    { 
      segment: 'Clientes VIP', 
      count: 98, 
      clv: 890, 
      percentage: 14,
      color: '#f59e0b',
      avgOrderValue: 280,
      frequency: 8.2
    },
    { 
      segment: 'Clientes Inativos', 
      count: 168, 
      clv: 95, 
      percentage: 24,
      color: '#ef4444',
      avgOrderValue: 65,
      frequency: 0.8
    }
  ];

  // CLV Trend Data
  const clvTrendData = [
    { month: 'Jan', newCustomers: 180, recurring: 420, vip: 850 },
    { month: 'Fev', newCustomers: 185, recurring: 435, vip: 870 },
    { month: 'Mar', newCustomers: 175, recurring: 445, vip: 885 },
    { month: 'Abr', newCustomers: 180, recurring: 450, vip: 890 },
    { month: 'Mai', newCustomers: 182, recurring: 448, vip: 895 },
    { month: 'Jun', newCustomers: 180, recurring: 450, vip: 890 },
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
    { type: 'sale', message: 'Nova venda: Smartphone Galaxy A54 (Shopee)', time: '2 min atrás' },
    { type: 'customer', message: 'Novo cliente VIP: João Silva', time: '15 min atrás' },
    { type: 'description', message: 'Descrição gerada: Notebook Dell (Amazon)', time: '1h atrás' },
    { type: 'sale', message: 'Nova venda: Fone Bluetooth (Mercado Livre)', time: '2h atrás' },
    { type: 'customer', message: 'Cliente renovou: Maria Santos', time: '3h atrás' },
  ];

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'Novos Clientes': return UserPlus;
      case 'Clientes Recorrentes': return UserCheck;
      case 'Clientes VIP': return Crown;
      default: return Users;
    }
  };

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
                Acompanhe suas métricas e tendências estratégicas
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

        {/* Revenue Chart and Churn Rate */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
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

        {/* NEW: Platform Performance Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Store className="w-6 h-6 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-900">Desempenho por Plataforma</h3>
            </div>
            <div className="text-sm text-gray-500">Últimos 30 dias</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Revenue Chart */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Receita por Plataforma</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, 'Receita']} />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Platform Metrics */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Métricas Detalhadas</h4>
              <div className="space-y-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: platform.color }}
                        ></div>
                        <span className="font-medium text-gray-900">{platform.platform}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        platform.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.growth >= 0 ? '+' : ''}{platform.growth}%
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Receita</span>
                        <p className="font-medium">R$ {platform.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Pedidos</span>
                        <p className="font-medium">{platform.orders}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Conversão</span>
                        <p className="font-medium">{platform.conversion}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* NEW: Customer Segmentation and CLV */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Target className="w-6 h-6 text-accent-500" />
              <h3 className="text-lg font-semibold text-gray-900">Segmentação de Clientes & CLV</h3>
            </div>
            <div className="text-sm text-gray-500">Análise comportamental</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Segments */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Distribuição de Clientes</h4>
              <div className="space-y-4">
                {customerSegments.map((segment, index) => {
                  const Icon = getSegmentIcon(segment.segment);
                  return (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${segment.color}20`, color: segment.color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{segment.segment}</h5>
                            <p className="text-sm text-gray-500">{segment.count} clientes</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">R$ {segment.clv}</p>
                          <p className="text-xs text-gray-500">CLV médio</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Ticket Médio</span>
                          <p className="font-medium">R$ {segment.avgOrderValue}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Frequência</span>
                          <p className="font-medium">{segment.frequency}x/mês</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Participação</span>
                          <span>{segment.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${segment.percentage}%`,
                              backgroundColor: segment.color 
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CLV Trend */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Evolução do CLV por Segmento</h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={clvTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`R$ ${value}`, 'CLV']} />
                    <Area 
                      type="monotone" 
                      dataKey="vip" 
                      stackId="1" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="recurring" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="newCustomers" 
                      stackId="1" 
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Novos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Recorrentes</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">VIP</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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