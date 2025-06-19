import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Inventory Sync Service
export const inventoryService = {
  syncProducts: async () => {
    const response = await api.get('/inventory/sync');
    return response.data;
  },
  
  getProducts: async () => {
    const response = await api.get('/inventory/products');
    return response.data;
  },
  
  updateProduct: async (id: string, updates: any) => {
    const response = await api.put(`/inventory/products/${id}`, updates);
    return response.data;
  }
};

// Order Orchestration Service
export const orderService = {
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  processOrder: async (orderId: string) => {
    const response = await api.post(`/orders/${orderId}/process`);
    return response.data;
  },
  
  trackOrder: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}/tracking`);
    return response.data;
  }
};

// Sales Prediction Service
export const analyticsService = {
  getSalesForecast: async (productId?: string, days: number = 30) => {
    const response = await api.get('/analytics/forecast', {
      params: { productId, days }
    });
    return response.data;
  },
  
  getKPIs: async () => {
    const response = await api.get('/analytics/kpis');
    return response.data;
  },
  
  getStockRecommendations: async () => {
    const response = await api.get('/analytics/stock-recommendations');
    return response.data;
  }
};

// Chat Support Service
export const chatService = {
  sendMessage: async (message: string, channel: 'whatsapp' | 'mercadolivre') => {
    const response = await api.post('/chat/send', { message, channel });
    return response.data;
  },
  
  getConversations: async () => {
    const response = await api.get('/chat/conversations');
    return response.data;
  }
};

// Notification Service
export const notificationService = {
  getAlerts: async () => {
    const response = await api.get('/notifications/alerts');
    return response.data;
  },
  
  markAsRead: async (alertId: string) => {
    const response = await api.put(`/notifications/alerts/${alertId}/read`);
    return response.data;
  },
  
  updateSettings: async (settings: any) => {
    const response = await api.put('/notifications/settings', settings);
    return response.data;
  }
};