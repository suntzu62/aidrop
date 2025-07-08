import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Eye,
  Edit3,
  Trash2,
  Copy,
  Download,
  ArrowLeft,
  FileText,
  ShoppingBag,
  MessageSquare,
  Mail,
  Megaphone,
  Video,
  Calendar,
  Tag,
  User,
  Clock,
  BarChart3,
  TrendingUp,
  Star,
  Grid,
  List,
  RefreshCw,
  Package
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useStore } from '../store/useStore';
import { contentService } from '../services/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface SavedContent {
  id: string;
  user_id: string;
  content_type: string;
  title: string;
  content: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

const ContentLibraryPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { savedContents, setSavedContents, removeSavedContent } = useStore();
  
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stats, setStats] = useState<any>(null);
  const [selectedContent, setSelectedContent] = useState<SavedContent | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedContents();
      loadStats();
    } else {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const loadSavedContents = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const contents = await contentService.getSavedContents(user.id);
      setSavedContents(contents);
    } catch (error) {
      console.error('Error loading saved contents:', error);
      toast.error('Erro ao carregar conteúdo salvo');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!user) return;
    
    try {
      const statsData = await contentService.getContentStats(user.id);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (!user) return;
    
    if (!confirm('Tem certeza que deseja excluir este conteúdo?')) {
      return;
    }

    try {
      await contentService.deleteContent(contentId, user.id);
      removeSavedContent(contentId);
      toast.success('Conteúdo excluído com sucesso');
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Erro ao excluir conteúdo');
    }
  };

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Conteúdo copiado para a área de transferência');
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'product_description': return ShoppingBag;
      case 'blog_content': return FileText;
      case 'social_media_post': return MessageSquare;
      case 'email_marketing': return Mail;
      case 'ad_copy': return Megaphone;
      case 'video_script': return Video;
      default: return FileText;
    }
  };

  const getContentTypeLabel = (type: string) => {
    switch (type) {
      case 'product_description': return 'Descrição de Produto';
      case 'blog_content': return 'Conteúdo de Blog';
      case 'social_media_post': return 'Post para Redes Sociais';
      case 'email_marketing': return 'E-mail Marketing';
      case 'ad_copy': return 'Anúncio Publicitário';
      case 'video_script': return 'Roteiro de Vídeo';
      default: return 'Conteúdo';
    }
  };

  const getContentTypeColor = (type: string) => {
    switch (type) {
      case 'product_description': return 'bg-blue-100 text-blue-800';
      case 'blog_content': return 'bg-purple-100 text-purple-800';
      case 'social_media_post': return 'bg-pink-100 text-pink-800';
      case 'email_marketing': return 'bg-green-100 text-green-800';
      case 'ad_copy': return 'bg-orange-100 text-orange-800';
      case 'video_script': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredContents = savedContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || content.content_type === selectedType;
    return matchesSearch && matchesType;
  });

  const contentTypes = [...new Set(savedContents.map(c => c.content_type))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar sua biblioteca de conteúdo.</p>
          <Link
            to="/"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/generator"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Estúdio</span>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Biblioteca de Conteúdo
                </h1>
                <p className="text-lg text-gray-600">
                  Gerencie e organize todo o seu conteúdo gerado
                </p>
              </div>
            </div>
            
            <button
              onClick={loadSavedContents}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total de Conteúdos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Esta Semana</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.recentCount}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tipos Diferentes</p>
                  <p className="text-2xl font-bold text-gray-900">{Object.keys(stats.byType).length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Mais Usado</p>
                  <p className="text-sm font-medium text-gray-900">
                    {Object.entries(stats.byType).length > 0 
                      ? getContentTypeLabel(Object.entries(stats.byType).sort((a, b) => b[1] - a[1])[0][0])
                      : 'Nenhum'
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">Todos os tipos</option>
                {contentTypes.map(type => (
                  <option key={type} value={type}>{getContentTypeLabel(type)}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>{filteredContents.length} conteúdos encontrados</span>
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

        {/* Content Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredContents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
            }
          >
            {filteredContents.map((content, index) => {
              const Icon = getContentTypeIcon(content.content_type);
              
              return (
                <motion.div
                  key={content.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all ${
                    viewMode === 'list' ? 'p-6' : 'overflow-hidden'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(content.content_type)}`}>
                                {getContentTypeLabel(content.content_type)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {content.title}
                        </h3>
                        
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {content.content.substring(0, 150)}...
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {format(new Date(content.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                          </div>
                          <div>
                            {content.content.split(' ').length} palavras
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedContent(content);
                              setShowPreview(true);
                            }}
                            className="flex-1 bg-primary-600 text-white text-center py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </button>
                          <button
                            onClick={() => handleCopyContent(content.content)}
                            className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContent(content.id)}
                            className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {content.title}
                              </h3>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getContentTypeColor(content.content_type)}`}>
                                {getContentTypeLabel(content.content_type)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {content.content.substring(0, 200)}...
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {format(new Date(content.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                              </div>
                              <div>
                                {content.content.split(' ').length} palavras
                              </div>
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedContent(content);
                                setShowPreview(true);
                              }}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </button>
                            <button
                              onClick={() => handleCopyContent(content.content)}
                              className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteContent(content.id)}
                              className="p-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
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
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || selectedType !== 'all' ? 'Nenhum conteúdo encontrado' : 'Sua biblioteca está vazia'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedType !== 'all' 
                ? 'Tente ajustar os filtros de busca.' 
                : 'Comece gerando conteúdo no Estúdio de Conteúdo.'
              }
            </p>
            <Link
              to="/generator"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors inline-flex items-center"
            >
              <FileText className="w-5 h-5 mr-2" />
              Ir para o Estúdio
            </Link>
          </motion.div>
        )}

        {/* Content Preview Modal */}
        {showPreview && selectedContent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                      {React.createElement(getContentTypeIcon(selectedContent.content_type), { className: "w-5 h-5 text-primary-600" })}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedContent.title}</h2>
                      <p className="text-sm text-gray-600">{getContentTypeLabel(selectedContent.content_type)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans">
                    {selectedContent.content}
                  </pre>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Criado em {format(new Date(selectedContent.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopyContent(selectedContent.content)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copiar
                    </button>
                    <button
                      onClick={() => handleDeleteContent(selectedContent.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentLibraryPage;