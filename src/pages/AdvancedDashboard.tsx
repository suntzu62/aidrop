import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWebSocket } from '../hooks/useWebSocket';
import { useStore } from '../store/useStore';
import InventoryTableLive from '../components/InventoryTableLive';
import OrderFlowVisualizer from '../components/OrderFlowVisualizer';
import ForecastChart from '../components/ForecastChart';
import ChatWidget from '../components/ChatWidget';
import AlertCenter from '../components/AlertCenter';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  DollarSign,
  Package,
  ShoppingCart,
  Zap,
  Database,
  Wifi,
  Server
} from 'lucide-react';

const AdvancedDashboard = () => {
  const { kpis, isConnected, products, orders } = useStore();
  const { sendMessage } = useWebSocket();

  useEffect(() => {
    // Initialize real-time connections with new message format
    sendMessage('subscribe', { channels: ['inventory', 'orders', 'analytics', 'alerts'] });
  }, [sendMessage]);

  const kpiCards = [
    {
      title: 'MRR',
      value: `R$ ${kpis.mrr.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Produtos Ativos',
      value: kpis.activeProducts.toString(),
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600'
    },
    {
      title: 'Vendas Totais',
      value: kpis.totalSales.toString(),
      change: '+24.1%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-purple-600'
    },
    {
      title: 'Taxa de Churn',
      value: `${kpis.churn.toFixed(1)}%`,
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'text-red-600'
    }
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
                Dashboard Avançado
              </h1>
              <p className="text-lg text-gray-600">
                Sistema integrado com sincronização em tempo real via Supabase
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              
              {/* Alert Center */}
              <AlertCenter />
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiCards.map((kpi, index) => {
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
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${
                    kpi.color === 'text-green-600' ? 'from-green-100 to-green-200' :
                    kpi.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' :
                    kpi.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' :
                    'from-red-100 to-red-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <Activity className="w-4 h-4 mr-1" />
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</h3>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Inventory Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <InventoryTableLive />
          </motion.div>

          {/* Order Flow and Forecast */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <OrderFlowVisualizer />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ForecastChart />
            </motion.div>
          </div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-primary-600" />
                <h2 className="text-xl font-semibold text-gray-900">Status do Sistema</h2>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <Wifi className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">WebSocket</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <Database className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Supabase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <Server className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Backend API</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <Zap className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">n8n Webhooks</span>
                </div>
              </div>
            </div>

            {/* Additional System Info */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Produtos Sincronizados</span>
                  <span className="font-medium text-gray-900">{products.length}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pedidos Ativos</span>
                  <span className="font-medium text-gray-900">{orders.length}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Última Sincronização</span>
                  <span className="font-medium text-gray-900">Agora</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default AdvancedDashboard;