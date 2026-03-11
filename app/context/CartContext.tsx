import { createContext, useContext, useState } from 'react';

// 1. Define what a cart item looks like
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// 2. Define what our context will contain
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  totalAmount: number;
};

// 3. Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 4. Create the Provider — wraps the app and shares the cart data
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart (or increase quantity if already exists)
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (id: string) => {
    setCartItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
    );
  };

  // Decrease quantity (remove if quantity reaches 0)
  const decreaseQuantity = (id: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity === 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 5. Custom hook to use the cart easily in any screen
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}