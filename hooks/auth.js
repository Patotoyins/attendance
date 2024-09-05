import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Example hook for authentication (adjust logic based on your project)
export function useAuth() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated (adjust to your actual auth logic)
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      // Fetch user data and set it
      setUser({ name: 'John Doe' });
    }
  }, []);

  return { user, isAuthenticated: !!user };
}
