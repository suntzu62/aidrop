import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  BarChart3, 
  Users, 
  Star,
  Check,
  ArrowRight,
  ShoppingCart,
  Target,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Award,
  Shield,
  Clock,
  DollarSign,
  Search,
  MessageSquare,
  Mail,
  Megaphone,
  Video,
  PenTool,
  Bot,
  ChevronRight,
  Play
} from 'lucide-react';

const LandingPage = () => {
  // Platform logos for social proof
  const platformLogos = [
    { name: 'Mercado Livre', color: 'text-yellow-600' },
    { name: 'Shopee', color: 'text-red-500' },
    { name: 'Amazon', color: 'text-orange-500' },
    { name: 'Magazine Luiza', color: 'text-blue-600' },
    { name: 'Americanas', color: 'text-red-600' }
  ];

  // Solution workflow steps
  const workflowSteps = [
    {
      icon: Brain,
      title: 'Otimização de Anúncios',
      description: 'Importe seus produtos e nossa IA irá reescrever títulos e descrições focados em conversão, usando as melhores práticas de SEO e copywriting.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Search,
      title: 'Inteligência de Mercado',
      description: 'Analise seus concorrentes, entenda as tendências de preço e descubra oportunidades de nicho sem sair da plataforma.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Rocket,
      title: 'Campanhas Automatizadas',
      description: 'Crie e gerencie campanhas de marketing para seus produtos. Gere posts para redes sociais, e-mails e anúncios com a voz da sua marca.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Análise e Insights',
      description: 'Nossos dashboards mostram o que funciona. Monitore o desempenho de seus anúncios e o impacto real nas suas vendas.',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Content creation tools
  const contentTools = [
    { icon: PenTool, title: 'Descrições de Produto', description: 'SEO otimizadas' },
    { icon: MessageSquare, title: 'Posts Sociais', description: 'Multi-plataforma' },
    { icon: Mail, title: 'E-mail Marketing', description: 'Alta conversão' },
    { icon: Megaphone, title: 'Anúncios Pagos', description: 'Google & Facebook' },
    { icon: Video, title: 'Roteiros de Vídeo', description: 'YouTube & TikTok' },
    { icon: Bot, title: 'Chatbots', description: 'Atendimento 24/7' }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'CEO, TechStore Brasil',
      company: 'Loja com 50+ funcionários',
      content: 'A MLBoost transformou nossa operação. Automatizamos 80% da criação de conteúdo e nossas vendas cresceram 340% em 8 meses. É nossa vantagem competitiva.',
      rating: 5,
      results: '+340% vendas'
    },
    {
      name: 'Ana Rodrigues',
      role: 'Diretora de Marketing',
      company: 'Fashion Hub',
      content: 'Antes gastávamos 20h/semana criando conteúdo. Agora são 2h e com qualidade muito superior. Nossa equipe foca no que realmente importa: estratégia.',
      rating: 5,
      results: '90% menos tempo'
    },
    {
      name: 'Pedro Santos',
      role: 'Fundador',
      company: 'EletroMax',
      content: 'A IA da MLBoost entende nosso mercado melhor que qualquer freelancer. Nossas descrições convertem 3x mais e nosso CAC diminuiu 60%.',
      rating: 5,
      results: '3x conversão'
    }
  ];

  const pricing = [
    {
      name: 'Essencial',
      subtitle: 'Para vendedores individuais',
      price: 'R$ 97',
      period: '/mês',
      description: 'Tudo que você precisa para começar a vender mais',
      features: [
        'Otimização de Anúncios Ilimitada',
        'Geração de conteúdo com IA',
        'Templates para todas as plataformas',
        'Dashboard básico de performance',
        'Suporte por chat',
        'Integração com principais marketplaces'
      ],
      cta: 'Começar Agora',
      popular: false
    },
    {
      name: 'Crescimento',
      subtitle: 'Para lojas em expansão',
      price: 'R$ 297',
      period: '/mês',
      description: 'Acelere seu crescimento com inteligência avançada',
      popular: true,
      features: [
        'Tudo do plano Essencial',
        'Inteligência de Mercado',
        'Campanhas Automatizadas',
        'Análise de concorrentes',
        'A/B Testing automático',
        'Relatórios avançados',
        'Suporte prioritário',
        'Consultoria mensal (1h)'
      ],
      cta: 'Escalar Vendas',
      badge: 'Mais Popular'
    },
    {
      name: 'Plataforma',
      subtitle: 'Para equipes e empresas',
      price: 'R$ 897',
      period: '/mês',
      description: 'Solução completa para operações profissionais',
      features: [
        'Tudo do plano Crescimento',
        'Dashboard Premium',
        'Múltiplos usuários (até 10)',
        'Consultoria Personalizada',
        'Integrações Customizadas',
        'White label disponível',
        'Gerente de conta dedicado',
        'SLA de suporte garantido'
      ],
      cta: 'Falar com Especialista',
      popular: false
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-xl animate-pulse-soft"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent-200/40 rounded-lg rotate-45 blur-lg animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
          
          {/* Workflow Diagram Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <path d="M100,300 Q300,200 500,300 Q700,400 900,300" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            <circle cx="150" cy="280" r="8" fill="#3b82f6" opacity="0.6" />
            <circle cx="350" cy="240" r="8" fill="#8b5cf6" opacity="0.6" />
            <circle cx="650" cy="360" r="8" fill="#f97316" opacity="0.6" />
            <circle cx="850" cy="320" r="8" fill="#22c55e" opacity="0.6" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Adeus, trabalho manual. Olá, sua plataforma de automação de vendas.
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="block">Transforme seu</span>
                <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                  E-commerce com IA
                </span>
                <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-gray-700">
                  Otimize anúncios, campanhas e conversões
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                Nossa IA analisa seu catálogo, otimiza seus anúncios e automatiza campanhas para 
                maximizar suas vendas e colocar você à frente da concorrência.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                to="/generator"
                className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-primary-700 hover:to-accent-600 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <Play className="ml-2 w-5 h-5 mr-2" />
                Peça uma Demonstração
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all flex items-center justify-center"
              >
                <BarChart3 className="ml-2 w-5 h-5 mr-2" />
                Ver Plataforma
              </Link>
            </motion.div>

            {/* Workflow Visual Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-5xl mx-auto"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {workflowSteps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                        {index < workflowSteps.length - 1 && (
                          <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2" style={{ left: `${(index + 1) * 25 - 2}%` }}>
                            <ChevronRight className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-gray-500 text-sm font-medium mb-8">
              Usado pelas lojas que mais crescem no e-commerce brasileiro
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {platformLogos.map((platform, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center`}>
                    <ShoppingCart className={`w-5 h-5 ${platform.color}`} />
                  </div>
                  <span className="text-gray-600 font-medium">{platform.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>+50.000 vendedores</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>4.9/5 avaliação</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>+340% vendas médias</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Sua esteira de vendas,
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"> agora inteligente</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pare de perder tempo com tarefas manuais. Nossa plataforma de IA automatiza todo o processo 
                de criação e otimização de conteúdo para e-commerce.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Content Tools Grid */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Crie qualquer tipo de conteúdo
              </h3>
              <p className="text-lg text-gray-600">
                Uma plataforma, infinitas possibilidades de conteúdo otimizado para conversão
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {contentTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all text-center group"
                  >
                    <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{tool.title}</h4>
                    <p className="text-xs text-gray-500">{tool.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Resultados que falam por si
              </h2>
              <p className="text-xl text-gray-600">
                Empresas reais, crescimento real, ROI comprovado
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                
                <div className="mb-6">
                  <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {testimonial.results}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">"{testimonial.content}"</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-1">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Planos que crescem com seu negócio
              </h2>
              <p className="text-xl text-gray-600">
                Do vendedor individual à grande empresa. Escolha o plano ideal para sua operação.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 rounded-2xl border-2 ${
                  plan.popular
                    ? 'border-primary-500 bg-white shadow-2xl scale-105'
                    : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-600 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      {plan.badge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-600 to-accent-500 text-white hover:from-primary-700 hover:to-accent-600 shadow-lg'
                      : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Todas as funcionalidades incluem teste gratuito de 14 dias
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                <span>Dados 100% seguros</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Suporte em português</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-2" />
                <span>Garantia de satisfação</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 400">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Pronto para escalar seu e-commerce?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Junte-se a mais de 50.000 negócios que transformaram seus resultados com a MLBoost. 
              Pare de adivinhar. Comece a vender.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/generator"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center shadow-lg"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Transforme suas vendas agora
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Ver demonstração
              </Link>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-white/80 text-sm">
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>Teste grátis 14 dias</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center">
                <Check className="w-4 h-4 mr-2" />
                <span>Suporte em português</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;