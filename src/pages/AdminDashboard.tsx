import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Users, 
  Box, 
  ShoppingBag, 
  ShoppingCart, 
  Bell, 
  Search, 
  Menu, 
  X,
  Home,
  Settings,
  FileText,
  LogOut,
  ChevronDown,
  Filter
} from 'lucide-react';
import { useWebSocket } from '../hooks/useWebSocket';
import { useStore } from '../store/useStore';
import { useAuth } from '../hooks/useAuth';
import MetricCard from '../components/admin/MetricCard';
import LineChart from '../components/admin/LineChart';
import BarChart from '../components/admin/BarChart';
import DonutChart from '../components/admin/DonutChart';
import DataTable from '../components/admin/DataTable';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState('dashboard');
  const [activeFilter, setActiveFilter] = useState('today');
  const { sendMessage } = useWebSocket();
  const { products, orders, kpis, isConnected } = useStore();
  const { user, signOut } = useAuth();
  
  useEffect(() => {
    // Inicializar websocket para receber atualizações em tempo real
    sendMessage('subscribe', { channels: ['inventory', 'orders', 'analytics', 'alerts'] });
  }, [sendMessage]);

  const handleLogout = async () => {
    try {
      const result = await signOut();
      if (result.success) {
        toast.success('Logout realizado com sucesso!');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  // Definição dos items da sidebar
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'products', label: 'Produtos', icon: Box },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  // Dados para os gráficos
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Fev', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Abr', value: 2780 },
    { name: 'Mai', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 }
  ];

  const salesByCategory = [
    { name: 'Eletrônicos', value: 45 },
    { name: 'Moda', value: 30 },
    { name: 'Casa', value: 15 },
    { name: 'Outros', value: 10 }
  ];

  const orderStats = [
    { name: 'Pendente', value: 25 },
    { name: 'Processando', value: 30 },
    { name: 'Enviado', value: 20 },
    { name: 'Entregue', value: 50 },
    { name: 'Cancelado', value: 5 }
  ];

  const metricCards = [
    {
      title: 'Faturamento',
      value: `R$ ${kpis.mrr.toLocaleString()}`,
      change: '+12.5%',
      icon: BarChart2,
      color: 'blue'
    },
    {
      title: 'Usuários',
      value: '1,245',
      change: '+18.2%',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Produtos',
      value: products.length.toString(),
      change: '+3.1%',
      icon: ShoppingBag,
      color: 'purple'
    },
    {
      title: 'Pedidos',
      value: orders.length.toString(),
      change: '+24.5%',
      icon: ShoppingCart,
      color: 'orange'
    }
  ];

  // Dados para a tabela
  const tableData = orders.map(order => ({
    id: order.id,
    customer: order.buyerName,
    amount: `R$ ${order.amount.toFixed(2)}`,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString()
  }));
  
  // Colunas para a tabela
  const tableColumns = [
    { key: 'id', label: 'ID' },
    { key: 'customer', label: 'Cliente' },
    { key: 'amount', label: 'Valor' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Data' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`theme-sidebar h-screen fixed top-0 left-0 w-64 shadow-lg transition-all z-20`}
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Admin</span>
            </div>
            <button 
              className="text-gray-500 hover:text-gray-700 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="py-6">
          <nav>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full text-left flex items-center space-x-3 px-6 py-3 transition-colors ${
                    isActive 
                      ? 'text-primary-600 bg-primary-50 border-r-4 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 transition-colors w-full text-opacity-80 hover:text-opacity-100"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
        {/* Topbar */}
        <div className="theme-header shadow-sm border-b py-4 px-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                className="text-opacity-70 hover:text-opacity-100 hidden md:block"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="relative flex-1 max-w-lg hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 theme-input rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.email?.split('@')[0] || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-opacity-70">Bem-vindo de volta, {user?.email?.split('@')[0] || 'Admin'}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Filter options */}
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-500">Filtrar por:</span>
                {['today', 'week', 'month', 'year'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      activeFilter === filter 
                        ? 'bg-primary-600 text-white' 
                        : 'theme-card hover:theme-hover'
                    }`}
                  >
                    {filter === 'today' ? 'Hoje' 
                      : filter === 'week' ? 'Semana' 
                      : filter === 'month' ? 'Mês' 
                      : 'Ano'}
                  </button>
                ))}
              </div>
              
              {/* Mobile filter */}
              <div className="md:hidden">
                <button className="p-2 bg-white rounded-lg shadow text-gray-600 flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filtrar</span>
                </button>
              </div>
              
              <div className={`flex items-center text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}></span>
                {isConnected ? 'Conectado' : 'Desconectado'}
              </div>
            </div>
          </div>
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricCards.map((card, index) => (
              <MetricCard 
                key={index}
                title={card.title}
                value={card.value}
                change={card.change}
                icon={card.icon}
                color={card.color}
              />
            ))}
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Faturamento</h2>
                <button className="text-sm text-primary-600 hover:text-primary-700">Ver Detalhes</button>
              </div>
              <div className="h-80">
                <LineChart data={revenueData} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Vendas por Categoria</h2>
                <button className="text-sm text-primary-600 hover:text-primary-700">Ver Detalhes</button>
              </div>
              <div className="h-80">
                <DonutChart data={salesByCategory} />
              </div>
            </div>
          </div>
          
          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Distribuição de Pedidos</h2>
                <button className="text-sm text-primary-600 hover:text-primary-700">Ver Detalhes</button>
              </div>
              <div className="h-80">
                <BarChart data={orderStats} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Performance de Vendas</h2>
                <button className="text-sm text-primary-600 hover:text-primary-700">Ver Detalhes</button>
              </div>
              <div className="h-80 flex items-center justify-center">
                <LineChart 
                  data={[
                    { name: 'Seg', value: 1400 },
                    { name: 'Ter', value: 2800 },
                    { name: 'Qua', value: 1800 },
                    { name: 'Qui', value: 3200 },
                    { name: 'Sex', value: 2700 },
                    { name: 'Sab', value: 1500 },
                    { name: 'Dom', value: 800 }
                  ]}
                  color="#22c55e"
                />
              </div>
            </div>
          </div>
          
          {/* Data Table */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Pedidos Recentes</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700">Ver Todos</button>
            </div>
            
            <DataTable 
              columns={tableColumns}
              data={tableData}
              searchable={true}
              searchKeys={['customer', 'id']}
              pagination={true}
              itemsPerPage={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;