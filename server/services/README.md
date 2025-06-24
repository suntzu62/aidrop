# Serviços do Backend MLBoost

Este diretório contém todos os serviços do backend organizados por funcionalidade.

## 📁 Estrutura dos Serviços

### 🤖 aiService.js
**Geração de Conteúdo com IA**
- Descrições de produtos otimizadas para e-commerce
- Conteúdo para blog (introduções, artigos completos)
- Posts para redes sociais (Instagram, Facebook, LinkedIn, Twitter)
- E-mail marketing (promocional, boas-vindas, carrinho abandonado)
- Copy para anúncios (Google Ads, Facebook Ads)
- Roteiros para vídeos (YouTube, TikTok, Instagram)

### 📦 productService.js
**Gerenciamento de Produtos**
- CRUD completo de produtos
- Sincronização com plataformas de e-commerce
- Controle de estoque em tempo real
- Alertas de estoque baixo

### 🛒 orderService.js
**Processamento de Pedidos**
- Gerenciamento do ciclo de vida dos pedidos
- Atualizações de status automáticas
- Integração com sistemas de entrega
- Analytics de vendas

### 🚨 alertService.js
**Sistema de Alertas**
- Alertas de estoque baixo
- Notificações de novos pedidos
- Alertas personalizados
- Gerenciamento de leitura

### 🔄 webhookProcessor.js
**Processamento de Webhooks**
- Integração com n8n
- Processamento automático de dados
- Detecção inteligente de tipos de dados
- Distribuição para serviços apropriados

## 🔌 Integração com n8n

### Endpoint Principal
```
POST /api/generate-content
```

### Tipos de Conteúdo Suportados

#### 1. Descrição de Produto
```json
{
  "type": "product-description",
  "title": "Nome do Produto",
  "category": "Categoria",
  "price": "99.99",
  "features": "Característica 1, Característica 2",
  "keywords": "palavra1, palavra2",
  "platform": "Mercado Livre"
}
```

#### 2. Conteúdo para Blog
```json
{
  "type": "blog-content",
  "topic": "Tópico do Artigo",
  "audience": "Público-alvo",
  "tone": "Profissional",
  "contentType": "introduction",
  "wordCount": "500",
  "keywords": "seo, palavras-chave"
}
```

#### 3. Post para Redes Sociais
```json
{
  "type": "social-media-post",
  "product": "Nome do Produto",
  "message": "Mensagem principal",
  "audience": "Público-alvo",
  "platform": "instagram",
  "cta": "Compre Agora",
  "hashtags": "tag1, tag2, tag3"
}
```

#### 4. E-mail Marketing
```json
{
  "type": "email-marketing",
  "subject": "Assunto do E-mail",
  "product": "Nome do Produto",
  "audience": "Clientes VIP",
  "goal": "Aumentar Vendas",
  "emailType": "promotional",
  "urgency": "high"
}
```

#### 5. Copy para Anúncios
```json
{
  "type": "ad-copy",
  "product": "Nome do Produto",
  "platform": "google-ads",
  "audience": "Público-alvo",
  "goal": "Gerar Vendas",
  "offer": "50% OFF",
  "keywords": "palavra1, palavra2"
}
```

#### 6. Roteiro para Vídeo
```json
{
  "type": "video-script",
  "topic": "Tópico do Vídeo",
  "platform": "youtube",
  "duration": "300",
  "audience": "Empreendedores",
  "goal": "Educar Audiência",
  "videoType": "educational"
}
```

## 🔄 Fluxo de Trabalho com n8n

### 1. Configuração do Webhook no n8n
- Criar um nó "Webhook" como trigger
- Configurar para receber dados POST
- URL: `http://seu-backend:3001/api/generate-content`

### 2. Processamento dos Dados
- Nó "HTTP Request" para chamar o endpoint
- Método: POST
- Headers: `Content-Type: application/json`
- Body: Dados do webhook + tipo de conteúdo

### 3. Tratamento da Resposta
- A resposta inclui o conteúdo gerado
- Metadados sobre o tipo e qualidade do conteúdo
- Timestamp da geração

### 4. Ações Subsequentes
- Salvar no Supabase
- Enviar por e-mail
- Publicar em redes sociais
- Armazenar em CMS

## 📊 Monitoramento e Logs

Todos os serviços incluem logging detalhado:
- Requisições recebidas
- Tempo de processamento
- Erros e exceções
- Métricas de performance

## 🔒 Segurança

- Validação de entrada em todos os endpoints
- Sanitização de dados
- Rate limiting (recomendado)
- Logs de auditoria

## 🚀 Escalabilidade

Os serviços são projetados para:
- Processamento assíncrono
- Cache de resultados
- Balanceamento de carga
- Monitoramento de performance