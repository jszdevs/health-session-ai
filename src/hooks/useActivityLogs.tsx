
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/integrations/supabase/types';

type ActivityLog = Tables<'activity_logs'>;

export const useActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchLogs = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching activity logs:', error);
    } else {
      setLogs(data || []);
    }
    setLoading(false);
  };

  const logActivity = async (activity_type: string, description: string, metadata?: any) => {
    if (!user) return null;

    const { data, error } = await supabase
      .from('activity_logs')
      .insert([{
        user_id: user.id,
        activity_type,
        description,
        metadata: metadata || {}
      }])
      .select()
      .single();

    if (error) {
      console.error('Error logging activity:', error);
      throw error;
    }

    setLogs(prev => [data, ...prev]);
    return data;
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  return {
    logs,
    loading,
    logActivity,
    refetch: fetchLogs
  };
};
