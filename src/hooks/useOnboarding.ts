import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import { onboardingService } from '../services/api';
import toast from 'react-hot-toast';

interface OnboardingData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export const useOnboarding = () => {
  const { user, isAuthenticated } = useStore();
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(1);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, [user, isAuthenticated]);

  const checkOnboardingStatus = async () => {
    try {
      setLoading(true);
      
      // Check localStorage first for immediate response
      const localOnboarding = localStorage.getItem('onboardingComplete');
      const localUses = localStorage.getItem('freeUsesRemaining');
      
      if (localOnboarding === 'true') {
        setIsOnboardingComplete(true);
        setFreeUsesRemaining(0); // Unlimited after onboarding
        setLoading(false);
        return;
      }
      
      if (isAuthenticated && user) {
        // Check user metadata for onboarding status
        const metadata = user.user_metadata || {};
        const onboardingComplete = metadata.onboarding_complete || false;
        const usesRemaining = metadata.free_uses_remaining ?? 1;
        
        setIsOnboardingComplete(onboardingComplete);
        setFreeUsesRemaining(usesRemaining);
        
        // Sync with localStorage
        if (onboardingComplete) {
          localStorage.setItem('onboardingComplete', 'true');
        }
      } else {
        // Use localStorage for anonymous users
        setIsOnboardingComplete(false);
        setFreeUsesRemaining(localUses ? parseInt(localUses) : 1);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Fallback to default values
      setIsOnboardingComplete(false);
      setFreeUsesRemaining(1);
    } finally {
      setLoading(false);
    }
  };

  const consumeFreeUse = async () => {
    try {
      const newUsesRemaining = Math.max(0, freeUsesRemaining - 1);
      setFreeUsesRemaining(newUsesRemaining);

      if (isAuthenticated && user) {
        // Update user metadata
        const { error } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            free_uses_remaining: newUsesRemaining
          }
        });
        
        if (error) {
          console.error('Error updating user metadata:', error);
        }
      } else {
        // Update localStorage for anonymous users
        localStorage.setItem('freeUsesRemaining', newUsesRemaining.toString());
      }

      return newUsesRemaining;
    } catch (error) {
      console.error('Error consuming free use:', error);
      return freeUsesRemaining;
    }
  };

  const completeOnboarding = async (data: OnboardingData) => {
    try {
      setLoading(true);
      
      // Submit to n8n webhook using the service
      await onboardingService.submitOnboarding(data);

      // Mark onboarding as complete
      setIsOnboardingComplete(true);
      localStorage.setItem('onboardingComplete', 'true');
      
      if (isAuthenticated && user) {
        // Update user metadata
        const { error } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            onboarding_complete: true,
            onboarding_data: data,
            onboarding_date: new Date().toISOString()
          }
        });
        
        if (error) {
          console.error('Error updating user metadata:', error);
          throw error;
        }
      } else {
        // Store onboarding data in localStorage for anonymous users
        localStorage.setItem('onboardingData', JSON.stringify(data));
      }

      toast.success('Cadastro realizado com sucesso! Agora você tem acesso completo.');
      return true;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      toast.error('Erro ao processar cadastro. Tente novamente.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetOnboarding = async () => {
    try {
      setIsOnboardingComplete(false);
      setFreeUsesRemaining(1);
      
      // Clear localStorage
      localStorage.removeItem('onboardingComplete');
      localStorage.removeItem('onboardingData');
      localStorage.setItem('freeUsesRemaining', '1');
      
      if (isAuthenticated && user) {
        const { error } = await supabase.auth.updateUser({
          data: {
            ...user.user_metadata,
            onboarding_complete: false,
            free_uses_remaining: 1
          }
        });
        
        if (error) {
          console.error('Error resetting onboarding:', error);
        }
      }
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  return {
    freeUsesRemaining,
    isOnboardingComplete,
    loading,
    consumeFreeUse,
    completeOnboarding,
    resetOnboarding,
    checkOnboardingStatus
  };
};