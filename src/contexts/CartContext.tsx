
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Car, CartItem } from '../types/car';
import { toast } from 'sonner';

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: string) => void;
  updateQuantity: (carId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (car: Car) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.car.id === car.id);
      if (existingItem) {
        toast.success(`${car.brand} ${car.model} quantity updated in cart`);
        return prevItems.map(item =>
          item.car.id === car.id
            ? { ...item, quantity: Math.min(item.quantity + 1, car.stock) }
            : item
        );
      } else {
        toast.success(`${car.brand} ${car.model} added to cart`);
        return [...prevItems, { car, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (carId: string) => {
    setCartItems(prevItems => {
      const carToRemove = prevItems.find(item => item.car.id === carId);
      if (carToRemove) {
        toast.info(`${carToRemove.car.brand} ${carToRemove.car.model} removed from cart`);
      }
      return prevItems.filter(item => item.car.id !== carId);
    });
  };

  const updateQuantity = (carId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.car.id === carId
          ? { ...item, quantity: Math.max(1, Math.min(quantity, item.car.stock)) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart has been cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.car.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
