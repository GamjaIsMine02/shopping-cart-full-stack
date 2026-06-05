import type { PropsWithChildren } from 'react';
import { useCart } from '../hooks/useCart';
import { CartContext } from '../context/CartContext';

export const CartProvider = ({ children }: PropsWithChildren) => {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};
