const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// n8n webhook endpoint
app.post('/webhook/n8n', (req, res) => {
  console.log('n8n webhook received:', req.body);
  
  // Broadcast to all connected WebSocket clients
  if (wss) {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'n8n_webhook',
          data: req.body,
          timestamp: new Date().toISOString()
        }));
      }
    });
  }
  
  res.json({ 
    success: true, 
    message: 'Webhook received and broadcasted',
    timestamp: new Date().toISOString()
  });
});

// API endpoints for MLBoost functionality
app.get('/api/inventory', (req, res) => {
  // Mock inventory data
  const inventory = [
    { id: 1, name: 'Product A', stock: 150, forecast: 200, status: 'normal' },
    { id: 2, name: 'Product B', stock: 45, forecast: 100, status: 'low' },
    { id: 3, name: 'Product C', stock: 300, forecast: 250, status: 'high' }
  ];
  res.json(inventory);
});

app.get('/api/alerts', (req, res) => {
  const alerts = [
    { id: 1, type: 'warning', message: 'Low stock alert for Product B', timestamp: new Date().toISOString() },
    { id: 2, type: 'info', message: 'Forecast updated for Product A', timestamp: new Date().toISOString() }
  ];
  res.json(alerts);
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🚀 MLBoost server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:5173`);
  console.log(`🔗 n8n webhook: http://localhost:${PORT}/webhook/n8n`);
});

// WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('📡 New WebSocket connection established');
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to MLBoost server',
    timestamp: new Date().toISOString()
  }));
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📨 Received message:', data);
      
      // Echo back or handle specific message types
      ws.send(JSON.stringify({
        type: 'response',
        originalMessage: data,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('❌ Error parsing message:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('📡 WebSocket connection closed');
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});