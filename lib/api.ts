// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Array of image URLs
  features?: string[]; // Array of features/characteristics
  created_at?: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch products:', response.status, errorText);
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export interface ProductCategory {
  id: string;
  name: string;
  type?: 'ceramic' | 'goodies' | null;
  created_at?: string;
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/categories`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status);
      return [];
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
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
  created_at?: string;
  updated_at?: string;
}

export async function fetchBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function fetchBlog(identifier: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${identifier}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch blog');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// ========== ORDERS ==========

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
}

export interface GuestOrderData {
  items: OrderItem[];
  total: number;
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  shipping_address: string;
  shipping_city: string;
  shipping_postal_code: string;
  shipping_country?: string;
  create_payment_intent?: boolean;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    order_id: string;
    total: number;
    created_at: string;
    checkout?: {
      checkout_url: string;
      checkout_session_id: string;
    };
  };
}

export async function createOrder(orderData: GuestOrderData): Promise<OrderResponse['data']> {
  try {
    // Get auth token if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }

    const data: OrderResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// ========== SQUARE PAYMENTS ==========

export interface SquareConfigResponse {
  success: boolean;
  configured: boolean;
  hasAccessToken: boolean;
  hasApplicationId: boolean;
  environment?: string;
  applicationIdPrefix?: string | null;
}

export async function checkSquareConfig(): Promise<SquareConfigResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/square/check-config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check Square configuration');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking Square config:', error);
    return {
      success: false,
      configured: false,
      hasAccessToken: false,
      hasApplicationId: false,
    };
  }
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  status: string;
}

export async function createPayment(sourceId: string, amount: number, idempotencyKey: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/square/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sourceId,
        amount,
        currency: 'EUR',
        idempotencyKey,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create payment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}

export async function confirmPayment(orderId: string, paymentId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/square/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, paymentId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to confirm payment');
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}

// ========== WORKSHOPS ==========

export interface Workshop {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: number;
  price: number;
  image?: string;
  images?: string[]; // Array of image URLs
  status: string;
  session_count?: number;
  next_session_date?: string;
  created_at?: string;
}

export interface WorkshopSession {
  id: string;
  session_date: string;
  session_time: string;
  capacity: number;
  booked_count: number;
  available_spots: number;
  status: string;
}

export async function fetchWorkshops(filters?: { level?: string }): Promise<Workshop[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.level) params.append('level', filters.level);

    const response = await fetch(`${API_BASE_URL}/api/workshops?${params.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch workshops');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }
}

export async function fetchWorkshop(id: string): Promise<(Workshop & { sessions: WorkshopSession[] }) | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/workshops/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch workshop');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching workshop:', error);
    return null;
  }
}

export interface UserReservation {
  id: string;
  quantity: number;
  status: string;
  created_at: string;
  waitlist_position?: number;
  workshop_id: string;
  workshop_title: string;
  workshop_description?: string;
  level: string;
  duration: number;
  price: number;
  workshop_image?: string;
  session_id: string;
  session_date: string;
  session_time: string;
}

export async function fetchUserReservations(): Promise<UserReservation[]> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/api/workshops/reservations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        return [];
      }
      throw new Error('Failed to fetch reservations');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    return [];
  }
}

// ========== USER ORDERS ==========

export interface UserOrder {
  id: string;
  total: number;
  status: string;
  created_at: string;
  item_count: number;
}

export interface OrderDetail extends UserOrder {
  items: Array<{
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    title?: string;  // Product title from backend
    image?: string;  // Product image from backend
    product_title?: string;  // Alias for title
    product_image?: string;  // Alias for image
  }>;
  shipping_address?: string;
  shipping_city?: string;
  shipping_postal_code?: string;
  shipping_country?: string;
  payment_status?: string;
  payment_method?: string;
}

export async function fetchUserOrders(): Promise<UserOrder[]> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      return [];
    }

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 401) {
        return [];
      }
      throw new Error('Failed to fetch orders');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
}

export async function fetchOrderDetails(orderId: string): Promise<OrderDetail | null> {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    
    if (!token) {
      return null;
    }

    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch order details');
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}