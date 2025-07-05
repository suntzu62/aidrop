import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  UserPlus,
  LogIn,
  AlertCircle,
  CheckCircle,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  isOpen, 
  onClose, 
  defaultMode = 'login',
  onSuccess 
}) => {
  const { signIn, signUp, authLoading } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(defaultMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    // Name validation for signup
    if (!isLoginMode && !formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    // Confirm password validation for signup
    if (!isLoginMode) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      let result;
      
      if (isLoginMode) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password);
      }

      if (result.success) {
        toast.success(isLoginMode ? 'Login realizado com sucesso!' : 'Conta criada com sucesso!');
        onSuccess?.();
        onClose();
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: ''
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Erro na autenticação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-accent-500 px-8 py-6 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                {isLoginMode ? (
                  <LogIn className="w-5 h-5" />
                ) : (
                  <UserPlus className="w-5 h-5" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isLoginMode ? 'Entrar na Conta' : 'Criar Conta'}
                </h2>
                <p className="text-white/80 text-sm">
                  {isLoginMode 
                    ? 'Acesse sua conta para continuar' 
                    : 'Junte-se a milhares de usuários'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name field for signup */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Seu nome completo"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Sua senha"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password field for signup */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Confirme sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-accent-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting || authLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 mr-2"
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <ArrowRight className="w-5 h-5 mr-2" />
              )}
              {isSubmitting || authLoading 
                ? 'Processando...' 
                : isLoginMode 
                  ? 'Entrar' 
                  : 'Criar Conta'
              }
            </button>

            {/* Mode Toggle */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 mb-3">
                {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                {isLoginMode ? 'Criar nova conta' : 'Fazer login'}
              </button>
            </div>

            {/* Terms for signup */}
            {!isLoginMode && (
              <p className="text-xs text-gray-500 text-center">
                Ao criar uma conta, você concorda com nossos{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-primary-600 hover:text-primary-700">
                  Política de Privacidade
                </a>
                .
              </p>
            )}
          </form>

          {/* Benefits Section for Signup */}
          {!isLoginMode && (
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 px-8 py-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                O que você ganha:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  Acesso ilimitado a todas as ferramentas
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  Geração de conteúdo sem limites
                </li>
                <li className="flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-primary-500" />
                  Suporte prioritário
                </li>
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthForm;