import { useState } from 'react';
import type {
  OrderResponse,
  PatchOrderRequest,
  PatchOrderResponse,
  PostOrderRequest,
  PostOrderResponse,
} from '../../api/orderDraft/orderApi.types';
import { useQuery } from '../../shared/hooks/useQuery';
import {
  getOrder,
  patchOrderCouponIds,
  patchOrderIsIsland,
  postOrder,
} from '../../api/orderDraft/orderApi';
import { useMutation } from '../../shared/hooks/useMutation';

export type PriceInfo = {
  orderPrice: number;
  productDiscountPrice: number;
  deliveryDiscountPrice: number;
  deliveryFee: number;
  totalPrice: number;
};

export const useOrder = () => {
  // 선택된 쿠폰 Id와 가져온 데이터
  const [orderId, setOrderId] = useState<string | null>(null);
  const { data, isLoading, error, refetch, setQueryData } =
    useQuery<OrderResponse>('cart-items', getOrder, orderId);

  const {
    mutate: postOrderMutate,
    isLoading: isPostingOrder,
    error: postOrderError,
  } = useMutation<PostOrderRequest, PostOrderResponse>(
    ({ products, couponIds }) => postOrder({ products, couponIds }),
  );

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
  const createOrder = async ({ products, couponIds }: PostOrderRequest) => {
    await postOrderMutate(
      {
        products,
        couponIds,
      },
      {
        onMutate: () => {
          setOrderActionError(null);
        },

        onError: () => {
          setOrderActionError(postOrderError);
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
