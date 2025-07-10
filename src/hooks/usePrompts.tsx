
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Temporary interface until Supabase types are updated
interface Prompt {
  id: string;
  user_id: string;
  name: string;
  description: string;
  prompt_text: string;
  category: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for now - will be replaced with real Supabase queries once types are updated
  const mockPrompts: Prompt[] = [
    {
      id: '1',
      user_id: user?.id || '',
      name: 'Clinical Assessment',
      description: 'Structured clinical assessment prompt',
      prompt_text: 'Please provide a comprehensive clinical assessment including chief complaint, history of present illness, and recommended next steps.',
      category: 'clinical',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: user?.id || '',
      name: 'Differential Diagnosis',
      description: 'Generate differential diagnosis list',
      prompt_text: 'Based on the patient presentation, provide a ranked list of differential diagnoses with supporting evidence.',
      category: 'diagnosis',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const fetchPrompts = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrompts(mockPrompts);
      setLoading(false);
    }, 500);
  };

  const createPrompt = async (promptData: Omit<Prompt, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const newPrompt: Prompt = {
      ...promptData,
      id: Date.now().toString(),
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setPrompts(prev => [newPrompt, ...prev]);
    return newPrompt;
  };

  const updatePrompt = async (id: string, updates: Partial<Prompt>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p));
  };

  const deletePrompt = async (id: string) => {
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
