import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { 
    setConnectionStatus, 
    updateProduct, 
    addOrder, 
    updateOrder, 
    setKPIs, 
    addAlert 
  } = useStore();

  const connect = () => {
    try {
      // Use environment variable or fallback to localhost
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:3001';
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus(true);
        toast.success('Conectado ao sistema em tempo real');
        
        // Subscribe to real-time updates
        if (ws.current?.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ 
            type: 'SUBSCRIBE', 
            channels: ['inventory', 'orders', 'analytics'] 
          }));
        }
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'INITIAL_DATA':
              // Handle initial data load
              if (data.payload.kpis) {
                setKPIs(data.payload.kpis);
              }
              break;
              
            case 'PRODUCT_UPDATE':
            case 'PRODUCT_SYNC':
              if (Array.isArray(data.payload)) {
                // Handle multiple products
                data.payload.forEach((product: any) => {
                  updateProduct(product.id, product);
                });
              } else {
                updateProduct(data.payload.id, data.payload);
              }
              toast.success(`Produtos atualizados`);
              break;
              
            case 'NEW_ORDER':
              addOrder(data.payload);
              toast.success(`Nova venda: ${data.payload.buyerName}`);
              break;
              
            case 'ORDER_STATUS_UPDATE':
              updateOrder(data.payload.id, { status: data.payload.status });
              toast.info(`Pedido ${data.payload.id.slice(-8)} - ${data.payload.status}`);
              break;
              
            case 'KPI_UPDATE':
              setKPIs(data.payload);
              break;
              
            case 'ALERT':
              addAlert({
                id: Date.now().toString(),
                ...data.payload,
                timestamp: new Date(),
                read: false
              });
              
              if (data.payload.severity === 'high') {
                toast.error(data.payload.message);
              } else {
                toast(data.payload.message);
              }
              break;
              
            default:
              console.log('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
        setConnectionStatus(false);
        
        // Only show reconnection toast if we were previously connected
        if (ws.current?.readyState !== WebSocket.CONNECTING) {
          toast.error('Conexão perdida. Tentando reconectar...');
        }
        
        // Attempt to reconnect after 3 seconds
        reconnectTimeoutRef.current = setTimeout(() => {
          console.log('Attempting to reconnect...');
          connect();
        }, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus(false);
        
        // Only show error toast if connection was established before
        if (ws.current?.readyState !== WebSocket.CONNECTING) {
          toast.error('Erro na conexão em tempo real');
        }
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus(false);
      toast.error('Falha ao conectar com o servidor');
    }
  };

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [setConnectionStatus, updateProduct, addOrder, updateOrder, setKPIs, addAlert]);

  const sendMessage = (type: string, payload: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    } else {
      console.warn('WebSocket not connected, cannot send message:', { type, payload });
    }
  };

  return { sendMessage };
};