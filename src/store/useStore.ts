import { create } from 'zustand';
import { User, Session } from '@supabase/supabase-js';

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
  // Authentication
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  
  // Data
  products: Product[];
  orders: Order[];
  kpis: KPI;
  alerts: Alert[];
  
  // UI State
  isConnected: boolean;
  loading: boolean;
  
  // Auth Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setAuthLoading: (loading: boolean) => void;
  
  // Data Actions
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
  // Initial auth state
  user: null,
  session: null,
  isAuthenticated: false,
  authLoading: true,
  
  // Initial data state
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

  // Auth actions
  setUser: (user) => set({ 
    user, 
    isAuthenticated: !!user 
  }),
  
  setSession: (session) => set({ 
    session,
    user: session?.user || null,
    isAuthenticated: !!session?.user
  }),
  
  setAuthLoading: (authLoading) => set({ authLoading }),

  // Data actions
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