import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, BarChart3, Sparkles, Menu, X, Zap, Package, Plus, Mic, BookOpen, User, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import AuthForm from './AuthForm';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated, signOut, user } = useAuth();
  
  const navItems = [
    { path: '/', label: 'Início', icon: ShoppingCart },
    { path: '/products', label: 'Produtos', icon: Package },
    { path: '/products/register', label: 'Cadastrar Produto', icon: Plus },
    { path: '/generator', label: 'Estúdio de Conteúdo', icon: Sparkles },
    { path: '/brand-voice', label: 'Voz da Marca', icon: Mic },
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/advanced', label: 'Avançado', icon: Zap },
    { path: '/content-library', label: 'Biblioteca', icon: BookOpen },
  ];

  const handleLogout = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Logout realizado com sucesso!');
    }
  };

  return (
    <nav className="backdrop-blur-md border-b sticky top-0 z-50" style={{
      backgroundColor: 'rgb(var(--color-background-secondary) / 0.8)',
      borderColor: 'rgb(var(--color-border))'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-accent-500 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">MLBoost</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="mr-4">
                  <ThemeToggle />
                </div>
                <div className="mr-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user?.user_metadata?.name || user?.email?.split('@')[0]}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sair
                </button>
              </div>
            ) : (
              <>
                <ThemeToggle />
                <button 
                  onClick={() => setShowAuthModal(true)} 
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Entrar / Cadastrar
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated ? (
              <div className="w-full mt-4 space-y-2">
                <div className="p-3 bg-gray-50 rounded-md flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.user_metadata?.name || user?.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da conta
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setShowAuthModal(true);
                  setIsOpen(false);
                }} 
                className="w-full mt-4 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Entrar / Cadastrar
              </button>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthForm 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </nav>
  );
};

export default Navigation;