import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Truck, 
  CheckCircle,
  Clock,
  AlertCircle,
  User,
  MapPin
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { orderService } from '../services/api';
import { format } from 'date-fns';

const OrderFlowVisualizer = () => {
  const { orders, addOrder, updateOrder } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getOrders();
      data.forEach((order: any) => addOrder(order));
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const handleProcessOrder = async (orderId: string) => {
    setProcessing(orderId);
    try {
      const result = await orderService.processOrder(orderId);
      updateOrder(orderId, result);
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setProcessing(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed': return <CreditCard className="w-5 h-5 text-blue-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      default: return 'Erro';
    }
  };

  const orderSteps = [
    { key: 'pending', label: 'Pedido Recebido', icon: ShoppingCart },
    { key: 'confirmed', label: 'Pagamento Confirmado', icon: CreditCard },
    { key: 'shipped', label: 'Produto Enviado', icon: Truck },
    { key: 'delivered', label: 'Entregue', icon: CheckCircle }
  ];

  const getStepStatus = (stepKey: string, orderStatus: string) => {
    const stepIndex = orderSteps.findIndex(step => step.key === stepKey);
    const currentIndex = orderSteps.findIndex(step => step.key === orderStatus);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-6">
      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="w-6 h-6 text-primary-600" />
              <h2 className="text-xl font-semibold text-gray-900">Orquestração de Pedidos</h2>
            </div>
            <div className="text-sm text-gray-500">
              {orders.length} pedidos ativos
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.slice(0, 10).map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedOrder === order.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
              }`}
              onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        Pedido #{order.id.slice(-8)}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {order.buyerName}
                      </div>
                      <div>R$ {order.amount.toFixed(2)}</div>
                      <div>{format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {order.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProcessOrder(order.id);
                      }}
                      disabled={processing === order.id}
                      className="px-3 py-1 bg-primary-600 text-white text-xs rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
                    >
                      {processing === order.id ? 'Processando...' : 'Processar'}
                    </button>
                  )}
                  
                  {order.trackingCode && (
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="w-3 h-3 mr-1" />
                      {order.trackingCode}
                    </div>
                  )}
                </div>
              </div>

              {/* Order Flow Steps */}
              {selectedOrder === order.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    {orderSteps.map((step, index) => {
                      const Icon = step.icon;
                      const status = getStepStatus(step.key, order.status);
                      
                      return (
                        <div key={step.key} className="flex items-center">
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                              status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                              status === 'current' ? 'bg-primary-500 border-primary-500 text-white' :
                              'bg-gray-100 border-gray-300 text-gray-400'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="mt-2 text-xs text-center max-w-20">
                              <div className={`font-medium ${
                                status === 'completed' ? 'text-green-600' :
                                status === 'current' ? 'text-primary-600' :
                                'text-gray-400'
                              }`}>
                                {step.label}
                              </div>
                            </div>
                          </div>
                          
                          {index < orderSteps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-4 ${
                              getStepStatus(orderSteps[index + 1].key, order.status) === 'completed' ||
                              (getStepStatus(orderSteps[index + 1].key, order.status) === 'current' && status === 'completed')
                                ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum pedido encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFlowVisualizer;