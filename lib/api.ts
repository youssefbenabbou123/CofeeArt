// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

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
      throw new Error('Failed to fetch products');
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
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: {
    order_id: string;
    total: number;
    created_at: string;
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