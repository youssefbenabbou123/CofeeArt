// Wishlist functionality using local storage

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
}

// Get wishlist items from local storage
export function getWishlistItems(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const items = localStorage.getItem('wishlist');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error reading wishlist:', error);
    return [];
  }
}

// Save wishlist items to local storage
function saveWishlistItems(items: WishlistItem[]) {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
    // Dispatch event for other components to listen
    window.dispatchEvent(new Event('wishlist-update'));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
}

// Add item to wishlist
export function addToWishlist(product: { id: string; title: string; price: number; image: string }) {
  const items = getWishlistItems();
  
  // Check if item already exists
  if (items.find(item => item.id === product.id)) {
    return items; // Already in wishlist
  }
  
  // Add new item
  items.push({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image
  });
  
  saveWishlistItems(items);
  return items;
}

// Remove item from wishlist
export function removeFromWishlist(productId: string) {
  const items = getWishlistItems().filter(item => item.id !== productId);
  saveWishlistItems(items);
  return items;
}

// Check if item is in wishlist
export function isInWishlist(productId: string): boolean {
  return getWishlistItems().some(item => item.id === productId);
}

// Clear wishlist
export function clearWishlist() {
  saveWishlistItems([]);
}


