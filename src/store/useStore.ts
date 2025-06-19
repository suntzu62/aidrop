import { create } from 'zustand';

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  sold: number;
  status: 'active' | 'paused' | 'closed';
  lastSync: Date;
}

interface Order {
  id: string;
  productId: string;
  buyerName: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  trackingCode?: string;
}

interface KPI {
  mrr: number;
  churn: number;
  cac: number;
  clv: number;
  totalSales: number;
  activeProducts: number;
}

interface Alert {
  id: string;
  type: 'lowStock' | 'highChurn' | 'mrDecline' | 'newOrder';
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: Date;
  read: boolean;
}

interface StoreState {
  // Data
  products: Product[];
  orders: Order[];
  kpis: KPI;
  alerts: Alert[];
  
  // UI State
  isConnected: boolean;
  loading: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addOrder: (order: Order) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  setKPIs: (kpis: KPI) => void;
  addAlert: (alert: Alert) => void;
  markAlertAsRead: (id: string) => void;
  setConnectionStatus: (status: boolean) => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  products: [],
  orders: [],
  kpis: {
    mrr: 0,
    churn: 0,
    cac: 0,
    clv: 0,
    totalSales: 0,
    activeProducts: 0
  },
  alerts: [],
  isConnected: false,
  loading: false,

  // Actions
  setProducts: (products) => set({ products }),
  
  updateProduct: (id, updates) => set((state) => ({
    products: state.products.map(p => 
      p.id === id ? { ...p, ...updates } : p
    )
  })),

  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  })),

  updateOrder: (id, updates) => set((state) => ({
    orders: state.orders.map(o => 
      o.id === id ? { ...o, ...updates } : o
    )
  })),

  setKPIs: (kpis) => set({ kpis }),

  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts]
  })),

  markAlertAsRead: (id) => set((state) => ({
    alerts: state.alerts.map(a => 
      a.id === id ? { ...a, read: true } : a
    )
  })),

  setConnectionStatus: (status) => set({ isConnected: status }),
  setLoading: (loading) => set({ loading })
}));