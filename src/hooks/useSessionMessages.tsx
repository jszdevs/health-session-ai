
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/integrations/supabase/types';

type SessionMessage = Tables<'session_messages'>;

export const useSessionMessages = (sessionId?: string) => {
  const [messages, setMessages] = useState<SessionMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchMessages = async () => {
    if (!user || !sessionId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    const { data, error } = await supabase
      .from('session_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const createMessage = async (messageData: Omit<SessionMessage, 'id' | 'user_id' | 'created_at' | 'timestamp'>) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('session_messages')
      .insert([{
        ...messageData,
        user_id: user.id,
        timestamp: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating message:', error);
      throw error;
    }

    setMessages(prev => [...prev, data]);
    return data;
  };

  useEffect(() => {
    fetchMessages();
  }, [user, sessionId]);

  return {
    messages,
    loading,
    createMessage,
    refetch: fetchMessages
  };
};
