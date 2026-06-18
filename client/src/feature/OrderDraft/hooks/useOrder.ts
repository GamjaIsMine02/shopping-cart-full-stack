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
    mutate: patchOrderCouponIdsMutate,
    isLoading: isPatchingCouponIdsOrder,
    error: patchOrderCouponIdsError,
  } = useMutation<Pick<PatchOrderRequest, 'couponIds'>, PatchOrderResponse>(
    ({ couponIds }) => patchOrderCouponIds(orderId, { couponIds }),
  );

  const {
    mutate: patchOrderIsIslandMutate,
    isLoading: isPatchingIsIslandOrder,
    error: patchOrderIsIslandError,
  } = useMutation<Pick<PatchOrderRequest, 'isIsland'>, PatchOrderResponse>(
    ({ isIsland }) => patchOrderIsIsland(orderId, { isIsland }),
  );

  const [orderActionError, setOrderActionError] = useState<Error | null>(null);
  const [modalActionError, setModalActionError] = useState<Error | null>(null);

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
          setOrderActionError(null);
        },

        onError: (error) => {
          setOrderActionError(error);
        },
      },
    );
  };

  // 주문 수정 - 쿠폰Id
  const changeOrderCouponIds = async (couponIds: string[]) => {
    const previousOrder = data;

    await patchOrderCouponIdsMutate(
      {
        couponIds,
      },
      {
        onMutate: () => {
          setModalActionError(null);
          setQueryData((previousOrder) => {
            if (previousOrder.couponIds === couponIds) return previousOrder;

            return {
              ...previousOrder,
              couponIds: couponIds,
            };
          });
        },

        onError: () => {
          setQueryData(() => previousOrder);
          setModalActionError(patchOrderCouponIdsError);
        },
      },
    );
  };

  // 주문 수정 - 도서산간
  const changeOrderIsIsland = async (isIsland: boolean) => {
    const previousOrder = data;

    await patchOrderIsIslandMutate(
      {
        isIsland,
      },
      {
        onMutate: () => {
          setModalActionError(null);
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
          setModalActionError(patchOrderIsIslandError);
        },
      },
    );
  };

  return {
    data,
    isLoading,
    error,
    loadOrder,
    createOrder,
    changeOrderCouponIds,
    changeOrderIsIsland,
    orderActionError,
    modalActionError,
  };
};
