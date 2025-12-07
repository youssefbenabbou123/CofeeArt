// Cart management using localStorage
// This can be migrated to database later

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_STORAGE_KEY = 'coffee_arts_cart';

// Get all cart items
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

// Save cart items
function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('cart-update'));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

// Add item to cart
export function addToCart(product: { id: string; title: string; price: number; image: string }, quantity: number = 1) {
  const items = getCartItems();
  const existingItemIndex = items.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    // Update quantity if item already exists
    items[existingItemIndex].quantity += quantity;
  } else {
    // Add new item
    items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartItems(items);
  return items;
}

// Remove item from cart
export function removeFromCart(productId: string) {
  const items = getCartItems().filter(item => item.id !== productId);
  saveCartItems(items);
  return items;
}

// Update item quantity
export function updateCartItemQuantity(productId: string, quantity: number) {
  const items = getCartItems();
  const item = items.find(item => item.id === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCartItems(items);
  }
  
  return items;
}

// Clear cart
export function clearCart() {
  saveCartItems([]);
}

// Get cart total
export function getCartTotal(): number {
  return getCartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
export function getCartItemCount(): number {
  return getCartItems().reduce((count, item) => count + item.quantity, 0);
}



