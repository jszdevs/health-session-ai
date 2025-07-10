
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/integrations/supabase/types';

type Session = Tables<'sessions'>;

export const useSessions = (patientId?: string) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSessions = async () => {
    if (!user || !patientId) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching sessions:', error);
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  };

  const createSession = async (sessionData: Omit<Session, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('sessions')
      .insert([{ ...sessionData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      console.error('Error creating session:', error);
      throw error;
    }

    setSessions(prev => [data, ...prev]);
    return data;
  };

  const updateSession = async (id: string, updates: Partial<Session>) => {
    const { data, error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating session:', error);
      throw error;
    }

    setSessions(prev => prev.map(s => s.id === id ? data : s));
    return data;
  };

  useEffect(() => {
    fetchSessions();
  }, [user, patientId]);

  return {
    sessions,
    loading,
    createSession,
    updateSession,
    refetch: fetchSessions
  };
};
