import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Users, 
  Zap, 
  Target, 
  Award,
  Globe,
  BarChart3,
  Rocket,
  Star,
  Quote,
  Store,
  Package,
  Truck,
  CreditCard,
  ShoppingCart,
  Mail,
  ArrowRight,
  CheckCircle,
  Play
} from 'lucide-react';

const PressReleasePage = () => {
  const [email, setEmail] = useState('');

  const stats = [
    { label: 'Crescimento de Receita', value: '480%', icon: TrendingUp },
    { label: 'Clientes Ativos', value: '50K+', icon: Users },
    { label: 'Descrições Geradas', value: '2M+', icon: Zap },
    { label: 'Plataformas Integradas', value: '15+', icon: Globe }
  ];

  const highlights = [
    {
      title: 'Revolução no E-commerce',
      description: 'MLBoost transformou como vendedores criam conteúdo para suas lojas online',
      icon: Rocket
    },
    {
      title: 'IA Especializada',
      description: 'Primeira plataforma de IA focada exclusivamente em descrições de produtos',
      icon: Target
    },
    {
      title: 'Resultados Comprovados',
      description: 'Clientes reportam aumento médio de 300% nas vendas após usar nossa plataforma',
      icon: Award
    }
  ];

  const trustIndicators = [
    { icon: Store, label: 'E-commerce' },
    { icon: Package, label: 'Logística' },
    { icon: Truck, label: 'Entrega' },
    { icon: CreditCard, label: 'Pagamentos' },
    { icon: Users, label: 'Clientes' }
  ];

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle demo request
    console.log('Demo requested for:', email);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">MLBoost</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar ao Site</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Transition Messages */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-400 line-through">
                    Diga Adeus à Complexidade
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-400 line-through">
                    Diga Adeus às Ferramentas Fragmentadas
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-400 line-through">
                    Diga Adeus às Vendas Baixas
                  </h2>
                </div>
                
                <div className="flex items-center space-x-2 text-accent-600">
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">22 de Dezembro, 2024</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-2xl border border-primary-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📈 Comunicado de Imprensa
                </h3>
                <p className="text-gray-700">
                  MLBoost anuncia crescimento explosivo de <strong>480% em receita</strong>, 
                  consolidando-se como líder em IA para e-commerce no Brasil.
                </p>
              </div>
            </motion.div>

            {/* Right Column - Welcome Message & Visual Flow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                  Bem-vindo à
                  <span className="block bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
                    MLBoost
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  A Plataforma de IA que <br />
                  <span className="font-semibold text-primary-600">Multiplica Suas Vendas</span>
                </p>
              </div>

              {/* Visual Flow */}
              <div className="relative bg-gradient-to-br from-primary-50 to-accent-50 p-8 rounded-3xl border border-primary-100">
                {/* Flow Steps */}
                <div className="space-y-6">
                  {[
                    { step: 1, title: 'Gere Conteúdo Otimizado', icon: Zap, color: 'from-blue-500 to-blue-600' },
                    { step: 2, title: 'Analise Performance', icon: BarChart3, color: 'from-purple-500 to-purple-600' },
                    { step: 3, title: 'Otimize Campanhas', icon: Target, color: 'from-green-500 to-green-600' },
                    { step: 4, title: 'Multiplique Vendas', icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500">Passo {item.step}</span>
                            {index < 3 && <ArrowRight className="w-4 h-4 text-gray-400" />}
                          </div>
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    Veja os Resultados em Ação
                  </h3>
                  <form onSubmit={handleDemoRequest} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Qual seu melhor e-mail?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-600 transition-all flex items-center justify-center"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Solicitar Demo Gratuita
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    ✨ Sem compromisso • Resultados em 24h • Suporte em português
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <p className="text-gray-600 font-medium mb-8">
              Confiado por milhares de vendedores e empresas líderes em
            </p>
            <div className="flex items-center justify-center space-x-12 opacity-60">
              {trustIndicators.map((indicator, index) => {
                const Icon = indicator.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex flex-col items-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium text-gray-500">{indicator.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Números que Impressionam
            </h2>
            <p className="text-xl text-gray-600">
              O crescimento que está transformando o e-commerce brasileiro
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Empresas Brasileiras Adotam IA Especializada para Multiplicar Vendas Online
              </h2>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>SÃO PAULO, 22 de dezembro de 2024</strong> – A MLBoost, primeira plataforma brasileira de IA 
                especializada em e-commerce, anunciou hoje um crescimento explosivo de receita de 480% em 2024, 
                consolidando-se como a solução líder para vendedores que buscam otimizar suas vendas online através 
                de conteúdo gerado por inteligência artificial.
              </p>

              <blockquote className="border-l-4 border-primary-500 pl-6 py-4 bg-primary-50 rounded-r-lg mb-8">
                <p className="text-lg text-gray-800 italic mb-4">
                  "O e-commerce brasileiro estava sufocando em processos manuais e descrições genéricas. 
                  Vendedores perdiam horas criando conteúdo que não convertia, enquanto a concorrência 
                  crescia exponencialmente. Criamos a MLBoost para resolver esse gargalo de uma vez por todas."
                </p>
                <footer className="text-primary-700 font-semibold">
                  — Carlos Eduardo, CEO da MLBoost
                </footer>
              </blockquote>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A empresa, que começou como uma solução simples de geração de descrições, evoluiu para uma 
                plataforma completa de IA que abrange desde a criação de conteúdo até análise preditiva de vendas. 
                Com mais de 50.000 vendedores ativos e 2 milhões de descrições geradas, a MLBoost se tornou 
                peça fundamental no ecossistema de e-commerce nacional.
              </p>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Transformação Digital no E-commerce
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A plataforma utiliza algoritmos proprietários treinados especificamente para o mercado brasileiro, 
                considerando particularidades culturais, linguísticas e comportamentais dos consumidores locais. 
                Diferentemente de soluções genéricas, a MLBoost entende as nuances do português brasileiro e 
                as preferências específicas de cada plataforma de venda.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-semibold text-blue-900 mb-3">Resultados Comprovados:</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <strong>300% de aumento médio</strong> nas vendas dos clientes
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <strong>85% de redução</strong> no tempo de criação de conteúdo
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <strong>92% de satisfação</strong> dos usuários da plataforma
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    <strong>15+ plataformas</strong> de e-commerce integradas
                  </li>
                </ul>
              </div>

              <blockquote className="border-l-4 border-accent-500 pl-6 py-4 bg-accent-50 rounded-r-lg mb-8">
                <p className="text-lg text-gray-800 italic mb-4">
                  "Antes da MLBoost, eu gastava 3 horas por dia escrevendo descrições. Agora, em 10 minutos 
                  tenho descrições melhores que qualquer coisa que eu conseguiria criar manualmente. 
                  Minhas vendas triplicaram em 6 meses."
                </p>
                <footer className="text-accent-700 font-semibold">
                  — Marina Santos, Vendedora no Mercado Livre
                </footer>
              </blockquote>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Inovação Contínua e Expansão
              </h3>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Para 2025, a MLBoost planeja expandir suas funcionalidades com análise de sentimento em tempo real, 
                otimização automática de preços baseada em IA e integração com sistemas de gestão empresarial. 
                A empresa também está desenvolvendo parcerias estratégicas com as principais plataformas de 
                e-commerce do país.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                A MLBoost está disponível através de planos flexíveis que atendem desde vendedores individuais 
                até grandes empresas de e-commerce. A plataforma oferece teste gratuito e suporte especializado 
                em português para todos os usuários.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que a MLBoost está Transformando o E-commerce
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Três pilares fundamentais que fazem da nossa plataforma a escolha número 1 dos vendedores brasileiros
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center p-8 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Faça Parte da Revolução do E-commerce
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Junte-se a mais de 50.000 vendedores que já transformaram seus negócios com a MLBoost
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/generator"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all inline-flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Testar Gratuitamente
              </Link>
              <Link
                to="/dashboard"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Ver Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">MLBoost</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando o e-commerce brasileiro com inteligência artificial
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span>© 2024 MLBoost. Todos os direitos reservados.</span>
              <span>•</span>
              <Link to="/" className="hover:text-white transition-colors">
                Política de Privacidade
              </Link>
              <span>•</span>
              <Link to="/" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PressReleasePage;