// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app';

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

// ========== PRODUCT CATEGORIES ==========

export interface ProductCategory {
  id: string;
  name: string;
  created_at: string;
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  const data = await apiCall('/api/admin/categories');
  return data.success ? data.data : [];
}

export async function createProductCategory(name: string): Promise<ProductCategory> {
  const data = await apiCall('/api/admin/categories', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return data.data;
}

export async function deleteProductCategory(id: string): Promise<void> {
  await apiCall(`/api/admin/categories/${id}`, {
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
  images?: string[]; // Array of image URLs
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
  revenue: number;
  orders: number;
  workshops: number;
  blogs?: number;
  giftCards?: number;
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

// ========== BLOGS ==========

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  author?: string;
  category?: string;
  slug: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function fetchAdminBlogs(): Promise<Blog[]> {
  const data = await apiCall('/api/admin/blogs');
  return data.success ? data.data : [];
}

export async function fetchAdminBlog(id: string): Promise<Blog> {
  const data = await apiCall(`/api/admin/blogs/${id}`);
  return data.data;
}

export async function createBlog(blog: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> {
  const data = await apiCall('/api/admin/blogs', {
    method: 'POST',
    body: JSON.stringify(blog),
  });
  return data.data;
}

export async function updateBlog(id: string, blog: Partial<Blog>): Promise<Blog> {
  const data = await apiCall(`/api/admin/blogs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(blog),
  });
  return data.data;
}

export async function deleteBlog(id: string): Promise<void> {
  await apiCall(`/api/admin/blogs/${id}`, {
    method: 'DELETE',
  });
}

// ========== ORDERS ==========

export interface Order {
  id: string;
  user_id?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  total: number;
  status: string;
  payment_status?: string;
  payment_method?: string;
  shipping_address?: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  title: string;
  image?: string;
  quantity: number;
  price: number;
}

export async function fetchAdminOrders(filters?: {
  status?: string;
  payment_status?: string;
  start_date?: string;
  end_date?: string;
  search?: string;
}): Promise<Order[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.payment_status) params.append('payment_status', filters.payment_status);
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);
  if (filters?.search) params.append('search', filters.search);

  const data = await apiCall(`/api/admin/orders?${params.toString()}`);
  return data.success ? data.data : [];
}

export async function fetchAdminOrder(id: string): Promise<Order> {
  const data = await apiCall(`/api/admin/orders/${id}`);
  return data.data;
}

export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  const data = await apiCall(`/api/admin/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
  return data.data;
}

export async function processRefund(id: string, amount?: number, reason?: string): Promise<any> {
  const data = await apiCall(`/api/admin/orders/${id}/refund`, {
    method: 'PUT',
    body: JSON.stringify({ amount, reason }),
  });
  return data.data;
}

export async function downloadInvoice(id: string): Promise<Blob> {
  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}/invoice`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to download invoice');
  return response.blob();
}

export async function exportOrdersCSV(filters?: {
  start_date?: string;
  end_date?: string;
}): Promise<void> {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  const token = getAuthToken();
  const response = await fetch(`${API_BASE_URL}/api/admin/orders/export/csv?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to export orders');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `commandes-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

// ========== WORKSHOPS ==========

export interface Workshop {
  id: string;
  title: string;
  description?: string;
  level: string;
  duration: number;
  price: number;
  image?: string;
  status: string;
  capacity?: number;
  sessions?: WorkshopSession[];
}

export interface WorkshopSession {
  id: string;
  workshop_id: string;
  session_date: string;
  session_time: string;
  capacity: number;
  booked_count: number;
  status: string;
}

export interface Booking {
  id: string;
  workshop_id: string;
  session_id?: string;
  user_id?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  quantity: number;
  status: string;
  waitlist_position?: number;
  created_at: string;
  session_date?: string;
  session_time?: string;
}

export async function fetchAdminWorkshops(filters?: {
  status?: string;
  level?: string;
}): Promise<Workshop[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.level) params.append('level', filters.level);

  const data = await apiCall(`/api/admin/workshops?${params.toString()}`);
  return data.success ? data.data : [];
}

export async function fetchAdminWorkshop(id: string): Promise<Workshop> {
  const data = await apiCall(`/api/admin/workshops/${id}`);
  return data.data;
}

export async function createWorkshop(workshop: Omit<Workshop, 'id'>): Promise<Workshop> {
  const data = await apiCall('/api/admin/workshops', {
    method: 'POST',
    body: JSON.stringify(workshop),
  });
  return data.data;
}

export async function updateWorkshop(id: string, workshop: Partial<Workshop>): Promise<Workshop> {
  const data = await apiCall(`/api/admin/workshops/${id}`, {
    method: 'PUT',
    body: JSON.stringify(workshop),
  });
  return data.data;
}

export async function deleteWorkshop(id: string): Promise<void> {
  await apiCall(`/api/admin/workshops/${id}`, {
    method: 'DELETE',
  });
}

export async function createWorkshopSession(workshopId: string, session: {
  session_date: string;
  session_time: string;
  capacity: number;
}): Promise<WorkshopSession> {
  const data = await apiCall(`/api/admin/workshops/${workshopId}/sessions`, {
    method: 'POST',
    body: JSON.stringify(session),
  });
  return data.data;
}

export interface WorkshopReservation {
  id: string;
  workshop_id: string;
  session_id?: string;
  user_id?: string;
  quantity: number;
  status: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  created_at: string;
  cancelled_at?: string;
  cancellation_reason?: string;
  waitlist_position?: number;
  session_date?: string;
  session_time?: string;
  session_capacity?: number;
  booked_count?: number;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
}

export async function fetchWorkshopReservations(workshopId: string): Promise<WorkshopReservation[]> {
  const data = await apiCall(`/api/admin/workshops/${workshopId}/reservations`);
  return data.success ? data.data : [];
}

export async function fetchWorkshopBookings(workshopId: string, filters?: {
  session_id?: string;
  status?: string;
}): Promise<Booking[]> {
  const params = new URLSearchParams();
  if (filters?.session_id) params.append('session_id', filters.session_id);
  if (filters?.status) params.append('status', filters.status);

  const data = await apiCall(`/api/admin/workshops/${workshopId}/bookings?${params.toString()}`);
  return data.success ? data.data : [];
}

export async function createManualBooking(workshopId: string, booking: {
  session_id: string;
  user_id?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  quantity: number;
}): Promise<Booking> {
  const data = await apiCall(`/api/admin/workshops/${workshopId}/bookings`, {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return data.data;
}

export async function cancelBooking(bookingId: string, reason?: string, refund_amount?: number, send_email?: boolean): Promise<Booking> {
  const data = await apiCall(`/api/admin/workshops/bookings/${bookingId}/cancel`, {
    method: 'PUT',
    body: JSON.stringify({ reason, refund_amount, send_email }),
  });
  return data.data;
}

export async function fetchWorkshopCalendar(month?: number, year?: number): Promise<WorkshopSession[]> {
  const params = new URLSearchParams();
  if (month) params.append('month', month.toString());
  if (year) params.append('year', year.toString());

  const data = await apiCall(`/api/admin/workshops/calendar/view?${params.toString()}`);
  return data.success ? data.data : [];
}

// ========== CLIENTS ==========

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  total_orders: number;
  total_spent: number;
  last_order_date?: string;
  created_at: string;
  orders?: Order[];
  workshops?: Booking[];
}

export async function fetchAdminClients(filters?: {
  search?: string;
  sort?: string;
  order?: string;
}): Promise<Client[]> {
  const params = new URLSearchParams();
  if (filters?.search) params.append('search', filters.search);
  if (filters?.sort) params.append('sort', filters.sort);
  if (filters?.order) params.append('order', filters.order);

  const data = await apiCall(`/api/admin/clients?${params.toString()}`);
  return data.success ? data.data : [];
}

export async function fetchAdminClient(id: string): Promise<Client> {
  const data = await apiCall(`/api/admin/clients/${id}`);
  return data.data;
}

export async function fetchClientOrders(clientId: string): Promise<Order[]> {
  const data = await apiCall(`/api/admin/clients/${clientId}/orders`);
  return data.success ? data.data : [];
}

export async function fetchClientWorkshops(clientId: string): Promise<Booking[]> {
  const data = await apiCall(`/api/admin/clients/${clientId}/workshops`);
  return data.success ? data.data : [];
}

// ========== GIFT CARDS ==========

export interface GiftCard {
  id: string;
  code: string;
  amount: number;
  balance: number;
  expiry_date?: string;
  status: string;
  used?: boolean;
  category?: string;
  purchaser_id?: string;
  purchaser_email?: string;
  purchaser_name?: string;
  created_at: string;
  transactions?: GiftCardTransaction[];
}

export interface GiftCardTransaction {
  id: string;
  gift_card_id: string;
  order_id?: string;
  amount: number;
  transaction_type: string;
  notes?: string;
  created_at: string;
}

export async function fetchAdminGiftCards(filters?: {
  status?: string;
  search?: string;
}): Promise<GiftCard[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.search) params.append('search', filters.search);

  const data = await apiCall(`/api/admin/gift-cards?${params.toString()}`);
  return data.success ? data.data : [];
}

export async function fetchAdminGiftCard(id: string): Promise<GiftCard> {
  const data = await apiCall(`/api/admin/gift-cards/${id}`);
  return data.data;
}

export async function createGiftCard(giftCard: {
  amount: number;
  expiry_date?: string;
}): Promise<GiftCard> {
  const data = await apiCall('/api/admin/gift-cards', {
    method: 'POST',
    body: JSON.stringify(giftCard),
  });
  return data.data;
}

export async function updateGiftCard(id: string, giftCard: Partial<GiftCard>): Promise<GiftCard> {
  const data = await apiCall(`/api/admin/gift-cards/${id}`, {
    method: 'PUT',
    body: JSON.stringify(giftCard),
  });
  return data.data;
}

export async function deleteGiftCard(id: string): Promise<void> {
  await apiCall(`/api/admin/gift-cards/${id}`, {
    method: 'DELETE',
  });
}

export async function checkGiftCard(code: string): Promise<{ code: string; balance: number; expiry_date?: string }> {
  const data = await apiCall(`/api/admin/gift-cards/check/${code}`);
  return data.data;
}