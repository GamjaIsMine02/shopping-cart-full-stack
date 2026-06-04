import { useEffect } from 'react';
import { useCartItems } from './useCartItems';
import { useSelection } from './useSelection';

export const useCart = () => {
  const cartItemsState = useCartItems();
  const selectionState = useSelection(cartItemsState.cartItems);

  useEffect(() => {
    const initializeCart = async () => {
      const cartItems = await cartItemsState.loadCartItems();

      if (cartItems === null) return;

      selectionState.initializeSelection(cartItems);
    };

    initializeCart();
  }, []);

  return {
    ...cartItemsState,
    ...selectionState,
  };
};
