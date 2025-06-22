const { supabase } = require('../config/supabase');

class OrderService {
  // Create new order
  async createOrder(orderData) {
    try {
      const order = {
        id: orderData.id || orderData.order_id,
        product_id: orderData.product_id || orderData.productId,
        buyer_name: orderData.buyer_name || orderData.buyerName,
        buyer_email: orderData.buyer_email,
        amount: parseFloat(orderData.amount) || 0,
        quantity: parseInt(orderData.quantity) || 1,
        status: orderData.status || 'pending',
        platform: orderData.platform || 'unknown',
        tracking_code: orderData.tracking_code,
        payment_method: orderData.payment_method,
        shipping_address: orderData.shipping_address,
        created_at: orderData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('orders')
        .insert(order)
        .select();

      if (error) {
        console.error('Error creating order:', error);
        throw error;
      }

      console.log('✅ Order created successfully:', order.id);
      return data[0];
    } catch (error) {
      console.error('❌ OrderService.createOrder error:', error);
      throw error;
    }
  }

  // Update order status
  async updateOrderStatus(orderId, status, trackingCode = null) {
    try {
      const updateData = {
        status,
        updated_at: new Date().toISOString()
      };

      if (trackingCode) {
        updateData.tracking_code = trackingCode;
      }

      const { data, error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('❌ OrderService.updateOrderStatus error:', error);
      throw error;
    }
  }

  // Get all orders
  async getAllOrders(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          products (
            title,
            price,
            platform
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ OrderService.getAllOrders error:', error);
      throw error;
    }
  }

  // Get orders by status
  async getOrdersByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          products (
            title,
            price,
            platform
          )
        `)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ OrderService.getOrdersByStatus error:', error);
      throw error;
    }
  }

  // Get revenue analytics
  async getRevenueAnalytics(days = 30) {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const { data, error } = await supabase
        .from('orders')
        .select('amount, created_at, platform')
        .gte('created_at', startDate.toISOString())
        .in('status', ['confirmed', 'shipped', 'delivered']);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ OrderService.getRevenueAnalytics error:', error);
      throw error;
    }
  }
}

module.exports = new OrderService();