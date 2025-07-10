
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

// Temporary interface until Supabase types are updated
interface UserProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  specialty?: string;
  organization?: string;
  avatar_url?: string;
  preferences: any;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    // Mock data for now - will be replaced with real Supabase queries once types are updated
    const mockProfile: UserProfile = {
      id: '1',
      user_id: user.id,
      first_name: 'Dr. John',
      last_name: 'Doe',
      email: user.email || '',
      phone: '+1 (555) 123-4567',
      specialty: 'Internal Medicine',
      organization: 'General Hospital',
      preferences: {
        theme: 'light',
        notifications: true,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setTimeout(() => {
      setProfile(mockProfile);
      setLoading(false);
    }, 500);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return null;

    const updatedProfile = {
      ...profile,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    setProfile(updatedProfile);
    return updatedProfile;
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};
