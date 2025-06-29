import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft,
  Package,
  Star,
  ShoppingCart,
  TrendingUp,
  Calendar,
  MapPin,
  Edit3,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  DollarSign,
  Users,
  Eye,
  Share2,
  Heart,
  RefreshCw
} from 'lucide-react';
import { inventoryService } from '../services/api';
import { format } from 'date-fns';

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

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId: string) => {
    setLoading(true);
    try {
      const data = await inventoryService.getProducts();
      const foundProduct = data.find((p: Product) => p.id === productId);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Fallback product for demo
        setProduct({
          id: productId,
          title: 'Smartphone Samsung Galaxy A54 128GB',
          price: 1299.99,
          stock: 15,
          sold: 45,
          status: 'active',
          platform: 'Mercado Livre',
          category: 'Eletrônicos',
          description: 'Smartphone Samsung Galaxy A54 com tela Super AMOLED de 6.4", processador Exynos 1380, câmera tripla de 50MP + 12MP + 5MP, câmera frontal de 32MP, 128GB de armazenamento, 6GB de RAM, bateria de 5000mAh com carregamento rápido de 25W, resistência à água IP67, Android 13 com One UI 5.1.',
          images: [
            'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
            'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
            'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'
          ],
          last_sync: new Date().toISOString(),
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { 
      color: 'text-red-600', 
      bg: 'bg-red-100', 
      icon: AlertTriangle,
      label: 'Esgotado' 
    };
    if (stock < 10) return { 
      color: 'text-yellow-600', 
      bg: 'bg-yellow-100', 
      icon: AlertTriangle,
      label: 'Estoque Baixo' 
    };
    return { 
      color: 'text-green-600', 
      bg: 'bg-green-100', 
      icon: CheckCircle,
      label: 'Disponível' 
    };
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Mercado Livre': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Amazon': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Shopee': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'closed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Produto não encontrado</h2>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <Link
            to="/products"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Voltar ao Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);
  const StatusIcon = stockStatus.icon;

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/products" className="hover:text-primary-600 transition-colors">
              Produtos
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 relative">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImageIndex]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-24 h-24 text-gray-400" />
                  </div>
                )}
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${stockStatus.bg} ${stockStatus.color}`}>
                    <StatusIcon className="w-4 h-4 mr-2" />
                    {stockStatus.label}
                  </span>
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Image Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          selectedImageIndex === index ? 'border-primary-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPlatformColor(product.platform)}`}>
                  {product.platform}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(product.status)}`}>
                  {product.status === 'active' ? 'Ativo' : 
                   product.status === 'paused' ? 'Pausado' : 'Fechado'}
                </span>
                {product.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    {product.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="text-4xl font-bold text-primary-600">
                  R$ {product.price.toFixed(2)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>{product.sold} vendidos</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    <span>{product.stock} em estoque</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{product.sold}</div>
                  <div className="text-sm text-gray-600">Vendas Totais</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    R$ {(product.price * product.sold).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Receita Total</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{product.stock}</div>
                  <div className="text-sm text-gray-600">Estoque Atual</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-sm text-gray-600">Avaliação</div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Produto</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">ID do Produto</span>
                  <span className="font-medium text-gray-900">{product.id}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Categoria</span>
                  <span className="font-medium text-gray-900">{product.category || 'Não definida'}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Plataforma</span>
                  <span className="font-medium text-gray-900">{product.platform}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Status</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status === 'active' ? 'Ativo' : 
                     product.status === 'paused' ? 'Pausado' : 'Fechado'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Criado em</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date(product.created_at), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-600">Última sincronização</span>
                  <span className="font-medium text-gray-900">
                    {format(new Date(product.last_sync), 'dd/MM/yyyy HH:mm')}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center">
                <Edit3 className="w-5 h-5 mr-2" />
                Editar Produto
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <ExternalLink className="w-5 h-5 mr-2" />
                Ver na Plataforma
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;