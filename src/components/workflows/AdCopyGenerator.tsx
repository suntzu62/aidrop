import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Megaphone, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  Target,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';

interface AdCopyGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const AdCopyGenerator: React.FC<AdCopyGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  const [adData, setAdData] = useState({
    product: '',
    platform: 'google-ads',
    audience: '',
    budget: '',
    goal: '',
    tone: '',
    offer: '',
    keywords: ''
  });

  const [generatedAds, setGeneratedAds] = useState<{[key: string]: any}>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { value: 'google-ads', label: 'Google Ads', description: 'Anúncios de pesquisa e display' },
    { value: 'facebook-ads', label: 'Facebook Ads', description: 'Feed, stories e marketplace' },
    { value: 'instagram-ads', label: 'Instagram Ads', description: 'Feed, stories e reels' },
    { value: 'linkedin-ads', label: 'LinkedIn Ads', description: 'Sponsored content e InMail' },
    { value: 'youtube-ads', label: 'YouTube Ads', description: 'Vídeo e display' }
  ];

  const audiences = [
    'Jovens Adultos (18-30)',
    'Profissionais (25-45)',
    'Empreendedores',
    'Executivos',
    'Estudantes',
    'Aposentados',
    'Pais e Mães'
  ];

  const budgets = [
    'Baixo (R$ 100-500/mês)',
    'Médio (R$ 500-2000/mês)',
    'Alto (R$ 2000-10000/mês)',
    'Premium (R$ 10000+/mês)'
  ];

  const goals = [
    'Gerar Leads',
    'Aumentar Vendas',
    'Brand Awareness',
    'Tráfego para Site',
    'Downloads de App',
    'Inscrições'
  ];

  const tones = [
    'Profissional',
    'Urgente',
    'Amigável',
    'Exclusivo',
    'Educativo',
    'Emocional'
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
      const ads: {[key: string]: any} = {};
      
      switch (adData.platform) {
        case 'google-ads':
          ads['google-ads'] = {
            headlines: [
              `${adData.product || 'Produto Incrível'} - Oferta Especial`,
              `Compre ${adData.product || 'Agora'} com 50% OFF`,
              `${adData.product || 'Solução'} Que Você Procurava`,
              `Melhor ${adData.product || 'Produto'} do Mercado`,
              `${adData.product || 'Oferta'} Imperdível - Últimas Unidades`
            ],
            descriptions: [
              `Descubra ${adData.product || 'nossa solução'} com qualidade premium. ${adData.offer || 'Oferta especial'} por tempo limitado. Entrega rápida e garantia total.`,
              `${adData.audience ? `Para ${adData.audience.toLowerCase()}, ` : ''}${adData.product || 'este produto'} é a escolha certa. Resultados garantidos ou seu dinheiro de volta.`
            ],
            extensions: [
              'Frete Grátis',
              'Garantia 12 Meses',
              'Suporte 24/7',
              'Desconto Especial'
            ],
            keywords: adData.keywords ? adData.keywords.split(',').map(k => k.trim()) : [
              adData.product?.toLowerCase() || 'produto',
              'comprar online',
              'oferta especial',
              'melhor preço'
            ]
          };
          break;
          
        case 'facebook-ads':
          ads['facebook-ads'] = {
            primary_text: `🔥 ${adData.product || 'PRODUTO INCRÍVEL'} COM DESCONTO ESPECIAL!

${adData.audience ? `Atenção ${adData.audience.toLowerCase()}! ` : ''}Esta é a oportunidade que você estava esperando.

✅ Qualidade premium garantida
✅ Entrega rápida para todo Brasil  
✅ Suporte especializado 24/7
✅ ${adData.offer || 'Desconto de 50%'} por tempo limitado

${adData.goal === 'Gerar Leads' ? 'Cadastre-se agora e receba mais informações!' : 'Clique e garante o seu antes que acabe!'}

#${adData.product?.replace(/\s+/g, '') || 'Produto'} #Oferta #Brasil`,

            headline: `${adData.product || 'Produto'} - ${adData.offer || 'Oferta Especial'}`,
            
            description: `${adData.product || 'Solução premium'} com qualidade garantida. ${adData.offer || 'Desconto especial'} válido por tempo limitado.`,
            
            cta: adData.goal === 'Gerar Leads' ? 'Saiba Mais' : 
                 adData.goal === 'Aumentar Vendas' ? 'Comprar Agora' :
                 adData.goal === 'Tráfego para Site' ? 'Acessar Site' : 'Saiba Mais'
          };
          break;
          
        case 'instagram-ads':
          ads['instagram-ads'] = {
            caption: `✨ ${adData.product || 'NOVIDADE INCRÍVEL'} ✨

${adData.audience ? `Para você que é ${adData.audience.toLowerCase()} ` : ''}e busca qualidade e inovação! 💫

🎯 O QUE VOCÊ VAI GANHAR:
• Produto premium de alta qualidade
• Resultados comprovados
• Suporte completo incluído
• ${adData.offer || 'Desconto exclusivo'}

${adData.goal === 'Brand Awareness' ? '🌟 Conheça nossa marca e se apaixone!' :
  adData.goal === 'Gerar Leads' ? '📝 Cadastre-se e receba conteúdo exclusivo!' :
  '🛒 Garante o seu agora - Link na bio!'}

${adData.keywords ? adData.keywords.split(',').map(tag => `#${tag.trim().replace(/\s+/g, '').replace('#', '')}`).join(' ') : '#produto #qualidade #oferta #brasil #novidade'}

💬 Comenta aqui: O que você achou?
👥 Marca aquele amigo que precisa ver isso!
❤️ Salva este post para não esquecer!`,

            story_text: `🔥 ${adData.product || 'OFERTA ESPECIAL'} 🔥

${adData.offer || 'DESCONTO IMPERDÍVEL'}

Desliza para cima! 👆`,

            reels_text: `POV: Você descobriu ${adData.product || 'o produto'} que vai mudar sua vida 🤯

✅ Qualidade premium
✅ Preço especial  
✅ Entrega rápida

${adData.goal === 'Aumentar Vendas' ? 'Corre que ainda dá tempo! 🏃‍♀️' : 'Quer saber mais? Comenta aqui! 👇'}`
          };
          break;
          
        case 'linkedin-ads':
          ads['linkedin-ads'] = {
            sponsored_content: `🚀 ${adData.product || 'Solução Inovadora'} para ${adData.audience || 'Profissionais'}

${adData.audience ? `Se você é ${adData.audience.toLowerCase()} ` : 'Se você '}busca resultados excepcionais, esta solução foi desenvolvida especialmente para você.

🎯 BENEFÍCIOS COMPROVADOS:
• Aumento de 40% na produtividade
• ROI positivo em 30 dias
• Implementação simples e rápida
• Suporte especializado incluído

📊 RESULTADOS REAIS:
Mais de 1.000 profissionais já transformaram seus resultados com nossa solução.

${adData.offer ? `🎁 OFERTA ESPECIAL: ${adData.offer}` : '💡 Descubra como aplicar em seu negócio.'}

${adData.goal === 'Gerar Leads' ? 'Baixe nosso material gratuito e veja como implementar.' : 'Agende uma demonstração gratuita.'}

#${adData.product?.replace(/\s+/g, '') || 'Inovacao'} #Produtividade #Negocios #Resultados`,

            message_ad: `Olá [Nome],

Notei seu perfil e acredito que ${adData.product || 'nossa solução'} pode agregar muito valor ao seu trabalho.

${adData.audience ? `Para ${adData.audience.toLowerCase()}, ` : ''}desenvolvemos uma abordagem que tem gerado resultados excepcionais:

• 95% de satisfação dos clientes
• Implementação em menos de 24h
• ROI médio de 300% em 90 dias

${adData.offer ? `Temos uma oferta especial: ${adData.offer}` : 'Gostaria de agendar 15 minutos para uma demonstração?'}

Aguardo seu retorno.

Atenciosamente,
[Seu Nome]`
          };
          break;
          
        case 'youtube-ads':
          ads['youtube-ads'] = {
            video_script: `[GANCHO - 0-3 segundos]
"Pare tudo! Se você ${adData.audience ? `é ${adData.audience.toLowerCase()} e ` : ''}quer ${adData.goal?.toLowerCase() || 'resultados incríveis'}, precisa ver isso!"

[PROBLEMA - 3-8 segundos]  
"Você já tentou ${adData.product?.toLowerCase() || 'encontrar uma solução'} e não conseguiu os resultados que esperava?"

[SOLUÇÃO - 8-15 segundos]
"Apresento ${adData.product || 'a solução'} que já transformou a vida de mais de 1.000 pessoas!"

[BENEFÍCIOS - 15-25 segundos]
"Com ${adData.product || 'nossa solução'} você vai conseguir:
✅ Resultados em 7 dias
✅ Suporte completo incluído  
✅ Garantia de satisfação
✅ ${adData.offer || 'Preço especial'}"

[CALL TO ACTION - 25-30 segundos]
"Clique no link da descrição agora e ${adData.goal === 'Gerar Leads' ? 'cadastre-se gratuitamente' : 'garanta sua vaga'}! Vagas limitadas!"`,

            overlay_text: [
              `${adData.product || 'SOLUÇÃO'} REVOLUCIONÁRIA`,
              `${adData.offer || 'OFERTA ESPECIAL'}`,
              'RESULTADOS GARANTIDOS',
              'CLIQUE AGORA!'
            ],

            description: `🔥 ${adData.product || 'PRODUTO INCRÍVEL'} - ${adData.offer || 'OFERTA ESPECIAL'} 🔥

${adData.audience ? `Para ${adData.audience.toLowerCase()} ` : ''}que buscam resultados reais e duradouros!

🎯 O QUE VOCÊ VAI CONSEGUIR:
✅ Resultados comprovados em 7 dias
✅ Suporte especializado 24/7
✅ Garantia total de satisfação
✅ Acesso vitalício ao conteúdo

💰 INVESTIMENTO:
${adData.offer || 'Condições especiais'} apenas para os primeiros 100 inscritos!

🚀 BÔNUS EXCLUSIVOS:
🎁 E-book gratuito (valor R$ 97)
🎁 Consultoria de 1h (valor R$ 297)  
🎁 Acesso ao grupo VIP

👆 CLIQUE NO LINK E GARANTA SUA VAGA!

${adData.keywords ? adData.keywords.split(',').map(tag => `#${tag.trim().replace(/\s+/g, '').replace('#', '')}`).join(' ') : '#produto #resultado #oferta #garantia'}`
          };
          break;
      }
      
      setGeneratedAds(ads);
      setIsGenerating(false);

      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 3000);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const selectedPlatform = platforms.find(p => p.value === adData.platform);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
            <Megaphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de Anúncios Publicitários</h2>
            <p className="text-gray-600">Crie copy para Google Ads, Facebook Ads e outras plataformas</p>
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
                value={adData.product}
                onChange={(e) => setAdData({...adData, product: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: Curso de Vendas Online"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plataforma de Anúncio
              </label>
              <select
                value={adData.platform}
                onChange={(e) => setAdData({...adData, platform: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {platforms.map((platform) => (
                  <option key={platform.value} value={platform.value}>
                    {platform.label} - {platform.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Público-alvo
                </label>
                <select
                  value={adData.audience}
                  onChange={(e) => setAdData({...adData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione o público</option>
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 inline mr-1" />
                  Orçamento
                </label>
                <select
                  value={adData.budget}
                  onChange={(e) => setAdData({...adData, budget: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione o orçamento</option>
                  {budgets.map((budget) => (
                    <option key={budget} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Objetivo
                </label>
                <select
                  value={adData.goal}
                  onChange={(e) => setAdData({...adData, goal: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione o objetivo</option>
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom de Voz
                </label>
                <select
                  value={adData.tone}
                  onChange={(e) => setAdData({...adData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Selecione o tom</option>
                  {tones.map((tone) => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Oferta/Promoção
              </label>
              <input
                type="text"
                value={adData.offer}
                onChange={(e) => setAdData({...adData, offer: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ex: 50% OFF por tempo limitado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave
              </label>
              <input
                type="text"
                value={adData.keywords}
                onChange={(e) => setAdData({...adData, keywords: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="vendas, curso, online, marketing"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !adData.product || (!isOnboardingComplete && freeUsesRemaining === 0)}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              {isGenerating ? 'Gerando Anúncios...' : 
               !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
               'Gerar Anúncios'}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Anúncios para {selectedPlatform?.label}
              </h3>
              {generatedAds[adData.platform] && (
                <button
                  onClick={() => copyToClipboard(JSON.stringify(generatedAds[adData.platform], null, 2))}
                  className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                  title="Copiar Todos"
                >
                  <Copy className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="min-h-[400px] max-h-[600px] overflow-y-auto space-y-4">
              {generatedAds[adData.platform] ? (
                <div className="space-y-4">
                  {Object.entries(generatedAds[adData.platform]).map(([key, value]) => (
                    <div key={key} className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 capitalize">
                          {key.replace(/_/g, ' ')}
                        </h4>
                        <button
                          onClick={() => copyToClipboard(Array.isArray(value) ? value.join('\n') : value as string)}
                          className="p-1 text-gray-500 hover:text-orange-600 rounded"
                          title="Copiar"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm text-gray-700">
                        {Array.isArray(value) ? (
                          <ul className="space-y-1">
                            {value.map((item, index) => (
                              <li key={index} className="p-2 bg-gray-50 rounded">
                                {item}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <pre className="whitespace-pre-wrap font-mono text-xs">
                            {value as string}
                          </pre>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <Megaphone className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados e clique em "Gerar Anúncios"</p>
                  </div>
                </div>
              )}
            </div>

            {generatedAds[adData.platform] && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">Anúncios otimizados criados com sucesso!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Anúncios otimizados para {selectedPlatform?.label} com foco em conversão.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCopyGenerator;