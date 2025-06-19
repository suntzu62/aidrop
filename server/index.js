const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
let products = [
  {
    id: 'MLB123456789',
    title: 'Smartphone Samsung Galaxy A54 128GB',
    price: 1299.99,
    stock: 15,
    sold: 45,
    status: 'active',
    lastSync: new Date()
  },
  {
    id: 'MLB987654321',
    title: 'Notebook Dell Inspiron 15 3000',
    price: 2499.99,
    stock: 3,
    sold: 12,
    status: 'active',
    lastSync: new Date()
  },
  {
    id: 'MLB456789123',
    title: 'Fone Bluetooth JBL Tune 510BT',
    price: 199.99,
    stock: 0,
    sold: 89,
    status: 'paused',
    lastSync: new Date()
  }
];

let orders = [
  {
    id: 'ORD001',
    productId: 'MLB123456789',
    buyerName: 'João Silva',
    amount: 1299.99,
    status: 'pending',
    createdAt: new Date(),
    trackingCode: null
  },
  {
    id: 'ORD002',
    productId: 'MLB987654321',
    buyerName: 'Maria Santos',
    amount: 2499.99,
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000),
    trackingCode: 'BR123456789'
  }
];

let kpis = {
  mrr: 8900,
  churn: 15,
  cac: 45,
  clv: 890,
  totalSales: 1247,
  activeProducts: products.filter(p => p.status === 'active').length
};

// WebSocket connections
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received:', data);
      
      if (data.type === 'SUBSCRIBE') {
        // Send initial data
        ws.send(JSON.stringify({
          type: 'INITIAL_DATA',
          payload: { products, orders, kpis }
        }));
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Broadcast to all clients
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// API Routes

// Inventory endpoints
app.get('/api/inventory/products', (req, res) => {
  res.json(products);
});

app.get('/api/inventory/sync', (req, res) => {
  // Simulate sync with MercadoLibre API
  products = products.map(product => ({
    ...product,
    stock: Math.max(0, product.stock + Math.floor(Math.random() * 10) - 5),
    price: product.price * (1 + (Math.random() - 0.5) * 0.1),
    lastSync: new Date()
  }));

  // Broadcast updates
  broadcast({
    type: 'PRODUCT_SYNC',
    payload: products
  });

  res.json({ success: true, products });
});

app.put('/api/inventory/products/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updates, lastSync: new Date() };
    
    broadcast({
      type: 'PRODUCT_UPDATE',
      payload: products[productIndex]
    });
    
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Order endpoints
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders/:id/process', (req, res) => {
  const { id } = req.params;
  const orderIndex = orders.findIndex(o => o.id === id);
  
  if (orderIndex !== -1) {
    orders[orderIndex].status = 'confirmed';
    orders[orderIndex].trackingCode = `BR${Date.now()}`;
    
    broadcast({
      type: 'ORDER_STATUS_UPDATE',
      payload: orders[orderIndex]
    });
    
    res.json(orders[orderIndex]);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Analytics endpoints
app.get('/api/analytics/kpis', (req, res) => {
  res.json(kpis);
});

app.get('/api/analytics/forecast', (req, res) => {
  const { days = 30 } = req.query;
  
  // Generate mock forecast data
  const dates = [];
  const historical = [];
  const forecast = [];
  
  for (let i = -days; i <= days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
    
    if (i <= 0) {
      historical.push(Math.floor(Math.random() * 5000) + 2000);
      forecast.push(null);
    } else {
      historical.push(null);
      forecast.push(Math.floor(Math.random() * 6000) + 2500);
    }
  }
  
  res.json({
    dates,
    historical,
    forecast,
    predictedRevenue: 45000,
    predictedOrders: 180,
    growthRate: 12.5
  });
});

app.get('/api/analytics/stock-recommendations', (req, res) => {
  const recommendations = [
    {
      productTitle: 'Smartphone Samsung Galaxy A54',
      currentStock: 15,
      recommendedStock: 25,
      priority: 'medium',
      recommendation: 'Recomendamos aumentar o estoque em 10 unidades baseado na previsão de vendas.',
      stockoutDate: '2024-02-15'
    },
    {
      productTitle: 'Notebook Dell Inspiron 15',
      currentStock: 3,
      recommendedStock: 15,
      priority: 'high',
      recommendation: 'Estoque crítico! Reabasteça urgentemente para evitar perda de vendas.',
      stockoutDate: '2024-01-25'
    }
  ];
  
  res.json(recommendations);
});

// Chat endpoints
app.post('/api/chat/send', (req, res) => {
  const { message, channel } = req.body;
  
  // Simulate sending message to external service
  setTimeout(() => {
    broadcast({
      type: 'CHAT_MESSAGE',
      payload: {
        message,
        channel,
        timestamp: new Date()
      }
    });
  }, 1000);
  
  res.json({ success: true });
});

// Notification endpoints
app.get('/api/notifications/alerts', (req, res) => {
  const alerts = [
    {
      id: '1',
      type: 'lowStock',
      message: 'Fone Bluetooth JBL está sem estoque',
      severity: 'high',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'newOrder',
      message: 'Nova venda: Smartphone Samsung Galaxy A54',
      severity: 'low',
      timestamp: new Date(Date.now() - 300000),
      read: false
    }
  ];
  
  res.json(alerts);
});

app.put('/api/notifications/alerts/:id/read', (req, res) => {
  res.json({ success: true });
});

// Simulate real-time events
setInterval(() => {
  // Random product updates
  if (Math.random() < 0.3) {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const stockChange = Math.floor(Math.random() * 5) - 2;
    
    if (randomProduct.stock + stockChange >= 0) {
      randomProduct.stock += stockChange;
      randomProduct.lastSync = new Date();
      
      broadcast({
        type: 'PRODUCT_UPDATE',
        payload: randomProduct
      });
      
      if (randomProduct.stock <= 5) {
        broadcast({
          type: 'ALERT',
          payload: {
            type: 'lowStock',
            message: `${randomProduct.title} está com estoque baixo (${randomProduct.stock})`,
            severity: randomProduct.stock === 0 ? 'high' : 'medium'
          }
        });
      }
    }
  }
  
  // Random new orders
  if (Math.random() < 0.1) {
    const newOrder = {
      id: `ORD${Date.now()}`,
      productId: products[Math.floor(Math.random() * products.length)].id,
      buyerName: ['João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira'][Math.floor(Math.random() * 4)],
      amount: Math.floor(Math.random() * 2000) + 100,
      status: 'pending',
      createdAt: new Date(),
      trackingCode: null
    };
    
    orders.unshift(newOrder);
    
    broadcast({
      type: 'NEW_ORDER',
      payload: newOrder
    });
  }
}, 10000); // Every 10 seconds

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;