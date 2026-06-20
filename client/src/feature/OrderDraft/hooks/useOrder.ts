import { useState } from 'react';
import type {
  OrderResponse,
  PatchOrderRequest,
  PatchOrderResponse,
  PostOrderRequest,
  PostOrderResponse,
} from '../../../api/orderDraft/orderApi.types';
import {
  getOrder,
  patchOrderCouponIds,
  patchOrderIsIsland,
  postOrder,
} from '../../../api/orderDraft/orderApi';
import { useQuery } from '../../../shared/hooks/useQuery';
import { useMutation } from '../../../shared/hooks/useMutation';

export type PriceInfo = {
  orderPrice: number;
  productDiscountPrice: number;
  deliveryDiscountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

export const useOrder = (orderId?: string) => {
  const { data, isLoading, error, refetch, setQueryData } =
    useQuery<OrderResponse>(`order-${orderId ?? 'idle'}`, getOrder, orderId);

  const { mutate: postOrderMutate, isLoading: isPostingOrder } = useMutation<
    PostOrderRequest,
    PostOrderResponse
  >(({ products }) => postOrder({ products }));

  const {
    mutate: patchOrderIsIslandMutate,
    isLoading: isPatchingIsIslandOrder,
    error: patchOrderIsIslandError,
  } = useMutation<Pick<PatchOrderRequest, 'isIsland'>, PatchOrderResponse>(
    ({ isIsland }) => patchOrderIsIsland(orderId, { isIsland }),
  );

  const [orderFetchError, setOrderFetchError] = useState<Error | null>(null);
  const [orderActionError, setOrderActionError] = useState<Error | null>(null);

  // 주문 조회
  const loadOrder = async () => refetch();

  // 주문 생성
  const createOrder = async ({ products }: PostOrderRequest) => {
    return postOrderMutate(
      {
        products,
      },
      {
        onMutate: () => {
          setOrderFetchError(null);
        },

        onError: (error) => {
          setOrderFetchError(error);
        },
      },
    );
  };

  // 주문 수정 - 도서산간
  const changeOrderIsIsland = async (isIsland: boolean) => {
    const previousOrder = data;

    const response = await patchOrderIsIslandMutate(
      {
        isIsland,
      },
      {
        onMutate: () => {
          setOrderActionError(null);
          setQueryData((previousOrder) => {
            if (previousOrder.isIsland === isIsland) return previousOrder;

            return {
              ...previousOrder,
              isIsland: isIsland,
            };
          });
        },

        onError: () => {
          setQueryData(() => previousOrder);
          setOrderActionError(patchOrderIsIslandError);
        },
      },
    );

    if (!response) return false;

    setQueryData((order) => ({
      ...order,
      isIsland,
      priceInfo: response.priceInfo,
    }));
  };

  return {
    data,
    isLoading,
    error,
    loadOrder,
    createOrder,
    changeOrderIsIsland,
    orderFetchError,
    orderActionError,
  };
};
