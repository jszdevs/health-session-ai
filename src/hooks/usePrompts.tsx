
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/integrations/supabase/types';

type Prompt = Tables<'prompts'>;

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPrompts = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching prompts:', error);
    } else {
      setPrompts(data || []);
    }
    setLoading(false);
  };

  const createPrompt = async (promptData: Omit<Prompt, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('prompts')
      .insert([{ ...promptData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating prompt:', error);
      throw error;
    }

    setPrompts(prev => [data, ...prev]);
    return data;
  };

  const updatePrompt = async (id: string, updates: Partial<Prompt>) => {
    const { data, error } = await supabase
      .from('prompts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating prompt:', error);
      throw error;
    }

    setPrompts(prev => prev.map(p => p.id === id ? data : p));
    return data;
  };

  const deletePrompt = async (id: string) => {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting prompt:', error);
      throw error;
    }

    setPrompts(prev => prev.filter(p => p.id !== id));
  };

  useEffect(() => {
    fetchPrompts();
  }, [user]);

  return {
    prompts,
    loading,
    createPrompt,
    updatePrompt,
    deletePrompt,
    refetch: fetchPrompts
  };
};
