const { supabase } = require('../config/supabase');

class ProductService {
  // Create or update product
  async upsertProduct(productData) {
    try {
      const product = {
        id: productData.id || productData.product_id,
        title: productData.title || productData.name,
        price: parseFloat(productData.price) || 0,
        stock: parseInt(productData.stock) || 0,
        sold: parseInt(productData.sold) || 0,
        status: productData.status || 'active',
        platform: productData.platform || 'unknown',
        category: productData.category,
        description: productData.description,
        images: productData.images || [],
        last_sync: new Date().toISOString(),
        created_at: productData.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('products')
        .upsert(product, { 
          onConflict: 'id',
          returning: 'representation'
        });

      if (error) {
        console.error('Error upserting product:', error);
        throw error;
      }

      console.log('✅ Product upserted successfully:', product.id);
      return data[0];
    } catch (error) {
      console.error('❌ ProductService.upsertProduct error:', error);
      throw error;
    }
  }

  // Get all products
  async getAllProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ ProductService.getAllProducts error:', error);
      throw error;
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('❌ ProductService.getProductById error:', error);
      throw error;
    }
  }

  // Update product stock
  async updateStock(productId, newStock) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ 
          stock: newStock,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('❌ ProductService.updateStock error:', error);
      throw error;
    }
  }

  // Get low stock products
  async getLowStockProducts(threshold = 10) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .lte('stock', threshold)
        .eq('status', 'active');

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('❌ ProductService.getLowStockProducts error:', error);
      throw error;
    }
  }
}

module.exports = new ProductService();