import { createContext, useContext } from 'react';
import { useCart } from '../hooks/useCart';

type CartContextValue = ReturnType<typeof useCart>;

export const CartContext = createContext<CartContextValue | null>(null);

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext는 CartProvider안에서 사용해야 합니다.');
  }

  return context;
};
