import { projectId, publicAnonKey } from './supabase/info';

export const initializeData = async () => {
  try {
    const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-05a33f34/seed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (response.ok) {
      console.log('Sample data initialized successfully');
    } else {
      console.error('Failed to initialize sample data');
    }
  } catch (error) {
    console.error('Error initializing sample data:', error);
  }
};