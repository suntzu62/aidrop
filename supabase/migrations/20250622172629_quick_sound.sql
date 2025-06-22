/*
  # Criação da tabela de alertas

  1. Nova Tabela
    - `alerts`
      - `id` (text, primary key) - ID único do alerta
      - `type` (text) - Tipo do alerta
      - `title` (text) - Título do alerta
      - `message` (text) - Mensagem do alerta
      - `severity` (text) - Severidade (low, medium, high)
      - `source` (text) - Origem do alerta
      - `metadata` (jsonb) - Dados adicionais
      - `read` (boolean) - Se foi lido
      - `created_at` (timestamptz) - Data de criação

  2. Segurança
    - Habilitar RLS na tabela `alerts`
    - Adicionar políticas para usuários autenticados
*/

CREATE TABLE IF NOT EXISTS alerts (
  id text PRIMARY KEY,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  severity text DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
  source text DEFAULT 'system',
  metadata jsonb DEFAULT '{}'::jsonb,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert alerts"
  ON alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update alerts"
  ON alerts
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_alerts_type ON alerts(type);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_read ON alerts(read);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_source ON alerts(source);