// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
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
    payment_intent?: {
      client_secret: string;
      payment_intent_id: string;
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

// ========== STRIPE PAYMENTS ==========

export interface StripeConfigResponse {
  success: boolean;
  configured: boolean;
  hasSecretKey: boolean;
  keyPrefix?: string | null;
}

export async function checkStripeConfig(): Promise<StripeConfigResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stripe/check-config`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check Stripe configuration');
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking Stripe config:', error);
    return {
      success: false,
      configured: false,
      hasSecretKey: false,
    };
  }
}

export interface PaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  paymentIntentId: string;
}

export async function createPaymentIntent(amount: number): Promise<PaymentIntentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stripe/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'eur',
        metadata: {
          type: 'product_order'
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create payment intent');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function confirmPayment(orderId: string, paymentIntentId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stripe/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, paymentIntentId }),
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

export async function fetchWorkshop(id: string): Promise<{ workshop: Workshop; sessions: WorkshopSession[] } | null> {
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