import { useState } from 'react';
import {
  deleteCartItemApi,
  getCartItemsApi,
  patchCartItemQuantityApi,
} from '../../../api/cart/cartApi';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';

export type CartFetchStatus = 'idle' | 'loading' | 'success' | 'error';

export const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);

  const [cartFetchStatus, setCartFetchStatus] =
    useState<CartFetchStatus>('idle');
  const [cartFetchError, setCartFetchError] = useState<Error | null>(null);

  const [deletingCartItemId, setDeletingCartItemId] = useState<string | null>(
    null,
  );
  const [updatingCartItemId, setUpdatingCartItemId] = useState<string | null>(
    null,
  );

  // 상품 조회, 재시도
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
      const updatedCartItem = await patchCartItemQuantityApi(cartItemId, {
        purchaseQuantity: quantity,
      });

      // 수량 상태 업데이트
      setCartItems((previousItems) =>
        previousItems.map((item) => {
          if (item.cartItemId !== cartItemId) return item;

          return {
            ...item,
            purchaseQuantity: updatedCartItem.purchaseQuantity,
          };
        }),
      );
    } catch (error) {
      setCartFetchError(error);
      window.alert(error);
    } finally {
      setUpdatingCartItemId(null);
    }
  };

  return {
    cartItems,
    cartFetchStatus,
    cartFetchError,
    deletingCartItemId,
    updatingCartItemId,

    loadCartItems,
    deleteCartItem,
    changeCartItemQuantity,
  };
};
