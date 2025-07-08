import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PenTool, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  BookOpen,
  Target,
  Users,
  Save
} from 'lucide-react';
import { contentService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

interface BlogContentGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const BlogContentGenerator: React.FC<BlogContentGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  const [blogData, setBlogData] = useState({
    topic: '',
    audience: '',
    tone: '',
    keywords: '',
    contentType: 'introduction',
    wordCount: '500'
  });

  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const { addSavedContent } = useStore();

  const audiences = [
    'Empreendedores',
    'Profissionais de Marketing',
    'Estudantes',
    'Consumidores Finais',
    'Especialistas Técnicos',
    'Público Geral'
  ];

  const tones = [
    'Profissional',
    'Casual e Amigável',
    'Educativo',
    'Inspirador',
    'Técnico',
    'Conversacional'
  ];

  const contentTypes = [
    { value: 'introduction', label: 'Introdução de Artigo' },
    { value: 'full-article', label: 'Artigo Completo' },
    { value: 'outline', label: 'Estrutura/Tópicos' },
    { value: 'conclusion', label: 'Conclusão' },
    { value: 'listicle', label: 'Lista (Top 10, etc.)' }
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
      let mockContent = '';
      
      switch (blogData.contentType) {
        case 'introduction':
          mockContent = `
# ${blogData.topic || 'Tópico do Blog'}

Você já se perguntou como ${blogData.topic?.toLowerCase() || 'este assunto'} pode transformar completamente sua perspectiva? No mundo atual, onde a informação é poder, entender profundamente sobre ${blogData.topic?.toLowerCase() || 'este tema'} não é apenas uma vantagem - é uma necessidade.

## Por que este assunto é crucial agora?

${blogData.audience ? `Para ${blogData.audience.toLowerCase()}, ` : 'Para profissionais modernos, '}compreender ${blogData.topic?.toLowerCase() || 'este conceito'} significa estar à frente da curva. As estatísticas mostram que pessoas que dominam este conhecimento têm 73% mais chances de alcançar seus objetivos.

## O que você vai descobrir neste artigo

Neste guia completo, vamos explorar:

• **Os fundamentos essenciais** que todo mundo deveria conhecer
• **Estratégias práticas** que você pode implementar hoje mesmo
• **Casos de sucesso reais** de quem já aplicou esses conceitos
• **Erros comuns** que você deve evitar a todo custo
• **Tendências futuras** que vão moldar este setor

${blogData.keywords ? `**Palavras-chave relevantes:** ${blogData.keywords}` : ''}

Continue lendo para descobrir insights que podem revolucionar sua abordagem sobre ${blogData.topic?.toLowerCase() || 'este assunto'}...
          `;
          break;
          
        case 'full-article':
          mockContent = `
# ${blogData.topic || 'Guia Completo: Tópico do Blog'}

## Introdução

${blogData.topic || 'Este assunto'} tem se tornado cada vez mais relevante no cenário atual. ${blogData.audience ? `Para ${blogData.audience.toLowerCase()}, ` : ''}entender este conceito é fundamental para o sucesso.

## 1. Fundamentos Básicos

### O que você precisa saber primeiro

Antes de mergulharmos nas estratégias avançadas, é essencial compreender os pilares fundamentais:

- **Conceito Principal**: Definição clara e objetiva
- **Importância**: Por que isso importa agora
- **Aplicações Práticas**: Onde usar no dia a dia

### Benefícios Comprovados

Estudos recentes mostram que a aplicação correta destes conceitos resulta em:
- 45% de aumento na eficiência
- 60% de melhoria nos resultados
- 80% de satisfação dos usuários

## 2. Estratégias Práticas

### Passo a Passo para Implementação

**Etapa 1: Planejamento**
- Defina seus objetivos claramente
- Identifique recursos necessários
- Estabeleça métricas de sucesso

**Etapa 2: Execução**
- Comece com projetos piloto
- Monitore resultados constantemente
- Ajuste a estratégia conforme necessário

**Etapa 3: Otimização**
- Analise dados coletados
- Implemente melhorias
- Escale para outros projetos

## 3. Casos de Sucesso

### Empresa A: Transformação Digital
"Implementamos essas estratégias e vimos um crescimento de 200% em 6 meses." - CEO da Empresa A

### Empresa B: Otimização de Processos
Resultados alcançados:
- Redução de 40% nos custos
- Aumento de 65% na produtividade
- Melhoria de 90% na satisfação do cliente

## 4. Erros Comuns e Como Evitá-los

### Erro #1: Falta de Planejamento
**Problema**: Começar sem estratégia clara
**Solução**: Sempre defina objetivos SMART

### Erro #2: Resistência à Mudança
**Problema**: Equipe não engajada
**Solução**: Invista em treinamento e comunicação

### Erro #3: Falta de Monitoramento
**Problema**: Não acompanhar métricas
**Solução**: Implemente dashboards de acompanhamento

## 5. Tendências Futuras

### O que esperar nos próximos anos

- **Automação Inteligente**: IA transformando processos
- **Personalização em Massa**: Experiências únicas para cada usuário
- **Sustentabilidade**: Práticas eco-friendly como diferencial

## Conclusão

${blogData.topic || 'Este assunto'} não é apenas uma tendência passageira - é o futuro. ${blogData.audience ? `Para ${blogData.audience.toLowerCase()}, ` : ''}dominar estes conceitos significa estar preparado para os desafios e oportunidades que estão por vir.

### Próximos Passos

1. **Avalie sua situação atual**
2. **Escolha uma estratégia para implementar**
3. **Comece pequeno e escale gradualmente**
4. **Monitore resultados constantemente**
5. **Ajuste conforme necessário**

${blogData.keywords ? `**Tags:** ${blogData.keywords}` : ''}

---

*Gostou deste conteúdo? Compartilhe com sua rede e ajude outros profissionais a se manterem atualizados!*
          `;
          break;
          
        case 'outline':
          mockContent = `
# Estrutura do Artigo: ${blogData.topic || 'Tópico do Blog'}

## 📋 Visão Geral do Conteúdo

**Público-alvo:** ${blogData.audience || 'Público geral'}
**Tom:** ${blogData.tone || 'Profissional'}
**Palavras estimadas:** ${blogData.wordCount} palavras
**Tempo de leitura:** ${Math.ceil(parseInt(blogData.wordCount) / 200)} minutos

## 🎯 Objetivo do Artigo

Educar ${blogData.audience?.toLowerCase() || 'o público'} sobre ${blogData.topic?.toLowerCase() || 'o tópico'} e fornecer insights acionáveis para implementação prática.

## 📝 Estrutura Detalhada

### 1. Introdução (10% do conteúdo)
- **Hook inicial**: Estatística ou pergunta provocativa
- **Problema**: Por que este assunto é relevante agora
- **Promessa**: O que o leitor vai aprender
- **Preview**: Estrutura do artigo

### 2. Fundamentos (20% do conteúdo)
- **Definições básicas**
- **Contexto histórico**
- **Importância atual**
- **Benefícios principais**

### 3. Desenvolvimento Principal (50% do conteúdo)

#### 3.1 Estratégias Práticas
- Método 1: [Descrição e aplicação]
- Método 2: [Descrição e aplicação]
- Método 3: [Descrição e aplicação]

#### 3.2 Casos de Estudo
- Caso A: Empresa/pessoa que teve sucesso
- Caso B: Lições aprendidas com falhas
- Caso C: Aplicação inovadora

#### 3.3 Ferramentas e Recursos
- Ferramentas recomendadas
- Recursos gratuitos
- Investimentos que valem a pena

### 4. Implementação (15% do conteúdo)
- **Passo a passo prático**
- **Cronograma sugerido**
- **Métricas para acompanhar**
- **Possíveis obstáculos**

### 5. Conclusão (5% do conteúdo)
- **Resumo dos pontos principais**
- **Call-to-action claro**
- **Próximos passos**
- **Convite para engajamento**

## 🔍 Palavras-chave para SEO

**Principal:** ${blogData.topic || '[tópico principal]'}
**Secundárias:** ${blogData.keywords || '[palavras-chave relacionadas]'}

## 📊 Elementos Visuais Sugeridos

- [ ] Infográfico com estatísticas principais
- [ ] Diagrama do processo passo a passo
- [ ] Screenshots de ferramentas mencionadas
- [ ] Gráfico com resultados de casos de estudo
- [ ] Checklist para download

## 💡 CTAs Recomendados

1. **Meio do artigo**: Newsletter signup
2. **Final do artigo**: Download de recurso gratuito
3. **Sidebar**: Consulta gratuita ou demo
          `;
          break;
          
        case 'conclusion':
          mockContent = `
## Conclusão: Transforme Conhecimento em Ação

Chegamos ao final desta jornada sobre ${blogData.topic?.toLowerCase() || 'este importante assunto'}. Ao longo deste artigo, exploramos conceitos fundamentais, estratégias práticas e casos reais de sucesso que demonstram o poder transformador deste conhecimento.

### 🎯 Principais Takeaways

**1. Fundamentos Sólidos São Essenciais**
Sem uma base teórica consistente, qualquer estratégia está fadada ao fracasso. Invista tempo em compreender profundamente os conceitos antes de partir para a ação.

**2. A Prática Leva à Perfeição**
Conhecimento sem aplicação é apenas informação. ${blogData.audience ? `Para ${blogData.audience.toLowerCase()}, ` : ''}o diferencial está na implementação consistente e no aprendizado contínuo.

**3. Adaptação é Fundamental**
O que funciona para uma situação pode não funcionar para outra. Mantenha-se flexível e sempre pronto para ajustar sua abordagem baseado nos resultados obtidos.

### 🚀 Seus Próximos Passos

Agora que você tem o conhecimento, é hora de agir:

**Esta Semana:**
- [ ] Avalie sua situação atual
- [ ] Identifique uma área para aplicar estes conceitos
- [ ] Defina métricas de sucesso

**Este Mês:**
- [ ] Implemente uma estratégia piloto
- [ ] Monitore resultados iniciais
- [ ] Ajuste conforme necessário

**Próximos 3 Meses:**
- [ ] Escale as estratégias que funcionaram
- [ ] Compartilhe aprendizados com sua equipe
- [ ] Explore oportunidades avançadas

### 💬 Continue a Conversa

${blogData.topic || 'Este assunto'} está em constante evolução, e adoraríamos ouvir sobre sua experiência:

- **Qual estratégia você vai implementar primeiro?**
- **Que desafios você antecipa?**
- **Como podemos ajudar em sua jornada?**

Deixe um comentário abaixo ou conecte-se conosco nas redes sociais. Sua experiência pode inspirar outros ${blogData.audience?.toLowerCase() || 'profissionais'} a alcançarem resultados extraordinários.

### 🎁 Recursos Adicionais

Para continuar seu aprendizado, preparamos alguns recursos exclusivos:

- **📚 E-book Gratuito**: "Guia Avançado de [Tópico]"
- **🎥 Webinar**: Sessão ao vivo com especialistas
- **📊 Template**: Planilha para acompanhar seus resultados
- **👥 Comunidade**: Grupo exclusivo para networking

**[BAIXAR RECURSOS GRATUITOS]**

### 🌟 Transforme Sua Realidade

Lembre-se: o conhecimento que você adquiriu hoje só tem valor se for aplicado. ${blogData.audience ? `Como ${blogData.audience.toLowerCase()}, ` : ''}você tem o poder de transformar não apenas seus resultados, mas também influenciar positivamente todos ao seu redor.

O futuro pertence àqueles que agem. Comece hoje mesmo.

---

*Gostou deste conteúdo? Compartilhe com colegas que também podem se beneficiar deste conhecimento. Juntos, podemos elevar o nível de toda a comunidade.*

${blogData.keywords ? `**Tags:** ${blogData.keywords}` : ''}
          `;
          break;
          
        case 'listicle':
          mockContent = `
# Top 10 ${blogData.topic || 'Estratégias Essenciais'} Que Todo ${blogData.audience || 'Profissional'} Deveria Conhecer

${blogData.audience ? `Para ${blogData.audience.toLowerCase()}, ` : ''}dominar ${blogData.topic?.toLowerCase() || 'estas estratégias'} não é apenas uma vantagem competitiva - é uma necessidade. Compilamos as 10 abordagens mais eficazes baseadas em dados reais e casos de sucesso.

## 🏆 1. Estratégia de Planejamento Estratégico

**Por que funciona:** 89% dos profissionais que planejam adequadamente alcançam seus objetivos.

**Como implementar:**
- Defina metas SMART específicas
- Crie cronogramas realistas
- Estabeleça marcos de acompanhamento

**Resultado esperado:** Aumento de 45% na eficiência geral.

---

## 🎯 2. Foco na Experiência do Cliente

**Por que funciona:** Empresas customer-centric crescem 60% mais rápido.

**Como implementar:**
- Mapeie a jornada do cliente
- Colete feedback constantemente
- Personalize interações

**Resultado esperado:** 73% de aumento na satisfação do cliente.

---

## 📊 3. Análise de Dados Inteligente

**Por que funciona:** Decisões baseadas em dados são 5x mais eficazes.

**Como implementar:**
- Implemente ferramentas de analytics
- Crie dashboards visuais
- Treine equipe em interpretação de dados

**Resultado esperado:** 35% de melhoria na tomada de decisões.

---

## 🤖 4. Automação de Processos

**Por que funciona:** Reduz erros humanos em 90% e aumenta velocidade.

**Como implementar:**
- Identifique tarefas repetitivas
- Escolha ferramentas adequadas
- Implemente gradualmente

**Resultado esperado:** 50% de redução no tempo de execução.

---

## 🌐 5. Presença Digital Forte

**Por que funciona:** 78% dos consumidores pesquisam online antes de comprar.

**Como implementar:**
- Otimize SEO do seu site
- Mantenha redes sociais ativas
- Crie conteúdo de valor

**Resultado esperado:** 120% de aumento na visibilidade online.

---

## 👥 6. Desenvolvimento de Equipe

**Por que funciona:** Equipes engajadas são 31% mais produtivas.

**Como implementar:**
- Invista em treinamentos regulares
- Crie programas de mentoria
- Reconheça conquistas

**Resultado esperado:** 40% de redução no turnover.

---

## 🔄 7. Melhoria Contínua

**Por que funciona:** Pequenas melhorias geram grandes resultados ao longo do tempo.

**Como implementar:**
- Estabeleça ciclos de revisão
- Colete sugestões da equipe
- Teste e implemente melhorias

**Resultado esperado:** 25% de otimização anual nos processos.

---

## 💡 8. Inovação Constante

**Por que funciona:** Empresas inovadoras crescem 2.6x mais rápido.

**Como implementar:**
- Reserve tempo para brainstorming
- Teste novas tecnologias
- Encoraje experimentação

**Resultado esperado:** 55% de vantagem competitiva.

---

## 🤝 9. Networking Estratégico

**Por que funciona:** 85% das oportunidades surgem através de conexões.

**Como implementar:**
- Participe de eventos do setor
- Mantenha contato regular
- Ofereça valor antes de pedir

**Resultado esperado:** 67% de aumento em oportunidades de negócio.

---

## 📈 10. Monitoramento de Resultados

**Por que funciona:** O que não é medido não pode ser melhorado.

**Como implementar:**
- Defina KPIs claros
- Crie relatórios regulares
- Ajuste estratégias baseado em dados

**Resultado esperado:** 80% de precisão no alcance de metas.

---

## 🎯 Bônus: Como Implementar Todas as Estratégias

### Cronograma de 90 Dias

**Dias 1-30:** Implemente estratégias 1, 2 e 10
**Dias 31-60:** Adicione estratégias 3, 4 e 6
**Dias 61-90:** Complete com estratégias 5, 7, 8 e 9

### Checklist de Implementação

- [ ] Avalie situação atual
- [ ] Priorize estratégias por impacto
- [ ] Defina responsáveis
- [ ] Estabeleça cronograma
- [ ] Monitore progresso semanalmente

## 💪 Conclusão

${blogData.audience ? `Como ${blogData.audience.toLowerCase()}, ` : ''}você agora tem acesso às 10 estratégias mais poderosas para ${blogData.topic?.toLowerCase() || 'alcançar o sucesso'}. Lembre-se: o segredo não está em implementar todas de uma vez, mas em escolher as que fazem mais sentido para sua situação atual e executá-las com excelência.

**Qual estratégia você vai implementar primeiro? Compartilhe nos comentários!**

${blogData.keywords ? `**Tags:** ${blogData.keywords}` : ''}
          `;
          break;
      }
      
      setGeneratedContent(mockContent.trim());
      setIsGenerating(false);

      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const handleSaveContent = async () => {
    if (!isAuthenticated || !user) {
      toast.error('Você precisa estar logado para salvar conteúdo');
      return;
    }

    if (!generatedContent) {
      toast.error('Nenhum conteúdo para salvar');
      return;
    }

    setSaving(true);
    try {
      const contentData = {
        user_id: user.id,
        content_type: 'blog_content',
        title: blogData.topic || 'Conteúdo de Blog',
        content: generatedContent,
        metadata: {
          audience: blogData.audience,
          tone: blogData.tone,
          contentType: blogData.contentType,
          wordCount: blogData.wordCount,
          keywords: blogData.keywords
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de Conteúdo para Blog</h2>
            <p className="text-gray-600">Crie artigos, introduções e estruturas que engajam e convertem</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tópico Principal *
              </label>
              <input
                type="text"
                value={blogData.topic}
                onChange={(e) => setBlogData({...blogData, topic: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: Marketing Digital para Pequenas Empresas"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  <Target className="w-4 h-4 inline mr-1" />
                  Tom de Voz
                </label>
                <select
                  value={blogData.tone}
                  onChange={(e) => setBlogData({...blogData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  <BookOpen className="w-4 h-4 inline mr-1" />
                  Tipo de Conteúdo
                </label>
                <select
                  value={blogData.contentType}
                  onChange={(e) => setBlogData({...blogData, contentType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {contentTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tamanho (palavras)
                </label>
                <select
                  value={blogData.wordCount}
                  onChange={(e) => setBlogData({...blogData, wordCount: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="300">300 palavras (2 min)</option>
                  <option value="500">500 palavras (3 min)</option>
                  <option value="800">800 palavras (5 min)</option>
                  <option value="1200">1200 palavras (7 min)</option>
                  <option value="2000">2000 palavras (12 min)</option>
                </select>
              </div>
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
                placeholder="marketing digital, pequenas empresas, estratégias"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !blogData.topic || (!isOnboardingComplete && freeUsesRemaining === 0)}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              {isGenerating ? 'Gerando Conteúdo...' : 
               !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
               'Gerar Conteúdo'}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Conteúdo Gerado</h3>
              {generatedContent && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
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
                    className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
              {generatedContent ? (
                <div className="bg-white p-6 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <PenTool className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados do blog e clique em "Gerar Conteúdo"</p>
                  </div>
                </div>
              )}
            </div>

            {generatedContent && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">Conteúdo otimizado criado com sucesso!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Este conteúdo foi otimizado para SEO e engajamento do público-alvo.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContentGenerator;