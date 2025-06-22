import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
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
      
      if (isAuthenticated && user) {
        // Check user metadata for onboarding status
        const metadata = user.user_metadata || {};
        const onboardingComplete = metadata.onboarding_complete || false;
        const usesRemaining = metadata.free_uses_remaining ?? 1;
        
        setIsOnboardingComplete(onboardingComplete);
        setFreeUsesRemaining(usesRemaining);
      } else {
        // Check localStorage for anonymous users
        const localOnboarding = localStorage.getItem('onboarding_complete');
        const localUses = localStorage.getItem('free_uses_remaining');
        
        setIsOnboardingComplete(localOnboarding === 'true');
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
        localStorage.setItem('free_uses_remaining', newUsesRemaining.toString());
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
      
      // Submit to n8n webhook
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/lead-signup';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          timestamp: new Date().toISOString(),
          source: 'description_generator'
        })
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }

      // Mark onboarding as complete
      setIsOnboardingComplete(true);
      
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
        // Update localStorage for anonymous users
        localStorage.setItem('onboarding_complete', 'true');
        localStorage.setItem('onboarding_data', JSON.stringify(data));
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
      } else {
        localStorage.removeItem('onboarding_complete');
        localStorage.removeItem('onboarding_data');
        localStorage.setItem('free_uses_remaining', '1');
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