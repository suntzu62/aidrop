import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  TrendingDown, 
  Package, 
  ShoppingCart,
  CheckCircle,
  Settings,
  Filter,
  Webhook
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { notificationService } from '../services/api';
import { format } from 'date-fns';

const AlertCenter = () => {
  const { alerts, markAlertAsRead } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const data = await notificationService.getAlerts();
      // Transform backend alerts to frontend format
      const transformedAlerts = data.map((alert: any) => ({
        id: alert.id,
        type: alert.type,
        message: alert.message,
        severity: alert.severity,
        timestamp: new Date(alert.created_at),
        read: alert.read,
        title: alert.title,
        source: alert.source,
        metadata: alert.metadata
      }));
      
      // Add alerts to store (you might want to replace existing alerts)
      transformedAlerts.forEach((alert: any) => {
        if (!alerts.find(a => a.id === alert.id)) {
          useStore.getState().addAlert(alert);
        }
      });
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = alerts.filter(alert => !alert.read).length;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <Package className="w-5 h-5" />;
      case 'new_order': return <ShoppingCart className="w-5 h-5" />;
      case 'new_product': return <Package className="w-5 h-5" />;
      case 'webhook_data': return <Webhook className="w-5 h-5" />;
      case 'highChurn': return <TrendingDown className="w-5 h-5" />;
      case 'mrDecline': return <TrendingDown className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-600 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'low_stock': return 'Estoque Baixo';
      case 'new_order': return 'Novo Pedido';
      case 'new_product': return 'Novo Produto';
      case 'webhook_data': return 'Dados Recebidos';
      case 'highChurn': return 'Churn Alto';
      case 'mrDecline': return 'Queda na Receita';
      default: return 'Alerta';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.read;
    if (filter === 'high') return alert.severity === 'high';
    return true;
  });

  const handleMarkAsRead = async (alertId: string) => {
    try {
      await notificationService.markAsRead(alertId);
      markAlertAsRead(alertId);
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <>
      {/* Alert Bell */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
        >
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </button>

        {/* Alert Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Central de Alertas
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={loadAlerts}
                      disabled={loading}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      title="Atualizar"
                    >
                      <Settings className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Filters */}
                <div className="flex items-center space-x-2 mt-3">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <div className="flex space-x-1">
                    {[
                      { key: 'all', label: 'Todos' },
                      { key: 'unread', label: 'Não lidos' },
                      { key: 'high', label: 'Alta prioridade' }
                    ].map((filterOption) => (
                      <button
                        key={filterOption.key}
                        onClick={() => setFilter(filterOption.key as any)}
                        className={`px-3 py-1 text-xs rounded-full transition-colors ${
                          filter === filterOption.key
                            ? 'bg-primary-100 text-primary-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {filterOption.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Alerts List */}
              <div className="max-h-96 overflow-y-auto">
                {filteredAlerts.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredAlerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !alert.read ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${getAlertColor(alert.severity)}`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {alert.title || getTypeText(alert.type)}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                  {alert.message}
                                </p>
                              </div>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getAlertColor(alert.severity)}`}>
                                {getSeverityText(alert.severity)}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{format(new Date(alert.timestamp), 'dd/MM/yyyy HH:mm')}</span>
                                {alert.source && alert.source !== 'system' && (
                                  <span className="px-1.5 py-0.5 bg-gray-100 rounded text-xs">
                                    {alert.source}
                                  </span>
                                )}
                              </div>
                              
                              {!alert.read && (
                                <button
                                  onClick={() => handleMarkAsRead(alert.id)}
                                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                                >
                                  Marcar como lido
                                </button>
                              )}
                            </div>

                            {/* Show platform info if available */}
                            {alert.metadata?.platform && (
                              <div className="mt-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {alert.metadata.platform}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-gray-500">Nenhum alerta encontrado</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {filter === 'unread' ? 'Todos os alertas foram lidos' : 
                       filter === 'high' ? 'Nenhum alerta de alta prioridade' :
                       'Você está em dia com suas notificações!'}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="text-xs text-gray-500 text-center">
                  {filteredAlerts.length} de {alerts.length} alertas
                  {loading && ' • Carregando...'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AlertCenter;