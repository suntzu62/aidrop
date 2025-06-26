const productService = require('./productService');
const orderService = require('./orderService');
const alertService = require('./alertService');

class WebhookProcessor {
  // Process incoming webhook data from n8n
  async processWebhookData(data, source = 'n8n') {
    try {
      console.log('🔄 Processing webhook data from:', source);
      console.log('📦 Data received:', JSON.stringify(data, null, 2));

      const results = {
        processed: [],
        errors: [],
        alerts: []
      };

      // Handle different types of data
      if (data.type) {
        switch (data.type.toLowerCase()) {
          case 'product':
          case 'product_update':
            await this.processProductData(data, results);
            break;
          
          case 'order':
          case 'new_order':
            await this.processOrderData(data, results);
            break;
          
          case 'stock_update':
            await this.processStockUpdate(data, results);
            break;
          
          case 'alert':
            await this.processAlertData(data, results);
            break;
          
          default:
            console.log('⚠️ Unknown data type:', data.type);
            await this.processGenericData(data, results);
        }
      } else {
        // Try to auto-detect data type
        await this.autoDetectAndProcess(data, results);
      }

      // Check for low stock alerts after processing
      await alertService.checkLowStockAlerts();

      console.log('✅ Webhook processing completed:', results);
      return results;
    } catch (error) {
      console.error('❌ WebhookProcessor.processWebhookData error:', error);
      throw error;
    }
  }

  // Process product data
  async processProductData(data, results) {
    try {
      // Ensure product has an ID - generate one if missing
      if (!data.id && !data.product_id) {
        data.id = `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      } else if (data.product_id && !data.id) {
        data.id = data.product_id;
      }

      const product = await productService.upsertProduct(data);
      results.processed.push({
        type: 'product',
        id: product.id,
        action: 'upserted'
      });

      // Create alert for new products
      if (data.action === 'created') {
        await alertService.createAlert({
          type: 'new_product',
          title: 'Novo Produto',
          message: `Produto "${product.title}" foi adicionado ao catálogo`,
          severity: 'low',
          source: 'webhook',
          metadata: { product_id: product.id }
        });
      }
    } catch (error) {
      results.errors.push({
        type: 'product',
        error: error.message,
        data: data
      });
    }
  }

  // Process order data
  async processOrderData(data, results) {
    try {
      const order = await orderService.createOrder(data);
      results.processed.push({
        type: 'order',
        id: order.id,
        action: 'created'
      });

      // Create alert for new orders
      await alertService.createAlert({
        type: 'new_order',
        title: 'Novo Pedido',
        message: `Novo pedido recebido: ${order.buyer_name} - R$ ${order.amount}`,
        severity: 'low',
        source: 'webhook',
        metadata: { 
          order_id: order.id,
          amount: order.amount,
          platform: order.platform
        }
      });

      // Update product stock if available
      if (order.product_id && order.quantity) {
        try {
          const product = await productService.getProductById(order.product_id);
          if (product) {
            const newStock = Math.max(0, product.stock - order.quantity);
            await productService.updateStock(order.product_id, newStock);
            
            results.processed.push({
              type: 'stock_update',
              product_id: order.product_id,
              old_stock: product.stock,
              new_stock: newStock
            });
          }
        } catch (stockError) {
          console.error('Error updating stock for order:', stockError);
        }
      }
    } catch (error) {
      results.errors.push({
        type: 'order',
        error: error.message,
        data: data
      });
    }
  }

  // Process stock update
  async processStockUpdate(data, results) {
    try {
      const product = await productService.updateStock(data.product_id, data.stock);
      results.processed.push({
        type: 'stock_update',
        product_id: product.id,
        new_stock: product.stock
      });
    } catch (error) {
      results.errors.push({
        type: 'stock_update',
        error: error.message,
        data: data
      });
    }
  }

  // Process alert data
  async processAlertData(data, results) {
    try {
      const alert = await alertService.createAlert(data);
      results.processed.push({
        type: 'alert',
        id: alert.id,
        action: 'created'
      });
    } catch (error) {
      results.errors.push({
        type: 'alert',
        error: error.message,
        data: data
      });
    }
  }

  // Auto-detect data type and process
  async autoDetectAndProcess(data, results) {
    try {
      // Check if it looks like product data
      if (data.title || data.name || data.product_id) {
        await this.processProductData({ ...data, type: 'product' }, results);
        return;
      }

      // Check if it looks like order data
      if (data.buyer_name || data.order_id || data.amount) {
        await this.processOrderData({ ...data, type: 'order' }, results);
        return;
      }

      // Check if it looks like stock data
      if (data.stock !== undefined && data.product_id) {
        await this.processStockUpdate(data, results);
        return;
      }

      // Generic processing
      await this.processGenericData(data, results);
    } catch (error) {
      results.errors.push({
        type: 'auto_detect',
        error: error.message,
        data: data
      });
    }
  }

  // Process generic data
  async processGenericData(data, results) {
    try {
      // Create a generic alert for unrecognized data
      await alertService.createAlert({
        type: 'webhook_data',
        title: 'Dados Recebidos',
        message: 'Novos dados recebidos via webhook',
        severity: 'low',
        source: 'webhook',
        metadata: data
      });

      results.processed.push({
        type: 'generic',
        action: 'logged'
      });
    } catch (error) {
      results.errors.push({
        type: 'generic',
        error: error.message,
        data: data
      });
    }
  }
}

module.exports = new WebhookProcessor();