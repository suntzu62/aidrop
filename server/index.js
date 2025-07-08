const express = require('express');
const WebSocket = require('ws');
const cors = require('cors');
require('dotenv').config();

// Import services
const { supabase, testConnection } = require('./config/supabase');
const webhookProcessor = require('./services/webhookProcessor');
const productService = require('./services/productService');
const orderService = require('./services/orderService');
const alertService = require('./services/alertService');
const aiService = require('./services/aiService');
const contentService = require('./services/contentService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  const supabaseConnected = await testConnection();
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    supabase: supabaseConnected ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// n8n webhook endpoint - Main integration point
app.post('/webhook/n8n', async (req, res) => {
  try {
    console.log('📨 n8n webhook received:', req.body);
    
    // Process webhook data through our service
    const results = await webhookProcessor.processWebhookData(req.body, 'n8n');
    
    // Broadcast to all connected WebSocket clients
    if (wss) {
      const broadcastData = {
        type: 'webhook_processed',
        source: 'n8n',
        results: results,
        timestamp: new Date().toISOString()
      };

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastData));
        }
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Webhook processed successfully',
      results: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// AI Content Generation endpoint for n8n integration
app.post('/api/generate-content', async (req, res) => {
  try {
    console.log('🤖 AI content generation request:', req.body);
    
    const { type, ...data } = req.body;
    
    if (!type) {
      return res.status(400).json({
        success: false,
        error: 'Content type is required',
        availableTypes: [
          'product-description',
          'blog-content', 
          'social-media-post',
          'email-marketing',
          'ad-copy',
          'video-script'
        ]
      });
    }
    
    let result;
    
    switch (type) {
      case 'product-description':
        result = await aiService.generateProductDescription(data);
        break;
      case 'blog-content':
        result = await aiService.generateBlogContent(data);
        break;
      case 'social-media-post':
        result = await aiService.generateSocialMediaPost(data);
        break;
      case 'email-marketing':
        result = await aiService.generateEmailMarketing(data);
        break;
      case 'ad-copy':
        result = await aiService.generateAdCopy(data);
        break;
      case 'video-script':
        result = await aiService.generateVideoScript(data);
        break;
      case 'blog-titles':
        result = await aiService.generateBlogTitles(data);
        break;
      case 'blog-outline':
        result = await aiService.generateBlogOutline(data);
        break;
      case 'full-blog-article':
        result = await aiService.generateFullBlogArticle(data);
        break;
      case 'social-media-for-article':
        result = await aiService.generateSocialMediaPostsForArticle(data);
        break;
      default:
        return res.status(400).json({
          success: false,
          error: `Unknown content type: ${type}`,
          availableTypes: [
            'product-description',
            'blog-content', 
            'social-media-post',
            'email-marketing',
            'ad-copy',
            'video-script'
          ]
        });
    }
    
    // Broadcast to WebSocket clients
    if (wss) {
      const broadcastData = {
        type: 'content_generated',
        contentType: type,
        result: result,
        timestamp: new Date().toISOString()
      };

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(broadcastData));
        }
      });
    }
    
    res.json({
      success: true,
      message: 'Content generated successfully',
      type: type,
      result: result,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ AI content generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// API Routes

// Products endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const product = await productService.upsertProduct({
      ...req.body,
      id: req.params.id
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/low-stock/:threshold?', async (req, res) => {
  try {
    const threshold = parseInt(req.params.threshold) || 10;
    const products = await productService.getLowStockProducts(threshold);
    res.json(products);
  } catch (error) {
    console.error('Error fetching low stock products:', error);
    res.status(500).json({ error: error.message });
  }
});

// Orders endpoints
app.get('/api/orders', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const orders = await orderService.getAllOrders(limit);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders/status/:status', async (req, res) => {
  try {
    const orders = await orderService.getOrdersByStatus(req.params.status);
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/orders/:id/status', async (req, res) => {
  try {
    const { status, tracking_code } = req.body;
    const order = await orderService.updateOrderStatus(
      req.params.id, 
      status, 
      tracking_code
    );
    
    // Broadcast order update
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({
            type: 'order_updated',
            order: order,
            timestamp: new Date().toISOString()
          }));
        }
      });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Analytics endpoints
app.get('/api/analytics/revenue', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const revenueData = await orderService.getRevenueAnalytics(days);
    res.json(revenueData);
  } catch (error) {
    console.error('Error fetching revenue analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/analytics/kpis', async (req, res) => {
  try {
    // Calculate KPIs from database
    const [orders, products] = await Promise.all([
      orderService.getAllOrders(1000),
      productService.getAllProducts()
    ]);

    const totalRevenue = orders
      .filter(o => ['confirmed', 'shipped', 'delivered'].includes(o.status))
      .reduce((sum, order) => sum + order.amount, 0);

    const totalOrders = orders.length;
    const activeProducts = products.filter(p => p.status === 'active').length;

    const kpis = {
      mrr: totalRevenue,
      totalSales: totalOrders,
      activeProducts: activeProducts,
      churn: 15, // This would need more complex calculation
      cac: 45,   // This would need marketing data
      clv: 890   // This would need customer lifetime analysis
    };

    res.json(kpis);
  } catch (error) {
    console.error('Error calculating KPIs:', error);
    res.status(500).json({ error: error.message });
  }
});

// Alerts endpoints
app.get('/api/alerts', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const alerts = await alertService.getAllAlerts(limit);
    res.json(alerts);
  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/alerts/:id/read', async (req, res) => {
  try {
    const alert = await alertService.markAsRead(req.params.id);
    res.json(alert);
  } catch (error) {
    console.error('Error marking alert as read:', error);
    res.status(500).json({ error: error.message });
  }
});

// Content Management endpoints
app.post('/api/content', async (req, res) => {
  try {
    const content = await contentService.saveContent(req.body);
    res.json(content);
  } catch (error) {
    console.error('Error saving content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/content', async (req, res) => {
  try {
    const { user_id, content_type, limit } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    let content;
    if (content_type) {
      content = await contentService.getContentByType(user_id, content_type);
    } else {
      content = await contentService.getUserContent(user_id, limit ? parseInt(limit) : 50);
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/content/:id', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const content = await contentService.getContentById(req.params.id, user_id);
    if (!content) {
      return res.status(404).json({ error: 'Content not found' });
    }
    
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/content/:id', async (req, res) => {
  try {
    const { user_id, ...updates } = req.body;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const content = await contentService.updateContent(req.params.id, user_id, updates);
    res.json(content);
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/content/:id', async (req, res) => {
  try {
    const { user_id } = req.query;
    
    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const result = await contentService.deleteContent(req.params.id, user_id);
    res.json(result);
  } catch (error) {
    console.error('Error deleting content:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/content/stats/:user_id', async (req, res) => {
  try {
    const stats = await contentService.getContentStats(req.params.user_id);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching content stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint for manual webhook testing
app.post('/api/test/webhook', async (req, res) => {
  try {
    console.log('🧪 Test webhook received:', req.body);
    const results = await webhookProcessor.processWebhookData(req.body, 'test');
    res.json({ success: true, results });
  } catch (error) {
    console.error('Test webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start HTTP server
const server = app.listen(PORT, async () => {
  console.log(`🚀 MLBoost server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:5173`);
  console.log(`🔗 n8n webhook: http://localhost:${PORT}/webhook/n8n`);
  console.log(`🤖 AI content generation: http://localhost:${PORT}/api/generate-content`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  
  // Test Supabase connection on startup
  const connected = await testConnection();
  if (!connected) {
    console.log('⚠️  Server started but Supabase connection failed');
    console.log('📝 Make sure to configure your .env file with Supabase credentials');
  }
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('📡 New WebSocket connection established');
  
  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to MLBoost server',
    timestamp: new Date().toISOString()
  }));
  
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      console.log('📨 WebSocket message received:', data);
      
      // Handle different message types
      switch (data.type) {
        case 'subscribe':
          // Client wants to subscribe to updates
          ws.send(JSON.stringify({
            type: 'subscribed',
            channels: data.channels || ['all'],
            timestamp: new Date().toISOString()
          }));
          break;
          
        case 'ping':
          // Heartbeat
          ws.send(JSON.stringify({
            type: 'pong',
            timestamp: new Date().toISOString()
          }));
          break;
          
        default:
          // Echo back unknown messages
          ws.send(JSON.stringify({
            type: 'response',
            originalMessage: data,
            timestamp: new Date().toISOString()
          }));
      }
    } catch (error) {
      console.error('❌ Error parsing WebSocket message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format',
        timestamp: new Date().toISOString()
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('📡 WebSocket connection closed');
  });
  
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });
});

// Periodic tasks
setInterval(async () => {
  try {
    // Check for low stock alerts every 5 minutes
    await alertService.checkLowStockAlerts();
  } catch (error) {
    console.error('Error in periodic low stock check:', error);
  }
}, 5 * 60 * 1000); // 5 minutes

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

module.exports = app;