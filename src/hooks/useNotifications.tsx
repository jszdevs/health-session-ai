
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Temporary interface until Supabase types are updated
interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  action_url?: string;
  created_at: string;
  updated_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Mock data for now - will be replaced with real Supabase queries once types are updated
  const mockNotifications: Notification[] = [
    {
      id: '1',
      user_id: user?.id || '',
      title: 'New Patient Added',
      message: 'Patient John Doe has been added to your dashboard',
      type: 'info',
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      user_id: user?.id || '',
      title: 'Session Completed',
      message: 'Session with Jane Smith has been completed',
      type: 'success',
      is_read: true,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  const fetchNotifications = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  };

  const markAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const createNotification = async (notificationData: Omit<Notification, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setNotifications(prev => [newNotification, ...prev]);
    return newNotification;
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  return {
    notifications,
    loading,
    markAsRead,
    createNotification,
    unreadCount,
    refetch: fetchNotifications
  };
};
