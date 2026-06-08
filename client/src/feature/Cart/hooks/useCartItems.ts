import { useCallback, useState } from 'react';
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
  const [cartActionError, setCartActionError] = useState<Error | null>(null);

  // 상품 조회, 재시도
  const loadCartItems = useCallback(async () => {
    try {
      setCartFetchStatus('loading');
      setCartFetchError(null);

      const items = await getCartItemsApi();
      setCartItems(items);

      setCartFetchStatus('success');

      return items;
    } catch (error) {
      setCartFetchStatus('error');
      setCartFetchError(createError(error));

      return null;
    }
  }, []);

  // 상품 삭제
  const deleteCartItem = useCallback(
    async (deletingCartItemId: string) => {
      try {
        setCartActionError(null);

        await deleteCartItemApi(deletingCartItemId);
        await loadCartItems();
      } catch (error) {
        setCartActionError(createError(error));
      }
    },
    [loadCartItems],
  );

  // 상품 수량 변경
  const changeCartItemQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      // 낙관적 업데이트를 위해 기존 수량을 저장
      const previousCartItems = cartItems;

      try {
        setCartActionError(null);

        // 인자로 받은 수량으로 먼저 상태 업데이트 - 낙관적 업데이트
        setCartItems((previousItems) =>
          previousItems.map((item) => {
            if (item.cartItemId !== cartItemId) return item;

            return {
              ...item,
              purchaseQuantity: quantity,
            };
          }),
        );

        await patchCartItemQuantityApi(cartItemId, {
          purchaseQuantity: quantity,
        });
      } catch (error) {
        // 에러 시 이전 수량 상태로 롤백
        setCartItems(previousCartItems);
        setCartActionError(createError(error));
      }
    },
    [cartItems],
  );

  return {
    cartItems,
    cartFetchStatus,
    cartFetchError,
    cartActionError,

    loadCartItems,
    deleteCartItem,
    changeCartItemQuantity,
  };
};

const createError = (error: unknown) => {
  if (error instanceof Error) return error;

  return new Error('요청 처리 중 오류가 발생했습니다.');
};
