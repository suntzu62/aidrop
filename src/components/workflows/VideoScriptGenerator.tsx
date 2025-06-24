import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  Clock,
  Users,
  Target,
  Play
} from 'lucide-react';

interface VideoScriptGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const VideoScriptGenerator: React.FC<VideoScriptGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  const [videoData, setVideoData] = useState({
    topic: '',
    platform: 'youtube',
    duration: '60',
    audience: '',
    goal: '',
    tone: '',
    videoType: 'educational',
    hook: ''
  });

  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = [
    { value: 'youtube', label: 'YouTube', description: 'Vídeos longos e educativos' },
    { value: 'tiktok', label: 'TikTok', description: 'Vídeos curtos e virais' },
    { value: 'instagram', label: 'Instagram Reels', description: 'Conteúdo visual atrativo' },
    { value: 'linkedin', label: 'LinkedIn', description: 'Conteúdo profissional' },
    { value: 'facebook', label: 'Facebook', description: 'Vídeos para feed e stories' }
  ];

  const durations = [
    { value: '15', label: '15 segundos', platforms: ['tiktok', 'instagram'] },
    { value: '30', label: '30 segundos', platforms: ['tiktok', 'instagram', 'facebook'] },
    { value: '60', label: '1 minuto', platforms: ['tiktok', 'instagram', 'facebook', 'linkedin'] },
    { value: '180', label: '3 minutos', platforms: ['youtube', 'facebook', 'linkedin'] },
    { value: '300', label: '5 minutos', platforms: ['youtube', 'linkedin'] },
    { value: '600', label: '10 minutos', platforms: ['youtube'] },
    { value: '1200', label: '20+ minutos', platforms: ['youtube'] }
  ];

  const audiences = [
    'Jovens (16-25 anos)',
    'Adultos (26-40 anos)',
    'Profissionais (30-50 anos)',
    'Empreendedores',
    'Estudantes',
    'Pais e Mães',
    'Sêniors (50+ anos)'
  ];

  const goals = [
    'Educar Audiência',
    'Gerar Vendas',
    'Aumentar Seguidores',
    'Brand Awareness',
    'Viralizar Conteúdo',
    'Gerar Leads'
  ];

  const tones = [
    'Educativo',
    'Divertido',
    'Inspirador',
    'Profissional',
    'Casual',
    'Urgente'
  ];

  const videoTypes = [
    { value: 'educational', label: 'Educativo/Tutorial' },
    { value: 'promotional', label: 'Promocional/Vendas' },
    { value: 'storytelling', label: 'Storytelling' },
    { value: 'review', label: 'Review/Análise' },
    { value: 'behind-scenes', label: 'Bastidores' },
    { value: 'trending', label: 'Trend/Viral' }
  ];

  const getFilteredDurations = () => {
    return durations.filter(d => d.platforms.includes(videoData.platform));
  };

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
      let mockScript = '';
      const durationSeconds = parseInt(videoData.duration);
      
      if (durationSeconds <= 30) {
        // Script para vídeos curtos (TikTok/Instagram)
        mockScript = `
# ROTEIRO PARA VÍDEO CURTO (${videoData.duration}s)
**Plataforma:** ${platforms.find(p => p.value === videoData.platform)?.label}
**Tópico:** ${videoData.topic || 'Assunto do Vídeo'}

## 🎬 ESTRUTURA DO VÍDEO

### GANCHO (0-3s) 🎯
**VISUAL:** Close no rosto, olhando diretamente para câmera
**TEXTO/FALA:** "${videoData.hook || `Pare tudo! Se você ${videoData.audience ? `é ${videoData.audience.toLowerCase()} e ` : ''}quer ${videoData.goal?.toLowerCase() || 'resultados'}, precisa ver isso!`}"
**TEXTO NA TELA:** "${videoData.topic || 'DICA INCRÍVEL'}"

### DESENVOLVIMENTO (3-${durationSeconds-5}s) 💡
**VISUAL:** Demonstração prática ou mudança de cenário
**TEXTO/FALA:** "${videoData.topic || 'Esta estratégia'} que vou te mostrar ${videoData.goal === 'Educar Audiência' ? 'vai mudar sua forma de pensar' : 'pode transformar seus resultados'}:

${videoData.videoType === 'educational' ? 
`✅ Passo 1: [Ação específica]
✅ Passo 2: [Resultado esperado]  
✅ Passo 3: [Dica extra]` :
`🔥 Benefício principal
⚡ Como aplicar hoje
💰 Resultado que você vai ter`}"

**TEXTO NA TELA:** "SALVA ESTE VÍDEO ❤️"

### CALL TO ACTION (${durationSeconds-5}s-${durationSeconds}s) 🚀
**VISUAL:** Volta para close no rosto
**TEXTO/FALA:** "${videoData.goal === 'Aumentar Seguidores' ? 'Me segue para mais dicas como essa!' : 
videoData.goal === 'Gerar Leads' ? 'Comenta AÍ que eu te mando o material completo!' :
'Salva este vídeo e compartilha com quem precisa!'}"
**TEXTO NA TELA:** "${videoData.goal === 'Aumentar Seguidores' ? 'SEGUE AÍ! 👆' : 'COMENTA AÍ! 👇'}"

## 📝 ELEMENTOS VISUAIS
- **Transições:** Cortes rápidos a cada 2-3 segundos
- **Texto na tela:** Fonte grande, contraste alto
- **Música:** Trending audio ou música energética
- **Efeitos:** Zoom in/out nos pontos importantes

## 🎯 HASHTAGS SUGERIDAS
#${videoData.topic?.replace(/\s+/g, '') || 'dica'} #${videoData.platform} #viral #fyp #dicasrapidas #aprenda #resultado

## 💡 DICAS DE GRAVAÇÃO
- Grave em vertical (9:16)
- Boa iluminação natural
- Audio limpo e claro
- Energia alta do início ao fim
- Olhe sempre para a câmera
        `;
      } else if (durationSeconds <= 180) {
        // Script para vídeos médios (1-3 minutos)
        mockScript = `
# ROTEIRO PARA VÍDEO MÉDIO (${Math.floor(durationSeconds/60)}min)
**Plataforma:** ${platforms.find(p => p.value === videoData.platform)?.label}
**Tópico:** ${videoData.topic || 'Assunto do Vídeo'}

## 🎬 ESTRUTURA DETALHADA

### INTRODUÇÃO (0-15s) 🎯
**VISUAL:** Apresentação pessoal, cenário organizado
**ROTEIRO:**
"Olá, eu sou [Nome] e hoje vou te ensinar ${videoData.topic?.toLowerCase() || 'algo incrível'} que ${videoData.goal === 'Gerar Vendas' ? 'pode aumentar suas vendas' : 'vai transformar seus resultados'}.

${videoData.hook || 'Se você já tentou [problema comum] e não conseguiu, este vídeo é para você.'}

Fica até o final porque vou dar uma dica bônus que vale ouro!"

**TEXTO NA TELA:** "${videoData.topic || 'TUTORIAL COMPLETO'}"

### DESENVOLVIMENTO PRINCIPAL (15s-${durationSeconds-30}s) 📚

#### Ponto 1 (15-45s)
**VISUAL:** Demonstração prática ou slides
**ROTEIRO:**
"Primeiro, você precisa entender que ${videoData.topic?.toLowerCase() || 'este conceito'} funciona porque [explicação].

${videoData.videoType === 'educational' ? 
`Vou te mostrar o passo a passo:

1. **Passo 1:** [Ação específica com exemplo]
2. **Passo 2:** [Como implementar]
3. **Passo 3:** [Resultado esperado]` :
`Os 3 benefícios principais são:
- Benefício 1: [Explicação]
- Benefício 2: [Exemplo prático]  
- Benefício 3: [Resultado final]`}"

#### Ponto 2 (45s-${Math.floor(durationSeconds*0.7)}s)
**VISUAL:** Mudança de cenário ou nova demonstração
**ROTEIRO:**
"Agora, a parte que todo mundo erra: [erro comum].

${videoData.audience ? `Para ${videoData.audience.toLowerCase()}, ` : ''}a estratégia correta é:

[Estratégia detalhada com exemplo prático]

Olha só este resultado que consegui: [case/exemplo]"

#### Dica Bônus (${Math.floor(durationSeconds*0.7)}s-${durationSeconds-15}s)
**VISUAL:** Close no rosto, tom mais íntimo
**ROTEIRO:**
"E aqui vai a dica bônus que prometi:

[Dica valiosa e específica]

Esta dica sozinha pode [benefício específico]. Eu uso isso há [tempo] e os resultados são incríveis!"

### ENCERRAMENTO (${durationSeconds-15}s-${durationSeconds}s) 🚀
**VISUAL:** Volta para apresentação inicial
**ROTEIRO:**
"${videoData.goal === 'Aumentar Seguidores' ? 'Se este vídeo te ajudou, se inscreve no canal e ativa o sininho!' :
videoData.goal === 'Gerar Leads' ? 'Quer o material completo? Deixa um comentário com a palavra QUERO!' :
'Gostou? Deixa um like e compartilha com quem precisa!'}

E me conta nos comentários: ${videoData.topic ? `qual sua experiência com ${videoData.topic.toLowerCase()}?` : 'o que você achou desta dica?'}

Até o próximo vídeo!"

## 🎥 DIREÇÕES DE CÂMERA
- **Planos:** Intercalar entre close, plano médio e detalhes
- **Movimentos:** Câmera estática, movimentos suaves
- **Cortes:** A cada 8-12 segundos para manter atenção
- **B-roll:** Inserir imagens/vídeos de apoio quando relevante

## 🎵 ÁUDIO E MÚSICA
- **Música de fundo:** Instrumental suave, volume baixo
- **Efeitos sonoros:** Transições e pontos de destaque
- **Qualidade:** Audio limpo, sem ruídos

## 📊 ELEMENTOS GRÁFICOS
- **Texto na tela:** Pontos principais e estatísticas
- **Gráficos:** Se aplicável ao conteúdo
- **Thumbnails:** Expressão marcante + texto chamativo
        `;
      } else {
        // Script para vídeos longos (YouTube)
        mockScript = `
# ROTEIRO PARA VÍDEO LONGO (${Math.floor(durationSeconds/60)}+ min)
**Plataforma:** YouTube
**Tópico:** ${videoData.topic || 'Assunto do Vídeo'}

## 🎬 ESTRUTURA COMPLETA

### GANCHO INICIAL (0-30s) 🎯
**VISUAL:** Montagem rápida dos melhores momentos do vídeo
**ROTEIRO:**
"Neste vídeo você vai descobrir ${videoData.topic?.toLowerCase() || 'estratégias incríveis'} que ${videoData.goal === 'Gerar Vendas' ? 'podem multiplicar suas vendas' : 'vão transformar seus resultados'}.

Vou te mostrar:
- [Ponto 1 mais impactante]
- [Ponto 2 mais impactante]  
- [Ponto 3 mais impactante]

E no final, uma estratégia secreta que poucos conhecem.

${videoData.hook || 'Se você quer resultados reais, fica até o final porque este vídeo pode mudar tudo para você.'}"

### INTRODUÇÃO PESSOAL (30s-1min) 👋
**VISUAL:** Apresentação no cenário principal
**ROTEIRO:**
"Olá, eu sou [Nome], [credencial/experiência] e neste canal eu ensino ${videoData.topic?.toLowerCase() || 'estratégias'} para ${videoData.audience?.toLowerCase() || 'pessoas'} que querem ${videoData.goal?.toLowerCase() || 'resultados excepcionais'}.

Se você é novo aqui, se inscreve no canal e ativa o sininho para não perder nenhum conteúdo.

E se você já é inscrito, deixa um like para me ajudar a alcançar mais pessoas!"

### CONTEXTUALIZAÇÃO (1-3min) 📋
**VISUAL:** Slides ou demonstrações visuais
**ROTEIRO:**
"Antes de começar, deixa eu te contar por que ${videoData.topic?.toLowerCase() || 'este assunto'} é tão importante.

[Estatísticas relevantes]
[Problema comum que o público enfrenta]
[Por que as soluções tradicionais não funcionam]

${videoData.audience ? `Para ${videoData.audience.toLowerCase()}, ` : ''}isso é especialmente importante porque [razão específica]."

### DESENVOLVIMENTO PRINCIPAL (3min-${Math.floor(durationSeconds/60-2)}min) 📚

#### Módulo 1: Fundamentos (3-${Math.floor(durationSeconds/60*0.3)}min)
**VISUAL:** Explicações com apoio visual
**ROTEIRO:**
"Primeiro, vamos entender os fundamentos de ${videoData.topic?.toLowerCase() || 'nossa estratégia'}.

**Conceito 1:** [Explicação detalhada]
- Por que funciona
- Como aplicar
- Exemplo prático

**Conceito 2:** [Explicação detalhada]
- Benefícios específicos
- Erros comuns
- Dicas de implementação

**Conceito 3:** [Explicação detalhada]
- Resultados esperados
- Métricas para acompanhar
- Próximos passos"

#### Módulo 2: Estratégias Práticas (${Math.floor(durationSeconds/60*0.3)}-${Math.floor(durationSeconds/60*0.7)}min)
**VISUAL:** Demonstrações práticas, tela do computador
**ROTEIRO:**
"Agora vamos para a parte prática. Vou te mostrar exatamente como implementar:

**Estratégia 1:** [Passo a passo detalhado]
- Ferramentas necessárias
- Tempo de implementação
- Resultados esperados

**Estratégia 2:** [Demonstração ao vivo]
- Como eu faço
- Dicas avançadas
- Otimizações

**Estratégia 3:** [Case de sucesso]
- Exemplo real
- Números e resultados
- Como replicar"

#### Módulo 3: Casos e Exemplos (${Math.floor(durationSeconds/60*0.7)}-${Math.floor(durationSeconds/60-2)}min)
**VISUAL:** Estudos de caso, gráficos, resultados
**ROTEIRO:**
"Para você ver que isso realmente funciona, vou compartilhar alguns casos reais:

**Caso 1:** [Cliente/exemplo específico]
- Situação inicial
- Estratégia aplicada
- Resultados obtidos

**Caso 2:** [Meu próprio exemplo]
- Desafio enfrentado
- Solução implementada
- Lições aprendidas

**Caso 3:** [Exemplo da comunidade]
- Feedback recebido
- Adaptações feitas
- Sucesso alcançado"

### ESTRATÉGIA BÔNUS (${Math.floor(durationSeconds/60-2)}min-${Math.floor(durationSeconds/60-0.5)}min) 🎁
**VISUAL:** Close no rosto, tom mais íntimo
**ROTEIRO:**
"E agora a estratégia bônus que prometi no início:

[Estratégia avançada e valiosa]

Esta técnica eu normalmente só ensino nos meus cursos pagos, mas decidi compartilhar aqui porque sei que pode fazer a diferença na sua jornada.

[Explicação detalhada da estratégia]
[Como implementar]
[Cuidados importantes]"

### ENCERRAMENTO E CTA (${Math.floor(durationSeconds/60-0.5)}min-${Math.floor(durationSeconds/60)}min) 🚀
**VISUAL:** Volta para cenário principal
**ROTEIRO:**
"Então, recapitulando o que vimos hoje:
- [Ponto principal 1]
- [Ponto principal 2]
- [Ponto principal 3]

${videoData.goal === 'Gerar Leads' ? 
'Se você quer se aprofundar ainda mais, baixa meu material gratuito no link da descrição.' :
'Agora é com você! Implementa essas estratégias e me conta os resultados nos comentários.'}

${videoData.goal === 'Aumentar Seguidores' ? 
'Se este vídeo agregou valor, se inscreve no canal, deixa um like e compartilha com quem precisa.' :
'E não esquece de se inscrever no canal para mais conteúdos como este!'}

Nos vemos no próximo vídeo!"

## 📋 CHECKLIST DE PRODUÇÃO

### Pré-produção
- [ ] Roteiro revisado e aprovado
- [ ] Cenário organizado e iluminado
- [ ] Equipamentos testados
- [ ] B-roll e materiais de apoio preparados

### Gravação
- [ ] Audio limpo e sem ruídos
- [ ] Iluminação adequada
- [ ] Múltiplos ângulos gravados
- [ ] Takes extras para segurança

### Pós-produção
- [ ] Edição com cortes dinâmicos
- [ ] Inserção de B-roll e gráficos
- [ ] Música e efeitos sonoros
- [ ] Thumbnail atrativa criada
- [ ] Descrição e tags otimizadas

## 🎯 OTIMIZAÇÃO PARA YOUTUBE
- **Thumbnail:** Expressão marcante + texto grande + cores contrastantes
- **Título:** Palavra-chave + benefício + curiosidade
- **Descrição:** Resumo + timestamps + links relevantes
- **Tags:** Palavras-chave principais e relacionadas
- **Cards e telas finais:** Direcionamento para outros vídeos
        `;
      }
      
      setGeneratedScript(mockScript.trim());
      setIsGenerating(false);

      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript);
  };

  const selectedPlatform = platforms.find(p => p.value === videoData.platform);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
            <Video className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de Roteiros para Vídeo</h2>
            <p className="text-gray-600">Crie scripts profissionais para YouTube, TikTok, Instagram e outras plataformas</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tópico do Vídeo *
              </label>
              <input
                type="text"
                value={videoData.topic}
                onChange={(e) => setVideoData({...videoData, topic: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: Como Vender Mais no Instagram"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Play className="w-4 h-4 inline mr-1" />
                  Plataforma
                </label>
                <select
                  value={videoData.platform}
                  onChange={(e) => setVideoData({...videoData, platform: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {platforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duração
                </label>
                <select
                  value={videoData.duration}
                  onChange={(e) => setVideoData({...videoData, duration: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {getFilteredDurations().map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Público-alvo
                </label>
                <select
                  value={videoData.audience}
                  onChange={(e) => setVideoData({...videoData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Selecione o público</option>
                  {audiences.map((audience) => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Target className="w-4 h-4 inline mr-1" />
                  Objetivo
                </label>
                <select
                  value={videoData.goal}
                  onChange={(e) => setVideoData({...videoData, goal: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Selecione o objetivo</option>
                  {goals.map((goal) => (
                    <option key={goal} value={goal}>{goal}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Vídeo
                </label>
                <select
                  value={videoData.videoType}
                  onChange={(e) => setVideoData({...videoData, videoType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {videoTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom de Voz
                </label>
                <select
                  value={videoData.tone}
                  onChange={(e) => setVideoData({...videoData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                Gancho Inicial (Opcional)
              </label>
              <textarea
                value={videoData.hook}
                onChange={(e) => setVideoData({...videoData, hook: e.target.value})}
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Ex: Você sabia que 90% das pessoas fazem isso errado?"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !videoData.topic || (!isOnboardingComplete && freeUsesRemaining === 0)}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              {isGenerating ? 'Gerando Roteiro...' : 
               !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
               'Gerar Roteiro'}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Roteiro Gerado</h3>
                <p className="text-sm text-gray-600">
                  {selectedPlatform?.label} • {Math.floor(parseInt(videoData.duration)/60) > 0 ? `${Math.floor(parseInt(videoData.duration)/60)}min ` : ''}{parseInt(videoData.duration) % 60}s
                </p>
              </div>
              {generatedScript && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Copiar"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
              {generatedScript ? (
                <div className="bg-white p-6 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedScript}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados do vídeo e clique em "Gerar Roteiro"</p>
                  </div>
                </div>
              )}
            </div>

            {generatedScript && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">Roteiro profissional criado com sucesso!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Roteiro otimizado para {selectedPlatform?.label} com estrutura profissional e timing adequado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoScriptGenerator;