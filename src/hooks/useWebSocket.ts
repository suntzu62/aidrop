import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const { 
    setConnectionStatus, 
    updateProduct, 
    addOrder, 
    updateOrder, 
    setKPIs, 
    addAlert 
  } = useStore();

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setConnectionStatus(true);
      toast.success('Conectado ao sistema em tempo real');
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'PRODUCT_UPDATE':
          updateProduct(data.payload.id, data.payload);
          toast.success(`Produto ${data.payload.title} atualizado`);
          break;
          
        case 'NEW_ORDER':
          addOrder(data.payload);
          toast.success(`Nova venda: ${data.payload.buyerName}`);
          break;
          
        case 'ORDER_STATUS_UPDATE':
          updateOrder(data.payload.id, { status: data.payload.status });
          toast.info(`Pedido ${data.payload.id} - ${data.payload.status}`);
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
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setConnectionStatus(false);
      toast.error('Conexão perdida. Tentando reconectar...');
      
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (ws.current?.readyState === WebSocket.CLOSED) {
          // Reconnect logic would go here
        }
      }, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast.error('Erro na conexão em tempo real');
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [setConnectionStatus, updateProduct, addOrder, updateOrder, setKPIs, addAlert]);

  const sendMessage = (type: string, payload: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, payload }));
    }
  };

  return { sendMessage };
};