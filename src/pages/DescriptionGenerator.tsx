import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Zap, 
  Copy, 
  Download, 
  Sparkles,
  Target,
  Search,
  TrendingUp
} from 'lucide-react';

const DescriptionGenerator = () => {
  const [productData, setProductData] = useState({
    title: '',
    category: '',
    price: '',
    features: '',
    keywords: '',
    platform: ''
  });

  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const mockDescription = `
# ${productData.title || 'Produto Premium'}

## ✨ Principais Características

${productData.features ? productData.features.split(',').map(feature => `• ${feature.trim()}`).join('\n') : '• Qualidade superior garantida\n• Entrega rápida e segura\n• Garantia de satisfação'}

## 🎯 Por que escolher este produto?

Este produto foi cuidadosamente selecionado para oferecer a melhor experiência para nossos clientes. Com design moderno e funcionalidade excepcional, é a escolha perfeita para quem busca qualidade e valor.

## 📦 O que você recebe:

• 1x ${productData.title || 'Produto'}
• Manual de instruções
• Garantia de 12 meses
• Suporte técnico especializado

## 🚚 Entrega e Garantia

• **Entrega expressa:** Receba rapidamente em sua região
• **Frete grátis:** Para compras acima de R$ 99
• **Garantia total:** 12 meses de garantia do fabricante
• **Troca fácil:** 30 dias para trocar sem perguntas

## 🔍 Especificações Técnicas

${productData.keywords ? `**Palavras-chave:** ${productData.keywords}` : ''}
${productData.category ? `**Categoria:** ${productData.category}` : ''}
${productData.price ? `**Preço especial:** R$ ${productData.price}` : ''}
${productData.platform ? `**Plataforma:** ${productData.platform}` : ''}

---

⭐ **Avaliação 4.9/5** - Mais de 1.000 clientes satisfeitos
🏆 **Vendedor Premium** - Loja oficial com mais de 10 anos de experiência
🔒 **Compra 100% segura** - Proteção total da plataforma

**Aproveite esta oferta especial!** ⚡
      `.trim();
      
      setGeneratedDescription(mockDescription);
      setIsGenerating(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription);
  };

  const features = [
    {
      icon: Search,
      title: 'SEO Otimizado',
      description: 'Palavras-chave estratégicas para melhor rankeamento em qualquer plataforma'
    },
    {
      icon: Target,
      title: 'Conversão Focada',
      description: 'CTAs poderosos que aumentam as vendas em e-commerce'
    },
    {
      icon: TrendingUp,
      title: 'Performance',
      description: 'Baseado em dados de produtos de alta performance online'
    }
  ];

  const platforms = [
    'Mercado Livre',
    'Shopee',
    'Amazon',
    'Magazine Luiza',
    'Americanas',
    'Casas Bahia',
    'Loja Própria',
    'Outros'
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center mr-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Gerador de Descrições
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Crie descrições otimizadas para SEO que convertem visitantes em compradores em qualquer plataforma de e-commerce
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 text-center">
                <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Sparkles className="w-6 h-6 text-accent-500 mr-2" />
              Dados do Produto
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Smartphone Samsung Galaxy A54"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plataforma de Venda
                </label>
                <select
                  value={productData.platform}
                  onChange={(e) => setProductData({...productData, platform: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecione uma plataforma</option>
                  {platforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={productData.category}
                  onChange={(e) => setProductData({...productData, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Casa e Jardim">Casa e Jardim</option>
                  <option value="Moda">Moda</option>
                  <option value="Esportes">Esportes</option>
                  <option value="Automotivo">Automotivo</option>
                  <option value="Beleza">Beleza</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData({...productData, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="299.90"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principais Características
                </label>
                <textarea
                  value={productData.features}
                  onChange={(e) => setProductData({...productData, features: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Ex: Tela AMOLED 6.4', Câmera 50MP, Bateria 5000mAh"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras-chave SEO
                </label>
                <input
                  type="text"
                  value={productData.keywords}
                  onChange={(e) => setProductData({...productData, keywords: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="smartphone, samsung, galaxy, oferta"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !productData.title}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                  </motion.div>
                ) : (
                  <Zap className="w-5 h-5 mr-2" />
                )}
                {isGenerating ? 'Gerando...' : 'Gerar Descrição'}
              </button>
            </div>
          </motion.div>

          {/* Generated Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="w-6 h-6 text-primary-600 mr-2" />
                Descrição Gerada
              </h2>
              
              {generatedDescription && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                    title="Copiar"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-[400px]">
              {generatedDescription ? (
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedDescription}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados do produto e clique em "Gerar Descrição"</p>
                  </div>
                </div>
              )}
            </div>

            {generatedDescription && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Sparkles className="w-5 h-5 mr-2" />
                  <span className="font-medium">Descrição otimizada criada com sucesso!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Esta descrição foi otimizada para SEO e conversão em plataformas de e-commerce.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionGenerator;