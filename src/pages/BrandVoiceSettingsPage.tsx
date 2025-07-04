import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Mic,
  Save,
  Building,
  Users,
  MessageSquare,
  FileText,
  Palette,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Target,
  Globe,
  Heart,
  Zap
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface BrandVoiceData {
  companyName: string;
  companyDescription: string;
  targetAudience: string;
  toneOfVoice: string;
  customTone: string;
  textExamples: string;
  industry: string;
  values: string[];
  keywords: string;
}

const BrandVoiceSettingsPage = () => {
  const { user } = useStore();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [brandVoice, setBrandVoice] = useState<BrandVoiceData>({
    companyName: '',
    companyDescription: '',
    targetAudience: '',
    toneOfVoice: '',
    customTone: '',
    textExamples: '',
    industry: '',
    values: [],
    keywords: ''
  });

  const [errors, setErrors] = useState<Partial<BrandVoiceData>>({});

  useEffect(() => {
    loadBrandVoice();
  }, []);

  const loadBrandVoice = async () => {
    try {
      // Simular carregamento dos dados salvos
      const savedData = localStorage.getItem('brandVoice');
      if (savedData) {
        setBrandVoice(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Error loading brand voice:', error);
    }
  };

  const toneOptions = [
    { value: 'professional', label: 'Profissional', description: 'Formal, confiável e especializado' },
    { value: 'friendly', label: 'Amigável', description: 'Caloroso, acessível e próximo' },
    { value: 'casual', label: 'Casual', description: 'Descontraído, informal e conversacional' },
    { value: 'authoritative', label: 'Autoritativo', description: 'Confiante, especialista e decisivo' },
    { value: 'playful', label: 'Divertido', description: 'Criativo, energético e descontraído' },
    { value: 'inspirational', label: 'Inspirador', description: 'Motivacional, positivo e encorajador' },
    { value: 'luxury', label: 'Luxo', description: 'Sofisticado, exclusivo e premium' },
    { value: 'technical', label: 'Técnico', description: 'Preciso, detalhado e informativo' },
    { value: 'custom', label: 'Personalizado', description: 'Defina seu próprio tom de voz' }
  ];

  const industryOptions = [
    'Tecnologia',
    'E-commerce',
    'Saúde',
    'Educação',
    'Finanças',
    'Moda',
    'Alimentação',
    'Imobiliário',
    'Automotivo',
    'Beleza',
    'Esportes',
    'Entretenimento',
    'Consultoria',
    'Outros'
  ];

  const valueOptions = [
    'Inovação',
    'Qualidade',
    'Sustentabilidade',
    'Transparência',
    'Excelência',
    'Confiabilidade',
    'Agilidade',
    'Personalização',
    'Acessibilidade',
    'Responsabilidade Social'
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<BrandVoiceData> = {};

    if (!brandVoice.companyName.trim()) {
      newErrors.companyName = 'Nome da empresa é obrigatório';
    }

    if (!brandVoice.companyDescription.trim()) {
      newErrors.companyDescription = 'Descrição da empresa é obrigatória';
    }

    if (!brandVoice.targetAudience.trim()) {
      newErrors.targetAudience = 'Público-alvo é obrigatório';
    }

    if (!brandVoice.toneOfVoice) {
      newErrors.toneOfVoice = 'Tom de voz é obrigatório';
    }

    if (brandVoice.toneOfVoice === 'custom' && !brandVoice.customTone.trim()) {
      newErrors.customTone = 'Descrição do tom personalizado é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof BrandVoiceData, value: string | string[]) => {
    setBrandVoice(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    setSaved(false);
  };

  const handleValueToggle = (value: string) => {
    const currentValues = brandVoice.values;
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleInputChange('values', newValues);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setLoading(true);
    
    try {
      // Simular salvamento no backend
      localStorage.setItem('brandVoice', JSON.stringify(brandVoice));
      
      // Em uma implementação real, isso seria enviado para o backend:
      // await brandVoiceService.saveBrandVoice(brandVoice);
      
      setSaved(true);
      toast.success('Voz da marca salva com sucesso!');
    } catch (error) {
      console.error('Error saving brand voice:', error);
      toast.error('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const selectedTone = toneOptions.find(option => option.value === brandVoice.toneOfVoice);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/generator"
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Estúdio</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
              <Mic className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Voz da Marca
              </h1>
              <p className="text-lg text-gray-600">
                Configure a personalidade da sua marca para gerar conteúdo consistente
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <div className="p-8 space-y-8">
            {/* Company Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-purple-600" />
                Informações da Empresa
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome da Empresa *
                  </label>
                  <input
                    type="text"
                    value={brandVoice.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Ex: TechSolutions Brasil"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição da Empresa *
                  </label>
                  <textarea
                    rows={4}
                    value={brandVoice.companyDescription}
                    onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.companyDescription ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Descreva o que sua empresa faz, seus produtos/serviços principais e o que a diferencia no mercado..."
                  />
                  {errors.companyDescription && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyDescription}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Setor/Indústria
                  </label>
                  <select
                    value={brandVoice.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Selecione o setor</option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Público-Alvo
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição do Público-Alvo *
                </label>
                <textarea
                  rows={4}
                  value={brandVoice.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.targetAudience ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Descreva seu público-alvo: idade, interesses, dores, comportamentos, onde estão online..."
                />
                {errors.targetAudience && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.targetAudience}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Seja específico: "Empreendedores de 25-40 anos que buscam automatizar processos" é melhor que "empresários"
                </p>
              </div>
            </div>

            {/* Tone of Voice */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-purple-600" />
                Tom de Voz
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Como sua marca se comunica? *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {toneOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          brandVoice.toneOfVoice === option.value
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => handleInputChange('toneOfVoice', option.value)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{option.label}</h4>
                          {brandVoice.toneOfVoice === option.value && (
                            <CheckCircle className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    ))}
                  </div>
                  {errors.toneOfVoice && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.toneOfVoice}
                    </p>
                  )}
                </div>

                {brandVoice.toneOfVoice === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descreva seu tom personalizado *
                    </label>
                    <textarea
                      rows={3}
                      value={brandVoice.customTone}
                      onChange={(e) => handleInputChange('customTone', e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                        errors.customTone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Descreva como sua marca se comunica, que palavras usa, que estilo adota..."
                    />
                    {errors.customTone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.customTone}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Brand Values */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Heart className="w-5 h-5 mr-2 text-purple-600" />
                Valores da Marca
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Selecione os valores que representam sua marca
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {valueOptions.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleValueToggle(value)}
                      className={`p-3 text-sm rounded-lg border-2 transition-all ${
                        brandVoice.values.includes(value)
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 text-gray-700 hover:border-purple-300'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Text Examples */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Exemplos de Texto
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exemplos de como sua marca se comunica
                </label>
                <textarea
                  rows={6}
                  value={brandVoice.textExamples}
                  onChange={(e) => handleInputChange('textExamples', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Cole aqui exemplos de textos da sua marca: posts, e-mails, descrições de produtos, etc. Isso ajuda a IA a aprender seu estilo único..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Quanto mais exemplos você fornecer, melhor a IA entenderá o estilo da sua marca
                </p>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-600" />
                Palavras-chave
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palavras e termos importantes para sua marca
                </label>
                <input
                  type="text"
                  value={brandVoice.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="inovação, tecnologia, sustentabilidade, qualidade premium..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Separe as palavras por vírgula. Essas palavras serão priorizadas no conteúdo gerado
                </p>
              </div>
            </div>

            {/* Preview */}
            {selectedTone && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Preview da Voz da Marca
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-purple-800">Empresa:</span>
                    <span className="text-purple-700 ml-2">
                      {brandVoice.companyName || 'Sua Empresa'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-800">Tom:</span>
                    <span className="text-purple-700 ml-2">
                      {selectedTone.label} - {selectedTone.description}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-800">Público:</span>
                    <span className="text-purple-700 ml-2">
                      {brandVoice.targetAudience || 'Seu público-alvo'}
                    </span>
                  </div>
                  {brandVoice.values.length > 0 && (
                    <div>
                      <span className="font-medium text-purple-800">Valores:</span>
                      <span className="text-purple-700 ml-2">
                        {brandVoice.values.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {saved && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Salvo com sucesso</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 mr-2"
                  >
                    <Zap className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                {loading ? 'Salvando...' : 'Salvar Voz da Marca'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-start space-x-3">
            <Palette className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Como isso melhora seu conteúdo?
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li>• <strong>Consistência:</strong> Todo conteúdo gerado seguirá a voz da sua marca</li>
                <li>• <strong>Personalização:</strong> A IA entenderá seu estilo único de comunicação</li>
                <li>• <strong>Relevância:</strong> Conteúdo alinhado com seu público e valores</li>
                <li>• <strong>Eficiência:</strong> Menos edições necessárias no conteúdo gerado</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BrandVoiceSettingsPage;