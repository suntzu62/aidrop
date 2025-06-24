const aiService = {
  // Gerar descrição de produto
  generateProductDescription: async (data) => {
    const {
      title = 'Produto',
      category = 'Geral',
      price = '0',
      features = '',
      keywords = '',
      platform = 'Mercado Livre'
    } = data;

    // Simular processamento de IA
    await new Promise(resolve => setTimeout(resolve, 1000));

    const description = `
# ${title} - Oferta Especial! 🔥

## ✨ Principais Características

${features ? features.split(',').map(feature => `• **${feature.trim()}** - Tecnologia de ponta`).join('\n') : '• **Qualidade superior garantida** - Materiais premium\n• **Entrega rápida e segura** - Enviamos para todo Brasil\n• **Garantia de satisfação** - 30 dias para trocar'}

## 🎯 Por que escolher este produto?

Este ${title.toLowerCase()} foi cuidadosamente desenvolvido para superar suas expectativas. Com design inovador e funcionalidade excepcional, é a escolha perfeita para quem busca **qualidade**, **durabilidade** e **valor**.

### 🏆 Benefícios Exclusivos:
- ⚡ **Performance superior** - Resultados que você pode ver
- 🛡️ **Garantia estendida** - Proteção total do seu investimento  
- 🚀 **Tecnologia avançada** - O que há de mais moderno no mercado
- 💎 **Acabamento premium** - Detalhes que fazem a diferença

## 📦 O que está incluído:

✅ 1x ${title}
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

${price && price !== '0' ? `**POR APENAS R$ ${parseFloat(price).toFixed(2).replace('.', ',')}**` : '**PREÇO ESPECIAL DISPONÍVEL**'}

### 🎁 BÔNUS EXCLUSIVOS:
- 📱 App móvel gratuito (valor R$ 29,90)
- 📚 E-book com dicas de uso (valor R$ 19,90)  
- 🎧 Suporte prioritário (valor R$ 39,90)

## 🔍 Especificações Técnicas

${category ? `**Categoria:** ${category}` : ''}
${platform ? `**Disponível em:** ${platform}` : ''}
${keywords ? `**Tags:** ${keywords}` : ''}

---

⭐ **Avaliação 4.9/5** - Mais de 2.500 clientes satisfeitos
🏆 **Vendedor Premium** - Loja oficial com mais de 15 anos de experiência
🔒 **Compra 100% Segura** - Proteção total da plataforma
🚀 **Entrega Garantida** - Ou seu dinheiro de volta

### 🔥 **ÚLTIMAS UNIDADES - APROVEITE AGORA!** 

*Oferta válida por tempo limitado ou enquanto durarem os estoques*

**👆 CLIQUE EM "COMPRAR AGORA" E GARANTA O SEU!**
    `.trim();

    return {
      success: true,
      content: description,
      metadata: {
        type: 'product_description',
        platform,
        wordCount: description.split(' ').length,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Gerar conteúdo para blog
  generateBlogContent: async (data) => {
    const {
      topic = 'Tópico do Blog',
      audience = 'Público geral',
      tone = 'Profissional',
      contentType = 'introduction',
      wordCount = '500',
      keywords = ''
    } = data;

    await new Promise(resolve => setTimeout(resolve, 1200));

    let content = '';

    if (contentType === 'introduction') {
      content = `
# ${topic}

Você já se perguntou como ${topic.toLowerCase()} pode transformar completamente sua perspectiva? No mundo atual, onde a informação é poder, entender profundamente sobre ${topic.toLowerCase()} não é apenas uma vantagem - é uma necessidade.

## Por que este assunto é crucial agora?

${audience ? `Para ${audience.toLowerCase()}, ` : 'Para profissionais modernos, '}compreender ${topic.toLowerCase()} significa estar à frente da curva. As estatísticas mostram que pessoas que dominam este conhecimento têm 73% mais chances de alcançar seus objetivos.

## O que você vai descobrir neste artigo

Neste guia completo, vamos explorar:

• **Os fundamentos essenciais** que todo mundo deveria conhecer
• **Estratégias práticas** que você pode implementar hoje mesmo
• **Casos de sucesso reais** de quem já aplicou esses conceitos
• **Erros comuns** que você deve evitar a todo custo
• **Tendências futuras** que vão moldar este setor

${keywords ? `**Palavras-chave relevantes:** ${keywords}` : ''}

Continue lendo para descobrir insights que podem revolucionar sua abordagem sobre ${topic.toLowerCase()}...
      `;
    } else if (contentType === 'full-article') {
      content = `
# ${topic} - Guia Completo

## Introdução

${topic} tem se tornado cada vez mais relevante no cenário atual. ${audience ? `Para ${audience.toLowerCase()}, ` : ''}entender este conceito é fundamental para o sucesso.

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

## Conclusão

${topic} não é apenas uma tendência passageira - é o futuro. ${audience ? `Para ${audience.toLowerCase()}, ` : ''}dominar estes conceitos significa estar preparado para os desafios e oportunidades que estão por vir.

${keywords ? `**Tags:** ${keywords}` : ''}
      `;
    }

    return {
      success: true,
      content: content.trim(),
      metadata: {
        type: 'blog_content',
        contentType,
        audience,
        tone,
        wordCount: content.split(' ').length,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Gerar posts para redes sociais
  generateSocialMediaPost: async (data) => {
    const {
      product = 'Produto',
      message = 'Mensagem principal',
      audience = 'Público geral',
      platform = 'instagram',
      cta = 'Saiba Mais',
      hashtags = ''
    } = data;

    await new Promise(resolve => setTimeout(resolve, 800));

    let post = '';

    switch (platform) {
      case 'instagram':
        post = `
🌟 ${product} 🌟

${message} ✨

${audience ? `Perfeito para ${audience.toLowerCase()}` : 'Ideal para você'} que busca qualidade e inovação! 💫

🔥 BENEFÍCIOS EXCLUSIVOS:
• Qualidade premium garantida
• Entrega super rápida
• Suporte especializado 24/7
• Garantia de satisfação

👆 ${cta.toUpperCase()} - Link na bio! 🔗

${hashtags ? hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#produto #qualidade #oferta #imperdivel #novidade #lifestyle #brasil'}

---
💬 Conta pra gente nos comentários: qual sua maior expectativa?
👥 Marca aquele amigo que precisa conhecer isso!
❤️ Salva este post para não esquecer!
        `;
        break;

      case 'facebook':
        post = `
🎯 ${product} - A Solução Que Você Estava Procurando!

${message}

${audience ? `Especialmente desenvolvido para ${audience.toLowerCase()}` : 'Criado pensando em você'} que valoriza qualidade e resultados reais.

🌟 POR QUE ESCOLHER NOSSO PRODUTO:

✅ Tecnologia de ponta
✅ Materiais premium
✅ Design inovador
✅ Resultados comprovados
✅ Suporte completo

🔥 ${cta.toUpperCase()} - Clique no link abaixo!

${hashtags ? hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#produto #oferta #qualidade #brasil'}

💬 Deixe seu comentário: O que você mais gostou neste produto?
👍 Curta se você quer ver mais ofertas como esta!
📤 Compartilhe com quem pode se interessar!
        `;
        break;

      case 'linkedin':
        post = `
🚀 ${product}: Transformando a Experiência do Cliente

${message}

${audience ? `Para ${audience.toLowerCase()}` : 'Para profissionais'} que buscam excelência, desenvolvemos uma solução que combina:

🎯 DIFERENCIAIS COMPETITIVOS:
• Tecnologia de ponta aplicada
• Processo de qualidade rigoroso
• Suporte especializado contínuo
• ROI comprovado em casos reais

🔗 ${cta} - Link nos comentários.

${hashtags ? hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).join(' ') : '#inovacao #tecnologia #negocios #transformacao #resultados'}

💭 Qual sua experiência com soluções similares? Compartilhe nos comentários.
        `;
        break;

      case 'twitter':
        post = `
🔥 ${product} 

${message} 🚀

${audience ? `Ideal para ${audience.toLowerCase()}` : 'Perfeito para você'} ✨

✅ Qualidade premium
✅ Entrega rápida  
✅ Garantia total

${cta} 👇
[link]

${hashtags ? hashtags.split(',').map(tag => `#${tag.trim().replace('#', '')}`).slice(0, 5).join(' ') : '#produto #qualidade #oferta'}
        `;
        break;
    }

    return {
      success: true,
      content: post.trim(),
      metadata: {
        type: 'social_media_post',
        platform,
        audience,
        characterCount: post.length,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Gerar e-mail marketing
  generateEmailMarketing: async (data) => {
    const {
      subject = 'Assunto do E-mail',
      product = 'Produto',
      audience = 'Clientes',
      goal = 'Aumentar Vendas',
      emailType = 'promotional',
      urgency = 'medium'
    } = data;

    await new Promise(resolve => setTimeout(resolve, 1000));

    let email = '';

    switch (emailType) {
      case 'promotional':
        email = `
**Assunto:** ${subject}

---

Olá [Nome],

${urgency === 'high' ? '⏰ **ÚLTIMAS HORAS!** ⏰' : ''}

${product} está com uma oferta imperdível e eu não poderia deixar de compartilhar com você!

## 🎯 Por que esta oferta é especial?

✅ **Desconto exclusivo de 50%** (apenas para nossa lista VIP)
✅ **Frete grátis** para todo o Brasil
✅ **Garantia estendida** de 12 meses
✅ **Suporte prioritário** 24/7

${audience === 'Clientes VIP' ? '🌟 **BÔNUS EXCLUSIVO PARA VIP:** E-book gratuito no valor de R$ 97!' : ''}

## 💰 Sua Economia:

~~De: R$ 297,00~~
**Por apenas: R$ 148,50**

**Você economiza: R$ 148,50!**

${urgency === 'high' ? 
`## ⚠️ ATENÇÃO: Oferta válida apenas até HOJE às 23h59!

Restam apenas **${Math.floor(Math.random() * 50) + 10} unidades** em estoque.` : 
`## 📅 Oferta válida por tempo limitado

Esta promoção especial termina em 72 horas.`}

**[🛒 GARANTIR MINHA OFERTA AGORA]**

Um abraço,
[Seu Nome]
        `;
        break;

      case 'welcome':
        email = `
**Assunto:** ${subject}

---

Olá [Nome],

Que alegria ter você conosco! 🎉

Seja muito bem-vindo(a) à nossa comunidade de ${audience.toLowerCase()} que, assim como você, buscam ${goal.toLowerCase()}.

## 🎁 Seu presente de boas-vindas:

✅ **E-book gratuito:** "Guia Completo para Iniciantes" (valor R$ 47)
✅ **Acesso ao grupo VIP** no Telegram
✅ **Desconto de 20%** na sua primeira compra
✅ **Consultoria gratuita** de 30 minutos

**[🎁 RESGATAR MEUS PRESENTES]**

Um abraço caloroso,
[Seu Nome]
        `;
        break;

      case 'abandoned-cart':
        email = `
**Assunto:** ${subject}

---

Olá [Nome],

Notei que você estava interessado(a) em ${product}, mas não finalizou sua compra.

## 🛒 Itens no seu carrinho:

**${product}**
- Quantidade: 1
- Valor: R$ 197,00

## 🎁 Oferta especial para você:

Para facilitar sua decisão, vou liberar um **desconto exclusivo de 15%**:

~~R$ 197,00~~
**R$ 167,45** (economia de R$ 29,55!)

**[🛒 FINALIZAR COMPRA COM DESCONTO]**

[Seu Nome]
        `;
        break;
    }

    return {
      success: true,
      content: email.trim(),
      metadata: {
        type: 'email_marketing',
        emailType,
        audience,
        goal,
        urgency,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Gerar copy para anúncios
  generateAdCopy: async (data) => {
    const {
      product = 'Produto',
      platform = 'google-ads',
      audience = 'Público geral',
      goal = 'Gerar Vendas',
      offer = 'Oferta especial',
      keywords = ''
    } = data;

    await new Promise(resolve => setTimeout(resolve, 900));

    let adCopy = {};

    switch (platform) {
      case 'google-ads':
        adCopy = {
          headlines: [
            `${product} - Oferta Especial`,
            `Compre ${product} com 50% OFF`,
            `${product} Que Você Procurava`,
            `Melhor ${product} do Mercado`,
            `${product} - Últimas Unidades`
          ],
          descriptions: [
            `Descubra ${product} com qualidade premium. ${offer} por tempo limitado. Entrega rápida e garantia total.`,
            `${audience ? `Para ${audience.toLowerCase()}, ` : ''}${product} é a escolha certa. Resultados garantidos ou seu dinheiro de volta.`
          ],
          extensions: [
            'Frete Grátis',
            'Garantia 12 Meses',
            'Suporte 24/7',
            'Desconto Especial'
          ],
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : [
            product.toLowerCase(),
            'comprar online',
            'oferta especial',
            'melhor preço'
          ]
        };
        break;

      case 'facebook-ads':
        adCopy = {
          primary_text: `🔥 ${product} COM DESCONTO ESPECIAL!

${audience ? `Atenção ${audience.toLowerCase()}! ` : ''}Esta é a oportunidade que você estava esperando.

✅ Qualidade premium garantida
✅ Entrega rápida para todo Brasil  
✅ Suporte especializado 24/7
✅ ${offer} por tempo limitado

${goal === 'Gerar Leads' ? 'Cadastre-se agora e receba mais informações!' : 'Clique e garante o seu antes que acabe!'}`,

          headline: `${product} - ${offer}`,
          description: `${product} com qualidade garantida. ${offer} válido por tempo limitado.`,
          cta: goal === 'Gerar Leads' ? 'Saiba Mais' : 'Comprar Agora'
        };
        break;
    }

    return {
      success: true,
      content: adCopy,
      metadata: {
        type: 'ad_copy',
        platform,
        audience,
        goal,
        generatedAt: new Date().toISOString()
      }
    };
  },

  // Gerar roteiro para vídeo
  generateVideoScript: async (data) => {
    const {
      topic = 'Tópico do Vídeo',
      platform = 'youtube',
      duration = '60',
      audience = 'Público geral',
      goal = 'Educar Audiência',
      videoType = 'educational'
    } = data;

    await new Promise(resolve => setTimeout(resolve, 1100));

    const durationSeconds = parseInt(duration);
    let script = '';

    if (durationSeconds <= 30) {
      script = `
# ROTEIRO PARA VÍDEO CURTO (${duration}s)
**Plataforma:** ${platform}
**Tópico:** ${topic}

## 🎬 ESTRUTURA DO VÍDEO

### GANCHO (0-3s) 🎯
**VISUAL:** Close no rosto, olhando diretamente para câmera
**TEXTO/FALA:** "Pare tudo! Se você ${audience ? `é ${audience.toLowerCase()} e ` : ''}quer ${goal.toLowerCase()}, precisa ver isso!"

### DESENVOLVIMENTO (3-${durationSeconds-5}s) 💡
**VISUAL:** Demonstração prática
**TEXTO/FALA:** "${topic} que vou te mostrar pode transformar seus resultados:

${videoType === 'educational' ? 
`✅ Passo 1: [Ação específica]
✅ Passo 2: [Resultado esperado]  
✅ Passo 3: [Dica extra]` :
`🔥 Benefício principal
⚡ Como aplicar hoje
💰 Resultado que você vai ter`}"

### CALL TO ACTION (${durationSeconds-5}s-${durationSeconds}s) 🚀
**VISUAL:** Volta para close no rosto
**TEXTO/FALA:** "Salva este vídeo e compartilha com quem precisa!"
      `;
    } else {
      script = `
# ROTEIRO PARA VÍDEO LONGO (${Math.floor(durationSeconds/60)}+ min)
**Plataforma:** ${platform}
**Tópico:** ${topic}

## 🎬 ESTRUTURA COMPLETA

### GANCHO INICIAL (0-30s) 🎯
**ROTEIRO:**
"Neste vídeo você vai descobrir ${topic.toLowerCase()} que podem transformar seus resultados.

Vou te mostrar:
- [Ponto 1 mais impactante]
- [Ponto 2 mais impactante]  
- [Ponto 3 mais impactante]"

### INTRODUÇÃO PESSOAL (30s-1min) 👋
**ROTEIRO:**
"Olá, eu sou [Nome] e neste canal eu ensino ${topic.toLowerCase()} para ${audience.toLowerCase()} que querem ${goal.toLowerCase()}."

### DESENVOLVIMENTO PRINCIPAL (1-${Math.floor(durationSeconds/60-2)}min) 📚
**Módulo 1: Fundamentos**
- Conceito principal
- Por que funciona
- Como aplicar

**Módulo 2: Estratégias Práticas**
- Passo a passo detalhado
- Ferramentas necessárias
- Resultados esperados

### ENCERRAMENTO (${Math.floor(durationSeconds/60-2)}-${Math.floor(durationSeconds/60)}min) 🚀
**ROTEIRO:**
"Se este vídeo te ajudou, se inscreve no canal e ativa o sininho!"
      `;
    }

    return {
      success: true,
      content: script.trim(),
      metadata: {
        type: 'video_script',
        platform,
        duration: durationSeconds,
        audience,
        goal,
        videoType,
        generatedAt: new Date().toISOString()
      }
    };
  }
};

module.exports = aiService;