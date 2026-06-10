import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import {
  getStoredSelectedCartItemIds,
  saveSelectedCartItemIds,
} from '../utils/cartSelectionStorage';

type CartItemId = CartItemResponse['cartItemId'];

export const useSelection = (cartItems: CartItemResponse[]) => {
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<CartItemId[]>(
    [],
  );
  const [isSelectionInitialized, setIsSelectionInitialized] = useState(false);

  const validSelectedCartItemIds = useMemo(() => {
    const cartItemIdSet = new Set(cartItems.map((item) => item.cartItemId));

    return selectedCartItemIds.filter((id) => cartItemIdSet.has(id));
  }, [cartItems, selectedCartItemIds]);

  useEffect(() => {
    if (!isSelectionInitialized) return;

    saveSelectedCartItemIds(validSelectedCartItemIds);
  }, [isSelectionInitialized, validSelectedCartItemIds]);

  const initializeSelection = useCallback((cartItems: CartItemResponse[]) => {
    const storedIds = getStoredSelectedCartItemIds();
    const cartItemIds = cartItems.map((item) => item.cartItemId);
    const cartItemIdSet = new Set(cartItemIds);

    if (storedIds === null) {
      setSelectedCartItemIds(cartItemIds);
      setIsSelectionInitialized(true);
      return;
    }

    setSelectedCartItemIds(() =>
      storedIds.filter((id) => cartItemIdSet.has(id)),
    );
    setIsSelectionInitialized(true);
  }, []);

  const isAllSelected =
    cartItems.length > 0 &&
    cartItems.every((cartItem) =>
      validSelectedCartItemIds.includes(cartItem.cartItemId),
    );

  // 최초 상품 모두 선택
  const selectAllCartItems = useCallback((cartItems: CartItemResponse[]) => {
    setSelectedCartItemIds(cartItems.map((item) => item.cartItemId));
  }, []);

  // 상품 하나 선택
  const toggleCartItem = useCallback((cartItemId: string) => {
    setSelectedCartItemIds((previousIds) => {
      const isIncluded = previousIds.includes(cartItemId);

      if (isIncluded) return previousIds.filter((id) => id !== cartItemId);

      return [...previousIds, cartItemId];
    });
  }, []);

  // 상품 모두 선택
  const toggleAllCartItems = useCallback(() => {
    const allCartItemIds = cartItems.map((cartItem) => cartItem.cartItemId);
    const isAllSelected = allCartItemIds.every((cartItemId) =>
      validSelectedCartItemIds.includes(cartItemId),
    );

    if (isAllSelected) {
      setSelectedCartItemIds([]);
      return;
    }

    setSelectedCartItemIds(allCartItemIds);
  }, [cartItems, validSelectedCartItemIds]);

  return {
    selectedCartItemIds: validSelectedCartItemIds,
    isAllSelected,
    selectAllCartItems,
    toggleCartItem,
    toggleAllCartItems,
    initializeSelection,
  };
};
