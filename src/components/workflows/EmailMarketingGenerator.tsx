import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Zap, 
  Copy, 
  Download, 
  Lock,
  Check,
  Users,
  Target,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface EmailMarketingGeneratorProps {
  freeUsesRemaining: number;
  isOnboardingComplete: boolean;
  consumeFreeUse: () => Promise<number>;
  onShowOnboarding: () => void;
}

const EmailMarketingGenerator: React.FC<EmailMarketingGeneratorProps> = ({
  freeUsesRemaining,
  isOnboardingComplete,
  consumeFreeUse,
  onShowOnboarding
}) => {
  const [emailData, setEmailData] = useState({
    subject: '',
    product: '',
    audience: '',
    goal: '',
    tone: '',
    emailType: 'promotional',
    urgency: 'medium'
  });

  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const audiences = [
    'Clientes Existentes',
    'Leads Qualificados',
    'Prospects Frios',
    'Clientes VIP',
    'Usuários Inativos',
    'Novos Assinantes'
  ];

  const goals = [
    'Aumentar Vendas',
    'Gerar Leads',
    'Reativar Clientes',
    'Educar Audiência',
    'Promover Evento',
    'Coletar Feedback'
  ];

  const tones = [
    'Profissional',
    'Amigável',
    'Urgente',
    'Educativo',
    'Exclusivo',
    'Casual'
  ];

  const emailTypes = [
    { value: 'promotional', label: 'E-mail Promocional' },
    { value: 'welcome', label: 'E-mail de Boas-vindas' },
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'abandoned-cart', label: 'Carrinho Abandonado' },
    { value: 'reactivation', label: 'Reativação' },
    { value: 'follow-up', label: 'Follow-up de Vendas' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Baixa - Informativo' },
    { value: 'medium', label: 'Média - Promocional' },
    { value: 'high', label: 'Alta - Urgente' }
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
      let mockEmail = '';
      
      switch (emailData.emailType) {
        case 'promotional':
          mockEmail = `
**Assunto:** ${emailData.subject || `🔥 Oferta Especial: ${emailData.product || 'Produto Incrível'} com 50% OFF!`}

---

Olá [Nome],

${emailData.urgency === 'high' ? '⏰ **ÚLTIMAS HORAS!** ⏰' : ''}

${emailData.product || 'Nosso produto mais vendido'} está com uma oferta imperdível e eu não poderia deixar de compartilhar com você!

## 🎯 Por que esta oferta é especial?

✅ **Desconto exclusivo de 50%** (apenas para nossa lista VIP)
✅ **Frete grátis** para todo o Brasil
✅ **Garantia estendida** de 12 meses
✅ **Suporte prioritário** 24/7

${emailData.audience === 'Clientes VIP' ? '🌟 **BÔNUS EXCLUSIVO PARA VIP:** E-book gratuito no valor de R$ 97!' : ''}

## 💰 Sua Economia:

~~De: R$ 297,00~~
**Por apenas: R$ 148,50**

**Você economiza: R$ 148,50!**

${emailData.urgency === 'high' ? 
`## ⚠️ ATENÇÃO: Oferta válida apenas até HOJE às 23h59!

Restam apenas **${Math.floor(Math.random() * 50) + 10} unidades** em estoque.` : 
`## 📅 Oferta válida por tempo limitado

Esta promoção especial termina em 72 horas.`}

## 🚀 O que nossos clientes dizem:

*"Melhor investimento que já fiz! Resultados em apenas 7 dias."* - Maria S. ⭐⭐⭐⭐⭐

*"Superou todas as minhas expectativas. Recomendo!"* - João P. ⭐⭐⭐⭐⭐

**[🛒 GARANTIR MINHA OFERTA AGORA]**

Qualquer dúvida, é só responder este e-mail. Estou aqui para ajudar!

Um abraço,
[Seu Nome]

P.S.: Lembre-se, esta oferta é exclusiva para você e expira em breve. Não perca!

---
*Se você não deseja mais receber nossos e-mails, [clique aqui para descadastrar].*
          `;
          break;
          
        case 'welcome':
          mockEmail = `
**Assunto:** ${emailData.subject || `🎉 Bem-vindo(a) à nossa comunidade, [Nome]!`}

---

Olá [Nome],

Que alegria ter você conosco! 🎉

Seja muito bem-vindo(a) à nossa comunidade de ${emailData.audience?.toLowerCase() || 'pessoas incríveis'} que, assim como você, buscam ${emailData.goal?.toLowerCase() || 'resultados excepcionais'}.

## 🎁 Seu presente de boas-vindas:

Para começar com o pé direito, preparei alguns presentes especiais para você:

✅ **E-book gratuito:** "Guia Completo para Iniciantes" (valor R$ 47)
✅ **Acesso ao grupo VIP** no Telegram
✅ **Desconto de 20%** na sua primeira compra
✅ **Consultoria gratuita** de 30 minutos

**[🎁 RESGATAR MEUS PRESENTES]**

## 📚 O que você pode esperar de mim:

🔹 **Conteúdo exclusivo** toda semana
🔹 **Dicas práticas** que realmente funcionam
🔹 **Ofertas especiais** apenas para assinantes
🔹 **Suporte direto** quando precisar

## 🚀 Próximos passos:

1. **Baixe seu e-book gratuito** (link acima)
2. **Entre no nosso grupo VIP** para networking
3. **Acompanhe seus e-mails** para não perder nenhuma dica
4. **Responda este e-mail** me contando qual seu maior desafio

## 💬 Vamos nos conhecer melhor?

Responda este e-mail me contando:
- Qual seu maior objetivo agora?
- Como posso te ajudar a alcançá-lo?

Estou aqui para apoiar sua jornada!

Um abraço caloroso,
[Seu Nome]

P.S.: Salve meu e-mail nos seus contatos para garantir que minhas mensagens sempre cheguem até você!

---
*Você está recebendo este e-mail porque se inscreveu em nossa lista. [Gerenciar preferências] | [Descadastrar]*
          `;
          break;
          
        case 'newsletter':
          mockEmail = `
**Assunto:** ${emailData.subject || `📰 Newsletter Semanal: Novidades e Dicas Exclusivas`}

---

Olá [Nome],

Espero que sua semana esteja sendo incrível! 

Aqui está sua dose semanal de insights, novidades e dicas práticas para ${emailData.goal?.toLowerCase() || 'alcançar seus objetivos'}.

## 📈 Destaque da Semana

### ${emailData.product || 'Nova Estratégia Revolucionária'}

Descobrimos uma técnica que está gerando resultados impressionantes para nossos clientes:

- 📊 **73% de aumento** na conversão
- ⚡ **Implementação em 24h**
- 💰 **ROI de 300%** em 30 dias

**[📖 LER ARTIGO COMPLETO]**

## 🔥 Conteúdos em Destaque

### 1. **Guia Prático: Como Otimizar Seus Resultados**
*"Estratégias simples que fazem toda a diferença"*
**[📚 Acessar Guia]**

### 2. **Case de Sucesso: Cliente Aumentou Vendas em 200%**
*"Veja exatamente o que ele fez e como você pode replicar"*
**[🎯 Ver Case]**

### 3. **Ferramenta Gratuita da Semana**
*"Automatize seus processos em minutos"*
**[🛠️ Baixar Ferramenta]**

## 📊 Números da Semana

- **2.847** novos membros na comunidade
- **156** cases de sucesso compartilhados
- **4.9/5** nota média de satisfação

## 🎯 Dica Rápida

**Você sabia que 80% do sucesso está na consistência?**

Pequenas ações diárias geram resultados extraordinários. Esta semana, escolha UMA estratégia e aplique todos os dias por 7 dias. Os resultados vão te surpreender!

## 📅 Agenda da Próxima Semana

- **Segunda:** Webinar gratuito "Estratégias Avançadas"
- **Quarta:** Lançamento do novo curso
- **Sexta:** Live de perguntas e respostas

## 💬 Sua Opinião Importa

Responda rapidinho: Qual tópico você gostaria de ver na próxima newsletter?

**[📝 ENVIAR SUGESTÃO]**

Até a próxima semana!

[Seu Nome]

---
*Newsletter enviada para [email]. [Gerenciar preferências] | [Descadastrar]*
          `;
          break;
          
        case 'abandoned-cart':
          mockEmail = `
**Assunto:** ${emailData.subject || `😢 Você esqueceu algo importante no seu carrinho...`}

---

Olá [Nome],

Notei que você estava interessado(a) em ${emailData.product || 'nosso produto'}, mas não finalizou sua compra.

Acontece com todo mundo! A vida é corrida e às vezes esquecemos das coisas importantes.

## 🛒 Itens no seu carrinho:

**${emailData.product || 'Produto Selecionado'}**
- Quantidade: 1
- Valor: R$ 197,00

## ⏰ Boa notícia: Ainda dá tempo!

Seus itens estão reservados por mais **24 horas**. Depois disso, não posso garantir a disponibilidade.

## 🎁 Oferta especial para você:

Para facilitar sua decisão, vou liberar um **desconto exclusivo de 15%**:

~~R$ 197,00~~
**R$ 167,45** (economia de R$ 29,55!)

**Código:** VOLTA15

## ✅ Por que nossos clientes escolhem este produto:

⭐ **4.9/5 estrelas** (mais de 1.200 avaliações)
🚚 **Frete grátis** para todo o Brasil
🔒 **Garantia de 30 dias** ou seu dinheiro de volta
📞 **Suporte especializado** 24/7

## 💬 Depoimentos recentes:

*"Melhor compra que já fiz! Resultados incríveis."* - Ana M.
*"Superou todas as expectativas. Vale cada centavo!"* - Carlos R.

**[🛒 FINALIZAR COMPRA COM DESCONTO]**

## ❓ Alguma dúvida?

Se você tem alguma pergunta sobre o produto, é só responder este e-mail. Nossa equipe está pronta para ajudar!

Não perca esta oportunidade!

[Seu Nome]

P.S.: Este desconto é válido apenas por 24h e exclusivo para você. Aproveite!

---
*Carrinho salvo para [email]. [Finalizar compra] | [Remover itens]*
          `;
          break;
          
        case 'reactivation':
          mockEmail = `
**Assunto:** ${emailData.subject || `Sentimos sua falta... Que tal voltarmos a nos conectar? 💙`}

---

Olá [Nome],

Faz um tempo que não nos falamos, e confesso que senti sua falta por aqui! 

Sei que a vida fica corrida e às vezes perdemos o contato com coisas importantes. Mas queria aproveitar para te contar algumas novidades incríveis que aconteceram enquanto você esteve ausente.

## 🆕 O que você perdeu:

✨ **Novo sistema de resultados** (3x mais eficiente)
🎁 **Área de membros renovada** com conteúdo exclusivo
📚 **+50 novos materiais** gratuitos
🏆 **Comunidade com 10.000+ membros** ativos

## 🎯 Oferta especial de retorno:

Para celebrar seu retorno, preparei algo especial:

**🎁 PACOTE DE VOLTA POR CASA:**
- ✅ Acesso completo por 30 dias
- ✅ Todos os materiais novos
- ✅ Consultoria gratuita de 1h
- ✅ Desconto de 40% em qualquer produto

**Valor normal: R$ 497**
**Seu preço de retorno: R$ 97**

## 💝 Por que esta oferta existe?

Porque acredito que você merece ter acesso às melhores estratégias e ferramentas. E porque sua jornada de ${emailData.goal?.toLowerCase() || 'sucesso'} é importante para mim.

## 📈 Resultados que nossos membros estão alcançando:

- **Maria L.:** Aumentou vendas em 180% em 60 dias
- **João S.:** Automatizou 70% dos processos
- **Ana P.:** Triplicou sua lista de leads

**[🚀 ACEITAR OFERTA DE RETORNO]**

## ⏰ Importante:

Esta oferta especial é válida apenas por **72 horas** e exclusiva para membros que estavam afastados.

Depois desse prazo, volta ao valor normal.

## 💬 Me conta uma coisa...

Responda este e-mail me contando:
- O que te afastou por um tempo?
- Como posso te ajudar melhor agora?

Sua opinião é muito importante para mim!

Ansioso para te ter de volta,

[Seu Nome]

P.S.: Mesmo que você não aceite a oferta agora, saiba que sempre terá um lugar especial aqui. Você faz parte da nossa família!

---
*E-mail enviado para [email]. [Reativar conta] | [Atualizar preferências]*
          `;
          break;
          
        case 'follow-up':
          mockEmail = `
**Assunto:** ${emailData.subject || `Como está sendo sua experiência com ${emailData.product || 'nosso produto'}?`}

---

Olá [Nome],

Espero que esteja tudo bem com você!

Faz alguns dias que você adquiriu ${emailData.product || 'nosso produto'} e queria saber como está sendo sua experiência.

## 🎯 Você já conseguiu:

✅ Implementar as primeiras estratégias?
✅ Ver os primeiros resultados?
✅ Tirar suas dúvidas iniciais?

## 🚀 Para acelerar seus resultados:

Preparei alguns recursos extras que vão turbinar seus resultados:

### 📚 **Materiais Complementares:**
- Checklist de implementação rápida
- Templates prontos para usar
- Vídeos de casos práticos

### 🎯 **Suporte Especializado:**
- Grupo VIP no Telegram
- Sessão de mentoria em grupo
- Acesso direto à nossa equipe

**[📥 ACESSAR RECURSOS EXTRAS]**

## 💡 Dica importante:

A maioria das pessoas vê resultados significativos entre 7-14 dias de implementação consistente. Se você ainda não começou, que tal dedicar 30 minutos hoje?

## ❓ Precisa de ajuda?

Se você tem alguma dúvida ou dificuldade, nossa equipe está aqui para ajudar:

- 📧 **E-mail:** suporte@empresa.com
- 💬 **WhatsApp:** (11) 99999-9999
- 🕐 **Horário:** Segunda a sexta, 9h às 18h

## 🌟 Depoimento da semana:

*"Em 10 dias já vi resultados incríveis! O suporte é excepcional e o produto entrega tudo que promete."* - Cliente Satisfeito ⭐⭐⭐⭐⭐

## 🎁 Surpresa especial:

Como você é um cliente especial, tenho um bônus exclusivo:

**Acesso gratuito ao nosso próximo webinar:**
*"Estratégias Avançadas para Resultados 10x Maiores"*

**Data:** Próxima quinta-feira, 20h
**Valor:** R$ 97 (GRATUITO para você)

**[🎟️ GARANTIR MINHA VAGA]**

## 💬 Sua opinião é valiosa:

Responda este e-mail me contando:
1. Como está sendo sua experiência?
2. Qual sua maior dificuldade até agora?
3. Como posso te ajudar melhor?

Estou aqui para garantir seu sucesso!

Um abraço,
[Seu Nome]

P.S.: Lembre-se, seu sucesso é meu sucesso. Conte comigo sempre que precisar!

---
*Acompanhamento de compra para [email]. [Acessar suporte] | [Avaliar produto]*
          `;
          break;
      }
      
      setGeneratedEmail(mockEmail.trim());
      setIsGenerating(false);

      if (!isOnboardingComplete && newUsesRemaining === 0) {
        setTimeout(() => {
          onShowOnboarding();
        }, 3000);
      }
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gerador de E-mail Marketing</h2>
            <p className="text-gray-600">Crie campanhas de e-mail que convertem e engajam sua audiência</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assunto do E-mail *
              </label>
              <input
                type="text"
                value={emailData.subject}
                onChange={(e) => setEmailData({...emailData, subject: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: 🔥 Oferta Especial: 50% OFF por tempo limitado!"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Produto/Serviço
              </label>
              <input
                type="text"
                value={emailData.product}
                onChange={(e) => setEmailData({...emailData, product: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Curso de Marketing Digital"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Audiência
                </label>
                <select
                  value={emailData.audience}
                  onChange={(e) => setEmailData({...emailData, audience: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Selecione a audiência</option>
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
                  value={emailData.goal}
                  onChange={(e) => setEmailData({...emailData, goal: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  Tipo de E-mail
                </label>
                <select
                  value={emailData.emailType}
                  onChange={(e) => setEmailData({...emailData, emailType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {emailTypes.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tom de Voz
                </label>
                <select
                  value={emailData.tone}
                  onChange={(e) => setEmailData({...emailData, tone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                <TrendingUp className="w-4 h-4 inline mr-1" />
                Nível de Urgência
              </label>
              <select
                value={emailData.urgency}
                onChange={(e) => setEmailData({...emailData, urgency: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !emailData.subject || (!isOnboardingComplete && freeUsesRemaining === 0)}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
              {isGenerating ? 'Gerando E-mail...' : 
               !isOnboardingComplete && freeUsesRemaining === 0 ? 'Complete o Cadastro' :
               'Gerar E-mail Marketing'}
            </button>
          </div>

          {/* Generated Content */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">E-mail Gerado</h3>
              {generatedEmail && (
                <div className="flex space-x-2">
                  <button
                    onClick={copyToClipboard}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                    title="Copiar"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-[400px] max-h-[600px] overflow-y-auto">
              {generatedEmail ? (
                <div className="bg-white p-6 rounded-lg border">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedEmail}
                  </pre>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-400">
                  <div className="text-center">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Preencha os dados do e-mail e clique em "Gerar E-mail Marketing"</p>
                  </div>
                </div>
              )}
            </div>

            {generatedEmail && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-green-700">
                  <Check className="w-5 h-5 mr-2" />
                  <span className="font-medium">E-mail otimizado criado com sucesso!</span>
                </div>
                <p className="text-sm text-green-600 mt-1">
                  Este e-mail foi otimizado para conversão e engajamento da audiência.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMarketingGenerator;