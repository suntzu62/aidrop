import React from 'react';
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
  Quote
} from 'lucide-react';

const PressReleasePage = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
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

      {/* Hero Section with Abstract Shapes */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-accent-900 text-white">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-accent-500/30 rounded-lg rotate-45 blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-green-500/25 rounded-lg rotate-12 blur-md"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-blue-500/20 rounded-full blur-xl"></div>
          
          {/* Geometric Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
            <path d="M0,300 Q250,100 500,300 T1000,300" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M0,200 Q300,400 600,200 T1200,200" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Calendar className="w-5 h-5 mr-2 text-accent-400" />
              <span className="text-accent-400 font-medium">22 de Dezembro, 2024</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="block">MLBoost Revoluciona</span>
              <span className="block bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent">
                E-commerce com IA
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-gray-300">
                480% de Crescimento em 2024
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Plataforma brasileira de IA para e-commerce supera todas as expectativas, 
              transformando como vendedores criam conteúdo e aumentam suas vendas online
            </p>
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
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </motion.div>
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
                  <li>• <strong>300% de aumento médio</strong> nas vendas dos clientes</li>
                  <li>• <strong>85% de redução</strong> no tempo de criação de conteúdo</li>
                  <li>• <strong>92% de satisfação</strong> dos usuários da plataforma</li>
                  <li>• <strong>15+ plataformas</strong> de e-commerce integradas</li>
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