/*
  # Criação da tabela de pedidos

  1. Nova Tabela
    - `orders`
      - `id` (text, primary key) - ID único do pedido
      - `product_id` (text) - Referência ao produto
      - `buyer_name` (text) - Nome do comprador
      - `buyer_email` (text) - Email do comprador
      - `amount` (decimal) - Valor do pedido
      - `quantity` (integer) - Quantidade comprada
      - `status` (text) - Status do pedido
      - `platform` (text) - Plataforma de venda
      - `tracking_code` (text) - Código de rastreamento
      - `payment_method` (text) - Método de pagamento
      - `shipping_address` (jsonb) - Endereço de entrega
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `orders`
    - Adicionar políticas para usuários autenticados
*/

CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  product_id text REFERENCES products(id),
  buyer_name text NOT NULL,
  buyer_email text,
  amount decimal(10,2) DEFAULT 0,
  quantity integer DEFAULT 1,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  platform text DEFAULT 'unknown',
  tracking_code text,
  payment_method text,
  shipping_address jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert orders"
  ON orders
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_product_id ON orders(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_platform ON orders(platform);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON orders(buyer_email);

-- Create trigger for orders table
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();