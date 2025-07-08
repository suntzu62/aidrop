/*
  # Criação da tabela de conteúdo gerado

  1. Nova Tabela
    - `generated_content`
      - `id` (uuid, primary key) - ID único do conteúdo
      - `user_id` (uuid) - ID do usuário que gerou o conteúdo
      - `content_type` (text) - Tipo do conteúdo
      - `title` (text) - Título do conteúdo
      - `content` (text) - Conteúdo gerado
      - `metadata` (jsonb) - Metadados adicionais
      - `created_at` (timestamptz) - Data de criação
      - `updated_at` (timestamptz) - Data de atualização

  2. Segurança
    - Habilitar RLS na tabela `generated_content`
    - Adicionar políticas para usuários autenticados acessarem apenas seu próprio conteúdo
*/

CREATE TABLE IF NOT EXISTS generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Users can read own content"
  ON generated_content
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content"
  ON generated_content
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
  ON generated_content
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
  ON generated_content
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_content_user_id ON generated_content(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_content_type ON generated_content(content_type);
CREATE INDEX IF NOT EXISTS idx_generated_content_created_at ON generated_content(created_at);

-- Create trigger for generated_content table
CREATE TRIGGER update_generated_content_updated_at
  BEFORE UPDATE ON generated_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();