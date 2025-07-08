import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AdvancedDashboard from './pages/AdvancedDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContentStudio from './pages/ContentStudio';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductRegistrationPage from './pages/ProductRegistrationPage';
import PressReleasePage from './pages/PressReleasePage';
import BrandVoiceSettingsPage from './pages/BrandVoiceSettingsPage';
import ContentLibraryPage from './pages/ContentLibraryPage';
import Navigation from './components/Navigation';

function App() {
  // Initialize auth listener
  const { authLoading } = useAuth();

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products/register" element={<ProductRegistrationPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advanced" element={<AdvancedDashboard />} />
            <Route path="/generator" element={<ContentStudio />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/press-release" element={<PressReleasePage />} />
            <Route path="/brand-voice" element={<BrandVoiceSettingsPage />} />
            <Route path="/content-library" element={<ContentLibraryPage />} />
          </Routes>
        </motion.main>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;