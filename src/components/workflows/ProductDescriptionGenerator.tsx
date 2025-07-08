import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Sparkles,
  Check,
  Save
} from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { marked } from 'marked';
import { contentService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface ProductDescriptionGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const ProductDescriptionGenerator: React.FC<ProductDescriptionGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
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
  const [displayPrice, setDisplayPrice] = useState('');
  const [showGeneratedContent, setShowGeneratedContent] = useState(false);
  const [quillValue, setQuillValue] = useState('');
  const [saving, setSaving] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const { addSavedContent } = useStore();

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

  const categories = [
    'Eletrônicos',
    'Casa e Jardim',
    'Moda',
    'Esportes',
    'Automotivo',
    'Beleza',
    'Livros',
    'Brinquedos',
    'Saúde'
  ];

  // Configure Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  // Function to handle changes in the Quill editor
  const handleEditorChange = (content: string) => {
    setQuillValue(content);
  };

  const formatPrice = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (!numbers) return '';
    const numberValue = parseInt(numbers) / 100;
    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formatted = formatPrice(inputValue);
    setDisplayPrice(formatted);
    const numericValue = formatted.replace(/\./g, '').replace(',', '.');
    setProductData({...productData, price: numericValue});
  };

  const handleGenerate = async () => {
    // Check if user needs onboarding before generating
    if (!isOnboardingComplete && freeUsesRemaining === 0) {
      onShowOnboarding();
      return;
    }

    setIsGenerating(true);
    
    let newUsesRemaining = freeUsesRemaining;
    if (!isOnboardingComplete) {
      newUsesRemaining = await consumeFreeUse();
    }
    
    setTimeout(() => {
      const mockDescription = `
# ${productData.title || 'Produto Premium'} - Oferta Especial! 🔥

## ✨ Principais Características

${productData.features ? productData.features.split(',').map(feature => `• **${feature.trim()}** - Tecnologia de ponta`).join('\n') : '• **Qualidade superior garantida** - Materiais premium\n• **Entrega rápida e segura** - Enviamos para todo Brasil\n• **Garantia de satisfação** - 30 dias para trocar'}

## 🎯 Por que escolher este produto?

Este ${productData.title || 'produto'} foi cuidadosamente desenvolvido para superar suas expectativas. Com design inovador e funcionalidade excepcional, é a escolha perfeita para quem busca **qualidade**, **durabilidade** e **valor**.

### 🏆 Benefícios Exclusivos:
- ⚡ **Performance superior** - Resultados que você pode ver
- 🛡️ **Garantia estendida** - Proteção total do seu investimento  
- 🚀 **Tecnologia avançada** - O que há de mais moderno no mercado
- 💎 **Acabamento premium** - Detalhes que fazem a diferença

## 📦 O que está incluído:

✅ 1x ${productData.title || 'Produto Principal'}
✅ Manual de instruções detalhado
✅ Garantia de 12 meses do fabricante
✅ Suporte técnico especializado
✅ Embalagem premium para presente

## 🚚 Entrega e Garantia

🎯 **Entrega Expressa:** Receba rapidamente em sua região
🆓 **Frete Grátis:** Para compras acima de R$ 99
🔒 **Garantia Total:** 12 meses de garantia do fabricante
🔄 **Troca Fácil:** 30 dias para trocar sem perguntas
📞 **Suporte 24/7:** Atendimento especializado sempre disponível

## 💰 Oferta Por Tempo Limitado

${displayPrice ? `~~De R$ ${(parseFloat(displayPrice.replace(',', '.')) * 1.3).toFixed(2).replace('.', ',')}~~` : ''}
${displayPrice ? `**POR APENAS R$ ${displayPrice}**` : '**PREÇO ESPECIAL DISPONÍVEL**'}

### 🎁 BÔNUS EXCLUSIVOS:
- 📱 App móvel gratuito (valor R$ 29,90)
- 📚 E-book com dicas de uso (valor R$ 19,90)  
- 🎧 Suporte prioritário (valor R$ 39,90)

## 🔍 Especificações Técnicas

${productData.category ? `**Categoria:** ${productData.category}` : ''}
${productData.platform ? `**Disponível em:** ${productData.platform}` : ''}
${productData.keywords ? `**Tags:** ${productData.keywords}` : ''}

---

⭐ **Avaliação 4.9/5** - Mais de 2.500 clientes satisfeitos
🏆 **Vendedor Premium** - Loja oficial com mais de 15 anos de experiência
🔒 **Compra 100% Segura** - Proteção total da plataforma
🚀 **Entrega Garantida** - Ou seu dinheiro de volta

### 🔥 **ÚLTIMAS UNIDADES - APROVEITE AGORA!** 

*Oferta válida por tempo limitado ou enquanto durarem os estoques*

**👆 CLIQUE EM "COMPRAR AGORA" E GARANTE O SEU!**
      `.trim();
      
      // Convert markdown to HTML
      const htmlContent = marked.parse(mockDescription.trim());
      setGeneratedDescription(mockDescription.trim()); // Keep original markdown
      setQuillValue(htmlContent); // Set HTML version for the editor
      setShowGeneratedContent(true); // Show generated content view
      setIsGenerating(false);

      // If user exhausted free uses, show onboarding after a delay
      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 2000);
  };

  const copyToClipboard = () => {
    // Get content from either the Quill editor (HTML) or the original generated description
    const contentToCopy = showGeneratedContent ? quillValue : generatedDescription;
    navigator.clipboard.writeText(contentToCopy);
  };

  const handleSaveContent = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Você precisa estar logado para salvar conteúdo');
      return;
    }

    if (!generatedDescription) {
      toast.error('Nenhum conteúdo para salvar');
      return;
    }

    setSaving(true);
    try {
      const contentData = {
        user_id: user.id,
        content_type: 'product_description',
        title: productData.title || 'Descrição de Produto',
        content: quillValue || generatedDescription,
        metadata: {
          platform: productData.platform,
          category: productData.category,
          price: productData.price,
          keywords: productData.keywords,
          features: productData.features
        }
      };

      const savedContent = await contentService.saveContent(contentData);
      addSavedContent(savedContent);
      toast.success('Conteúdo salvo com sucesso!');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Erro ao salvar conteúdo');
    } finally {
      setSaving(false);
    }
  };

  // Function to go back to form view
  const handleNewDescription = () => {
    setShowGeneratedContent(false);
    setGeneratedDescription('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de Descrições de Produto</h2>
            <p className="text-gray-600">Crie descrições que vendem para qualquer plataforma de e-commerce</p>
          </div>
        </div>

        {/* Conditional rendering based on showGeneratedContent */}
        {!showGeneratedContent ? (
          /* Form View */
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Smartphone Samsung Galaxy A54"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData({...productData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plataforma
                  </label>
                  <select
                    value={productData.platform}
                    onChange={(e) => setProductData({...productData, platform: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione uma plataforma</option>
                    {platforms.map((platform) => (
                      <option key={platform} value={platform}>{platform}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    R$
                  </span>
                  <input
                    type="text"
                    value={displayPrice}
                    onChange={handlePriceChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Principais Características
                </label>
                <textarea
                  value={productData.features}
                  onChange={(e) => setProductData({...productData, features: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="smartphone, samsung, galaxy, oferta"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !productData.title || (!isOnboardingComplete && freeUsesRemaining === 0)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
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
                  <Zap className="w-5 h-5 mr-2" />
                )}
                {isGenerating ? 'Gerando Descrição...' : 
                 !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
                 'Gerar Descrição'}
              </button>
            </div>

            {/* Preview Area in Form View */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Descrição Gerada</h3>
              </div>

              <div className="flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Preencha os dados do produto e clique em "Gerar Descrição"</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Generated Content View */
          <div className="max-w-4xl mx-auto">
            {/* Generated Description */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Sua Descrição Otimizada</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Copiar"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSaveContent}
                    disabled={saving || !isAuthenticated}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all disabled:opacity-50"
                    title={isAuthenticated ? "Salvar" : "Faça login para salvar"}
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="rich-text-editor-container">
                <ReactQuill 
                  value={quillValue} 
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                />
              </div>
            </div>

            {/* Success Message */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <div className="flex items-center text-green-700">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-medium">Descrição otimizada criada com sucesso!</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Esta descrição foi otimizada para SEO e conversão em plataformas de e-commerce. Você pode editá-la diretamente no editor acima.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* New Description Button */}
              <button
                onClick={handleNewDescription}
                className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Nova Descrição
              </button>
              
              {/* Sign Up Button - Only show if user needs onboarding */}
              {!isOnboardingComplete && (
                <button
                  onClick={onShowOnboarding}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Inscreva-se para Acesso Completo
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescriptionGenerator;