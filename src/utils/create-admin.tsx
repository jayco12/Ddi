/**
 * Admin Account Creation Utility
 * 
 * To create your first admin account, use this function by:
 * 1. Opening your browser's developer console on the admin login page
 * 2. Call: createAdminAccount('admin@ddi.org', 'your-secure-password', 'Admin Name')
 * 3. Then you can log in with those credentials
 */

import { projectId, publicAnonKey } from './supabase/info';

export async function createAdminAccount(email: string, password: string, name: string) {
  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-c6a73d4f`;
  
  try {
    const response = await fetch(`${serverUrl}/auth/signup`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, name })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Admin account created successfully!');
      console.log('Email:', email);
      console.log('You can now log in with your credentials');
      return data;
    } else {
      console.error('Error creating admin account:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Make it available globally for console use
if (typeof window !== 'undefined') {
  (window as any).createAdminAccount = createAdminAccount;
}
