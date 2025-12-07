// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Store token in localStorage
export function setAuthToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
}

// Get token from localStorage
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Remove token from localStorage
export function removeAuthToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
}

// Sign up
export async function signUp(name: string, email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    // Handle network errors
    if (!response.ok) {
      let errorMessage = 'Erreur lors de l\'inscription';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur serveur'}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Store token automatically after signup
    if (data.success && data.data?.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    // Handle network/fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - API URL:', API_BASE_URL);
      throw new Error('Impossible de se connecter au serveur. Vérifiez que le backend est accessible.');
    }
    // Re-throw other errors
    throw error;
  }
}

// Sign in
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle network errors
    if (!response.ok) {
      let errorMessage = 'Erreur lors de la connexion';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur serveur'}`;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Store token automatically after signin
    if (data.success && data.data?.token) {
      setAuthToken(data.data.token);
    }

    return data;
  } catch (error) {
    // Handle network/fetch errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - API URL:', API_BASE_URL);
      throw new Error('Impossible de se connecter au serveur. Vérifiez que le backend est accessible.');
    }
    // Re-throw other errors
    throw error;
  }
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      // Don't cache this request
      cache: 'no-store',
    });

    if (!response.ok) {
      // Only remove token if it's an auth error (401, 403)
      // Network errors shouldn't clear the token
      if (response.status === 401 || response.status === 403) {
        removeAuthToken();
      }
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching current user:', error);
    // Don't remove token on network errors - might just be backend down
    // Only remove if it's a clear auth error
    if (error instanceof Error && error.message.includes('401')) {
      removeAuthToken();
    }
    return null;
  }
}

// Sign out
export function signOut() {
  removeAuthToken();
  // Dispatch custom event to notify navigation
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('auth-change'));
    window.location.href = '/';
  }
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

