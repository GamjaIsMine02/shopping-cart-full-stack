import { useCallback, useState } from 'react';
import {
  deleteCartItemApi,
  getCartItemsApi,
  patchCartItemQuantityApi,
} from '../../../api/cart/cartApi';
import type { CartItemResponse } from '../../../api/cart/cartApi.types';
import { useQuery } from '../../../shared/hooks/useQuery';

export type CartFetchStatus = 'idle' | 'loading' | 'success' | 'error';

export const useCartItems = () => {
  const { data, isLoading, error, refetch, setQueryData } = useQuery<
    CartItemResponse[]
  >('cart-items', getCartItemsApi);

  const [cartActionError, setCartActionError] = useState<Error | null>(null);

  // useQuery로 받아온 데이터
  const cartItems = data ?? [];
  const cartFetchError = error;
  const cartFetchStatus = isLoading
    ? 'loading'
    : cartFetchError
    ? 'error'
    : 'success';

  // 상품 조회, 재시도
  const loadCartItems = useCallback(async () => {
    return refetch();
  }, [refetch]);

  // 상품 삭제
  const deleteCartItem = useCallback(
    async (deletingCartItemId: string) => {
      try {
        setCartActionError(null);

        await deleteCartItemApi(deletingCartItemId);
        await refetch();
      } catch (error) {
        setCartActionError(createError(error));
      }
    },
    [refetch],
  );

  // 상품 수량 변경
  const changeCartItemQuantity = useCallback(
    async (cartItemId: string, quantity: number) => {
      const previousCartItems = data ?? [];

      try {
        setCartActionError(null);

        setQueryData((previousItems) =>
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
        setQueryData(() => previousCartItems);
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
