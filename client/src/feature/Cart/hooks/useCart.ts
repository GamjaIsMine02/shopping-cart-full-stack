import { useCartItems } from './useCartItems';
import { useSelection } from './useSelection';

export const useCart = () => {
  const cartItemsState = useCartItems();
  const selectionState = useSelection(cartItemsState.cartItems);

  return {
    ...cartItemsState,
    ...selectionState,
  };
};
