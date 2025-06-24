import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Hash,
  Heart
} from 'lucide-react';

interface SocialMediaPostGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const SocialMediaPostGenerator: React.FC<SocialMediaPostGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  const [postData, setPostData] = useState({
    product: '',
    message: '',
    audience: '',
    tone: '',
    platform: 'instagram',
    cta: '',
    hashtags: ''
  });

  const [generatedPosts, setGeneratedPosts] = useState<{[key: string]: string}>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-600' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800' },
    { value: 'twitter', label: 'Twitter/X', icon: Twitter, color: 'from-gray-800 to-black' }
  ];

  const audiences = [
    'Jovens (18-25 anos)',
    'Adultos (26-40 anos)',
    'Profissionais (30-50 anos)',
    'Empreendedores',
    'Mães e Pais',
    'Estudantes',
    'Aposentados'
  ];

  const tones = [
    'Divertido e Descontraído',
    'Profissional',
    'Inspirador',
    'Educativo',
    'Urgente/Promocional',
    'Emocional',
    'Casual'
  ];

  const ctas = [
    'Compre Agora',
    'Saiba Mais',
    'Acesse o Link',
    'Comente Abaixo',
    'Compartilhe',
    'Marque um Amigo',
    'Visite Nossa Loja'
  ];

  const handleGenerate = async () => {
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
      const posts: {[key: string]: string} = {};
      
      // Instagram Post
      posts.instagram = `
🌟 ${postData.product || 'Produto Incrível'} 🌟

${postData.message || 'Descubra o produto que vai transformar sua vida!'} ✨

${postData.audience ? `Perfeito para ${postData.audience.toLowerCase()}` : 'Ideal para você'} que busca qualidade e inovação! 💫

🔥 BENEFÍCIOS EXCLUSIVOS:
• Qualidade premium garantida
• Entrega super rápida
• Suporte especializado 24/7
• Garantia de satisfação

${postData.cta ? `👆 ${postData.cta.toUpperCase()}` : '👆 GARANTE O SEU AGORA'} - Link na bio! 🔗

${postData.hashtags ? postData.hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#produto #qualidade #oferta #imperdivel #novidade #lifestyle #brasil #compraonline #promocao #desconto'}

---
💬 Conta pra gente nos comentários: qual sua maior expectativa?
👥 Marca aquele amigo que precisa conhecer isso!
❤️ Salva este post para não esquecer!
      `.trim();

      // Facebook Post
      posts.facebook = `
🎯 ${postData.product || 'Produto Incrível'} - A Solução Que Você Estava Procurando!

${postData.message || 'Finalmente chegou o produto que vai revolucionar sua rotina!'} 

${postData.audience ? `Especialmente desenvolvido para ${postData.audience.toLowerCase()}` : 'Criado pensando em você'} que valoriza qualidade e resultados reais.

🌟 POR QUE ESCOLHER NOSSO PRODUTO:

✅ Tecnologia de ponta
✅ Materiais premium
✅ Design inovador
✅ Resultados comprovados
✅ Suporte completo

💰 OFERTA ESPECIAL POR TEMPO LIMITADO:
🎁 Frete grátis para todo o Brasil
🎁 Garantia estendida de 12 meses
🎁 Suporte prioritário
🎁 E-book exclusivo de bônus

${postData.cta ? `🔥 ${postData.cta.toUpperCase()}` : '🔥 APROVEITE ESTA OPORTUNIDADE'} - Clique no link abaixo!

👇 LINK DIRETO PARA A OFERTA 👇
[Link do produto]

${postData.hashtags ? postData.hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#produto #oferta #qualidade #brasil #promocao'}

💬 Deixe seu comentário: O que você mais gostou neste produto?
👍 Curta se você quer ver mais ofertas como esta!
📤 Compartilhe com quem pode se interessar!
      `.trim();

      // LinkedIn Post
      posts.linkedin = `
🚀 ${postData.product || 'Inovação em Produto'}: Transformando a Experiência do Cliente

${postData.message || 'No mercado atual, a diferenciação está nos detalhes e na qualidade da experiência oferecida.'} 

${postData.audience ? `Para ${postData.audience.toLowerCase()}` : 'Para profissionais'} que buscam excelência, desenvolvemos uma solução que combina:

🎯 DIFERENCIAIS COMPETITIVOS:
• Tecnologia de ponta aplicada
• Processo de qualidade rigoroso
• Suporte especializado contínuo
• ROI comprovado em casos reais

📊 RESULTADOS MENSURÁVEIS:
• 95% de satisfação dos clientes
• 40% de aumento na eficiência
• Redução de 60% no tempo de implementação
• Suporte 24/7 com SLA garantido

💡 INSIGHTS DO MERCADO:
A transformação digital não é mais uma opção, é uma necessidade. Empresas que investem em soluções inovadoras têm 3x mais chances de liderar seus segmentos.

${postData.cta ? `🔗 ${postData.cta}` : '🔗 Saiba mais sobre nossa solução'} - Link nos comentários.

${postData.hashtags ? postData.hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#inovacao #tecnologia #negocios #transformacaodigital #lideranca #resultados #qualidade #brasil'}

---
💭 Qual sua experiência com soluções similares? Compartilhe nos comentários.
🔄 Reposte se este conteúdo agregou valor à sua rede.
      `.trim();

      // Twitter/X Post
      posts.twitter = `
🔥 ${postData.product || 'Produto Incrível'} 

${postData.message || 'A inovação que você estava esperando chegou!'} 🚀

${postData.audience ? `Ideal para ${postData.audience.toLowerCase()}` : 'Perfeito para você'} ✨

✅ Qualidade premium
✅ Entrega rápida  
✅ Garantia total
✅ Suporte 24/7

${postData.cta ? `${postData.cta} 👇` : 'Garanta o seu 👇'}
[link]

${postData.hashtags ? postData.hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).slice(0, 5).join(' ') : '#produto #qualidade #oferta #brasil #novidade'}
      `.trim();

      setGeneratedPosts(posts);
      setIsGenerating(false);

      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 2500);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const selectedPlatform = platforms.find(p => p.value === postData.platform);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de Posts para Redes Sociais</h2>
            <p className="text-gray-600">Crie posts envolventes para Instagram, Facebook, LinkedIn e Twitter</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produto/Serviço *
              </label>
              <input
                type="text"
                value={postData.product}
                onChange={(e) => setPostData({...postData, product: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ex: Curso de Marketing Digital"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mensagem Principal
              </label>
              <textarea
                value={postData.message}
                onChange={(e) => setPostData({...postData, message: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ex: Transforme sua carreira com estratégias que realmente funcionam"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Público-alvo
                </label>
                <select
                  value={postData.audience}
                  onChange={(e) => setPostData({...postData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecione o público</option>
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom de Voz
                </label>
                <select
                  value={postData.tone}
                  onChange={(e) => setPostData({...postData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecione o tom</option>
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call-to-Action
                </label>
                <select
                  value={postData.cta}
                  onChange={(e) => setPostData({...postData, cta: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Selecione o CTA</option>
                  {ctas.map((cta) => (
                    <option key={cta} value={cta}>{cta}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="w-4 h-4 inline mr-1" />
                  Hashtags
                </label>
                <input
                  type="text"
                  value={postData.hashtags}
                  onChange={(e) => setPostData({...postData, hashtags: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="marketing, digital, curso, online"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !postData.product || (!isOnboardingComplete && freeUsesRemaining === 0)}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              {isGenerating ? 'Gerando Posts...' : 
               !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
               'Gerar Posts para Todas as Redes'}
            </button>
          </div>

          {/* Platform Selector */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualizar por Plataforma</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = postData.platform === platform.value;
                
                return (
                  <button
                    key={platform.value}
                    onClick={() => setPostData({...postData, platform: platform.value})}
                    className={`p-3 rounded-lg transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${platform.color} text-white shadow-lg`
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{platform.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Generated Post Preview */}
            <div className="min-h-[300px]">
              {generatedPosts[postData.platform] ? (
                <div className="bg-white rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {selectedPlatform && <selectedPlatform.icon className="w-5 h-5 text-gray-600" />}
                      <span className="font-medium text-gray-900">{selectedPlatform?.label}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedPosts[postData.platform])}
                      className="p-2 text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all"
                      title="Copiar"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedPosts[postData.platform]}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados e clique em "Gerar Posts"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {Object.keys(generatedPosts).length > 0 && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center text-green-700">
              <Check className="w-5 h-5 mr-2" />
              <span className="font-medium">Posts criados para todas as plataformas!</span>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Cada post foi otimizado para as características específicas de cada rede social.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaPostGenerator;