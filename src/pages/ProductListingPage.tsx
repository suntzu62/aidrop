import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  ShoppingCart,
  Eye,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  Plus
} from 'lucide-react';
import { inventoryService } from '../services/api';

interface Product {
  id: string;
  title: string;
  price: number;
  stock: number;
  sold: number;
  status: 'active' | 'paused' | 'closed';
  platform: string;
  category: string;
  description: string;
  images: string[];
  last_sync: string;
  created_at: string;
  updated_at: string;
}

const ProductListingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('updated_at');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await inventoryService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      // Set fallback data for demo
      setProducts([
        {
          id: 'PROD001',
          title: 'Smartphone Samsung Galaxy A54 128GB',
          price: 1299.99,
          stock: 15,
          sold: 45,
          status: 'active',
          platform: 'Mercado Livre',
          category: 'Eletrônicos',
          description: 'Smartphone com tela AMOLED de 6.4", câmera tripla de 50MP e bateria de 5000mAh.',
          images: ['https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg'],
          last_sync: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'PROD002',
          title: 'Notebook Dell Inspiron 15 Intel i5',
          price: 2499.99,
          stock: 8,
          sold: 23,
          status: 'active',
          platform: 'Amazon',
          category: 'Eletrônicos',
          description: 'Notebook com processador Intel i5, 8GB RAM, SSD 256GB e tela Full HD de 15.6".',
          images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
          last_sync: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'PROD003',
          title: 'Fone de Ouvido Bluetooth JBL',
          price: 199.99,
          stock: 32,
          sold: 78,
          status: 'active',
          platform: 'Shopee',
          category: 'Eletrônicos',
          description: 'Fone de ouvido sem fio com cancelamento de ruído e bateria de 30 horas.',
          images: ['https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'],
          last_sync: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  const platforms = [...new Set(products.map(p => p.platform).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesPlatform = selectedPlatform === 'all' || product.platform === selectedPlatform;
    
    return matchesSearch && matchesCategory && matchesPlatform;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'stock':
        return b.stock - a.stock;
      case 'sold':
        return b.sold - a.sold;
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', bg: 'bg-red-100', label: 'Esgotado' };
    if (stock < 10) return { color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Baixo' };
    return { color: 'text-green-600', bg: 'bg-green-100', label: 'Disponível' };
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Mercado Livre': return 'bg-yellow-100 text-yellow-800';
      case 'Amazon': return 'bg-orange-100 text-orange-800';
      case 'Shopee': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Catálogo de Produtos
              </h1>
              <p className="text-lg text-gray-600">
                Gerencie e visualize todos os seus produtos em um só lugar
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/products/register"
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Produto</span>
              </Link>
              <button
                onClick={loadProducts}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Atualizar</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Todas as categorias</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Todas as plataformas</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="updated_at">Mais recentes</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="stock">Maior estoque</option>
                <option value="sold">Mais vendidos</option>
              </select>
            </div>
          </div>

          {/* View Mode and Stats */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{filteredProducts.length} produtos encontrados</span>
              <span>•</span>
              <span>{products.filter(p => p.status === 'active').length} ativos</span>
              <span>•</span>
              <span>{products.filter(p => p.stock < 10).length} com estoque baixo</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }
          >
            {filteredProducts.map((product, index) => {
              const stockStatus = getStockStatus(product.stock);
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all ${
                    viewMode === 'list' ? 'p-6' : 'overflow-hidden'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    // Grid View
                    <>
                      {/* Product Image */}
                      <div className="relative h-48 bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                            {stockStatus.label}
                          </span>
                        </div>

                        {/* Platform Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(product.platform)}`}>
                            {product.platform}
                          </span>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-bold text-primary-600">
                            R$ {product.price.toFixed(2)}
                          </span>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <TrendingUp className="w-4 h-4" />
                            <span>{product.sold} vendidos</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-600">
                            Estoque: <span className="font-medium">{product.stock}</span>
                          </div>
                          {product.stock < 10 && (
                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Link
                            to={`/products/${product.id}`}
                            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {product.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(product.platform)}`}>
                                {product.platform}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                                {stockStatus.label}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary-600 mb-1">
                              R$ {product.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600 mb-2">
                              Estoque: {product.stock} | Vendidos: {product.sold}
                            </div>
                            <Link
                              to={`/products/${product.id}`}
                              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou adicionar novos produtos ao seu catálogo.
            </p>
            <button
              onClick={loadProducts}
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Recarregar Produtos
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;