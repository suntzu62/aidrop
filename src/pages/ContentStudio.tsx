import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Zap, 
  Copy, 
  Download, 
  Sparkles,
  Target,
  Search,
  TrendingUp,
  Lock,
  Gift,
  PenTool,
  MessageSquare,
  Mail,
  Megaphone,
  Video,
  ShoppingBag,
  Globe,
  Users,
  Heart,
  Star,
  Briefcase
} from 'lucide-react';
import { useOnboarding } from '../hooks/useOnboarding';
import OnboardingForm from '../components/OnboardingForm';
import ProductDescriptionGenerator from '../components/workflows/ProductDescriptionGenerator';
import BlogContentGenerator from '../components/workflows/BlogContentGenerator';
import SocialMediaPostGenerator from '../components/workflows/SocialMediaPostGenerator';
import EmailMarketingGenerator from '../components/workflows/EmailMarketingGenerator';
import AdCopyGenerator from '../components/workflows/AdCopyGenerator';
import VideoScriptGenerator from '../components/workflows/VideoScriptGenerator';

const ContentStudio = () => {
  const {
    freeUsesRemaining,
    isOnboardingComplete,
    loading: onboardingLoading,
    consumeFreeUse,
    completeOnboarding
  } = useOnboarding();

  const [selectedWorkflow, setSelectedWorkflow] = useState('product-description');
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  // Check if user should see onboarding form
  useEffect(() => {
    if (!onboardingLoading) {
      setShowOnboardingForm(!isOnboardingComplete && freeUsesRemaining === 0);
    }
  }, [isOnboardingComplete, onboardingLoading]);

  const workflows = [
    {
      id: 'product-description',
      title: 'Descrições de Produto',
      description: 'Crie descrições otimizadas para e-commerce que convertem',
      icon: ShoppingBag,
      color: 'from-blue-500 to-blue-600',
      category: 'E-commerce'
    },
    {
      id: 'blog-content',
      title: 'Conteúdo para Blog',
      description: 'Gere introduções, tópicos e artigos completos para blog',
      icon: PenTool,
      color: 'from-purple-500 to-purple-600',
      category: 'Conteúdo'
    },
    {
      id: 'social-media',
      title: 'Posts para Redes Sociais',
      description: 'Crie posts envolventes para Instagram, Facebook, LinkedIn',
      icon: MessageSquare,
      color: 'from-pink-500 to-pink-600',
      category: 'Social Media'
    },
    {
      id: 'email-marketing',
      title: 'E-mail Marketing',
      description: 'Desenvolva campanhas de e-mail que geram resultados',
      icon: Mail,
      color: 'from-green-500 to-green-600',
      category: 'Marketing'
    },
    {
      id: 'ad-copy',
      title: 'Anúncios Publicitários',
      description: 'Crie copy para Google Ads, Facebook Ads e outras plataformas',
      icon: Megaphone,
      color: 'from-orange-500 to-orange-600',
      category: 'Publicidade'
    },
    {
      id: 'video-script',
      title: 'Roteiros para Vídeo',
      description: 'Desenvolva scripts para YouTube, TikTok e apresentações',
      icon: Video,
      color: 'from-red-500 to-red-600',
      category: 'Vídeo'
    }
  ];

  const categories = [...new Set(workflows.map(w => w.category))];

  const handleOnboardingSubmit = async (data: any) => {
    const success = await completeOnboarding(data);
    if (success) {
      setShowOnboardingForm(false);
    }
    return success;
  };

  const renderWorkflowComponent = () => {
    const commonProps = {
      freeUsesRemaining,
      isOnboardingComplete,
      consumeFreeUse,
      onShowOnboarding: () => setShowOnboardingForm(true)
    };

    switch (selectedWorkflow) {
      case 'product-description':
        return <ProductDescriptionGenerator {...commonProps} />;
      case 'blog-content':
        return <BlogContentGenerator {...commonProps} />;
      case 'social-media':
        return <SocialMediaPostGenerator {...commonProps} />;
      case 'email-marketing':
        return <EmailMarketingGenerator {...commonProps} />;
      case 'ad-copy':
        return <AdCopyGenerator {...commonProps} />;
      case 'video-script':
        return <VideoScriptGenerator {...commonProps} />;
      default:
        return <ProductDescriptionGenerator {...commonProps} />;
    }
  };

  // Show onboarding form if needed
  if (showOnboardingForm) {
    return (
      <OnboardingForm 
        onSubmit={handleOnboardingSubmit}
        loading={onboardingLoading}
      />
    );
  }

  // Show loading state
  if (onboardingLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center mr-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Estúdio de Conteúdo
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Powered by AI • Criado para Conversão
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Crie conteúdo de alta conversão para qualquer canal de marketing com nossa IA especializada em vendas e engajamento
          </p>

          {/* Free Trial Banner */}
          {!isOnboardingComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center mb-2">
                <Gift className="w-6 h-6 text-green-600 mr-3" />
                <span className="text-green-800 font-semibold text-lg">
                  {freeUsesRemaining > 0 
                    ? `${freeUsesRemaining} teste${freeUsesRemaining !== 1 ? 's' : ''} gratuito${freeUsesRemaining !== 1 ? 's' : ''} restante${freeUsesRemaining !== 1 ? 's' : ''}` 
                    : 'Teste gratuito usado'}
                </span>
              </div>
              <p className="text-sm text-green-700">
                {freeUsesRemaining > 0 
                  ? 'Experimente qualquer ferramenta gratuitamente'
                  : 'Complete seu cadastro para acesso ilimitado a todas as ferramentas'
                }
              </p>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Workflow Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 text-primary-600 mr-2" />
                Ferramentas de IA
              </h2>

              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      {category}
                    </h3>
                    <div className="space-y-2">
                      {workflows
                        .filter(workflow => workflow.category === category)
                        .map((workflow) => {
                          const Icon = workflow.icon;
                          const isSelected = selectedWorkflow === workflow.id;
                          
                          return (
                            <button
                              key={workflow.id}
                              onClick={() => setSelectedWorkflow(workflow.id)}
                              className={`w-full text-left p-4 rounded-xl transition-all ${
                                isSelected
                                  ? 'bg-gradient-to-r ' + workflow.color + ' text-white shadow-lg transform scale-105'
                                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                                <div className="flex-1 min-w-0">
                                  <h4 className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                    {workflow.title}
                                  </h4>
                                  <p className={`text-xs mt-1 ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                                    {workflow.description}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Usage Stats */}
              <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Uso Hoje</span>
                  <span className="text-sm text-primary-600 font-semibold">
                    {isOnboardingComplete ? '∞' : `${1 - freeUsesRemaining}/1`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all"
                    style={{ 
                      width: isOnboardingComplete ? '100%' : `${((1 - freeUsesRemaining) / 1) * 100}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {isOnboardingComplete 
                    ? 'Acesso ilimitado ativo' 
                    : 'Complete o cadastro para uso ilimitado'
                  }
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWorkflow}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderWorkflowComponent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher nosso Estúdio de Conteúdo?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tecnologia de ponta para resultados excepcionais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: 'SEO Otimizado',
                description: 'Todo conteúdo é otimizado para mecanismos de busca e algoritmos de plataformas',
                color: 'text-blue-600'
              },
              {
                icon: TrendingUp,
                title: 'Alta Conversão',
                description: 'IA treinada com milhões de conteúdos de alta performance e conversão',
                color: 'text-green-600'
              },
              {
                icon: Zap,
                title: 'Velocidade Extrema',
                description: 'Gere conteúdo profissional em segundos, não em horas',
                color: 'text-purple-600'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center hover:shadow-lg transition-all">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    feature.color === 'text-blue-600' ? 'bg-blue-100' :
                    feature.color === 'text-green-600' ? 'bg-green-100' :
                    'bg-purple-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentStudio;