import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  Users, 
  Star,
  Check,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Descrições com IA',
      description: 'Gere descrições SEO otimizadas em segundos com inteligência artificial avançada para qualquer plataforma.'
    },
    {
      icon: BarChart3,
      title: 'KPIs em Tempo Real',
      description: 'Acompanhe MRR, Churn, CAC, CLV e outras métricas essenciais para seu negócio online.'
    },
    {
      icon: TrendingUp,
      title: 'Otimização de Vendas',
      description: 'Maximize suas conversões com análises preditivas e insights acionáveis para e-commerce.'
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Vendedor E-commerce',
      content: 'Minhas vendas aumentaram 300% desde que comecei a usar o MLBoost. As descrições geradas são incríveis!',
      rating: 5
    },
    {
      name: 'Ana Rodrigues',
      role: 'Loja Online',
      content: 'O dashboard de KPIs me ajudou a entender meu negócio de verdade. Agora tomo decisões baseadas em dados.',
      rating: 5
    },
    {
      name: 'Pedro Santos',
      role: 'Empreendedor Digital',
      content: 'Interface intuitiva e resultados reais. Recomendo para qualquer vendedor sério no e-commerce.',
      rating: 5
    }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: 'R$ 29',
      period: '/mês',
      features: [
        '50 descrições por mês',
        'Dashboard básico',
        'Suporte por email',
        'Integração com plataformas'
      ]
    },
    {
      name: 'Pro',
      price: 'R$ 79',
      period: '/mês',
      popular: true,
      features: [
        '200 descrições por mês',
        'Dashboard completo',
        'Suporte prioritário',
        'Análises avançadas',
        'A/B Testing',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      price: 'R$ 199',
      period: '/mês',
      features: [
        'Descrições ilimitadas',
        'Dashboard premium',
        'Suporte 24/7',
        'Consultoria personalizada',
        'White label',
        'Integrações customizadas'
      ]
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Turbine suas vendas
                <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent"> online</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Gere descrições SEO otimizadas com IA e acompanhe seus KPIs em tempo real para maximizar suas vendas em qualquer plataforma de e-commerce.
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
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Começar Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all flex items-center justify-center"
              >
                Ver Dashboard
                <BarChart3 className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>+1.000 vendedores</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-yellow-500" />
                <span>4.9/5 avaliação</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>+300% vendas médias</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para vender mais
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ferramentas poderosas de IA e analytics para otimizar cada aspecto das suas vendas online em qualquer plataforma.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Vendedores reais, resultados reais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos para cada necessidade
            </h2>
            <p className="text-xl text-gray-600">
              Comece grátis e escale conforme cresce
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-8 rounded-xl border-2 relative ${
                  plan.popular
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  Começar Agora
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para turbinar suas vendas?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 1.000 vendedores que já transformaram seus negócios online com o MLBoost.
            </p>
            <Link
              to="/generator"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center"
            >
              Começar Grátis Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;