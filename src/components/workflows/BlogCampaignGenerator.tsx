import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  ChevronRight,
  FileText,
  Users,
  Target,
  Share2,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  Globe
} from 'lucide-react';
import { aiService } from '../../services/api';

interface BlogCampaignGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
}

const BlogCampaignGenerator: React.FC<BlogCampaignGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  // Form data
  const [blogData, setBlogData] = useState({
    theme: '',
    audience: '',
    industry: '',
    keywords: '',
    tone: 'Profissional'
  });

  // Generated content
  const [generatedTitles, setGeneratedTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [generatedOutline, setGeneratedOutline] = useState<any>(null);
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [generatedSocialPosts, setGeneratedSocialPosts] = useState<any>(null);

  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    titles: false,
    outline: false,
    article: false,
    social: false
  });

  // Workflow steps
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: WorkflowStep[] = [
    {
      id: 'input',
      title: 'Definir Tema',
      description: 'Configure o tema e público-alvo do seu blog',
      completed: !!blogData.theme,
      active: currentStep === 0
    },
    {
      id: 'titles',
      title: 'Gerar Títulos',
      description: 'IA criará 5 opções de títulos otimizados',
      completed: generatedTitles.length > 0,
      active: currentStep === 1
    },
    {
      id: 'outline',
      title: 'Criar Estrutura',
      description: 'Estrutura detalhada do artigo com tópicos',
      completed: !!generatedOutline,
      active: currentStep === 2
    },
    {
      id: 'article',
      title: 'Escrever Artigo',
      description: 'Artigo completo baseado na estrutura',
      completed: !!generatedArticle,
      active: currentStep === 3
    },
    {
      id: 'social',
      title: 'Posts Sociais',
      description: 'Posts para LinkedIn, Instagram, Twitter e Facebook',
      completed: !!generatedSocialPosts,
      active: currentStep === 4
    }
  ];

  const audiences = [
    'Empreendedores',
    'Profissionais de Marketing',
    'Gestores e Executivos',
    'Pequenos Empresários',
    'Estudantes',
    'Freelancers',
    'Consultores',
    'Vendedores',
    'Público Geral'
  ];

  const industries = [
    'Tecnologia',
    'Marketing Digital',
    'E-commerce',
    'Saúde',
    'Educação',
    'Finanças',
    'Consultoria',
    'Varejo',
    'Serviços',
    'Outros'
  ];

  const tones = [
    'Profissional',
    'Casual e Amigável',
    'Educativo',
    'Inspirador',
    'Técnico',
    'Conversacional'
  ];

  const handleGenerateTitles = async () => {
    if (!isOnboardingComplete && freeUsesRemaining === 0) {
      onShowOnboarding();
      return;
    }

    setLoadingStates(prev => ({ ...prev, titles: true }));
    
    let newUsesRemaining = freeUsesRemaining;
    if (!isOnboardingComplete) {
      newUsesRemaining = await consumeFreeUse();
    }

    try {
      const response = await aiService.generateBlogTitles({
        theme: blogData.theme,
        audience: blogData.audience,
        industry: blogData.industry,
        keywords: blogData.keywords
      });

      if (response.success) {
        setGeneratedTitles(response.result.titles);
        setCurrentStep(1);
      }
    } catch (error) {
      console.error('Error generating titles:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, titles: false }));
    }

    if (!isOnboardingComplete && newUsesRemaining === 0) {
      setTimeout(() => {
        onShowOnboarding();
      }, 3000);
    }
  };

  const handleGenerateOutline = async () => {
    if (!selectedTitle) return;

    setLoadingStates(prev => ({ ...prev, outline: true }));

    try {
      const response = await aiService.generateBlogOutline({
        title: selectedTitle,
        theme: blogData.theme,
        audience: blogData.audience,
        keywords: blogData.keywords
      });

      if (response.success) {
        setGeneratedOutline(response.result.outline);
        setCurrentStep(2);
      }
    } catch (error) {
      console.error('Error generating outline:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, outline: false }));
    }
  };

  const handleGenerateArticle = async () => {
    if (!generatedOutline) return;

    setLoadingStates(prev => ({ ...prev, article: true }));

    try {
      const response = await aiService.generateFullBlogArticle({
        title: selectedTitle,
        outline: generatedOutline,
        theme: blogData.theme,
        audience: blogData.audience,
        tone: blogData.tone
      });

      if (response.success) {
        setGeneratedArticle(response.result.article);
        setCurrentStep(3);
      }
    } catch (error) {
      console.error('Error generating article:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, article: false }));
    }
  };

  const handleGenerateSocialPosts = async () => {
    if (!generatedArticle) return;

    setLoadingStates(prev => ({ ...prev, social: true }));

    try {
      const keyPoints = generatedOutline?.sections?.slice(0, 3).map((section: any) => section.title) || [];
      
      const response = await aiService.generateSocialMediaPostsForArticle({
        title: selectedTitle,
        theme: blogData.theme,
        audience: blogData.audience,
        articleUrl: 'https://seublog.com/artigo',
        keyPoints
      });

      if (response.success) {
        setGeneratedSocialPosts(response.result.posts);
        setCurrentStep(4);
      }
    } catch (error) {
      console.error('Error generating social posts:', error);
    } finally {
      setLoadingStates(prev => ({ ...prev, social: false }));
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const canProceedToTitles = blogData.theme.trim().length > 0;
  const canProceedToOutline = selectedTitle.length > 0;
  const canProceedToArticle = !!generatedOutline;
  const canProceedToSocial = !!generatedArticle;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Campanha Completa para Blog</h2>
            <p className="text-gray-600">Do tema aos posts sociais - workflow completo automatizado</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step.completed ? 'bg-green-500 border-green-500 text-white' :
                    step.active ? 'bg-purple-500 border-purple-500 text-white' :
                    'bg-gray-100 border-gray-300 text-gray-400'
                  }`}>
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center max-w-24">
                    <div className={`text-xs font-medium ${
                      step.completed ? 'text-green-600' :
                      step.active ? 'text-purple-600' :
                      'text-gray-400'
                    }`}>
                      {step.title}
                    </div>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    steps[index + 1].completed || (steps[index + 1].active && step.completed)
                      ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Input */}
          <div className={`${currentStep !== 0 && steps[0].completed ? 'opacity-50' : ''}`}>
            <div className="flex items-center mb-4">
              <FileText className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">1. Configure o Tema do Blog</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tema Principal *
                </label>
                <input
                  type="text"
                  value={blogData.theme}
                  onChange={(e) => setBlogData({...blogData, theme: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ex: Inteligência Artificial para Pequenas Empresas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Público-alvo
                </label>
                <select
                  value={blogData.audience}
                  onChange={(e) => setBlogData({...blogData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione o público</option>
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Setor/Indústria
                </label>
                <select
                  value={blogData.industry}
                  onChange={(e) => setBlogData({...blogData, industry: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione o setor</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave SEO
                </label>
                <input
                  type="text"
                  value={blogData.keywords}
                  onChange={(e) => setBlogData({...blogData, keywords: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="IA, automação, pequenas empresas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom de Voz
                </label>
                <select
                  value={blogData.tone}
                  onChange={(e) => setBlogData({...blogData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGenerateTitles}
                disabled={!canProceedToTitles || loadingStates.titles || (!isOnboardingComplete && freeUsesRemaining === 0)}
                className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loadingStates.titles ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                  </motion.div>
                ) : !isOnboardingComplete && freeUsesRemaining === 0 ? (
                  <>
                    <Lock className="w-5 h-5 mr-2" />
                    Complete o Cadastro
                  </>
                ) : (
                  <Lightbulb className="w-5 h-5 mr-2" />
                )}
                {loadingStates.titles ? 'Gerando Títulos...' : 
                 !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
                 'Gerar Títulos'}
              </button>
            </div>
          </div>

          {/* Step 2: Titles */}
          {generatedTitles.length > 0 && (
            <div className={`${currentStep !== 1 && steps[1].completed ? 'opacity-50' : ''}`}>
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">2. Escolha o Melhor Título</h3>
              </div>
              
              <div className="space-y-3">
                {generatedTitles.map((title, index) => (
                  <div
                    key={index}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTitle === title
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => setSelectedTitle(title)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{title}</h4>
                      </div>
                      <div className="flex items-center space-x-2">
                        {selectedTitle === title && (
                          <CheckCircle className="w-5 h-5 text-purple-500" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(title);
                          }}
                          className="p-1 text-gray-400 hover:text-purple-600 rounded"
                          title="Copiar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGenerateOutline}
                  disabled={!canProceedToOutline || loadingStates.outline}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loadingStates.outline ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <FileText className="w-5 h-5 mr-2" />
                  )}
                  {loadingStates.outline ? 'Gerando Estrutura...' : 'Gerar Estrutura do Artigo'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Outline */}
          {generatedOutline && (
            <div className={`${currentStep !== 2 && steps[2].completed ? 'opacity-50' : ''}`}>
              <div className="flex items-center mb-4">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">3. Estrutura do Artigo</h3>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{generatedOutline.title}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Introdução</h5>
                    <p className="text-sm text-gray-600">{generatedOutline.introduction?.hook}</p>
                  </div>
                  
                  {generatedOutline.sections?.map((section: any, index: number) => (
                    <div key={index}>
                      <h5 className="font-medium text-gray-800 mb-2">{section.title}</h5>
                      <ul className="text-sm text-gray-600 ml-4">
                        {section.subsections?.map((subsection: string, subIndex: number) => (
                          <li key={subIndex} className="list-disc">{subsection}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Conclusão</h5>
                    <p className="text-sm text-gray-600">{generatedOutline.conclusion?.summary}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Tempo de leitura estimado: {generatedOutline.seoElements?.readingTime}
                  </div>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(generatedOutline, null, 2))}
                    className="p-2 text-gray-400 hover:text-purple-600 rounded"
                    title="Copiar estrutura"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGenerateArticle}
                  disabled={!canProceedToArticle || loadingStates.article}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loadingStates.article ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <PenTool className="w-5 h-5 mr-2" />
                  )}
                  {loadingStates.article ? 'Escrevendo Artigo...' : 'Escrever Artigo Completo'}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Article */}
          {generatedArticle && (
            <div className={`${currentStep !== 3 && steps[3].completed ? 'opacity-50' : ''}`}>
              <div className="flex items-center mb-4">
                <PenTool className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">4. Artigo Completo</h3>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">
                    {generatedArticle.split(' ').length} palavras • {Math.ceil(generatedArticle.split(' ').length / 200)} min de leitura
                  </div>
                  <button
                    onClick={() => copyToClipboard(generatedArticle)}
                    className="p-2 text-gray-400 hover:text-purple-600 rounded"
                    title="Copiar artigo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                  {generatedArticle}
                </pre>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleGenerateSocialPosts}
                  disabled={!canProceedToSocial || loadingStates.social}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loadingStates.social ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5 mr-2" />
                    </motion.div>
                  ) : (
                    <Share2 className="w-5 h-5 mr-2" />
                  )}
                  {loadingStates.social ? 'Gerando Posts...' : 'Gerar Posts para Redes Sociais'}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Social Posts */}
          {generatedSocialPosts && (
            <div>
              <div className="flex items-center mb-4">
                <Share2 className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">5. Posts para Redes Sociais</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(generatedSocialPosts).map(([platform, content]) => (
                  <div key={platform} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900 capitalize">{platform}</h4>
                      <button
                        onClick={() => copyToClipboard(content as string)}
                        className="p-2 text-gray-400 hover:text-purple-600 rounded"
                        title="Copiar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                        {content as string}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Success Message */}
        {generatedSocialPosts && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700">
              <CheckCircle className="w-6 h-6 mr-3" />
              <div>
                <h4 className="font-semibold">Campanha Completa Criada com Sucesso! 🎉</h4>
                <p className="text-sm mt-1">
                  Você agora tem um artigo completo + posts otimizados para todas as redes sociais. 
                  Pronto para publicar e engajar sua audiência!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCampaignGenerator;