import { useState } from 'react';
import {
  deleteCartItemApi,
  getCartItemsApi,
  patchCartItemQuantityApi,
} from '../../../api/cart/cartApi';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';

export type CartFetchStatus = 'idle' | 'loading' | 'success' | 'error';

// export type UseCartItemsReturn

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<
    CartItemResponse['cartItemId'][]
  >([]);

  const [cartFetchStatus, setCartFetchStatus] =
    useState<CartFetchStatus>('idle');
  const [cartFetchError, setCartFetchError] = useState<Error | null>(null);

  const [deletingCartItemId, setDeletingCartItemId] = useState<string | null>(
    null,
  );
  const [updatingCartItemId, setUpdatingCartItemId] = useState<string | null>(
    null,
  );

  // 상품 조회
  const loadCartItems = async () => {
    try {
      setCartFetchStatus('loading');
      const items = await getCartItemsApi();
      setCartItems(items);

      setCartFetchStatus('success');
    } catch (error) {
      setCartFetchStatus('error');
      setCartFetchError(error);
      window.alert(error);
    }
  };

  // 상품 조회 재시도
  const retryFetchCartItems = async () => {
    await loadCartItems();
  };

  // 상품 삭제
  const deleteCartItem = async (deletingCartItemId: string) => {
    try {
      setDeletingCartItemId(deletingCartItemId);
      await deleteCartItemApi(deletingCartItemId);
      await loadCartItems();
    } catch (error) {
      setCartFetchError(error);
      window.alert(error);
    } finally {
      setDeletingCartItemId(null);
    }
  };

  // 상품 수량 변경
  const changeCartItemQuantity = async (
    cartItemId: string,
    quantity: number,
  ) => {
    try {
      setUpdatingCartItemId(cartItemId);
      await patchCartItemQuantityApi(cartItemId, {
        purchaseQuantity: quantity,
      });
    } catch (error) {
      setCartFetchError(error);
      window.alert(error);
    } finally {
      setUpdatingCartItemId(null);
    }
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
};
