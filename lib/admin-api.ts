// API configuration - use empty string for production to route through Next.js rewrites (bypasses CORS)
const API_BASE_URL = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002')  // Server-side: use direct URL
  : '';  // Client-side: use relative URL (goes through Next.js rewrites)

// Get auth token
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
}

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();

  // Don't make API calls without a token
  if (!token) {
    throw new Error('Non authentifié. Veuillez vous connecter.');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Try to parse error response
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'Erreur inconnue' };
      }

      // Handle authentication errors
      if (response.status === 401 || response.status === 403) {
        // Clear invalid token
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
          // Redirect to login if we're in the browser
          window.location.href = '/connexion?return=' + encodeURIComponent(window.location.pathname);
        }
        throw new Error(errorData.message || 'Session expirée. Veuillez vous reconnecter.');
      }

      // Handle other errors
      throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    // Re-throw if it's already our custom error
    if (error instanceof Error) {
      throw error;
    }
    // Handle network errors
    throw new Error('Erreur de connexion au serveur. Vérifiez votre connexion internet.');
  }
}

// ========== USERS ==========

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export async function fetchUsers(): Promise<User[]> {
  const data = await apiCall('/api/admin/users');
  return data.success ? data.data : [];
}

export async function updateUser(id: string, role: string): Promise<User> {
  const data = await apiCall(`/api/admin/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ role }),
  });
  return data.data;
}

export async function deleteUser(id: string): Promise<void> {
  await apiCall(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
}

// ========== PRODUCTS ==========

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  status?: string;
  created_at?: string;
}

export async function fetchAdminProducts(category?: string, status?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);

  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await apiCall(`/api/admin/products${query}`);
  return data.success ? data.data : [];
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const data = await apiCall('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
  return data.data;
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const data = await apiCall(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  });
  return data.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiCall(`/api/admin/products/${id}`, {
    method: 'DELETE',
  });
}

// ========== MESSAGES ==========

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export async function fetchMessages(read?: boolean, subject?: string): Promise<ContactMessage[]> {
  const params = new URLSearchParams();
  if (read !== undefined) params.append('read', read.toString());
  if (subject) params.append('subject', subject);

  const query = params.toString() ? `?${params.toString()}` : '';
  const data = await apiCall(`/api/admin/messages${query}`);
  return data.success ? data.data : [];
}

export async function updateMessage(id: string, read: boolean): Promise<ContactMessage> {
  const data = await apiCall(`/api/admin/messages/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ read }),
  });
  return data.data;
}

export async function deleteMessage(id: string): Promise<void> {
  await apiCall(`/api/admin/messages/${id}`, {
    method: 'DELETE',
  });
}

// ========== STATISTICS ==========

export interface Stats {
  users: number;
  products: number;
  messages: number;
  unreadMessages: number;
  salesData: Array<{ month: string; sales: number }>;
  categoryData: Array<{ name: string; value: number }>;
  registrationsData: Array<{ month: string; users: number }>;
}

export async function fetchStats(): Promise<Stats> {
  const data = await apiCall('/api/admin/stats');
  return data.data;
}

// ========== SETTINGS ==========

export interface SiteSettings {
  site_name?: string;
  site_description?: string;
  contact_email?: string;
  contact_phone?: string;
  instagram_url?: string;
  facebook_url?: string;
  twitter_url?: string;
}

export async function fetchSettings(): Promise<SiteSettings> {
  const data = await apiCall('/api/admin/settings');
  return data.data;
}

export async function updateSettings(settings: SiteSettings): Promise<SiteSettings> {
  const data = await apiCall('/api/admin/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
  return data.data;
}

