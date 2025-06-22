const { supabase } = require('../config/supabase');

class AlertService {
  // Create new alert
  async createAlert(alertData) {
    try {
      const alert = {
        id: alertData.id || `alert_${Date.now()}`,
        type: alertData.type || 'info',
        title: alertData.title || 'Novo Alerta',
        message: alertData.message,
        severity: alertData.severity || 'medium',
        source: alertData.source || 'system',
        metadata: alertData.metadata || {},
        read: false,
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('alerts')
        .insert(alert)
        .select();

      if (error) {
        console.error('Error creating alert:', error);
        throw error;
      }

      console.log('✅ Alert created successfully:', alert.id);
      return data[0];
    } catch (error) {
      console.error('❌ AlertService.createAlert error:', error);
      throw error;
    }
  }

  // Get all alerts
  async getAllAlerts(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ AlertService.getAllAlerts error:', error);
      throw error;
    }
  }

  // Mark alert as read
  async markAsRead(alertId) {
    try {
      const { data, error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', alertId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('❌ AlertService.markAsRead error:', error);
      throw error;
    }
  }

  // Check for low stock and create alerts
  async checkLowStockAlerts() {
    try {
      const productService = require('./productService');
      const lowStockProducts = await productService.getLowStockProducts(10);

      for (const product of lowStockProducts) {
        // Check if alert already exists for this product
        const { data: existingAlert } = await supabase
          .from('alerts')
          .select('id')
          .eq('type', 'low_stock')
          .eq('metadata->product_id', product.id)
          .eq('read', false)
          .single();

        if (!existingAlert) {
          await this.createAlert({
            type: 'low_stock',
            title: 'Estoque Baixo',
            message: `Produto "${product.title}" está com estoque baixo (${product.stock} unidades)`,
            severity: product.stock === 0 ? 'high' : 'medium',
            source: 'stock_monitor',
            metadata: {
              product_id: product.id,
              current_stock: product.stock,
              platform: product.platform
            }
          });
        }
      }
    } catch (error) {
      console.error('❌ AlertService.checkLowStockAlerts error:', error);
    }
  }
}

module.exports = new AlertService();