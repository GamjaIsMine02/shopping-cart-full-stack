import { useEffect } from 'react';
import { useCartItems } from './useCartItems';
import { useSelection } from './useSelection';

export const useCart = () => {
  const cartItemsState = useCartItems();
  const selectionState = useSelection(cartItemsState.cartItems);
  const { loadCartItems } = cartItemsState;
  const { initializeSelection } = selectionState;

  useEffect(() => {
    const initializeCart = async () => {
      const cartItems = await loadCartItems();

      if (cartItems === null) return;

      initializeSelection(cartItems);
    };

    initializeCart();
  }, [loadCartItems, initializeSelection]);

  return {
    ...cartItemsState,
    ...selectionState,
  };
};
