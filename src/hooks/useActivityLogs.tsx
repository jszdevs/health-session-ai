
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Temporary interface until Supabase types are updated
interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  description: string;
  metadata: any;
  created_at: string;
}

export const useActivityLogs = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for now - will be replaced with real Supabase queries once types are updated
  const mockLogs: ActivityLog[] = [
    {
      id: '1',
      user_id: user?.id || '',
      activity_type: 'session_created',
      description: 'Created new patient session',
      metadata: { patient_name: 'John Doe' },
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: user?.id || '',
      activity_type: 'file_uploaded',
      description: 'Uploaded medical file',
      metadata: { filename: 'test_results.pdf' },
      created_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const fetchLogs = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 500);
  };

  const logActivity = async (activity_type: string, description: string, metadata?: any) => {
    if (!user) return null;

    const newLog: ActivityLog = {
      id: Date.now().toString(),
      user_id: user.id,
      activity_type,
      description,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    };

    setLogs(prev => [newLog, ...prev]);
    return newLog;
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
