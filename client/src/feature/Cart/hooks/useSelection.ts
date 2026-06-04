import { useEffect, useState } from 'react';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import {
  getStoredSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../utils/cartSelectionStorage';

type CartItemId = CartItemResponse['cartItemId'];

export const useSelection = (cartItems: CartItemResponse[]) => {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<CartItemId[]>(
    () => getStoredSelectedCartItemIds() ?? [],
  );

  useEffect(() => {
    saveSelectedCartItemIds(selectedCartItemIds);
  }, [selectedCartItemIds]);

  const initializeSelection = (cartItems: CartItemResponse[]) => {
    const storedIds = getStoredSelectedCartItemIds();
    const cartItemIds = cartItems.map((item) => item.cartItemId);
    const cartItemIdSet = new Set(cartItemIds);

    if (storedIds === null) {
      setSelectedCartItemIds(cartItemIds);
      return;
    }

    setSelectedCartItemIds(() =>
      storedIds.filter((id) => cartItemIdSet.has(id)),
    );
  };

  const isAllSelected =
    cartItems.length > 0 &&
    cartItems.every((cartItem) =>
      selectedCartItemIds.includes(cartItem.cartItemId),
    );

  // 최초 상품 모두 선택
  const selectAllCartItems = (cartItems: CartItemResponse[]) => {
    setSelectedCartItemIds(cartItems.map((item) => item.cartItemId));
  };

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
    isAllSelected,
    selectAllCartItems,
    toggleCartItem,
    toggleAllCartItems,
    initializeSelection,
  };
};
