import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { 
    user, 
    session, 
    isAuthenticated, 
    authLoading,
    setUser, 
    setSession, 
    setAuthLoading 
  } = useStore();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting initial session:', error);
          toast.error('Erro ao verificar sessão');
        } else {
          setSession(session);
          console.log('Initial session loaded:', session ? 'authenticated' : 'not authenticated');
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setAuthLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'authenticated' : 'not authenticated');
        
        setSession(session);
        setAuthLoading(false);

        // Handle different auth events
        switch (event) {
          case 'SIGNED_IN':
            toast.success('Login realizado com sucesso!');
            break;
          case 'SIGNED_OUT':
            toast.success('Logout realizado com sucesso!');
            break;
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed successfully');
            break;
          case 'USER_UPDATED':
            console.log('User updated');
            break;
          case 'PASSWORD_RECOVERY':
            toast.success('Email de recuperação enviado!');
            break;
        }
      }
    );

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [setSession, setAuthLoading]);

  // Auth methods
  const signUp = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      if (data.user && !data.session) {
        toast.success('Verifique seu email para confirmar a conta!');
      }

      return { success: true, data };
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Erro ao criar conta');
      return { success: false, error };
    } finally {
      setAuthLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Erro ao fazer login');
      return { success: false, error };
    } finally {
      setAuthLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('Erro ao fazer logout');
      return { success: false, error };
    } finally {
      setAuthLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success('Email de recuperação enviado!');
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Erro ao enviar email de recuperação');
      return { success: false, error };
    } finally {
      setAuthLoading(false);
    }
  };

  const updatePassword = async (password: string) => {
    try {
      setAuthLoading(true);
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success('Senha atualizada com sucesso!');
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      toast.error('Erro ao atualizar senha');
      return { success: false, error };
    } finally {
      setAuthLoading(false);
    }
  };

  return {
    user,
    session,
    isAuthenticated,
    authLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
  };
};