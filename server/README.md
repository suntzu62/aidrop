# MLBoost Backend Server

Backend integrado com Supabase para processamento de webhooks do n8n e gerenciamento de dados em tempo real.

## 🚀 Configuração

### 1. Instalar Dependências
```bash
cd server
npm install
```

### 2. Configurar Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do Supabase:
```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Configurar Banco de Dados
Execute as migrações no Supabase:
1. Acesse o painel do Supabase
2. Vá para SQL Editor
3. Execute os arquivos de migração na ordem:
   - `create_products_table.sql`
   - `create_orders_table.sql`
   - `create_alerts_table.sql`

### 4. Iniciar Servidor
```bash
npm start
```

## 📡 Endpoints da API

### Produtos
- `GET /api/products` - Listar todos os produtos
- `GET /api/products/:id` - Buscar produto por ID
- `PUT /api/products/:id` - Atualizar produto
- `GET /api/products/low-stock/:threshold?` - Produtos com estoque baixo

### Pedidos
- `GET /api/orders` - Listar pedidos
- `GET /api/orders/status/:status` - Pedidos por status
- `PUT /api/orders/:id/status` - Atualizar status do pedido

### Analytics
- `GET /api/analytics/revenue` - Dados de receita
- `GET /api/analytics/kpis` - Métricas principais

### Alertas
- `GET /api/alerts` - Listar alertas
- `PUT /api/alerts/:id/read` - Marcar alerta como lido

### Webhook
- `POST /webhook/n8n` - Endpoint principal para n8n
- `POST /api/test/webhook` - Endpoint de teste

## 🔄 Processamento de Webhooks

O sistema processa automaticamente diferentes tipos de dados:

### Produtos
```json
{
  "type": "product",
  "id": "PROD123",
  "title": "Produto Exemplo",
  "price": 99.90,
  "stock": 50,
  "platform": "Mercado Livre"
}
```

### Pedidos
```json
{
  "type": "order",
  "id": "ORD123",
  "product_id": "PROD123",
  "buyer_name": "João Silva",
  "amount": 99.90,
  "platform": "Mercado Livre"
}
```

### Atualizações de Estoque
```json
{
  "type": "stock_update",
  "product_id": "PROD123",
  "stock": 45
}
```

## 🔧 Funcionalidades

### ✅ Processamento Automático
- Detecção automática do tipo de dados
- Validação e sanitização
- Tratamento de erros robusto

### ✅ Alertas Inteligentes
- Estoque baixo
- Novos pedidos
- Atualizações de produtos
- Alertas personalizados

### ✅ WebSocket em Tempo Real
- Atualizações instantâneas
- Broadcast para múltiplos clientes
- Heartbeat e reconexão

### ✅ Analytics
- KPIs calculados automaticamente
- Dados de receita
- Métricas de performance

## 🧪 Testando

### Health Check
```bash
curl http://localhost:3001/health
```

### Teste de Webhook
```bash
curl -X POST http://localhost:3001/api/test/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "product",
    "title": "Produto Teste",
    "price": 50.00,
    "stock": 100
  }'
```

## 📊 Monitoramento

O servidor fornece logs detalhados para:
- Conexões WebSocket
- Processamento de webhooks
- Operações do banco de dados
- Erros e exceções

## 🔒 Segurança

- RLS (Row Level Security) habilitado
- Validação de dados de entrada
- Rate limiting (recomendado para produção)
- CORS configurado
- Sanitização de dados

## 🚀 Deploy

Para produção, configure:
1. Variáveis de ambiente de produção
2. SSL/HTTPS
3. Rate limiting
4. Monitoramento
5. Backup do banco de dados