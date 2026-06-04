import { useState } from 'react';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';

// export type UseCartItemsReturn

export const useSelection = (cartItems: CartItemResponse[]) => {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<
    CartItemResponse['cartItemId'][]
  >([]);

  // 상품 하나 선택
  const toggleCartItem = (cartItemId: string) => {
    setSelectedCartItemIds((previousIds) => {
      const isIncluded = previousIds.includes(cartItemId);

      if (isIncluded) return previousIds.filter((id) => id !== cartItemId);

      return [...previousIds, cartItemId];
    });
  };

  // 상품 모두 선택
  const toggleAllCartItems = () => {
    const allCartItemIds = cartItems.map((cartItem) => cartItem.cartItemId);
    const isAllSelected = allCartItemIds.every((cartItemId) =>
      selectedCartItemIds.includes(cartItemId),
    );

    if (isAllSelected) {
      setSelectedCartItemIds([]);
      return;
    }

    setSelectedCartItemIds(allCartItemIds);
  };

  return {
    selectedCartItemIds,
    toggleCartItem,
    toggleAllCartItems,
  };
};
