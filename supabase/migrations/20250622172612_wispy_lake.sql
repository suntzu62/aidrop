/*
  # Criação da tabela de produtos

  1. Nova Tabela
    - `products`
      - `id` (text, primary key) - ID único do produto
      - `title` (text) - Nome/título do produto
      - `price` (decimal) - Preço do produto
      - `stock` (integer) - Quantidade em estoque
      - `sold` (integer) - Quantidade vendida
      - `status` (text) - Status do produto (active, paused, closed)
      - `platform` (text) - Plataforma de venda
      - `category` (text) - Categoria do produto
      - `description` (text) - Descrição do produto
      - `images` (jsonb) - Array de URLs das imagens
      - `last_sync` (timestamptz) - Última sincronização
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `products`
    - Adicionar políticas para usuários autenticados
*/

CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  title text NOT NULL,
  price decimal(10,2) DEFAULT 0,
  stock integer DEFAULT 0,
  sold integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  platform text DEFAULT 'unknown',
  category text,
  description text,
  images jsonb DEFAULT '[]'::jsonb,
  last_sync timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_platform ON products(platform);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_updated_at ON products(updated_at);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for products table
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();