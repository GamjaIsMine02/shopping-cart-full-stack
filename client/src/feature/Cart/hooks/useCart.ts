import { useEffect } from 'react';
import { useCartItems } from './useCartItems';
import { useSelection } from './useSelection';

export const useCart = () => {
  const cartItemsState = useCartItems();
  const selectionState = useSelection(cartItemsState.cartItems);
  const { initializeSelection } = selectionState;

  useEffect(() => {
    const initializeCart = async () => {
      initializeSelection(cartItemsState.cartItems);
    };

    initializeCart();
  }, [initializeSelection]);

  return {
    ...cartItemsState,
    ...selectionState,
  };
};
