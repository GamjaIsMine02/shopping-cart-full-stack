import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import type { CartOrderSummary } from '../types/orderSummary.types';

export const calculateCartOrderSummary = (
  cartItems: CartItemResponse[],
  selectedCartItemIds: string[],
): CartOrderSummary => {
  const selectedCartItems = cartItems.filter((cartItem) =>
    selectedCartItemIds.includes(cartItem.cartItemId),
  );

  const productKindCount = selectedCartItems.length;

  const totalProductCount = selectedCartItems.reduce(
    (totalCount, cartItem) => totalCount + cartItem.purchaseQuantity,
    0,
  );

  const orderPrice = selectedCartItems.reduce(
    (totalPrice, cartItem) =>
      totalPrice + cartItem.productPrice * cartItem.purchaseQuantity,
    0,
  );

  const deliveryPrice = orderPrice >= 100000 || orderPrice <= 0 ? 0 : 3000;
  const totalPrice = orderPrice + deliveryPrice;

  return {
    productKindCount,
    totalProductCount,
    orderPrice,
    deliveryPrice,
    totalPrice,
  };
};
