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
        
        // Subscribe to real-time updates with new message format
        if (ws.current?.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ 
            type: 'subscribe', 
            channels: ['inventory', 'orders', 'analytics', 'alerts'] 
          }));
        }
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('WebSocket message received:', data);
          
          switch (data.type) {
            case 'connection':
              console.log('WebSocket connection confirmed:', data.message);
              break;
              
            case 'subscribed':
              console.log('Subscribed to channels:', data.channels);
              break;
              
            case 'product_updated':
              if (data.product) {
                updateProduct(data.product.id, data.product);
                toast.success(`Produto atualizado: ${data.product.title}`);
              }
              break;
              
            case 'order_updated':
              if (data.order) {
                updateOrder(data.order.id, data.order);
                toast.info(`Pedido atualizado: ${data.order.id.slice(-8)}`);
              }
              break;
              
            case 'webhook_processed':
              // Handle webhook processing results
              if (data.results?.processed?.length > 0) {
                data.results.processed.forEach((item: any) => {
                  if (item.type === 'product') {
                    toast.success('Produto sincronizado via webhook');
                  } else if (item.type === 'order') {
                    toast.success('Novo pedido recebido via webhook');
                  }
                });
              }
              break;
              
            case 'alert':
              if (data.alert || data.message) {
                const alert = data.alert || {
                  id: Date.now().toString(),
                  type: 'webhook',
                  message: data.message,
                  severity: data.severity || 'medium',
                  timestamp: new Date(),
                  read: false
                };
                
                addAlert(alert);
                
                if (alert.severity === 'high') {
                  toast.error(alert.message);
                } else {
                  toast(alert.message);
                }
              }
              break;
              
            case 'pong':
              // Heartbeat response
              console.log('Heartbeat received');
              break;
              
            case 'response':
              console.log('WebSocket response:', data);
              break;
              
            case 'error':
              console.error('WebSocket error message:', data.message);
              toast.error(`Erro WebSocket: ${data.message}`);
              break;
              
            default:
              console.log('Unknown WebSocket message type:', data.type);
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
      ws.current.send(JSON.stringify({ type, ...payload }));
    } else {
      console.warn('WebSocket not connected, cannot send message:', { type, payload });
    }
  };

  // Send periodic heartbeat
  useEffect(() => {
    const heartbeat = setInterval(() => {
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(heartbeat);
  }, []);

  return { sendMessage };
};